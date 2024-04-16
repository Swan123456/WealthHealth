import Head from "next/head"
import EmployeesTable from "../components/Table/Table"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Link from "next/link"
import styled from "styled-components"

export default function EmployeesScreen() {
	return (
		<>
			<Head>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>HRNET - Employees</title>
			</Head>
			<StyledTitle>
				<StyledLink href="/">
					<ArrowLeftIcon /> Add a new employee
				</StyledLink>
			</StyledTitle>
			<EmployeesTable />
		</>
	)
}

const StyledTitle = styled.h2`
	padding: 5% 5% 2%;
`
const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	width: fit-content;
`
const ArrowLeftIcon = styled(KeyboardBackspaceIcon)`
	margin-right: 5px;
`
