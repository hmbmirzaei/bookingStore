const auth = require('../route_controller/auth');
const book = require('../route_controller/book')
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
			header: false,
			body: {
				username: 'test',
				password: 'tester'
			},
			event: true
		}
	],
	book: [
		{
			name: 'search for books',
			method: 'get',
			path: 'books',
			header: true,
			description: 'earch for books',
			controller: [check, book.search],
			query: [
				{
					key: 'search',
					value: 'استاد'
				},
			],
		}
	]
};
module.exports = api_list;