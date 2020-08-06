import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AuthContext, LOGIN_ACTION } from '../context/AuthContext'
import { login } from '../api/authentication'
import AuthForm from '../components/AuthForm'
import Card from '../components/Card'

import './Login.css'

function Login() {
  const { dispatch } = useContext(AuthContext)
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(useLocation().search)
  const { from } = location.state || { from: { pathname: '/dashboard' } }

  if (queryParams.get('request') === null) {
    // TODO: use real URL and let it trigger redirect
    history.replace('/auth/login?request=fake_request_id')
    return ''
  }

  function handleFormSubmit(data, setErrorMessage) {
    login(data.email, data.password)
      .then((resJson) => {
        dispatch({
          type: LOGIN_ACTION,
          payload: resJson,
        })
        history.replace(from)
      })
      .catch((error) => {
        setErrorMessage(error.message || error.statusText)
      })
  }

  return (
    <div className="login-container">
      <Card>
        <AuthForm
          {...{
            title: 'Login New',
            submitAction: handleFormSubmit,
            submitActionLabel: 'Login',
          }}
        />
      </Card>
    </div>
  )
}

export default Login
