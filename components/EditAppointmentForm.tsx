import { Formik, Form, Field, FormikHelpers } from "formik";
import { ChangeEvent, useState } from "react";
import { formatDate } from "../helpers";
import useVeterinarian from "../hooks/useVeterinarian";
import { newAppointmentSchema } from "../schemas";
import { completeUpdateAppointment } from "../services/appointment";
import { createPet } from "../services/pet";
import { CompleteAppointment, UpdateAppointment } from "../types/appoinment";
import { User } from "../types/custom";
import { NewCustomer } from "../types/customer";
import Alert from "./Alert";

interface Props {
  props: {
    appointment: CompleteAppointment
    handleModal: (value: boolean) => void
  }
}

export default function EditAppointmentForm({appointment, handleModal}: Props['props']) {
  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const [petId, setPetId] = useState(appointment.pet.id);
  const [petName, setPetName] = useState(appointment.pet.name);
  const [animalType, setAnimalType] = useState(appointment.pet.animalType);
  const {veterinarian} = useVeterinarian();
  const {customer} = appointment;

  const handleShowNewPetForm = () => {
    setShowNewPetForm(true);
    setPetName('');
    setAnimalType('');
  }

  const handleHideNewPetForm = () => {
    setShowNewPetForm(false);
    const pet = customer.pets.find(pet => pet.id === petId);
    if(pet) {
      setPetName(pet.name);
      setAnimalType(pet.animalType);
    }
  }

  const handleSelect = ({target}: ChangeEvent<HTMLSelectElement>) => {
    const pet = customer.pets.find(pet => pet.id === Number(target.value));
    if(pet) {
      setPetId(pet.id);
      if(!showNewPetForm) {
        setPetName(pet.name);
        setAnimalType(pet.animalType);
      }
    }
  }

  const handleSubmit = async (values: NewCustomer, {resetForm}: FormikHelpers<NewCustomer>) => {
    try {
      const {petName, animalType} = values;
      const vet = (veterinarian as User);
      let pet;
      if(showNewPetForm) {
        pet = await createPet(vet.token, customer.id, petName, animalType) ;
      }
      const {date, symptoms} = values;
      const newAppointmentData: UpdateAppointment = {
        date,
        symptoms,                
        petId: pet ? pet.id : petId,        
      }
      await completeUpdateAppointment(appointment.id, newAppointmentData, vet.token);
      handleModal(true);
      resetForm();  
    } catch (error) {
      
    }
  }
  

  return (
    <div className="w-full bg-white p-3 shadow-md">
      <Formik
        initialValues={{
          name: customer.name ?? '',
          email: customer.email ?? '',          
          petName: petName ?? '',
          animalType:animalType ?? '',
          date: formatDate(appointment.date) ?? '',
          symptoms: appointment.symptoms ?? ''
        }}
        onSubmit={handleSubmit}
        validationSchema={newAppointmentSchema}
        enableReinitialize
      >
        {
          ({errors, touched,values}) => (
            <Form>
              <div className="mb-2">              
                <h2 className="text-center font-black uppercase text-xl lg:mb-2">
                  Datos del cliente
                </h2>
                <div className="lg:grid lg:grid-cols-2 gap-5 space-y-2 lg:space-y-0">
                  <label htmlFor="name" className="block">
                    <p className="text-gray-900 font-bold uppercase mb-1">Nombre</p>
                    <Field
                      disabled
                      type="text"
                      className="w-full p-2 border-2 border-gray-700 rounded-md disabled:bg-slate-100"
                      placeholder="Nombre del cliente"
                      value={values.name}
                      name="name"
                      id="name"
                    />
                    {errors.name && touched.name && <Alert type="error">{errors.name}</Alert>}
                  </label>
                  <label htmlFor="email" className="block">
                    <p className="text-gray-900 font-bold uppercase mb-1">Correo electrónico</p>
                    <Field
                      disabled
                      type="email"
                      className="w-full p-2 border-2 border-gray-700 rounded-md disabled:bg-slate-100"
                      placeholder="Email del cliente"
                      value={values.email}
                      name="email"
                      id="email"
                    />
                    {errors.email && touched.email && <Alert type="error">{errors.email}</Alert>}
                  </label>
                </div>
              </div>
              <div className="mb-2">
              <h2 className="text-center font-black uppercase text-xl lg:mb-2">
                Datos de la mascota
              </h2>
              <label htmlFor="pets">
                <Field component='select' name="pets" onChange={handleSelect} value={petId} id="pets" className='w-full p-2 border-2 border-gray-700 rounded-md'>
                  <option value="" disabled>--Seleccionar Mascota--</option>
                  {customer.pets.map(pet => (
                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                  ))}
                </Field>
              </label>
              <div className="lg:grid lg:grid-cols-2 gap-5 space-y-2 lg:space-y-0">
                <label htmlFor="petName" className="block">
                  <p className="text-gray-900 font-bold uppercase mb-1">Nombre de la mascota</p>
                  <Field
                    type="text"
                    className="w-full p-2 border-2 border-gray-700 rounded-md disabled:bg-slate-100"
                    placeholder="Nombre de la mascota"
                    value={values.petName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPetName(e.target.value)}
                    name="petName"
                    id="petName"
                  />
                  {errors.petName && touched.petName && <Alert type="error">{errors.petName}</Alert>}
                </label>
                <label htmlFor="animalType" className="block">
                  <p className="text-gray-900 font-bold uppercase mb-1">Tipo de animal</p>
                  <Field
                    type="text"
                    className="w-full p-2 border-2 border-gray-700 rounded-md disabled:bg-slate-100"
                    placeholder="Tipo de animal"
                    value={values.animalType}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAnimalType(e.target.value)}
                    name="animalType"
                    id="animalType"
                  />
                  {errors.animalType && touched.animalType && <Alert type="error">{errors.animalType}</Alert>}
                </label>
                {
                  showNewPetForm ? (
                    <button
                      type="button"
                      className="submit-button bg-red-600 hover:bg-red-700 text-white"
                      onClick={handleHideNewPetForm}
                    >Cancelar</button>
                  ) : (
                    <button
                      type="button"
                      className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={handleShowNewPetForm}
                    >Nueva Mascota</button>
                  )
                }
              </div>
            </div>
            <div className="mb-2">
              <h2 className="text-center font-black uppercase text-xl lg:mb-2">
                Datos de la cita
              </h2>
              <div className="space-y-2">
                <label htmlFor="date" className="block">
                  <p className="text-gray-900 font-bold uppercase mb-1">Fecha</p>
                  <Field
                    type="datetime-local"
                    className="w-full p-2 border-2 border-gray-700 rounded-md"
                    value={values.date}
                    name="date"
                    id="date"
                  />
                  {errors.date && touched.date && <Alert type="error">{errors.date}</Alert>}
                </label>
                <label htmlFor="symptoms" className="block">
                  <p className="text-gray-900 font-bold uppercase mb-1">Síntomas</p>
                  <Field
                    as='textarea'
                    type="text"
                    className="w-full p-2 border-2 border-gray-700 rounded-md"
                    placeholder="Síntomas"
                    value={values.symptoms}
                    name="symptoms"
                    id="symptoms"
                  />
                  {errors.symptoms && touched.symptoms && <Alert type="error">{errors.symptoms}</Alert>}
                </label>
              </div>
            </div>
            <input 
              type="submit"
              value="Guardar Cambios"
              className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white block"
            />
            </Form>
          )
        }
      </Formik>
    </div>
  )
}