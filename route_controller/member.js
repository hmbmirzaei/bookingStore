const { resp } = require('../controller/utility');
const member = require('../controller/member');
const funcs = {
	search: async (r, s) => resp(member.search(r.query.search), s),
	c: async (r, s) => resp(member.c(r.body), s),
	r: async (r, s) => resp(member.r(r.params.member_id), s),
	u: async (r, s) => resp(member.u({ id: r.params.id, name: r.body.name }), s),
	d: async (r, s) => resp(member.d(r.params.member_id), s),
	history: async (r, s) => resp(member.history(r.params.member_id), s),
	expire: async (r, s) => resp(member.expire(r.params.member_id, r.body.expire), s),
}
module.exports = funcs