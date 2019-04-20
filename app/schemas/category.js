const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = Schema({
    name: {
        type: String, 
        required: [true, '类别名必填']
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = CategorySchema