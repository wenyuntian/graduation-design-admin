const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carouselSchema = Schema({
    type: Number,
    path: String
})

module.exports = carouselSchema