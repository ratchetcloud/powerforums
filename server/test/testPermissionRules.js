const canCreateForum = require('../permissionRules/canCreateForum');
const canCreateTopic = require('../permissionRules/canCreateTopic');
const canCreateReply = require('../permissionRules/canCreateReply');
const canDeleteForum = require('../permissionRules/canDeleteForum');
const canDeleteTopic = require('../permissionRules/canDeleteTopic');
const canDeleteReply = require('../permissionRules/canDeleteReply');
const canSetSticky   = require('../permissionRules/canSetSticky');
const defaultGuest   = require('../permissionRules/defaultGuest');
const defaultSignupedUser = require('../permissionRules/defaultSignupedUser');
const canGrantPermissions = require('../permissionRules/canGrantPermissions');

// Test permissionRules
describe('Test permissionRules', function () {
    const canCreateForumReq = { method: 'POST', node: { type: 'Forum' } };
    const canCreateTopicReq = { method: 'POST', node: { type: 'Topic' } };
    const canCreateReplyReq = { method: 'POST', node: { type: 'Reply' } };
    const canDeleteForumReq = { method: 'DELETE', 
                                node: { type: 'Forum',
                                        authorInformation: { _id: '100000000000000000000001' } } };
    const canDeleteTopicReq = { method: 'DELETE', 
                                node: { type: 'Topic',
                                        authorInformation: { _id: '100000000000000000000001' } } };
    const canDeleteReplyReq = { method: 'DELETE', 
                                node: { type: 'Reply',
                                        authorInformation: { _id: '100000000000000000000001' } } };
    const canSetStickyReq = { method: 'PATCH', body: { sticky: true } };
    const updateNodeReq = { method: 'PATCH', 
                            node: { authorInformation: { _id: '100000000000000000000001'}}};
    const readNodeReq = { method: 'GET' };

    describe('Test with proper request', function() {
        it('canCreateForum', function () {
            assert(canCreateForum(canCreateForumReq));
        });
        it('canCreateTopic', function () {
            assert(canCreateTopic(canCreateTopicReq));
        });
        it('canCreateReply', function () { 
            assert(canCreateReply(canCreateReplyReq));
        });
        it('canDeleteForum', function () { 
            assert(canDeleteForum(canDeleteForumReq));
        });
        it('canDeleteTopic', function () {
            assert(canDeleteTopic(canDeleteTopicReq));
        });
        it('canDeleteReply', function () {
            assert(canDeleteReply(canDeleteReplyReq));
        });
        it('canSetSticky', function () {
            assert(canSetSticky(canSetStickyReq));
        });
    });

    describe('Test with improper request', function() {
        it('canCreateForum', function () {
            assert(!canCreateForum(canCreateTopicReq));
        });
        it('canCreateTopic', function () {
            assert(!canCreateTopic(canCreateReplyReq));
        });
        it('canCreateReply', function () { 
            assert(!canCreateReply(canCreateForumReq));
        });
        it('canDeleteForum', function () { 
            assert(!canDeleteForum(canDeleteTopicReq));
        });
        it('canDeleteTopic', function () {
            assert(!canDeleteTopic(canDeleteReplyReq));
        });
        it('canDeleteReply', function () {
            assert(!canDeleteReply(canDeleteForumReq));
        });
        it('canSetSticky', function () {
            assert(!canSetSticky(updateNodeReq));
        });
    });

    describe('Test defaultSignupedUser', function() {
        const user = global.normalUser;

        it('testCreateForum', function () {
            assert(!defaultSignupedUser(canCreateForumReq, user));
        });
        it('testCreateTopic', function () {
            assert(defaultSignupedUser(canCreateTopicReq, user));
        });
        it('testCreateReply', function () { 
            assert(defaultSignupedUser(canCreateReplyReq, user));
        });

        it('testDeleteOwn', function () {
            assert(defaultSignupedUser(canDeleteTopicReq, user));
        });
        it('testDeleteOthers', function () {
            assert(!defaultSignupedUser(canDeleteReplyReq, user));
        });
        it('testSetSticky', function () {
            assert(!defaultSignupedUser(canSetStickyReq, user));
        });
        it('testReadNode', function () {
            assert(defaultSignupedUser(readNodeReq, user));
        })
    });

    describe('Test defaultGuest', function() {
        it('canCreateForum', function () {
            assert(!defaultGuest(canCreateForumReq));
        });
        it('canCreateTopic', function () {
            assert(!defaultGuest(canCreateTopicReq));
        });
        it('canCreateReply', function () { 
            assert(!defaultGuest(canCreateReplyReq));
        });
        it('canDeleteForum', function () { 
            assert(!defaultGuest(canDeleteForumReq));
        });
        it('canDeleteTopic', function () {
            assert(!defaultGuest(canDeleteTopicReq));
        });
        it('canDeleteReply', function () {
            assert(!defaultGuest(canDeleteReplyReq));
        });
        it('canSetSticky', function () {
            assert(!defaultGuest(canSetStickyReq));
        });
        it('testReadNode', function () {
            assert(defaultSignupedUser(readNodeReq));
        })
    });
});