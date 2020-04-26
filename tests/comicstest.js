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

describe('GET /api/comics/:id', function () {
    it('respond with json containing a single comic', function (done) {
        request(app)
            .get('/api/comics/5ea32427a3afc38fafdf34cb')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('respond with json comic not found', function (done) {
        request(app)
            .get('/api/comics/12345678')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect({success: false,error:'NOT FOUND'}) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with json comic Bad Request wrong id format', function (done) {
        request(app)
            .get('/api/comics/1234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400) //expecting HTTP status code
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
describe('GET /api/creators', function () {
    it('respond with json containing a list of all creators', function (done) {
        request(app)
            .get('/api/comics')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/creators/:id', function () {
    it('respond with json containing a single creator', function (done) {
        request(app)
            .get('/api/creators/5ea3201768056806a1c7da8b')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('respond with json creator not found', function (done) {
        request(app)
            .get('/api/creators/12345678')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect({success: false,error:'NOT FOUND'}) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with json creator Bad Request wrong id format', function (done) {
        request(app)
            .get('/api/creators/1234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400) //expecting HTTP status code
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


describe('GET /api/comics/stories/:id', function () {
    it('respond with json containing stories from a comic', function (done) {
        request(app)
            .get('/api/comics/5ea32427a3afc38fafdf34cb')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('respond with json stories not found', function (done) {
        request(app)
            .get('/api/comics/stories/12345678')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
    it('respond with json stories Bad Request wrong id format', function (done) {
        request(app)
            .get('/api/comics/stories/1234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400) //expecting HTTP status code
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
// describe('GET /api/comics/characters/:id', function () {
//     it('respond with json containing characters from a comic', function (done) {
//         request(app)
//             .get('/api/comics/5ea32427a3afc38fafdf34cb')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });

//     it('respond with json characters not found', function (done) {
//         request(app)
//             .get('/api/comics/characters/12345678')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(404) //expecting HTTP status code
//             .expect({success: false,error:'NOT FOUND'}) // expecting content value
//             .end((err) => {
//                 if (err) return done(err);
//                 done();
//             });
//     });
// });

describe('Login /api/login', function () {
    let data = {
        "email": "njoro@gmail.com",
        "password": "123"
        
    }
    let wrongdata = {
        "email": "njoro@fake.com",
        "password": "fake"
        
    }
    it('respond with successful login', function (done) {
        request(app)
            .post('/api/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with wrong creditials', function (done) {
        request(app)
            .post('/api/login')
            .send(wrongdata)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with no creditials sent', function (done) {
        request(app)
            .post('/api/login')
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

// describe('Login', () => {
//  it('succeeds with correct credentials', async () => {
//    const response = await post(`login`, demoUser)
//      .expect(200);
//     expect(res.body.user.email).toBe(demoUser.email);
//   });
//  it('fails with invalid credentials', async () => {
//    const user = {email:'notarealmail@mycompany.com', password: 'somepassword'};
//    await post(`login`, user)
//      .expect(401);
//   });
//  it('fails with missing credentials', async () => {
//    const user = {};
//    await post(`login`, user)
//      .expect(401);
//   });
// });