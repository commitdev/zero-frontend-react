import config from '../config';

// Kratos redirects and sets cookie upon client lands on URL and redirects back to
// frontend with request_id
const authPublicURL = `${config.backendURL}/.ory/kratos/public`;
const logoutURL = `${authPublicURL}/self-service/browser/flows/logout`;
const generateFormRequestUrl = (type) => `${authPublicURL}/self-service/${type}/browser`;
const fetchRequestDataUrl = (type, flowId) => `${config.backendURL}/.ory/kratos/self-service/${type}/flows?id=${flowId}`;

/**
 * fetchRequestData Assumes proxy(oathkeeper) to forward this request to admin-endpoint
 * and returns the form fields / destination
 * @param {*} type the form type (login/registration/recovery/settings)
 * @param {*} flowId the generated ID from the kratos redirect
 */
const fetchRequestData = async (type = "login", flowId) => {
    const uri = fetchRequestDataUrl(type, flowId);
    const options = { method: 'GET', headers: { Accept: 'application/json' } };
    const response = await fetch(uri, options);
    if (response.status >= 400 && response.status < 500) {
      return false;
    }
    return response.json();
  };

  /**
   * fetchAuthState authenticates with the public endpoint of kratos,
   * given a valid session's cookie, kratos will respond with session information
   * that includes whether session is active, checking it then formatting for authContext
   */
const fetchAuthState = async() => {
  const sessionEndpoint = '/sessions/whoami';
  const options = {credentials: "include"};
  const uri = `${authPublicURL}${sessionEndpoint}`;

  const response = await fetch(uri, options);
  const authResult = await response.json();
  /** Kratos session payload example:
   * {
      "id": "872ea955-59c0-4417-add1-a9f824bb2f8d",
      "active": true,
      "expires_at": "2020-11-06T21:24:10.566549283Z",
      "authenticated_at": "2020-11-05T21:24:10.566549283Z",
      "issued_at": "2020-11-05T21:24:10.56655868Z",
      "identity": {
          "id": "db0eba56-f7e6-4a7c-8b8e-5ed3c802139c",
          "schema_id": "default",
          "schema_url": "https://<your-application>/.ory/kratos/public/schemas/default",
          "traits": {
              "email": "user@example.com"
          }
      }
} */
  const isLoggedIn = !!authResult.active
  return {
    isAuthenticated: isLoggedIn,
    user: authResult.identity?.id,
    email: authResult.identity?.traits?.email
  };
};

export { fetchRequestData, fetchAuthState, generateFormRequestUrl, logoutURL }
