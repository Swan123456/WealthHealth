import ElementPopper from "react-element-popper"
import transition from "react-element-popper/animations/transition"
import { FieldError } from "react-hook-form"
import DatePicker, { DateObject } from "react-multi-date-picker"
import InputIcon from "react-multi-date-picker/components/input_icon"

export default function DPicker({ onChange, maxDate, noWeekends, error, value="" }: Props) {
	return 	(
		<DatePicker
			containerClassName={error ? "datepicker error" : "datepicker"}
			maxDate={maxDate && maxDate}
			format="MM/DD/YYYY"
			editable={false}
			calendarPosition="bottom-end"
			weekStartDayIndex={1}
			animations={[transition()]} 
			fixMainPosition={true}
			render={<InputIcon />}
			mapDays={({ date }) => {
				let props = {className:''}
				let isWeekend = [0, 6].includes(date.weekDay.index)
				if (isWeekend && noWeekends) props.className = "highlight highlight-red"
				return props
			}}
			onChange={(dateObject:DateObject) => onChange(dateObject.format()) }
			value={value}
		/>
	)
}

interface Props {
	onChange: Function
	maxDate?: Date
	noWeekends?: boolean
	error?: FieldError | undefined
	value: string
}
