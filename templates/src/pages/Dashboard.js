import React, { useContext, useEffect, useState } from 'react'

import Card from '../components/Card'
<%if eq (index .Params `userAuth`) "yes" %> import { AuthContext } from '../context/AuthContext'
import AuthCheck from '../components/AuthCheck'<% end %>


// This is an example of an authenticated only page
// to showcase how you would implement a page that loads data from backend
// It will redirect you to login page if you're not authenticated
// if authenticated:  it will make an API call to fetch data
// then data will inject into state to show in dashboard

// In real scenario this would be fetching data from backend
const fetchDashboard = async(data) => new Promise((resolve) => {
  const fakeFetchData = () => resolve(data);
  setTimeout(fakeFetchData, 500);
})

<%if eq (index .Params `userAuth`) "yes" %> 
function Dashboard() {
  const { state: authState } = useContext(AuthContext)
  const [state, setState] = useState({
    isLoading: true,
    data: {},
  })

  useEffect(()=> {
    if (authState.isAuthenticated) {
      // only fetch data if authenticated
      fetchDashboard(authState).then(data=> {
        setState({
          ...state,
          isLoading: false,
          data,
        })
      })
    }
  }, [state, authState]);

  if (authState.isLoading) {
    return <div>Loading...</div>
  }
  // import authState / authCheck to streamline auth checking
  return  (
    <AuthCheck authState={authState}>
      <div className="content-container">
        <Card header="Dashboard">
          {
            state.isLoading ?
              <div>Fetching data...</div> :
              <pre>{ JSON.stringify(state.data, null , 2) }</pre>
          }
        </Card>
      </div>
    </AuthCheck>
  )
}
<% else if eq (index .Params `userAuth`) "no" %>
function Dashboard () {
  const [state, setState] = useState({
    isLoading: true,
    data: {},
  })

  useEffect(()=> {
    fetchDashboard({lorem: "Ipsum"}).then(data=> {

      setState({
        ...state,
        isLoading: false,
        data,
      })
    });
  });
  return <div className="content-container">
    <Card header="Dashboard">
      {
        state.isLoading ?
          <div>Fetching data...</div> :
          <pre>{ JSON.stringify(state.data, null , 2) }</pre>
      }
    </Card>
  </div>
}
<% end %>
export default Dashboard
