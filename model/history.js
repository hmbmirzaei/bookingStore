const mongoose = require('mongoose');
const { Schema } = mongoose;
const { history } = require('../schema');
module.exports = mongoose.model('history', Schema(history));