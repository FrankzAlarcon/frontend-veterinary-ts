import { envVariables } from ".";
import { CreateCustomerResponse, CustomerByEmail, CustomerResponse } from "../types/customer";

export const getCustomer = async (token: string, id: number) => {
  const rawData = await fetch(`${envVariables.apiUrl}/customers/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body,error}: CustomerResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}

export const createCustomer = async (token: string, name:string, email: string) => {
  const rawData = await fetch(`${envVariables.apiUrl}/customers`, {
    method: 'POST',
    body: JSON.stringify({name, email}),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body, error}:CreateCustomerResponse = await rawData.json();
  if(error) {
    throw new Error(error.message)
  }
  return body
}

export const getCustomerByEmail = async (token:string, email: string) => {
  const rawData = await fetch(`${envVariables.apiUrl}/customers/email/${email}`, {
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body, error}: CustomerByEmail = await rawData.json();
  if (error) {
    throw new Error(error.message)
  }
  return body;
}