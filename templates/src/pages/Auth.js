import React, { useState, useEffect, useRef } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { getAuthFlowData } from '../api/kratos'
import AuthForm from '../components/AuthForm'
import Card from '../components/Card'

import './Auth.css'

// TODO: Remove; For mocking purposes only...
const REQUEST_ID = '2f6a8583-2364-48eb-8064-58b28618f79b' // get this by visiting http://127.0.0.1:4455/auth/login (when running Kratos example locally)

function get(p, o) {
  return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o)
}

function Auth({ type, title }) {
  const [formData, setFormData] = useState({
    data: {},
    type: type,
    hasBeenFetched: false,
    isLoading: false,
  })
  const queryParams = new URLSearchParams(useLocation().search)
  const requestId = queryParams.get('request')

  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []) // Using an empty dependency array ensures this only runs on unmount

  if (requestId === null) {
    // TODO: use Kratos login endpoing for browser flows (ex /.ory/kratos/public/self-service/browser/flows/login)
    return <Redirect to={`/auth/${type}?request=${REQUEST_ID}`} />
  } else if (!formData.hasBeenFetched && !formData.isLoading) {
    isMounted.current &&
      getAuthFlowData(type, requestId)
        .then((resp) => {
          isMounted.current &&
            setFormData({
              ...formData,
              data: resp,
              isLoading: false,
              hasBeenFetched: true,
            })
        })
        .catch((error) => console.error('Something went wrong...', error))
    isMounted.current && setFormData({ ...formData, isLoading: true })
  }

  return (
    <div className="auth-container">
      <Card>
        {formData.isLoading ? (
          'Loading...'
        ) : (
          <AuthForm
            {...{
              title,
              config:
                get(['methods', 'password', 'config'], formData.data) || {},
            }}
          />
        )}
      </Card>
    </div>
  )
}

export default Auth
