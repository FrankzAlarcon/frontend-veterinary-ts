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

export interface CreateAppointmentResponse {
  error: ErrorResponse,
  body: Appointment
}