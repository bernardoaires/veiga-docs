import { AppBar, Box, Button, makeStyles, Typography } from '@material-ui/core'
import { useContext } from 'react'
import { AuthContext } from '~/App'
import { Docs } from '~/assets/svg'
import { signOut } from '~/service/auth'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
})

export const Layout: React.FC = (props) => {
  const { children } = props
  const classes = useStyles()
  const authAccount = useContext(AuthContext)

  const handleClick = () => {
    signOut()
  }

  return (
    <Box className={classes.root}>
      <AppBar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box />
          <Box className={classes.appbar}>
            <Docs height={80} width={80} />
            <Typography variant='h3'>Veiga Docs</Typography>
          </Box>
          <Box sx={{ marginTop: 2, marginRight: 2 }} >
            {authAccount ? (
              <Button onClick={handleClick} color='inherit' variant='outlined'>
              Logout
              </Button>
            ) : null}
          </Box>
        </Box>
      </AppBar>
      {children}
    </Box>
  )
}