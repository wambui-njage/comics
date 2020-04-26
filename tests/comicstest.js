const request = require('supertest');
const app = require('../index');


describe('GET /api/comics', function () {
    it('respond with json containing a list of all available comics', function (done) {
        request(app)
            .get('/api/comics')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});