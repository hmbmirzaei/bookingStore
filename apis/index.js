const auth = require('../route_controller/auth');
const book = require('../route_controller/book');
const db = require('../middle_ware/db')
const { check } = auth;
const api_list = {
	auth: [
		{
			name: 'login',
			method: 'post',
			path: 'login',
			description: 'login',
			controller: [db.connect, auth.login, db.diconnect],
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
			description: 'search for books',
			controller: [check, db.connect, book.search, db.diconnect],
			query: [
				{
					key: 'search',
					value: 'استاد'
				},
			],
		},
		{
			name: 'get book',
			method: 'get',
			path: 'item',
			header: true,
			description: 'get book',
			controller: [check, book.book],
			params: [
				{
					key: 'id',
					value: '65d620387059385895c1f9ae'
				},
			],
		}
	]
};
module.exports = api_list;