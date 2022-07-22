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

export type ChangesAppointment = Pick<Appointment, 'isCompleted'| 'prescription'| 'price'>

export type UpdateAppointment = Pick<Appointment, 'date' | 'symptoms' | 'petId'>

export interface CreateAppointmentResponse {
  error: ErrorResponse,
  body: Appointment
}

export interface UpdateAppointmentResponse {
  error: ErrorResponse,
  body: Appointment
}

export interface CompleteAppointment extends Appointment{
  pet: Pet,
  customer: Omit<CustomerComplete, 'appointments'>
}

export type AppointmentWithPet = Appointment & {
  pet: Pet
}

export interface CompleteAppointmentResponse {
  error: ErrorResponse,
  body: CompleteAppointment
}

export interface DeleteAppointmentsResponse {
  error: ErrorResponse,
  body: string
}
