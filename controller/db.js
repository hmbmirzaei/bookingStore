const mongoose = require('mongoose');

const f = async () => {
	await mongoose.connect('mongodb://localhost:27017/bookStore');
	const { Schema } = mongoose;
	const bookSchema = require('../model/book')
	const Book = mongoose.model('book', Schema(bookSchema));
	let book = new Book({
		name: 'تست',
		descr: 'زندگینامه',
		stock: 15,
		initial_stock: 15
	});
	await book.save();
	book = new Book({
		name: 'استاد dddddd',
		descr: 'پروفسور حسابی',
		stock: 18,
		initial_stock: 18
	});
	await book.save();
	const books = await Book.find()
	console.log(books);
}
// f();
module.exports = mongoose.connect('mongodb://localhost:27017/bookStore');