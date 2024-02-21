module.exports = {
	name: { type: String, required: true, index: true  },
	descr: { type: String, required: true },
	stock: { type: Number, required: true },
	initial_stock: { type: Number, required: true },
}