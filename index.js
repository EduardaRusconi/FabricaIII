const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Sub = require('./models/sub.js')
const Sponsor	= require('./models/sponsor.js')

const port = 3000;

app.use(express.json());


app.get('/', (req,res) =>{
    app.get
})

app.post('/sub', async (req, res) =>{

    const {name, RA, course} = req.body

    if(!name){
        res.status(422).json({error: 'nome invalido'})
    }

    const sub = {
        name,
        RA,
        course
    }

    try{

        await Sub.create(sub)
        res.status(201).json({message: 'pessoa inserida'})

    } catch (error){
        res.status(500).json({error: error})
    }

})

app.post('/sponsor', async (req, res) =>{

    const {Razao_social, cnpj, email, telefone} = req.body

    if(!cnpj || !Razao_social || !email || !telefone){
        res.status(422).json({error: 'Favor preencher todos os campos'})
    }

    const sponsor = {
        Razao_social,
        cnpj,
        email,
        telefone
    }

    try{

        await Sponsor.create(sponsor)
        res.status(201).json({message: 'Patrocinador inserido'})

    } catch (error){
        res.status(500).json({error: error})
    }

})

mongoose.connect('mongodb+srv://Caio:mongodb@cluster1.ajekz50.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
    console.log("Conectado! Parabens");
    app.listen(port, ()=>{
        
    })
})
.catch((err) => console.log(err))




