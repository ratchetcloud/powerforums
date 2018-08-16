/**
 * Check permission for canCreateForum
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
	switch(req.method) {
		case 'POST':
			return req.body.type === 'Forum';
	}
	return false;
}