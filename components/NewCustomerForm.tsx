import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";
import useVeterinarian from "../hooks/useVeterinarian";
import { newCustomerSchema } from "../schemas";
import { createAppointmet } from "../services/appointment";
import { getCustomer } from "../services/customer";
import { User } from "../types/custom";
import { NewCustomer } from "../types/customer";
import Alert from "./Alert";
import Spinner from "./Spinner";

export default function NewCustomerForm() {
  const [loading, setLoading] = useState(false);
  const { veterinarian, handleCustomer, customer } = useVeterinarian();


  const handleSubmit = async (values: NewCustomer, {resetForm}: FormikHelpers<NewCustomer>) => {
    try {
      setLoading(true)
      const vet = veterinarian as User;
      const appointment = await createAppointmet(vet.id, vet.token, values);
      const customerInfo = await getCustomer(vet.token, appointment.customerId);
      handleCustomer(customerInfo);
    } catch (error) {
      
    } finally {
      setLoading(false);
      resetForm();
    }
  }

  return (
    <div className="bg-white rounded-md shadow-md p-2 lg:p-4 lg:pb-6">
      <Formik
        initialValues={{
          name: customer.name ?? "",
          email: customer.email ?? "",
          petName: "",
          animalType: "",
          date: "",
          symptoms: "",
        }}
        onSubmit={handleSubmit }
        validationSchema={newCustomerSchema}
      >
        {({ errors, touched, values }) => (
          <Form className="space-y-4">            
            <div className="mb-2">              
              <h2 className="text-center font-black uppercase text-xl lg:mb-2">
                Datos del cliente
              </h2>
              <div className="lg:grid lg:grid-cols-2 gap-5 space-y-2 lg:space-y-0">
                <label htmlFor="name" className="block">
                  <p className="text-gray-900 font-bold uppercase mb-1">Nombre</p>
                  <Field
                    type="text"
                    className="w-full p-2 border-2 border-gray-700 rounded-md "
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
                    type="email"
                    className="w-full p-2 border-2 border-gray-700 rounded-md disabled:bg-zinc-200"
                    placeholder="Email del cliente"
                    value={values.email}
                    disabled
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
            {
              loading ? (
                <div className="submit-button bg-indigo-400  text-white block ">
                  <Spinner />
                </div>
              ) : (
                <input 
                  type="submit"
                  value="Agregar cliente"
                  className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white block"
                />
              )
            }
            
          </Form>
        )}
      </Formik>
    </div>
  );
}
