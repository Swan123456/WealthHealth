import { Employee } from '../../utils/store/employees/EmployeesSlice'


export type Order = 'asc' | 'desc'

export interface TableToolbar {
	rows: Employee[]
	setRows: Function
}

export interface HeadCell {
	disablePadding: boolean
	id: string
	label: string
}

export interface TableProps {
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
	order: Order
	orderBy: string
}