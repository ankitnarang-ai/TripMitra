from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime


class Preferences(BaseModel):
    """Preferences nested object matching MongoDB structure"""
    comfortRating: Optional[int] = Field(description="Comfort rating (1-5)", default=None)
    budget: Optional[str] = Field(description="Budget range", default=None)
    duration: Optional[str] = Field(description="Preferred trip duration", default=None)
    travelStyle: Optional[str] = Field(description="Travel style preference", default=None)
    accommodation: Optional[str] = Field(description="Accommodation preference", default=None)
    activities: Optional[List[str]] = Field(description="Preferred activities", default=[])


class UserPreferences(BaseModel):
    """User preferences model matching MongoDB document structure"""
    user_id: str = Field(description="Unique user identifier")
    preferences: Preferences = Field(description="User preferences object")
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow, description="Creation timestamp")
    v: Optional[int] = Field(default=0, alias="__v", description="Version field")

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        # Allow field names that start with underscore
        populate_by_name = True


class PreferencesUpdate(BaseModel):
    """Model for updating user preferences"""
    comfortRating: Optional[int] = None
    budget: Optional[str] = None
    duration: Optional[str] = None
    travelStyle: Optional[str] = None
    accommodation: Optional[str] = None
    activities: Optional[List[str]] = None
