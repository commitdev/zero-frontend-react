import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Logout from './pages/Logout'
import Dashboard from './pages/Dashboard'
import UserSettings from './pages/UserSettings'
import PageNotFound from './pages/PageNotFound'

import './App.css'
import Navigation from './components/Navigation'
import { AuthProvider, AuthContext } from './context/AuthContext'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const { state } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
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
            <Route path="/auth/login">
              <Login />
            </Route>
            <Route path="/auth/sign-up">
              <SignUp />
            </Route>
            <Route path="/auth/logout">
              <Logout />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/settings">
              <UserSettings />
            </PrivateRoute>
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
