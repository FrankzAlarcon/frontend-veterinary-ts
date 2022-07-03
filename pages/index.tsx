import type { NextPage } from 'next';
import { useState } from 'react';
import Input from '../components/Input';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const [input, setInput] = useState('');

  return (
    <Layout title='Lista de Pacientes'>
      <div className='container p-4 text-center mx-auto'>
        <h1 className='text-3xl font-black text-black md:text-5xl lg:text-6xl'>Listado de <span className='text-indigo-600'>Pacientes</span></h1>
        <p className='my-2'>Administra tus <span className='text-indigo-600 font-bold'>pacientes y citas</span></p>
        <Input id='searcher' placeholder='Escribe el nombre de un cliente' value={input} setValue={setInput}/>
      </div>    
    </Layout>
  )
}

export default Home
