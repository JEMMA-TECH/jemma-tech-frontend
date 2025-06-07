
import axios, {AxiosError} from 'axios';
import type { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from './auth.types';

export async function Register(data:IRegisterRequest): Promise<IRegisterResponse> {
  const response = await axios.post<IRegisterResponse>('/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    const error = await response.request.json();
    throw new AxiosError(error, response.status.toString());
  }

  return response.data;
    
}


export async function Login(data:ILoginRequest): Promise<ILoginResponse> {
  const response = await axios.post<ILoginResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    const error = await response.request.json();
    throw new AxiosError(error, response.status.toString());
  }

  return response.data;
}