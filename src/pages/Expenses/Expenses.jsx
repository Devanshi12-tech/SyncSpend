import { useState, useEffect } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../../App.css";
import "./Expenses.css";

function Expenses({ expenses, setExpenses }) {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [groups, setGroups] = useState([]);
  const [expenseType, setExpenseType] = useState("personal");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitAmong, setSplitAmong] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editExpenseIdFromUrl = searchParams.get("edit");

  const selectedGroup = groups.find(
  (group) => group.id === Number(selectedGroupId)
);
 

const totalAmount = expenses.reduce(
  (accumulator, expense) => {
    return accumulator + Number(expense.amount);
  },
  0
);

const totalExpenses = expenses.length;

const highestExpense = expenses.reduce((highest, expense) => {
  return Math.max(highest, Number(expense.amount));
}, 0);

const averageExpense =
  totalExpenses > 0
    ? (totalAmount / totalExpenses).toFixed(2)
    : 0;
  const [editExpenseId, setEditExpenseId] = useState(null);
  const updatedExpenses = [...expenses];
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);

useEffect(() => {
  const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
  setGroups(savedGroups);
}, []);

useEffect(() => {
  if (!editExpenseIdFromUrl) return;

  if (editExpenseId !== null) return;

  const expense = expenses.find(
    (expense) => String(expense.id) === editExpenseIdFromUrl
  );

  if (!expense) return;

  handleEdit(expense.id);
}, [editExpenseIdFromUrl, expenses, editExpenseId]);


  function clearForm() {
  setExpenseName("");
  setAmount("");
  setCategory("");
  setDate("");
  setDescription("");

  setExpenseType("personal");
  setSelectedGroupId("");
  setPaidBy("");
  setSplitAmong([]);

  setEditExpenseId(null);
}

function handleAddExpense() {
  const expense = {
  id: Date.now(),

  name: expenseName,
  amount: Number(amount),
  category: category,
  date: date,
  description: description,

  groupId:
    expenseType === "group" ? Number(selectedGroupId) : null,

   paidBy:
    expenseType === "group"
      ? Number(paidBy)
      : null,

  splitAmong:
    expenseType === "group"
      ? splitAmong
      : [],
};
  if (editExpenseId === null) {
  setExpenses([...expenses, expense]);
  clearForm();
}
else {
  const updatedExpenses = expenses.map((oldExpense) =>
  oldExpense.id === editExpenseId
    ? {
        ...expense,
        id: editExpenseId,
      }
    : oldExpense
);
  setExpenses(updatedExpenses);
  clearForm();
  navigate("/expenses", { replace: true });
}


}
function handleDeleteExpense(indexToDelete) {
  const updatedExpenses = expenses.filter((expense, index) => {
    return index !== indexToDelete;
  });

  setExpenses(updatedExpenses);
}

