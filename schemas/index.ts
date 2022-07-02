import * as yup from 'yup';

const name = yup.string().min(3, 'Nombre demasiado corto').required('El nombre es requerido');
const email = yup.string().email('Ingrese un email válido').required('El email es requerido');
const password = yup.string().min(8, 'Se necesitan mínimo 8 caracteres').required('La contraseña es requerido');


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