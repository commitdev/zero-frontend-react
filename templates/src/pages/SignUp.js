import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import isEmail from 'validator/es/lib/isEmail'
import { AuthContext, LOGIN_ACTION } from '../context/AuthContext'
import { login } from '../api/authentication'

import './Login.css'

const initialState = {
  email: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
}

function SignUp() {
  const { dispatch } = useContext(AuthContext)
  const [data, setData] = useState(initialState)
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(useLocation().search)
  const { from } = location.state || { from: { pathname: '/dashboard' } }

  if (queryParams.get('request') === null) {
    // TODO: use real URL and let it trigger redirect
    history.replace('/auth/sign-up?request=fake_request_id')
    return ''
  }

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (!isEmail(data.email)) {
      setData({
        ...data,
        errorMessage: 'Invalid email',
      })
      return
    }

    if (!data.password) {
      setData({
        ...data,
        errorMessage: 'Missing password',
      })
      return
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })

    login(data.email, data.password)
      .then((resJson) => {
        dispatch({
          type: LOGIN_ACTION,
          payload: resJson,
        })
        history.replace(from)
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        })
      })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleFormSubmit} className="login-form">
          <h1>Sign Up</h1>

          <label htmlFor="email">
            Email
            <input
              type="text"
              value={data.email}
              onChange={handleInputChange}
              disabled={data.isSubmitting}
              name="email"
              id="email"
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              value={data.password}
              onChange={handleInputChange}
              disabled={data.isSubmitting}
              name="password"
              id="password"
            />
          </label>

          {data.errorMessage && (
            <span className="form-error">{data.errorMessage}</span>
          )}

          <button disabled={data.isSubmitting}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
