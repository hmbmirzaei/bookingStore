const mongoose = require('mongoose');
const { Schema } = mongoose;
const { history } = require('../schema');
history.member = { type: Schema.Types.ObjectId, ref: 'Member' };
history.book = { type: Schema.Types.ObjectId, ref: 'Book' };
module.exports = mongoose.model('history', Schema(history));