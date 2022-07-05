import { useState } from 'react';
import {Formik, Form, Field} from 'formik'
import { getCustomerByEmail } from '../services/customer';
import { User } from '../types/custom';
import { CustomerEntry } from '../types/customer';
import useVeterinarian from '../hooks/useVeterinarian';
import Alert from './Alert';
import Spinner from './Spinner';

interface Props {
  //requestState: 'founded' | 'not-founded' | '',
  setRequestState: (value: 'found' | 'not-found' | '') => void
}

export default function VerifyCustomerForm({setRequestState}: Props) {
  const [loading, setLoading] = useState(false);
  const {veterinarian, handleCustomer} = useVeterinarian();

  const handleVerified = async (values: CustomerEntry) => {
    try {
      setLoading(true)
      const vet = veterinarian as User;
      const customer = await getCustomerByEmail(vet.token, values.email);
      console.log(customer)
      if (customer) {
        handleCustomer(customer);
        setRequestState('found');
        return;
      }
      handleCustomer({id: 0, name: values.name, email: values.email, appointments: [], pets: []})
      setRequestState('not-found')
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='bg-white rounded-md shadow-md p-2 lg:p-4 lg:pb-6'>
      <Formik
        initialValues={{name: '', email: ''}}
        onSubmit={handleVerified}
      >
        {
          ({values, touched, errors}) => (
            <Form>
              <div className="mb-2">              
                <h2 className="text-center font-black uppercase text-xl lg:mb-2">
                  Datos del cliente
                </h2>
                <div className="lg:grid lg:grid-cols-2 gap-5 space-y-2 lg:space-y-0">
                  <label htmlFor="name" className="block">
                    <p className="text-gray-900 font-bold uppercase mb-1">Nombre</p>
                    <Field
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
              {
              loading ? (
                <div className="submit-button bg-indigo-400  text-white block ">
                  <Spinner />
                </div>
              ) : (
                <input 
                  type="submit"
                  value="Verificar cliente"
                  className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white block"
                />
              )
            }
            </Form>
          )
        }
      </Formik>
    </div>
  )
}
