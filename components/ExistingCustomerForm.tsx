import { Formik, Form, Field, FormikHelpers } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import useVeterinarian from "../hooks/useVeterinarian";
import { newAppointmentSchema } from "../schemas";
import { createAppointment } from "../services/appointment";
import { createPet } from "../services/pet";
import { CreateAppointment } from "../types/appoinment";
import { User } from "../types/custom";
import { NewCustomer } from "../types/customer";
import Alert from "./Alert";

interface Props {
  handleModal: (value: boolean) => void
}

export default function ExistingCustomerForm({handleModal}: Props) {
  const [petId, setPetId] = useState(0);
  const [appointmentData, setAppointmentData] = useState<NewCustomer>({name: "", email: "", petName: "", animalType: "", date: "", symptoms: ""});
  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const {customer, veterinarian} = useVeterinarian();
  
  useEffect(() => {
    if(customer.id !== 0) {
      setPetId(customer.pets[0].id);
      const {name, email} = customer;
      const { name: petName, animalType} = customer.pets[0];
      setAppointmentData({...appointmentData, name, email, petName, animalType});
    }
  }, [customer]);

  const handleSelect = ({target}: ChangeEvent<HTMLSelectElement>) => {
    const pet = customer.pets.find(pet => pet.id === Number(target.value));
    if(pet) {
      setPetId(pet.id);
      if(!showNewPetForm) {
        setAppointmentData({...appointmentData, petName: pet.name, animalType: pet.animalType});
      }
    }
  }

  const handleShowNewPetForm = () => {
    setShowNewPetForm(true);
    setAppointmentData({...appointmentData, petName: '', animalType: ''});
  }

  const handleHideNewPetForm = () => {
    setShowNewPetForm(false);
    const pet = customer.pets.find(pet => pet.id === petId);
    if(pet) {      
      setAppointmentData({...appointmentData, petName: pet.name, animalType: pet.animalType});      
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
      const appointment: CreateAppointment = {
        date,
        symptoms,
        isCompleted: false,
        prescription: '',
        customerId: customer.id,
        veterinarianId: vet.id,
        petId: pet?.id ?? petId
      }
      await createAppointment(appointment, vet.token);
      handleModal(true);
      resetForm();
    } catch (error) {
      
    }
  }

  return (
    <div className="w-full bg-white p-3 shadow-md">
      <Formik
        initialValues={{
          name: appointmentData.name ?? '',
          email: appointmentData.email ?? '',          
          petName:  appointmentData.petName ?? '',
          animalType:  appointmentData.animalType ?? '',
          date:  appointmentData.date ?? '',
          symptoms: appointmentData.symptoms ?? ''
        }}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={newAppointmentSchema}
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
                <Field onChange={handleSelect} as="select" defaultValue={customer.pets[0]?.id}  name="pets" id="pets" className='w-full p-2 border-2 border-gray-700 rounded-md'>
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
                    name="petName"
                    id="petName"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAppointmentData({...appointmentData, petName: e.target.value})}
                    disabled={!showNewPetForm}
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
                    name="animalType"
                    id="animalType"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAppointmentData({...appointmentData, animalType: e.target.value})}
                    disabled={!showNewPetForm}
                  />
                  {errors.animalType && touched.animalType && <Alert type="error">{errors.animalType}</Alert>}
                </label>
              </div>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAppointmentData({...appointmentData, date: e.target.value})}
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAppointmentData({...appointmentData, symptoms: e.target.value})}
                  />
                  {errors.symptoms && touched.symptoms && <Alert type="error">{errors.symptoms}</Alert>}
                </label>
              </div>
            </div>
            <input 
              type="submit"
              value="Registrar cita"
              className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white block"
            />
            </Form>
          )
        }
      </Formik>
    </div>
  )
}