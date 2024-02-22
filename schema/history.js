const mongoose = require('mongoose');
module.exports = {
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    member_name: { type: String, required: true },
    book_name: { type: String, required: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    borrow_date: { type: Date, required: true },
    return_date: Date
}