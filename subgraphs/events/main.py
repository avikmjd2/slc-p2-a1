import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry.federation

@strawberry.type
class Event:
    id: str
    name: str
    location: str
    date: str

@strawberry.type
class Query:
    @strawberry.field
    def all_events(self) -> list[Event]:
        return [
            Event(id="1", name="Hacking Workshop", location="Nilgiri", date="Jan 5"),
            Event(id="2", name="Dance Trials", location="OBH", date="Jan 10")
        ]

schema = strawberry.federation.Schema(query=Query)
app = FastAPI()
app.include_router(GraphQLRouter(schema), prefix="/graphql")