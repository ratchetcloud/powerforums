const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");

const checkAuth = require('../api/middleware/checkAuth');
const loadNodeWithPermssion = require('../api/middleware/loadNodeWithPermssion');

describe('Test middlewares', function() {
    var server;
    var app;
    var router;

    // To test middleware independently,
    // initialize new express app per each test
    // [Notice] you need to initialize `router` before running suite.
    beforeEach(function (done) {
        app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(router);

        server = app.listen(function (err){
            if (err) return done(err);
            done();
        });
    });

    afterEach(function() {
        server.close();
    });


    // API server's authorization system is implemented with `jwt`,
    // using 'Authorization' header.
    // After token is validated, user data is saved in `res.locals.userData`,
    // so other middleware or controllers can use this value.
    describe('Test "checkAuth" middleware', function () {
        const User = require("../api/models/userModel");

        before(function() {
            router = express.Router();
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
            let payload = global.normalUser;
            let token = jwt.sign(payload, global.JWT_KEY);

            return supertest(app)
                .get('/')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .then(response => {
                    assert(response.body.user != null);
                    assert.equal(response.body.user._id, global.normalUser._id);
                    assert.equal(response.body.user.name, global.normalUser.name);
                })
        });
    });



    // [Notice] This test script only test `middleware`, not controller,
    // so there is no change to database after running tests.
    describe('Test "loadNodeWithPermssion" middleware', function () {
        const responseNode = (req, res) => {
            return res.json({'node': req.node});
        };

        describe('By normal user', function () {
            before(function() {
                const setAuthAsNormalUser = (req, res, next) => {
                    res.locals.userData = global.normalUser;
                    next();
                };
                router = express.Router();
                router.route('/node').post(setAuthAsNormalUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').get(setAuthAsNormalUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').patch(setAuthAsNormalUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').delete(setAuthAsNormalUser, loadNodeWithPermssion, responseNode);
            });

            // Normal user can read forum, but cannot create, update or delete,
            // only admin can create it.
            it('Create Forum', function () {
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
                    .patch('/node/200000000000000000000001')
                    .send({title: 'Some Title'})
                    .expect(403);
            });
            it('Delete Forum', function () {
                return supertest(app)
                    .delete('/node/200000000000000000000001')
                    .expect(403);
            });


            // Normal user can read and create topic,
            // and also update and delete topic whose owner is that user.
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
                    .patch('/node/200000000000000000000002')
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


        // Admin has powerful permission.
        // TODO: Scoped-admin (like game owner, game moderator...)
        describe('By admin user', function () {
            before(function () {
                const setAuthAsAdminUser = (req, res, next) => {
                    res.locals.userData = global.adminUser;
                    next();
                };
                router = express.Router();
                router.route('/node').post(setAuthAsAdminUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').get(setAuthAsAdminUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').patch(setAuthAsAdminUser, loadNodeWithPermssion, responseNode);
                router.route('/node/:nodeId').delete(setAuthAsAdminUser, loadNodeWithPermssion, responseNode);
            });
            it('Create Forum', function () {
                return supertest(app)
                    .post('/node')
                    .send({type: 'Forum'})
                    .expect(200);
            });
            it('Update Forum', function () {
                // Admin can't. Only owner can update forum.
                return supertest(app)
                    .patch('/node/200000000000000000000000')
                    .send({title: 'Some Title'})
                    .expect(403);
            });
            it('Delete Forum', function () {
                return supertest(app)
                    .delete('/node/200000000000000000000001')
                    .expect(200);
            });

        });
    });
});
