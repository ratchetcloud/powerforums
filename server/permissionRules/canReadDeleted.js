/**
 * Check permission for canReadDeleted
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
	switch(req.method) {
		//can read all nodes
		case 'GET':
			return true;
	}
	return false;
}