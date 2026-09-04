import pandas as pd


class SettlementRetriever:
    def __init__(self, gw_path: str, bank_path: str, ledger_path: str):
        self.gw_path = gw_path
        self.bank_path = bank_path
        self.ledger_path = ledger_path

    def trace_transaction(self, tx_id: str) -> dict:
        gw_df = pd.read_csv(self.gw_path)
        bank_df = pd.read_csv(self.bank_path)
        ledger_df = pd.read_csv(self.ledger_path)

        gw_rec = gw_df[
            gw_df["transaction_id"] == tx_id
        ].to_dict(orient="records")

        bank_rec = bank_df[
            bank_df["transaction_id"] == tx_id
        ].to_dict(orient="records")

        ledger_rec = ledger_df[
            ledger_df["transaction_id"] == tx_id
        ].to_dict(orient="records")

        return {
            "transaction_id": tx_id,
            "found_in_gateway": len(gw_rec) > 0,
            "found_in_bank": len(bank_rec) > 0,
            "found_in_ledger": len(ledger_rec) > 0,
            "gateway": gw_rec[0] if gw_rec else None,
            "bank": bank_rec[0] if bank_rec else None,
            "ledger": ledger_rec[0] if ledger_rec else None,
        }