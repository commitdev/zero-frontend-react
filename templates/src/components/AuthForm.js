import React, { useState } from 'react'
import isEmail from 'validator/es/lib/isEmail'

import './AuthForm.css'

const initialState = {
  email: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
}

function AuthForm({ title, submitAction, submitActionLabel }) {
  const [data, setData] = useState(initialState)

  function handleInputChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  function setErrorMessage(msg = 'Something went wrong') {
    setData({
      ...data,
      isSubmitting: false,
      errorMessage: msg,
    })
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    if (!isEmail(data.email)) {
      setErrorMessage('Invalid email')
      return
    }

    if (!data.password) {
      setErrorMessage('Missing password')
      return
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })

    submitAction(
      { email: data.email, password: data.password },
      setErrorMessage
    )
  }

  return (
    <form onSubmit={handleFormSubmit} className="auth-form">
      <h1>{title}</h1>

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
        <span className="auth-form-error">{data.errorMessage}</span>
      )}

      <button disabled={data.isSubmitting}>{submitActionLabel}</button>
    </form>
  )
}

export default AuthForm
