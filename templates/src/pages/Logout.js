import React, { useContext, useEffect } from 'react'
import { AuthContext, LOGOUT_ACTION } from '../context/AuthContext'
import { generateLogoutUrl } from '../api/kratos'

function Logout() {
  const { dispatch } = useContext(AuthContext)

  useEffect(()=> {
    dispatch(LOGOUT_ACTION);
    generateLogoutUrl().then(url => {
      window.location.href = url;
    })
  })
  return (<React.Fragment></React.Fragment>)
}

export default Logout
