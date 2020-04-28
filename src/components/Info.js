
import React from 'react'

import './Info.css'

const InfoPanel = ({ data, status, config }) => {
  return (
    <div className="info">
      <h2>App Info</h2>
    <div className="info-panel">
      <p>
        <strong>Application Name:</strong> {config.appName}<br />
        <strong>Environment:</strong> {config.environment}<br />
        { data.info !== undefined ? <span><strong>Pod Name:</strong> {data.info.podName}<br /></span> : null}
        <strong>Status:</strong> {status.code}<br />
        { data.error !== null ? <span className="error"><strong>Error:</strong> { status.error }</span> : null}
      </p>
    </div></div>
  )
};

export default InfoPanel