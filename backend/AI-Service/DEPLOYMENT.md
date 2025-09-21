# 🚀 TripMitra AI Service Deployment Guide

This guide covers multiple deployment options for the TripMitra AI Service.

## 📋 Prerequisites

- Python 3.10+
- MongoDB Atlas account
- GitHub repository with your code
- Required environment variables

## 🔧 Environment Variables

Create a `.env` file or set these environment variables:

```bash
MONGODB_URL=mongodb+srv://harshdixit779:Hash%2312%40atlas@demo.8kbhy.mongodb.net/
DB_NAME=tripmitra
COLLECTION_NAME=preferences
GOOGLE_API_KEY=your_google_api_key_here
APP_NAME=trip_mitra_agent
MODEL_ID=gemini-2.0-flash
```

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Easiest)

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect the Dockerfile
6. Add environment variables in the Railway dashboard
7. Deploy!

**Pros:**
- ✅ Automatic deployments from GitHub
- ✅ Built-in MongoDB support
- ✅ Free tier available
- ✅ Easy environment variable management

**Cost:** Free tier → $5/month

---

### Option 2: Render

**Steps:**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables
7. Deploy!

**Pros:**
- ✅ Free tier available
- ✅ Automatic deployments
- ✅ Good for Python apps

**Cost:** Free tier → $7/month

---

### Option 3: Heroku

**Steps:**
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create tripmitra-ai-service`
4. Add MongoDB addon: `heroku addons:create mongolab:sandbox`
5. Set environment variables:
   ```bash
   heroku config:set MONGODB_URL="your_mongodb_url"
   heroku config:set DB_NAME="tripmitra"
   heroku config:set COLLECTION_NAME="preferences"
   ```
6. Deploy: `git push heroku main`

**Pros:**
- ✅ Very popular platform
- ✅ Lots of documentation
- ✅ Easy Git-based deployment

**Cost:** $7/month (no free tier)

---

### Option 4: DigitalOcean App Platform

**Steps:**
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect GitHub repository
4. Configure:
   - **Type:** Web Service
   - **Build Command:** `pip install -r requirements.txt`
   - **Run Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy!

**Pros:**
- ✅ Good performance
- ✅ Reasonable pricing
- ✅ Easy scaling

**Cost:** $5/month

---

### Option 5: AWS/GCP/Azure (Advanced)

For enterprise deployments, consider:
- **AWS:** Elastic Beanstalk, ECS, or Lambda
- **GCP:** Cloud Run or App Engine
- **Azure:** Container Instances or App Service

## 🐳 Docker Deployment

If you want to deploy using Docker:

```bash
# Build the image
docker build -t tripmitra-ai-service .

# Run locally
docker run -p 8000:8000 --env-file .env tripmitra-ai-service

# Push to Docker Hub
docker tag tripmitra-ai-service yourusername/tripmitra-ai-service
docker push yourusername/tripmitra-ai-service
```

## 🔍 Testing Your Deployment

After deployment, test your endpoints:

```bash
# Health check
curl https://your-app-url.com/

# Test AI response
curl -X POST https://your-app-url.com/response \
  -H "Content-Type: application/json" \
  -d '{
    "user_query": "Plan a 3-day trip to Paris",
    "user_id": "test123",
    "user_meta": {}
  }'

# Test preferences
curl https://your-app-url.com/preferences/test123
```

## 📊 Monitoring

- **Railway:** Built-in metrics and logs
- **Render:** Built-in monitoring
- **Heroku:** Heroku Metrics
- **DigitalOcean:** App Platform monitoring

## 🔧 Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check MongoDB URL and credentials
   - Ensure IP whitelist includes deployment IP

2. **Google AI API Issues**
   - Verify API key is correct
   - Check API quotas and billing

3. **Build Failures**
   - Check Python version compatibility
   - Verify all dependencies in requirements.txt

4. **Memory Issues**
   - Increase memory allocation in platform settings
   - Optimize Docker image size

## 🚀 Quick Start (Railway)

1. **Fork/Clone this repository**
2. **Go to [railway.app](https://railway.app)**
3. **Connect GitHub account**
4. **Click "New Project" → "Deploy from GitHub repo"**
5. **Select your repository**
6. **Add environment variables:**
   - `MONGODB_URL`: Your MongoDB connection string
   - `DB_NAME`: tripmitra
   - `COLLECTION_NAME`: preferences
7. **Click "Deploy"**
8. **Wait for deployment to complete**
9. **Test your API!**

## 📝 API Documentation

Once deployed, visit:
- `https://your-app-url.com/docs` - Interactive API docs
- `https://your-app-url.com/redoc` - Alternative API docs

## 🎉 Success!

Your TripMitra AI Service is now deployed and ready to handle trip planning requests with personalized user preferences!
