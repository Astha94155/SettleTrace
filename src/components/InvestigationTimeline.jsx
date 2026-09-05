function InvestigationTimeline({ transaction }) {
  if (!transaction) {
    return (
      <section className="timeline-section">
  
        <h2>Investigation Timeline</h2>
  
        <p className="timeline-subtitle">
          Enter a Transaction ID above to view the transaction trace.
        </p>
  
      </section>
    )
  }

  const gatewaySuccess = transaction.gateway === "SUCCESS"
  const bankSuccess = transaction.bank === "SUCCESS"
  const bankPending = transaction.bank === "PENDING"
  const ledgerSettled = transaction.ledger === "SETTLED"

  return (
    <section className="timeline-section">

      <h2>Investigation Timeline</h2>

      <p className="timeline-subtitle">
        Transaction trace across connected systems
      </p>

      <div className="timeline">

        <div className="timeline-item">
          <div className={`timeline-dot ${gatewaySuccess ? "success" : "failed"}`}>
            {gatewaySuccess ? "✓" : "×"}
          </div>

          <div className="timeline-content">
            <h3>Gateway</h3>

            <p className={`timeline-status ${gatewaySuccess ? "success-text" : "failed-text"}`}>
              {transaction.gateway}
            </p>

            <p>
              {gatewaySuccess
                ? "Transaction was successfully processed by the gateway."
                : "Transaction processing failed at the gateway."}
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div
            className={`timeline-dot ${
              bankSuccess
                ? "success"
                : bankPending
                ? "pending"
                : "failed"
            }`}
          >
            {bankSuccess ? "✓" : bankPending ? "!" : "×"}
          </div>

          <div className="timeline-content">
            <h3>Bank</h3>

            <p
              className={`timeline-status ${
                bankSuccess
                  ? "success-text"
                  : bankPending
                  ? "pending-text"
                  : "failed-text"
              }`}
            >
              {transaction.bank}
            </p>

            <p>
              {bankSuccess
                ? "Bank confirmation was successfully received."
                : bankPending
                ? "Bank confirmation has not been received yet."
                : "Bank confirmation was not received."}
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className={`timeline-dot ${ledgerSettled ? "success" : "failed"}`}>
            {ledgerSettled ? "✓" : "×"}
          </div>

          <div className="timeline-content">
            <h3>Ledger</h3>

            <p
              className={`timeline-status ${
                ledgerSettled ? "success-text" : "failed-text"
              }`}
            >
              {transaction.ledger}
            </p>

            <p>
              {ledgerSettled
                ? "Settlement entry was successfully recorded."
                : "No corresponding settlement entry was found."}
            </p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default InvestigationTimeline