function handleEdit(expenseId) {
  const expense = expenses.find(
    (expense) => expense.id === expenseId
  );

  if (!expense) return;

  setEditExpenseId(expenseId);

  setExpenseName(expense.name);
  setAmount(expense.amount);

  setCategory(expense.category);
  setDate(expense.date);
  setDescription(expense.description);

  if (expense.groupId) {
    setExpenseType("group");
    setSelectedGroupId(expense.groupId);
    setPaidBy(expense.paidBy);
    setSplitAmong(expense.splitAmong);
  } else {
    setExpenseType("personal");
  }
}


  return (
     <>
     <div className="app">

  <div className="expense-card">
  
     <h1 className="title">💰 Your Daily Expense Tracker</h1>
     <p className='line'>Track your daily expenses in one place</p>
    <br></br>
    
    <input
  type="text"
  placeholder="Search expenses..."
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>
<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="All">All Categories</option>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Shopping">Shopping</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Groceries">Groceries</option>
  <option value="Utilities">Utilities</option>
  <option value="Rent">Rent</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Education">Education</option>
  <option value="Income">Income</option>
</select>
<br></br>
<div className="expenses-form-card">
    <div className="expenses-form-grid">
    <div className="expenses-form-group">
     <label className="labl">Expense Name</label>
       <input 
       className="input-box"
       value={expenseName} onChange={(event) => {
    setExpenseName(event.target.value);
  }}
  /></div>
  <div className="expenses-form-group">
        <label className="labl">Amount</label>
       <input className="input-box" type= "number" 
        value={amount} onChange={(event) => {
    setAmount(event.target.value);
  }}
  /></div>

  <div className="expenses-form-group">
        <label className="labl">Category</label>
<select className='input-box' 
value={category} onChange={(event) => {
    setCategory(event.target.value);
  }}>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Shopping">Shopping</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Groceries">Groceries</option>
  <option value="Utilities">Utilities</option>
  <option value="Rent">Rent</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Education">Education</option>
  <option value="Income">Income</option>
</select></div>
 
 <div className="expenses-form-group">
        <label className="labl">Date</label>
       <input className="input-box" type="date"
       value={date} onChange={(event) => {
    setDate(event.target.value);
  }}
   /></div>
   
   <div className="expenses-form-group expenses-full-width">
        <label className="labl">Description</label>
       <textarea className='input-box'
       value={description} onChange={(event) => {
    setDescription(event.target.value);
  }}
  ></textarea></div>
  
<div className="expenses-expense-type">
  <label className="labl">Expense Type</label>

 <div className="expenses-form-group">
    <label>
      <input
        type="radio"
        value="personal"
        checked={expenseType === "personal"}
        onChange={() => setExpenseType("personal")}
      />
      Personal
    </label>

    <label>
      <input
        type="radio"
        value="group"
        checked={expenseType === "group"}
        onChange={() => setExpenseType("group")}
      />
      Group
    </label>
  </div>
</div>

{expenseType === "group" && (
  <div className="expenses-group-form">
    <label className="labl">Choose Group</label>

    <select
      className="input-box"
      value={selectedGroupId}
      onChange={(e) => {
        setSelectedGroupId(e.target.value);
        setPaidBy("");
        setSplitAmong([]);
      }}
    >
      <option value="">Select a Group</option>

      {groups.map((group) => (
        <option key={group.id} value={group.id}>
          {group.name}
        </option>
      ))}
    </select>
  </div>
)}

{expenseType === "group" && selectedGroup && (
  <div className="expenses-form-group">
    <label className="labl">Paid By</label>

    <select
      className="input-box"
      value={paidBy}
      onChange={(e) => setPaidBy(e.target.value)}
    >
      <option value="">Select Member</option>

      {selectedGroup.members.map((member) => (
        <option key={member.id} value={member.id}>
        {member.name}
        </option>
      ))}
    </select>
  </div>
)}

{expenseType === "group" && selectedGroup && (
  <div className="expenses-form-group expenses-full-width">
    <label className="labl">Split Among</label>

    <div className="expenses-member-list">
      {selectedGroup.members.map((member) => (
        <label
          key={member.id}
          className="expenses-member-checkbox"
        >
          <input
            type="checkbox"
            checked={splitAmong.includes(member.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSplitAmong([...splitAmong, member.id]);
              } else {
                setSplitAmong(
                  splitAmong.filter(
                  (id) => id !== member.id
                  )
                );
              }
            }}
          />

          {member.name}
        </label>
      ))}
    </div>
  </div>
)}

<br></br>
</div>
</div>

       <button onClick={handleAddExpense}>
  {editExpenseId === null ? "Add Expense" : "Update Expense"}
</button>

<span></span> <span></span>
{editExpenseId !== null && (
  <button onClick={clearForm}>
    Cancel
  </button>
)}

<br></br><br></br>
         <h2>Your Expenses</h2>

  
  {expenses
  .filter((expense) => {
    const matchesSearch =
      expense.name.toLowerCase().includes(searchText.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchText.toLowerCase()) ||
      String(expense.amount).includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  })
  .map((expense, index) => (
    <div className="expense-card" key={index}>
      <h3>Name: {expense.name}</h3>
      <p>Amount: ₹{expense.amount}</p>
      <p>Category: {expense.category}</p>
      <p>Date: {expense.date}</p>
      <p>Description: {expense.description}</p>


  <button className="delete-btn"
   onClick={() => handleDeleteExpense(index)}
   >
  🗑 Delete
</button> <span></span>
<button className="edit-btn"
onClick={() => handleEdit(expense.id)}>
  Edit
</button>
</div>
))}

<div className="dashboards">
  <div className="stat-card">
    <h3>💰 Total Spent</h3>
    <h2>₹{totalAmount}</h2>
  </div>

  <div className="stat-card">
  <h3>📄 Total Expenses</h3>
  <h2>{totalExpenses}</h2>
</div>

<div className="stat-card">
  <h3>🔥 Highest Expense</h3>
  <h2>₹{highestExpense}</h2>
</div>

<div className="stat-card">
  <h3>📊 Average Expense</h3>
  <h2>₹{averageExpense}</h2>
</div>
</div>
       </div>
</div>
  </>
  )
}

export default Expenses
