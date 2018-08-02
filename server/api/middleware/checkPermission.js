/**
 * Check permission for CRUD Node
 * @param method: GET, POST, PUT, PATCH or DELETE
 * @param node: models.nodeModel
 * @param user: Current logged-in user's ID (mongoose.Types.ObjectId)
 * @returns {boolean} True if allowed, false otherwise
 */

// global role is in USER_GROUPS
// this rule is fundamental for custom rule
module.exports = (method, node, user) => {
    // Guest user
    if (!user) {
        // can read all nodes.
        switch(method) {
            case 'GET':
                return true;
            default:
                return false;
        }
    }

    // Signuped user who has special permissions
    if (user.permissions.length > 0) {
        let ancestorIds = node.ancestorList.map(ancestor => ancestor._id)
        for (let permission of user.permissions) {
            
            // First, check user has permission about the nodes
            if (Object.values(ancestorIds)
                     .some(ancestorId => ancestorId.equals(permission._nodeId))) {
                // Second, check user group and has permission about method
                switch(method) {
                    case 'POST' :
                        if (node.type === 'Forum') {
                            return USER_GROUPS.find(userGroup => userGroup._id.equals(permission._userGroupId))
                                       .permissions.includes('CanCreateForum') ? true : false;
                        } else if (node.type === 'Topic') {
                            return USER_GROUPS.find(userGroup => userGroup._id.equals(permission._userGroupId))
                                       .permissions.includes('CanCreateTopic') ? true : false;
                        } else {
                            return USER_GROUPS.find(userGroup => userGroup._id.equals(permission._userGroupId))
                                       .permissions.includes('CanCreateReply') ? true : false;
                        }
                        break;

                    case 'DELETE' :
                        if (node.type === 'Forum') {
                            return USER_GROUPS.find(userGroup => userGroup._id.equals(permission._userGroupId))
                                       .permissions.includes('CanDeleteForum') ? true : false;
                        } else if (node.type === 'Topic') {
                            return USER_GROUPS.find(userGroup => userGroup._id.equals(permission._userGroupId))
                                       .permissions.includes('CanDeleteTopic') ? true : false;
                        } else {
                            return USER_GROUPS.find(userGroup => userGroup._id.equals(permission._userGroupId))
                                       .permissions.includes('CanDeleteReply') ? true : false;
                        }
                        break;

                }                
            }  
        }
    }

    // Signuped user
    switch (method) {
        case 'GET':
            // can read all nodes
            return true;

        case 'POST':
            // can create topic and reply, not forum
            if (node.type === 'Topic' || node.type === 'Reply') {
                return true;
            }
            break;

        case 'PUT':
        case 'PATCH':
            // Owner of node can update.
            if (user._id.equals(node.authorInformation._id))
                return true;
            break;

        case 'DELETE':
            // Owner of node can delete
            if (user._id.equals(node.authorInformation._id))
                return true;
            break;
    }

    // Otherwise, no permission
    return false;
}
