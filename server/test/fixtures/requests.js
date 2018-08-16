module.exports = {
    createForum:
    {   method: "POST", 
        body: { type: "Forum",
                parentId: "200000000000000000000000",
                title: "createForum title",
                description: "createForum description",
                ancestorList: [ { _id: "200000000000000000000000",
                                  title: "Forums"} ] 
        }
    },
    
    createTopic:
    {   method: "POST", 
        body: { type: "Topic",
                parentId: "200000000000000000000001",
                title: "createTopic title",
                content: "createTopic content",
                ancestorList: [ { _id: "200000000000000000000000",
                                  title: "Forums"},
                                { _id: "200000000000000000000001",
                                  title: "Overwatch"} ]
        } 
    },
    
    createReply: 
    {   method: "POST", 
        body: { type: "Reply",
                parentId: "200000000000000000000002",
                content: "createReply content",
                ancestorList: [ { _id: "200000000000000000000000",
                                  title: "Forums"},
                                { _id: "200000000000000000000001",
                                  title: "Overwatch"},
                                { _id: "200000000000000000000002",
                                  title: "createTopic title" } ]
        }
    },

    deleteForum: 
    {   method: "DELETE", 
        node: { type: "Forum",
                _id: "200000000000000000000001",
                authorInformation: { _id: "100000000000000000000001" } } 
    },
    
    deleteTopic: 
    {   method: "DELETE", 
        node: { type: "Topic",
                _id: "200000000000000000000002",
                authorInformation: { _id: "100000000000000000000001" } } },
    
    deleteReply:
    {   method: "DELETE", 
        node: { type: "Reply",
                _id: "200000000000000000000003",
                authorInformation: { _id: "100000000000000000000001" } } 
    },
        
    setSticky:
    {   method: "PATCH", 
        body: { sticky: true } 
    },
    
    updateNode:
    {   method: "PATCH", 
        node: { authorInformation: { _id: "100000000000000000000001"} },
        body: { content: "update node" } 
    },
    
    readNode:
    {   method: "GET",
        node: { _id: "200000000000000000000002" } 
    }
}