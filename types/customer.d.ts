import { Appointment } from "./appoinment"
import { ErrorResponse } from "./custom"

export interface NewCustomer {
  name: string,
  email: string,
  petName: string,
  animalType: string,
  date: string,
  symptoms:string
}

interface Customer {
  id: number,
  name: string,
  email: string
}

export interface CustomerComplete extends Customer {
  pets: Pet[],
  appointments: Appointment[]
}

export interface CreateCustomerResponse {
  error: ErrorResponse,
  body: Customer
}

export interface CustomerByEmail {
  error: ErrorResponse,
  body: CustomerWithPet | null
}

export interface CustomerResponse {
  error: ErrorResponse,
  body: CustomerComplete
}

export type CustomerEntry = Omit<Customer, 'id'>

type Pet = Omit<Customer, 'email'> & {
  animalType: string
}

export interface CreatePetResponse {
  error: ErrorResponse,
  body: Pet
}

