// Start mock data
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const sleep = (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time))

// To update this data, visit http://127.0.0.1:4455/auth/login. Copy the request id in redirected URL and run
// curl "http://127.0.0.1:4434/self-service/browser/flows/requests/login?request=<request_id>" | jq
const LOGIN_FLOW_RESPONSE_JSON = {
  id: '2f6a8583-2364-48eb-8064-58b28618f79b',
  expires_at: '2020-08-06T20:29:45.1110286Z',
  issued_at: '2020-08-06T20:19:45.1110449Z',
  request_url: 'http://kratos:4433/self-service/browser/flows/login',
  messages: null,
  methods: {
    password: {
      method: 'password',
      config: {
        action:
          'http://127.0.0.1:4455/.ory/kratos/public/self-service/browser/flows/login/strategies/password?request=2f6a8583-2364-48eb-8064-58b28618f79b',
        method: 'POST',
        fields: [
          {
            name: 'identifier',
            type: 'text',
            required: true,
            value: '',
          },
          {
            name: 'password',
            type: 'password',
            required: true,
          },
          {
            name: 'csrf_token',
            type: 'hidden',
            required: true,
            value:
              'FxigGGWIBisxTjH2677AxOO412OaJDoKdEFGbLscwAl5fbWry0/FwvYW3ToxRRRwptupH0eLMeCtEllkH0GsSg==',
          },
        ],
      },
    },
  },
  forced: false,
}

// To update this data, visit http://127.0.0.1:4455/auth/registration. Copy the request id in redirected URL and run
// curl "http://127.0.0.1:4434/self-service/browser/flows/requests/registration?request=<request_id>" | jq
const REGISTRATION_FLOW_RESPONSE_JSON = {
  id: '21b9e7aa-ea14-4869-b827-46c49996bb1f',
  expires_at: '2020-08-06T22:35:06.9806823Z',
  issued_at: '2020-08-06T22:25:06.9806982Z',
  request_url: 'http://kratos:4433/self-service/browser/flows/registration',
  messages: null,
  methods: {
    password: {
      method: 'password',
      config: {
        action:
          'http://127.0.0.1:4455/.ory/kratos/public/self-service/browser/flows/registration/strategies/password?request=21b9e7aa-ea14-4869-b827-46c49996bb1f',
        method: 'POST',
        fields: [
          {
            name: 'csrf_token',
            type: 'hidden',
            required: true,
            value:
              'vWR7mazd0+O6qb0NctGf52srUz7ROSZ4oDlGEoQK+vvTAW4qAhoQCn3xUcGoKktTLkgtQgyWLZJ5alkaIFeWuA==',
          },
          {
            name: 'password',
            type: 'password',
            required: true,
          },
          {
            name: 'traits.email',
            type: 'email',
          },
        ],
      },
    },
  },
}

// End mock data

async function getAuthFlowData(flowType, requestId) {
  // TODO: wire up api call
  return sleep(getRandomInt(1200)).then(() => {
    switch (flowType) {
      case 'login':
        return LOGIN_FLOW_RESPONSE_JSON
      case 'registration':
        return REGISTRATION_FLOW_RESPONSE_JSON
      default:
        console.error('getFlowData: unknown case', flowType)
    }
  })
}

export { getAuthFlowData }
