# 🚀 Render Deployment Guide for TripMitra AI Service

This guide will walk you through deploying your TripMitra AI Service on Render platform.

## 📋 Prerequisites

- GitHub repository with your code
- MongoDB Atlas account (already configured)
- Render account (free tier available)

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Ensure all files are committed and pushed to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin harsh-ai-service
   ```

2. **Verify these files exist in your repository:**
   - ✅ `main.py`
   - ✅ `requirements.txt`
   - ✅ `render.yaml` (optional, for advanced configuration)
   - ✅ All service files in `services/` directory

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account
4. Authorize Render to access your repositories

### Step 3: Deploy Your Service

1. **Click "New +" → "Web Service"**

2. **Connect Repository:**
   - Select "Build and deploy from a Git repository"
   - Choose your GitHub account
   - Select the `TripMitra` repository
   - Choose branch: `harsh-ai-service`

3. **Configure Service:**
   - **Name:** `tripmitra-ai-service`
   - **Environment:** `Python 3`
   - **Region:** `Oregon (US West)`
   - **Branch:** `harsh-ai-service`
   - **Root Directory:** `backend/ai-service`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Set Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   MONGODB_URL = mongodb+srv://harshdixit779:Hash%2312%40atlas@demo.8kbhy.mongodb.net/
   DB_NAME = tripmitra
   COLLECTION_NAME = preferences
   PYTHON_VERSION = 3.10.0
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for the build to complete (5-10 minutes)
   - Your service will be available at `https://tripmitra-ai-service.onrender.com`

### Step 4: Verify Deployment

1. **Health Check:**
   ```bash
   curl https://tripmitra-ai-service.onrender.com/
   ```
   Should return: `{"Hello": "World"}`

2. **Test AI Endpoint:**
   ```bash
   curl -X POST https://tripmitra-ai-service.onrender.com/response \
     -H "Content-Type: application/json" \
     -d '{
       "user_query": "Plan a 3-day trip to Paris",
       "user_id": "test123",
       "user_meta": {}
     }'
   ```

3. **Test Preferences Endpoint:**
   ```bash
   curl https://tripmitra-ai-service.onrender.com/preferences/test123
   ```

## 🔧 Configuration Details

### Render Service Settings

| Setting | Value |
|---------|-------|
| **Name** | tripmitra-ai-service |
| **Environment** | Python 3 |
| **Region** | Oregon (US West) |
| **Plan** | Free |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Health Check Path** | `/` |

### Environment Variables

| Variable | Value |
|----------|-------|
| `MONGODB_URL` | `mongodb+srv://harshdixit779:Hash%2312%40atlas@demo.8kbhy.mongodb.net/` |
| `DB_NAME` | `tripmitra` |
| `COLLECTION_NAME` | `preferences` |
| `PYTHON_VERSION` | `3.10.0` |

## 📊 Monitoring & Logs

1. **View Logs:**
   - Go to your service dashboard
   - Click "Logs" tab
   - Monitor real-time logs

2. **Health Monitoring:**
   - Render automatically monitors your service
   - Health checks run every 5 minutes
   - Service restarts automatically if it fails

3. **Metrics:**
   - CPU usage
   - Memory usage
   - Response times
   - Request counts

## 🔄 Auto-Deployments

Render automatically deploys when you push to your branch:

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Update AI service"
   git push origin harsh-ai-service
   ```

2. **Render detects changes and rebuilds automatically**
3. **New deployment goes live in 5-10 minutes**

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check `requirements.txt` for all dependencies
   - Verify Python version compatibility
   - Check build logs for specific errors

2. **Service Won't Start:**
   - Verify start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Check if all imports are working
   - Verify environment variables are set

3. **MongoDB Connection Issues:**
   - Ensure MongoDB URL is correct
   - Check if IP whitelist includes Render's IPs
   - Verify database and collection names

4. **Memory Issues:**
   - Free tier has 512MB RAM limit
   - Consider upgrading to paid plan if needed
   - Optimize your code for memory usage

### Debug Steps:

1. **Check Logs:**
   ```bash
   # In Render dashboard, go to Logs tab
   # Look for error messages
   ```

2. **Test Locally:**
   ```bash
   cd backend/ai-service
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

3. **Verify Environment Variables:**
   - Go to Environment tab in Render dashboard
   - Ensure all variables are set correctly

## 💰 Pricing

- **Free Tier:** 750 hours/month, 512MB RAM
- **Starter Plan:** $7/month, 512MB RAM, always on
- **Standard Plan:** $25/month, 1GB RAM, always on

## 🔗 API Documentation

Once deployed, access your API docs at:
- **Swagger UI:** `https://tripmitra-ai-service.onrender.com/docs`
- **ReDoc:** `https://tripmitra-ai-service.onrender.com/redoc`

## 🎉 Success!

Your TripMitra AI Service is now live on Render! 

**Service URL:** `https://tripmitra-ai-service.onrender.com`

### Available Endpoints:

- `GET /` - Health check
- `POST /response` - AI trip planning
- `GET /preferences/{user_id}` - Get user preferences
- `POST /preferences` - Create user preferences
- `PUT /preferences/{user_id}` - Update user preferences
- `DELETE /preferences/{user_id}` - Delete user preferences
- `POST /preferences/{user_id}/upsert` - Create or update preferences

### Next Steps:

1. **Test all endpoints** to ensure they work correctly
2. **Integrate with your frontend** using the service URL
3. **Monitor performance** and upgrade plan if needed
4. **Set up custom domain** (optional, paid feature)

Your AI service is now ready to handle trip planning requests with personalized user preferences! 🚀
