const { port } = process.env
console.log({ port })
const my_header = [
	{
		key: "access_token",
		value: "{{access_roken}}"
	}
];

const baseurl = `localhost:${port}`;
const protocol = 'http';
const postman = require('../apis');
console.log({ postman });
module.exports = { aa: 12 }
// export const postan_doc = () => {
// 	let items = [];
// 	for (const key in apis_collection) {
// 		const api_packs = apis_collection[key];
// 		const api_items: any = [];
// 		api_packs.forEach((entry: ApiEntry) => {
// 			const { name, method, path, body, params, description, mode, query, formdata, event, header } = entry;
// 			const p = [key];
// 			let r = `${protocol}://${baseurl}/${key}`;
// 			if (path) {
// 				p.push(path)
// 				r += `/${path}`
// 			}
// 			let api = {
// 				name,
// 				event: event ? [
// 					{
// 						listen: "test",
// 						script: {
// 							exec: [
// 								"pm.collectionVariables.set('access_roken', pm.response.json().access_token);",
// 								"pm.collectionVariables.set('refresh_token', pm.response.json().refresh_token);"
// 							],
// 							type: "text/javascript"
// 						}
// 					}
// 				] : undefined,
// 				request: {
// 					description,
// 					method,
// 					header: header == false ? undefined : my_header,
// 					url: {
// 						raw: r,
// 						path: p,
// 						protocol,
// 						host: [
// 							baseurl
// 						],
// 						variable: {},
// 						query: {}
// 					},
// 					body: {},
// 				},
// 			};
// 			if ((method == 'post' || method == 'put') && (body || formdata))
// 				api.request.body = mode == 'raw' ?
// 					{
// 						mode,
// 						raw: JSON.stringify(body),
// 						options: {
// 							raw: {
// 								language: "json"
// 							}
// 						}
// 					}
// 					:
// 					{
// 						mode,
// 						formdata
// 					}

// 			if (params) {
// 				params.forEach(v => {
// 					api.request.url.path.push(`:${v.key}`)
// 					api.request.url.raw += `/:${v.key}`
// 				});
// 				api.request.url.variable = params
// 			}
// 			if (query) {
// 				api.request.url.raw += '?'
// 				api.request.url.query = query.map(({ key, value }) => {
// 					api.request.url.raw += `${key}=${value}`
// 					return { key, value }
// 				})
// 			};
// 			api_items.push(api)
// 		});
// 		items.push({
// 			name: key,
// 			items: api_items
// 		})
// 	}
// 	return {
// 		info: {
// 			name: 'HMB',
// 			description: `HMB api collection`,
// 			schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
// 		},
// 		item: items,
// 		variable: [
// 			{
// 				key: "access_roken",
// 				value: "",
// 				type: "string"
// 			},
// 			{
// 				key: "refresh_token",
// 				value: "",
// 				type: "string"
// 			}
// 		]
// 	}
// }