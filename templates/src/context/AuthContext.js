import React, { useReducer, useEffect} from 'react'
import { fetchAuthState } from '../api/kratos'

const SET_AUTH = 'set_auth'
const LOGOUT_ACTION = 'logout'

/*
  Authentication state of user:
  <AuthProvider> wraps around the entire app,
  other components can referer to this context with the useContext(AuthContext) hook
*/
const AuthContext = React.createContext()

//Component starts at state loading,
// then fetchs status and sets Auth state
const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  email: null,
}

function reducer(state, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        email: action.payload.email,
      }
    case LOGOUT_ACTION:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: null,
        email: null,
      }
    default:
      return state
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = {
    setAuth: payload => {
      dispatch({type: SET_AUTH , payload })
    },
    state,
    dispatch,
  }

  useEffect(() => {
    if (state.isLoading === true) {
      fetchAuthState().then(value.setAuth);
    }
  });
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext, SET_AUTH, LOGOUT_ACTION }
