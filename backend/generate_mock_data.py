import os
import csv
import random
from datetime import datetime, timedelta


def generate_mock_datasets():
    os.makedirs("data", exist_ok=True)

    random.seed(42)

    num_records = 50

    merchants = [
        f"mer_{random.randint(8000, 8999)}"
        for _ in range(5)
    ]

    methods = ["upi", "card", "netbanking"]

    gw_records = []
    bank_records = []
    ledger_records = []

    base_time = datetime(2026, 9, 1, 10, 0, 0)

    scenarios = [
        (
            "SETTLED",
            "POSTED",
            None,
            None,
            False
        ),
        (
            "PENDING",
            "PENDING",
            "BANK_HOLIDAY_DELAY",
            None,
            False
        ),
        (
            "FAILED",
            "REJECTED",
            "AUTHORIZATION_FAILED",
            "BAD_PAYMENT_METHOD",
            False
        ),
        (
            "FAILED",
            "HELD",
            "BENEFICIARY_ACCOUNT_RESTRICTED",
            None,
            True
        ),
        (
            "PROCESSING",
            "PENDING",
            "NEFT_WINDOW_CLOSED",
            None,
            False
        ),
    ]

    for i in range(1, num_records + 1):

        tx_id = f"pay_N{1000 + i}"

        merchant = random.choice(merchants)

        amount = round(
            random.uniform(100.0, 25000.0),
            2
        )

        method = random.choice(methods)

        created_dt = (
            base_time +
            timedelta(hours=i * 2)
        )

        captured_at = (
            created_dt.isoformat() + "Z"
        )

        (
            b_status,
            l_status,
            b_reason,
            g_failure,
            risk_hold
        ) = random.choice(scenarios)

        g_status = (
            "failed"
            if b_reason == "AUTHORIZATION_FAILED"
            else "captured"
        )

        utr = (
            f"UTR{random.randint(100000000, 999999999)}"
            if b_status == "SETTLED"
            else ""
        )

        exp_date = (
            created_dt + timedelta(days=1)
        ).strftime("%Y-%m-%d")

        act_date = (
            exp_date
            if b_status == "SETTLED"
            else ""
        )

        gw_records.append({
            "transaction_id": tx_id,
            "merchant_id": merchant,
            "amount": amount,
            "currency": "INR",
            "gateway_status": g_status,
            "payment_method": method,
            "captured_at": captured_at,
            "failure_code": g_failure or ""
        })

        bank_records.append({
            "transaction_id": tx_id,
            "batch_id": f"batch_B{900 + (i % 5)}",
            "bank_status": b_status,
            "utr_number": utr,
            "expected_settlement_date": exp_date,
            "actual_settlement_date": act_date,
            "bank_failure_reason": b_reason or ""
        })

        ledger_records.append({
            "transaction_id": tx_id,
            "ledger_entry_id": f"led_{7000 + i}",
            "account_type": "MERCHANT_PAYOUT",
            "entry_type": "DEBIT",
            "amount": (
                amount
                if g_status == "captured"
                else 0.0
            ),
            "posting_status": l_status,
            "risk_hold_flag": str(risk_hold).upper()
        })

    datasets = [
        (
            "data/gateway_logs.csv",
            gw_records
        ),
        (
            "data/bank_settlements.csv",
            bank_records
        ),
        (
            "data/ledger_entries.csv",
            ledger_records
        )
    ]

    for filename, records in datasets:

        with open(
            filename,
            "w",
            newline="",
            encoding="utf-8"
        ) as f:

            writer = csv.DictWriter(
                f,
                fieldnames=records[0].keys()
            )

            writer.writeheader()
            writer.writerows(records)

    print("Mock datasets generated in data/ folder.")


if __name__ == "__main__":
    generate_mock_datasets()