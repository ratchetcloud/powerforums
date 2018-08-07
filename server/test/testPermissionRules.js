const expect = require('chai').expect;
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
    it('canCreateForum', function () {
        const canCreateForumReq = {
            method: 'POST',
            node: {
                type: 'Forum',
            }  
        }

        assert(canCreateForum(canCreateForumReq));
    });
    it('canCreateTopic', function () {
        const canCreateTopicReq = {
            method: 'POST',
            node: {
                type: 'Topic',
            }  
        }

        assert(canCreateTopic(canCreateTopicReq));
    });
    it('canCreateReply', function () {
        const canCreateReplyReq = {
            method: 'POST',
            node: {
                type: 'Reply',
            }  
        }

        assert(canCreateReply(canCreateReplyReq));
    });
    it('canDeleteForum', function () {
        const canDeleteForumReq = {
            method: 'DELETE',
            node: {
                type: 'Forum',
            }  
        }

        assert(canDeleteForum(canDeleteForumReq));
    });
    it('canDeleteTopic', function () {
        const canDeleteTopicReq = {
            method: 'DELETE',
            node: {
                type: 'Topic',
            }  
        }

        assert(canDeleteTopic(canDeleteTopicReq));
    });
    it('canDeleteReply', function () {
        const canDeleteReplyReq = {
            method: 'DELETE',
            node: {
                type: 'Reply',
            }  
        }

        assert(canDeleteReply(canDeleteReplyReq));
    });

});