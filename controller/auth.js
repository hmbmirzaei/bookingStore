const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { v4 } = require('uuid');
const mongoose = require('mongoose');
const { salt, secret_key, token_expire, db_url } = process.env;
const { err } = require('./utility');
const redis = require('./redis');
const { User } = require('../model');

const funcs = {
	login: async ({ username, password }) => {
		const person = await User.find({
			username,
			password: `${md5(password)}${salt}`
		});
		if (!person.length)
			err('wrong credential', 401);
		
		const { id, fname, lname } = person[0];
		//check previous login
		let old_token = await redis.r(`${id}`);
		if (old_token) {
			await redis.d(old_token);
			await redis.d(`${id}`);
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
			res(user.id)
		});
	})
};
module.exports = funcs;