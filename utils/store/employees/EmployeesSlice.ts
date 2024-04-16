import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers
const initialState: Array<Employee> = [
	{
		firstname: 'Tony',
		lastname: 'Stork',
		dateOfBirth: '01/12/1976',
		startDate: '01/01/2020',
		street: '1st avenue',
		city: 'New York City',
		state: 'New York',
		zipCode: '92000',
		department: 'Legal',
		id: 'sdfz5521z,'
	},
	{
		firstname: 'Fernando',
		lastname: 'perez',
		dateOfBirth: '01/02/1982',
		startDate: '01/01/2023',
		street: '1st avenue',
		city: 'New York City',
		state: 'New York',
		zipCode: '89612',
		department: 'Engineering',
		id: 'sdcsd658,'
	},
	{
		firstname: 'Mark',
		lastname: 'Panders',
		dateOfBirth: '01/12/1996',
		startDate: '01/01/2021',
		street: '1st avenue',
		city: 'Paris',
		state: 'Paris',
		zipCode: '75000',
		department: 'Human Resources',
		id: '584szdzfz,'
	},
	{
		firstname: 'John',
		lastname: 'Varantino',
		dateOfBirth: '09/21/1987',
		startDate: '12/01/2023',
		street: 'street city',
		city: 'city street',
		state: 'Alabama',
		zipCode: '56945',
		department: 'Sales',
		id: '958sdzfz,'
	},
]

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		addEmployee: (state, action: PayloadAction<Employee>) => {
			state.push(action.payload)
		},
		deleteEmployee: (state, action: PayloadAction<string>) => {
			return state.filter(employee => JSON.parse(JSON.stringify(employee.id)) !== action.payload)
		},
		editEmployee: (state, action: PayloadAction<Employee>) => {
			const index = JSON.parse(JSON.stringify(state)).findIndex((employee:Employee) => employee.id == action.payload.id)
			state[index] = action.payload
		},
	},
})

export const { addEmployee, deleteEmployee, editEmployee } = employeesSlice.actions 

export type Employee = {
	firstname: string
	lastname: string
	dateOfBirth: string
	startDate: string
	street: string
	city: string
	state: string
	zipCode: string
	department: string
	id: string
}

export default employeesSlice.reducer