import React, { useReducer } from 'react'

const LOGIN_ACTION = 'login'
const LOGOUT_ACTION = 'logout'

// TODO: handle user that has valid token

const AuthContext = React.createContext()
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      // TODO: store token (user?) in cookie
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case LOGOUT_ACTION:
      // TODO: remove cookies
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
