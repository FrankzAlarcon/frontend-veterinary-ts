import { envVariables } from ".";
import { CreateAppointmentResponse, CompleteAppointment, CompleteAppointmentResponse, CreateAppointment, ChangesAppointment, DeleteAppointmentsResponse } from "../types/appoinment";
import { NewCustomer } from "../types/customer";
import { createCustomer } from "./customer";
import { createPet } from "./pet";

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
  const appointmentData: CreateAppointment  = {
    ...values,
    date: new Date(values.date).toISOString()
  }
  await fetch(`${envVariables.apiUrl}/appointments`, {
    method: 'POST',
    body: JSON.stringify(appointmentData),
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

export const updateAppointment = async (appointmentId: number, changes: ChangesAppointment, token: string) => {
  const rawData = await fetch(`${envVariables.apiUrl}/appointments/${appointmentId}`, {
    method: 'PATCH',
    body: JSON.stringify(changes),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body, error}: CreateAppointmentResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}

export const deleteAppointmentsOfVeterinarian = async (veterinarianId: number, customerId: number, token: string) => {
  const rawData = await fetch(`${envVariables.apiUrl}/veterinarians/${veterinarianId}/appointments/${customerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {error, body}: DeleteAppointmentsResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}