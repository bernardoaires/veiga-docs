import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'
import { Info } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { globalTheme } from '~/utils/theme'

const useStyles = makeStyles({
  iconError: {
    color: globalTheme.palette.status6.main
  },
  iconInfo: {
    color: globalTheme.palette.primary.main
  }
})

export type StatusTooltipProps = {
  title: string,
  className?: string,
  status?: string
}

export const StatusTooltip: React.FC<StatusTooltipProps> = ({ title, status, className }) => {
  const classes = useStyles()
  return (
    <Tooltip className={className} title={title} placement='top'>
      <Box>
        <Info cursor='default' className={status === 'info' ? classes.iconInfo : classes.iconError} />
      </Box>
    </Tooltip>
  )
}
