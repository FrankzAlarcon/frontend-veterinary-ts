import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Auth from "./Auth";

interface Props {
  title: string
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children, title }: Props) {
  const router = useRouter();
  const applySelectStyles = (path: string): string => {
    let styles = 'p-2 rounded-md cursor-pointer hover:bg-violet-400 hover:text-white transition-colors duration-300'
    if(router.pathname === path) {
      return styles + ' bg-violet-400 text-white text-sm font-black uppercase shadow-md'
    }
    return styles + ' bg-white';
  }
  return (
    <Auth>
      <Head>
        <title>App Veterinaria | {title}</title>
      </Head>
      <nav className="w-full bg-indigo-700 flex justify-evenly p-2">
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
      <div>{children}</div>
    </Auth>
  );
}
