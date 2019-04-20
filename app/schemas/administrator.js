const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const administratorSchema = Schema({
    username: String,
    password: String,
    image: String,
    name: String,
    motto: String,
    address: String,
    email: String,
    profession: String,

})

module.exports = administratorSchema