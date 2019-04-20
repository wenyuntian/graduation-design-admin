const mongoose = require('mongoose')
const carouselSchema = require('../schemas/carousel.js')
const carousel = mongoose.model('carousel', carouselSchema)

module.exports = carousel