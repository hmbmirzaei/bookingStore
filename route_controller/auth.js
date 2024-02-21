const { login, check } = require('../controller/auth');
const { resp, err } = require('../controller/utility');

const funcs = {
	login: (r, s) => resp(login(r.body), s),
	check: async (r, s, n) => {
		try {
			if (!r.headers.token)
				err('wrong credential');
			r.user_id = await check(r.headers.token);
			n();
		} catch (error) {
			s.status(401).json(err.msg || 'wrong credential');
		};
	}
}
module.exports = funcs