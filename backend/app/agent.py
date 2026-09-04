import json
import google.generativeai as genai
from app.config import settings


if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)


SYSTEM_PROMPT = """
You are an expert Fintech Settlement Support AI Agent.
Analyze the cross-system logs for a payment transaction and
explain why the settlement is processed, delayed, or failed.

Return the response under two clear section headers:

### Plain-English Explanation
- State current settlement status.
- Explain the precise root cause using logs across systems
  (Gateway, Bank, Ledger).
- Recommend actionable next steps for support or the merchant.

### Exception List
- Identify missing log entries, system discrepancies
  (e.g., amount mismatch, risk hold flag mismatched with status),
  or ambiguous records.
- If all logs match without inconsistency, state "None".
"""


def generate_diagnosis(trace_data: dict) -> str:
    if not settings.GEMINI_API_KEY:
        return (
            "### Plain-English Explanation\n"
            "GEMINI_API_KEY is not configured in environment variables.\n\n"
            "### Exception List\n"
            "Missing LLM credentials."
        )

    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = (
        f"{SYSTEM_PROMPT}\n\n"
        f"Transaction Trace Data:\n"
        f"{json.dumps(trace_data, indent=2)}"
    )

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return (
            "### Plain-English Explanation\n"
            "Error processing diagnosis.\n\n"
            "### Exception List\n"
            f"LLM Service Error: {str(e)}"
        )