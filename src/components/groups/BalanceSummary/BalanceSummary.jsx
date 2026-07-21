import "./BalanceSummary.css";

function BalanceSummary({ group, groupExpenses }) {
  const balances = {};

  group.members.forEach((member) => {
    balances[member.id] = 0;
  });

  groupExpenses.forEach((expense) => {
    const amount = Number(expense.amount);

    if (expense.splitAmong.length === 0) return;

    const share = amount / expense.splitAmong.length;

    balances[expense.paidBy] += amount;

    expense.splitAmong.forEach((memberId) => {
      balances[memberId] -= share;
    });
  });

  return (
    <div className="balance-summary">

      <h2>💰 Balance Summary</h2>

      <div className="balance-grid">

        {group.members.map((member) => {
          const balance = balances[member.id];
          let status = "Settled";
        let cardClass = "settled";
        let amount = "₹0.00";

        if (balance > 0) {
      status = "Should Receive";
        cardClass = "positive";
        amount = `₹${balance.toFixed(2)}`;
        } else if (balance < 0) {
        status = "Owes";
        cardClass = "negative";
        amount = `₹${Math.abs(balance).toFixed(2)}`;
        }


          return (
             <div
    key={member.id}
    className={`balance-card ${cardClass}`}
  >
    <h3 className="balance-name">
      {member.name}
    </h3>

    <div className="balance-status">
      {status}
    </div>

    <div className="balance-amount">
      {amount}
    </div>

    <span className="balance-chip">
      {status}
    </span>
  </div>
          );
        })}

      </div>

    </div>
  );
}

export default BalanceSummary;