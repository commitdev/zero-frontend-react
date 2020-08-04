import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../commit-logo-white.png'

import './Header.css'

function Header() {
  return (
    <header className="App-header">
      <Link to="/" className="Header-logo">
        <img src={logo} alt="logo" />
      </Link>

      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
