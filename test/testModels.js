const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const assert = require('assert');

const User = require("../api/models/userModel");
const Topic = require("../api/models/topicModel");
const Node = require("../api/models/nodeModel");


describe('Test models', function() {
    it('Create User', function () {
        let user = new User({
            _id: new ObjectId(),
            name: 'David',
            email: 'david@email.com',
            accountId: 'david11',
            roles: []
        });
        user.save();
    });

    it('Find User', function (done) {
        User.findOne({ name: 'David' })
            .exec()
            .then(user => {
                if (user.length < 1)
                    done('User not found');

                assert.equal(user.email, 'david@email.com');
                done();
            });
    });

    it('Create Topic', function (done) {
        let topic = new Topic({
            _id: new ObjectId(),
            creationDate: new Date(),
            lastUpdatedDate: new Date(),
            authorInformation: {

            },
            description: 'Some Topic',
            title: 'Topic1',
            content: 'This is content of topic',
            sticky: 0,
            replyCount: 0
        });

        topic.save()
            .then(document => done())
            .catch(error => done(error));
    });

    it('List Topic', function (done) {
        let perPage = 10;
        let page = 0;
        let filter = {type: 'Topic'};

        Node.find(filter)
            .limit(perPage)
            .skip(perPage * page)
            .sort({ type: 'asc', sticky: 'desc', createdDate: 'asc' })
            .exec((err, documents) => {
                assert.equal(documents.length, 1);
                assert.equal(documents[0].title, 'Topic1');
                assert(documents[0].description.length > 0);
                assert(documents[0].content.length > 0);
                done();
            })
    });
});