import { useEffect, useState } from 'react'
import { useTsDispatch, useTsSelector } from '../../utils/store/hooks'
import { getEmployees } from '../../utils/store/employees/selectors'
import { deleteEmployee, editEmployee, Employee } from '../../utils/store/employees/EmployeesSlice'
import Box from '@mui/material/Box'
import DefaultTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { TableHead, SearchBar, stableSort, getComparator } from './TableHead'
import { Order } from './types'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { ImCross } from 'react-icons/im'
import styles from './Table.module.css'
import styled from 'styled-components'
import Form from '../Form/Form'

export default function Table() {
	const employees = useTsSelector(getEmployees)
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState('firstname')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(4)
	const [rows, setRows] = useState(employees)
	const [showForm, setShowForm] = useState(false)
	const [valuesToEdit, setValuesToEdit] = useState(employees[0])
	const dispatch = useTsDispatch()

	/* sorting the content by clicking on the arrow */
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: string
	) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}
	/* Pagination */
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}
	/**Sure about deleting an employee? */
	const handleDelete = (employee: Employee) =>{
		if(confirm(`are u sure to delete ${employee.firstname} ${employee.lastname}?`)) {
			dispatch(deleteEmployee(employee.id))
		} 
		if(rows.length <= 4) {
			setPage(0)
		}		
		if(rows.length % rowsPerPage == 1) {
			setPage(Math.floor(rows.length/rowsPerPage) - 1)
		}
	}
	const handleEdit = (employee: Employee) => {
		setValuesToEdit(employee)
		setShowForm(true)
	}
	const handleSubmit = (editedEmployee: Employee) => {
		dispatch(editEmployee({...editedEmployee, id:valuesToEdit.id }))
		setShowForm(false)
	}
	const handleCloseForm = () => setShowForm(false)
	/* Re rendering when editing or deleting an employee */
	useEffect(() => {
		setRows(employees)
	}, [employees])
	useEffect(() => {
		setPage(page)
	}, [page])

	return (
		<>
			<Box className={`${styles.bg} ${styles.center}`}>
				<SearchBar rows={rows} setRows={setRows} />
				<TableContainer>
					<DefaultTable
						sx={{ minWidth: 500 }}
						aria-labelledby="employees"
					>
						<TableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => (
									<TableRow
										hover
										tabIndex={-1}
										key={`${row?.id}`}
									>
										<TableCell>{row.firstname}</TableCell>
										<TableCell>{row.lastname}</TableCell>
										<TableCell>
											{row.startDate.toString()}
										</TableCell>
										<TableCell>{row.department}</TableCell>
										<TableCell>
											{row.dateOfBirth.toString()}
										</TableCell>
										<TableCell>{row.street}</TableCell>
										<TableCell>{row.city}</TableCell>
										<TableCell>{row.state}</TableCell>
										<TableCell align="center">
											{row.zipCode}
										</TableCell>
										<TableCell>
											<EditBtn aria-label={`edit user ${row.firstname} ${row.lastname}`} onClick={() => handleEdit(row)}><FiEdit role="presentation" focusable="false" /></EditBtn>
											<DeleteBtn aria-label={`delete user ${row.firstname} ${row.lastname}`} onClick={() => handleDelete(row)}><RiDeleteBin5Line role="presentation" focusable="false" /></DeleteBtn>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</DefaultTable>
				</TableContainer>
				{/* Footer Table Pagination */}
				<TablePagination
					rowsPerPageOptions={[4, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={(rows.length <= 4) ? 0 : page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Box>
			{/* Modal for editing values */}
			{showForm && (
				<EditModalContainer>
					<Form onSubmit={handleSubmit} valuesToEdit={valuesToEdit}>
						<CloseModalIcon onClick={handleCloseForm}><ImCross/></CloseModalIcon>
					</Form>
				</EditModalContainer>
			)}
		</>
	)
}

const EditBtn = styled.button`
	color: orange;
	cursor: pointer;
	font-size: 1.2rem;
	margin: 0 5px;
	background-color: transparent;
	border: none;
`
const DeleteBtn = styled.button`
	color: red;
	cursor: pointer;
	font-size: 1.2rem;
	margin: 0 5px;
	background-color: transparent;
	border: none;
`
const EditModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	form {
		background-color: steelblue;
		margin: 1rem auto;
		color: white;
		border-radius: 4px;
		fieldset {
			border: 1px solid #ffffff70;
		}
	}
`
const CloseModalIcon = styled.button`
	position: absolute;
	top: 8px;
	right: 10px;
	background-color: transparent;
	border: none;
	color: white;
	cursor: pointer;
`
