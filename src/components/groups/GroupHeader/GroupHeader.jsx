import "./GroupHeader.css";

function GroupHeader({ group, expenseCount, totalSpent }) {
  return (
    <div className="group-header">

      <div className="group-header-top">

        <div>
          <h1 className="group-title">
            📁 {group.name}
          </h1>
          <br></br>

          <p className="group-created">
            Created on {group.createdAt}
          </p>
        </div>

        <div className="group-total">
          ₹{totalSpent}
        </div>

      </div>

      <div className="group-stats">

        <div className="group-stat-card">
          <h3>{group.members.length}</h3>
          <p>Members</p>
        </div>

        <div className="group-stat-card">
          <h3>{expenseCount}</h3>
          <p>Expenses</p>
        </div>

        <div className="group-stat-card">
          <h3>₹{totalSpent}</h3>
          <p>Total Spent</p>
        </div>

      </div>

    </div>
  );
}

export default GroupHeader;