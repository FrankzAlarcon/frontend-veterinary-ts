import type { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect, useState } from 'react';
import CustomerCard from '../components/CustomerCard';
import Input from '../components/Input';
import Layout from '../components/Layout';
import ModalDelete from '../components/ModalDelete';
import useVeterinarian from '../hooks/useVeterinarian';
import { deleteAppointmentsOfVeterinarian } from '../services/appointment';
import { getCustomersInfo } from '../services/customer';
import { User } from '../types/custom';
import { CustomerInfo } from '../types/customer';

interface Props {
  props: {
    customersPreview: CustomerInfo[]
  }
  modal: {
    operation: "add" | "delete" | "edit";
    value: boolean;
  }
}

const Home: NextPage<Props['props']> = ({customersPreview}) => {
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState<Props['modal']>({operation: 'delete', value: false});
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInfo | {}>();
  const [customers, setCustomers] = useState<CustomerInfo[]>(customersPreview);
  const {handleCustomer, veterinarian} = useVeterinarian();

  const filteredCustomerInfo = customers.filter(customer => customer.name.toLowerCase().includes(input.toLowerCase()));

  useEffect(() => {
    //Quitar el estado del customer
    handleCustomer({id: 0, name: '', email: '', appointments: [], pets: []})
  }, []);

  const handleShowModal = (value: Props['modal']) => {
    setShowModal(value);
    setSelectedCustomer({});
  }

  const handleDeleteCustomer = async () => {
    try {
      //Relizar peticion
      await deleteAppointmentsOfVeterinarian(
        (veterinarian as User).id,
        (selectedCustomer as CustomerInfo).id,
        (veterinarian as User).token);
      //Cambiar estado de customers
      const newCustomers = customers.filter(customer => customer.id !== (selectedCustomer as CustomerInfo).id);
      setCustomers(newCustomers);
      //Reestablecer estados
      setSelectedCustomer({});
      return 'Eliminado correctamente';
    } catch (error) {
      return 'Ha ocurrido un error intentando eliminar el cliente';
    } 
  }

  return (
    <Layout title='Lista de Pacientes'>
      <div className='container p-4 text-center mx-auto'>
        <h1 className='text-3xl font-black text-black md:text-5xl lg:text-6xl'>Listado de <span className='text-indigo-600'>Pacientes</span></h1>
        <p className='my-2'>Administra tus <span className='text-indigo-600 font-bold'>pacientes y citas</span></p>
        <Input id='searcher' placeholder='Escribe el nombre de un cliente' value={input} setValue={setInput}/>
        <div>
          {
            filteredCustomerInfo.length !== 0 ? filteredCustomerInfo.map((customer) => <CustomerCard key={customer.id} customer={customer} showModalDelete={setShowModal} handleSelectedCustomer={setSelectedCustomer}/>)
            : <p className='text-gray-600 text-center font-black text-xl mt-6 md:text-3xl lg:text-4xl'>No hay pacientes registrados</p>
          }
        </div>
        <ModalDelete
          openModal={showModal}
          title={`¿Realmente quieres eliminar a ${(selectedCustomer as CustomerInfo)?.name ? (selectedCustomer as CustomerInfo)?.name: 'este usuario'}?`}
          text='No podrás recuperarlo!!'
          handleDelete={handleDeleteCustomer}
          setOpenModal={handleShowModal}          
        />
      </div>    
    </Layout>
  )
}

export async function getServerSideProps({req}: GetServerSidePropsContext) {
  try {
    const {token, veterinarianId} = req.cookies;
    if(!token || ! veterinarianId) {
      return {
        notFound: true
      }
    }
    const customersPreview = await getCustomersInfo(Number(veterinarianId), token);
    return {
      props: {
        customersPreview
      }
    }
  } catch (error) {    
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }        
    }
  }
}

export default Home
