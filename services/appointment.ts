import { envVariables } from ".";
import { CreateAppointmentResponse, CompleteAppointment, CompleteAppointmentResponse, CreateAppointment } from "../types/appoinment";
import { CreatePetResponse, NewCustomer } from "../types/customer";
import { createCustomer } from "./customer";



const createPet = async (token: string, customerId: number, name: string, animalType: string)  => {
  const rawData = await fetch(`${envVariables.apiUrl}/customers/${customerId}/pets`, {
    method: 'POST',
    body: JSON.stringify({name, animalType}),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body, error}:CreatePetResponse = await rawData.json();
  if (error) {
    throw new Error(error.message);
  }
  return body;
}

export const getCompleteAppointment = async (appointmentId: number, token: string): Promise<CompleteAppointment> => {
  const rawData = await fetch(`${envVariables.apiUrl}/appointments/${appointmentId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body, error}: CompleteAppointmentResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}

export const createAppointment = async (values: CreateAppointment, token: string) => {
  await fetch(`${envVariables.apiUrl}/appointments`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
}

export const createEntireAppointment = async (veterinarianId: number, token:string, values: NewCustomer) => {
  const {name, email, petName, animalType, date, symptoms} = values;
  //Crear el cliente
  const customer = await createCustomer(token, name, email);
  //Crear la mascota
  const pet = await createPet(token, customer.id, petName, animalType);
  //Crear la cita
  const appointmentData = {
    date: new Date(date).toISOString(),
    symptoms,
    prescription: '',
    isCompleted: false,
    veterinarianId,
    customerId: customer.id,
    petId: pet.id
  }
  const rawApponintment = await fetch(`${envVariables.apiUrl}/appointments`, {
    method: 'POST',
    body: JSON.stringify(appointmentData),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body, error}: CreateAppointmentResponse = await rawApponintment.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}