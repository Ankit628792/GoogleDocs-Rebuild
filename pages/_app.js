import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Google Docs Rebuild</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>)
}

export default MyApp
