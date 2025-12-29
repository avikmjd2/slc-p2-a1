from pymongo import MongoClient

def seed_data():
    try:
        # 1. Connect to your laptop's port 27017
        # No username/password needed now
        client = MongoClient("mongodb://localhost:27018/", serverSelectionTimeoutMS=2000)
        
        db = client["iiit_clubs"]
        collection = db["clubs_list"]

        # 2. Test Connection
        client.admin.command('ping')
        print("✅ Connected to MongoDB!")

        # 3. Wipe any existing data
        collection.delete_many({})
        print("🗑️  Cleared old data.")

        # 4. Your clubs from Task 1
        my_clubs = [
            {"cid": "hacking-club", "name": "Hacking Club"},
            {"cid": "dance-village", "name": "Dance Village"},
            {"cid": "electronics-club", "name": "Electronics Club"}
        ]
        
        collection.insert_many(my_clubs)
        print(f"🚀 Successfully seeded {len(my_clubs)} clubs!")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    seed_data()