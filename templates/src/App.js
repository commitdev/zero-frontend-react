import React, { useEffect, useState } from "react";
import logo from "./commit-logo.png";
import "./App.css";

import "./components/Info";
import InfoPanel from "./components/Info";

// Set config based on the environment variable the build was run under.
let config = {};
if (process.env.REACT_APP_CONFIG === "production") {
  config = require("./config/production.json");
} else if (process.env.REACT_APP_CONFIG === "staging") {
  config = require("./config/staging.json");
} else {
  config = require("./config/development.json");
}

function App() {
  const [data, setData] = useState({
    info: {},
    error: null,
  });

  const [status, setStatus] = useState({
    code: "Checking...",
  })

  useEffect(() => {
    fetch(`${config.backendURL}/status/about`)
      .then(result => {
        setStatus({
          code: result.status,
        })
        return result.json()
      })
      .then(data => {
        setData({
          info: data,
          error: null
        })
      })
      .catch(error => {
        setData({
          info: {},
          error: error
        })
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>zero</h1>
        <InfoPanel data={data} status={status} config={config} />
      </header>
    </div>
  );
}

export default App;
