import React, { useState } from 'react';
import axios from 'axios';
import './GoalTracker.css';

const GoalTracker = ({ expenses }) => {
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: '',
    currentSavings: '',
    monthsLeft: '',
    monthlyIncome: ''
  });
  const [progress, setProgress] = useState(null);

  const handleInputChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const calculateProgress = async () => {
    if (!goal.targetAmount || !goal.monthsLeft || !goal.monthlyIncome) {
      alert('Please fill in all required fields');
      return;
    }

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgMonthlyExpense = expenses.length > 0 ? totalExpenses / Math.max(1, new Set(expenses.map(e => e.date.substring(0, 7))).size) : 0;

    try {
      const response = await axios.post('/api/goal-progress', {
        currentSavings: parseFloat(goal.currentSavings) || 0,
        goalAmount: parseFloat(goal.targetAmount),
        monthsLeft: parseInt(goal.monthsLeft),
        avgMonthlyExpense: avgMonthlyExpense,
        avgMonthlyIncome: parseFloat(goal.monthlyIncome)
      });
      setProgress(response.data);
    } catch (error) {
      console.error('Error calculating progress:', error);
      alert('Error calculating progress. Make sure the backend is running.');
    }
  };

  return (
    <div className="goal-tracker">
      <div className="goal-form-card">
        <h2>🎯 Set Your Savings Goal</h2>
        <form onSubmit={(e) => { e.preventDefault(); calculateProgress(); }}>
          <div className="form-group">
            <label>Goal Name</label>
            <input
              type="text"
              name="name"
              value={goal.name}
              onChange={handleInputChange}
              placeholder="e.g., New Laptop, Vacation"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Target Amount (₹)</label>
              <input
                type="number"
                name="targetAmount"
                value={goal.targetAmount}
                onChange={handleInputChange}
                placeholder="10000"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Current Savings (₹)</label>
              <input
                type="number"
                name="currentSavings"
                value={goal.currentSavings}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Time Frame (months)</label>
              <input
                type="number"
                name="monthsLeft"
                value={goal.monthsLeft}
                onChange={handleInputChange}
                placeholder="3"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Monthly Income (₹)</label>
              <input
                type="number"
                name="monthlyIncome"
                value={goal.monthlyIncome}
                onChange={handleInputChange}
                placeholder="30000"
                min="0"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Calculate Progress</button>
        </form>
      </div>

      {progress && (
        <div className="progress-results">
          <h3>Goal Analysis: {goal.name || 'Your Goal'}</h3>
          
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(progress.progress, 100)}%` }}
              >
                {progress.progress.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="progress-stats">
            <div className="progress-stat">
              <span className="stat-label">Monthly Required</span>
              <span className="stat-value">₹{progress.monthlyRequired}</span>
            </div>
            <div className="progress-stat">
              <span className="stat-label">Current Monthly Savings</span>
              <span className="stat-value">₹{progress.currentMonthlySavings}</span>
            </div>
          </div>

          <div className={`goal-status ${progress.isAchievable ? 'achievable' : 'not-achievable'}`}>
            {progress.isAchievable ? (
              <>
                <span className="status-icon">✅</span>
                <p>Great! Your goal is achievable with your current spending habits.</p>
              </>
            ) : (
              <>
                <span className="status-icon">⚠️</span>
                <p>You need to save ₹{(progress.monthlyRequired - progress.currentMonthlySavings).toFixed(2)} more per month to reach your goal.</p>
                <p className="tip">💡 Tip: Review your expenses and follow AI recommendations to increase savings.</p>
              </>
            )}
          </div>
        </div>
      )}

      {!progress && expenses.length === 0 && (
        <div className="empty-state">
          <p>Add some expenses first to get personalized goal recommendations</p>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
