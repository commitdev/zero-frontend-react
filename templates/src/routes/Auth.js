import React from 'react'
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom'
import Logout from '../pages/Auth/Logout'
<%- if ne (index .Params `backendApplicationHosting`) "serverless" %>
import Login from '../pages/Auth/Login'
import Auth from '../pages/Auth/Form'
<% end %>

function AuthenticatedLinks() {
  return (
    <React.Fragment>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <%- if ne (index .Params `backendApplicationHosting`) "serverless" %>
      <li>
        <Link to="/auth/profile">User Settings</Link>
      </li>
      <% end %>
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
      <%- if ne (index .Params `backendApplicationHosting`) "serverless" %>
      <li>
        <Link to="/auth/registration">Sign Up</Link>
      </li>
      <% end %>
      <li>
        <Link to="/auth/login">Login</Link>
      </li>
    </React.Fragment>
  )
}

<%- if eq (index .Params `backendApplicationHosting`) "serverless" %>
function AuthRoutes () {
  return (
    <Switch>
      <Route path="/auth/login">
        <Login />
      </Route>
      <Route path="/auth/logout">
        <Logout />
      </Route>
    </Switch>
  )
}
<%- else %>
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
<% end %>

export { AuthRoutes, AuthenticatedLinks, UnauthenticatedLinks }