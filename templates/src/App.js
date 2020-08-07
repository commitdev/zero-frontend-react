import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Logout from './pages/Logout'
import Dashboard from './pages/Dashboard'
import UserSettings from './pages/UserSettings'
import PageNotFound from './pages/PageNotFound'

import './App.css'
import Navigation from './components/Navigation'
import { AuthProvider } from './context/AuthContext'

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
            <Route path="/auth/login">
              <Auth type="login" title="Login" key="login" />
            </Route>
            <Route path="/auth/registration">
              <Auth type="registration" title="Regsiter" key="registration" />
            </Route>
            <Route path="/auth/logout">
              <Logout />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/settings">
              <UserSettings />
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
