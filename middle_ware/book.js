const mongoose = require('mongoose');
const { db_url, err } = require('../controller/utility')
const funcs = {
	upsert: async (r, s, n) => {
		try {
			const { name, descr, initial_stock } = r.body;
			if (!name)
				err('name is required');
			if (!descr)
				err('descr is required');
			if (!initial_stock)
				err('initial stock is required');
			if (isNaN(initial_stock) || initial_stock <= 0)
				err('initial stock must be number and positive');
			n();
		} catch (error) {
			s.status(400).json(error.msg)
		}
	},
}
module.exports = funcs;