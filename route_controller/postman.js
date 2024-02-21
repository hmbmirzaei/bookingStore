const { utility: { resp } } = require('../controller');
const postman = require('../controller/postman');
const funcs = {
    postman: (r, s) => resp(postman, s),
}
module.exports = funcs