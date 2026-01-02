import strawberry 
from fastapi import FastAPI
import motor.motor_asyncio
from strawberry.fastapi import GraphQLRouter
import strawberry.federation
from enum import Enum
import os

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27018")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
database = client["iiit_clubs"]
collection = database["clubs_list"]

@strawberry.enum
class EnumStates(str, Enum):
    """Enum for state of the club."""

    active = "active"
    deleted = "deleted"

@strawberry.type
class Club:
    cid:str
    name:str
    purpose:str
    state: EnumStates
    logo: str | None
    tagline: str | None
    
    
@strawberry.type #fetch
class Query:
    @strawberry.field
    async def all_clubs(self)->list[Club]:
        clubs = []
        async for doc in collection.find({}):
            clubs.append(Club(cid=doc["cid"],name=doc["name"],purpose=doc.get("purpose", "No purpose defined"),state=EnumStates(doc.get("state","active")),logo=doc.get("logo",""),tagline=doc.get("tagline","")))
        return(clubs)
    
@strawberry.type
class Mutation:
    @strawberry.mutation
    async def add_club(self, name: str, purpose: str,state:EnumStates,logo:str,tagline:str) -> Club:

        cid = name.lower().replace(" ", "-")
        
        new_club_data = {
            "name": name,
            "cid": cid,
            "purpose": purpose, 
            "state" : state,
            "logo":logo,
            "tagline":tagline
        }
        
        await database["clubs_list"].insert_one(new_club_data)
        

        return Club(
            cid=cid, 
            name=name, 
            purpose=purpose, 
            state=state, 
            logo=logo, 
            tagline=tagline
        )
    
schema = strawberry.federation.Schema(query=Query,mutation=Mutation)
app = FastAPI()
app.include_router(GraphQLRouter(schema), prefix="/graphql")