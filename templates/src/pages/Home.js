import React, { useEffect, useState } from 'react'
import './Home.css'
import config from '../config';

import '../components/Info'
import InfoPanel from '../components/Info'

function Home() {
  const [data, setData] = useState({
    info: {},
    error: null,
  })

  const [status, setStatus] = useState({
    code: 'Checking...',
  })

useEffect(() => {
    fetch(`${config.backendURL}/status/about`, { credentials: "include" })
      .then((result) => {
        setStatus({
          code: result.status,
        })
        return result.json()
      })
      .then((data) => {
        setData({
          info: data,
          error: null,
        })
      })
      .catch((error) => {
        setData({
          info: {},
          error: error,
        })
      })
  }, [])

  return (
    <main className="Home">
      <InfoPanel data={data} status={status} config={config} />
    </main>
  )
}

export default Home
