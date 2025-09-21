from typing import Any, Dict, Optional
from pydantic import BaseModel


class UserQueryPayload(BaseModel):
    """
    Schema for user query payload containing the query and metadata.
    """
    user_query: str
    user_id: str
    user_meta: Optional[Dict[str, Any]] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_query": "Plan a 3-day trip to Paris",
                "user_id": "user12345",
                "user_meta": {
                    "preferences": {
                        "budget": "medium",
                        "interests": ["museums", "food", "history"]
                    },
                    "location": "New York"
                }
            }
        }
