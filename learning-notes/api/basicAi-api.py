# ================================
# Gemini 2.5 Flash - Python Example
# ================================
#
# Requirements:
# 1. Python installed
# 2. Install requests library:
#       pip install requests
# 3. Replace YOUR_API_KEY with your actual API key
#
# How to run:
#   cd "C:\Learn Coding\Ryo-s-Journey\api"
#   python basicAi-api.py
#
# Structure explanation:
# - systemInstruction → defines AI personality
# - contents → conversation container
# - role → who is speaking (usually "user")
# - parts → message wrapper
# - text → actual question

import requests

# Your API key
API_KEY = "YOUR_API_KEY"

# Gemini API endpoint
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

# Request headers
headers = {
    "Content-Type": "application/json"
}

# Request body (JSON payload)
data = {
    # Define AI behavior/personality
    "systemInstruction": {
        "parts": [
            {
                "text": "You are a futuristic AI assistant that is knowledgeable and precise."
            }
        ]
    },
    # User message
    "contents": [
        {
            "role": "user",
            "parts": [
                {
                    "text": "Mention 3 key features of Gemini 2.5 Flash."
                }
            ]
        }
    ]
}

# Send POST request
response = requests.post(url, headers=headers, json=data)

#
