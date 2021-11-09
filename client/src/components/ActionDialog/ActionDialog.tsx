import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

interface ActionDialogProps {
  title: string,
  description: string,
  actions: JSX.Element,
  onClose: () => void
  open: boolean
}

export const ActionDialog: React.FC<ActionDialogProps> = (props) => {
  const { actions, description, title, onClose, open } = props

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color='GrayText'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  )
}