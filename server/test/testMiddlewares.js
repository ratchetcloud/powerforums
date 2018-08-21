const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");

const checkAuth = require('../api/middleware/checkAuth');
const loadNodeWithPermission = require('../api/middleware/loadNodeWithPermission');
const request = require('./fixtures/requests');

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
                    let user = res.locals.userData ? new User(res.locals.userData) : null;
                    return res.json({'user': user});
                }
            );
        });
        it('Send request without Authorization', function () {
            return supertest(app)
                .get('/')
                .expect(200)
                .then(response => {
                    assert(response.body.user === null);
                });
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
    describe('Test "loadNodeWithPermission" middleware', function () {
        const responseNode = (req, res) => {
            return res.json({'node': req.node});
        };

        describe('By guest user', function () {
            before(function() {
                router = express.Router();
                router.route('/node').post(loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').get(loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').patch(loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').delete(loadNodeWithPermission, responseNode);
            });

            // Guest user can read forum only.
            it('Create Forum', function () {
                return supertest(app)
                    .post('/node')
                    .send(request['createForum'].body)
                    .expect(403);
            });
            it('Read Forum', function () {
                return supertest(app)
                    .get('/node/200000000000000000000000')
                    .expect(200);
            });
            it('Read Deleted Forum', function () {
                return supertest(app)
                    .get('/node/200000000000000000000006')
                    .expect(410);
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


            // Guest user can read topic only.
            it('Create Topic', function () {
                return supertest(app)
                    .post('/node')
                    .send(request['createTopic'].body)
                    .expect(403)
            });
            it('Read Topic', function () {
                return supertest(app)
                    .get('/node/200000000000000000000002')
                    .expect(200)
                    .then(response => {
                        assert(response.body.node != null)
                    });
            });
            it('Read Deleted Topic', function () {
                return supertest(app)
                    .get('/node/200000000000000000000007')
                    .expect(410)
            });
            it('Update Topic', function () {
                return supertest(app)
                    .patch('/node/200000000000000000000003')
                    .send({title: 'NewTitle'})
                    .expect(403)
            });
            it('Delete Topic', function () {
                return supertest(app)
                    .delete('/node/200000000000000000000003')
                    .expect(403);
            });
        });

        describe('By normal user', function () {
            before(function() {
                const setAuthAsNormalUser = (req, res, next) => {
                    res.locals.userData = global.normalUser;
                    next();
                };
                router = express.Router();
                router.route('/node').post(setAuthAsNormalUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').get(setAuthAsNormalUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').patch(setAuthAsNormalUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').delete(setAuthAsNormalUser, loadNodeWithPermission, responseNode);
            });

            // Normal user can read forum, but cannot create, update or delete,
            // only admin can create it.
            it('Create Forum', function () {
                return supertest(app)
                    .post('/node')
                    .send(request['createForum'].body)
                    .expect(403);
            });
            it('Read Forum', function () {
                return supertest(app)
                    .get('/node/200000000000000000000000')
                    .expect(200);
            });
            it('Read Deleted Forum', function () {
                return supertest(app)
                    .get('/node/200000000000000000000006')
                    .expect(410);
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
                    .send(request['createTopic'].body)
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
            it('Read Deleted Topic', function () {
                return supertest(app)
                    .get('/node/200000000000000000000007')
                    .expect(410)
            });
            it('Update Topic', function () {
                return supertest(app)
                    .patch('/node/200000000000000000000003')
                    .send({title: 'NewTitle'})
                    .expect(200)
                    .then(response => {
                        assert(response.body.node != null)
                    });
            });
            it('Delete Topic', function () {
                return supertest(app)
                    .delete('/node/200000000000000000000003')
                    .expect(200);
            });
        });


        // Admin has powerful permission.
        describe('By admin user', function () {
            before(function () {
                const setAuthAsAdminUser = (req, res, next) => {
                    res.locals.userData = global.adminUser;
                    next();
                };
                router = express.Router();
                router.route('/node').post(setAuthAsAdminUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').get(setAuthAsAdminUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').patch(setAuthAsAdminUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').delete(setAuthAsAdminUser, loadNodeWithPermission, responseNode);
            });
            it('Create Forum', function () {
                return supertest(app)
                    .post('/node')
                    .send(request['createForum'].body)
                    .expect(200);
            });
            it('Read Deleted Forum', function () {
                return supertest(app)
                    .get('/node/200000000000000000000006')
                    .expect(200);
            });
            it('Read Deleted Topic', function () {
                return supertest(app)
                    .get('/node/200000000000000000000007')
                    .expect(200)
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

        // Subadmin has partial permission.
        describe('By Scoped-admin user', function () {
            before(function () {
                const setAuthAsSubAdminUser = (req, res, next) => {
                    res.locals.userData = global.subadminUser;
                    next();
                };
                router = express.Router();
                router.route('/node').post(setAuthAsSubAdminUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').get(setAuthAsSubAdminUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').patch(setAuthAsSubAdminUser, loadNodeWithPermission, responseNode);
                router.route('/node/:nodeId').delete(setAuthAsSubAdminUser, loadNodeWithPermission, responseNode);
            });
            it('Create Forum under permitted node', function () {
                request['createForum'].body.parentId = '200000000000000000000001';
                request['createForum'].body.ancestorList = [ { _id: "200000000000000000000001",
                                                                  title: "Overwatch"} ];
                return supertest(app)
                    .post('/node')
                    .send(request['createForum'].body)
                    .expect(200);
            });
            it('Create Forum under not permitted node', function () {
                request['createForum'].body.parentId = '200000000000000000000004';
                // Subadmin can't create Forum under not permitted node
                return supertest(app)
                    .post('/node')
                    .send(request['createForum'].body)
                    .expect(403);
            });
            it('Update Forum', function () {
                // Subadmin can't also. Only owner can update forum.
                return supertest(app)
                    .patch('/node/200000000000000000000001')
                    .send({title: 'Some Title'})
                    .expect(403);
            });
            it('Delete Forum under permitted node', function () {
                // Subadmin can delete under permitted node.
                return supertest(app)
                    .delete('/node/200000000000000000000002')
                    .expect(200);
            });
            it('Delete permitted root node', function () {
                // Subadmin can't delete permitted root node.
                return supertest(app)
                    .delete('/node/200000000000000000000001')
                    .expect(403);
            });
            it('Delete not permitted node', function () {
                // Subadmin can't delete not permitted node.
                return supertest(app)
                    .delete('/node/200000000000000000000004')
                    .expect(403);
            });
            it('Read Deleted Topic with permission', function () {
                // Subadmin can read deleted node having permission
                return supertest(app)
                    .get('/node/200000000000000000000002')
                    .expect(200)
            });
            it('Read Deleted Topic without permission', function () {
                // Subadmin can't read deleted node not having permission
                return supertest(app)
                    .get('/node/200000000000000000000007')
                    .expect(410)
            });
        });

        // Banned user can read only.
        // TODO: fix checkPermission for banned user
        // describe('By banned user', function () {
        //     before(function () {
        //         const setAuthAsBannedUser = (req, res, next) => {
        //             res.locals.userData = global.bannedUser;
        //             next();
        //         };
        //         router = express.Router();
        //         router.route('/node').post(setAuthAsBannedUser, loadNodeWithPermission, responseNode);
        //         router.route('/node/:nodeId').get(setAuthAsBannedUser, loadNodeWithPermission, responseNode);
        //         router.route('/node/:nodeId').patch(setAuthAsBannedUser, loadNodeWithPermission, responseNode);
        //         router.route('/node/:nodeId').delete(setAuthAsBannedUser, loadNodeWithPermission, responseNode);
        //     });
        //     it('Create Topic', function () {
        //         return supertest(app)
        //             .post('/node')
        //             .send(request['createTopic'].body)
        //             .expect(403)
        //     });
        //     it('Read Topic', function () {
        //         return supertest(app)
        //             .get('/node/200000000000000000000002')
        //             .expect(200)
        //             .then(response => {
        //                 assert(response.body.node != null)
        //             });
        //     });
        //     it('Update Topic', function () {
        //         return supertest(app)
        //             .patch('/node/200000000000000000000005')
        //             .send({title: 'NewTitle'})
        //             .expect(403)
        //     });
        //     it('Delete Topic', function () {
        //         return supertest(app)
        //             .delete('/node/200000000000000000000005')
        //             .expect(403);
        //     });
            

        // });
    });
});
