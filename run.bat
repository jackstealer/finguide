@echo off
echo ========================================
echo FinGuide - AI Personal Finance Advisor
echo ========================================
echo.
echo Step 1: Installing Backend Dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b %errorlevel%
)
echo.
echo Step 2: Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b %errorlevel%
)
echo.
echo Step 3: Building React App...
call npm run build
if %errorlevel% neq 0 (
    echo Error building frontend!
    pause
    exit /b %errorlevel%
)
echo.
echo Step 4: Starting Flask Server...
cd ..\backend
echo.
echo ========================================
echo Server starting on http://localhost:5000
echo ========================================
echo.
python app.py
pause
