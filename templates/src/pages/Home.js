import React, { useEffect, useState } from 'react'
import config from '../config';
import './Home.css'
import InfoPanel from '../components/Info'
<%if eq (index .Params `userAuth`) "yes" %>import Card from '../components/Card'<% end %>

function Home() {
  const [data, setData] = useState({
    info: {},
    error: null,
  })

  const [status, setStatus] = useState({
    code: 'Checking...',
  })
<%if eq (index .Params `userAuth`) "yes" %>
  const [privateState, setPrivateData] = useState({
    isLoading: true,
    data: {},
  });

  const fetchPrivateData = async(data) =>  {
    const uri = `${config.backendURL}/auth/userInfo`
    const resp = await fetch(uri,{credentials : "include"});
    return {
      data: await resp.json(),
    }
  }<% end %>

  const fetchInfoPanel = async() => {
    const resp = await fetch(`${config.backendURL}/status/about`, { credentials: "include" });
    const code = resp.status
    const info = await resp.json()
    return { code, info };
  };


useEffect(() => {
  fetchInfoPanel().then(({code, info}) => {
      setStatus({ code });
      setData({ info, error: null })
    })
    .catch((error) => {
      setData({ info: {}, error: error })
    });
<%if eq (index .Params `userAuth`) "yes" %>
    fetchPrivateData().then(setPrivateData);<% end %>
}, [])

  return (
    <main className="Home">
      <InfoPanel data={data} status={status} config={config} />
<%if eq (index .Params `userAuth`) "yes" %>
      <Card header="Authenticated Data">
        {
          privateState.isLoading ?
            <div>Fetching data...</div> :
            <pre>{ JSON.stringify(privateState.data, null , 2) }</pre>
        }
      </Card><% end %>
    </main>
  )
}

export default Home
