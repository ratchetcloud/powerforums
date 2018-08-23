/**
 * Check permission for canReadDeleted
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
	switch(req.method) {
		case 'GET':
            // can read deleted nodes
            if (req.node.deleted)
				return true;
	}
	return false;
}