import React, { useEffect, useState } from 'react'
import EditForm from '../components/EditForm';
import Layout from '../components/Layout'
import NewCustomerForm from '../components/NewCustomerForm';
import VerifyCustomerForm from '../components/VerifyCustomerForm';
import useVeterinarian from '../hooks/useVeterinarian';

interface Props {
  request: 'found' | 'not-found' | ''
}

export default function NewPatient() {
  const [requestState, setRequestState] = useState<Props['request']>('');
  const {handleCustomer} = useVeterinarian();

  useEffect(() => {
    //Quitar el estado del customer
    handleCustomer({id: 0, name: '', email: '', appointments: [], pets: []});
  }, []);

  const handleRequest = (value: Props['request']) => {
    setRequestState(value);
  }

  return (
    <Layout title='Nuevo Paciente'>
      <div>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-center mt-5'>Registra un nuevo <span className='text-indigo-600'>Paciente</span></h1>
        <p className='text-center my-2'>Añade tus nuevos clientes para que puedas <span className='text-indigo-600 font-bold'>Administrarlos</span></p>
        {requestState === '' && <VerifyCustomerForm setRequestState={handleRequest} />}
        {requestState === 'found' && <EditForm />}
        {requestState === 'not-found' && <NewCustomerForm />}
      </div>
    </Layout>
  )
}
