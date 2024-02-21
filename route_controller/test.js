const { utility: { resp }, test: { tester } } = require('../controller');
const funcs = {
	tester: (r, s) => resp(tester(), s)
}
module.exports = funcs