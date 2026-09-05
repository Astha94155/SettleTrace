function History({ transactionData, onViewTransaction }) {
  const transactions = Object.entries(transactionData)

  return (
    <section className="history-section">

      <div className="history-header">
        <div>
          <h2>Recent Investigations</h2>
          <p>Previously investigated transactions</p>
        </div>

        <span className="history-count">
          {transactions.length} Transactions
        </span>
      </div>

      <div className="history-table">

        <div className="history-row history-heading">
          <span>TRANSACTION ID</span>
          <span>AMOUNT</span>
          <span>METHOD</span>
          <span>STATUS</span>
          <span>ACTION</span>
        </div>

        {transactions.map(([id, transaction]) => {

          let statusClass = "history-warning"

          if (transaction.overallStatus === "Settled Successfully") {
            statusClass = "history-success"
          }

          if (transaction.overallStatus === "Payment Failed") {
            statusClass = "history-failed"
          }

          return (
            <div className="history-row" key={id}>

              <strong>{id}</strong>

              <span>{transaction.amount}</span>

              <span>{transaction.paymentMethod}</span>

              <span className={statusClass}>
                {transaction.overallStatus}
              </span>

              <button
                className="history-view-button"
                onClick={() => onViewTransaction(id)}
              >
                View
              </button>

            </div>
          )
        })}

      </div>

    </section>
  )
}

export default History