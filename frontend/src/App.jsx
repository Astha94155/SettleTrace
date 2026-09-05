import { useState } from "react"
import "./App.css"
import Sidebar from "./components/Sidebar"
import TransactionSearch from "./components/TransactionSearch"
import TransactionStatus from "./components/TransactionStatus"
import InvestigationTimeline from "./components/InvestigationTimeline"
import TransactionDetails from "./components/TransactionDetails"
import InvestigationSummary from "./components/InvestigationSummary"
import History from "./components/History"

function App() {
  const [activePage, setActivePage] = useState("dashboard")
  const [transactionId, setTransactionId] = useState("")

  const transactionData = {
    TXN10492: {
      gateway: "SUCCESS",
      bank: "PENDING",
      ledger: "NOT SETTLED",
      amount: "₹12,500",
      paymentMethod: "UPI",
      transactionTime: "05 Sep 2026, 02:30 PM",
      overallStatus: "Settlement Mismatch"
    },

    TXN10493: {
      gateway: "SUCCESS",
      bank: "SUCCESS",
      ledger: "SETTLED",
      amount: "₹8,750",
      paymentMethod: "Card",
      transactionTime: "05 Sep 2026, 03:15 PM",
      overallStatus: "Settled Successfully"
    },

    TXN10494: {
      gateway: "FAILED",
      bank: "NOT RECEIVED",
      ledger: "NOT SETTLED",
      amount: "₹5,200",
      paymentMethod: "Net Banking",
      transactionTime: "05 Sep 2026, 04:10 PM",
      overallStatus: "Payment Failed"
    },

    TXN10495: {
      gateway: "SUCCESS",
      bank: "PENDING",
      ledger: "NOT SETTLED",
      amount: "₹18,300",
      paymentMethod: "UPI",
      transactionTime: "05 Sep 2026, 05:20 PM",
      overallStatus: "Settlement Mismatch"
    },

    TXN10496: {
      gateway: "SUCCESS",
      bank: "SUCCESS",
      ledger: "NOT SETTLED",
      amount: "₹21,600",
      paymentMethod: "Card",
      transactionTime: "05 Sep 2026, 06:05 PM",
      overallStatus: "Ledger Settlement Pending"
    }
  }

  const currentTransaction = transactionData[transactionId]

  const transactionNotFound =
    transactionId !== "" && !currentTransaction

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <main className="main-content">

        {activePage === "dashboard" && (
          <>
            <h1>Dashboard</h1>
            <p>Settlement investigation overview</p>

            <TransactionSearch onInvestigate={setTransactionId} />

            <TransactionStatus transaction={currentTransaction} />

            {transactionNotFound && (
              <div className="transaction-error">
                Transaction ID not found. Please check the ID and try again.
              </div>
            )}

            <InvestigationTimeline transaction={currentTransaction} />

            <InvestigationSummary transaction={currentTransaction} />

            <TransactionDetails
              transactionId={transactionId}
              transaction={currentTransaction}
            />
          </>
        )}

        {activePage === "investigate" && (
          <>
            <h1>Investigate Transaction</h1>
            <p>Trace and analyze a transaction across connected systems.</p>

            <TransactionSearch onInvestigate={setTransactionId} />

            <TransactionStatus transaction={currentTransaction} />

            {transactionNotFound && (
              <div className="transaction-error">
                Transaction ID not found. Please check the ID and try again.
              </div>
            )}

            <InvestigationTimeline transaction={currentTransaction} />

            <InvestigationSummary transaction={currentTransaction} />

            <TransactionDetails
              transactionId={transactionId}
              transaction={currentTransaction}
            />
          </>
        )}

        {activePage === "history" && (
          <>
            <h1>Investigation History</h1>
            <p>View previously investigated transactions.</p>
        
            <History
              transactionData={transactionData}
              onViewTransaction={(id) => {
                setTransactionId(id)
                setActivePage("investigate")
              }}
            />
          </>
        )}

      </main>
    </div>
  )
}

export default App