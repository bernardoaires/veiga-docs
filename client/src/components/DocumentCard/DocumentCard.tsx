import { Card, CardContent, CardHeader } from '@material-ui/core'
import { globalTheme } from '~/utils/theme'

interface DocumentCardProps {
  title: string,
  onClick: () => void
}

export const DocumentCard: React.FC<DocumentCardProps> = (props) => {
  const { title, children, onClick } = props

  return (
    <Card sx={{ margin: globalTheme.spacing(2), cursor: 'pointer' }} onClick={onClick}>
      <CardHeader title={title} />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}