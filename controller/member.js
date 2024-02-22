const { Book, History, Member } = require('../model');
const { err } = require('./utility');
const m = async id => {
	const member = await Member.findById(id);
	if (!member)
		err('member not found');
	return member;
}
const funcs = {
	search: async search => {
		const members = await Member.find({ name: { $regex: search ? search : '', $options: 'i' } });
		return members.map(({ id, name, expire }) => {
			return { id, name, expire }
		});
	},
	c: async ({ name }) => {
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
	r: async member_id => {
		const member = await m(member_id);
		const histories = await History.find({
			member_id
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
	u: async ({ member_id, name }) => {
		const member = await m(member_id);
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
		await member.save();
		return member_id;
	},
	d: async member_id => {
		const member = await m(member_id);
		const histories = await History.find({
			member_id
		});
		if (histories.length)
			err('book borroewd and can not deleted');
		await member.deleteOne();
		return 'done'
	},
	history: async id => {
		await m(id);
		const histories = await History.find({
			member_id: id
		});
		return histories.sort((a, b) => a.borrow_date - b.borrow_date).map(({
			member_id,
			member_name,
			book_id,
			book_name,
			borrow_date,
			return_date
		}) => {
			return {
				member_id,
				member_name,
				book_id,
				book_name,
				borrow_date,
				return_date: return_date ? return_date : null
			}
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