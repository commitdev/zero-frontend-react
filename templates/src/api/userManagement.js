// Just for mocking purposes...
const sleep = (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time))

/**
 * Attempt to login to account with given credentials
 * @param {string} email
 * @param {string} password
 */
async function login(email, password) {
  if (!email || !password) {
    throw new Error('Missing email and/or password')
  }

  // TODO: wire up api call
  return sleep(1000).then(() => ({
    user: {
      email,
    },
    token: 'fakeToken',
  }))
}

/**
 * Logout of current account
 */
async function logout() {
  // TODO: wire up api call
}

export { login, logout }
