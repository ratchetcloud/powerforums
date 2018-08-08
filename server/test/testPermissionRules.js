const canCreateForum = require('../permissionRules/canCreateForum');
const canDeleteForum = require('../permissionRules/canDeleteForum');
const canDeleteTopic = require('../permissionRules/canDeleteTopic');
const canDeleteReply = require('../permissionRules/canDeleteReply');
const canSetSticky = require('../permissionRules/canSetSticky');
const defaultGuest   = require('../permissionRules/defaultGuest');
const defaultSignupedUser = require('../permissionRules/defaultSignupedUser');

const request = require('./fixtures/requests');

// Test permissionRules
describe('Test permissionRules', function () {

    describe('Test with proper request', function() {
        // canCreateForum rule require method is POST and type is forum.
        it('canCreateForum', function () {
            assert(canCreateForum(request['createForum']) === true);
        });
        // canDeleteForum rule require method is DELETE and type is forum.
        it('canDeleteForum', function () { 
            assert(canDeleteForum(request['deleteForum']) === true);
        });
        // canDeleteForum rule require method is DELETE and type is topic.
        it('canDeleteTopic', function () {
            assert(canDeleteTopic(request['deleteTopic']) === true);
        });
        // canDeleteForum rule require method is DELETE and type is reply.
        it('canDeleteReply', function () {
            assert(canDeleteReply(request['deleteReply']) === true);
        });
        // canSetSticky rule require request body has only sticky element.
        it('canSetSticky', function () {
            assert(canSetSticky(request['setSticky']) === true);
        });
    });

    describe('Test with improper request', function() {
        // If request type is not forum, it should return false.
        it('canCreateForum with invalid type', function () {
            assert(canCreateForum(request['createTopic']) === false);
        });
        // If request method is not POST, it should return false.
        it('canCreateForum with invalid method', function () {
            assert(canCreateForum(request['deleteForum']) === false);
        });
        // If request type is not forum, it should return false.
        it('canDeleteForum with invalid type', function () { 
            assert(canDeleteForum(request['deleteTopic']) === false);
        });
        // If request method is not DELETE, it should return false.
        it('canDeleteForum with invalid method', function () { 
            assert(canDeleteForum(request['createForum']) === false);
        });
        // If request type is not topic, it should return false.
        it('canDeleteTopic with invalid type', function () {
            assert(canDeleteTopic(request['deleteReply']) === false);
        });
        // If request method is not DELETE, it should return false.
        it('canDeleteTopic with invalid method', function () {
            assert(canDeleteTopic(request['createTopic']) === false);
        });
        // If request type is not reply, it should return false.
        it('canDeleteReply with invalid type', function () {
            assert(canDeleteReply(request['deleteForum']) === false);
        });
        // If request method is not DELETE, it should return false.
        it('canDeleteReply with invalid method', function () {
            assert(canDeleteReply(request['createReply']) === false);
        });
        // If request body includes other elements except sticky, it should return false.
        it('canSetSticky', function () {
            request['setSticky'].body.content = 'improper request';
            assert(canSetSticky(request['setSticky']) === false);
        });
    });

    // Test about defaultSignupedUser rule
    // can create topic and reply, not forum
    // can read all nodes
    // can update their own node
    // can delete their own node
    // can't stick nodes
    describe('Test defaultSignupedUser', function() {

        it('testCreateForum', function () {
            assert(defaultSignupedUser(request['createForum'], global.normalUser) === false);
        });
        it('testCreateTopic', function () {
            assert(defaultSignupedUser(request['createTopic'], global.normalUser) === true);
        });
        it('testCreateReply', function () {
            assert(defaultSignupedUser(request['createReply'], global.normalUser) === true);
        });
        it('testReadNode', function () {
            assert(defaultSignupedUser(request['readNode'], global.normalUser) === true);
        })
        it('testUpdateOwn', function () {
            assert(defaultSignupedUser(request['updateNode'], global.normalUser) === true);
        });
        it('testUpdateOthers', function () {
            request['updateNode'].node.authorInformation._id = '100000000000000000000002'
            assert(defaultSignupedUser(request['updateNode'], global.normalUser) === false);
        });
        it('testDeleteOwn', function () {
            assert(defaultSignupedUser(request['deleteTopic'], global.normalUser) === true);
        });
        it('testDeleteOthers', function () {
            request['deleteTopic'].node.authorInformation._id = '100000000000000000000002'
            assert(defaultSignupedUser(request['deleteTopic'], global.normalUser) === false);
        });
        it('testSetSticky', function () {
            assert(defaultSignupedUser(request['setSticky'], global.normalUser) === false);
        });
    });

    // Test about defaultGuest rule
    // defaultGuest rule permits only read(method: GET). 
    describe('Test defaultGuest', function() {
        it('test method POST', function () {
            assert(defaultGuest(request['createTopic']) === false);
        });
        it('test method GET', function () {
            assert(defaultGuest(request['readNode']) === true);
        })
        it('test method PUT/PATCH', function () {
            assert(defaultGuest(request['updateNode']) === false);
        });
        it('test method DELETE', function () {
            assert(defaultGuest(request['deleteTopic']) === false);
        });
    });
});