import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext, LOGOUT_ACTION } from '../context/AuthContext'

function Logout() {
  const { dispatch } = useContext(AuthContext)
  const history = useHistory()

  dispatch({
    type: LOGOUT_ACTION,
  })
  history.push('/')
  return ''
}

export default Logout
