# FinGuide - Quick Start Guide

## ✅ Server is Running!

Your FinGuide application is now running on: **http://localhost:5000**

## 🎯 How to Use

### 1. Add Expenses
- Click on "📊 Expenses" tab
- Fill in the expense form (date, category, description, amount)
- Click "Add Expense" button
- OR click "Load Sample Data" to test with pre-loaded expenses

### 2. Analyze with AI
- After adding expenses, click "🤖 Analyze with AI" button
- View your spending breakdown by category
- See AI-powered recommendations to save money
- Check predicted spending for next month

### 3. Track Goals
- Click on "🎯 Goals" tab
- Set your savings goal (name, target amount, timeframe)
- Enter your monthly income
- Click "Calculate Progress" to see if your goal is achievable

## 🛠️ Server Management

### To Stop the Server
- Press `Ctrl+C` in the terminal where the server is running

### To Restart the Server
```bash
start.bat
```

### To Rebuild Everything
```bash
run.bat
```

## 📊 Features Included

✅ Expense tracking with multiple categories
✅ AI-powered spending analysis
✅ Machine Learning predictions (Linear Regression)
✅ Smart saving recommendations
✅ Goal tracking with achievability analysis
✅ Interactive charts (Pie & Bar charts)
✅ Fully responsive design
✅ Sample data for testing

## 🎨 Categories Available
- Food
- Transport
- Entertainment
- Shopping
- Bills
- Other

## 💡 Tips
- Add at least 5-7 expenses for better AI analysis
- Use real dates to get accurate monthly predictions
- Set realistic goals based on your income
- Follow AI recommendations to improve savings

## 🐛 Troubleshooting

**If the page doesn't load:**
1. Make sure the server is running (check terminal)
2. Try refreshing the browser
3. Clear browser cache
4. Check if port 5000 is available

**If AI analysis fails:**
1. Make sure you added at least one expense
2. Check the terminal for error messages
3. Restart the server

## 📁 Project Structure
```
MINI/
├── backend/          # Flask API + ML Model
├── frontend/         # React App (built)
├── run.bat          # Full setup script
├── start.bat        # Quick start script
└── README.md        # Documentation
```

Enjoy using FinGuide! 💼💰
