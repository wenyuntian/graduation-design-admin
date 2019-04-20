const mongoose = require('mongoose')
const articleSchema = require('../schemas/article.js')
const article = mongoose.model('article', articleSchema)

module.exports = article