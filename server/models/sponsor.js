const mongoose = require('mongoose')

const Sponsor = mongoose.model('Sponsor', {

        Razao_social: String,
        cnpj: Number,
        email: String,
        telefone: Number
    
})

module.exports = Sponsor