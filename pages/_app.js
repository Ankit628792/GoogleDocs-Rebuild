import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import { Provider } from 'next-auth/client'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
  size: 3,
  color: '#2196f3',
  className: "z-50",
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

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
