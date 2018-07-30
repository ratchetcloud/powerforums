const ObjectId = mongoose.Types.ObjectId;

module.exports = [
    {
        "_id": ObjectId("100000000000000000000000"),
        "name": "Admin",
        "email": "admin@openforum.org",
        "password": "$2a$04$rpyFFlFjT6WwfnPFR.ljwec5rof5o5VMs7U4acyM5iJUvqDvqVVN2",
        "isAdmin":true,
        "permissions": []
    },
    {
        "_id": ObjectId("100000000000000000000001"),
        "name": "User",
        "email": "user1@openforum.org",
        "password": "$2a$04$rpyFFlFjT6WwfnPFR.ljwec5rof5o5VMs7U4acyM5iJUvqDvqVVN2",
        "permissions": []
    }
]