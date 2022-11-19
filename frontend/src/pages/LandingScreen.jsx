import Stack from '@mui/material/Stack'
import Box from '@mui/system/Box'
import Button from '@mui/material/Button'
import FullyCentered from '../components/FullyCentered'
import {Link} from 'react-router-dom'
function App() {
  return (
    <FullyCentered>
      <h1>Welcome to Jealousy App!</h1>
      <p>where you can block or delete fellow users you are jealous of</p>
      <Stack
        direction='row'
        spacing={2}
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Link to='/signup'>
          <Button variant='contained' size='large'>
            Sign up
          </Button>
        </Link>
        <Link to='/login'>
          <Button variant='outlined' size='large'>
            Log in
          </Button>
        </Link>
      </Stack>
    </FullyCentered>
  )
}

export default App
