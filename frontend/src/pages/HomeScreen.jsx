import {useState} from 'react'
import { clearStore, getStore } from '../utils/lcs'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from 'axios'
import UsersTable from '../components/UsersTable/UsersTable'
const user = getStore('user')

const HomeScreen = () => {
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!user) navigate('/login')
  }, [user])

  const handleLogout = async() => {
    if(!window.confirm('Are you sure to logout?!')) return
    try{
      await axios.put('/api/auth/logout')
      clearStore('user')
      navigate('/login')
    }catch(error){
      console.error(error)
    }
  }
  
  return (
    <>
      <Box
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          height: 'fit-content',
          background: '#f4f4f4',
          width: '100%',
        }}
      >
        <Stack
          spacing={2}
          direction='row'
          style={{
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3>{user?.name}</h3>
          <Button onClick={handleLogout} variant='contained'>
            Logout
          </Button>
        </Stack>
      </Box>
      <Box style={{ marginTop: '70px', padding: '20px' }}>
        <UsersTable user={user} />
      </Box>
    </>
  )
}

export default HomeScreen