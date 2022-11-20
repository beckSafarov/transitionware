import './globals.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingScreen from './pages/LandingScreen'
import SignUpScreen from './pages/auth/SignUpScreen'
import LoginScreen from './pages/auth/LoginScreen'
import HomeScreen from './pages/HomeScreen'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useAuthContext from './hooks/useAuthContext'
import Loading from './components/Loading'
import PrivateRoute from './utils/PrivateRoute'
function App() {
  const {setUser, authUnsuccessful, authDone} = useAuthContext()

  useEffect(()=>{
    handleAuth()
  }, [])

  const handleAuth = async () => {
    try {
      const res = await axios.get('/api/auth/me')
      setUser(res.data.data)
    } catch (error) {
      authUnsuccessful()
      console.error(error)
    }
  }

  return (
    <>
      {!authDone ? (
        <Loading show />
      ) : (
        <Router>
          <Routes>
            <Route path={'/'} element={<LandingScreen />} />
            <Route path={'/signup'} element={<SignUpScreen />} />
            <Route path={'/login'} element={<LoginScreen />} />
            <Route path={'/home'} element={<HomeScreen />} />
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App
