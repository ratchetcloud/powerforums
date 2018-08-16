const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Types.ObjectId;

// Permission checking is due to `middleware/loadNodeWithPermission`,
// and tests are also due to `testMiddleWares`.
// This code only check for whether controller works well with database,
// not with exceptional cases with invalid usage.
describe('Test nodeController', function() {
    var authHeader;
    before(function () {
        authHeader = 'Bearer ' + jwt.sign(global.adminUser, global.JWT_KEY);
    });

    describe("Forums", function () {
        const sampleForumData = {
            type: 'Forum',
            parentId: ObjectId('200000000000000000000000'),
            title: 'LoL',
            description: 'League of Legends'
        };
        let nodeId;
        it('Create forum', function () {
            return supertest(app)
                .post('/node/')
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
                .expect(200)
                .then(response => {
                    assert.equal(response.body.title, sampleForumData.title);
                    assert.equal(response.body.description, sampleForumData.description);
                    assert.equal(response.body.authorInformation._id, global.adminUser._id);
                });
        });
        it('Paginate forum', function () {
            return supertest(app)
                .post('/node/getPaginatedChildren')
                .set('Authorization', authHeader)
                .send({parentId: sampleForumData.parentId})
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
                .set('Authorization', authHeader)
                .expect(200);
        });
    });


    describe("Topics", function () {
        const sampleTopicData = {
            type: 'Topic',
            parentId: ObjectId('200000000000000000000001'),
            title: 'I hate tracer',
            content: 'Please nerf T.T'
        };
        let nodeId;
        it('Create topic', function () {
            return supertest(app)
                .post('/node/')
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
                .expect(200)
                .then(response => {
                    assert.equal(response.body.title, sampleTopicData.title);
                    assert.equal(response.body.description, sampleTopicData.description);
                    assert.equal(response.body.authorInformation._id, global.adminUser._id);
                });
        });
        it('Paginate topic', function () {
            return supertest(app)
                .post('/node/getPaginatedChildren')
                .set('Authorization', authHeader)
                .send({parentId: sampleTopicData.parentId})
                .expect(200)
                .then(response => {
                    assert(response.body.results.length > 0);
                    assert(response.body.pagination != null);
                    assert(response.body.pagination.totalResult > 0);

                    // Find forum created in above
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
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
                .expect(200);
        });
    });


    describe("Replies", function () {
        const sampleReplyData = {
            type: 'Reply',
            parentId: ObjectId('200000000000000000000002'),
            content: 'D.VA!'
        };
        let nodeId;
        it('Create reply', function () {
            return supertest(app)
                .post('/node/')
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
                .expect(200)
                .then(response => {
                    assert.equal(response.body.content, sampleReplyData.content);
                });
        });
        it('Paginate replies under topic', function () {
            return supertest(app)
                .post('/node/getPaginatedChildren')
                .set('Authorization', authHeader)
                .send({parentId: sampleReplyData.parentId})
                .expect(200)
                .then(response => {
                    assert(response.body.results.length > 0);
                    assert(response.body.pagination != null);
                    assert(response.body.pagination.totalResult > 0);

                    // Find forum created in above
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
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
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
                .set('Authorization', authHeader)
                .expect(200);
        });
    });
});