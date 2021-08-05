import { TextEditor } from '~/components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

export const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path='/documents/:documentId' exact>
          <TextEditor />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
