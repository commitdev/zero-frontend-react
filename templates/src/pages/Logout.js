import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext, LOGOUT_ACTION } from '../context/AuthContext'

function Logout() {
  const { dispatch } = useContext(AuthContext)
  dispatch(LOGOUT_ACTION)

  // TODO: change redirect to kratos browser logout url
  // https://www.ory.sh/kratos/docs/self-service/flows/user-logout
  return <Redirect to="/" />
}

export default Logout
