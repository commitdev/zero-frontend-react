import React<%if eq (index .Params `userAuth`) "yes" %>, { useContext }<% end %> from 'react'
import { Link } from 'react-router-dom'
<%if eq (index .Params `userAuth`) "yes" %> import { AuthContext } from '../context/AuthContext'  <% end %>
import logo from '../logo.png'

import './Navigation.css'
<%if eq (index .Params `userAuth`) "yes" %>
function AuthenticatedLinks() {
  return (
    <React.Fragment>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/auth/profile">User Settings</Link>
      </li>
      <%if eq (index .Params `billingEnabled`) "yes" %><li>
        <Link to="/billing/products">Billing</Link>
      </li>
      <% end %><li>
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

function NavLinks({ isAuthenticated, isLoading }) {
  return <React.Fragment>
    {isLoading ?  (
        <nav className="app-nav">
          <span>Loading</span>
        </nav>
      ) : (
        <ul className="app-nav-links">
          {isAuthenticated ? (
            <AuthenticatedLinks />
          ) : (
            <UnauthenticatedLinks />
          )}
        </ul>
      )}
  </React.Fragment>
}
<% else if eq (index .Params `userAuth`) "no" %>
function NavLinks() {
  return <ul className="app-nav-links">
    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>
    <%if eq (index .Params `billingEnabled`) "yes" %><li>
      <Link to="/billing/products">Billing</Link>
    </li>
  <% end %></ul>
}
<% end %>
function Navigation() {
<%if eq (index .Params `userAuth`) "yes" %>
  const { state } = useContext(AuthContext)
<% end %>
  return (
    <nav className="app-nav">
      <Link to="/" className="app-nav-logo">
        <img src={logo} alt="logo" />
      </Link>
<%if eq (index .Params `userAuth`) "yes" %>
      <NavLinks {...state}/><% else if eq (index .Params `userAuth`) "no" %><NavLinks /><% end %>
    </nav>
  )
}

export default Navigation
