
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from models.payload import UserQueryPayload
from .intialize import trip_mitra_agent
from ..database.preferences_service import PreferencesService

APP_NAME="trip_mitra_agent"
ERROR_MESSAGE="We are currently Facing Issues Please contact later"

    
async def get_response(payload: UserQueryPayload):
    """Main function to run the agent asynchronously."""
    try:
        # Get user preferences from MongoDB
        user_preferences = await PreferencesService.get_preferences_summary(payload.user_id)
        
        # Create enhanced query with user preferences
        enhanced_query = payload.user_query
        
        if user_preferences:
            preferences_context = f"""
            
User Preferences:
- Budget: {user_preferences.get('budget', 'Not specified')}
- Travel Style: {user_preferences.get('travel_style', 'Not specified')}
- Duration: {user_preferences.get('duration', 'Not specified')}
- Accommodation: {user_preferences.get('accommodation', 'Not specified')}
- Comfort Rating: {user_preferences.get('comfort_rating', 'Not specified')}
- Activities: {', '.join(user_preferences.get('activities', [])) if user_preferences.get('activities') else 'Not specified'}

Please use these preferences to personalize the itinerary recommendations.
"""
            enhanced_query += preferences_context
        
        # Session and Runner Setup
        session_service = InMemorySessionService()
        # Use 'await' to correctly create the session
        await session_service.create_session(app_name=APP_NAME, user_id=payload.user_id, session_id=f"session_{payload.user_id}")

        runner = Runner(agent=trip_mitra_agent, app_name=APP_NAME, session_service=session_service)

        # Agent Interaction
        print(f"User Query: {enhanced_query}")
        content = types.Content(role='user', parts=[types.Part(text=enhanced_query)])

        # The runner's run method handles the async loop internally
        events = runner.run(user_id=payload.user_id, session_id=f"session_{payload.user_id}", new_message=content)

        final_response: str = ERROR_MESSAGE
        for event in events:
            if event.is_final_response():
                final_response = event.content.parts[0].text
                print("Agent Response:", final_response)
                
        return final_response
        
    except Exception as e:
        print(f"Error in get_response: {e}")
        return ERROR_MESSAGE

