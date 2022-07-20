import { GetServerSidePropsContext } from 'next'
import React, { useState } from 'react'
import Alert from '../../components/Alert';
import AppointmentDetails from '../../components/AppointmentDetails';
import Layout from '../../components/Layout';
import NewPetForm from '../../components/NewPetForm';
import { getCustomer } from '../../services/customer';
import {CustomerComplete, Pet} from '../../types/customer'

interface Props {
  customer: CustomerComplete
}

export default function CustomerDetails({customer}: Props) {
  const [showCompletedAppointments, setShowCompletedAppointments] = useState(false);
  const [pendingAppointments, setPendingAppointments] = useState(() => customer.appointments.filter(appointment => !appointment.isCompleted));
  const [completedAppointments, setCompletedAppointments] = useState(() => customer.appointments.filter(appointment => appointment.isCompleted));
  const [showNewPetForm, setShowNewPetForm] = useState(false);

  const [pets, setPets] = useState(() => customer.pets);

  const handleShowAppointments = (value: boolean) => {
    setShowCompletedAppointments(value);    
  }

  const hideNewPetForm = () => {
    setShowNewPetForm(false);
  }

  const addPet = async (pet: Pet) => {
    setPets([...pets, pet]);
    setShowNewPetForm(false);
  }

  return (
    <Layout title='Detalles de Paciente'>
      <div>
        <h1 className='text-3xl font-black text-center mt-5 md:text-4xl lg:text-5xl'>Seguimiento de <span className='text-indigo-600'>Pacientes</span></h1>
        <p className='text-lg text-center my-2'>Observa y administra las <span className='font-bold text-indigo-600'>citas de tus pacientes</span></p>
        <div className='bg-white p-2 rounded-md shadow-md lg:px-6 lg:py-4'>          
          <div className='space-y-1 mb-2 md:flex md:flex-row-reverse justify-between items-center'>
            <button className='submit-button bg-indigo-600 hover:bg-indigo-700 text-white md:w-3/12 rounded-md'>Editar Cliente</button>
            <div className='space-y-1 md:w-10/12'>
              <p className='text-gray-700 uppercase font-bold'>Cliente: <span className='text-black normal-case font-semibold'>{customer.name}</span></p>
              <p className='text-gray-700 uppercase font-bold'>Email: <span className='text-black normal-case font-semibold'>{customer.email}</span></p>
            </div>
          </div>
          <div className='space-y-2 md:w-4/5 md:mx-auto lg:w-1/2'>
            <h2 className='text-center uppercase text-gray-700 font-bold text-lg'>Mascota(s):</h2>
            <table className='mx-auto w-full border-2'>
              <thead className='border-2'>
                <tr>
                  <th className=' bg-blue-800 p-2 uppercase text-white font-black border-2'>
                    Nombre
                  </th>
                  <th className=' bg-blue-800 p-2 uppercase text-white font-black border-2'>
                    Tipo Animal
                  </th>
                </tr>
              </thead>
              <tbody className='border-2'>
                {pets.map(pet => (
                  <tr key={pet.id}>
                    <td className='border-2 capitalize p-2 font-semibold'>
                      {pet.name}
                    </td>
                    <td className='border-2 capitalize p-2 font-semibold'>
                      {pet.animalType}
                    </td>
                  </tr>
                ))}
              </tbody>            
            </table>
            {showNewPetForm && <NewPetForm onCancel={hideNewPetForm} addPet={addPet}/>}
            {!showNewPetForm && (
              <button
                onClick={() => setShowNewPetForm(true)}
                className='submit-button bg-indigo-600 hover:bg-indigo-700 text-white'
              >Agregar Nueva Mascota</button>
            )}
          </div>
          <div>
            <h2 className='uppercase font-black text-gray-700 text-center my-4 text-xl'>Citas</h2>
            <div className='flex justify-around gap-5'>
              <button
                className={`submit-button border-2 border-gray-500 rounded-md md:w-40 text-center ${showCompletedAppointments ? 'bg-gray-50' : 'bg-indigo-600 text-white'}`}
                onClick={() => handleShowAppointments(false)}
              >Pendientes</button>
              <button
                className={`submit-button border-2 border-gray-500 rounded-md md:w-40 text-center ${showCompletedAppointments ? 'bg-indigo-600 text-white' : 'bg-gray-50'}`}
                onClick={() => handleShowAppointments(true)}
              >Completadas</button>
            </div>
            <div>
              {
                showCompletedAppointments ? (    
                  completedAppointments.length === 0 ? (<Alert type='successful'>Todavía no hay citas completadas</Alert>)
                  : (completedAppointments.map((appointment) => <AppointmentDetails key={appointment.id} appointment={appointment} />))
                ): (
                  pendingAppointments.length === 0 ? (<Alert type='successful'>No hay citas pendientes</Alert>)
                  : (pendingAppointments.map((appointment) => <AppointmentDetails key={appointment.id} appointment={appointment} />))
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({params, req}: GetServerSidePropsContext) {
  try {
    const customerId = Number(params?.customerId);
    const {token} = req.cookies;
    const customer = await getCustomer(token ?? '', customerId);
    if(customer.appointments.length === 0 ) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        customer
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }


}