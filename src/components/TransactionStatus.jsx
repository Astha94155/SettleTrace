function TransactionStatus({ transaction }) {
  if (!transaction) {
    return (
      <section className="status-section">
        <div className="status-card">
          <div className="status-header">
            <span>TRANSACTION</span>
          </div>
  
          <h3>READY TO INVESTIGATE</h3>
          <p>Enter a Transaction ID above to begin the investigation.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="status-section">

      <div className="status-card">
        <div className="status-header">
          <span>GATEWAY</span>
          <span
            className={`status-icon ${
              transaction.gateway === "SUCCESS" ? "success" : "failed"
            }`}
          >
            {transaction.gateway === "SUCCESS" ? "✓" : "✕"}
        </span>
        </div>

        <h3>{transaction.gateway}</h3>
        <p>
          {transaction.gateway === "SUCCESS"
        ? "Payment processed successfully"
            : "Payment processing failed"}
        </p>
      </div>

      <div className="status-card">
        <div className="status-header">
          <span>BANK</span>
          <span
              className={`status-icon ${
                transaction.bank === "SUCCESS"
                  ? "success"
                : transaction.bank === "PENDING"
                  ? "pending"
                  : "failed"
             }`}
           >
             {transaction.bank === "SUCCESS"
               ? "✓"
               : transaction.bank === "PENDING"
               ? "⚠"
               : "✕"}
          </span>
        </div>

        <h3>{transaction.bank}</h3>
        <p>
          {transaction.bank === "SUCCESS"
            ? "Bank confirmation received successfully"
            : transaction.bank === "PENDING"
            ? "Bank confirmation is pending"
            : "Bank confirmation was not received"}
        </p>
      </div>

      <div className="status-card">
        <div className="status-header">
          <span>LEDGER</span>
          <span
            className={`status-icon ${
              transaction.ledger === "SETTLED" ? "success" : "failed"
            }`}
          >
            {transaction.ledger === "SETTLED" ? "✓" : "✕"}
          </span>
        </div>

        <h3>{transaction.ledger}</h3>
        <p>
          {transaction.ledger === "SETTLED"
            ? "Settlement entry successfully recorded"
            : "No corresponding settlement entry was found"}
        </p>
      </div>

    </section>
  )
}

export default TransactionStatus