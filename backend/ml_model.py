import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime, timedelta

class FinanceAdvisor:
    def __init__(self):
        self.linear_model = LinearRegression()
        self.rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
        
        # Real-world spending thresholds based on Indian student/young professional data
        # Source: Financial surveys and budgeting studies
        self.category_thresholds = {
            'Food': 0.30,  # 30% - Groceries + dining out
            'Transport': 0.12,  # 12% - Commute, fuel, cab
            'Entertainment': 0.10,  # 10% - Movies, outings, subscriptions
            'Shopping': 0.15,  # 15% - Clothes, electronics, personal items
            'Bills': 0.25,  # 25% - Rent, utilities, phone, internet
            'Healthcare': 0.05,  # 5% - Medical, pharmacy
            'Education': 0.08,  # 8% - Books, courses, supplies
            'Other': 0.05  # 5% - Miscellaneous
        }
        
        # Average spending patterns for benchmarking (monthly in INR)
        self.avg_spending_benchmarks = {
            'Food': 6000,
            'Transport': 2500,
            'Entertainment': 2000,
            'Shopping': 3000,
            'Bills': 5000,
            'Healthcare': 1000,
            'Education': 1500,
            'Other': 1000
        }
    
    def analyze_spending(self, df):
        """Analyze spending patterns with detailed insights"""
        total = df['amount'].sum()
        category_totals = df.groupby('category')['amount'].sum().to_dict()
        
        # Calculate daily average
        df['date'] = pd.to_datetime(df['date'])
        date_range = (df['date'].max() - df['date'].min()).days + 1
        daily_avg = total / max(date_range, 1)
        
        # Calculate transaction frequency
        transaction_count = len(df)
        avg_transaction = total / transaction_count if transaction_count > 0 else 0
        
        analysis = {
            'total': round(float(total), 2),
            'byCategory': {k: round(float(v), 2) for k, v in category_totals.items()},
            'categoryPercentages': {
                k: round(float(v / total * 100), 2) 
                for k, v in category_totals.items()
            },
            'dailyAverage': round(float(daily_avg), 2),
            'avgTransaction': round(float(avg_transaction), 2),
            'transactionCount': transaction_count,
            'dateRange': date_range
        }
        
        return analysis
    
    def get_recommendations(self, df):
        """Generate AI-powered personalized recommendations based on real spending patterns"""
        recommendations = []
        total = df['amount'].sum()
        category_totals = df.groupby('category')['amount'].sum()
        
        # Calculate monthly equivalent
        df['date'] = pd.to_datetime(df['date'])
        date_range_days = (df['date'].max() - df['date'].min()).days + 1
        monthly_multiplier = 30 / date_range_days if date_range_days > 0 else 1
        
        total_potential_savings = 0
        
        for category, amount in category_totals.items():
            monthly_amount = amount * monthly_multiplier
            percentage = amount / total
            threshold = self.category_thresholds.get(category, 0.10)
            benchmark = self.avg_spending_benchmarks.get(category, 2000)
            
            # Check if overspending relative to threshold
            if percentage > threshold:
                overspend = amount - (total * threshold)
                total_potential_savings += overspend
                
                # Category-specific advice
                advice = self._get_category_advice(category, monthly_amount, benchmark)
                
                recommendations.append({
                    'category': category,
                    'type': 'warning',
                    'message': f'{advice} You\'re spending {percentage*100:.1f}% on {category} (recommended: {threshold*100:.0f}%)',
                    'potentialSaving': round(float(overspend), 2)
                })
            
            # Check if spending is above benchmark
            elif monthly_amount > benchmark * 1.2:
                saving = monthly_amount - benchmark
                total_potential_savings += saving / monthly_multiplier
                
                recommendations.append({
                    'category': category,
                    'type': 'warning',
                    'message': f'Your {category} spending is ₹{monthly_amount:.0f}/month, above the average of ₹{benchmark}. Try to reduce by ₹{saving:.0f}',
                    'potentialSaving': round(float(saving / monthly_multiplier), 2)
                })
        
        # Add spending pattern insights
        self._add_pattern_insights(df, recommendations)
        
        # Add positive feedback or summary
        if len(recommendations) == 0:
            recommendations.append({
                'category': 'General',
                'type': 'success',
                'message': '🎉 Excellent! Your spending is well-balanced and within recommended limits.',
                'potentialSaving': 0
            })
        else:
            recommendations.insert(0, {
                'category': 'Summary',
                'type': 'info',
                'message': f'💡 AI Analysis: You could save up to ₹{total_potential_savings:.0f} by optimizing your spending habits',
                'potentialSaving': round(float(total_potential_savings), 2)
            })
        
        return recommendations
    
    def _get_category_advice(self, category, monthly_amount, benchmark):
        """Get specific advice based on category"""
        advice_map = {
            'Food': f'Consider meal planning and cooking at home more often. Food delivery adds 40-60% markup.',
            'Transport': f'Try carpooling, public transport, or monthly passes to save on commute costs.',
            'Entertainment': f'Look for free events, student discounts, or share subscriptions with friends.',
            'Shopping': f'Wait 24 hours before impulse purchases. Use the 30-day rule for expensive items.',
            'Bills': f'Review subscriptions you don\'t use. Negotiate better plans with service providers.',
            'Healthcare': f'Consider health insurance. Use generic medicines when possible.',
            'Education': f'Explore free online resources, library books, or second-hand textbooks.',
            'Other': f'Track miscellaneous expenses carefully. Small amounts add up quickly.'
        }
        return advice_map.get(category, 'Consider reducing expenses in this category.')
    
    def _add_pattern_insights(self, df, recommendations):
        """Add insights based on spending patterns"""
        df['date'] = pd.to_datetime(df['date'])
        df['day_of_week'] = df['date'].dt.day_name()
        df['hour'] = df['date'].dt.hour
        
        # Weekend spending analysis
        weekend_spending = df[df['day_of_week'].isin(['Saturday', 'Sunday'])]['amount'].sum()
        total_spending = df['amount'].sum()
        
        if weekend_spending / total_spending > 0.4:
            recommendations.append({
                'category': 'Spending Pattern',
                'type': 'info',
                'message': f'📊 You spend {weekend_spending/total_spending*100:.0f}% on weekends. Plan weekend activities with a budget.',
                'potentialSaving': 0
            })
        
        # High-frequency small transactions
        small_transactions = df[df['amount'] < 200]
        if len(small_transactions) > len(df) * 0.5:
            small_total = small_transactions['amount'].sum()
            recommendations.append({
                'category': 'Spending Pattern',
                'type': 'info',
                'message': f'💳 {len(small_transactions)} small transactions (₹{small_total:.0f}). These add up! Track daily expenses.',
                'potentialSaving': 0
            })
    
    def predict_future_spending(self, df):
        """Predict future spending using ensemble of ML models"""
        if len(df) < 3:
            avg_spending = df['amount'].sum()
            return {
                'nextMonth': round(float(avg_spending), 2),
                'trend': 'stable',
                'confidence': 'low'
            }
        
        # Convert dates and create time series
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values('date')
        
        # Group by month
        df['month'] = df['date'].dt.to_period('M')
        monthly_spending = df.groupby('month')['amount'].sum().reset_index()
        
        if len(monthly_spending) < 2:
            # Extrapolate to monthly
            days_in_data = (df['date'].max() - df['date'].min()).days + 1
            total_spending = df['amount'].sum()
            monthly_estimate = (total_spending / days_in_data) * 30
            
            return {
                'nextMonth': round(float(monthly_estimate), 2),
                'trend': 'stable',
                'confidence': 'medium'
            }
        
        # Prepare features for prediction
        X = np.arange(len(monthly_spending)).reshape(-1, 1)
        y = monthly_spending['amount'].values
        
        # Train both models
        self.linear_model.fit(X, y)
        
        # For Random Forest, add more features if possible
        if len(monthly_spending) >= 3:
            self.rf_model.fit(X, y)
            
            # Predict with both models
            next_idx = len(monthly_spending)
            linear_pred = self.linear_model.predict([[next_idx]])[0]
            rf_pred = self.rf_model.predict([[next_idx]])[0]
            
            # Ensemble prediction (weighted average)
            prediction = 0.6 * rf_pred + 0.4 * linear_pred
            confidence = 'high'
        else:
            prediction = self.linear_model.predict([[len(monthly_spending)]])[0]
            confidence = 'medium'
        
        # Calculate trend
        if len(y) >= 2:
            recent_trend = (y[-1] - y[-2]) / y[-2] * 100
            if recent_trend > 10:
                trend = 'increasing'
            elif recent_trend < -10:
                trend = 'decreasing'
            else:
                trend = 'stable'
        else:
            trend = 'stable'
        
        # Calculate category-wise predictions
        category_predictions = {}
        for category in df['category'].unique():
            cat_df = df[df['category'] == category]
            cat_monthly = cat_df.groupby('month')['amount'].sum()
            if len(cat_monthly) > 0:
                category_predictions[category] = round(float(cat_monthly.mean()), 2)
        
        return {
            'nextMonth': round(float(max(0, prediction)), 2),
            'trend': trend,
            'confidence': confidence,
            'categoryPredictions': category_predictions
        }
