import React, { useEffect, useState } from "react";
import logo from './commit-logo.png';
import './App.css';

import './components/Info'
import InfoPanel from './components/Info';

// Set config based on the environment variable the build was run under.
let config = {}
if (process.env.NODE_ENV === 'production') {
  config = require('./config/production.json')
} else if (process.env.NODE_ENV === 'staging') {
    config = require('./config/staging.json')
} else {
  config = require('./config/development.json')
}

function App() {
  const [data, setData] = useState({
    info: {},
    status: "Checking...",
    error: null
  });

  useEffect(() => {
    fetch(`https://${config.backendURL}/status/about`)
    .then(result => setData({
      info: result.data,
      status: result.status
    }))
    .catch(error => setData({
      info: {},
      status: "Failed.",
      error: error.message
    }))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>zero</h1>
        <InfoPanel data={data} config={config} />
      </header>
    </div>
  );
}

export default App;
