from typing import Optional, Dict, Any
from datetime import datetime
from .mongodb import get_preferences_collection
from models.user_preferences import UserPreferences, PreferencesUpdate, Preferences


class PreferencesService:
    """Service class for managing user preferences in MongoDB"""
    
    @staticmethod
    async def get_user_preferences(user_id: str) -> Optional[UserPreferences]:
        """Get user preferences by user_id"""
        try:
            collection = await get_preferences_collection()
            preferences_doc = await collection.find_one({"user_id": user_id})
            
            if preferences_doc:
                # Convert ObjectId to string and remove it from the document
                preferences_doc.pop("_id", None)
                return UserPreferences(**preferences_doc)
            return None
        except Exception as e:
            print(f"Error getting user preferences: {e}")
            return None
    
    @staticmethod
    async def create_user_preferences(preferences: UserPreferences) -> bool:
        """Create new user preferences"""
        try:
            collection = await get_preferences_collection()
            preferences_dict = preferences.dict()
            
            result = await collection.insert_one(preferences_dict)
            return result.inserted_id is not None
        except Exception as e:
            print(f"Error creating user preferences: {e}")
            return False
    
    @staticmethod
    async def update_user_preferences(user_id: str, preferences_update: PreferencesUpdate) -> bool:
        """Update user preferences"""
        try:
            collection = await get_preferences_collection()
            
            # Convert to dict and remove None values
            update_data = {k: v for k, v in preferences_update.dict().items() if v is not None}
            
            if not update_data:
                return True  # Nothing to update
            
            # Update the nested preferences object
            result = await collection.update_one(
                {"user_id": user_id},
                {"$set": {"preferences": update_data}},
                upsert=True  # Create if doesn't exist
            )
            return result.modified_count > 0 or result.upserted_id is not None
        except Exception as e:
            print(f"Error updating user preferences: {e}")
            return False
    
    @staticmethod
    async def upsert_user_preferences(user_id: str, preferences_data: Dict[str, Any]) -> bool:
        """Upsert user preferences (create or update)"""
        try:
            collection = await get_preferences_collection()
            
            # Check if user preferences exist
            existing = await collection.find_one({"user_id": user_id})
            
            if existing:
                # Update existing preferences
                result = await collection.update_one(
                    {"user_id": user_id},
                    {"$set": {"preferences": preferences_data}}
                )
                return result.modified_count > 0
            else:
                # Create new preferences
                new_preferences = {
                    "user_id": user_id,
                    "preferences": preferences_data,
                    "createdAt": datetime.utcnow(),
                    "__v": 0
                }
                result = await collection.insert_one(new_preferences)
                return result.inserted_id is not None
        except Exception as e:
            print(f"Error upserting user preferences: {e}")
            return False
    
    @staticmethod
    async def delete_user_preferences(user_id: str) -> bool:
        """Delete user preferences"""
        try:
            collection = await get_preferences_collection()
            result = await collection.delete_one({"user_id": user_id})
            return result.deleted_count > 0
        except Exception as e:
            print(f"Error deleting user preferences: {e}")
            return False
    
    @staticmethod
    async def get_preferences_summary(user_id: str) -> Optional[Dict[str, Any]]:
        """Get a summary of user preferences for AI agent"""
        try:
            preferences = await PreferencesService.get_user_preferences(user_id)
            if not preferences:
                return None
            
            return {
                "comfort_rating": preferences.preferences.comfortRating,
                "budget": preferences.preferences.budget,
                "duration": preferences.preferences.duration,
                "travel_style": preferences.preferences.travelStyle,
                "accommodation": preferences.preferences.accommodation,
                "activities": preferences.preferences.activities
            }
        except Exception as e:
            print(f"Error getting preferences summary: {e}")
            return None
