# FinGuide - Complete Setup Guide

This guide will help you set up FinGuide on your local machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Python 3.11 or higher** - [Download](https://www.python.org/downloads/)
- **Node.js 18 or higher** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/downloads)

### Check Installations
```bash
python --version    # Should show 3.11+
node --version      # Should show 18+
npm --version       # Should show 9+
git --version       # Should show 2+
```

---

## 🚀 Installation Methods

### Method 1: Quick Start (Recommended)

**Windows:**
```bash
# Clone the repository
git clone https://github.com/jackstealer/finguide.git
cd finguide

# Run the setup script
run.bat
```

This will:
1. Install all backend dependencies
2. Install all frontend dependencies
3. Build the React app
4. Start the server on http://localhost:5000

**Linux/Mac:**
```bash
# Clone the repository
git clone https://github.com/jackstealer/finguide.git
cd finguide

# Make the script executable
chmod +x run.sh

# Run the setup script
./run.sh
```

---

### Method 2: Manual Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/finguide.git
cd finguide
```

#### Step 2: Backend Setup
```bash
# Navigate to backend folder
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Test the backend
python app.py
```

Backend should now be running on http://localhost:5000

#### Step 3: Frontend Setup (in a new terminal)
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Build the production version
npm run build
```

#### Step 4: Run the Application
```bash
# From the backend folder
cd backend
python app.py
```

Open http://localhost:5000 in your browser.

---

## 🔧 Development Mode

If you want to develop and see live changes:

### Terminal 1 - Backend
```bash
cd backend
python app.py
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

This will:
- Run backend on http://localhost:5000
- Run frontend dev server on http://localhost:3000
- Enable hot-reloading for both

---

## 🐛 Troubleshooting

### Issue: Port 5000 already in use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Issue: Python module not found
**Solution:**
```bash
cd backend
pip install -r requirements.txt --force-reinstall
```

### Issue: npm install fails
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Build fails
**Solution:**
```bash
cd frontend
npm run build -- --verbose
```

### Issue: CORS errors
**Solution:**
- Make sure backend is running on port 5000
- Check that proxy is set in frontend/package.json
- Clear browser cache

---

## 🌐 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create finguide-app
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy to Vercel (Frontend)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

### Deploy to AWS

See [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md) for detailed instructions.

---

## 📦 Docker Setup (Optional)

### Using Docker Compose
```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down
```

### Manual Docker Build
```bash
# Build backend
cd backend
docker build -t finguide-backend .

# Build frontend
cd frontend
docker build -t finguide-frontend .

# Run
docker run -p 5000:5000 finguide-backend
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Run All Tests
```bash
# Windows
test.bat

# Linux/Mac
./test.sh
```

---

## 📊 Database Setup (Optional)

For production, you may want to add a database:

### PostgreSQL
```bash
# Install PostgreSQL
# Update backend/config.py with database URL
DATABASE_URL=postgresql://user:password@localhost/finguide
```

### MongoDB
```bash
# Install MongoDB
# Update backend/config.py
MONGO_URI=mongodb://localhost:27017/finguide
```

---

## 🔐 Environment Variables

Create `.env` files for sensitive data:

### Backend (.env)
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=your-database-url
API_KEY=your-api-key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

---

## 📚 Additional Resources

- [Python Documentation](https://docs.python.org/3/)
- [React Documentation](https://react.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [scikit-learn Documentation](https://scikit-learn.org/)

---

## 💡 Tips

1. **Use Virtual Environment**: Always use a virtual environment for Python
2. **Keep Dependencies Updated**: Regularly update packages
3. **Check Logs**: Look at console logs for errors
4. **Clear Cache**: Clear browser cache if you see old content
5. **Restart Server**: Restart after changing backend code

---

## 🆘 Getting Help

If you encounter issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Search [Issues](https://github.com/yourusername/finguide/issues)
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Python version, Node version)
   - Screenshots if applicable

---

## ✅ Verification

After setup, verify everything works:

1. ✅ Backend running on http://localhost:5000
2. ✅ Can load the homepage
3. ✅ Can add expenses
4. ✅ Can load sample data
5. ✅ AI analysis works
6. ✅ Charts display correctly
7. ✅ Goal tracking works

---

**Happy Coding! 🚀**
