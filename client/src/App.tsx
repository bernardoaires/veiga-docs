import { Application, Login, PageNotFound } from '~/views'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/app'>
          <Application />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
