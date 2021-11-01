import { yupResolver } from '@hookform/resolvers/yup'
import { Button, makeStyles, TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack-v5'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { HfField, Layout, TitledCard } from '~/components'
import { signUp } from '~/service/auth'
import { registerSchema } from '~/utils/yupSchema'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15
  }
})

export interface RegisterFormValues {
  username: string,
  password: string,
  name: string,
  email: string
}

export const Register: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const { control, handleSubmit, formState } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema)
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<RegisterFormValues> = useCallback(async (data) => {
    const result = await signUp(data)
    if (result.ok) {
      window.location.reload()
      return
    }
    enqueueSnackbar('Erro ao cadastrar a conta.', {
      variant: 'error',
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
    })
  }, [enqueueSnackbar])

  const handleNavigation = () => {
    history.push('/login')
  }

  return (
    <Layout>
      <TitledCard title='Registrar conta'>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <HfField 
            component={TextField}
            control={control}
            name='name'
            label='Nome'
            errorMessage={errors.name?.message}
          />
          <HfField 
            component={TextField}
            control={control}
            name='email'
            label='Email'
            errorMessage={errors.email?.message}
          />
          <HfField 
            component={TextField}
            control={control}
            name='username'
            label='Usuário'
            errorMessage={errors.username?.message}
          />
          <HfField 
            component={TextField}
            control={control}
            name='password'
            label='Senha'
            type='password'
            errorMessage={errors.password?.message}
          />
          <Button variant='text' onClick={handleNavigation}>Logar</Button>
          <Button variant='contained' type='submit'>Registrar</Button>
        </form>
      </TitledCard>
    </Layout>
  )
}