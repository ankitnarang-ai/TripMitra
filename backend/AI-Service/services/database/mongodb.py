import os
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection string from environment variables
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb+srv://harshdixit779:Hash%2312%40atlas@demo.8kbhy.mongodb.net/")
DB_NAME = os.getenv("DB_NAME", "tripmitra")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "preferences")

# Async MongoDB client for FastAPI
async_client = None

def get_async_client():
    """Get async MongoDB client"""
    global async_client
    if async_client is None:
        async_client = AsyncIOMotorClient(MONGODB_URL)
    return async_client

def get_sync_client():
    """Get sync MongoDB client for testing"""
    return MongoClient(MONGODB_URL)

async def get_database():
    """Get database instance"""
    client = get_async_client()
    return client[DB_NAME]

async def get_preferences_collection():
    """Get preferences collection"""
    db = await get_database()
    return db[COLLECTION_NAME]

async def close_connection():
    """Close MongoDB connection"""
    global async_client
    if async_client:
        async_client.close()
        async_client = None
