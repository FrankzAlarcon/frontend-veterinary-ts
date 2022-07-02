import { Formik, Form, Field, FormikHelpers } from "formik"
import Link from "next/link"
import { useState } from "react";
import { registerSchema } from "../schemas";
import { registerVeterinarian } from "../services";
import { RegisterValues } from "../types/custom"
import Alert from "./Alert";
import Spinner from "./Spinner";

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (values: RegisterValues, {resetForm}: FormikHelpers<RegisterValues> ) => {
    try {
      setLoading(true);
      if(values.password !== values.repeatPassword) {
        throw new Error('Las contraseñas no son iguales');
      }
      const {repeatPassword, ...data} = values;
      const rta = await registerVeterinarian(data);
      setMessage(rta);
      resetForm();
      setError('');
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-white p-3 shadow-md md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={{name: '', email: '', password: '', repeatPassword: ''}}
        onSubmit={handleSubmit}
        validationSchema={registerSchema}
      >
        {
          ({errors, values, touched}) => (
            <>
              {error && <Alert type="error">{error}</Alert>}
              {message && <Alert type="successful">{message}</Alert>}
              <Form className="text-left">
                <label className="block mt-2" htmlFor="name">
                  <p className="font-black uppercase text-gray-600">Nombre de usuario</p>
                  <Field
                    name="name"
                    id="name"
                    value={values.name}
                    className="border border-gray-900 rounded-md p-2 mt-1 w-full"
                    type="text"
                    placeholder="Tu nombre"
                  />
                  {errors.name && touched.name && <Alert type="error">{errors.name}</Alert>}
                </label>
                <label className="block mt-2" htmlFor="email">
                  <p className="font-black uppercase text-gray-600">Correo electrónico</p>
                  <Field
                    name="email"
                    id="email"
                    value={values.email}
                    className="border border-gray-900 rounded-md p-2 mt-1 w-full"
                    type="email"
                    placeholder="Tu email"
                  />
                  {errors.email && touched.email && <Alert type="error">{errors.email}</Alert>}
                </label>
                <label className="block mt-2" htmlFor="password">
                  <p className="font-black uppercase text-gray-600">Contraseña</p>
                  <Field
                    name="password"
                    id="password"
                    value={values.password}
                    className="border border-gray-900 rounded-md p-2 mt-1 w-full"
                    type="password"
                    placeholder="Tu contraseña"
                  />
                  {errors.password && touched.password && <Alert type="error">{errors.password}</Alert>}
                </label>
                <label className="block mt-2" htmlFor="repeatPassword">
                  <p className="font-black uppercase text-gray-600">Repetir contraseña</p>
                  <Field
                    name="repeatPassword"
                    id="repeatPassword"
                    value={values.repeatPassword}
                    className="border border-gray-900 rounded-md p-2 mt-1 w-full"
                    type="password"
                    placeholder="Tu nombre"
                  />
                  {errors.repeatPassword && touched.repeatPassword && <Alert type="error">{errors.repeatPassword}</Alert>}
                </label>
                {
                  loading ? (
                    <div className="bg-indigo-600 w-full pt-4 pb-2 my-3 font-bold uppercase text-white">
                      <Spinner />
                    </div>) : (<input
                      type="submit"
                      className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white block"
                      value="Registrarse"
                    />)
                }
              </Form>
            </>
          )
        }
      </Formik>
      <div className="grid grid-cols-2 gap-5 lg:gap-52">
        <p>
          ¿Ya tienes una cuenta? <Link href='/login'>
          <span className="font-bold text-indigo-600 hover:underline cursor-pointer">Ingresa Aquí</span></Link>
        </p>
        <p>¿Has olvidado tu contraseña?{' '}
          <Link href='/recovery-password'>
            <span className="font-bold text-indigo-600 cursor-pointer hover:underline">Restablecer contraseña</span>
          </Link>
        </p>
      </div> 

    </div>
  )
}

export default RegisterForm