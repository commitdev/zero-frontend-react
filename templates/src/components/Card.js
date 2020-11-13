import React from 'react'

import './Card.css'

function Card({ children, header = ""}) {
  return <div className="card" header={header}>{children}</div>
}

export default Card
