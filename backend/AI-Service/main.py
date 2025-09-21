from fastapi import FastAPI
from models.payload import UserQueryPayload

from services.agent.response import get_response

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/response")
async def get_agent_response(payload: UserQueryPayload):
    
    response = await get_response(payload)
    return {"response": response}

