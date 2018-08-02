const ObjectId = mongoose.Types.ObjectId;

module.exports = [
    {
        "_id": ObjectId("100000000000000000000000"),
        "name": "Admin",
        "email": "admin@powerforums.io",
        "password": "$2a$04$rpyFFlFjT6WwfnPFR.ljwec5rof5o5VMs7U4acyM5iJUvqDvqVVN2",
        "permissions": [
            {
                "_userGroupId": ObjectId("000000000000000000000000"),
                "_nodeId": ObjectId("200000000000000000000000")
            }
        ]
    },
    {
        "_id": ObjectId("100000000000000000000001"),
        "name": "User",
        "email": "user1@powerforums.io",
        "password": "$2a$04$rpyFFlFjT6WwfnPFR.ljwec5rof5o5VMs7U4acyM5iJUvqDvqVVN2",
        "permissions": []
    },
    {
        "_id": ObjectId("100000000000000000000002"),
        "name": "BannedUser",
        "email": "user2@powerforums.io",
        "password": "$2a$04$rpyFFlFjT6WwfnPFR.ljwec5rof5o5VMs7U4acyM5iJUvqDvqVVN2",
        "permissions": [
            {
                "_userGroupId": ObjectId("000000000000000000000002"), 
                "_nodeId": ObjectId("200000000000000000000002")
            }
        ]
    }

]