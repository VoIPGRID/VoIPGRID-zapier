const platform = require('zapier-platform-core');
const authentication = require('./authentication');
const CallNotificationTrigger = require('./triggers/call_notification');
const zapierApp = require('./package.json');

const App = {
  version: zapierApp.version,

  platformVersion: platform.version,

  authentication,

  beforeRequest: [],

  afterResponse: [],

  resources: {},

  triggers: {
    [CallNotificationTrigger.key]: CallNotificationTrigger,
  },

  searches: {},

  creates: {},
};

module.exports = App;
