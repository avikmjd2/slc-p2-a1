import requests
import json

url = "https://clubs.iiit.ac.in/graphql"
headers = {"Content-Type": "application/json"}

# This payload matches your curl -d exactly
payload = {
    # "query": "query ActiveClubs { activeClubs { cid name } }"
    "query": "query AllClubs { allClubs { cid name } }"
}

print("Requesting data from IIIT Clubs...")
response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    data = response.json()
    # This acts like the '| jq' part of your command
    print(json.dumps(data, indent=4))
else:
    print(f"Failed to fetch. Status code: {response.status_code}")
    print(f"Response: {response.text}")