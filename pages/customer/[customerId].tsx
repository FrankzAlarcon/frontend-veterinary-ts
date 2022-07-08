import { GetServerSidePropsContext } from 'next'
import React from 'react'
import Layout from '../../components/Layout';
import { getCustomer } from '../../services/customer';
import {CustomerComplete} from '../../types/customer'

interface Props {
  customer: CustomerComplete
}

export default function CustomerDetails({customer}: Props) {
  return (
    <Layout title='Detalles de Paciente'>
      <div>
        {Object.values(customer).map(value => !Array.isArray(value) ? <p key={value}>{value}</p>: null)}
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