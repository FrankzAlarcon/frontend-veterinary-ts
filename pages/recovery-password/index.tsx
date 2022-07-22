import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Alert from "../../components/Alert";
import CustomHead from "../../components/CustomHead";
import Wave from "../../components/Wave";
import { recoveryPassword } from "../../services";

interface Props {
  message: {
    type: "error" | "successful";
    text: string;
  };
}

function RecoveryPassword() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<Props["message"]>({
    type: "successful",
    text: "",
  });
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  const handleSendEmail = async () => {
    try {
      if (!input) {
        setMessage({ text: "Ingrese su email", type: "error" });
        return;
      }
      const rta = await recoveryPassword(input);
      setMessage({ text: rta, type: "successful" });
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message });
    }
  };
  return (
    <>
      <CustomHead title="Recuperar Contraseña" description="Recupera tu contraseña para que no pierdas acceso" />
      <div className="container mx-auto p-4 text-center absolute top-0 bottom-0 left-0 right-0 my-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-indigo-600 mt-10">
          Veterinary <span className="text-black">App</span>
        </h1>
        <p className="mt-2">
          Restaura tu contraseña para no{" "}
          <span className="text-indigo-600 font-bold">perder acceso</span>
        </p>
        <div className="mt-14 bg-white shadow-md w-full p-2 md:w-3/4 mx-auto lg:w-1/2 ">
          {message.text && <Alert type={message.type}>{message.text}</Alert>}
          <p className="text-black uppercase font-black text-lg md:text-xl lg:text-2xl">
            Recuperar contraseña
          </p>
          <p className="mt-2 text-sm uppercase font-black text-gray-700">
            Escribe tu email y pulsa el botón para un email con las
            instrucciones
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
            onClick={handleSendEmail}
            className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Enviar email
          </button>
          <div className="grid grid-cols-2 gap-5 lg:gap-52">            
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login">
                <span className="font-bold text-indigo-600 hover:underline cursor-pointer">
                  Ingresa Aquí
                </span>
              </Link>
            </p>
            <p>¿Aún no tienes una cuenta?{' '}
              <Link href='/register'>
                <span className="font-bold text-indigo-600 cursor-pointer hover:underline">Registrate aquí</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Wave />
    </>
  );
}

export default RecoveryPassword;
