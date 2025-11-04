import React, { useState } from 'react';
import axios from 'axios';
import './ExpenseForm.css';

const ExpenseForm = ({ onExpensesUpdate }) => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
    description: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (formData.amount && formData.description) {
      const newExpense = {
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now()
      };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        category: 'Food',
        description: '',
        amount: ''
      });
    }
  };

  const handleAnalyze = async () => {
    if (expenses.length === 0) {
      alert('Please add at least one expense');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/analyze', {
        expenses: expenses
      });
      onExpensesUpdate(expenses, response.data);
    } catch (error) {
      console.error('Error analyzing expenses:', error);
      alert('Error analyzing expenses. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    // Real-world expense data for Indian student/young professional
    const sampleExpenses = [
      { id: 1, date: '2024-10-01', category: 'Bills', description: 'Room rent', amount: 8000 },
      { id: 2, date: '2024-10-02', category: 'Food', description: 'Monthly grocery', amount: 3500 },
      { id: 3, date: '2024-10-03', category: 'Transport', description: 'Metro card recharge', amount: 800 },
      { id: 4, date: '2024-10-05', category: 'Shopping', description: 'Electronics - earphones', amount: 1899 },
      { id: 5, date: '2024-10-06', category: 'Food', description: 'Lunch - food court', amount: 250 },
      { id: 6, date: '2024-10-07', category: 'Entertainment', description: 'Concert tickets', amount: 1800 },
      { id: 7, date: '2024-10-08', category: 'Food', description: 'Dinner - restaurant', amount: 920 },
      { id: 8, date: '2024-10-09', category: 'Healthcare', description: 'Doctor consultation', amount: 500 },
      { id: 9, date: '2024-10-10', category: 'Bills', description: 'Mobile recharge', amount: 399 },
      { id: 10, date: '2024-10-11', category: 'Food', description: 'Swiggy order', amount: 420 },
      { id: 11, date: '2024-10-12', category: 'Transport', description: 'Uber ride', amount: 180 },
      { id: 12, date: '2024-10-13', category: 'Food', description: 'Grocery - weekly', amount: 680 },
      { id: 13, date: '2024-10-14', category: 'Shopping', description: 'Clothing - jeans', amount: 1650 },
      { id: 14, date: '2024-10-15', category: 'Food', description: 'Cafe - evening snacks', amount: 290 },
      { id: 15, date: '2024-10-16', category: 'Entertainment', description: 'Amazon Prime', amount: 299 },
      { id: 16, date: '2024-10-17', category: 'Food', description: 'Restaurant dinner', amount: 1100 },
      { id: 17, date: '2024-10-18', category: 'Bills', description: 'Electricity bill', amount: 1250 },
      { id: 18, date: '2024-10-20', category: 'Food', description: 'Breakfast - Swiggy', amount: 160 },
      { id: 19, date: '2024-10-21', category: 'Education', description: 'Books - Amazon', amount: 890 },
      { id: 20, date: '2024-10-22', category: 'Food', description: 'Lunch with colleagues', amount: 550 },
      { id: 21, date: '2024-10-23', category: 'Shopping', description: 'Personal care items', amount: 780 },
      { id: 22, date: '2024-10-24', category: 'Food', description: 'Grocery shopping', amount: 1950 },
      { id: 23, date: '2024-10-25', category: 'Entertainment', description: 'Movie and popcorn', amount: 720 },
      { id: 24, date: '2024-10-26', category: 'Food', description: 'Dinner - Zomato', amount: 480 },
      { id: 25, date: '2024-10-28', category: 'Shopping', description: 'Accessories', amount: 1200 },
      { id: 26, date: '2024-10-29', category: 'Food', description: 'Weekend dining', amount: 1350 },
      { id: 27, date: '2024-10-31', category: 'Other', description: 'Gym membership', amount: 1500 }
    ];
    setExpenses(sampleExpenses);
  };

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <div className="expense-form-container">
      <div className="form-card">
        <h2>Add Expense</h2>
        <form onSubmit={handleAddExpense}>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="e.g., Lunch at restaurant"
              required
            />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.01"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Expense</button>
        </form>
      </div>

      {expenses.length > 0 && (
        <div className="expenses-list">
          <h3>Your Expenses ({expenses.length})</h3>
          <div className="expenses-grid">
            {expenses.map(exp => (
              <div key={exp.id} className="expense-item">
                <div className="expense-info">
                  <span className="expense-category">{exp.category}</span>
                  <span className="expense-description">{exp.description}</span>
                  <span className="expense-date">{exp.date}</span>
                </div>
                <div className="expense-amount">
                  <span>₹{exp.amount}</span>
                  <button onClick={() => handleRemoveExpense(exp.id)} className="btn-remove">×</button>
                </div>
              </div>
            ))}
          </div>
          <div className="action-buttons">
            <button onClick={handleLoadSample} className="btn btn-secondary">Load Sample Data</button>
            <button onClick={handleAnalyze} className="btn btn-success" disabled={loading}>
              {loading ? 'Analyzing...' : '🤖 Analyze with AI'}
            </button>
          </div>
        </div>
      )}

      {expenses.length === 0 && (
        <div className="empty-state">
          <p>No expenses added yet</p>
          <button onClick={handleLoadSample} className="btn btn-secondary">Load Sample Data</button>
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;
