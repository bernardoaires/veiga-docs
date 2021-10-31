import { Box, Card, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
    borderRadius: '15px',
    minWidth: '500px'
  },
  title: {
    marginBottom: 30
  }
})

interface TitledCardProps {
  title: string
}

export const TitledCard: React.FC<TitledCardProps> = (props) => {
  const classes = useStyles()
  const { children, title } = props

  return (
    <Card className={classes.card}>
      <Box className={classes.title}>
        <Typography variant='h4'>{title}</Typography>
      </Box>
      {children}
    </Card>
  )
}