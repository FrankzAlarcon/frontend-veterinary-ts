import * as yup from 'yup';

const name = yup.string().min(3, 'Nombre demasiado corto').required('El nombre es requerido');
const email = yup.string().email('Ingrese un email válido').required('El email es requerido');
const password = yup.string().min(8, 'Se necesitan mínimo 8 caracteres').required('La contraseña es requerido');
const petName = yup.string().required('El nombre es requerido');
const animalType = yup.string().required('El tipo de animal es requerido');
const date = yup.date().required('La fecha es requerida');
const symptoms = yup.string().required('Los síntomas son requeridos');


export const loginSchema = yup.object().shape({
  email,
  password
});

export const registerSchema = yup.object().shape({
  name,
  email,
  password,
  repeatPassword: password
});

export const newCustomerSchema = yup.object().shape({
  name, email, petName, animalType, date, symptoms
});

export const verifyCustomerSchema = yup.object().shape({
  name, email
});

export const newAppointmentSchema = yup.object().shape({
  name,
  email,
  petName,
  animalType,
  date,
  symptoms
})
