const { resp } = require('../controller/utility');
const book = require('../controller/book');
const funcs = {
	search: (r, s) => resp(book.search(r.query.search), s),
}
module.exports = funcs