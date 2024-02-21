const auth = require('../route_controller/auth');
const { check } = auth;
const api_list = {
	auth: [
		{
			name: 'login',
			method: 'post',
			path: 'login',
			description: 'login',
			controller: [auth.login],
			mode: 'raw',
			body: {
				username: 'test',
				password: 'tester'
			}
		}
	],
};
module.exports = api_list;