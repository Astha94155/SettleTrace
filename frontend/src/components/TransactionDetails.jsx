function TransactionDetails({ transactionId, transaction }) {
  if (!transaction) {
    return (
      <section className="details-section">

        <h2>Transaction Details</h2>

        <p className="details-subtitle">
          Information associated with the investigated transaction
        </p>

        <div className="details-card">

          <div className="detail-item">
            <span>Transaction ID</span>
            <strong>{transactionId || "—"}</strong>
          </div>

          <div className="detail-item">
            <span>Status</span>
            <strong>
              {transactionId
                ? "Transaction Not Found"
                : "Waiting for Transaction ID"}
            </strong>
          </div>

        </div>

      </section>
    )
  }

  return (
    <section className="details-section">

      <h2>Transaction Details</h2>

      <p className="details-subtitle">
        Information associated with the investigated transaction
      </p>

      <div className="details-card">

        <div className="detail-item">
          <span>Transaction ID</span>
          <strong>{transactionId}</strong>
        </div>

        <div className="detail-item">
          <span>Amount</span>
          <strong>{transaction.amount}</strong>
        </div>

        <div className="detail-item">
          <span>Payment Method</span>
          <strong>{transaction.paymentMethod}</strong>
        </div>

        <div className="detail-item">
          <span>Transaction Time</span>
          <strong>{transaction.transactionTime}</strong>
        </div>

        <div className="detail-item">
          <span>Overall Status</span>
          <strong className="mismatch-status">
            {transaction.overallStatus}
          </strong>
        </div>

      </div>

    </section>
  )
}

export default TransactionDetails