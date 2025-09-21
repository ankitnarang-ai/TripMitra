import asyncio 
from google.adk.agents import Agent
from google.adk.tools import FunctionTool
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from dotenv import load_dotenv

from ..tools.tools import weather_tool,sentiment_tool
from .prompt import agent_instrution, agent_instruction_1, agent_instruction_2
from .format import AgentOutputSchema


load_dotenv()

MODEL_ID="gemini-2.0-flash"
AGENT_NAME="trip_mitra_agent"


# Function to create agent with specific instruction
def create_agent(instruction_set=1):
    """Create agent with specified instruction set (1 or 2)"""
    instruction = agent_instruction_1 if instruction_set == 1 else agent_instruction_2
    return Agent(
        model=MODEL_ID,
        name=AGENT_NAME,
        instruction=instruction,
        tools=[weather_tool, sentiment_tool],
        output_schema=AgentOutputSchema
    )

# Default agent (using instruction 1 for direct JSON output)
trip_mitra_agent = create_agent(1)

# Alternative agent (using instruction 2 for conversational approach)
trip_mitra_agent_conversational = create_agent(2)
