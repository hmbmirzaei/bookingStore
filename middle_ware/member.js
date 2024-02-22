const mongoose = require('mongoose');
const { db_url, err } = require('../controller/utility')
const funcs = {
	create: async (r, s, n) => {
		try {
			const { name } = r.body;
			if (!name)
				err('name is required');
			n();
		} catch (error) {
			s.status(400).json(error.msg)
		}
	},
	expire: async (r, s, n) => {
		try {
			const { expire } = r.body;
			if (!expire)
				err('expire is required');
			if (myDate instanceof Date)
				err('expire is not date');
			n();
		} catch (error) {
			s.status(400).json(error.msg)
		}
	},
}
module.exports = funcs;