const mongoose = require('mongoose');
const { Schema } = mongoose;
const { member } = require('../schema');
module.exports = mongoose.model('member', Schema(member));