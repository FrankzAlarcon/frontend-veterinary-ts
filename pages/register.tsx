import CustomHead from "../components/CustomHead"
import RegisterForm from "../components/RegisterForm"
import Wave from "../components/Wave"

function Register() {
  return (
    <>
      <CustomHead title="Registrarse" description="Crea tu cuenta para que puedas administrar tu veterinaria"/>
      <div className="container p-4 mx-auto text-center absolute top-0 bottom-0 left-0 right-0 my-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mt-10 font-black text-indigo-600">Veterinary <span className="text-black">App</span></h1>
        <p className="my-4 lg:text-lg">Ingresa los datos para crear tu <span className="text-indigo-600 font-bold">usuario</span></p>
        <RegisterForm />
      </div>
      <Wave />
    </>
  )
}

export default Register