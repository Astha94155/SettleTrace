import { useState } from "react"

function TransactionSearch({ onInvestigate }) {
  const [transactionId, setTransactionId] = useState("")

  const handleInvestigate = () => {
    if (transactionId.trim() === "") {
      alert("Please enter a Transaction ID")
      return
    }

    console.log("Investigating:", transactionId)
    onInvestigate(transactionId)
  }
  return (
    <section className="search-section">

      <div className="search-heading">
        <h2>Investigate Transaction</h2>

        <p>
          Trace a transaction across gateway, bank, and ledger systems.
        </p>
      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter Transaction ID e.g. TXN10492"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />

        <button onClick={handleInvestigate}>
          Investigate
        </button>

      </div>

    </section>
  )
}

export default TransactionSearch