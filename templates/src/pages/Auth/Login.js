import React, {useContext, useEffect} from "react";
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  useEffect(() => {
    login();
  }, []); // eslint-disable-line

  return <div className="content-container">
      If you're not redirected to the login page automatically, click button below <br/>
      <button onClick={login}>Login</button>
  </div>
}

export default LoginPage;