/**
 * Check permission for signupedUser
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @param user: Current logged-in user's ID (mongoose.Types.ObjectId)
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req, user) => {
    switch (req.method) {
        case 'GET':
            // can read all nodes
            return true;

        case 'POST':
            // can create topic and reply, not forum
            if (req.node.type === 'Topic' || req.node.type === 'Reply') {
                return true;
            }
            break;

        case 'PUT':
        case 'PATCH':
            // Signuped user can't stick node.
            if (req.body.sticky !== undefined)
                return false;
            // Owner of node can update content. 
            if (user._id.equals(req.node.authorInformation._id))
                return true;
            break;

        case 'DELETE':
            // Owner of node can delete
            if (user._id.equals(req.node.authorInformation._id))
                return true;
            break;
    }

    // Otherwise, no permission
    return false;
}