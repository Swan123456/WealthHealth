/**
 * Composant pour créer un nouvel employé.
 * @param {Object} props - Les props du composant.
 * @param {Function} props.setPage - Fonction pour changer la page.
 * @param {Function} props.setEmployees - Fonction pour mettre à jour la liste des employés.
 * @returns {JSX.Element} - Le formulaire de création d'employé.
 */

import { useState } from 'react';
import DataInput from "../components/DataInput";
import SelectMenu from "../components/SelectMenu";
import { stateOptions, departmentOptions } from '../data/data.json';
import Modal from '../components/Modal';
import React, { ChangeEvent } from "react";

interface CreateEmployeeProps {
    setPage: (page: string) => void;
    setEmployees: (employees: any[]) => void;
}

const CreateEmployee = ({ setPage, setEmployees }: CreateEmployeeProps) => {
  // État pour stocker les informations de l'employé en cours de création
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        department: departmentOptions[0],
        street: "",
        city: "",
        state: stateOptions[0].value,
        zipCode: "",
    });

    const [modalOpened, setModalOpened] = useState(false);
    const [errorModalOpened, setErrorModalOpened] = useState(false);

    const saveEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        if (!Object.values(employee).every((field) => field !== '')) {
            return setErrorModalOpened(true);
        }

        // Mettre à jour les employés dans le localStorage
        const updatedEmployees = [...JSON.parse(localStorage.getItem('employees') || '[]'), employee];
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));

        setEmployees(updatedEmployees);
        setModalOpened(true);
    };

    const handleCloseModal = () => {
        setModalOpened(false);
        setErrorModalOpened(false);
        setPage('Employees');
    };

    const handleInputChange = ({ target: { name, value } }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setEmployee((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const modalTitle = 'Success !';
    const modalErrTitle = 'Error !';

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                <div className="title text-center">
                    <h1 className="text-3xl font-bold mb-2">HRnet</h1>
                </div>
                <div className="container">
                <a href='#' onClick={() => setPage('Employees')}>
						<div className='text-blue-700 hover:text-blue-500 font-bold text-center mb-2'>View Current Employees</div>
					</a>
                    <h2 className="text-xl font-bold mb-2 mt-4 text-center">Create Employee</h2>
                    <form action="#" id="create-employee">
                        <div className="flex flex-col">
                            <DataInput id="first-name" type="text" name="firstName" label="First Name" onChange={handleInputChange} />
                            <DataInput id="last-name" type="text" name="lastName" label="Last Name" onChange={handleInputChange} />
                            <DataInput id="date-of-birth" type="date" name="dateOfBirth" label="Date of Birth" onChange={handleInputChange} />
                            <DataInput id="start-date" type="date" name="startDate" label="Start Date" onChange={handleInputChange} />
                            <SelectMenu id="department" name="department" label="Department" data={departmentOptions} onChange={handleInputChange} />
                            <DataInput id="street" type="text" name="street" label="Street" onChange={handleInputChange} />
                            <DataInput id="city" type="text" name="city" label="City" onChange={handleInputChange} />
                            <SelectMenu id="state" name="state" label="State" data={stateOptions} onChange={handleInputChange} />
                            <DataInput id="zip-code" type="text" name="zipCode" label="Zip Code" onChange={handleInputChange} />
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-blue-700 hover:bg-blue-750 text-white font-bold py-2 px-4 rounded my-4" onClick={saveEmployee}>Save</button>
                        </div>
                    </form>
                </div>
                <Modal title={modalTitle} opened={modalOpened} onClose={handleCloseModal} content='Employee Created!' btnText='Close' />
                <Modal title={modalErrTitle} opened={errorModalOpened} onClose={handleCloseModal} content='Please fill all the fields' btnText='Close' />
            </div>
        </div>
    );
};

export default CreateEmployee;
