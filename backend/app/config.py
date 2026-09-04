import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GATEWAY_CSV_PATH: str = os.getenv(
        "GATEWAY_CSV_PATH",
        "data/gateway_logs.csv"
    )
    BANK_CSV_PATH: str = os.getenv(
        "BANK_CSV_PATH",
        "data/bank_settlements.csv"
    )
    LEDGER_CSV_PATH: str = os.getenv(
        "LEDGER_CSV_PATH",
        "data/ledger_entries.csv"
    )

settings = Settings()