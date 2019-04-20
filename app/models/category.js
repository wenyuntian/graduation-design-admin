const mongoose = require('mongoose')
const categorySchema = require('../schemas/category.js')
const category = mongoose.model('category', categorySchema)

module.exports = category