import { ErrorResponse } from "./custom"
import { CustomerComplete, Pet } from "./customer"

export interface Appointment {
  id: number,
  date: string,
  symptoms: string,
  isCompleted: boolean,
  prescription: string,
  price: number | null,
  veterinarianId: number,
  customerId:number,
  petId: number
}

export type CreateAppointment = Omit<Appointment, 'id' | 'price'>

export interface CreateAppointmentResponse {
  error: ErrorResponse,
  body: Appointment
}

export interface CompleteAppointment extends Appointment{
  pet: Pet,
  customer: Omit<CustomerComplete, 'appointments'>
}

export interface CompleteAppointmentResponse {
  error: ErrorResponse,
  body: CompleteAppointment
}