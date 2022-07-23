import { Formik, Form, Field, FormikHelpers  } from "formik";
import Link from "next/link";
import Alert from "./Alert";
import { loginSchema } from "../schemas";
import { useState } from "react";
import Spinner from "./Spinner";
import { LoginValues } from "../types/custom";
import { authVeterinarian } from "../services";
import useVeterinarian from "../hooks/useVeterinarian";
import { useRouter } from "next/router";

function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {setVeterinarian} = useVeterinarian();
  const router = useRouter();

  const handleSubmit = async (values: LoginValues, {resetForm}:FormikHelpers<LoginValues>) => {
    try {
      setLoading(true);
      const veterinarian = await authVeterinarian(values);
      document.cookie = `token=${veterinarian.token};path=/`;
      document.cookie = `veterinarianId=${veterinarian.id};path=/`;
      setVeterinarian(veterinarian);
      router.push('/')
      setError('');
      resetForm();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-2 lg:py-5 lg:px-3 bg-white shadow-md w-full md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={{email: '', password: ''}}   
        validationSchema={loginSchema}
        onSubmit={handleSubmit}        
      >
        {({errors, values, touched}) => (
          <>
            {error && <Alert type="error">{error}</Alert>}
            <Form className="w-full" >
              <label htmlFor="email">
                <Field
                  className='w-full rounded-md border border-gray-900 p-3 mt-4'
                  type='email'
                  name='email'
                  id='email'
                  value={values.email}
                  placeholder='Email'
                />
                {touched.email && errors.email && <Alert type="error">{errors.email}</Alert>}
              </label>
              <label htmlFor="password">
                <Field 
                  className='w-full rounded-md border border-gray-900 p-3 mt-4'
                  placeholder='Contraseña'
                  type='password'
                  id='password'
                  value={values.password}
                  name='password'                
                />
                {touched.password && errors.password && <Alert type="error">{errors.password}</Alert>}
              </label>
              {
                !loading ? (<input
                  className="bg-indigo-600 w-full p-2 my-3 font-bold uppercase text-white cursor-pointer hover:bg-indigo-700 transition-colors"
                  type="submit"              
                  value="Iniciar Sesión"
                />) : (
                  <div className="bg-indigo-600 w-full pt-4 pb-2 my-3 font-bold uppercase text-white cursor-pointer hover:bg-indigo-700 transition-colors">
                    <Spinner />
                  </div>
                )
              }
              
            </Form>
          </>
        )}
      </Formik>
      <div className="grid grid-cols-2 gap-5 lg:gap-52">
        <p>¿Aún no tienes una cuenta?{' '}
          <Link href='/register'>
            <span className="font-bold text-indigo-600 cursor-pointer hover:underline">Registrate aquí</span>
          </Link>
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

export default LoginForm;