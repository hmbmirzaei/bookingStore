const mongoose = require('mongoose');
const { Schema } = mongoose;
const { member } = require('../schema');
member.books = [{ type: Schema.Types.ObjectId, ref: 'Book' }];
module.exports = mongoose.model('member', Schema(member));