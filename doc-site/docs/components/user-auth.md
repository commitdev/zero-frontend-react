---
title: User Auth
sidebar_label: User Auth
sidebar_position: 1
---

## Authentication
If you enabled `user_auth` from Project definition. An authentication setup would be templated out along side your frontend application. 
With examples of:
- Authenticated and Unauthenticated navigation bar
- Auth-provider implemented with user status checking
- Home page with 2 blocks of data from backend, one requiring authentication
- Signup/Login/Password reset forms secured with CSRF token
- Example of backend API calls authenticated via https only cookie using signed JWT tokens

## Concept
This example is built with backend components [ORY Oathkeepr][oathkeeper] as an access identity proxy and [ORY Kratos][kratos] as user-management system.

### Forms
Forms on the frontend are secured with [CSRF tokens][csrf], they are a nonce that ensure the request cannot be repeatedly executed. Each form request(signup/login/password reset) are initiated and identifiable.

### API calls to the backend
API calls to the backend are authenticated via the Oathkeeper proxy, they are made to the backend with `credentials: include`
```javascript
fetch(uri,{ credentials : "include" });
```
This will pass along `same-origin`'s cookie along with the request, and through Oathkeeper Proxy will inspect the Cookie against Kratos for authenticity and expiry, and upon unauthenticated request it will return `401 Unauthorized` and request **will not** make it to the backend service.


[kratos]: https://github.com/ory/kratos
[oathkeeper]: https://github.com/ory/oathkeeper
[csrf]:https://owasp.org/www-community/attacks/csrf