const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = Schema({
    author: String,
    coverPath: String,
    title: {type: String, required: [true, '标题必填']},
    abstract: {type: String, required: [true, '简介必填']},
    category: {type: String, required: [true, '类别必填']},
    keyWords: Array,
    content: String,
    views: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 0,
    },
    isRecommend: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = articleSchema