import { Box, Card, Container, TextField, Typography } from '@material-ui/core'

export const Login: React.FC = () => {
  return (
    <Container>
      <Card>
        <Typography variant='h4'>Login</Typography>
        <TextField variant='outlined' label='Usuário' />
        <TextField variant='outlined' label='Senha' />
      </Card>
    </Container>
  )
}