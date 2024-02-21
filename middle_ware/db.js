const mongoose = require('mongoose');
const { db_url } = require('../controller/utility')
const funcs = {
	connect: async (r, s, n) => {
		try {
			await mongoose.connect(db_url);
			n();
		} catch (error) {
			s.status(400).json('cannot connect to database. contact support')
		}
	},
	diconnect: async (r, s, n) => {
		try {
			mongoose.connection.close()
			n();
		} catch (error) {
			s.status(400).json('cannot connect to database. contact support')
		}
	}
}
module.exports = funcs;