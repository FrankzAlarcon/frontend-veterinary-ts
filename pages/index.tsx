import type { NextPage } from 'next';
import Auth from '../components/Auth';

const Home: NextPage = () => {
  return (
    <Auth>
      <div className='container p-4 text-center mx-auto'>
        <h1 className='text-4xl mt-10 font-black text-black md:text-5xl lg:text-6xl'>Listado de <span className='text-indigo-600'>Pacientes</span></h1>
        <p className='mt-4 mb-10'>Administra tus <span className='text-indigo-600 font-bold'>pacientes y citas</span></p>        
      </div>    
    </Auth>
  )
}

export default Home
