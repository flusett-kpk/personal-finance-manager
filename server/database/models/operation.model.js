const mongoose = require('mongoose');

const OperationSchema = new mongoose.Schema({
    _categoryId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    category: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    sum: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    date: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    }
})

const Operation = mongoose.model('Operation', OperationSchema);

module.exports = { Operation }