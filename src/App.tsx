import Container from '@mui/material/Container'
import './App.css'
import { AppBar, Toolbar, Typography, CssBaseline } from '@mui/material'
import Customerlist from './components/Customerlist'

function App() {

  return (
    <>
    <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography>PersonalTrainerApp</Typography>
          </Toolbar>
        </AppBar>
        <Customerlist />
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
