import './globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingScreen from './pages/LandingScreen'
import SignUpScreen from './pages/auth/SignUpScreen'
import LoginScreen from './pages/auth/LoginScreen'
import HomeScreen from './pages/HomeScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<LandingScreen />} />
        <Route path={'/signup'} element={<SignUpScreen />} />
        <Route path={'/login'} element={<LoginScreen />} />
        <Route path={'/home'} element={<HomeScreen />} />
      </Routes>
    </Router>
  )
}

export default App
