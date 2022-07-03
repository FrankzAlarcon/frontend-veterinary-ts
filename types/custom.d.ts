export interface LoginValues {
  email: string,
  password: string
}

export interface RegisterValues extends LoginValues{
  name: string,
  repeatPassword: string
}

export interface User {
  id: number,
  name: string,
  email: string,
  token: string
}

interface ErrorResponse {
  error: string, 
  statusCode: boolean,
  message: string
}

export interface AuthResponse {
  error: ErrorResponse | '',
  body: User
}

export interface RegisterResponse {
  error: ErrorResponse | '',
  body: string
}

export interface ConfirmAccountResponse extends RegisterResponse {
  body: boolean
}

export type ResendEmailResponse = RegisterResponse;

export type RecoveryPasswordResponse = RegisterResponse;

export type ConfirmTokenResponse = ConfirmAccountResponse;

export type ChangePasswordResponse = RegisterResponse;

export interface Message {
  type: 'error' | 'successful',
  text: string  
}