const supertest = require('supertest');
const bcrypt = require("bcrypt");

describe('Test userController', function() {

    it('Login with correct data', function () {
        const payload = {
            email: 'user1@powerforums.io',
            password: 'password'
        };

        return supertest(app)
            .post('/user/login')
            .send(payload)
            .expect(200)
            .then(response => {
                assert(response.body.token.length > 0);
                assert(response.body.currentUser != null);
                assert(response.body.currentUser.email === payload.email);
            })
    });

    it('Login with non-existing username', function () {
        return supertest(app)
            .post('/user/login')
            .send({email: 'non-existing@powerforums.io', password: 'password'})
            .expect(401);
    });

    it('Login with wrong password', function () {
        return supertest(app)
            .post('/user/login')
            .send({email: global.normalUser.email, password: 'wrong-password'})
            .expect(401);
    });

    it('Sign up with all filled data', function(done) {
        const payload = {
            name: 'Jasper',
            email: 'jasper.kim@powerforums.io',
            password: 'password'
        };

        supertest(app)
            .put('/user/signup')
            .send(payload)
            .expect(201)
            .then(response => {
                assert(response.body.name === payload.name);
                assert(response.body.email === payload.email);
                bcrypt.compare(response.body.password, payload.password, (err, result) => {
                    if (err)
                        return done(err);
                    done();
                });
            });

    });

    it('Sign up with missing field', function() {
        return supertest(app)
            .put('/user/signup')
            .send({name: 'missing', password: 'parameter'})
            .expect(400);
    });

    it('Sign up with invalid email format', function() {
        return supertest(app)
            .put('/user/signup')
            .send({name: 'testname', email: 'invalid_format', password: 'password'})
            .expect(400);
    });

    it('Sign up with duplicate email', function () {
        return supertest(app)
            .put('/user/signup')
            .send({name: 'duplicate_user', email: global.normalUser.email, password: 'password31331'})
            .expect(400);
    });


    // TODO: user_create, user_getById, user_getPaginated, user_delete
});