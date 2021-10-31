import { Button, makeStyles, TextField } from '@material-ui/core'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HfField, Layout, TitledCard } from '~/components'
import { useHistory } from 'react-router'
import { signIn } from '~/service/auth'

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

  const { control, handleSubmit } = useForm<LoginFormValues>()

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(async (data) => {
    await signIn(data)
    window.location.reload()
  }, [])

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
          />
          <HfField 
            component={TextField}
            control={control}
            name='password'
            label='Senha'
            type='password'
          />
          <Button variant='text' onClick={handleNavigation}>Registrar conta</Button>
          <Button variant='contained' type='submit'>Logar</Button>
        </form>
      </TitledCard>
    </Layout>
  )
}
