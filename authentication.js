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
const test = (z, bundle) => {
  z.request({
    url: `${process.env.PLATFORM_URL}/api/permission/systemuser/profile/`,
    headers: {
      Authorization: `Token ${bundle.authData.email}:${bundle.authData.token}`,
    },
  }).then((response) => {
    if (response.status === 400) {
      z.console.log('A bad request status happened while trying the URL');
      throw new Error('400 Bad request');
    }
    else if (response.status === 401) {
      z.console.log('Oops, got a 401');
      throw new Error('The username and/or password you supplied is incorrect');
    } else if (response.status === 403) {
      z.console.log('This url is forbidden');
      throw new Error('You are not allowed to access this URL');
    }
    z.console.log(response);
    return response;
  });
};

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
