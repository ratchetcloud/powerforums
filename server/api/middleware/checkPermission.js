/**
 * Check permission for request
 * @param req: Include method and node
 * @param user: Current logged-in user's ID (mongoose.Types.ObjectId)
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req, user) => {
    let permissionList = new Set();

    if (!user) {
        // If guest, add guest filter
        permissionList.add('defaultGuest')
    } else {
        // Signuped user who has special permissions
        if (user.permissions.length > 0) {
            let ancestorIds = req.node.ancestorList.map(ancestor => ancestor._id);
            
            // Concat permission which have permissions about req.node
            for (let permissionObject of user.permissions) {
                // Check permission of upper node
                if (Object.values(ancestorIds).some(ancestorId => ancestorId.equals(permissionObject._nodeId))) {
                    // If have permission, add the permission to permissionList
                    USER_GROUPS.forEach(userGroup => {
                        if (userGroup._id.equals(permissionObject._userGroupId)) {
                            userGroup.permissions.forEach(p => permissionList.add(p));
                        }
                    })
                }
            }
        }
    }

    // Add default signupedUser rule
    permissionList.add('defaultSignupedUser')

    // Check permission rules
    for (permission of permissionList) {
        let filter = require('../../permissionRules/' + permission);
        if(filter(req, user)) {
            return true;
        }
    } 
    return false;
}