const zapier = require('zapier-platform-core');

zapier.tools.env.inject();

/**
 * This function will try to get the user profile. It will look at the status
 * code of the response. If it is a 401 or 403 it is rejected.
 * Otherwise we just assume it succeeded.
 *
 * @param z The Z object.
 * @param bundle An object containing metadata and auth data.
 * @returns {Promise<T | never>}
 */
const test = (z, bundle) => z.request({
  url: `${process.env.PLATFORM_URL}/api/permission/systemuser/profile/`,
}).then(response => response);

/**
 * See: https://zapier.github.io/zapier-platform-cli/#authentication
 * Remember this is config code and as such ${process.env.*} will come from
 * your local .env file
 * @TODO: INT-9 get environment expansion working.
 */
const authentication = {
  type: 'custom',
  fields: [
    {
      key: 'email',
      label: 'Email address',
      helpText: 'The email address to log in.',
      required: true,
      type: 'string',
    },
    {
      key: 'token',
      label: 'API Token',
      helpText: `You can find the API token here: ${process.env.PLATFORM_URL}/user/personal_settings/`,
      required: true,
      type: 'string',
    },
  ],
  test,
  connectionLabel: () => '{{email}}',
};

module.exports = authentication;
