import React, { createContext, useReducer } from 'react'

const initialState = {
  authDone: false,
  user: undefined
}

//create context
export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        authDone: true,
        user: action.payload
      }
    case 'authFinished':
      return {...state, authDone: true}
    case 'clearUser':
      return { authDone: true, user: undefined }
    case 'block':
      return { ...state, user: { ...state.user, isBlocked: true } }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setUser = (user) => dispatch({
    type: "setUser",
    payload: user
  })
  
  const authUnsuccessful = () => dispatch({type: "authFinished"})
  const clearUser = () => dispatch({type: "clearUser"})
  const block = () => dispatch({type: "block"})

  return (
    <AuthContext.Provider value={{
      ...state,
      setUser,
      authUnsuccessful,
      clearUser,
      block
    }}>
      {children}
    </AuthContext.Provider>
  )
}