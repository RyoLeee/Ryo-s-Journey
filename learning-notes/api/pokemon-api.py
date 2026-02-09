"""
Pokémon Spin Machine

How to use:

1. Make sure Python is installed.
2. Install the required package:
   pip install requests

3. Call the function at the bottom:
   print(spin_machine(20))

   10 coins = 1 spin

4. Run the file in terminal:
   python filename.py
"""

import requests
import random
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

POKEMON_URL = "https://pokeapi.co/api/v2/pokemon"

session = requests.Session()
session.headers.update({
    "User-Agent": "RyoApp/1.0",
    "Accept": "application/json",
})

retry_strategy = Retry(
    total=3,
    backoff_factor=1,
    status_forcelist=[429, 500, 502, 503, 504],
)

adapter = HTTPAdapter(max_retries=retry_strategy)
session.mount("https://", adapter)


def get_random_pokemon_id():
    return random.randint(1, 1025)


def spin_machine(coins):
    if coins < 10:
        return "Not enough coins to spin."

    spins = coins // 10
    results = []

    while spins > 0:
        try:
            response = session.get(
                f"{POKEMON_URL}/{get_random_pokemon_id()}",
                timeout=(5, 10)
            )
            pokemon_data = response.json()
            results.append(pokemon_data)
            spins -= 1

        except requests.exceptions.Timeout:
            return "Request timed out."
        except Exception as error:
            return f"Error: {error}"

    output = "\n🎴 Pokémon Spin Results:\n"
    output += "-" * 30 + "\n"

    for index, pokemon in enumerate(results, start=1):
        output += (
            f"{index}. {pokemon['name'].title()}\n"
            f"   ID: {pokemon['id']}\n"
            f"   Height: {pokemon['height']}\n"
            f"   Weight: {pokemon['weight']}\n"
            + "-" * 30 + "\n"
        )

    return output


print(spin_machine(20))
