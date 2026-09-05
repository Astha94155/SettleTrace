function Sidebar({ activePage, onPageChange }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>SETTLETRACE</h2>
        <p>Settlement Investigation</p>
      </div>

      <nav>
        <button
          className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => onPageChange("dashboard")}
        >
          ▣ Dashboard
        </button>

        <button
          className={`nav-item ${activePage === "investigate" ? "active" : ""}`}
          onClick={() => onPageChange("investigate")}
        >
          🔍 Investigate
        </button>

        <button
          className={`nav-item ${activePage === "history" ? "active" : ""}`}
          onClick={() => onPageChange("history")}
        >
          ◷ History
        </button>
      </nav>

      <div className="system-status">
        <span className="status-dot"></span>
        System Operational
      </div>
    </aside>
  )
}

export default Sidebar