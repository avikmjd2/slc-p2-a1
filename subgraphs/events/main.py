import strawberry 
from fastapi import FastAPI
import motor.motor_asyncio
from strawberry.fastapi import GraphQLRouter
import strawberry.federation
import os

@strawberry.type
class Event:
    eid: str=""
    name: str=""
    clubid: str=""
    time:str=""
    location:str=""
    mode:str=""
    description: str | None = "No description available."
    
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27018")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
database = client["iiit_clubs"]
collection = database["events_list"]
# collection = database["events_list"]
# collection = database["events_list"]

@strawberry.type
class Query:
    @strawberry.field
    async def all_events(self) -> list[Event]:
        Events =[]
        async for doc in collection.find({}):
            Events.append(Event(
                eid=str(doc.get("eid", "")),
                name=doc.get("name", "Untitled Event"),
                description=doc.get("description", "No description available."),
                clubid=doc.get("clubid", ""),
                location=doc.get("location", "TBD"),
                mode=doc.get("mode", "Unknown"),
                time=doc.get("time", "No time set")
            ))
        return Events

schema = strawberry.federation.Schema(query=Query)
app = FastAPI()
app.include_router(GraphQLRouter(schema), prefix="/graphql")