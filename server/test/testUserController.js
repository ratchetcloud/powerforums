const supertest = require('supertest');
const bcrypt = require("bcrypt");

describe('Test userController', function() {

    it('Login with correct data', function () {
        const payload = {
            email: 'user1@openforum.org',
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
            .send({email: 'non-existing@openforum.org', password: 'password'})
            .expect(401);
    });

    it('Login with wrong password', function () {
        return supertest(app)
            .post('/user/login')
            .send({email: 'user1@openforum.org', password: 'wrong-password'})
            .expect(401);
    });

    it('Signup with all filled data', function() {
        const payload = {
            name: 'testname',
            email: 'test@test.com',
            password: 'password'
        };

        return supertest(app)
            .put('/user/signup')
            .send(payload)
            .expect(201)
            .then(response => {
                assert(response.body.name === payload.name);
                assert(response.body.email === payload.email);
                bcrypt.compare(response.body.password, payload.password, (err, result) => {
                    if (err || !result)
                        return false;
                    return true;
                });
            });

    });

    it('Signup with missing field', function() {
        return supertest(app)
            .put('/user/signup')
            .send({name: 'missing', password: 'parameter'})
            .expect(400);
    });

    it('Signup with invalid email format', function() {
        return supertest(app)
            .put('/user/signup')
            .send({name: 'testname', email: 'invalidformat', password: 'password'})
            .expect(500);
    });

    it('Signup with duplicate email', function () {
        return supertest(app)
            .put('/user/signup')
            .send({name: 'duplicateuser', email: 'user1@openforum.org', password: 'password'})
            .expect(500);
    });


    // TODO: user_create, user_getById, user_getPaginated, user_delete
});