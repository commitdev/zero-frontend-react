import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'

<%if eq (index .Params `billingEnabled`) "yes" %> 
import BillingRoutes from './pages/Billing/routes'
<% end %>
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'

import './App.css'
import Navigation from './components/Navigation'
<%- if eq (index .Params `userAuth`) "yes" %> 
import { AuthRoutes } from './routes/Auth'
import { AuthProvider } from './context/AuthContext'
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
