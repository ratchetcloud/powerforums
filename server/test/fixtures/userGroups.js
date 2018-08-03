const ObjectId = mongoose.Types.ObjectId;

module.exports = [
    {
        "_id": ObjectId("000000000000000000000000"),
        "name": "Administrator",
        "permissions":[
            "canGrantPermissions",
            "canCreateForum",
            "canCreateTopic",
            "canCreateReply",
            "canDeleteForum",
            "canDeleteTopic",
            "canDeleteReply",
            "canSetSticky",
            "canFlag"
        ]
    },
    {
        "_id": ObjectId("000000000000000000000001"),
        "name": "GameModerator",
        "permissions":[
            "canGrantPermissions",
            "canCreateForum",
            "canCreateTopic",
            "canCreateReply",
            "canDeleteForum",
            "canDeleteTopic",
            "canDeleteReply",
            "canSetSticky",
            "canFlag"
        ]
    },
    {
        "_id": ObjectId("000000000000000000000002"),
        "name": "BannedUser",
        "permissions":[]   
    }
]
