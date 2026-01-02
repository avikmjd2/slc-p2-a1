import requests
import pymongo
import os

# 1. Connect to YOUR local MongoDB (New Project Port)
# Port 27018 is usually the one mapped in your slc-2 docker-compose
# client = pymongo.MongoClient("mongodb://localhost:27018")
client = os.getenv("MONGO_URL", "mongodb://localhost:27018/iiit_clubs")
client = pymongo.MongoClient(client)
db = client["iiit_clubs"]
collection = db["clubs_list"]

def sync_clubs():
    url = "https://clubs.iiit.ac.in/graphql"
    # Use the working query we just discovered
    payload = {"query": "{ allClubs { cid name } }"}
    
    print("Fetching clubs from IIIT official server...")
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        # Extract the list from the JSON response
        public_clubs = response.json()['data']['allClubs']
        print(f"Retrieved {len(public_clubs)} clubs. Starting import...")

        for club in public_clubs:
            # Prepare the document to match your NEW schema
            # We map 'name' and 'cid' directly, and fill the rest with defaults
            document = {
                "cid": club['cid'],
                "name": club['name'],
                "purpose": f"Official IIIT club: {club['name']}",
                "state": "active",
                "logo": "",
                "tagline": ""
            }

            # 'upsert=True' means: if cid exists, update it. If not, create it.
            # This prevents duplicate clubs if you run the script twice.
            collection.update_one(
                {"cid": club['cid']},
                {"$set": document},
                upsert=True
            )
        
        print("✅ Success! Your local database is now populated.")
    else:
        print(f"Error fetching data: {response.status_code}")

if __name__ == "__main__":
    sync_clubs()