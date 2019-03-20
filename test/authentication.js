require('should');
const mocha = require('mocha');
const zapier = require('zapier-platform-core');
const nock = require('nock');
const App = require('../index');

const appTester = zapier.createAppTester(App);

mocha.describe('test auth app', () => {
  mocha.it('automatically has Authorize Header add', (done) => {
    // Try changing the values of username or password to see how the test method behaves
    const bundle = {
      authData: {
        email: 'user@example.com',
        token: '1234567890abct',
      },
    };

    // mocks the next request that matches this url and querystring
    nock(`${process.env.PLATFORM_URL}`)
      .get('/api/permission/systemuser/profile/')
      .reply(200, []);

    appTester(App.authentication.test, bundle)
      .then((response) => {
        response.status.should.eql(200);
        // response.request.headers.Authorization.should.eql('Basic dXNlcjpzZWNyZXQ=');
        done();
      })
      .catch(done);
  });
});
