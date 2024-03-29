const today = _ => {
	const date = new Date();
	let t
	t = date.toLocaleDateString('fa-IR').replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))
	t = t.split('/');
	t = `${t[0]}/${t[1] < 10 ? '0' : ''}${t[1]}/${t[2] < 10 ? '0' : ''}${t[2]}`;
	return t;
};
const now = d => {
	d = d ? new Date(d) : new Date();
	const h = d.getHours();
	const m = d.getMinutes();
	const s = d.getSeconds();
	return `${h < 10 ? '0' : ''}${h}-${m < 10 ? '0' : ''}${m}-${s < 10 ? '0' : ''}${s}`
}
const resp = async (func, s) => {
	try {
		s.json(await func)
	} catch (error) {
		console.log(error);
		console.log(`${error}`);
		let { status, msg } = error;
		s.status(status || 400).json(msg || 'خطا');
	}
}
const not_found = (r, s) => {
	console.log(`not found: ${r.baseUrl}`)
	s.status(404).json('not found');
};
const log = (r, s, n) => {
	let { baseUrl, headers, method } = r;
	console.log(`${today()}, ${now()}, ${method}, ${baseUrl}, ${headers.token}`);
	console.log(headers['x-forwarded-for'] || r.socket.remoteAddress);
	n();
};
const err = (msg, status) => {
	let e = new Error(msg);
	e.msg = msg || null;
	e.status = status || 400;
	throw e
};
const funcs = {
	today,
	now,
	resp,
	log,
	not_found,
	db_url: process.env.db_url || 'mongodb://localhost:27017/bookStore',
	err
};
module.exports = funcs;