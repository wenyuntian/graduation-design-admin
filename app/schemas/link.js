const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = Schema({
    name: String,
    path: String,
    createAt: {
        type: Date,
        default: Date.now()
    } 
})

module.exports = linkSchema