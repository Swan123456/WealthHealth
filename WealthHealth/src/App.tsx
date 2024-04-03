import { useState, useEffect } from 'react';
import CreateEmployee from './pages/CreateEmployee';
import Employees from './pages/Employees';
import './index.css';

export default () => {
    const [employees, setEmployees] = useState(() => {
        // Initialise les employés à partir du localStorage ou un tableau vide s'il n'y a pas d'employés enregistrés
        const savedEmployees = localStorage.getItem('employees');
        const parsedEmployees = savedEmployees ? JSON.parse(savedEmployees) : [];
        return parsedEmployees
    });

    const [page, setPage] = useState('Home');

    return (
        <>
            {page === 'Home' ? (
                <CreateEmployee setPage={setPage} setEmployees={setEmployees} />
            ) : (
                <Employees setPage={setPage} employees={employees} />
            )}
        </>
    );
};
