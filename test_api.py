import requests
import json

url = "https://connect.intellizence.com/api/news"
headers = {
    "x-api-key": "d6b1a63727159274e0d83042713ee999",
    "Content-Type": "application/json"
}
payload = {"pageSize": 1}

try:
    response = requests.post(url, headers=headers, json=payload)
    data = response.json()
    if data.get("news"):
        item = data["news"][0]
        print(json.dumps(item, indent=2))
    else:
        print(f"No news found. Response: {data}")
except Exception as e:
    print(f"Error: {e}")
