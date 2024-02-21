const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { v4 } = require('uuid');
const { salt, secret_key, token_expire } = process.env;
const { err } = require('./utility');
const redis = require('./redis');
// console.log({ salt, secret_key, d: md5('tester') })
const users = [{
	id: 1,
	username: 'test',
	password: `f5d1278e8109edd94e1e4197e04873b912312312@23312312dsfsdfSDFSDF33^wretwer`,//hashed
	fname: 'hossein',
	lname: 'mirzaei'
}];
const funcs = {
	login: async ({ username, password }) => {
		const person = await users.find(user =>
			user.username == username
			&&
			user.password == `${md5(password)}${salt}`);
		if (!person)
			err('wrong credential', 401);

		const { id, fname, lname } = person;
		//check previous login
		let old_login = await redis.r(`${id}`);
		if (old_login) {
			const old__login = JSON.parse(old_login);
			await redis.d(old__login.token);
			await redis.d(id);
		};
		// check previous login

		let token = v4();
		const user = {
			id,
			title: `${fname} ${lname}`,
			token
		};
		await redis.c(token, JSON.stringify(user));
		await redis.c(`${id}`, token);
		return {
			title: `${fname} ${lname}`,
			token: jwt.sign({ token }, secret_key, { expiresIn: parseInt(token_expire) })
		};
	},
	check: async _token => new Promise((res, rej) => {
		jwt.verify(_token, secret_key, async (error, { token }) => {
			if (error || !token)
				rej('wrong credential')
			let user = await redis.r(token);
			if (!user)
				rej('wrong credential');
			user = JSON.parse(user);
			console.log(user)
			res(user.id)
		});
	})
};
module.exports = funcs;