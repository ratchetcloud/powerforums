const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const assert = require('assert');

process.env.JWT_KEY = 'secret';

describe('Test "checkAuth" middleware', function() {
    const checkAuth = require('../api/middleware/checkAuth');
    var app;
    var server;

    before(function (done) {
        app = express();

        let router = express.Router();
        router.route('/').get(checkAuth, function(req, res) {
            return res.json({'correct': true});
        });
        app.use(router);

        server = app.listen(function (err){
            if (err) return done(err);
            done();
        });
    });

    after(function() {
        server.close();
    });

    it('send request without Authorization', function () {
        return supertest(app)
            .get('/')
            .expect(401);
    });

    it('send request with wrong Authorization', function () {
        return supertest(app)
            .get('/')
            .set('Authorization', 'something_wrong')
            .expect(401);
    });

    it('send request with wrong token', function () {
        return supertest(app)
            .get('/')
            .set('Authorization', 'Bearer wrong_token')
            .expect(401);
    });

    it('send request with correct token', function () {
        let payload = {'a': 'b'};
        let token = jwt.sign(payload, process.env.JWT_KEY);

        return supertest(app)
            .get('/')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then(response => {
                assert.equal(response.body.correct, true)
            })
    });
});