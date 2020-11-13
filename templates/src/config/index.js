let config = {}

let env = process.env.REACT_APP_CONFIG || 'development'
config = require(`../config/${env}.json`)

export default config;
