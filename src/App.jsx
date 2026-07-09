import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const updatedExpenses = [...expenses];
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  function clearForm() {
  setExpenseName("");
  setAmount("");
  setCategory("");
  setDate("");
  setDescription("");
  setReceipt(null);
}

function handleAddExpense() {
  const expense = {
    name: expenseName,
    amount: amount,
    category: category,
    date: date,
    description: description,
    receipt: receipt,
  };
  if (editIndex === null) {
  setExpenses([...expenses, expense]);
  clearForm();
}
else {
  const updatedExpenses = [...expenses];
  updatedExpenses[editIndex] = expense;
  setExpenses(updatedExpenses);
  setEditIndex(null);
  clearForm();
}


}
function handleDeleteExpense(indexToDelete) {
  const updatedExpenses = expenses.filter((expense, index) => {
    return index !== indexToDelete;
  });

  setExpenses(updatedExpenses);
}

function handleEdit(index) {
  setEditIndex(index);
  setExpenseName(expenses[index].name);
  setAmount(expenses[index].amount);
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
     <label className="labl">Expense Name</label>
       <input 
       className="input-box"
       value={expenseName} onChange={(event) => {
    setExpenseName(event.target.value);
  }}
  />
        <label className="labl">Amount</label>
       <input className="input-box" type= "number" 
        value={amount} onChange={(event) => {
    setAmount(event.target.value);
  }}
  />
  
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
</select>
 
        <label className="labl">Date</label>
       <input className="input-box" type="date"
       value={date} onChange={(event) => {
    setDate(event.target.value);
  }}
   />
   
        <label className="labl">Description</label>
       <textarea className='input-box'
       value={description} onChange={(event) => {
    setDescription(event.target.value);
  }}
  ></textarea>

        <label className="labl">Attach Receipt</label>
       <input className="input-box" type= "file"
        onChange={(event) => {
    setReceipt(event.target.files[0]);
  }}
  />

       <br></br><br></br>
       <button onClick={handleAddExpense}>
  {editIndex === null ? "Add Expense" : "Update Expense"}
</button>

<span></span> <span></span>
{editIndex !== null && (
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

      {expense.receipt && (
        <img
          src={expense.receipt}
          alt="Receipt"
          width="200"
        />
      )}


  <button className="delete-btn"
   onClick={() => handleDeleteExpense(index)}
   >
  🗑 Delete
</button> <span></span>
<button className="edit-btn"
onClick={() => handleEdit(index)}>
  Edit
</button>
</div>
))}
       </div>
</div>
  </>
  )
}

export default App
