import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="fr">
			<Head>
				<meta
					name="description"
					content="HRNET, React app to create employees, and list them on another page via a table."
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="use-credentials"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
