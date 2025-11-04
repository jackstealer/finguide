import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './Dashboard.css';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#6366f1'];

const Dashboard = ({ analysis, expenses }) => {
  const categoryData = Object.entries(analysis.analysis.byCategory).map(([name, value]) => ({
    name,
    value: parseFloat(value)
  }));

  const getRecommendationIcon = (type) => {
    switch(type) {
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return '💡';
      default: return '📌';
    }
  };

  // Custom label for pie chart to avoid overlap
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.03) return null; // Don't show labels for very small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="#ffffff" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontSize: '14px', fontWeight: '600', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(59, 130, 246, 0.5)',
          borderRadius: '8px',
          padding: '10px 15px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ color: '#ffffff', margin: 0, fontWeight: '600' }}>{payload[0].name}</p>
          <p style={{ color: '#60a5fa', margin: '5px 0 0 0', fontWeight: '700' }}>₹{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Spending</h3>
          <p className="stat-value">₹{analysis.analysis.total}</p>
          {analysis.analysis.dateRange && (
            <span className="stat-subtitle">{analysis.analysis.dateRange} days tracked</span>
          )}
        </div>
        <div className="stat-card">
          <h3>Daily Average</h3>
          <p className="stat-value">₹{analysis.analysis.dailyAverage || (analysis.analysis.total / expenses.length).toFixed(2)}</p>
          <span className="stat-subtitle">{expenses.length} transactions</span>
        </div>
        <div className="stat-card">
          <h3>Avg Transaction</h3>
          <p className="stat-value">₹{analysis.analysis.avgTransaction || (analysis.analysis.total / expenses.length).toFixed(2)}</p>
        </div>
        {analysis.predictions && (
          <div className="stat-card highlight">
            <h3>AI Prediction - Next Month</h3>
            <p className="stat-value">₹{analysis.predictions.nextMonth}</p>
            {analysis.predictions.trend && (
              <span className={`trend ${analysis.predictions.trend}`}>
                {analysis.predictions.trend === 'increasing' ? '📈' : analysis.predictions.trend === 'decreasing' ? '📉' : '➡️'} {analysis.predictions.trend}
              </span>
            )}
            {analysis.predictions.confidence && (
              <span className="confidence">{analysis.predictions.confidence} confidence</span>
            )}
          </div>
        )}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Spending by Category</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="45%"
                labelLine={true}
                label={renderCustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="rgba(15, 23, 42, 0.8)"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={categoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis tick={{ fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="url(#colorGradient)" 
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recommendations-section">
        <h3>💡 AI Recommendations</h3>
        <div className="recommendations-grid">
          {analysis.recommendations.map((rec, index) => (
            <div key={index} className={`recommendation-card ${rec.type}`}>
              <div className="rec-header">
                <span className="rec-icon">{getRecommendationIcon(rec.type)}</span>
                <span className="rec-category">{rec.category}</span>
              </div>
              <p className="rec-message">{rec.message}</p>
              {rec.potentialSaving > 0 && (
                <p className="rec-saving">Potential saving: ₹{rec.potentialSaving}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
