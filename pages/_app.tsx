import Head from "next/head"
import Image from "next/image"
import BgImage from "/public/assets/herobg.png"
import styled from "styled-components"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../utils/store/store"
import "../utils/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="theme-color" content="#4285f4" />
				<link rel="apple-touch-icon" href="/assets/favicon.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="shortcut icon" href="/assets/favicon.png" />
			</Head>
			<BgContainer>
				<Image
					src={BgImage}
					alt="background"
					quality={100}
					fill
					placeholder="blur"
					priority
				/>
			</BgContainer>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</>
	)
}

const BgContainer = styled.div`
	z-index: -1;
	position: fixed;
	width: 100vw;
	height: 100vh;
	@media (max-width: 500px) {
		background-attachment: scroll;
		min-width: 100%;
		min-height: 100%;
	}
`
