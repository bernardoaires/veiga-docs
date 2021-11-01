import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  username: yup.string().required('Campo obrigatório.'),
  password: yup.string().required('Campo obrigatório.')
})

export const registerSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório.'),
  email: yup.string().email().required('Campo obrigatório.'),
  username: yup.string().required('Campo obrigatório.'),
  password: yup.string().required('Campo obrigatório.')
})