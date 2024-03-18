import type { Employee } from './Employees';
import { useState } from 'react';

type PropsType = {
    setPage: (page: string) => void;
    setEmployees: (setEmployees: (prev: Array<Employee>) => Array<Employee>) => void;
};

const CreateEmployeeForm = ({ setPage, setEmployees }: PropsType) => {
    const [employee, setEmployee] = useState<Employee>({ firstName: '', lastName: '', dateOfBirth: '', startDate: '',  street: '', city: '', zipCode: '' });

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2'>
                <div className='title text-center'>
                    <h1 className='text-3xl font-bold mb-2'>HRnet</h1>
                </div>
                <div className='container'>
                    <a href='#' onClick={() => setPage('Employees')}>
                        <div className='text-blue-700 hover:text-blue-500 font-bold text-center mb-2'>View Current Employees</div>
                    </a>
                    <h2 className='text-xl font-bold mb-2 mt-4 text-center'>Create Employee</h2>
                    <form action='#' id='create-employee'>
                        <div className='flex flex-col'>
                            <input id='first-name' type='text' name='firstName' label='First Name' />
                            <br />
                            <input id='last-name' type='text' name='lastName' label='Last Name' />
                            <br />
                            <input id='date-of-birth' type='date' name='dateOfBirth' label='Date of Birth' />
                            <br />
                            <input id='start-date' type='date' name='startDate' label='Start Date' />
                            <br />
                            <fieldset className='address'>
                                <legend className='font-bold mb-2'>Address</legend>
                                <input id='street' type='text' name='street' label='Street' />
                                <br />
                                <input id='city' type='text' name='city' label='City' />
                                <br />
                                <br />
                                <input id='zip-code' type='text' name='zipCode' label='Zip Code' />
                            </fieldset>
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-blue-700 hover:bg-blue-750 text-white font-bold py-2 px-4 rounded my-4'>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeForm;
