/**
 * Check permission for canSetSticky
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

// After exec omit function, it returns key list except given key list

const omit = require('underscore').omit;
const isEmpty = require('underscore').isEmpty;

module.exports = (req) => {
	switch(req.method) {
		case 'PATCH':
			if (req.body.sticky !== undefined) {
				// If other element except sticky is in req.body, return false
				return isEmpty(omit(req.body, 'sticky'));
			}
			break;
	}
	return false;
}