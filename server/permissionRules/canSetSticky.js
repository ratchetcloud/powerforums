/**
 * Check permission for canSetSticky
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
	switch(req.method) {
		case 'PATCH':
			if (req.body.sticky !== undefined)
				return true;
			break;
	}
	return false;
}