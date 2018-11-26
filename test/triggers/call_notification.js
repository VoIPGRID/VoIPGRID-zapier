require('should');
const mocha = require('mocha');

const zapier = require('zapier-platform-core');
const App = require('../../index');

const appTester = zapier.createAppTester(App);

mocha.describe('Triggers - New Call Notification', () => {
  zapier.tools.env.inject();

  mocha.it('should get an array', (done) => {
    const bundle = {
      authData: {
        // TODO: Put your custom auth data here
      },

      inputData: {},
    };

    appTester(App.triggers.call_notification.operation.perform, bundle)
      .then((results) => {
        results.should.be.an.Array();
        results.should.be.length(1);
        done();
      })
      .catch(done);
  });
});
