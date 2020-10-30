import React, { useContext, useEffect } from 'react'
import { AuthContext, LOGOUT_ACTION } from '../context/AuthContext'
import { logoutURL } from '../api/kratos'

function Logout() {
  const { dispatch } = useContext(AuthContext)

  useEffect(()=> {
    dispatch(LOGOUT_ACTION)
    window.location.href = logoutURL
  })
  return (<React.Fragment></React.Fragment>)
}

export default Logout
