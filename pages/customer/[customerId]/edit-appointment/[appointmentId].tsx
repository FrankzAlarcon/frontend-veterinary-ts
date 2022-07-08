import { GetServerSidePropsContext } from "next";
import EditAppointmentForm from "../../../../components/EditAppointmentForm";
import Layout from "../../../../components/Layout";
import { getCompleteAppointment } from "../../../../services/appointment";
import { CompleteAppointment } from "../../../../types/appoinment";

interface Props {
  props: {
    appointment: CompleteAppointment
  }
}

export default function EditAppointment({appointment}: Props['props']) {
  return (
    <Layout title="Editar Paciente">
      <div>
        <h1 className="text-3xl font-black mt-10 text-center">Edita la cita de un <span className="text-indigo-600">Paciente</span></h1>
        <p className="text-center text-lg my-2">Edita los datos de la cita <span className="font-bold text-indigo-600">y administrala</span></p>
        <EditAppointmentForm  appointment={appointment}/>
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