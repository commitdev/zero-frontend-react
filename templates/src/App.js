import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Logout from './pages/Logout'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'

import './App.css'
import Navigation from './components/Navigation'
import { AuthProvider } from './context/AuthContext'

function AuthRoutes () {
  return (
    <Switch>
      <Route path="/auth/login">
        <Auth page="login" title="Login" key="login" />
      </Route>
      <Route path="/auth/registration">
        <Auth page="registration" title="Regsiter" key="registration" />
      </Route>
      <Route path="/auth/profile">
        <Auth page="settings" title="profile" key="profile" />
      </Route>
      <Route path="/auth/recovery">
        <Auth page="recovery" title="Recovery" key="recovery" />
      </Route>
      <Route path="/auth/settings">
        <Auth page="settings" title="Settings" key="settings" />
      </Route>
      <Route path="/auth/logout">
        <Logout />
      </Route>
    </Switch>
  )
}
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navigation />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/auth/*">
              <AuthRoutes/>
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
