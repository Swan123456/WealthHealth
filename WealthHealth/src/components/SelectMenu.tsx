import { ChangeEvent } from 'react'

//? Ajouter le type PropsType
type PropsType = {
	id: string //! ID utilisé par le component
	name: string //! Nom utilisé par le component
	label: string //! Label à afficher
	data: Array<string> | Array<{ option: string; value: string }> //! Données du component
	onChange: ({ target: { name, value } }: ChangeEvent<HTMLSelectElement>) => void //! Fonction appelée à chaque changement dans le composant
}

export default ({ id, name, label, data, onChange }: PropsType) => {
	return (
		<>
			<label htmlFor={id} className='block text-gray-700 text-sm font-bold mb-2'>
				{label}
			</label>
			<select id={id} name={name} onChange={onChange} className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
				{/* Boucle permettant de passer sur tous les élements du data et de l'afficher dans le select */}
				{data.map((data, index) => (
					<option key={index} value={typeof data === 'string' ? data : data.value}>
						{typeof data === 'string' ? data : data.option}
					</option>
				))}
			</select>
		</>
	)
}
