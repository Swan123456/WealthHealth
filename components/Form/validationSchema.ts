import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
	firstname: Yup.string()
		.trim()
		.required('This field is required')
		.matches(/^[a-z-éèêëçäà]+[ \-']?[[a-z]+[ \-']?]*[a-z-éèêëçäà]+$/gi, 'Check your input'),
	lastname: Yup.string()
		.trim()
		.required("This field is required")
		.matches(/^[a-z-éèêëçäà]+[ \-']?[[a-z]+[ \-']?]*[a-z-éèêëçäà]+$/gi, 'Check your input'),
	dateOfBirth: Yup.string()
		.trim()
		.required('This field is required'),
	startDate: Yup.string()
		.trim()
		.required('This field is required'),
	street: Yup.string()
		.trim()
		.required('This field is required'),
	state: Yup.string()
		.trim()
		.required('This field is required'),
	city: Yup.string()
		.trim()
		.required('This field is required'),
	zipCode: Yup.string()
		.trim()
		.required('This field is required')
		.matches(/^[0-9]*$/, 'Check your input'),
	department: Yup.string()
		.trim()
		.required('This field is required'),
})
