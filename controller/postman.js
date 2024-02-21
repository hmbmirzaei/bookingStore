const { port, base_url } = process.env
const my_header = [
	{
		key: "token",
		value: "{{token}}"
	}
];

const baseurl = `${base_url}:${port}`;
const protocol = 'http';
const apis_collection = require('../apis');
module.exports = () => {
	let items = [];
	for (const key in apis_collection) {
		const api_packs = apis_collection[key];
		const api_items = [];
		api_packs.forEach(entry => {
			const { name, method, path, body, params, description, mode, query, formdata, event, header } = entry;
			const p = [key];
			let r = `${protocol}://${baseurl}/${key}`;
			if (path) {
				p.push(path)
				r += `/${path}`
			}
			let api = {
				name,
				event: event ? [
					{
						listen: "test",
						script: {
							exec: [
								"pm.collectionVariables.set('token', pm.response.json().token);",
							],
							type: "text/javascript"
						}
					}
				] : undefined,
				request: {
					description,
					method,
					header: header == false ? undefined : my_header,
					url: {
						raw: r,
						path: p,
						protocol,
						host: [
							baseurl
						],
						variable: {},
						query: {}
					},
					body: {},
				},
			};
			if ((method == 'post' || method == 'put') && (body || formdata))
				api.request.body = mode == 'raw' ?
					{
						mode,
						raw: JSON.stringify(body),
						options: {
							raw: {
								language: "json"
							}
						}
					}
					:
					{
						mode,
						formdata
					}

			if (params) {
				params.forEach(v => {
					api.request.url.path.push(`:${v.key}`)
					api.request.url.raw += `/:${v.key}`
				});
				api.request.url.variable = params
			}
			if (query) {
				api.request.url.raw += '?'
				api.request.url.query = query.map(({ key, value }) => {
					api.request.url.raw += `${key}=${value}`
					return { key, value }
				})
			};
			api_items.push(api)
		});
		items.push({
			name: key,
			items: api_items
		})
	}
	return {
		info: {
			name: 'book store',
			description: `book store api collection`,
			schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		},
		item: items,
		variable: [
			{
				key: "token",
				value: "",
				type: "string"
			},
		]
	}
}