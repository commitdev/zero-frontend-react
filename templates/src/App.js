import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
<%if eq (index .Params `userAuth`) "yes" %> 
import Auth from './pages/Auth'
import Logout from './pages/Logout'<% end %>
<%if eq (index .Params `billingEnabled`) "yes" %> 
import BillingRoutes from './pages/Billing/routes'
<% end %>
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'

import './App.css'
import Navigation from './components/Navigation'
<%if eq (index .Params `userAuth`) "yes" %> 
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
<% end %>
function App() {
  return (
    <Router>
<%if eq (index .Params `userAuth`) "yes" %> 
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
            <%if eq (index .Params `billingEnabled`) "yes" %><Route exact path="/billing/*">
                <BillingRoutes />
            </Route>
            <% end %><Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
<% else if eq (index .Params `userAuth`) "no" %>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <%if eq (index .Params `billingEnabled`) "yes" %><Route exact path="/billing/*">
            <BillingRoutes />
          </Route>
          <% end %><Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
<% end %>
    </Router>
  )
}

export default App
