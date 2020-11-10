import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import Card from '../components/Card'
import Logo from '../components/Logo'
import { fetchRequestData, generateFormRequestUrl } from '../api/kratos'

import './Auth.css'

/**
 * AuthPage controller, this is the form wrapper to handle the request / error message
 * and doing the data massaging for form rendering
 * this page is responsible for all the authForms [registration/login/settings/recovery]
 *
 *  The basic login flow:
 * 1. User lands on `auth/login`
 * 2. We detect there's no flowID (login session in progress), therefore redirect to kratos:self-serve
 * 3. kratos redirects to `auth/login?flow=<flowID>`
 * 4. Given flowID we use fetch the form fields/action (`fetchRequestData` via `oathkeeper`)
 * 5. set states of FormData based on response of 4., renders form (note it can have multiple forms [odic / password])
 * 6. Form submits to kratos (form action from response of 4.), and obtain session and stored in cookie
 */
function Auth({ page }) {
  const queryParams = new URLSearchParams(useLocation().search)
  const initialState = {
    data: [],
    page: page,
    hasError: false,
    isLoading: true,
    formStatus: null
  };

  const [formData, setFormData] = useState(initialState)

  const formCustomizations = (page, resp) => {
    // Depending on user action we show password form / profile form
    const settingsCondition = resp && /\/recovery\/methods\//.test(resp.request_url) ?
    (formType) => ["profile", "oidc"].includes(formType) :
    (formType) => ["password", "oidc"].includes(formType) ;

    const formArr =[];
    for (var formType in resp.methods) {
      if (page === "settings" && settingsCondition(formType)) {
        // Hide password / oidc form from settings page, Only showing profile
      } else {
        const submitButtonString = {
          login: 'Login',
          registration: 'Sign up',
          recovery: 'Send verification'
        }
        const globalMessage = resp.messages || [];
        const fieldMessages = resp.methods[formType].config?.messages || []

        formArr.push({
          formType,
          ...resp.methods[formType].config,
          messages: [...globalMessage, ...fieldMessages],
          // hide submit button for provider sign in, the redirection button
          hideSubmitButton: formType === "oidc" ? true : undefined,
          // Only show forgetPassword redirect for Login with password form
          showForgetPassword: page === "login" && formType === "password" ? true : undefined,
          buttonString: submitButtonString[page],
        });
      }
    }

    return formArr;
  }

  useEffect(() => {
    const requestId = queryParams.get('flow')

    if (requestId === null) {
      generateFormRequestUrl(formData.page).then(url => {
        window.location.href = url
      });
    } else {
      fetchRequestData(page, requestId).then(resp => {
        if (!resp) {
          setFormData({...formData, hasError: true});
          return;
        }
        setFormData({
          ...formData,
          data: formCustomizations(page, resp),
          formStatus: resp.state || null,
          isLoading: false,
        });
      })
    }
  }, []) // eslint-disable-line

  if (formData.hasError) {
    // If formRequest returns 400 (Usually means expired/invalid requestID)
    // redirect back to login page to restart flow
    setTimeout(() => {
      window.location.href = `/auth/${page}`
    }, 1000);
    return (<div className="auth-container content-container">
      <Card>
        <p>Expired or invalid {page} request.<br/><br/>
        ...redirecting back to {page} page.</p>
      </Card>
    </div>)
  }

  if (formData.isLoading) {
    return (<div className="auth-container content-container">
      <Card>Loading...</Card>
    </div>)
  }

  /**
   * forms can be more than 1 in multiple cases,
   * in Settings theres Profile/Password chagne
   * in Login/Registration there can be multiple methods (OIDC/password)
   */
  const forms = formData.data.map(config => (
    <AuthForm key={config.formType} config={config} />
  ))
  // Divider to let user know only 1 form gets submitted at a time
  if (forms.length === 2) {
    forms.splice(1, 0, <div key="divider" className="separator">OR</div>)
  }

  const cardHeader = {
    login : "Login",
    registration : "Sign up",
    recovery : "Forgot Password",
    settings : "Profile",
  };

  return (
    <div className="auth-container content-container">
      <Logo/>
      <Card header={cardHeader[page]}>{forms}</Card>
    </div>
  )
}

export default Auth
