const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Types.ObjectId;

// Permission checking is due to `middleware/loadNodeWithPermission`,
// and tests are also due to `testMiddleWares`.
// This code only check for whether controller works well with database,
// not with exceptional cases with invalid usage.
describe('Test nodeController', function() {
    var adminAuthHeader;
    before(function () {
        adminAuthHeader = 'Bearer ' + jwt.sign(global.adminUser, global.JWT_KEY);
    });

    describe("Forums", function () {
        const rootForumId = ObjectId('200000000000000000000000');
        const sampleForumData = {
            type: 'Forum',
            parentId: rootForumId,
            title: 'LoL',
            description: 'League of Legends'
        };
        let nodeId;
        it('Create forum', function () {
            return supertest(app)
                .post('/node/')
                .set('Authorization', adminAuthHeader)
                .send(sampleForumData)
                .expect(201)
                .then(response => {
                    assert(response.body._id != null);
                    assert.equal(response.body.title, sampleForumData.title);
                    assert.equal(response.body.description, sampleForumData.description);

                    nodeId = response.body._id;
                });
        });
        it('Read forum', function () {
            return supertest(app)
                .get('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .expect(200)
                .then(response => {
                    assert.equal(response.body.title, sampleForumData.title);
                    assert.equal(response.body.description, sampleForumData.description);
                    assert.equal(response.body.authorInformation._id, global.adminUser._id);
                });
        });
        it('Paginate forum', function () {
            return supertest(app)
                .get('/node/' + rootForumId + '/children/')
                .set('Authorization', adminAuthHeader)
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.results.length > 0);
                    assert(response.body.pagination != null);
                    assert.equal(response.body.pagination.currentPage, 0);
                    assert(response.body.pagination.totalResult > 0);

                    // Find forum created in above
                    let lol;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            lol = node;
                            break;
                        }
                    }
                    assert(lol !== undefined);
                    assert.equal(lol.title, sampleForumData.title);
                });
        });
        it('Delete forum', function () {
            return supertest(app)
                .delete('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .expect(200);
        });
        // Default delete uses soft-delete. 
        // Therefore, after delete, only user having permission can see soft-deleted forums.
        it('Paginate deleted forum with canReadDeleted permission', function () {
            return supertest(app)
                .get('/node/' + rootForumId + '/children/')
                .set('Authorization', adminAuthHeader)
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.results.length > 0);
                    assert(response.body.pagination != null);
                    assert(response.body.pagination.totalResult > 0);
                    
                    // Find forum soft-deleted above
                    let lol;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            lol = node;
                            break;
                        }
                    }
                    assert(lol !== undefined);
                    assert(lol.deleted === true);
                });
        });
        // User not having permission can see forums not deleted.
        // Therefore, there is difference about the number of paginated result.
        it('Paginate deleted forum without canReadDeleted permission', function () {
            return supertest(app)
                .get('/node/' + rootForumId + '/children/')
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.pagination != null);

                    // Find forum soft-deleted above
                    let lol;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            lol = node;
                            break;
                        }
                    }
                    assert(lol === undefined);
                });
        });
    });


    describe("Topics", function () {
        const parentForumId = ObjectId('200000000000000000000001');
        const sampleTopicData = {
            type: 'Topic',
            parentId: parentForumId,
            title: 'I hate tracer',
            content: 'Please nerf T.T'
        };
        let nodeId;
        it('Create topic', function () {
            return supertest(app)
                .post('/node/')
                .set('Authorization', adminAuthHeader)
                .send(sampleTopicData)
                .expect(201)
                .then(response => {
                    assert(response.body._id != null);
                    assert.equal(response.body.title, sampleTopicData.title);
                    assert.equal(response.body.description, sampleTopicData.description);
                    nodeId = response.body._id;
                });
        });
        it('Read topic', function () {
            return supertest(app)
                .get('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .expect(200)
                .then(response => {
                    assert.equal(response.body.title, sampleTopicData.title);
                    assert.equal(response.body.description, sampleTopicData.description);
                    assert.equal(response.body.authorInformation._id, global.adminUser._id);
                });
        });
        it('Paginate topic', function () {
            return supertest(app)
                .get('/node/' + parentForumId + '/children/')
                .set('Authorization', adminAuthHeader)
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.results.length > 0);
                    assert(response.body.pagination != null);
                    assert(response.body.pagination.totalResult > 0);

                    // Find topic created in above
                    let topic;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            topic = node;
                            break;
                        }
                    }
                    assert(topic !== undefined);
                    assert.equal(topic.title, sampleTopicData.title);
                });
        });
        // To set sticky does not change lastUpdatedDate
        it('Set sticky topic', function () {
            return supertest(app)
                .patch('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .send({ sticky: true })
                .expect(201)
                .then(response => {
                    assert.equal(response.body.sticky, true);
                    assert(response.body.lastUpdatedDate == response.body.creationDate);
                });
        });
        // To unset sticky does not change lastUpdatedDate
        it('Unset sticky topic', function () {
            return supertest(app)
                .patch('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .send({ sticky: false })
                .expect(201)
                .then(response => {
                    assert.equal(response.body.sticky, false);
                    assert(response.body.lastUpdatedDate == response.body.creationDate);
                });
        });
        // To update title or content change lastUpdatedDate.
        // If update node test is executed before sticky node test, test will fail. 
        it('Update topic under forums', function () {
            return supertest(app)
                .patch('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .send({title: 'I love tracer'})
                .expect(201)
                .then(response => {
                    assert.equal(response.body.title, 'I love tracer');
                    assert(response.body.lastUpdatedDate != response.body.creationDate);
                });
        });
        it('Delete topic', function () {
            return supertest(app)
                .delete('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .expect(200);
        });
        // Default delete uses soft-delete. 
        // Therefore, after delete, only user having permission can see soft-deleted topics.
        it('Paginate deleted topic with canReadDeleted permission', function () {
            return supertest(app)
                .get('/node/' + parentForumId + '/children/')
                .set('Authorization', adminAuthHeader)
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.results.length > 0);
                    assert(response.body.pagination != null);
                    assert(response.body.pagination.totalResult > 0);

                    // Find topic soft-deleted above
                    let topic;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            topic = node;
                            break;
                        }
                    }
                    assert(topic !== undefined);
                    assert(topic.deleted === true);
                });
        });
        // User not having permission can see topics not deleted.
        // Therefore, there is difference about the number of paginated result.
        it('Paginate deleted topic without canReadDeleted permission', function () {
            return supertest(app)
                .get('/node/' + parentForumId + '/children/')
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.pagination != null);
                    // Find topic soft-deleted above
                    let topic;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            topic = node;
                            break;
                        }
                    }
                    assert(topic === undefined);
                });
        });
    });


    describe("Replies", function () {
        const parentTopicId = ObjectId('200000000000000000000002');
        const sampleReplyData = {
            type: 'Reply',
            parentId: ObjectId('200000000000000000000002'),
            content: 'D.VA!'
        };
        let nodeId;
        it('Create reply', function () {
            return supertest(app)
                .post('/node/')
                .set('Authorization', adminAuthHeader)
                .send(sampleReplyData)
                .expect(201)
                .then(response => {
                    assert(response.body._id != null);
                    assert.equal(response.body.content, sampleReplyData.content);
                    nodeId = response.body._id;
                });
        });
        it('Read reply', function () {
            return supertest(app)
                .get('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .expect(200)
                .then(response => {
                    assert.equal(response.body.content, sampleReplyData.content);
                });
        });
        it('Paginate replies under topic', function () {
            return supertest(app)
                .get('/node/' + parentTopicId + '/children/')
                .set('Authorization', adminAuthHeader)
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.results.length > 0);
                    assert(response.body.pagination != null);
                    assert(response.body.pagination.totalResult > 0);

                    // Find topic created in above
                    let reply;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            reply = node;
                            break;
                        }
                    }
                    assert(reply !== undefined);
                    assert.equal(reply.content, sampleReplyData.content);
                });
        });
        // To make sticky does not change lastUpdatedDate
        it('Sticky reply', function () {
            return supertest(app)
                .patch('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .send({ sticky: true })
                .expect(201)
                .then(response => {
                    assert.equal(response.body.sticky, true);
                    assert(response.body.lastUpdatedDate == response.body.creationDate);
                });
        });
        // To unset sticky does not change lastUpdatedDate
        it('Unset sticky reply', function () {
            return supertest(app)
                .patch('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .send({ sticky: false })
                .expect(201)
                .then(response => {
                    assert.equal(response.body.sticky, false);
                    assert(response.body.lastUpdatedDate == response.body.creationDate);
                });
        });
        // To update title or content change lastUpdatedDate.
        // If update node test is executed before sticky node test, test will fail. 
        it('Update reply', function () {
            return supertest(app)
                .patch('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .send({content: 'D.VA!!'})
                .expect(201)
                .then(response => {
                    assert.equal(response.body.content, 'D.VA!!');
                    assert(response.body.lastUpdatedDate != response.body.creationDate);
                });
        });
        it('Delete reply', function () {
            return supertest(app)
                .delete('/node/' + nodeId)
                .set('Authorization', adminAuthHeader)
                .expect(200);
        });
        // Default delete uses soft-delete. 
        // Therefore, after delete, only user having permission can see soft-deleted replies.
        it('Paginate deleted replies under topic with canReadDeleted permission', function () {
            return supertest(app)
                .get('/node/' + parentTopicId + '/children/')
                .set('Authorization', adminAuthHeader)
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.results.length > 0);
                    assert(response.body.pagination != null);
                    assert(response.body.pagination.totalResult > 0);

                    // Find reply soft-deleted in above
                    let reply;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            reply = node;
                            break;
                        }
                    }
                    assert(reply !== undefined);
                    assert(reply.deleted === true);
                });
        });
        // User not having permission can see replies not deleted.
        // Therefore, there is difference about the number of paginated result.
        it('Paginate deleted replies under topic without canReadDeleted permission', function () {
            return supertest(app)
                .get('/node/' + parentTopicId + '/children/')
                .query({ page: 0, perPage: 10 })
                .expect(200)
                .then(response => {
                    assert(response.body.pagination != null);
                    // Find reply soft-deleted above
                    let reply;
                    for (let node of response.body.results) {
                        if (node._id === nodeId) {
                            reply = node;
                            break;
                        }
                    }
                    assert(reply === undefined);
                });
        });
    });
});