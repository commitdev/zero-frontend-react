import React from 'react'

import Card from '../../components/Card'

function Confirmation() {
  const queryString = decodeURIComponent(new URL(window.location).searchParams.toString());
  const queryParams = queryString.split("&");
  return (
    <div className="billing-container content-container">
      <Card header="Example Subscription Results">
        { queryParams.map((param) => (<p>{ param }</p>)) }
      </Card>
    </div>
  )
}

export default Confirmation
