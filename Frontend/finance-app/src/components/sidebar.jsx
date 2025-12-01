import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 w-64 bg-gray-100 h-full shadow-md p-5">
      <ul className="space-y-4">

        <li>
          <Link
            className="block p-3 rounded hover:bg-blue-200 font-medium"
            to="/"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            className="block p-3 rounded hover:bg-blue-200 font-medium"
            to="/add"
          >
            Add Transaction
          </Link>
        </li>

        <li>
          <Link
            className="block p-3 rounded hover:bg-blue-200 font-medium"
            to="/records"
          >
            Records
          </Link>
        </li>

        <li>
          <Link
            className="block p-3 rounded hover:bg-blue-200 font-medium"
            to="/excel"
          >
            Excel Viewer
          </Link>
        </li>

        <li>
          <Link
            className="block p-3 rounded hover:bg-blue-200 font-medium"
            to="/settings"
          >
            Settings
          </Link>
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;
