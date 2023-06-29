// import React from "react";
import { useContext } from "react";
import "./App.css";
import AddExpense from "./components/AddExpense";
import AddIncome from "./components/AddIncome";
import Budget from "./components/Budget";
import Dashboard from "./components/Dashboard";
import Landingpage from "./components/Landingpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Reports from "./components/Reports";
import Transactions from "./components/Transactions";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Client from "./plaid/Client";
import Addbudget from "./components/Addbudget";
import Topspending from "./components/Topspending";

function App() {
  const { token } = useContext(AuthContext);
  console.log("token:", token);

  return (
    <div className="App">
      {token ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addexpense" element={<AddExpense />} />
            <Route path="/addincome" element={<AddIncome />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/addbudget" element={<Addbudget />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/topspendings" element={<Topspending />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/link" element={<Client />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Menu />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      )}
    </div>
  );
}

export default App;
