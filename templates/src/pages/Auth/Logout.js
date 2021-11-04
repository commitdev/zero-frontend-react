import React, {useContext, useEffect} from "react";

import { AuthContext } from '../../context/AuthContext'

const Logout = () => {
  const {logout} = useContext(AuthContext);
  useEffect(() => {
    logout();
  }, []); // eslint-disable-line

  return <div className="content-container">
    If you're not logged out automatically, click button below <br/>
    <button onClick={() => logout()}>Logout</button>
  </div>
};

export default Logout;
