const mongoose = require('mongoose');
const { Schema } = mongoose;
const { user } = require('../schema');
module.exports = mongoose.model('user', Schema(user));