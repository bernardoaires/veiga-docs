import React, { useContext } from 'react'
import { NewDoc } from '~/assets/svg'
import { DocumentCard, Layout } from '~/components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import { AuthContext } from '~/App'

export const Documents: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const authAccount = useContext(AuthContext)

  const handleClick = () => {
    history.push(`${match.url}/documents/${uuidV4()}`)
  }

  return (
    <Layout>
      <DocumentCard title='Novo Documento' onClick={handleClick}>
        <NewDoc height={200} width={200} />
      </DocumentCard>
    </Layout>
  )
}