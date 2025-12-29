import strawberry 
from fastapi import FastAPI
import motor.motor_asyncio
from strawberry.fastapi import GraphQLRouter
import strawberry.federation

@strawberry.type
class Event:
    eid: str
    name: str
    clubid: str
    time:str
    location:str
    mode:str
    description: str | None = "No description available."
    
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://db:27017")
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
            Events.append(Event(eid=doc["eid"],name=doc["name"],description=doc.get("description", "No description defined"),clubid=doc.get("clubid",""),location=doc.get("location",""),mode=doc.get("mode","")))
        return Events

schema = strawberry.federation.Schema(query=Query)
app = FastAPI()
app.include_router(GraphQLRouter(schema), prefix="/graphql")