const mongoose = require('mongoose');
const { Book } = require('../model');
const { db_url } = require('./utility')
const funcs = {
	search: async search => {
		await mongoose.connect(db_url);
		const books = await Book.find({
			$or: [
				{ name: { $regex: search, $options: 'i' } },
				{ descr: { $regex: search, $options: 'i' } }
			]
		})
		await mongoose.connection.close();
		return books.map(({ id, name, descr, stock, initial_stock }) => {
			return { id, name, descr, stock, initial_stock }
		});
	}
};
module.exports = funcs