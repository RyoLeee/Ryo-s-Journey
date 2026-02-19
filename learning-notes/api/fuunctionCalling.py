import requests

API_KEY = "YOUR_API_KEY"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

headers = {
    "Content-Type": "Application/json"
}

find_crypto = {
    "name": "find_crypto",
    "description": "Use this when users ask for the latest price of a cryptocurrency token.",
    "parameters": {
        "type": "object",
        "properties": {
            "token_symbol": {
                "type": "string",
                "description": "Cryptocurrency symbol, for example BTC, ETH, BNB."
            },
            "currency_symbol": {
                "type": "string",
                "description": "Currency to compare against, for example USDT, USD, or IDR."
            }
        },
        "required": ["token_symbol", "currency_symbol"]
    }
}

tools = [
    find_crypto,
]