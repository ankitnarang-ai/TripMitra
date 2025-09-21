#!/usr/bin/env python3
"""
Test script to verify the service works correctly before Render deployment
"""

import asyncio
import json
import os
from main import app
from models.payload import UserQueryPayload
from services.database.preferences_service import PreferencesService

# Set environment variables for testing
os.environ["MONGODB_URL"] = "mongodb+srv://harshdixit779:Hash%2312%40atlas@demo.8kbhy.mongodb.net/"
os.environ["DB_NAME"] = "tripmitra"
os.environ["COLLECTION_NAME"] = "preferences"

async def test_service():
    """Test the service functionality"""
    print("🧪 Testing TripMitra AI Service...")
    
    try:
        # Test 1: Basic imports
        print("✅ All imports successful")
        
        # Test 2: MongoDB connection
        print("🔗 Testing MongoDB connection...")
        test_prefs = await PreferencesService.get_preferences_summary("test_user")
        print("✅ MongoDB connection working")
        
        # Test 3: Create test preferences
        print("📝 Creating test preferences...")
        test_data = {
            "comfortRating": 4,
            "budget": "30k-50k",
            "duration": "1-week",
            "travelStyle": "adventure",
            "accommodation": "hotel",
            "activities": ["hiking", "photography"]
        }
        
        success = await PreferencesService.upsert_user_preferences("test_user", test_data)
        if success:
            print("✅ Test preferences created successfully")
        else:
            print("❌ Failed to create test preferences")
            return False
        
        # Test 4: Retrieve preferences
        print("📖 Retrieving test preferences...")
        retrieved = await PreferencesService.get_user_preferences("test_user")
        if retrieved:
            print("✅ Test preferences retrieved successfully")
            print(f"   Budget: {retrieved.preferences.budget}")
            print(f"   Travel Style: {retrieved.preferences.travelStyle}")
        else:
            print("❌ Failed to retrieve test preferences")
            return False
        
        # Test 5: Clean up test data
        print("🧹 Cleaning up test data...")
        await PreferencesService.delete_user_preferences("test_user")
        print("✅ Test data cleaned up")
        
        print("\n🎉 All tests passed! Service is ready for Render deployment.")
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_payload_validation():
    """Test payload validation"""
    print("📋 Testing payload validation...")
    
    try:
        # Test valid payload
        valid_payload = UserQueryPayload(
            user_query="Plan a trip to Paris",
            user_id="test123",
            user_meta={"test": "data"}
        )
        print("✅ Valid payload created successfully")
        
        # Test payload serialization
        payload_dict = valid_payload.model_dump()
        print("✅ Payload serialization working")
        
        return True
        
    except Exception as e:
        print(f"❌ Payload validation failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 TripMitra AI Service - Pre-Deployment Test")
    print("=" * 50)
    
    # Test payload validation
    if not test_payload_validation():
        print("❌ Payload validation failed. Check your models.")
        exit(1)
    
    # Test service functionality
    if asyncio.run(test_service()):
        print("\n✅ Service is ready for Render deployment!")
        print("\nNext steps:")
        print("1. Commit and push your changes to GitHub")
        print("2. Go to render.com and create a new web service")
        print("3. Connect your GitHub repository")
        print("4. Set the root directory to 'backend/ai-service'")
        print("5. Deploy!")
    else:
        print("\n❌ Service tests failed. Fix issues before deploying.")
        exit(1)
