/**
 * Composant principal de l'application.
 * Gère la logique de l'affichage des pages CreateEmployee et Employees en fonction de l'état de la page.
 * @returns JSX.Element
 */

import { useState } from "react";
import CreateEmployee from "./pages/CreateEmployee";
import Employees from "./pages/Employees";
import "./index.css";

export default () => {
  const [employees, setEmployees] = useState(() => {
    // État pour stocker les données des employés
    const savedEmployees = localStorage.getItem("employees");
    const parsedEmployees = savedEmployees ? JSON.parse(savedEmployees) : [];
    return parsedEmployees;
  });

  const [page, setPage] = useState("Home");

  return (
    <>
      {page === "Home" ? (
        <CreateEmployee setPage={setPage} setEmployees={setEmployees} />
      ) : (
        <Employees setPage={setPage} employees={employees} />
      )}
    </>
  );
};
