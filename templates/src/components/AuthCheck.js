import React from 'react'

function AuthCheck({authState, children}) {
  if (authState.isLoading) {
    return <div>authenticating...</div>
  }
  if (!authState.isAuthenticated) {
    return <div>Unauthenticated</div>
  }
  return <React.Fragment>{children}</React.Fragment>
}

export default AuthCheck;
