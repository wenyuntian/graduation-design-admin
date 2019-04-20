const mongoose = require('mongoose')
const administratorSchema = require('../schemas/administrator.js')
const administrator = mongoose.model('administrator', administratorSchema)

module.exports = administrator