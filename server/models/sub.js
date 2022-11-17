const mongoose = require('mongoose')

const Sub = mongoose.model('Sub', {
    name: String,
    RA: Number,
    course: String,
})

module.exports = Sub