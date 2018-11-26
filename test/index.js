const should = require('should');
const mocha = require('mocha');
const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../index');

const appTester = zapier.createAppTester(App);

mocha.describe('My App', () => {
  mocha.it('Should test call notifications', (done) => {
    const bundle = {};

    appTester(App.triggers.call_notification.operation.perform, bundle)
      .then((results) => {
        should(results.length).eql(1);

        const firstResult = results[0];
        should(firstResult.status).eql('ringing');
        should(firstResult.direction).eql('inbound');

        done();
      })
      .catch(done);
  });
});
