const { Book, History, Member } = require('../model');
const { err } = require('./utility');
const m = async id => {
	const member = await Member.findById(id);
	if (!member)
		err('book not found');
	return member;
}
const funcs = {
	search: async search => {
		const members = await Book.find({ name: { $regex: search, $options: 'i' } });
		return members.map(({ id, name, expire }) => {
			return { id, name, expire }
		});
	},
	c: async name => {
		let member = await Member.exists({
			name
		});
		if (member)
			err(`${name} already exists`);

		member = new Member({
			name,
		});
		await member.save();
		return member.id;
	},
	r: async id => {
		const member = await m(id);
		const histories = await History.find({
			member_id: ObjectId(id)
		});
		return {
			_id: member.id,
			name: member.name,
			expire: member.expire,
			histories: histories.map(x => {
				return {
					book_id: x.book_id,
					borrow_date: x.borrow_date,
					return_date: x.return_date
				}
			})
		}
	},
	u: async ({ id, name, expire }) => {
		const member = await m(id);
		if (member.expire)
			err('member expired');
		if (name != member.name) {
			const another_member = await Member.exists({
				name
			});
			if (another_member)
				err(`${name} already exists`);
		}
		member.name = name;
		member.expire = expire;
		await member.save();
		return id;
	},
	d: async id => {
		const member = await m(id);
		const histories = await History.find({
			member_id: ObjectId(member.id)
		});
		if (histories.length)
			err('book borroewd and can not deleted');
		await member.remove();
		return 'done'
	},
	history: async id => {
		const member = await m(id);
		const histories = await History.find({
			member_id: id
		});
		return histories.map(({ book_id, borrow_date, return_date }) => {
			return { book_id, borrow_date, return_date }
		})
	},
	expire: async (id, expire) => {
		const member = await m(id);
		if (!member)
			err('not found');
		if (member.expire)
			err('expired before')
		member.expire = expire;
		await member.save();
		return id
	}
};
module.exports = funcs