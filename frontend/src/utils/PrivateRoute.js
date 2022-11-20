import useAuthContext from '../hooks/useAuthContext'
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

const PrivateRoute = ({ children, element: Element, ...rest }) => {
  const { user, authDone } = useAuthContext()
  const [permit, setPermit] = useState(null);

  useEffect(() => {
    if(!user && authDone) setPermit(false)
    if(user) setPermit(true)
  }, [user, authDone]);
  return (
    <Routes>
      <Route
        {...rest}
        render={() =>
          permit ? (
            children
          ) : permit === false ? (
            <Navigate to={'/login'} />
            ) : <Loading show />
        }
      />
    </Routes>
  )
}

PrivateRoute.defaultProps = {
  rest: {}
}

export default PrivateRoute