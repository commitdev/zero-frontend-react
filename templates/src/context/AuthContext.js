import React, { useReducer, useEffect, /* useContext */} from 'react'
<%- if eq (index .Params `serverless`) "yes" %>
import { fetchAuthState, login, logout } from '../api/serverless-auth'
<%- else %>
import { fetchAuthState, login, logout } from '../api/kratos'
<% end %>
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
    state,
    setAuth: (payload) => {
      dispatch({type: SET_AUTH , payload })
    },
    logout,
    login,
    dispatch,
  }


  useEffect(() => {
    fetchAuthState(value.setAuth);
  }, [state.isLoading]); // eslint-disable-line
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext, SET_AUTH, LOGOUT_ACTION }
