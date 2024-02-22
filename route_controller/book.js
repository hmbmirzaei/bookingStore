const { resp } = require('../controller/utility');
const book = require('../controller/book');
const funcs = {
	search: async (r, s) => resp(book.search(r.query.search), s),
	c: async (r, s) => resp(book.c(r.body), s),
	r: async (r, s) => resp(book.r(r.params.book_id), s),
	u: async (r, s) => resp(book.u({
		id: r.params.id,
		name: r.body.name,
		descr: r.body.descr,
		initial_stock: r.body.initial_stock
	}), s),
	d: async (r, s) => resp(book.d(r.params.book_id), s),
	borrowed: async (r, s) => resp(book.borrowed(r.params.book_id, r.params.member_id), s),
	returned: async (r, s) => resp(book.returned(r.params.book_id, r.params.member_id), s),
	history: async (r, s) => resp(book.history(r.params.book_id), s),
}
module.exports = funcs