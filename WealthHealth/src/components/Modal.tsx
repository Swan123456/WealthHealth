/**
 * Composant Modal
 * @param {boolean} opened - Indique si le modal est ouvert ou non.
 * @param {function} onClose - Fonction à appeler lors de la fermeture du modal.
 * @param {string} content - Contenu du modal.
 * @param {string} btnText - Texte du bouton de fermeture.
 * @param {string} title - Titre du modal.
 * @returns {JSX.Element} - Composant Modal.
 * @resume Composant Modal basé sur le composant natif <dialog> de HTML5.
 */

import { useEffect, useRef } from 'react'
//? Ajouter le type PropsType
type PropsType = {
	opened: boolean
	onClose: () => void
	content: string
	btnText: string
	title: string
}

//! Exporte un composant modal basé sur le type de propriétés passées en paramètre
export default ({ title, opened, onClose, content, btnText }: PropsType) => {
	//! Utilisation du ref React afin de récupérer l'élément DOM
	const modal = useRef<HTMLDialogElement>(null)

	//! Au changement du statut du modal, afficher/masquer le modal selon la propriété "opened"
	useEffect(() => {
		if (opened) {
			modal.current!.showModal()
		}
	}, [opened])

	//! Affichage du modal
	return (
		<dialog ref={modal} id='confirmation' className='border border-solide rounded-2xl'>
			<section className='flex flex-col items-center justify-center'>
				<h1 className='text-center text-3xl font-bold mb-5'>{title}</h1>
				<p>{content}</p>
			</section>
			<form method='dialog' onSubmit={onClose} className='flex items-center justify-center p-10 '>
				<button className='bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>{btnText}</button>
			</form>
		</dialog>
	)
}
