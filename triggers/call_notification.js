// Trigger stub created by 'zapier convert'. This is just a stub - you will need to edit!
const zapier = require('zapier-platform-core');

zapier.tools.env.inject();

const callNotification = {
  id: 1,
  call_id: '1234c56789f-0987654.321',
  caller: {
    account_number: null,
    name: 'John Doe',
    number: '+31xxxxxxxxxx',
    user_numbers: [],
  },
  destination: {
    number: '+31xxxxxxxxxx',
    targets: [
      {
        account_number: 234,
        name: 'Alice',
        number: '+31xxxxxxxxxx',
        user_numbers: ['678'],
      },
      {
        account_number: 456,
        name: 'Bob',
        number: '+31xxxxxxxxxx',
        user_numbers: ['789'],
      },
    ],
  },
  direction: 'inbound',
  status: 'ringing',
  reason: '',
  timestamp: '2017-01-01T01:00:00+00:00',
  version: 'v2',
};

/**
 * Performs the subscription to the platform.
 * This function gets called from the Zapier platform to create a hook for our
 * call notifications.
 *
 * @param z The Z object
 * @param bundle Has the necessary information of the hook to call.
 * @returns {Promise<T | never>
 */
const subscribeHook = (z, bundle) => {
  // bundle.targetUrl has the Hook URL this app should call when a new
  // call notification event occurs.
  if (!bundle.targetUrl) {
    throw new Error('Zapier didn\'t provide a valid URL to call');
  }
  const data = {
    target_url: bundle.targetUrl,
    event: 'custom',
  };

  const options = {
    url: `${process.env.PLATFORM_URL}/api/callnotification/callnotification/`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${bundle.authData.email}:${bundle.authData.token}`,
    },
    body: JSON.stringify(data),
  };

  // You may return a promise or a normal data structure from any perform method.
  return z.request(options)
    .then((response) => {
      if (response.status === 403) {
        z.console.log('403 Not the correct rights');
        throw new Error('Do you have the correct rights?');
      }
      if (!response.content) {
        return '{}';
      }
      return JSON.parse(response.content);
    });
};

/**
 * Performs the unsubscription to the platform.
 * This function gets called from the Zapier platform to remove a hook from our
 * call notifications.
 * @param z The Z object.
 * @param bundle Contains the hookId to which to unsubscribe.
 * @returns {Promise<void | never>}
 */
const unsubscribeHook = (z, bundle) => {
  const hookId = bundle.subscribeData.id;

  const options = {
    url: `${process.env.PLATFORM_URL}/api/callnotification/callnotification/${hookId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${bundle.authData.email}:${bundle.authData.token}`,
    },
  };

  // You may return a promise or a normal data structure from any perform method.
  return z.request(options)
    .then(response => z.console.log(response));
};

/**
 * Is called when a callNotification happens.
 * @param z The Z object.
 * @param bundle Contains the information about the call.
 * @returns {*}
 */
const getCallNotification = (z, bundle) => {
  if (bundle.cleanedRequest) {
    return [bundle.cleanedRequest];
  }

  return [callNotification];
};

const getFallbackCallNotification = () => [callNotification];

module.exports = {
  key: 'call_notification',
  noun: 'Call',

  display: {
    label: 'New Call Notification',
    description: 'Triggers when a new call notification occurs.',
    hidden: false,
    important: false,
  },

  operation: {
    type: 'hook',
    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,

    inputFields: [
      {
        key: 'call_notification',
        label: 'Call Notification',
        type: 'string',
        required: false,
      },
    ],
    outputFields: [
      {
        key: 'id',
        type: 'string',
      },
      {
        key: 'call_id',
        type: 'string',
      },
      {
        key: 'caller__account_number',
        type: 'string',
      },
      {
        key: 'caller__name',
        type: 'string',
      },
      {
        key: 'caller__number',
        type: 'string',
      },
      {
        key: 'caller__user_numbers',
        type: 'string',
      },
      {
        key: 'destination__number',
        type: 'string',
      },
      {
        key: 'destination__targets',
        type: 'string',
      },
      {
        key: 'destination__targets[]account_number',
        type: 'string',
      },
      {
        key: 'destination__targets[]name',
        type: 'string',
      },
      {
        key: 'destination__targets[]number',
        type: 'string',
      },
      {
        key: 'destination__targets[]user_numbers',
        type: 'string',
      },
      {
        key: 'direction',
        type: 'string',
      },
      {
        key: 'status',
        type: 'string',
      },
      {
        key: 'reason',
        type: 'string',
      },
      {
        key: 'timestamp',
        type: 'string',
      },
      {
        key: 'version',
        type: 'string',
      },
    ],
    perform: getCallNotification,
    performList: getFallbackCallNotification,
    sample: callNotification,
  },
};
