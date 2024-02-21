const { test } = require('../route_controller')
const api_packs = {
	test: [
		{
			name: 'login page',
			method: 'get',
			path: 'zz',
			description: 'login page html',
			controller: test.tester
		}
	],
};
module.exports = api_packs;