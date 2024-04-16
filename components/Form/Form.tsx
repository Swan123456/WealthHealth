import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './validationSchema'
import { nanoid } from '@reduxjs/toolkit'
import DatePicker from '../Datepicker/DatePicker'
import StateDropdown from '../Dropdown/StateDropdown'
import DepartmentDropdown from '../Dropdown/DepartmentDropdown'
import styles from './Form.module.css'

export default function Form({ onSubmit, children, valuesToEdit }: Props) {
	
	const [formValues, setFormValues] = useState(
		valuesToEdit ? valuesToEdit : initialValues
	)

	const { register, setValue, handleSubmit, formState: { errors }, reset } = 
	useForm<Inputs>({
		resolver: yupResolver(validationSchema),
		defaultValues: formValues,
	})

	const handleChange = (key: string, value: string) =>
		setFormValues({
			...formValues,
			[key]: value,
		})

	const [stateDropdownPlaceholder, setStateDropdownPlaceholder] =
		useState(valuesToEdit ? formValues.state : 'Select a state')
	const [deptDropdownPlaceholder, setDeptDropdownPlaceholder] = 
		useState(valuesToEdit ? formValues.department :'Select a department')

	const handleForm_Reset = (employee: Inputs) => {
		onSubmit(employee)
		reset()
		setFormValues(initialValues)
		setStateDropdownPlaceholder('Select a state')
		setDeptDropdownPlaceholder('Select a department')
	}

	return (
		<>
			{/* "handleSubmit" will validate inputs before invoking "onSubmit" */}
			<form
				className={styles.employee_form}
				onSubmit={handleSubmit(handleForm_Reset)}
			>
				{/* Firstname */}
				<div className={styles.input_container}>
					<label className={styles.label} htmlFor="firstname">
						First Name
					</label>
					<small className={styles.error_msg} role="alert">
						{errors.firstname?.message}
					</small>
					<input
						id="firstname"
						className={errors.firstname && styles.input_error}
						aria-invalid={errors.firstname ? 'true' : 'false'}
						{...register('firstname', {
							pattern:
								/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g,
							required: true,
						})}
						value={formValues?.firstname}
						onChange={(e) =>
							handleChange('firstname', e.target.value)
						}
					/>
				</div>
				{/* Lastname */}
				<div className={styles.input_container}>
					<label className={styles.label} htmlFor="lastname">
						Last Name
					</label>
					<small className={styles.error_msg} role="alert">
						{errors.lastname?.message}
					</small>
					<input
						id="lastname"
						className={errors.lastname && styles.input_error}
						aria-invalid={errors.lastname ? 'true' : 'false'}
						{...register('lastname', { required: true })}
						value={formValues?.lastname}
						onChange={(e) =>
							handleChange('lastname', e.target.value)
						}
					/>
				</div>
				{/* Date of birth */}
				<div className={styles.input_container}>
					<label className={styles.label} htmlFor="dateOfBirth">
						Date Of Birth
					</label>
					<small className={styles.error_msg} role="alert">
						{errors.dateOfBirth?.message}
					</small>
					<DatePicker
						error={errors.dateOfBirth}
						aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
						maxDate={new Date()}
						value={formValues?.dateOfBirth}
						onChange={(val: string) => {
							setValue('dateOfBirth', val)
							register('dateOfBirth', { required: true })
							handleChange('dateOfBirth', val)
						}}
					/>
				</div>
				{/* Start Date */}
				<div className={styles.input_container}>
					<label className={styles.label} htmlFor="startDate">
						Start Date
					</label>
					<small className={styles.error_msg} role="alert">
						{errors.startDate?.message}
					</small>
					<DatePicker
						error={errors.startDate}
						aria-invalid={errors.startDate ? 'true' : 'false'}
						noWeekends
						value={formValues?.startDate}
						onChange={(val: string) => {
							setValue('startDate', val)
							register('startDate', { required: true })
							handleChange('startDate', val)
						}}
					/>
				</div>
				<fieldset className={styles.employee_form__fieldset}>
					<legend className={styles.employee_form__legend}>
						Adress
					</legend>

					{/* Street */}
					<div className={styles.input_container}>
						<label className={styles.label} htmlFor="street">
							Street
						</label>
						<small className={styles.error_msg} role="alert">
							{errors.street?.message}
						</small>
						<input
							id="street"
							className={errors.street && styles.input_error}
							aria-invalid={errors.street ? 'true' : 'false'}
							{...register('street', { required: true })}
							value={formValues?.street}
							onChange={(e) =>
								handleChange('street', e.target.value)
							}
						/>
					</div>
					{/* City */}
					<div className={styles.input_container}>
						<label className={styles.label} htmlFor="city">
							City
						</label>
						<small className={styles.error_msg} role="alert">
							{errors.city?.message}
						</small>
						<input
							id="city"
							className={errors.city && styles.input_error}
							aria-invalid={errors.city ? 'true' : 'false'}
							{...register('city', { required: true })}
							value={formValues?.city}
							onChange={(e) =>
								handleChange('city', e.target.value)
							}
						/>
					</div>
					{/* State Dropdown */}
					<div className={styles.input_container}>
						<label className={styles.label} htmlFor="state">
							State
						</label>
						<small className={styles.error_msg} role="alert">
							{errors.state?.message}
						</small>
						<StateDropdown
							error={!!errors.state}
							onChange={(value: string) => {
								setValue('state', value)
								register('state', { required: true })
								handleChange('state', value)
								setStateDropdownPlaceholder(value)
							}}
							placeholder={stateDropdownPlaceholder}
							setPlaceholder={setStateDropdownPlaceholder}
						/>
					</div>
					{/* zipCode */}
					<div className={styles.input_container}>
						<label className={styles.label} htmlFor="zipCode">
							Zip Code
						</label>
						<small className={styles.error_msg} role="alert">
							{errors.zipCode?.message}
						</small>
						<input
							id="zipCode"
							className={errors.zipCode && styles.input_error}
							aria-invalid={errors.zipCode ? 'true' : 'false'}
							{...register('zipCode', { required: true })}
							value={formValues?.zipCode}
							onChange={(e) =>
								handleChange('zipCode', e.target.value)
							}
						/>
					</div>
				</fieldset>
				{/* Department Dropdown */}
				<div className={styles.input_container}>
					<label className={styles.label} htmlFor="department">
						Department
					</label>
					<small className={styles.error_msg} role="alert">
						{errors.department?.message}
					</small>
					<DepartmentDropdown
						error={!!errors.department}
						onChange={(value: string) => {
							register('department', { required: true, min: 0 })
							setValue('department', value)
							handleChange('department', value)
							setDeptDropdownPlaceholder(value)
						}}
						placeholder={deptDropdownPlaceholder}
						setPlaceholder={setDeptDropdownPlaceholder}
					/>
					{children}
				</div>
				<input className={styles.employee_form__submit} type="submit" />
			</form>
		</>
	)
}

export type Inputs = {
	firstname: string
	lastname: string
	dateOfBirth: string
	startDate: string
	street: string
	state: string
	city: string
	zipCode: string
	department: string
	id: string
}

type Props = {
	onSubmit: SubmitHandler<Inputs>
	children?: any
	valuesToEdit?: Inputs
}
const initialValues = {
	firstname: '',
	lastname: '',
	dateOfBirth: '',
	startDate: '',
	street: '',
	state: '',
	city: '',
	zipCode: '',
	department: '',
	id: nanoid(8),
}
