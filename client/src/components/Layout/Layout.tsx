import { AppBar, Box, makeStyles, Typography, useMediaQuery } from '@material-ui/core'
import { Docs } from '~/assets/svg'
import { globalTheme } from '~/utils/theme'
import { LogoutButton } from '~/components'

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
  const matches = useMediaQuery('(min-width:600px)')

  return (
    <Box className={classes.root}>
      <AppBar sx={{ height: globalTheme.topbar.height }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: `${!matches ? '15px' : '0px'}` }}>
          <Box sx={{ marginLeft: 2 }} />
          <Box className={classes.appbar}>
            {matches ? <Docs height={75} width={75} /> : null}
            <Typography variant='h3'>Veiga Docs</Typography>
          </Box>
          <LogoutButton />
        </Box>
      </AppBar>
      <Box sx={{ margin: 'auto' }}>
        <Box sx={{ marginTop: '75px' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}