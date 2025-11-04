#!/bin/bash

echo "========================================"
echo "FinGuide - AI Personal Finance Advisor"
echo "========================================"
echo ""

echo "Step 1: Installing Backend Dependencies..."
cd backend
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies!"
    exit 1
fi

echo ""
echo "Step 2: Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies!"
    exit 1
fi

echo ""
echo "Step 3: Building React App..."
npm run build
if [ $? -ne 0 ]; then
    echo "Error building frontend!"
    exit 1
fi

echo ""
echo "Step 4: Starting Flask Server..."
cd ../backend
echo ""
echo "========================================"
echo "Server starting on http://localhost:5000"
echo "========================================"
echo ""
python app.py
