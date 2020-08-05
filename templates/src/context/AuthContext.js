import React, { useReducer } from 'react'

const LOGIN_ACTION = 'login'
const LOGOUT_ACTION = 'logout'

const AuthContext = React.createContext()
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case LOGOUT_ACTION:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      }
    default:
      return state
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext, LOGIN_ACTION, LOGOUT_ACTION }
