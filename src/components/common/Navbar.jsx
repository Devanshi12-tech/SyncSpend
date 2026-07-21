import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">
        SyncSpend
      </h2>

      <div className="nav-links">
        <NavLink to="/">
          Dashboard
        </NavLink>

        <NavLink to="/expenses">
          Expenses
        </NavLink>

        <NavLink to="/friends">
          Friends
        </NavLink>

        <NavLink to="/groups">
  Groups
</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;