import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Alert from "../../components/Alert";
import Wave from "../../components/Wave";
import { confirmAccount, resendEmail } from "../../services";

function ConfirmAccount({
  isConfirmed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResendEmail = async () => {
    try {
      if(!input) {
        setError('Ingrese su email');
        return;
      }
      const rta = await resendEmail(input, "verify");
      setMessage(rta);
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };
  return (
    <>
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-indigo-600 mt-10">
          Veterinary <span className="text-black">App</span>
        </h1>
        <p className="mt-2">
          Confirma tu cuenta para empezar a administrar tu{" "}
          <span className="text-indigo-600 font-bold">Veterinaria</span>
        </p>
        <div className="mt-14 bg-white shadow-md w-full p-2 md:w-3/4 mx-auto lg:w-1/2">
          {!isConfirmed && (
            <>
              {error && <Alert type="error">{error}</Alert>}
              {message && <Alert type="successful">{message}</Alert>}
              <p className="text-red-600 uppercase font-black text-lg">
                El link ha caducado
              </p>
              <p className="mt-2 text-sm uppercase font-black text-gray-700">
                Escribe tu email y pulsa el botón para reenviar email de
                confirmación
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
                  value={input}
                  onChange={handleInput}
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
          {isConfirmed && (
            <>
              <p className="text-lime-500 uppercase font-black text-lg">Tu cuenta ha sido verificada</p>
              <p className="uppercase font-bold">Ahora puedes iniciar sesión!!</p>
              <Link href="/login"><span className="submit-button bg-indigo-600 block text-white hover:bg-indigo-700">Iniciar sesión</span></Link>
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
  if (context.params && context.params.id) {
    try {
      const { id } = context.params;
      const rta = await confirmAccount(id as string);
      return {
        props: {
          isConfirmed: rta,
        },
      };
    } catch (error) {
      return {
        props: {
          isConfirmed: false,
        },
      };
    }
  }
};

export default ConfirmAccount;
