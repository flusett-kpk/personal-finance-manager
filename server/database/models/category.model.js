const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
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
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category }