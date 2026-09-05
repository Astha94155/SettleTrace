function InvestigationSummary({ transaction }) {
  if (!transaction) {
    return null
  }

  let summaryClass = "summary-success"
  let summaryTitle = "SETTLED SUCCESSFULLY"
  let summaryMessage = "The transaction was successfully processed and settled."

  if (
    transaction.gateway === "SUCCESS" &&
    transaction.bank === "PENDING"
  ) {
    summaryClass = "summary-warning"
    summaryTitle = "SETTLEMENT MISMATCH"
    summaryMessage =
      "The gateway processed the payment, but bank confirmation is still pending."
  }

  if (transaction.gateway === "FAILED") {
    summaryClass = "summary-failed"
    summaryTitle = "PAYMENT FAILED"
    summaryMessage =
      "The transaction failed during payment processing."
  }

  return (
    <section className={`summary-section ${summaryClass}`}>

      <div className="summary-content">

        <span className="summary-label">
          OVERALL INVESTIGATION RESULT
        </span>

        <h2>{summaryTitle}</h2>

        <p>{summaryMessage}</p>

      </div>

    </section>
  )
}

export default InvestigationSummary