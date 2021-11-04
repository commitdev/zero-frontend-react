import config from '../config';

const fetchAuthState = async(dispatchSetAuth) =>  {
  const uri = `${config.authBackendURL}/whoami`
  const resp = await fetch(uri,{
    credentials: "include",
  });
  const { isAuthorized, context } = await resp.json();
  dispatchSetAuth({
    isLoading: false,
    isAuthenticated: isAuthorized,
    user: context?.name,
    email: context?.email,
  });
}

const login = async() => {
  window.location = `${config.authBackendURL}/login`;
}

const logout = async() => {
  window.location = `${config.authBackendURL}/logout`;
}
export { fetchAuthState, login, logout };
