import type { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect, useState } from 'react';
import CustomerCard from '../components/CustomerCard';
import Input from '../components/Input';
import Layout from '../components/Layout';
import useVeterinarian from '../hooks/useVeterinarian';
import { getCustomersInfo } from '../services/customer';
import { CustomerInfo } from '../types/customer';

interface Props {
  customersPreview: CustomerInfo[]
}

const Home: NextPage<Props> = ({customersPreview}) => {
  const [input, setInput] = useState('');
  const {handleCustomer} = useVeterinarian();

  const filteredCustomerInfo = customersPreview.filter(customer => customer.name.toLowerCase().includes(input.toLowerCase()))

  useEffect(() => {
    //Quitar el estado del customer
    handleCustomer({id: 0, name: '', email: '', appointments: [], pets: []})
  }, []);

  return (
    <Layout title='Lista de Pacientes'>
      <div className='container p-4 text-center mx-auto'>
        <h1 className='text-3xl font-black text-black md:text-5xl lg:text-6xl'>Listado de <span className='text-indigo-600'>Pacientes</span></h1>
        <p className='my-2'>Administra tus <span className='text-indigo-600 font-bold'>pacientes y citas</span></p>
        <Input id='searcher' placeholder='Escribe el nombre de un cliente' value={input} setValue={setInput}/>
        <div>
          {
            filteredCustomerInfo.map((customer) => <CustomerCard key={customer.id} customer={customer}/>)
          }
        </div>
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
    console.log(error)
    return {
      notFound: true
    }
  }
}

export default Home
