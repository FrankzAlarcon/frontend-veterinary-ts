import React, { useEffect, useState } from 'react'
import ExistingCustomerForm from '../components/ExistingCustomerForm';
import Layout from '../components/Layout'
import ModalConfirmAction from '../components/ModalConfirmAction';
import NewCustomerForm from '../components/NewCustomerForm';
import VerifyCustomerForm from '../components/VerifyCustomerForm';
import useVeterinarian from '../hooks/useVeterinarian';

interface Props {
  request: 'found' | 'not-found' | ''
}

export default function NewCustomer() {
  const [requestState, setRequestState] = useState<Props['request']>('');
  const [showModal, setShowModal] = useState(false);
  const {customer, handleCustomer} = useVeterinarian();

  useEffect(() => {
    //Quitar el estado del customer
    handleCustomer({id: 0, name: '', email: '', appointments: [], pets: []});
  }, []);

  const handleRequest = (value: Props['request']) => {
    setRequestState(value);
  }

  const handleShowModal = (value: boolean) => {
    setShowModal(value);
  }

  return (
    <Layout title='Nuevo Paciente'>
      <div>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-center mt-5'>Registra un nuevo <span className='text-indigo-600'>Paciente</span></h1>
        <p className='text-center my-2'>Añade tus nuevos clientes para que puedas <span className='text-indigo-600 font-bold'>Administrarlos</span></p>
        {requestState === '' && <VerifyCustomerForm setRequestState={handleRequest} />}
        {requestState === 'found' && <ExistingCustomerForm handleModal={handleShowModal}/>}
        {requestState === 'not-found' && <NewCustomerForm />}
        <ModalConfirmAction title='Se ha creado la cita' showModal={showModal}  handleModal={handleShowModal} nextRoute={`customer/${customer.id}`}/>
      </div>
    </Layout>
  )
}
