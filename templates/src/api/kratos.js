import config from '../config';
import { PublicApiAxiosParamCreator, AdminApiAxiosParamCreator } from '@oryd/kratos-client'

const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`
/**
 * Kratos redirects and sets cookie upon client lands on URL and redirects back to
 * frontend with request_id
 *  */
const authPublicURL = `${config.backendURL}/.ory/kratos/public`;
const authAdminURL = `${config.backendURL}/.ory/kratos`;

/**
 * publicApi / adminApi are initialized Kratos SDK client with public / admin endpoints,
 * we use the sdk map out endpoints for http client to fetch
 */
const publicApi = new PublicApiAxiosParamCreator({basePath : authPublicURL });
const adminApi = new AdminApiAxiosParamCreator({basePath : authAdminURL });

/**
 * getBrowserFlowParams / getRequestFlowData
 * maps and calls flows[Login/Registration/Recovery/Settings] to kratos sdk fn names
 */
const getBrowserFlowParams = async (flow) =>  publicApi[`initializeSelfService${flow}ViaBrowserFlow`]();
const getRequestFlowData = async (flow, id) =>  adminApi[`getSelfService${flow}Flow`](id);

/**
 * generate<Logout/FormRequest/RequestData/Session>URL uses SDK to generate endpoint for http client
 */
const generateLogoutUrl = async () => {
  const { url } = await publicApi.initializeSelfServiceBrowserLogoutFlow();
  return authPublicURL + url;
}

const generateFormRequestUrl = async (type) => {
  let { url } = await getBrowserFlowParams(capitalize(type));
  // Workaround for bug in SDK specs: https://github.com/ory/sdk/issues/43
  if (type === "settings") {
    url = url.replace(/\/flows$/, '');
  }
  return authPublicURL + url;
}

const generateRequestDataUrl = async (type, flowId) => {
  const { url } =  await getRequestFlowData(capitalize(type), flowId);
  return authAdminURL + url;
};

const generateSessionUrl = async (type, flowId) => {
  const { url } =  await publicApi.whoami();
  return authPublicURL + url;
};

/**
 * fetchRequestData Assumes proxy(oathkeeper) to forward this request to admin-endpoint
 * and returns the form fields / destination
 * @param {*} type the form type (login/registration/recovery/settings)
 * @param {*} flowId the generated ID from the kratos redirect
 */
const fetchRequestData = async (type = "login", flowId) => {
    const uri = await generateRequestDataUrl(type, flowId);
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
  const uri = await generateSessionUrl();
  const options = {credentials: "include"};

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

export { fetchRequestData, fetchAuthState, generateFormRequestUrl, generateLogoutUrl }
