import { Button, makeStyles, TextField } from '@material-ui/core'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HfField, Layout, TitledCard } from '~/components'
import { useHistory } from 'react-router'
import { signIn } from '~/service/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '~/utils/yupSchema'
import { useSnackbar } from 'notistack-v5'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15
  }
})

export interface LoginFormValues {
  username: string,
  password: string
}

export const Login: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema)
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(async (data) => {
    const result = await signIn(data)
    if (result.ok) {
      window.location.reload()
      return
    }
    enqueueSnackbar('Erro ao logar.', {
      variant: 'error',
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
    })
  }, [enqueueSnackbar])

  const handleNavigation = () => {
    history.push('/register')
  }

  return (
    <Layout>
      <TitledCard title='Acessar conta'>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
          <Button variant='text' onClick={handleNavigation}>Registrar conta</Button>
          <Button variant='contained' type='submit'>Logar</Button>
        </form>
      </TitledCard>
    </Layout>
  )
}
