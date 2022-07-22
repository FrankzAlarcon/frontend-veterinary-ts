import React from "react";
import Auth from "./Auth";
import CustomHead from "./CustomHead";
import NavBar from "./NavBar";

interface Props {
  title: string
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children, title }: Props) {  
  return (
    <Auth>
      <CustomHead title={title} description={`Administra fácilmente la seccion de ${title}`}/>
      <div className="flex flex-col md:flex-row">
        <div className="w-full shadow-md md:w-1/3 lg:w-1/5 h-14 md:h-auto">
          <NavBar />
        </div>        
        <div className="min-h-screen md:w-2/3 w-full p-2 pt-6 md:py-4 md:px-6 container mx-auto">
          {children}</div>
      </div>
    </Auth>
  );
}
