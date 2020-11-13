import React from 'react'
import Card from './Card'
import Logo from './Logo'

import './Info.css'

function InfoPanel({ data, status, config }) {
  return (
    <div className="info-container content-container">
      <Logo />
      <Card header="App Info">
        <p>
          <strong>Application Name:</strong> {config.appName}
          <br />
          <strong>Environment:</strong> {config.environment}
          <br />
          {data.info !== undefined ? (
            <span>
              <strong>Pod Name:</strong> {data.info.podName}
              <br />
            </span>
          ) : null}
          <strong>Status:</strong> {status.code}
          <br />
          {data.error !== null ? (
            <span className="error">
              <strong>Error:</strong> {status.error}
            </span>
          ) : null}
        </p>
      </Card>
    </div>
  )
}

export default InfoPanel
