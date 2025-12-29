import pymongo

client = pymongo.MongoClient("mongodb://localhost:27018")
db = client["iiit_clubs"]
collection = db["clubs_list"]

result = collection.delete_many({})

print(f"Successfully deleted {result.deleted_count} clubs.")