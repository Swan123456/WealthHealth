import Head from "next/head"
import Link from "next/link"
import { addEmployee } from "../utils/store/employees/EmployeesSlice"
import { useTsDispatch } from "../utils/store/hooks"
import { SubmitHandler } from "react-hook-form"
import Form, { Inputs } from "../components/Form/Form"
import Modal from "simple-react-modal-plugin"
import useModal from "simple-react-modal-plugin/useModal"
import styled from "styled-components"

export default function HomeScreen(): JSX.Element {
	const { visible, toggle } = useModal()
	const dispatch = useTsDispatch()

	const onSubmit: SubmitHandler<Inputs> = (newEmployee: Inputs) => {
		toggle()
		dispatch(addEmployee(newEmployee))
		console.log("newEmployee:", newEmployee)
	}

	return (
		<>
			<Head>
				<title>HRNET - Homepage</title>
			</Head>

			<Container>
				<Headings>
					<H1>HRnet</H1>
					<StyledLink href="employees">View Current Employees</StyledLink>
				</Headings>

				<Form onSubmit={onSubmit} />
				<Modal visible={visible} hide={toggle}>
					Employee Successfully Created !
				</Modal>
			</Container>
		</>
	)
}

const Container = styled.main`
	height: 100%;
	display: flex;
	max-width: 1000px;
	margin: 0 auto;
	justify-content: space-around;
	align-items: center;
	@media screen and (max-width: 700px) {
		flex-direction: column;
		justify-content: inherit;
	}
`
const Headings = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	@media screen and (max-width: 700px) {
		height: auto;
	}
`
const H1 = styled.h1`
	font-size: 5rem;
`
const StyledLink = styled(Link)`
	color: inherit;
	text-decoration: none;
	font-size: 1.5rem;
	margin-top: 1rem;
	&:hover {
		text-decoration: underline;
	}
`
