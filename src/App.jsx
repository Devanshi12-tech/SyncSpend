import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from "./pages/Expenses/Expenses";
import Friends from "./pages/Friends/Friends";
import MainLayout from "./layouts/MainLayout";
import Groups from "./pages/Groups/Groups";
import GroupDetails from "./pages/GroupDetails/GroupDetails";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    }

    return [];
  });

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<Dashboard expenses={expenses} />}
        />

        <Route
          path="/expenses"
          element={
            <Expenses
              expenses={expenses}
              setExpenses={setExpenses}
            />
          }
        />

        <Route
          path="/friends"
          element={<Friends />}
        />
           <Route
  path="/groups"
  element={<Groups />}
/>

<Route
  path="/groups/:id"
  element={
    <GroupDetails
      expenses={expenses}
      setExpenses={setExpenses}
    />
  }
/>
      </Route>
    </Routes>
  );
}

export default App;