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

export default ({ setPage, employees }: PropsType) => {
    
    return (
		<>
			<div>
                Employee
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