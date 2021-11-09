import axios from 'axios'
import { LoginFormValues, RegisterFormValues } from '~/views'

const AUTH_URL = process.env.REACT_APP_AUTH_ENDPOINT

interface ResponseReturn {
  ok: boolean,
  data?: any,
  error?: Error
}

export const signIn = async (data: LoginFormValues): Promise<ResponseReturn> => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, data)
    window.localStorage.setItem('ID_TOKEN', response.data.token)
    
    return {
      ok: true,
      data: response.data
    }
  } catch (err) {
    return {
      ok: false,
      error: err as Error
    }
  }
}

export const signUp = async (data: RegisterFormValues): Promise<ResponseReturn> => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, data)
    window.localStorage.setItem('ID_TOKEN', response.data.token)
    return {
      ok: true,
      data: response.data
    }
  } catch (err) {
    return {
      ok: false,
      error: err as Error
    }
  }
}

export const signOut = async () => {
  window.localStorage.removeItem('ID_TOKEN')
  window.location.reload()
}

export const getMe = async (): Promise<ResponseReturn> => {
  const token = window.localStorage.getItem('ID_TOKEN')
  try {
    const response = await axios.get(`${AUTH_URL}/me`, { headers: { authorization: token } })
    return {
      ok: true,
      data: response.data
    }
  } catch (err) {
    return {
      ok: false,
      error: err as Error
    }
  }
}