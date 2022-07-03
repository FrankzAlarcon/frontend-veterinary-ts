import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Auth from "./Auth";
import CustomHead from "./CustomHead";

interface Props {
  title: string
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children, title }: Props) {
  const router = useRouter();
  const applySelectStyles = (path: string): string => {
    let styles = 'p-2 rounded-md cursor-pointer hover:bg-violet-400 hover:text-white transition-colors duration-300 md:text-center lg:text-lg'
    if(router.pathname === path) {
      return styles + ' bg-violet-400 text-white text-sm lg:text-lg font-black uppercase shadow-md'
    }
    return styles + ' bg-white';
  }
  return (
    <Auth>
      <CustomHead title={title} description={`Administra fácilmente la seccion de ${title}`}/>
      <div className="flex">
        <nav 
          className="w-full shadow-md bg-indigo-600 flex justify-evenly p-2 fixed md:w-1/3 lg:w-1/5 md:flex md:static md:min-h-screen md:flex-col md:gap-4 md:justify-start md:py-12 md:px-4"
        >
          <Link href="/">
            <p className={`${applySelectStyles('/')}`}>Mis Pacientes</p>
          </Link>
          <Link href="/new-patient">
            <p className={`${applySelectStyles('/new-patient')}`}>Nuevo Paciente</p>
          </Link>
          <Link href="/tasks">
            <p className={`${applySelectStyles('/tasks')}`}>Mis Tareas</p>
          </Link>
        </nav>
        <div className="min-h-screen  md:w-2/3 w-full p-2 pt-14 md:py-4 md:px-6 container mx-auto">{children}</div>
      </div>
    </Auth>
  );
}
