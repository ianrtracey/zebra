const appName = "event";
const serverPort = process.env.PORT || 3123;

const completeConfig = {
  default: {
    appName,
    serverPort,
    databaseUrl:
      process.env.DATABASE_URL || `postgresql://localhost/${appName}`,
    jsonOptions: {
      headers: {
        "Content-Type": "application/json"
      }
    }
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`
  },

  production: {
    appUrl: `https://sleepy-chamber-96473.herokuapp.com/`
  }
};

// Public API
module.exports = {
  config: {
    ...completeConfig.default,
    ...completeConfig[process.env.NODE_ENV]
  },
  completeConfig
};
