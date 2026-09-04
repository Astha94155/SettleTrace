# PS-8 Settlement Q&A Agent Backend

An automated Fintech Settlement Q&A Agent that traces payment
transactions across Gateway, Bank, and Ledger systems and uses
Google Gemini to generate a plain-English diagnosis.

## Features

- Trace transactions across Gateway, Bank, and Ledger records
- Identify settlement status
- Explain settlement delays and failures
- Detect missing records and inconsistencies
- Generate AI-powered settlement explanations
- FastAPI REST API
- Interactive Swagger API documentation
- Mock financial settlement datasets

## Project Structure

```text
settlement-qa-agent/
│
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── retriever.py
│   ├── agent.py
│   └── main.py
│
├── data/
│   ├── gateway_logs.csv
│   ├── bank_settlements.csv
│   └── ledger_entries.csv
│
├── .gitignore
├── .env
├── README.md
├── requirements.txt
└── generate_mock_data.py