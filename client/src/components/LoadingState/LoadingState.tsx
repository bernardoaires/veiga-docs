import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { globalTheme } from '~/utils/theme'
import { LinearProgress } from '@material-ui/core'

const useStyles = makeStyles({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    flexGrow: 1
  },
  title: {
    marginBottom: globalTheme.spacing(5)
  },
  linearProgressRoot: {
    height: 9,
    width: '90%',
    maxWidth: 445,
    borderRadius: 5,
    backgroundColor: globalTheme.palette.grey[300]
  },
  linearProgressBar: {
    borderRadius: 5
  }
})

export const LoadingState: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.content}>
      <Typography className={classes.title} variant='h4' align='center'>
        Carregando...
      </Typography>
      <LinearProgress
        classes={{
          root: classes.linearProgressRoot,
          bar: classes.linearProgressBar
        }}
      />
    </Box>
  )
}
