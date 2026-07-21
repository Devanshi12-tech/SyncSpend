import "./Dashboard.css";
import { PieChart, Pie, Tooltip, Legend, Cell} from "recharts";

function Dashboard({ expenses }) {

  const totalExpense = expenses.reduce(
    (total, expense) => {
      return total + Number(expense.amount);
    },
    0
  );

  const highestExpense = expenses.reduce(
  (max, expense) => {
    return Number(expense.amount) > Number(max.amount)
      ? expense
      : max;
  },
  { amount: 0 }
);

const categorySummary = expenses.reduce((acc, expense) => {
  const category = expense.category || "No Category";

  if (acc[category]) {
    acc[category] += Number(expense.amount);
  } else {
    acc[category] = Number(expense.amount);
  }

  return acc;
}, {});

const pieChartData = Object.entries(categorySummary).map(
  ([category, amount]) => {
    return {
      name: category,
      value: amount,
    };
  }
);

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
];

console.log(categorySummary);
console.log(pieChartData);

return (

  <div className="dashboard">

    <h1 className="dashboard-title">Dashboard</h1>

    <div className="stats-container">

      <div className="card">
        <h3>Total Expense</h3>
        <p>₹ {totalExpense}</p>
      </div>

      <div className="card">
        <h3>Highest Expense</h3>
        <p>₹ {highestExpense.amount}</p>
      </div>

      <div className="card">
        <h3>Total Transactions</h3>
        <p>{expenses.length}</p>
      </div>

      <div className="card">
        <h3>Average Expense</h3>
        <p>
          ₹{" "}
          {expenses.length > 0
            ? (totalExpense / expenses.length).toFixed(2)
            : 0}
        </p>
      </div>

    </div>

   <div className="category-section">

  <h2>Category Spending</h2>

  {Object.entries(categorySummary).map(([category, amount]) => {

    const percentage = ((amount / totalExpense) * 100).toFixed(1);

    const categoryIcons = {
  Food: "🍔",
  Travel: "✈️",
  Shopping: "🛍️",
  Entertainment: "🎬",
  Rent: "💡",
  Health: "🏥",
  Education: "📚",
  Other: "📦",
};

    return (

      <div className="category-card" key={category}>

        <div className="category-header">

          <span>
  {categoryIcons[category] || "📦"} {category}
</span>

          <span>₹ {amount}</span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>

        </div>

        <p>{percentage}% of total spending</p>

      </div>

    );

  })}

</div>

<PieChart width={350} height={300}>
  <Pie
    data={pieChartData}
    dataKey="value"
    nameKey="name"
    outerRadius={100}
  >
    {pieChartData.map((entry, index) => (
  <Cell
  key={index}
  fill={COLORS[index % COLORS.length]}
/>
))}
    </Pie>
  <Tooltip />
  <Legend />
</PieChart>

    <div className="recent-section">

      <h2>Recent Expenses</h2>

      <table>

        <thead>
          <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {expenses
            .slice(-5)
            .reverse()
            .map((expense, index) => (

              <tr key={index}>
                <td>{expense.name}</td>
                <td>{expense.category}</td>
                <td>₹ {expense.amount}</td>
                <td>{expense.date}</td>
              </tr>

            ))}

        </tbody>

      </table>

    </div>

  </div>
);
  
}


export default Dashboard;
