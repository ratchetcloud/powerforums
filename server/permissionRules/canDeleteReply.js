/**
 * Check permission for canDeleteReply
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
	switch(req.method) {
		case 'DELETE':
			if (req.node.type === 'Reply')
				return true;
			break;
	}
	return false;
}