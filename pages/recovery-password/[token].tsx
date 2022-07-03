import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Alert from "../../components/Alert";
import Wave from "../../components/Wave";
import { changePassword, confirmToken, resendEmail } from "../../services";
import { Message } from "../../types/custom";

interface Props {
  props: {
    isTokenValid: boolean;
    token?: string
  },
  message: Message
}

function ChangePassword({ isTokenValid, token }: Props['props']) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState<Props['message']>({type: 'successful', text: ''});
  const [showReturnLogin, setShowReturnLogin] = useState(false);

  const handleResendEmail = async () => {
    try {
      if(!email) {
        setMessage({type: 'error', text: 'Ingrese su email'});
      }
      const rta = await resendEmail(email, 'recovery-password');
      setMessage({type: 'successful', text: rta});
    } catch (error) {
      setMessage({type: 'error', text: (error as Error).message});
    }
  }

  const handleChangePassword = async () => {
    try {
      if (!password || !repeatPassword) {
        setMessage({type: 'error', text: 'Los dos campos son obligatorios'});
        return;
      }
      if(password !== repeatPassword) {
        setMessage({type: 'error', text: 'Las contraseña no son iguales'});
        return;
      }      
      if(token) {
        const rta = await changePassword(token, password);
        setMessage({type: 'successful', text: rta});
        setShowReturnLogin(true);
      } else {
        isTokenValid = false;
      }
    } catch (error) {
      setMessage({type: 'error', text: (error as Error).message});
    }
  }

  return (
    <>
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-indigo-600 mt-10">
          Veterinary <span className="text-black">App</span>
        </h1>
        <p className="mt-2">
          Cambia tu contraseña para que no pierdas{" "}
          <span className="text-indigo-600 font-bold">acceso</span>
        </p>
        <div className="mt-14 bg-white shadow-md w-full p-2 md:w-3/4 mx-auto lg:w-1/2">
          {message.type === 'error' && <Alert type={message.type}>{message.text}</Alert>}
          {message.type === 'successful' && <p className="text-green-500 font-black text-lg md:text-xl lg:text-2xl">{message.text}</p>}
          {!isTokenValid && (
            <>
              <p className="text-red-600 uppercase font-black text-lg">
                El link ha caducado
              </p>
              <p className="mt-2 text-sm uppercase font-black text-gray-700">
                Escribe tu email y pulsa el botón para reenviar email con las instrucciones                
              </p>
              <label htmlFor="email" className="block mt-2">
                <p className="text-gray-700 font-black uppercase text-left">
                  Email
                </p>
                <input
                  placeholder="Ingresa tu correo electrónico"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-900 rounded-md"
                />
              </label>
              <button
                onClick={handleResendEmail}
                className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Reenviar email
              </button>
            </>
          )}
          {isTokenValid && !showReturnLogin && (
            <>
              <p className="uppercase font-black text-lg md:text-xl">
                Llena los campos para cambiar tu contraseña
              </p>
              <label htmlFor="password" className="block mt-2">
                <p className="text-gray-700 font-black uppercase text-left">
                  Nueva Contraseña
                </p>
                <input
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-900 rounded-md"
                />
              </label>
              <label htmlFor="repeatPassword" className="block mt-2">
                <p className="text-gray-700 font-black uppercase text-left">
                  Repetir Nueva Contraseña
                </p>
                <input
                  placeholder="Repite tu contraseña"
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full p-2 border border-gray-900 rounded-md"
                />
              </label>
              <button
                onClick={handleChangePassword}
                className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white"
              >Cambiar contraseña</button>
            </>
          )}
          {showReturnLogin && (
            <>
              <p className="font-bold">Ahora puedes iniciar sesión</p>
              <Link href='/login'><span className="submit-button block bg-indigo-600 hover:bg-indigo-700 text-white">Iniciar Sesión</span></Link>
            </>
          )}
        </div>
      </div>
      <Wave />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.params && context.params.token) {
    try {
      const { token } = context.params;
      const rta = await confirmToken(token as string);
      return {
        props: {
          isTokenValid: rta,
          token
        },
      };
    } catch (error) {
      return {
        props: {
          isTokenValid: false,        
        },
      };
    }
  }
};

export default ChangePassword;
