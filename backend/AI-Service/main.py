from fastapi import FastAPI, HTTPException
from models.payload import UserQueryPayload
from models.user_preferences import UserPreferences, PreferencesUpdate
from services.agent.response import get_response
from services.database.preferences_service import PreferencesService

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/response")
async def get_agent_response(payload: UserQueryPayload):
    response = await get_response(payload)
    return {"response": response}


@app.get("/preferences/{user_id}")
async def get_user_preferences(user_id: str):
    """Get user preferences by user_id"""
    try:
        preferences = await PreferencesService.get_user_preferences(user_id)
        if not preferences:
            raise HTTPException(status_code=404, detail="User preferences not found")
        return preferences
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving preferences: {str(e)}")


@app.post("/preferences")
async def create_user_preferences(preferences: UserPreferences):
    """Create new user preferences"""
    try:
        success = await PreferencesService.create_user_preferences(preferences)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to create preferences")
        return {"message": "Preferences created successfully", "user_id": preferences.user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating preferences: {str(e)}")


@app.put("/preferences/{user_id}")
async def update_user_preferences(user_id: str, preferences_update: PreferencesUpdate):
    """Update user preferences"""
    try:
        success = await PreferencesService.update_user_preferences(user_id, preferences_update)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to update preferences")
        return {"message": "Preferences updated successfully", "user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating preferences: {str(e)}")


@app.delete("/preferences/{user_id}")
async def delete_user_preferences(user_id: str):
    """Delete user preferences"""
    try:
        success = await PreferencesService.delete_user_preferences(user_id)
        if not success:
            raise HTTPException(status_code=404, detail="User preferences not found")
        return {"message": "Preferences deleted successfully", "user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting preferences: {str(e)}")


@app.post("/preferences/{user_id}/upsert")
async def upsert_user_preferences(user_id: str, preferences_data: dict):
    """Upsert user preferences (create or update)"""
    try:
        success = await PreferencesService.upsert_user_preferences(user_id, preferences_data)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to upsert preferences")
        return {"message": "Preferences upserted successfully", "user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error upserting preferences: {str(e)}")

