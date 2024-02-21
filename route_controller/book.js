const { resp } = require('../controller/utility');
const book = require('../controller/book');
const funcs = {
	search: async (r, s) => resp(book.search(r.query.search), s),
	book: async (r, s) => resp(book.book(r.params.id), s)
}
module.exports = funcs