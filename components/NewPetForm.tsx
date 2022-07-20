import { Formik, Form, Field, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import useVeterinarian from "../hooks/useVeterinarian";
import { newPetSchema } from "../schemas";
import { createPet } from "../services/pet";
import { User } from "../types/custom";
import { Pet } from "../types/customer";
import Alert from "./Alert";
import Spinner from "./Spinner";

interface Props {
  onSubmit: (values: Omit<Pet, 'id'>, formikHelpers: FormikHelpers<Omit<Pet, 'id'>>) => void;
  props: {
    onCancel: () => void;
    addPet: (pet: Pet) => void;
  };
}

export default function NewPetForm({onCancel, addPet}: Props['props']) {
  const {veterinarian} = useVeterinarian();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit: Props['onSubmit'] = async (values, {resetForm}) => {
    try {
      setLoading(true);
      const customerId = Number(router.query.customerId);
      const pet = await createPet((veterinarian as User).token, customerId, values.name, values.animalType);
      addPet(pet);
    } catch (error) {
      
    } finally {
      resetForm();
      setLoading(false);    
    }
  }
  return (
    <div className="w-full p-2">
      <Formik
        initialValues={{ name: "", animalType: "" }}
        onSubmit={handleSubmit}
        validationSchema={newPetSchema}
      >
        {({ values, touched, errors }) => (
          <Form className="space-y-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">
                <p className="text-center uppercase font-bold text-sm text-gray-700">Nombre de la Mascota</p>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  className="w-full p-2 border-2 border-gray-300 rounded-md"
                  placeholder="Nombre de la Mascota"
                  autoComplete="off"
                />
                {errors.name && touched.name && (<Alert type="error">{errors.name}</Alert>)}
              </label>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="animalType">
                <p className="text-center uppercase font-bold text-sm text-gray-700">Tipo de Animal</p>
                <Field
                  id="animalType"
                  name="animalType"
                  type="text"
                  value={values.animalType}
                  className="w-full p-2 border-2 border-gray-300 rounded-md"
                  placeholder="Tipo de Animal"
                />
                {errors.animalType && touched.animalType && (<Alert type="error">{errors.animalType}</Alert>)}
              </label>
            </div>
            <div className="flex justify-evenly gap-5">
              {
                loading ? (
                  <button className="submit-button bg-lime-600  text-white shadow-sm w-full" disabled>
                    <Spinner />
                  </button>
                ) : (
                  <input
                  className="submit-button bg-lime-500 hover:bg-lime-400 text-white shadow-sm w-full"
                  type="submit" value="Guardar" />
                )
              }
              <button 
                className="submit-button bg-red-600 hover:bg-red-700 text-white shadow-sm w-full"
                onClick={onCancel}
                type="button">Cancelar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
