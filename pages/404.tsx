import Head from "next/head";
import Link from "next/link";

export default function ErrorPage() {
  return (    
    <>
      <Head>
        <title>Ha sucecido un error</title>
      </Head>  
      <div className="gradient grid place-content-center h-screen">
        <div className="flex flex-col items-center justify-center text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-22 w-22" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-9xl font-black my-2 text-black">404</p>
          <p className="text-2xl font-black text-black md:text-4xl">Página no encontrada</p>
          <Link href='/'>
            <p className="bg-blue-500 p-2 border-2 border-transparent hover:border-gray-700 text-white font-bold mt-2 mb-14 cursor-pointer hover:bg-blue-600 transition-all duration-500">Regresar al Home</p>
          </Link>
        </div>
      </div>
    </>
  )
}
