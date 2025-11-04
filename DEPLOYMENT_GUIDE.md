# 🚀 FinGuide Deployment Guide

This guide will help you deploy FinGuide to production.

---

## 🎯 Recommended Deployment Options

### Option 1: Render (Easiest - Recommended) ⭐
- **Free tier available**
- **Automatic deployments from GitHub**
- **Both frontend and backend on one platform**
- **No credit card required**

### Option 2: Vercel + Railway
- **Vercel**: Frontend (Free)
- **Railway**: Backend (Free tier)
- **Fast and reliable**

### Option 3: Heroku
- **All-in-one platform**
- **Free tier (with limitations)**

---

## 🌟 Option 1: Deploy to Render (Recommended)

### Step 1: Create Render Account
1. Go to: https://render.com/
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Deploy Backend

1. **Click "New +"** → **"Web Service"**
2. **Connect your repository**: `jackstealer/finguide`
3. **Configure**:
   - **Name**: `finguide-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: `Free`

4. **Add Environment Variables** (if needed):
   - Click "Advanced"
   - Add any environment variables

5. **Click "Create Web Service"**

### Step 3: Deploy Frontend

1. **Click "New +"** → **"Static Site"**
2. **Connect your repository**: `jackstealer/finguide`
3. **Configure**:
   - **Name**: `finguide`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. **Add Environment Variable**:
   - Key: `REACT_APP_API_URL`
   - Value: `https://finguide-backend.onrender.com` (your backend URL)

5. **Click "Create Static Site"**

### Step 4: Update Backend for Production

The backend needs to serve the frontend. This is already configured!

### Your App Will Be Live At:
- **Frontend**: `https://finguide.onrender.com`
- **Backend API**: `https://finguide-backend.onrender.com`

---

## 🚀 Option 2: Vercel + Railway

### Part A: Deploy Backend to Railway

1. **Go to**: https://railway.app/
2. **Sign up with GitHub**
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select**: `jackstealer/finguide`
5. **Configure**:
   - **Root Directory**: `/backend`
   - **Start Command**: `gunicorn app:app`
6. **Add Environment Variables** (Settings → Variables):
   - `PORT`: `5000`
7. **Generate Domain**: Settings → Generate Domain
8. **Copy the URL**: e.g., `https://finguide-backend.up.railway.app`

### Part B: Deploy Frontend to Vercel

1. **Go to**: https://vercel.com/
2. **Sign up with GitHub**
3. **Click "Add New"** → **"Project"**
4. **Import**: `jackstealer/finguide`
5. **Configure**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
6. **Add Environment Variable**:
   - Key: `REACT_APP_API_URL`
   - Value: Your Railway backend URL
7. **Click "Deploy"**

### Your App Will Be Live At:
- **Frontend**: `https://finguide.vercel.app`
- **Backend**: `https://finguide-backend.up.railway.app`

---

## 🔧 Option 3: Heroku (All-in-One)

### Prerequisites
```bash
# Install Heroku CLI
# Windows: Download from https://devcenter.heroku.com/articles/heroku-cli
# Mac: brew install heroku/brew/heroku
# Linux: curl https://cli-assets.heroku.com/install.sh | sh
```

### Deploy Steps

1. **Login to Heroku**:
```bash
heroku login
```

2. **Create Heroku App**:
```bash
heroku create finguide-app
```

3. **Add Buildpacks**:
```bash
heroku buildpacks:add --index 1 heroku/python
heroku buildpacks:add --index 2 heroku/nodejs
```

4. **Deploy**:
```bash
git push heroku main
```

5. **Open App**:
```bash
heroku open
```

### Your App Will Be Live At:
`https://finguide-app.herokuapp.com`

---

## 📦 Prepare for Deployment

Before deploying, we need to add some files:

### 1. Add Gunicorn (for production server)
Already in requirements.txt, but let's verify.

### 2. Add Procfile for Heroku
Create `Procfile` in root directory.

### 3. Update CORS Settings
Backend already configured for production.

### 4. Environment Variables
Set these in your deployment platform:
- `FLASK_ENV=production`
- `SECRET_KEY=your-secret-key-here`

---

## 🔒 Security Checklist

Before deploying:
- [ ] Remove any API keys from code
- [ ] Set environment variables
- [ ] Enable HTTPS
- [ ] Update CORS settings
- [ ] Add rate limiting (optional)
- [ ] Set up monitoring

---

## 📊 Post-Deployment

### Monitor Your App
- Check logs for errors
- Test all features
- Monitor performance
- Set up alerts

### Update Your Repository
Add deployment badge to README:
```markdown
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)
```

---

## 🐛 Troubleshooting

### Issue: Build Fails
**Solution**: Check build logs, ensure all dependencies are listed

### Issue: App Crashes
**Solution**: Check application logs, verify environment variables

### Issue: CORS Errors
**Solution**: Update CORS settings in backend/app.py

### Issue: Static Files Not Loading
**Solution**: Check build directory and paths

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Render | ✅ 750 hours/month | From $7/month |
| Vercel | ✅ Unlimited | From $20/month |
| Railway | ✅ $5 credit/month | Pay as you go |
| Heroku | ✅ 550 hours/month | From $7/month |

---

## 🎯 Recommended: Render

**Why Render?**
- ✅ Easiest setup
- ✅ Free tier sufficient for hackathon
- ✅ Automatic deployments
- ✅ No credit card required
- ✅ Good performance
- ✅ Simple configuration

---

## 📝 Next Steps

1. Choose a deployment platform
2. Follow the guide above
3. Deploy your app
4. Test thoroughly
5. Share the live URL!

---

**Need help? Check the platform-specific documentation or ask for assistance!**
