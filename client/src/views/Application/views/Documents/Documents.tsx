import React, { useContext, useEffect, useState } from 'react'
import { NewDoc } from '~/assets/svg'
import { DocumentCard, Layout } from '~/components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import { AuthContext } from '~/App'
import { getDocumentsByUserId } from '~/service/api'

interface DocumentToFront {
  _id: string,
  userId: string,
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
          <NewDoc height={200} width={200} />
        </DocumentCard>
      </Layout>
    )
  }

  return (
    <Layout>
      <DocumentCard title='Novo Documento' onClick={() => handleClick()}>
        <NewDoc height={200} width={200} />
      </DocumentCard>
      {documents.map((document, index) => {
        return (
          <DocumentCard key={index} title={`Documento ${index}`} onClick={() => handleClick(document._id)}>
            <NewDoc height={200} width={200} />
          </DocumentCard>
        )
      })}
    </Layout>
  )
}