const supertest = require('supertest');

describe('Test userController', function() {

    it('Login with correct data', function () {
        const payload = {
            username: 'User',
            password: 'password'
        };

        return supertest(app)
            .post('/user/login')
            .send(payload)
            .expect(200)
            .then(response => {
                assert(response.body.token.length > 0);
                assert(response.body.currentUser != null);
                assert(response.body.currentUser.name === payload.username);
            })
    });

    it('Login with non-existing username', function () {
        return supertest(app)
            .post('/user/login')
            .send({username: 'non-existing', password: 'password'})
            .expect(401);
    });

    it('Login with wrong password', function () {
        return supertest(app)
            .post('/user/login')
            .send({username: 'User', password: 'wrong-password'})
            .expect(401);
    });

    // TODO: user_create, user_getById, user_getPaginated, user_delete
});