import { CssBaseline, ThemeProvider } from '@material-ui/core'
import ReactDOM from 'react-dom'
import { App } from './App'
import './styles.css'
import { globalTheme } from './utils/theme'
import { SnackbarProvider } from 'notistack-v5'

ReactDOM.render(
  <ThemeProvider theme={globalTheme}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <App />
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
