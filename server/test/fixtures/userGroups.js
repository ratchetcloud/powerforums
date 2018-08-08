const ObjectId = mongoose.Types.ObjectId;

module.exports = [
    {
        "_id": ObjectId("000000000000000000000000"),
        "name": "Administrator",
        "permissions":[
            "canCreateForum",
            "canDeleteForum",
            "canDeleteTopic",
            "canDeleteReply",
            "canSetSticky",
        ]
    },
    {
        "_id": ObjectId("000000000000000000000001"),
        "name": "GameModerator",
        "permissions":[
            "canCreateForum",
            "canDeleteForum",
            "canDeleteTopic",
            "canDeleteReply",
            "canSetSticky",
        ]
    },
    {
        "_id": ObjectId("000000000000000000000002"),
        "name": "BannedUser",
        "permissions":[]   
    }
]
