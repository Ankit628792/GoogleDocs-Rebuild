import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import { Provider } from 'next-auth/client'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
  size: 5,
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
        <link rel='icon' href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Google Docs - Use Google Docs to create, and collaborate on online documents. Edit together with secure sharing in real-time and from any device.." />
        <meta name="author" content="@ankit_628792" />
        <meta name='theme-color' content='#2196f3' />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>)
}

export default MyApp
