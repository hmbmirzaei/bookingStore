const mongoose = require('mongoose');
const { Book } = require('../model');
const { err } = require('./utility');
const funcs = {
	search: async search => {
		const books = await Book.find({
			$or: [
				{ name: { $regex: search, $options: 'i' } },
				{ descr: { $regex: search, $options: 'i' } }
			]
		})
		return books.map(({ id, name, descr, stock, initial_stock }) => {
			return { id, name, descr, stock, initial_stock }
		});
	},
	book: async id => {
		console.log({ id })
		const book = await Book.findById(id);
		if (!book)
			err('book not found');
		return {	
			_id: book.id,
			name: book.name,
			descr: book.descr,
			stock: book.stock,
			initial_stock: book.initial_stock,
			members: book.members.map(x => {
				return x
			})
		}
	}
};
module.exports = funcs