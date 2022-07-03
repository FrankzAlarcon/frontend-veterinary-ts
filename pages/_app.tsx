import '../styles/globals.css'
import '../styles/spinner.css'
import type { AppProps } from 'next/app'
import VeterinarianProvider from '../context/VeterinarianProvider'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <VeterinarianProvider>
      <div className='bg-gray-100'>
        <Component {...pageProps} />
      </div>
    </VeterinarianProvider>
  )
}

export default MyApp
