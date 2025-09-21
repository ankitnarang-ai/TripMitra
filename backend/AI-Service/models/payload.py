from typing import Any, Dict
from pydantic import BaseModel


class UserQueryPayload(BaseModel):
    """
    Schema for user query payload containing the query and metadata.
    """
    user_query: str
    user_meta: Dict[str, Any]
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_query": "Plan a 3-day trip to Paris",
                "user_meta": {
                    "user_id": "12345",
                    "preferences": {
                        "budget": "medium",
                        "interests": ["museums", "food", "history"]
                    },
                    "location": "New York"
                }
            }
        }
