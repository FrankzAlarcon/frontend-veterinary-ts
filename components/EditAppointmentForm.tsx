import { Formik, Form, Field } from "formik";
import { formatDate } from "../helpers";
import { newAppointmentSchema } from "../schemas";
import { CompleteAppointment } from "../types/appoinment";
import Alert from "./Alert";

interface Props {
  props: {
    appointment: CompleteAppointment
  }
}

export default function EditAppointmentForm({appointment}: Props['props']) {
  const {customer, pet} = appointment;
  return (
    <div className="w-full bg-white p-3 shadow-md">
      <Formik
        initialValues={{
          name: customer.name ?? '',
          email: customer.email ?? '',          
          petName: pet.name ?? '',
          animalType: pet.animalType ?? '',
          date: formatDate(appointment.date) ?? '',
          symptoms: appointment.symptoms ?? ''
        }}
        onSubmit={() => {}}
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
                      className="w-full p-2 border-2 border-gray-700 rounded-md"
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
                      className="w-full p-2 border-2 border-gray-700 rounded-md"
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
                <Field component='select' name="pets" id="pets" className='w-full p-2 border-2 border-gray-700 rounded-md'>
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
                    className="w-full p-2 border-2 border-gray-700 rounded-md"
                    placeholder="Nombre de la mascota"
                    value={values.petName}
                    name="petName"
                    id="petName"
                  />
                  {errors.petName && touched.petName && <Alert type="error">{errors.petName}</Alert>}
                </label>
                <label htmlFor="animalType" className="block">
                  <p className="text-gray-900 font-bold uppercase mb-1">Tipo de animal</p>
                  <Field
                    type="text"
                    className="w-full p-2 border-2 border-gray-700 rounded-md"
                    placeholder="Tipo de animal"
                    value={values.animalType}
                    name="animalType"
                    id="animalType"
                  />
                  {errors.animalType && touched.animalType && <Alert type="error">{errors.animalType}</Alert>}
                </label>
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
              value="Agregar cliente"
              className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white block"
            />
            </Form>
          )
        }
      </Formik>
    </div>
  )
}