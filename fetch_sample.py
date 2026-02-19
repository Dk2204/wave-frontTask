import requests
import json

url = "https://connect.intellizence.com/api/news"
headers = {
    "x-api-key": "d6b1a63727159274e0d83042713ee999",
    "Content-Type": "application/json"
}
payload = {"pageSize": 5}

try:
    response = requests.post(url, headers=headers, json=payload)
    data = response.json()
    with open("api_sample.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print("Saved sample to api_sample.json")
except Exception as e:
    print(f"Error: {e}")
