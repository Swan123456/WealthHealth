/**
 * Composant DataInput
 * @param {string} id - Identifiant du champ.
 * @param {'text' | 'number' | 'date'} type - Type du champ.
 * @param {string} name - Nom du champ.
 * @param {string} label - Étiquette du champ.
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} onChange - Fonction à appeler lors du changement de valeur du champ.
 * @returns {JSX.Element} - Composant React.
 * @resume Composant React qui affiche un champ et son étiquette.
 */

//* Importation react
import { ChangeEvent } from 'react'

//? Définition des types
type PropsType = {
	id: string
	type: 'text' | 'number' | 'date'
	name: string
	label: string
	onChange: ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => void
}

//! Exporte un composant React qui affiche un champ et son étiquette
export default ({ id, type, name, label, onChange }: PropsType) => {
	return (
		<>
			<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={id}>
				{label}
			</label>
			<input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id={id} type={type} name={name} onChange={onChange} />
		</>
	)
}
