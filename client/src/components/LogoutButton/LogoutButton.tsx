import { Box, Button, useMediaQuery } from '@material-ui/core'
import { Logout } from '@material-ui/icons'
import { useContext } from 'react'
import { AuthContext } from '~/App'
import { signOut } from '~/service/auth'

export const LogoutButton: React.FC = () => {
  const authAccount = useContext(AuthContext)
  const matches = useMediaQuery('(min-width:600px)')

  const handleClick = () => {
    signOut()
  }

  if (authAccount) {
    if (!matches) {
      return (
        <Box sx={{ marginRight: 2 }}>
          <Logout onClick={handleClick} color='inherit' sx={{ height: 25, width: 25, marginTop: .5 }} />
        </Box>
      )
    }
    return (
      <Box sx={{ marginRight: 2 }}>
        <Button onClick={handleClick} color='inherit' variant='outlined'>
          Logout
        </Button>
      </Box>
    )
  }
  return <Box sx={{ marginRight: 2 }} />
}
