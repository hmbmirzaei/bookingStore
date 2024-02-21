const { Router } = require(`express`);
let router = Router();
const api_list = require(`../apis`);
Object.keys(api_list).forEach(items => {
	const apis = api_list[items];
	apis.forEach(({ method, path, params, controller }) => {
		let url = `/${items}`;
		if (path) url += `/${path}`;
		if (params)
			params.forEach(param => {
				url += `/:${param.key}`;
			})

		router[method](url, controller)
	});
});
module.exports = router;
