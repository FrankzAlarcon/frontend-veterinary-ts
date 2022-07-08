import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import ExistingCustomerForm from "../../../components/ExistingCustomerForm";
import Layout from "../../../components/Layout";
import useVeterinarian from "../../../hooks/useVeterinarian";
import { getCustomer } from "../../../services/customer";
import {CustomerComplete} from '../../../types/customer'

interface Props {
  customer: CustomerComplete
}

export default function NewAppointment({customer}: Props) {
  const {handleCustomer} = useVeterinarian();
  useEffect(() => {
    handleCustomer(customer);
  }, [customer, handleCustomer])
  return (
    <Layout title="Nueva Cita">
      <div className="">
        <h1 className="text-3xl font-black mt-5 text-center">Crea una nueva cita para un <span className="text-indigo-600">Paciente</span></h1>
        <p className="text-center text-lg my-2">Agrega los datos de la <span className="text-indigo-600 font-bold">Nueva Cita</span></p>
        <ExistingCustomerForm handleModal={() => {}}/>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({req, params}: GetServerSidePropsContext) {
  try {
    if(params) {
      const {token} = req.cookies;
      const {customerId} = params;
      const customer = await getCustomer(token ?? '', Number(customerId));
      return {
        props: {
          customer
        }
      }
    } else {
      return {
        notFound: true
      }
    }
  } catch(error) {
    return {
      notFound: true
    }
  }
}