const platform = require('zapier-platform-core');
const authentication = require('./authentication');
const CallNotificationTrigger = require('./triggers/call_notification');
const zapierApp = require('./package.json');

/**
 * Adds the authentication header to the request.
 * @param request The request data.
 * @param z The Z object.
 * @param bundle An object containing the metadata.
 * @returns {*}
 */
const addAuthorizationHeader = (request, z, bundle) => {
  if (bundle.authData.email && bundle.authData.token) {
    request.headers.Authorization = `Token ${bundle.authData.email}:${bundle.authData.token}`;
  }

  return request;
};

/**
 * Checks the response code and throws any errors if something is wrong.
 * @param response The response that was returned
 * @param z The Z object
 * @param bundle An object containing the metadata
 * @returns {*}
 */
const processResponseCode = (response, z, bundle) => {
  z.console.log(`processResponseCode status: ${response.status}`);
  if (bundle.authData.token && bundle.authData.email) {
    if (response.status === 200) {
      // Do nothing, this is expected behaviour.
    } else if (response.status === 401) {
      z.console.log('401 Unauthorized status code detected.');
      throw new z.errors.HaltedError(`${bundle.authData.email} doesn't have the right credentials.`);
    } else if (response.status === 403) {
      z.console.log('403 Forbidden status code detected.');
      throw new z.errors.HaltedError(`${bundle.authData.email} access is forbidden.`);
    } else {
      z.console.log(`${response.status} status code remains unhandled.`);
      throw new z.errors.HaltedError('An unhandled exception occurred.');
    }
  }

  z.console.log(response);
  return response;
};

const App = {
  version: zapierApp.version,

  platformVersion: platform.version,

  authentication,

  beforeRequest: [addAuthorizationHeader],

  afterResponse: [processResponseCode],

  resources: {},

  triggers: {
    [CallNotificationTrigger.key]: CallNotificationTrigger,
  },

  searches: {},

  creates: {},
};

module.exports = App;
