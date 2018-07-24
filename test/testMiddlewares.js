const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const ObjectId = mongoose.Types.ObjectId;

const checkAuth = require('../api/middleware/checkAuth');
const loadNodeWithPermssion = require('../api/middleware/loadNodeWithPermssion');

process.env.JWT_KEY = 'secret';

describe('Test middlewares', function() {
    var server;
    var app;
    var router;

    // Middleware test is run independently,
    // so another express app is initialized for testing.
    before(function () {
        app = express();
        router = express.Router();

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    });

    // New server is allocated per each suite(checkAuth, checkPerms, ...)
    beforeEach(function (done) {
        app.use(router);
        server = app.listen(function (err){
            if (err) return done(err);
            done();
        });
    });

    afterEach(function() {
        server.close();
    });


    describe('Test "checkAuth" middleware', function () {
        const User = require("../api/models/userModel");

        before(function() {
            router.route('/').get(
                checkAuth,
                function(req, res) {
                    // After passed 'checkAuth' middleware,
                    // userData is saved to `res.locals.userData`.
                    let user = new User(res.locals.userData);
                    return res.json({'user': user});
                }
            );
        });

        it('Send request without Authorization', function () {
            return supertest(app)
                .get('/')
                .expect(401);
        });

        it('Send request with wrong Authorization', function () {
            return supertest(app)
                .get('/')
                .set('Authorization', 'something_wrong')
                .expect(401);
        });

        it('Send request with wrong token', function () {
            return supertest(app)
                .get('/')
                .set('Authorization', 'Bearer wrong_token')
                .expect(401);
        });

        it('Send request with correct token', function () {
            let payload = {'name': 'User'};
            let token = jwt.sign(payload, process.env.JWT_KEY);

            return supertest(app)
                .get('/')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .then(response => {
                    assert(response.body.user != null);
                    assert.equal(response.body.user.name, 'User');
                })
        });
    });




    describe('Test "loadNodeWithPermssion" middleware', function () {
        const responseNode = (req, res) => {
            return res.json({'node': req.node});
        };
        describe('By normal user', function () {
            before(function() {
                const setAuthToNormalUser = (req, res, next) => {
                    res.locals.userData = {'_id': '100000000000000000000001', 'name': 'User'};
                    next();
                };
                router.route('/node').post(setAuthToNormalUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').get(setAuthToNormalUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').put(setAuthToNormalUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').delete(setAuthToNormalUser, loadNodeWithPermssion, responseNode);
            });

            // CRUD permission of Forum
            it('Create Forum', function () {
                // Only Admin can create forum
                return supertest(app)
                    .post('/node')
                    .send({type: 'Forum'})
                    .expect(403);
            });
            it('Read Forum', function () {
                return supertest(app)
                    .get('/node/200000000000000000000000')
                    .expect(200);
            });
            it('Update Forum', function () {
                return supertest(app)
                    .put('/node/200000000000000000000001')
                    .send({title: 'Some Title'})
                    .expect(403);
            });
            it('Delete Forum', function () {
                return supertest(app)
                    .delete('/node/200000000000000000000001')
                    .expect(403);
            });


            // CRUD permission of Topic
            it('Create Topic', function () {
                return supertest(app)
                    .post('/node')
                    .send({type: 'Topic', title: 'MyTopic'})
                    .expect(200)
                    .then(response => {
                        assert(response.body.node != null);
                    })
            });
            it('Read Topic', function () {
                return supertest(app)
                    .get('/node/200000000000000000000002')
                    .expect(200)
                    .then(response => {
                        assert(response.body.node != null)
                    });
            });
            it('Update Topic', function () {
                return supertest(app)
                    .put('/node/200000000000000000000002')
                    .send({title: 'NewTitle'})
                    .expect(200)
                    .then(response => {
                        assert(response.body.node != null)
                    });
            });
            it('Delete Topic', function () {
                return supertest(app)
                    .delete('/node/200000000000000000000002')
                    .expect(200);
            });
        });
    });
});
