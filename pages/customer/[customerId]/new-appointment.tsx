import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import ExistingCustomerForm from "../../../components/ExistingCustomerForm";
import Layout from "../../../components/Layout";
import ModalConfirmAction from "../../../components/ModalConfirmAction";
import useVeterinarian from "../../../hooks/useVeterinarian";
import { getCustomer } from "../../../services/customer";
import {CustomerComplete} from '../../../types/customer'

interface Props {
  customer: CustomerComplete
}

export default function NewAppointment({customer}: Props) {
  const {handleCustomer} = useVeterinarian();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    handleCustomer(customer);
  }, [customer, handleCustomer]);

  const handleShowModal = (value: boolean) => {
    setShowModal(value)
  }

  return (
    <Layout title="Nueva Cita">
      <div className="">
        <h1 className="text-3xl font-black mt-5 text-center">Crea una nueva cita para un <span className="text-indigo-600">Paciente</span></h1>
        <p className="text-center text-lg my-2">Agrega los datos de la <span className="text-indigo-600 font-bold">Nueva Cita</span></p>
        <ExistingCustomerForm handleModal={handleShowModal}/>
        <ModalConfirmAction title='Se ha creado la cita' showModal={showModal}  handleModal={handleShowModal} nextRoute={`/customer/${customer.id}`}/>
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