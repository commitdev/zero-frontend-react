import React from 'react'

import './AuthForm.css'

const translations = {
  password: {
    title: 'Password',
    position: 2,
  },
  'traits.email': {
    title: 'E-Mail',
    position: 1,
  },
  identifier: {
    title: 'ID',
    position: 0,
  },
  to_verify: {
    title: 'Your email address',
    position: 0,
  },
}

const getPosition = (field) =>
  field.name && field.name in translations
    ? translations[field.name].position
    : Infinity

const sortFormFields = (first, second) =>
  getPosition(first) - getPosition(second)

function Field({ name, type, required, value, errors = [] }) {
  if (type === 'hidden') {
    return (
      <input
        type={type}
        value={value}
        readOnly
        name={name}
        required={required}
      />
    )
  }

  const labelName = translations[name] ? translations[name].title : name
  const error = errors.length ? errors[0] : undefined
  return (
    <React.Fragment>
      <label htmlFor={name}>
        {labelName}
        <input type={type} defaultValue={value} name={name} id={name} />
      </label>
      {error && <p className="field-error">{error.message}</p>}
    </React.Fragment>
  )
}

function AuthForm({ title, config = {} }) {
  const fields = config.fields || []

  // TODO: figure out how to keep track of successful logins via AuthContext (required for Nav)
  return (
    <form method={config.method} action={config.action} className="auth-form">
      <h1>{title}</h1>

      {fields.sort(sortFormFields).map((fieldData) => (
        <Field {...fieldData} key={fieldData.name} />
      ))}

      <button>Submit</button>
    </form>
  )
}

export default AuthForm
