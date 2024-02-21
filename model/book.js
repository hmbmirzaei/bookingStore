const mongoose = require('mongoose');
const { Schema } = mongoose;
const { book } = require('../schema');
book.members = [{ type: Schema.Types.ObjectId, ref: 'Member' }];
module.exports = mongoose.model('book', Schema(book));