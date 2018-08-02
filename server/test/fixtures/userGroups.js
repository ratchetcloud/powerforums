const ObjectId = mongoose.Types.ObjectId;

module.exports = [
    {
        "_id": ObjectId("000000000000000000000000"),
        "name": "Administrator",
        "permissions":[
            "CanGrantPermissions",
            "CanCreateForum",
            "CanCreateTopic",
            "CanCreateReply",
            "CanDeleteForum",
            "CanDeleteTopic",
            "CanDeleteReply",
            "CanSetSticky",
            "CanFlag"
        ]
    },
    {
        "_id": ObjectId("000000000000000000000001"),
        "name": "GameModerator",
        "permissions":[
            "CanGrantPermissions",
            "CanCreateForum",
            "CanCreateTopic",
            "CanCreateReply",
            "CanDeleteForum",
            "CanDeleteTopic",
            "CanDeleteReply",
            "CanSetSticky",
            "CanFlag"
        ]
    },
    {
        "_id": ObjectId("000000000000000000000002"),
        "name": "BannedUser",
        "permissions":[]   
    }
]
