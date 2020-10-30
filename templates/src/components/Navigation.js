import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import logo from '../commit-logo.png'

import './Navigation.css'

function AuthenticatedLinks() {
  return (
    <React.Fragment>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/auth/profile">User Settings</Link>
      </li>
      <li>
        <Link to="/auth/logout">Logout</Link>
      </li>
    </React.Fragment>
  )
}

function UnauthenticatedLinks() {
  return (
    <React.Fragment>
      <li>
        <Link to="/auth/registration">Sign Up</Link>
      </li>
      <li>
        <Link to="/auth/login">Login</Link>
      </li>
    </React.Fragment>
  )
}

function Navigation() {
  const { state } = useContext(AuthContext)
  return (
    <nav className="app-nav">
      <Link to="/" className="app-nav-logo">
        <img src={logo} alt="logo" />
      </Link>
      {state.isLoading ?  (
        <nav className="app-nav">
          <span>Loading</span>
        </nav>
      ) : (
        <ul className="app-nav-links">
          {state.isAuthenticated ? (
            <AuthenticatedLinks />
          ) : (
            <UnauthenticatedLinks />
          )}
        </ul>
      )}
    </nav>
  )
}

export default Navigation
