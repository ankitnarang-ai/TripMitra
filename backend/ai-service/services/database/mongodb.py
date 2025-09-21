import os
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def get_mongodb_url():
    """Get MongoDB URL with fallback"""
    url = os.getenv("MONGODB_URL", "mongodb+srv://harshdixit779:Hash%2312%40atlas@demo.8kbhy.mongodb.net/")
    if not url.endswith('/'):
        url += '/'
    return url

def get_db_name():
    """Get database name with fallback"""
    return os.getenv("DB_NAME", "tripmitra")

def get_collection_name():
    """Get collection name with fallback"""
    return os.getenv("COLLECTION_NAME", "preferences")

# MongoDB connection string from environment variables
MONGODB_URL = get_mongodb_url()
DB_NAME = get_db_name()
COLLECTION_NAME = get_collection_name()

# Async MongoDB client for FastAPI
async_client = None

def get_async_client():
    """Get async MongoDB client"""
    global async_client
    if async_client is None:
        async_client = AsyncIOMotorClient(get_mongodb_url())
    return async_client

def get_sync_client():
    """Get sync MongoDB client for testing"""
    return MongoClient(get_mongodb_url())

async def get_database():
    """Get database instance"""
    client = get_async_client()
    return client[get_db_name()]

async def get_preferences_collection():
    """Get preferences collection"""
    db = await get_database()
    return db[get_collection_name()]

async def close_connection():
    """Close MongoDB connection"""
    global async_client
    if async_client:
        async_client.close()
        async_client = None
