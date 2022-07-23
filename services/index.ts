import { AuthResponse, ChangePasswordResponse, ConfirmAccountResponse, ConfirmTokenResponse, LoginValues, RecoveryPasswordResponse, RegisterResponse, RegisterValues, ResendEmailResponse, User } from "../types/custom"

export const envVariables = {
  apiUrl: process.env.NEXT_PUBLIC_SERVER_URL
}

export const authVeterinarian = async (credentials: LoginValues):Promise<User> => {
  const rawData = await fetch(`${envVariables.apiUrl}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const {error, body}: AuthResponse =  await rawData.json();
  if (error) {
    throw new Error(error.message);
  }  
  return body;
}

export const registerVeterinarian = async (data: Omit<RegisterValues, 'repeatPassword'>): Promise<string> => {
  const rawData = await fetch(`${envVariables.apiUrl}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const {error, body}: RegisterResponse = await rawData.json();  
  if(error) {    
    throw new Error(error.message);
  }
  return body;
}

export const confirmAccount = async (id: string) => {
  const rawData =  await fetch(`${envVariables.apiUrl}/auth/confirm-account/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': envVariables.apiUrl ?? ''
    }
  });
  const {error, body}: ConfirmAccountResponse = await rawData.json();
  if(error) {    
    throw new Error(error.message);
  }
  return body;
}

export const resendEmail = async (email: string, type: 'verify' | 'recovery-password') => {
  const rawData = await fetch(`${envVariables.apiUrl}/auth/resend-email/${type}`, {
    method: 'POST',
    body: JSON.stringify({email}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const {body, error}: ResendEmailResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}

export const recoveryPassword = async (email: string) => {
  const rawData = await fetch(`${envVariables.apiUrl}/auth/recovery-password`, {
    method: 'POST',
    body: JSON.stringify({email}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const {body, error}: RecoveryPasswordResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}

export const confirmToken = async (token: string) => {
  const rawData = await fetch(`${envVariables.apiUrl}/auth/recovery-password/${token}`);
  const {body, error}: ConfirmTokenResponse = await rawData.json();
  if(error) {
    throw new Error(error.message)
  }
  return body;
}

export const changePassword = async (token:string, password: string) => {
  const rawData = await fetch(`${envVariables.apiUrl}/auth/recovery-password/${token}`, {
    method: 'POST',
    body: JSON.stringify({password}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const {body, error}: ChangePasswordResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}