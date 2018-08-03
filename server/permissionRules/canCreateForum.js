/**
 * Check permission for canCreateForum
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
	switch(req.method) {
		case 'POST':
			if (req.node.type === 'Forum')
				return true;
			break;
	}
	return false;
}