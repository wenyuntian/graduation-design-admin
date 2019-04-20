const mongoose = require('mongoose')
const linkSchema = require('../schemas/link.js')
const link = mongoose.model('link', linkSchema)

module.exports = link