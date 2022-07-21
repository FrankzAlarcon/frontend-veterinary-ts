import { useState } from "react";
import { formatMoney, formatStringToDate } from "../helpers"
import useVeterinarian from "../hooks/useVeterinarian";
import { updateAppointment } from "../services/appointment";
import { AppointmentWithPet } from "../types/appoinment"
import { User } from "../types/custom";
import Alert from "./Alert";

interface Props {
  appointment: AppointmentWithPet
  setSelectedAppointment: (appointment: AppointmentWithPet | {}) => void  
  showConfirmModal: (value: boolean) => void
  prescription: string
  setPrescription: (value: string) => void
  price: number | string
  setPrice: (value: number | string) => void
  showCompleteForm: boolean
  setShowCompleteForm: (value: boolean) => void
}

export default function AppointmentDetails({
  appointment, showConfirmModal, prescription, setPrescription, price, setPrice, setSelectedAppointment, setShowCompleteForm, showCompleteForm
}: Props) {
  const [alert, setAlert] = useState(false);

  const handleShowCompleteForm = (value: boolean) => {
    setShowCompleteForm(value);
    setAlert(false);
    setPrice('');
    setPrescription('');
    setSelectedAppointment({});
  }

  const handleComplete = async () => {
    if(!prescription || !price) {
      setAlert(true);
      return setTimeout(() => setAlert(false), 2500);
    }
    setSelectedAppointment(appointment);
    showConfirmModal(true);
  }  

  return (
    <div className="w-full border-2 border-gray-300 bg-slate-100 shadow-md rounded-md mb-3 p-2">
      <div className=" md:flex">
        <div className="md:w-9/12">
          <p className="uppercase font-bold text-gray-500">Fecha: <span className="normal-case font-semibold text-black">{formatStringToDate(appointment.date)}</span></p>
          <p className="uppercase font-bold text-gray-500">Mascota: <span className="normal-case font-semibold text-black">{appointment.pet.name}</span></p>
          <p className="uppercase font-bold text-gray-500">Tipo de animal: <span className="normal-case font-semibold text-black">{appointment.pet.animalType}</span></p>
          <p className="uppercase font-bold text-gray-500">Síntomas: <span className="normal-case font-semibold text-black">{appointment.symptoms}</span></p>
          <p className="uppercase font-bold text-gray-500">Estado: <span className="normal-case font-semibold text-black">{appointment.isCompleted ? 'Completado':'Pendiente'}</span></p>
          {
            appointment.isCompleted && (
              <>
                <p className="uppercase font-bold text-gray-500">Receta Médica: <span className="normal-case font-semibold text-black">{appointment.prescription}</span></p>
                <p className="uppercase font-bold text-gray-500">Precio: <span className="normal-case font-semibold text-black ">{formatMoney(Number(appointment.price))}</span></p>            
              </>
            )
          }
        </div>
        {
          !appointment.isCompleted && (
            <div className="flex gap-5 justify-around md:w-3/12 md:flex-col md:items-center">
              <button
                className="submit-button bg-lime-500 hover:bg-lime-400 text-white new-width shadow-sm rounded-md md:w-full"
                onClick={showCompleteForm ? handleComplete : () => handleShowCompleteForm(true)}
              >{showCompleteForm ? 'Guardar':'Completar'}</button>
              <button
                className={`submit-button text-white new-width shadow-sm rounded-md md:w-full ${showCompleteForm ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                onClick={showCompleteForm ? () => handleShowCompleteForm(false) : () => {}}
              >{showCompleteForm ? 'Cancelar': 'Editar'}</button>
            </div>
          )
        }
      </div>
      <div>
        {
          showCompleteForm && (
            <div className="flex flex-col justify-center items-center">
              <div className="w-full md:w-3/5 lg:w-1/2">
                <form className="rounded px-2 pt-6 pb-2 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 uppercase text-center" htmlFor="prescription">
                      Receta Médica
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="prescription"                      
                      placeholder="Receta Médica"
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      ></textarea>
                  </div>
                  <div className="flex w-1/2 justify-center items-center mx-auto gap-x-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2 uppercase text-center" htmlFor="price">
                      Precio:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block"                      
                      id="price"
                      type="number"
                      placeholder="Precio"
                      value={price}                      
                      onChange={(e) => setPrice(Number(e.target.value))}
                      />
                  </div>
                  {alert && <Alert type='error'>Los campos son obligatorios</Alert>}
                </form>
              </div>
            </div>
          )
        }
      </div>   
    </div>
  )
}
