import React, { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

export const Modal: React.FC<Props> = ({
	children,
	overlay_color = 'rgba(49,49,49,0.8)',
	modal_color = 'white',
	text_color = 'black',
	visible,
	hide,
}) => {
	const handleKeyDown = useCallback((e:KeyboardEvent) => {
		if(e.key === 'Escape' && visible) {
			hide()
		}
	}, [hide])
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [hide])
	return visible
		? createPortal(
				<div className="modal-container" data-testid="modal-container">
					<Overlay onClick={hide} overlay_color={overlay_color} />
					<Content modal_color={modal_color}>
						<CloseIcon data-testid="close-modal-btn" onClick={hide}>
							X
						</CloseIcon>
						<p style={{ color: text_color }}>{children}</p>
					</Content>
				</div>,
				document.body
		  )
		: null
}

export default Modal
export interface Props {
	children: string
	visible: boolean
	hide: () => void
	overlay_color?: string
	modal_color?: string
	text_color?: string
}

interface Overlay {
	overlay_color?: string
}
interface Content {
	modal_color?: string
}

const Overlay = styled.div<Overlay>`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: ${(props) => props.overlay_color};
`
const Content = styled.div<Content>`
	position: absolute;
	width: 50%;
	background-color: ${({ modal_color }) => modal_color};
	border-radius: 5px;
	text-align: center;
	padding: 2rem 0;
	top: 40%;
	left: 50%;
	transform: translateX(-50%);
	@media screen and (max-width: 500px) {
		width: 60%;
		padding: 4rem 1rem;
		top: 60%;
		font-size: 1.2rem;
	}
`
const CloseIcon = styled.button`
	position: absolute;
	top: -10px;
	right: -10px;
	cursor: pointer;
	border-radius: 50%;
	background: black;
	color: white;
	padding: 5px 10px;
`
