import '../styles/globals.css'
import '../styles/spinner.css'
import type { AppProps } from 'next/app'
import VeterinarianProvider from '../context/VeterinarianProvider'

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <VeterinarianProvider>
        <Component {...pageProps} />
    </VeterinarianProvider>
  )
}

export default MyApp
