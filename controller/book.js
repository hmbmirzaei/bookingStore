const { Book, History, Member } = require('../model');
const { err } = require('./utility');
const b = async id => {
	const book = await Book.findById(id);
	if (!book)
		err('book not found');
	return book;
}
const funcs = {
	search: async search => {
		search = search ? search.trim() : '';
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
	c: async ({ name, descr, initial_stock }) => {
		let book = await Book.exists({
			name
		});
		if (book)
			err(`${name} already exists`);

		book = new Book({
			name,
			descr,
			stock: initial_stock,
			initial_stock
		});
		await book.save();
		return book.id;
	},
	r: async id => {
		const book = await b(id);
		const histories = await History.find({
			book_id: id
		});
		return {
			_id: book.id,
			name: book.name,
			descr: book.descr,
			stock: book.stock,
			initial_stock: book.initial_stock,
			histories: histories.map(x => {
				return {
					id: x.id,
					title: x.name,
					borrow_date: x.borrow_date,
					return_date: x.return_date
				}
			})
		}
	},
	u: async ({ book_id, name, descr, initial_stock }) => {
		console.log({ book_id, name, descr, initial_stock })
		const book = await b(book_id);
		if (name !== book.name) {
			let another_book = await Book.exists({
				name
			});
			if (another_book)
				err(`${name} already exists`);
		}


		const histories = await History.find({
			book_id
		});
		if (histories.length)
			err('book borroewd and can not edit');
		book.name = name;
		book.descr = descr;
		book.stock = initial_stock;
		book.initial_stock = initial_stock;
		await book.save();
		return book_id;
	},
	d: async book_id => {
		const book = await b(book_id);
		const histories = await History.find({
			book_id
		});
		if (histories.length)
			err('book borroewd and can not deleted');
		console.log(book)
		await book.deleteOne();
		return 'done'
	},
	borrowed: async (book_id, member_id) => {
		const book = await b(book_id);
		if (book.stock <= 0)
			err('out of stock');
		const member = await Member.findById(member_id);
		if (!member)
			err('member not exists');
		const nd = new Date();
		if (member.expire && member.expire <= nd)
			err('member expired');

		book.stock -= 1;
		const history = new History({
			member_id,
			member_name: member.name,
			book_id,
			book_name: book.name,
			borrow_date: new Date()
		});
		await book.save();
		await history.save();
		return { book: book.name, member: member.name }
	},
	returned: async (book_id, member_id) => {
		const book = await b(book_id);
		if (!book.stock)
			err('out of stock');
		const member = await Member.findById(member_id);
		if (!member)
			err('member not exists');

		const history = await History.findOne({
			member_id,
			book_id,
			return_date: null
		});
		history.return_date = new Date();
		book.stock += 1;
		await book.save();
		await history.save();
		return { book: book.name, member: member.name }
	},
	history: async id => {
		const book = await b(id);
		const histories = await History.find({
			book_id: id
		});
		return histories.sort((a, b) => a.borrow_date - b.borrow_date).map(({
			member_id,
			member_name,
			book_id,
			book_name,
			borrow_date,
			return_date
		}) => {
			return {
				member_id,
				member_name,
				book_id,
				book_name,
				borrow_date,
				return_date: return_date ? return_date : null
			}
		})
	}
};
module.exports = funcs