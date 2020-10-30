import React from 'react'
import { Link } from 'react-router-dom'
import Notifications from './Notifications'

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
  'traits.name.first': {
    title: 'First Name',
    position: 3,
  },
  'traits.name.last': {
    title: 'Last Name',
    position: 4,
  },
  identifier: {
    title: 'Email',
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

function Field({ name, type, required, value, messages = [] }) {
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

  //oidc signin buttons
  if (name === 'provider' && type === 'submit') { 
    return <React.Fragment>
      <label htmlFor={`${name}-${value}`}>
          <button key={`${name}-${value}`} id={`${name}-${value}`} className={`oidc ${value}`} type={type} value={value} name={name} >{value}</button>
      </label>
      <Notifications messages={messages} />
    </React.Fragment>
  }

  // regular inputs
  const labelName = translations[name] ? translations[name].title : name;
  return <React.Fragment>
    <label htmlFor={name}>
      {labelName}
      <input type={type} defaultValue={value} name={name} id={name} />
    </label>
    <Notifications messages={messages} />
  </React.Fragment>
}


const ForgotPasswordLink = ({ showForgetPassword }) => showForgetPassword ?
  <Link to="/auth/recovery">Forgot password</Link> :
  null;
const SubmitButton = ({ hideSubmitButton, buttonString }) => hideSubmitButton ?
  null :
  <button className="submit-button">{buttonString || 'Submit'}</button>;

function AuthForm({ config = { fields: [] } }) {
  const fields = config.fields
    .sort(sortFormFields)
    .map((fieldData) => (
      <Field
        {...fieldData}
        key={fieldData.name === 'provider' ? fieldData.value : fieldData.name}
        value={fieldData.value}
      />
    ));
  return (
      <form key={config.formType} method={config.method} action={config.action} className="auth-form">
        {fields}
        <ForgotPasswordLink {...config} />
        <SubmitButton {...config} />
        <Notifications messages={config.messages} />
      </form>
  )
}

export default AuthForm
