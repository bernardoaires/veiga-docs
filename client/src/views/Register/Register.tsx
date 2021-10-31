import { Button, makeStyles, TextField } from '@material-ui/core'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { HfField, Layout, TitledCard } from '~/components'
import { signUp } from '~/service/auth'

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

  const { control, handleSubmit } = useForm<RegisterFormValues>()

  const onSubmit: SubmitHandler<RegisterFormValues> = useCallback(async (data) => {
    await signUp(data)
    window.location.reload()
  }, [])

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
          />
          <HfField 
            component={TextField}
            control={control}
            name='email'
            label='Email'
          />
          <HfField 
            component={TextField}
            control={control}
            name='username'
            label='Usuário'
          />
          <HfField 
            component={TextField}
            control={control}
            name='password'
            label='Senha'
            type='password'
          />
          <Button variant='text' onClick={handleNavigation}>Logar</Button>
          <Button variant='contained' type='submit'>Registrar</Button>
        </form>
      </TitledCard>
    </Layout>
  )
}