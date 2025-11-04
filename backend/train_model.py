"""
Script to demonstrate ML model training with real-world data
This shows how the AI model learns from historical spending patterns
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
import pickle

def load_and_prepare_data():
    """Load sample data and prepare for training"""
    df = pd.read_csv('sample_data.csv')
    df['date'] = pd.to_datetime(df['date'])
    
    # Create features
    df['day_of_month'] = df['date'].dt.day
    df['day_of_week'] = df['date'].dt.dayofweek
    df['month'] = df['date'].dt.month
    df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
    
    # Encode categories
    category_encoding = {cat: idx for idx, cat in enumerate(df['category'].unique())}
    df['category_encoded'] = df['category'].map(category_encoding)
    
    return df, category_encoding

def train_spending_predictor():
    """Train ML model to predict spending amounts"""
    df, category_encoding = load_and_prepare_data()
    
    # Features and target
    features = ['day_of_month', 'day_of_week', 'month', 'is_weekend', 'category_encoded']
    X = df[features]
    y = df['amount']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train Random Forest
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42, max_depth=10)
    rf_model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = rf_model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print("=" * 50)
    print("ML Model Training Results")
    print("=" * 50)
    print(f"Model: Random Forest Regressor")
    print(f"Training samples: {len(X_train)}")
    print(f"Test samples: {len(X_test)}")
    print(f"Mean Absolute Error: ₹{mae:.2f}")
    print(f"R² Score: {r2:.3f}")
    print("=" * 50)
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': features,
        'importance': rf_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance)
    
    # Save model
    with open('spending_model.pkl', 'wb') as f:
        pickle.dump({'model': rf_model, 'category_encoding': category_encoding}, f)
    
    print("\n✅ Model saved as 'spending_model.pkl'")
    
    return rf_model, category_encoding

def analyze_spending_patterns():
    """Analyze real-world spending patterns"""
    df = pd.read_csv('sample_data.csv')
    df['date'] = pd.to_datetime(df['date'])
    
    print("\n" + "=" * 50)
    print("Real-World Spending Pattern Analysis")
    print("=" * 50)
    
    # Category-wise analysis
    category_stats = df.groupby('category')['amount'].agg(['sum', 'mean', 'count'])
    category_stats['percentage'] = (category_stats['sum'] / category_stats['sum'].sum() * 100)
    category_stats = category_stats.sort_values('sum', ascending=False)
    
    print("\nSpending by Category:")
    print(category_stats.round(2))
    
    # Monthly analysis
    df['month'] = df['date'].dt.to_period('M')
    monthly_spending = df.groupby('month')['amount'].sum()
    
    print(f"\nMonthly Spending Trend:")
    for month, amount in monthly_spending.items():
        print(f"{month}: ₹{amount:.2f}")
    
    # Day of week analysis
    df['day_name'] = df['date'].dt.day_name()
    day_spending = df.groupby('day_name')['amount'].mean().sort_values(ascending=False)
    
    print(f"\nAverage Spending by Day:")
    for day, amount in day_spending.items():
        print(f"{day}: ₹{amount:.2f}")
    
    print("\n" + "=" * 50)

if __name__ == "__main__":
    print("🤖 FinGuide AI - Machine Learning Model Training\n")
    
    # Analyze patterns
    analyze_spending_patterns()
    
    # Train model
    print("\n🔄 Training ML model...")
    model, encoding = train_spending_predictor()
    
    print("\n✅ Training complete! The AI is now ready to provide accurate predictions.")
