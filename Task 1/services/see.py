from pymongo import MongoClient
import json

# Updated connection string with authentication
# format: mongodb://username:password@localhost:27019/
uri = "mongodb://username:password@localhost:27019/?authSource=admin"
client = MongoClient(uri)

# def inspect_all():
#     try:
#         # Get all database names
#         dbs = client.list_database_names() #
        
#         for db_name in dbs:
#             # Skip system databases
#             if db_name in ['admin', 'local', 'config']: continue
            
#             print(f"\n--- Database: {db_name} ---")
#             db = client[db_name]
            
#             collections = db.list_collection_names() #
#             for col_name in collections:
#                 print(f"  Collection: {col_name}")
#                 docs = list(db[col_name].find().limit(2)) #
#                 for doc in docs:
#                     print(f"    Sample Document: {doc}")
#     except Exception as e:
#         print(f"Connection failed: {e}")

# if __name__ == "__main__":
#     inspect_all()


def view_clubs():
    try:
        # 2. Access the 'dev' database and 'clubs' collection you discovered
        db = client["dev"]
        collection = db["clubs"]
        
        # 3. Fetch all documents
        # .find() returns a cursor you can iterate through
        clubs = list(collection.find())
        
        if not clubs:
            print("No clubs found in 'dev.clubs'. Check if the collection is empty.")
            return

        print(f"--- Found {len(clubs)} Clubs in the Old Database ---\n")
        
        for club in clubs:
            # We use json.dumps for a 'pretty' print in the terminal
            # We remove the '_id' just for cleaner viewing
            club_data = {k: v for k, v in club.items() if k != '_id'}
            print(json.dumps(club_data, indent=4))
            print("-" * 30)

    except Exception as e:
        print(f"Error: {e}")

# if __name__ == "__main__":
#     view_clubs()

def discover_data():
    try:
        # Get all database names accessible to this user
        dbs = client.list_database_names()
        
        print("--- Starting Discovery Scan ---")
        for db_name in dbs:
            # Skip standard system databases
            if db_name in ['admin', 'local', 'config']: continue
            
            db = client[db_name]
            # Get all collections in this database
            collections = db.list_collection_names()
            
            for col_name in collections:
                # Count documents to see if it's actually empty
                count = db[col_name].count_documents({})
                if count > 0:
                    print(f"\n📍 Found {count} docs in [{db_name}.{col_name}]")
                    # Show one sample document to identify the content
                    sample = db[col_name].find_one()
                    print(f"   Sample: {sample}")
                else:
                    print(f"   (Empty) [{db_name}.{col_name}]")
                    
    except Exception as e:
        print(f"Error during discovery: {e}")

# if __name__ == "__main__":
#     discover_data()

def deep_scan():
    # This will list EVERY database, even ones MongoDB tries to hide
    dbs = client.list_database_names()
    print(f"Databases found: {dbs}")
    
    for db_name in dbs:
        db = client[db_name]
        cols = db.list_collection_names()
        for col in cols:
            count = db[col].count_documents({})
            print(f"Checking {db_name}.{col} ... Count: {count}")
            if count > 0:
                print("!!! DATA FOUND HERE !!!")
                print(db[col].find_one())

if __name__ == "__main__":
    deep_scan()