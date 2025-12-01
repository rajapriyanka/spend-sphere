import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import ExcelViewer from "./components/ExcelViewer";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/excel" element={<ExcelViewer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
