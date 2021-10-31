import { Card, CardContent, CardHeader } from '@material-ui/core'

interface DocumentCardProps {
  title: string,
  onClick: () => void
}

export const DocumentCard: React.FC<DocumentCardProps> = (props) => {
  const { title, children, onClick } = props

  return (
    <Card onClick={onClick}>
      <CardHeader title={title} />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}