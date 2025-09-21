from fastapi import FastAPI
from models.payload import UserQueryPayload

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/response")
async def get_response(payload: UserQueryPayload):
    return {"response": "This is a sample response"}

