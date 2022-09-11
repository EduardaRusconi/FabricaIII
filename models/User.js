const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    login: String,
    password: String,
    confirmpassword: String
})

module.exports = User