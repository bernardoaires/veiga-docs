import axios from 'axios'
import { LoginFormValues, RegisterFormValues } from '~/views'

const AUTH_URL = process.env.REACT_APP_AUTH_ENDPOINT

export const signIn = async (data: LoginFormValues) => {
  const response = await axios.post(`${AUTH_URL}/login`, data)
  window.localStorage.setItem('ID_TOKEN', response.data.token)
  return response
}

export const signUp = async (data: RegisterFormValues) => {
  const response = await axios.post(`${AUTH_URL}/register`, data)
  window.localStorage.setItem('ID_TOKEN', response.data.token)
  return response
}

export const signOut = async () => {
  window.localStorage.removeItem('ID_TOKEN')
}

export const getMe = async () => {
  const token = window.localStorage.getItem('ID_TOKEN')
  try {
    const response = await axios.get(`${AUTH_URL}/me`, { headers: { authorization: token } })
    return response
  } catch (err) {
    console.log(err)
  }
}