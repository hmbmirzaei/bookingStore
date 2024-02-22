const auth = require('../route_controller/auth');
const book = require('../route_controller/book');
const db = require('../middle_ware/db');
const book_mw = require('../middle_ware/book');

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
			name: 'new book',
			method: 'post',
			path: 'create',
			header: true,
			description: 'new book',
			controller: [check, book_mw.upsert, db.connect, book.c, db.diconnect],
			body: {
				name: 'زندگی    نامه',
				descr: 'زندگینامه پروفسور حسسسابی',
				initial_stock: 5
			},
			mode: 'raw'
		},
		{
			name: 'get book',
			method: 'get',
			path: 'item',
			header: true,
			description: 'get book',
			controller: [check, db.connect, book.r, db.diconnect],
			params: [
				{
					key: 'book_id',
					value: '65d620387059385895c1f9ae'
				},
			],
		},
		{
			name: 'modofy book',
			method: 'put',
			path: 'modofy',
			header: true,
			description: 'modofy book',
			controller: [check, book_mw.upsert, db.connect, book.u, db.diconnect],
			body: {
				name: 'زندگی‌نامه',
				descr: 'زندگی‌نامه پروفسور حسابی',
				initial_stock: 8
			},
			mode: 'raw',
			params: [
				{
					key: 'book_id',
					value: '65d620387059385895c1f9ae'
				},
			],
		},
		{
			name: 'remove book',
			method: 'delete',
			path: 'item',
			header: true,
			description: 'remove book',
			controller: [check, db.connect, book.d, db.diconnect],
			params: [
				{
					key: 'book_id',
					value: '65d620387059385895c1f9ae'
				},
			],
		},
		{
			name: 'borrow book',
			method: 'get',
			path: 'borrow',
			header: true,
			description: 'borrow book',
			controller: [check, db.connect, book.borrowed, db.diconnect],
			params: [
				{
					key: 'book_id',
					value: '65d620387059385895c1f9ae'
				},
				{
					key: 'member_id',
					value: '2343nh347059385895c1f9ae'
				},
			],
		},
		{
			name: 'return book',
			method: 'get',
			path: 'return',
			header: true,
			description: 'return book',
			controller: [check, db.connect, book.returned, db.diconnect],
			params: [
				{
					key: 'book_id',
					value: '65d620387059385895c1f9ae'
				},
				{
					key: 'member_id',
					value: '2343nh347059385895c1f9ae'
				},
			],
		},
		{
			name: 'history',
			method: 'get',
			path: 'return',
			header: true,
			description: 'history',
			controller: [check, db.connect, book.history, db.diconnect],
			params: [
				{
					key: 'book_id',
					value: '65d620387059385895c1f9ae'
				},
			],
		},
	]
};
module.exports = api_list;