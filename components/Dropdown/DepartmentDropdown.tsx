import { FcSalesPerformance, FcStatistics } from 'react-icons/fc'
import { BsFillGearFill } from 'react-icons/bs'
import { GiHumanPyramid } from 'react-icons/gi'
import { GoLaw } from 'react-icons/go'
import styled from 'styled-components'
import CustomizedMenus from './Dropdown'

export default function DepartmentDropdown({ error, onChange, placeholder, setPlaceholder}: Props) {
	const departments: Array<Option> = [
		{
			id: '1',
			value: 'Sales',
			view: (
				<LabelContainer>
					<FcSalesPerformance />
					<span>Sales</span>
				</LabelContainer>
			),
		},
		{
			id: '2',
			value: 'Marketing',
			view: (
				<LabelContainer>
					<FcStatistics />
					<span>Marketing</span>
				</LabelContainer>
			),
		},
		{
			id: '3',
			value: 'Engineering',
			view: (
				<LabelContainer>
					<BsFillGearFill color="#ea4c89" />
					<span>Engineering</span>
				</LabelContainer>
			),
		},
		{
			id: '4',
			value: 'Human Resources',
			view: (
				<LabelContainer>
					<GiHumanPyramid color="#32c766" />
					<span>Human Resources</span>
				</LabelContainer>
			),
		},
		{
			id: '5',
			value: 'Legal',
			view: (
				<LabelContainer>
					<GoLaw color="#f48024" />
					<span>Legal</span>
				</LabelContainer>
			),
		},
	]

	return (
		<CustomizedMenus
			error={error}
			options={departments}
			onChange={onChange}
			placeholder={placeholder}
			setPlaceholder={setPlaceholder}
		/>
	)
}

const LabelContainer = styled.div`
	display: flex;
	align-items: center;
	svg {
		margin-right: 1rem;
		font-size: 1.5rem;
	}
`

interface Option {
	id: string
	value: string
	view: any
}
interface Props {
	error: boolean
	onChange: Function
	placeholder: string
	setPlaceholder : React.Dispatch<React.SetStateAction<string>>
}
