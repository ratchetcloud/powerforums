/**
 * Check permission for guest
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
    switch(req.method) {
    	// can read not deleted nodes.
        case 'GET':
        	if (req.node.deleted)
        		return false;
            return true;
        default:
            return false;
    }
}