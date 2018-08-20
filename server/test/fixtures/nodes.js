const ObjectId = mongoose.Types.ObjectId;

module.exports = [
    {
        "_id": ObjectId("200000000000000000000000"),
        "title": "Forums",
        "type": "Forum",
        "description": "Root forum for community.",
        "_parentId": null,
        "ancestorList": [],
        "authorInformation": {
            "_id": null,
            "name": null
        },
        "deleted":false
    },
    {
        "_id": ObjectId("200000000000000000000001"),
        "title": "Overwatch",
        "type": "Forum",
        "_parentId": ObjectId("200000000000000000000000"),
        "ancestorList": [
            {
                "_id": ObjectId("200000000000000000000000"),
                "title": "Forums"
            }
        ],
        "authorInformation": {
            "_id": ObjectId("100000000000000000000000"),
            "name": "Admin"
        },
        "description": "Blizzard's FPS game",
        "deleted":false
    },
    {
        "_id": ObjectId("200000000000000000000002"),
        "title": "Announcements",
        "type": "Forum",
        "_parentId": ObjectId("200000000000000000000001"),
        "ancestorList": [
            {
                "_id": ObjectId("200000000000000000000000"),
                "title": "Forums"
            },
            {
                "_id": ObjectId("200000000000000000000001"),
                "title": "Overwatch"
            }
        ],
        "authorInformation": {
            "_id": ObjectId("100000000000000000000000"),
            "name": "Admin"
        },
        "description": "Announcements",
        "deleted":false
    },
    {
        "_id": ObjectId("200000000000000000000003"),
        "title": "Nerf this!",
        "type": "Topic",
        "_parentId": ObjectId("200000000000000000000001"),
        "ancestorList": [
            {
                "_id": ObjectId("200000000000000000000000"),
                "title": "Forums"
            },
            {
                "_id": ObjectId("200000000000000000000001"),
                "title": "Overwatch"
            }
        ],
        "authorInformation": {
            "_id": ObjectId("100000000000000000000001"),
            "name": "User"
        },
        "description": "haha",
        "deleted":false
    },
    {
        "_id": ObjectId("200000000000000000000004"),
        "title": "Epic Games",
        "type": "Forum",
        "_parentId": ObjectId("200000000000000000000000"),
        "ancestorList": [
            {
                "_id": ObjectId("200000000000000000000000"),
                "title": "Forums"
            }
        ],
        "authorInformation": {
            "_id": ObjectId("100000000000000000000000"),
            "name": "Admin"
        },
        "description": "Epic Games",
        "deleted":false
    },
    {
        "_id": ObjectId("200000000000000000000005"),
        "title": "Nerf that!",
        "type": "Topic",
        "_parentId": ObjectId("200000000000000000000001"),
        "ancestorList": [
            {
                "_id": ObjectId("200000000000000000000000"),
                "title": "Forums"
            },
            {
                "_id": ObjectId("200000000000000000000001"),
                "title": "Overwatch"
            }
        ],
        "authorInformation": {
            "_id": ObjectId("100000000000000000000002"),
            "name": "BannedUser"
        },
        "description": "haha",
        "deleted":false
    },
]