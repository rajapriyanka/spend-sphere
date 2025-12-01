import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">SpendSphere</h1>

      <div className="flex gap-6">
        <Link className="hover:text-blue-600 font-medium" to="/">Dashboard</Link>
        <Link className="hover:text-blue-600 font-medium" to="/add">Add</Link>
        <Link className="hover:text-blue-600 font-medium" to="/records">Records</Link>
        <Link className="hover:text-blue-600 font-medium" to="/settings">Settings</Link>
        <Link className="hover:text-blue-600 font-medium" to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
