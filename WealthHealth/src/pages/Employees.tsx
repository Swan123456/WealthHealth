import DataTable from "../components/DataTable";



export interface Employee {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    startDate: string;
    department: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

type PropsType = {
	setPage: (page: string) => void
	employees: Array<Employee>
}

const columns = [
	{ title: 'First Name', data: 'firstName' }, 
	{ title: 'Last Name', data: 'lastName' }, 
	{ title: 'Start Date', data: 'startDate' }, 
	{ title: 'Department', data: 'department' }, 
	{ title: 'Date of Birth', data: 'dateOfBirth' }, 
	{ title: 'Street', data: 'street' },
	{ title: 'City', data: 'city' }, 
	{ title: 'State', data: 'state' }, 
	{ title: 'Zip Code', data: 'zipCode' }, 
]

export default ({ setPage, employees }: PropsType) => {
    
    return (
		<>
			<div>
                Employee
                <DataTable data={employees} columns={columns} />
			</div>
            <div className='flex justify-center mt-5'>
					<a href='#' onClick={() => setPage('Home')} className='text-blue-500 hover:text-blue-800 font-bold text-center mb-2'>
						Home
					</a>{' '}
					{/* //! Retourne à la page Home */}
			</div>
		</>
	)
}