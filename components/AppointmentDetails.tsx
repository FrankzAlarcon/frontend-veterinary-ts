import { Appointment } from "../types/appoinment"

interface Props {
  appointment: Appointment
}

export default function AppointmentDetails({appointment}: Props) {
  return (
    <div className="w-full border-2 border-gray-300 bg-slate-100 shadow-md rounded-md mb-3 p-2 md:flex">
      <div className="md:w-9/12">
        <p className="uppercase font-bold text-gray-500">Fecha: <span className="normal-case font-semibold text-black">{appointment.date}</span></p>
        <p className="uppercase font-bold text-gray-500">Mascota: <span className="normal-case font-semibold text-black">{appointment.petId}</span></p>
        <p className="uppercase font-bold text-gray-500">Tipo de animal<span className="normal-case font-semibold text-black"></span></p>
        <p className="uppercase font-bold text-gray-500">Síntomas: <span className="normal-case font-semibold text-black">{appointment.symptoms}</span></p>
        <p className="uppercase font-bold text-gray-500">Estado: <span className="normal-case font-semibold text-black">{appointment.isCompleted ? 'Completado':'Pendiente'}</span></p>
      </div>
      <div className="flex gap-5 justify-around md:w-3/12 md:flex-col md:items-center">
        <button className="submit-button bg-lime-500 hover:bg-lime-400 text-white new-width shadow-sm rounded-md">Completar</button>
        <button className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white new-width shadow-sm rounded-md">Editar</button>
      </div>
    </div>
  )
}
