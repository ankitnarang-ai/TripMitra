import asyncio 
from google.adk.agents import Agent
from google.adk.tools import FunctionTool
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from dotenv import load_dotenv

from ..tools.tools import weather_tool,sentiment_tool
from .prompt import agent_instrution
from .format import AgentOutputSchema


load_dotenv()

MODEL_ID="gemini-2.0-flash"
AGENT_NAME="trip_mitra_agent"


# Agent
trip_mitra_agent = Agent(
    model=MODEL_ID,
    name=AGENT_NAME,
    instruction=agent_instrution,
    tools=[weather_tool, sentiment_tool],
    output_schema=AgentOutputSchema
)
