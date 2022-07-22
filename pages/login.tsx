import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomHead from '../components/CustomHead';
import LoginForm from '../components/LoginForm';
import Wave from '../components/Wave';
import useVeterinarian from '../hooks/useVeterinarian';
import { User } from '../types/custom';

const Home: NextPage = () => {
  const {veterinarian} = useVeterinarian();
  const router = useRouter();
  useEffect(() => {
    if(Object.keys(veterinarian).length !== 0) {
      router.push('/');
      document.cookie = `token=${(veterinarian as User).token}`;
      document.cookie = `veterinarianId=${(veterinarian as User).id}`;
    }
  }, [router, veterinarian]);
  return (
    <>
      <CustomHead title='Login' description='Inicia sesión con tu cuenta para que puedas administrar tu veterinaria'/>
      <div className='container p-4 text-center absolute mx-auto my-auto top-0 left-0 right-0 bottom-0'>
        <h1 className='text-4xl mt-10 font-black text-indigo-600 md:text-5xl lg:text-6xl'>Veterinary <span className='text-black'>App</span></h1>
        <p className='mt-4 mb-10'>Ingresa tu usuario y <span className='text-indigo-600 font-bold'>contraseña</span></p>
        <LoginForm />
      </div>
      <Wave />
    </>
  )
}

export default Home;
