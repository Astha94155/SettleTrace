from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.config import settings
from app.retriever import SettlementRetriever
from app.agent import generate_diagnosis


app = FastAPI(
    title="PS-8 Settlement Q&A Engine",
    description=(
        "Backend API for tracing transaction settlements "
        "across Gateway, Bank, and Ledger databases."
    )
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


retriever = SettlementRetriever(
    settings.GATEWAY_CSV_PATH,
    settings.BANK_CSV_PATH,
    settings.LEDGER_CSV_PATH
)


class DiagnosisResponse(BaseModel):
    transaction_id: str
    statuses: dict
    explanation: str


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Settlement Q&A Agent"
    }


@app.get(
    "/api/v1/diagnose/{transaction_id}",
    response_model=DiagnosisResponse
)
def diagnose(transaction_id: str):

    trace_data = retriever.trace_transaction(
        transaction_id.strip()
    )

    if not any([
        trace_data["found_in_gateway"],
        trace_data["found_in_bank"],
        trace_data["found_in_ledger"]
    ]):
        raise HTTPException(
            status_code=404,
            detail=(
                f"Transaction ID '{transaction_id}' "
                "not found in system logs."
            )
        )

    explanation = generate_diagnosis(trace_data)

    return DiagnosisResponse(
        transaction_id=transaction_id,
        statuses={
            "gateway": (
                trace_data["gateway"]["gateway_status"]
                if trace_data["gateway"]
                else "MISSING"
            ),
            "bank": (
                trace_data["bank"]["bank_status"]
                if trace_data["bank"]
                else "MISSING"
            ),
            "ledger": (
                trace_data["ledger"]["posting_status"]
                if trace_data["ledger"]
                else "MISSING"
            )
        },
        explanation=explanation
    )