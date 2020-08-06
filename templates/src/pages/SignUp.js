import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AuthContext, LOGIN_ACTION } from '../context/AuthContext'
import { signUp } from '../api/authentication'
import AuthForm from '../components/AuthForm'
import Card from '../components/Card'

import './SignUp.css'

function SignUp() {
  const { dispatch } = useContext(AuthContext)
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(useLocation().search)
  const { from } = location.state || { from: { pathname: '/dashboard' } }

  if (queryParams.get('request') === null) {
    // TODO: use real URL and let it trigger redirect
    history.replace('/auth/sign-up?request=fake_request_id')
    return ''
  }

  function handleFormSubmit(data, setErrorMessage) {
    signUp(data.email, data.password)
      .then((resJson) => {
        dispatch({
          type: LOGIN_ACTION, // Sign up is basically a sign up then login, so we can re-use the login action here
          payload: resJson,
        })
        history.replace(from)
      })
      .catch((error) => {
        setErrorMessage(error.message || error.statusText)
      })
  }

  return (
    <div className="sign-up-container">
      <Card>
        <AuthForm
          {...{
            title: 'Sign Up',
            submitAction: handleFormSubmit,
            submitActionLabel: 'Sign Up',
          }}
        />
      </Card>
    </div>
  )
}

export default SignUp
