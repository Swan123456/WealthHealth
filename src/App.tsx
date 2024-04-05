import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";
import Employees from "./pages/Employees";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";

export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/home" element={<CreateEmployee />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};
