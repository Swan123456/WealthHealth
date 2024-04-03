/**
 * Composant pour afficher la liste des employés actuels.
 * @param {Object} props - Les props du composant.
 * @param {Function} props.setPage - Fonction pour changer la page.
 * @returns {JSX.Element} - Le composant des employés.
 */

import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

const Employees = ({ setPage }: { setPage: (page: string) => void }) => {
    // État pour stocker les employés récupérés du localStorage
	const [cachedEmployees, setCachedEmployees] = useState([]);

    const columns = [
        { title: "First Name", data: "firstName" },
        { title: "Last Name", data: "lastName" },
        { title: "Start Date", data: "startDate" },
        { title: "Department", data: "department" },
        { title: "Date of Birth", data: "dateOfBirth" },
        { title: "Street", data: "street" },
        { title: "City", data: "city" },
        { title: "State", data: "state" },
        { title: "Zip Code", data: "zipCode" },
    ];

	// Effet pour charger les employés depuis le localStorage au chargement du composant
    useEffect(() => {
        const savedEmployees = localStorage.getItem("employees");
        if (savedEmployees) {
			const parsedEmployees = JSON.parse(savedEmployees);
			setCachedEmployees(parsedEmployees);
        }
    }, []);

    return (
        <>
            <div id="employee-div" className="m-20 ">
                <h1 className="text-center text-3xl font-bold mb-5">Current Employees</h1>

                <DataTable data={cachedEmployees} columns={columns} />
                <div className="flex justify-center mt-5">
                    <a
                        href="#"
                        onClick={() => setPage("Home")}
                        className="text-blue-500 hover:text-blue-800 font-bold text-center mb-2"
                    >
                        Home
                    </a>{" "}
                </div>
            </div>
        </>
    );
};

export default Employees;
