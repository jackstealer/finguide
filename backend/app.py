from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import datetime
from ml_model import FinanceAdvisor
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

advisor = FinanceAdvisor()

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze_expenses():
    try:
        data = request.json
        expenses = data.get('expenses', [])
        
        if not expenses:
            return jsonify({'error': 'No expenses provided'}), 400
        
        df = pd.DataFrame(expenses)
        analysis = advisor.analyze_spending(df)
        recommendations = advisor.get_recommendations(df)
        predictions = advisor.predict_future_spending(df)
        
        return jsonify({
            'analysis': analysis,
            'recommendations': recommendations,
            'predictions': predictions
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/goal-progress', methods=['POST'])
def calculate_goal_progress():
    try:
        data = request.json
        current_savings = data.get('currentSavings', 0)
        goal_amount = data.get('goalAmount', 0)
        months_left = data.get('monthsLeft', 1)
        avg_monthly_expense = data.get('avgMonthlyExpense', 0)
        avg_monthly_income = data.get('avgMonthlyIncome', 0)
        
        monthly_required = (goal_amount - current_savings) / months_left if months_left > 0 else 0
        current_monthly_savings = avg_monthly_income - avg_monthly_expense
        is_achievable = current_monthly_savings >= monthly_required
        
        return jsonify({
            'monthlyRequired': round(monthly_required, 2),
            'currentMonthlySavings': round(current_monthly_savings, 2),
            'isAchievable': is_achievable,
            'progress': round((current_savings / goal_amount * 100), 2) if goal_amount > 0 else 0
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
