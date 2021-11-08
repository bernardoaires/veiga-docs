import React, { useContext, useEffect, useState } from 'react'
import { NewDoc } from '~/assets/svg'
import { DocumentCard, Layout } from '~/components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import { AuthContext } from '~/App'
import { getDocumentsByUserId } from '~/service/api'
import { Box } from '@material-ui/core'

interface DocumentToFront {
  _id: string,
  userId: string,
  title: string,
  image: string,
  data: any
}

export const Documents: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const authAccount = useContext(AuthContext)
  const [documents, setDocuments] = useState<DocumentToFront[] | undefined>()

  const handleClick = (documentId?: string) => {
    history.push(`${match.url}/documents/${documentId || uuidV4()}`)
  }

  useEffect(() => {
    if (authAccount) {
      (async () => {
        const result = await getDocumentsByUserId({
          userId: authAccount._id
        })
        setDocuments(result.data)
      })()
    }
  }, [authAccount])

  if (!documents) {
    return (
      <Layout>
        <DocumentCard title='Novo Documento' onClick={() => handleClick()}>
          <NewDoc height='100%' width='100%' />
        </DocumentCard>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <DocumentCard title='Novo Documento' onClick={() => handleClick()}>
          <NewDoc height='100%' width='100%' />
        </DocumentCard>
        {documents.map((document, index) => {
          return (
            <DocumentCard key={index} title={document.title ? document.title : `Documento ${index}`} onClick={() => handleClick(document._id)}>
              {!document.image.length ? (
                <NewDoc height='100%' width='100%' />
              ) : (
                <img
                  src={document.image}
                  alt={`Documento ${index}`}
                  style={{
                    height: '300px',
                    width: '300px'
                  }} 
                />
              )}
            </DocumentCard>
          )
        })}
      </Box>
    </Layout>
  )
}