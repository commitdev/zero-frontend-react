import React from 'react'
import { BrowserRouter as Switch, Route } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';

import config from '../../config';
import Plans from './Plans'
import Confirmation from './Confirmation'

const stripePromise = loadStripe(config.stripePublishableKey);

function Billing () {
  return (
    <Elements stripe={ stripePromise }>
      <Switch>
        <Route path="/billing/products" component={ Plans } />
        <Route path="/billing/confirmation*" component={ Confirmation } />
      </Switch>
    </Elements>
  )
}

export default Billing
