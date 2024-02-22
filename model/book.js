const mongoose = require('mongoose');
const { Schema } = mongoose;
const { book } = require('../schema');
module.exports = mongoose.model('book', Schema(book));