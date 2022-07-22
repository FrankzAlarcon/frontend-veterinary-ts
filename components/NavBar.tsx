import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useVeterinarian from "../hooks/useVeterinarian";

export default function NavBar() {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const {handleLogout} = useVeterinarian();

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  }


  const applySelectStyles = (path: string): string => {
    let styles = 'p-2 rounded-md cursor-pointer font-bold hover:bg-violet-400 hover:text-white transition-colors duration-300 md:text-center lg:text-lg'
    if(router.pathname === path) {
      return styles + ' bg-violet-400 text-white text-sm lg:text-lg font-black uppercase shadow-md'
    }
    return styles + ' bg-white';
  }
  const applySelectStylesMobile = (path: string): string => {
    let styles = 'w-full p-2 border-b font-bold cursor-pointer hover:bg-violet-500 hover:text-white transition-all duration-500 flex gap-2 items-center'
    if(router.pathname === path) {
      return styles + ' bg-violet-500 text-white text-sm lg:text-lg font-black uppercase shadow-md'
    }
    return styles + ' bg-indigo-300';
  }
  return (
    <nav className="w-full shadow-md bg-indigo-600 fixed md:flex md:w-1/3 lg:w-1/5 md:min-h-screen md:py-12 md:px-4">
      <div className="flex items-center justify-between md:hidden">
        <div className="">
          <Link href="/">
            <a className="text-2xl font-black px-4 text-white cursor-pointer">Veterinary App</a>
          </Link>
        </div>
        <button onClick={handleShowOptions} className="p-2 cursor-pointer text-white">          
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        {
          showOptions && (
            <div className="fixed md:hidden top-14 right-0 border-2 w-full max-w-sm border-gray-300 rounded-sm shadow-sm">
              <Link href="/">            
                <p className={`${applySelectStylesMobile('/')}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Mis Clientes
                </p>
              </Link>
              <Link href="/new-customer">
                <p className={`${applySelectStylesMobile("/new-customer")}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  Nuevo Cliente
                </p>
              </Link>
              <Link href="/tasks">
                <p className={`${applySelectStylesMobile("/tasks")}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Mis Tareas
                </p>
              </Link>
              <button
                type="button"
                className='w-full bg-indigo-400 uppercase p-2 font-bold cursor-pointer hover:bg-violet-500 hover:text-white transition-all duration-500'
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          )
        }
      </div>
      <div className="hidden w-full md:flex p-2 md:flex-col md:gap-4 md:justify-between">
        <div className="flex flex-col gap-4 justify-start">
          <Link href="/">
            <p className={`${applySelectStyles("/")}`}>Mis Clientes</p>
          </Link>
          <Link href="/new-customer">
            <p className={`${applySelectStyles("/new-customer")}`}>
              Nuevo Cliente
            </p>
          </Link>
          <Link href="/tasks">
            <p className={`${applySelectStyles("/tasks")}`}>Mis Tareas</p>
          </Link>
        </div>
        <button
          type="button"
          className='w-full bg-white rounded-md uppercase p-2 font-bold cursor-pointer hover:bg-violet-500 hover:text-white transition-all duration-500'
          onClick={handleLogout}
        >
            Cerrar Sesión
          </button>
      </div>
    </nav>
  );
}
