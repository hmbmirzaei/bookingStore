const { utility: { resp }, auth: { login } } = require('../controller');
const funcs = {
    login: (r, s) => resp(login(r.body), s)
}
module.exports = funcs