**PS-8 Settlement Q&A Agent Backend**
An automated Fintech Settlement Q&A Agent that traces payment transactions across Gateway, Bank, and Ledger systems and uses Google Gemini to generate a plain-English diagnosis.

**Features**
1)Trace transactions across Gateway, Bank, and Ledger records
2)Identify settlement status
3)Explain settlement delays and failures
4)Detect missing records and inconsistencies
5)Generate AI-powered settlement explanations
6)FastAPI REST API
7)Interactive Swagger API documentation
8)Mock financial settlement datasets


**Project Structure**

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
