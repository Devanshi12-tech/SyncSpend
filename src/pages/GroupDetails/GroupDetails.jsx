import { useParams } from "react-router-dom";
import GroupHeader from "../../components/groups/GroupHeader/GroupHeader";
import BalanceSummary from "../../components/groups/BalanceSummary/BalanceSummary";
import SettlementSuggestions from "../../components/groups/SettlementSuggestions/SettlementSuggestions";
import { useNavigate } from "react-router-dom";
import "./GroupDetails.css";


function GroupDetails({
  expenses,
  setExpenses,
}) {
  const { id } = useParams();
  const groups = JSON.parse(localStorage.getItem("groups")) || [];
const friends = JSON.parse(localStorage.getItem("friends")) || [];

  const group = groups.find((group) => group.id === Number(id));

  if (!group) {
    return <h2>Group not found.</h2>;
  }

  const groupExpenses = expenses.filter(
    (expense) => expense.groupId === group.id
  );

  const totalSpent = groupExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const navigate = useNavigate();
 
const handleEditExpense = (expenseId) => {
  navigate(`/expenses?edit=${expenseId}`, {
    state: {
      returnTo: `/groups/${group.id}`,
    },
  });
};

const handleDeleteExpense = (expenseId) => {
  console.log("Deleting:", expenseId);

  const updatedExpenses = expenses.filter(
    (expense) => expense.id !== expenseId
  );

  console.log(updatedExpenses);

  setExpenses(updatedExpenses);

  localStorage.setItem(
    "expenses",
    JSON.stringify(updatedExpenses)
  );
};


  function getMemberName(memberId) {
    const member = group.members.find((member) => member.id === memberId);
    return member ? member.name : "Unknown";
  }

  return (
    <div className="group-details-container">

      <GroupHeader
        group={group}
        expenseCount={groupExpenses.length}
        totalSpent={totalSpent}
      />

<BalanceSummary
  group={group}
  groupExpenses={groupExpenses}
/>
<br></br>

<SettlementSuggestions
    group={group}
    groupExpenses={groupExpenses}
/>
<br></br>
      <div className="group-details-grid">


        <div className="group-section">

          <h2>👥 Members ({group.members.length})</h2>

          <div className="members-grid">
            {group.members.map((member) => (
              <div
                key={member.id}
                className="member-card"
              >
                <div className="member-avatar">
                  {member.name.charAt(0).toUpperCase()}
                </div>

                <h4>{member.name}</h4>
              </div>
            ))}
          </div>

        </div>


        <div className="group-section">

          <h2>💰 Expenses ({groupExpenses.length})</h2>

          {groupExpenses.length === 0 ? (

            <div className="empty-expenses">
              <h3>No expenses yet.</h3>
              <p>Add a group expense from the Expenses page.</p>
            </div>

          ) : (

            <div className="expenses-grid">

              {groupExpenses.map((expense) => (

                <div
                  key={expense.id}
                  className="group-expense-card"
                >

                  <div className="expense-top">

                    <h3>{expense.name}</h3>

                    <span className="expense-price">
                      ₹{expense.amount}
                    </span>

                  </div>

                  <p>
                    <strong>🏷 Category:</strong>{" "}
                    {expense.category}
                  </p>

                  {expense.date && (
                    <p>
                      <strong>📅 Date:</strong>{" "}
                      {expense.date}
                    </p>
                  )}

                  {expense.description && (
                    <p>
                      <strong>📝 Description:</strong>{" "}
                      {expense.description}
                    </p>
                  )}

                  <p>
                    <strong>💳 Paid By:</strong>{" "}
                    {getMemberName(expense.paidBy)}
                  </p>

                  <p>
                    <strong>👥 Split Between:</strong>{" "}
                    {expense.splitAmong
                      .map(getMemberName)
                      .join(", ")}
                  </p>

                    <div className="group-details-expense-actions">
  <button
    className="group-details-edit-btn"
    onClick={() => handleEditExpense(expense.id)}
  >
    ✏ Edit
  </button>
<span></span> <span></span>
  <button
    className="group-details-delete-btn"
    onClick={() => handleDeleteExpense(expense.id)}
  >
    🗑 Delete
  </button>
</div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default GroupDetails;