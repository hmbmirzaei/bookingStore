const { auth } = require('../route_controller')
const api_packs = {
	auth: [
		{
			name: 'login page',
			method: 'post',
			path: 'login',
			description: 'login page html',
			controller: auth.login,
			mode: 'raw',
			body: {
				username: 'test',
				password: 'tester'
			}
		}
	],
};
module.exports = api_packs;