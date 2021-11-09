import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { globalTheme } from '~/utils/theme'

interface DocumentCardProps {
  title: string,
  onClick: () => void,
  toggleDialog?: () => void,
  setDocumentId?: React.Dispatch<React.SetStateAction<string | undefined>>,
  documentId?: string
}

export const DocumentCard: React.FC<DocumentCardProps> = (props) => {
  const { title, children, onClick, toggleDialog, documentId, setDocumentId } = props

  const handleDelete = () => {
    if (toggleDialog && setDocumentId) {
      toggleDialog()
      setDocumentId(documentId)
    }
  }

  return (
    <Card sx={{ margin: globalTheme.spacing(2), cursor: 'pointer', ':hover': { color: globalTheme.palette.primary.main } }} elevation={5}>
      <CardHeader
        title={<Typography variant='h5' onClick={onClick}>{title}</Typography>}
        action={toggleDialog ? (
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        ) : null}
      />
      <CardContent onClick={onClick}>
        {children}
      </CardContent>
    </Card>
  )
}