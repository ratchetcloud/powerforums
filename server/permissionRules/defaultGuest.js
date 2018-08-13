/**
 * Check permission for guest
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
    // can read all nodes.
    switch(req.method) {
        case 'GET':
            return true;
        default:
            return false;
    }
}