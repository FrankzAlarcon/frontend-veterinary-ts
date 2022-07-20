import { envVariables } from ".";
import { CreatePetResponse, Pet } from "../types/customer";

export const createPet = async (token: string, customerId: number, name: string, animalType: string)  => {
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