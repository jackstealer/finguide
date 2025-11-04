import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';
import GoalTracker from './components/GoalTracker';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('expenses');

  const handleExpensesUpdate = (newExpenses, analysisData) => {
    setExpenses(newExpenses);
    setAnalysis(analysisData);
  };

  return (
    <div className="App">
      {/* Animated Background Elements */}
      <div className="animated-bg">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
        <div className="floating-circle circle-5"></div>
      </div>

      <header className="app-header">
        <h1>💼 FinGuide</h1>
        <p>Your AI Personal Finance Advisor</p>
      </header>

      <nav className="tab-nav">
        <button 
          className={activeTab === 'expenses' ? 'active' : ''}
          onClick={() => setActiveTab('expenses')}
        >
          📊 Expenses
        </button>
        <button 
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => setActiveTab('goals')}
        >
          🎯 Goals
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'expenses' ? (
          <>
            <ExpenseForm onExpensesUpdate={handleExpensesUpdate} />
            {analysis && <Dashboard analysis={analysis} expenses={expenses} />}
          </>
        ) : (
          <GoalTracker expenses={expenses} />
        )}
      </main>

      <footer className="app-footer">
        <p>Built for Hackathon 2024 | AI-Powered Financial Insights</p>
      </footer>
    </div>
  );
}

export default App;
