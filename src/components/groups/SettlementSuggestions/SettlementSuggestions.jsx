import "./SettlementSuggestions.css";

function SettlementSuggestions({ group, groupExpenses }) {
  const balances = {};

  // Initialize balances
  group.members.forEach((member) => {
    balances[member.id] = 0;
  });

  // Calculate balances
  groupExpenses.forEach((expense) => {
    if (
      !expense.paidBy ||
      !expense.splitAmong ||
      expense.splitAmong.length === 0
    ) {
      return;
    }

    const amount = Number(expense.amount);
    const share = amount / expense.splitAmong.length;

    balances[expense.paidBy] += amount;

    expense.splitAmong.forEach((memberId) => {
      balances[memberId] -= share;
    });
  });

  // Separate creditors and debtors
  const creditors = [];
  const debtors = [];

  group.members.forEach((member) => {
    const balance = balances[member.id];

    if (balance > 0) {
      creditors.push({
        id: member.id,
        name: member.name,
        amount: balance,
      });
    } else if (balance < 0) {
      debtors.push({
        id: member.id,
        name: member.name,
        amount: Math.abs(balance),
      });
    }
  });

  // Generate settlement suggestions
  const settlements = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const settleAmount = Math.min(
      debtor.amount,
      creditor.amount
    );

    settlements.push({
      from: debtor.name,
      to: creditor.name,
      amount: settleAmount,
    });

    debtor.amount -= settleAmount;
    creditor.amount -= settleAmount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  return (
    <div className="settlement-container">

      <h2>💸 Settlement Suggestions</h2>

      {settlements.length === 0 ? (
        <p className="settled-message">
          🎉 Everyone is settled up!
        </p>
      ) : (
        <div className="settlement-list">

          {settlements.map((settlement, index) => (
            <div
              key={index}
              className="settlement-card"
            >
              <div>
                <h3>
                  {settlement.from}
                </h3>

                <p>owes</p>
              </div>

              <div className="settlement-arrow">
                ➜
              </div>

              <div>
                <h3>
                  {settlement.to}
                </h3>

                <p>receives</p>
              </div>

              <div className="settlement-amount">
                ₹{settlement.amount.toFixed(2)}
              </div>

              <button className="settle-btn">
                Settle Up
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SettlementSuggestions;