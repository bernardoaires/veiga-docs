import { TextEditor } from '~/components'
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom'
import { Documents } from './views'

export const Application: React.FC = () => {
  const match = useRouteMatch()

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${match.url}/`} exact>
          <Documents />
        </Route>
        <Route path={`${match.url}/documents/:documentId`} exact>
          <TextEditor />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
