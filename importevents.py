# import requests
# import json

# url = "https://clubs.iiit.ac.in/graphql"
# headers = {"Content-Type": "application/json"}

# # This matches the query from your assignment prompt
# payload = {
#     "query": "query Events($limit: Int) { events(limit: $limit) { _id name clubid datetimeperiod location mode } }",
#     "variables": {"limit": 5}
# }

# print("Fetching raw events from IIIT server...")
# response = requests.post(url, json=payload, headers=headers)

# if response.status_code == 200:
#     print(json.dumps(response.json(), indent=4))
# else:
#     print(f"Error {response.status_code}: {response.text}")

import requests
import pymongo
import os

# Connect to your local MongoDB
# client = pymongo.MongoClient("mongodb://localhost:27018")
client = os.getenv("MONGO_URL", "mongodb://localhost:27018/iiit_clubs")
client = pymongo.MongoClient(client)
db = client["iiit_clubs"]
collection = db["events_list"]

def sync_events():
    url = "https://clubs.iiit.ac.in/graphql"
    payload = {
        "query": "query Events($limit: Int) { events(limit: $limit) { _id name clubid datetimeperiod location mode } }",
        "variables": {"limit": 20}
    }
    
    print("Fetching events...")
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        public_events = response.json()['data']['events']
        
        # Clear existing to avoid duplicates
        collection.delete_many({})
        
        for event in public_events:
            # Handle the Arrays safely
            # We take the first element if it's a list, otherwise use a default
            start_time = event['datetimeperiod'][0] if event['datetimeperiod'] else "No time set"
            loc = event['location'][0] if event['location'] else "TBD"

            event_doc = {
                "eid": event['_id'],
                "name": event['name'],
                "clubid": event['clubid'],
                "time": start_time, # Store as a string for now
                "location": loc,
                "mode": event['mode']
            }
            
            collection.insert_one(event_doc)
            
        print(f"✅ Successfully imported {len(public_events)} events!")

if __name__ == "__main__":
    sync_events()