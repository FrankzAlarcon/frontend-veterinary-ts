import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import EditAppointmentForm from "../../../../components/EditAppointmentForm";
import Layout from "../../../../components/Layout";
import ModalConfirmAction from "../../../../components/ModalConfirmAction";
import { getCompleteAppointment } from "../../../../services/appointment";
import { CompleteAppointment } from "../../../../types/appoinment";

interface Props {
  props: {
    appointment: CompleteAppointment
  }
}

export default function EditAppointment({appointment}: Props['props']) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (value: boolean) => {
    setShowModal(value)
  }

  return (
    <Layout title="Editar Paciente">
      <div>
        <h1 className="text-3xl font-black mt-10 text-center">Edita la cita de un <span className="text-indigo-600">Paciente</span></h1>
        <p className="text-center text-lg my-2">Edita los datos de la cita <span className="font-bold text-indigo-600">y administrala</span></p>
        <EditAppointmentForm  appointment={appointment} handleModal={handleShowModal}/>
        <ModalConfirmAction title='Se ha actualizado la cita' showModal={showModal}  handleModal={handleShowModal} nextRoute={`/customer/${appointment.customerId}`}/>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({params, req}: GetServerSidePropsContext) {
  try {
    const {token} = req.cookies;
    const appointment = await getCompleteAppointment(Number(params?.appointmentId), token ?? '');
    if(appointment.customerId !== Number(params?.customerId)) {
      return {
        notFound: true
      }
    }
    if(appointment.isCompleted){
      return {
        notFound: true
      }
    }
    return {
      props: {
        appointment
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
  
}