import { Box, TableCell, TableHead as DefaultTableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import DefaultSearchBar from 'material-ui-search-bar'
import Toolbar from '@mui/material/Toolbar'
import { Employee } from '../../utils/store/employees/EmployeesSlice'
import { TableProps, TableToolbar, HeadCell, Order } from './types'
import styles from './Table.module.css'
import { useTsSelector } from '../../utils/store/hooks'
import { getEmployees } from '../../utils/store/employees/selectors'

export function TableHead(props: TableProps) {
	const { order, orderBy, onRequestSort } = props
	const createSortHandler =
		(property: string) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property)
		}

	return (
		<DefaultTableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</DefaultTableHead>
	)
}

export function SearchBar({ rows, setRows }: TableToolbar) {

	const employees: Employee[] = useTsSelector(getEmployees)

	
	const cancelSearch = () => requestSearch('')

	const requestSearch = (searchedValue: string) => {
		const filteredRows = employees.filter(
			(row: Employee) =>
				row?.firstname
					.toLowerCase()
					.includes(searchedValue.toLowerCase()) ||
				row?.lastname
					.toLowerCase()
					.includes(searchedValue.toLowerCase()) ||
				row?.startDate
					.toLowerCase()
					.includes(searchedValue.toLowerCase()) ||
				row?.department
					.toLowerCase()
					.includes(searchedValue.toLowerCase()) ||
				row?.dateOfBirth
					.toLowerCase()
					.includes(searchedValue.toLowerCase()) ||
				row?.street
					.toLowerCase()
					.includes(searchedValue.toLowerCase()) ||
				row?.city.toLowerCase().includes(searchedValue.toLowerCase()) ||
				row?.state
					.toLowerCase()
					.includes(searchedValue.toLowerCase()) ||
				row?.zipCode.toLowerCase().includes(searchedValue.toLowerCase())
		)
		setRows(filteredRows)
	}

	return (
		<Toolbar
			className="mobile"
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="h2"
			>
				Employees
			</Typography>
			<DefaultSearchBar
				className={styles.bg}
				onChange={(searchedValue) => requestSearch(searchedValue)}
				onCancelSearch={cancelSearch}
				style={{
					minWidth: 300,
					height: '40px',
					background: 'inherit',
					padding: '5px 010px 1rem',
				}}
				placeholder="Search an employee"
				cancelOnEscape
			/>
		</Toolbar>
	)
}

/* data */
const headCells: readonly HeadCell[] = [
	{
		id: 'firstname',
		disablePadding: false,
		label: 'First Name',
	},
	{
		id: 'lastname',
		disablePadding: false,
		label: 'Last Name',
	},
	{
		id: 'startDate',
		disablePadding: false,
		label: 'Start Date',
	},
	{
		id: 'department',
		disablePadding: false,
		label: 'Department',
	},
	{
		id: 'dateOfBirth',
		disablePadding: false,
		label: 'Date Of Birth',
	},
	{
		id: 'street',
		disablePadding: false,
		label: 'street',
	},
	{
		id: 'city',
		disablePadding: false,
		label: 'City',
	},
	{
		id: 'state',
		disablePadding: false,
		label: 'State',
	},
	{
		id: 'zipCode',
		disablePadding: false,
		label: 'ZipCode',
	},
]


/* Sorting functions */

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

export function getComparator<Key extends keyof any>(order: Order, orderBy: Key):
(
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

export function stableSort<T>( array: readonly T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}
