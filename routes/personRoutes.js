const router = require('express').Router()
const Sub = require('../models/sub.js')
const Sponsor = require('../models/sponsor.js')
const bodyParser = require('body-parser')

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/sub', async (req,res) =>{
    
    try{
        const people = await Sub.find()

        res.status(200).json(people)
    }
    catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/sponsor', async (req,res) =>{

    try{
        const crowd = await Sponsor.find()

        res.status(200).json(crowd)
    }
    catch(error){
        res.status(500).json({error: error})
    }
})


router.post('/sub', async (req, res) =>{


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







router.post('/sponsor', async (req, res) =>{

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

router.delete('/sub/:name', async (req, res) =>{

    const name = req.params.name

    const sub = await Sub.findOne({ name: name})
    try {
            if(!sub){
                res.status(422).json({message: "Usuario não encontrado"})
            }
                await Sub.deleteOne({name: name})
                console.log({message: "Deletado!"})
                res.status(200).json(sub)
            
        } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/sponsor/:Razao_social', async (req, res) =>{

    const Razao_social = req.params.Razao_social

    const sponsor = await Sponsor.findOne({ Razao_social: Razao_social})
    try {
            if(!sponsor){
                res.status(422).json({message: "Usuario não encontrado"})
            }
                await Sponsor.deleteOne({Razao_social: Razao_social})
                console.log({message: "Deletado!"})
                res.status(200).json(sponsor)
            
        } catch (error) {
        res.status(500).json({error: error})
    }
})


router.patch('/sub/:id', async (req, res) =>{

    const id = req.params.id

    
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
        

        const updatedsub = await Sub.updateOne({ _id: id}, sub)
        res.status(201).json(sub)

    } catch (error){
        res.status(500).json({error: error})
    }

})


router.patch('/sponsor/:id', async (req, res) =>{

    const id = req.params.id
    const {Razao_social, cnpj, email, telefone} = req.body

    if(!Razao_social || !cnpj){
        res.status(422).json({error: 'Favor preencher todos os campos'})
    }

    const sponsor = {
        Razao_social,
        cnpj,
        email,
        telefone
    }

    try{

        const updatedSponsor = await Sponsor.updateOne({ _id: id}, sponsor)
        res.status(201).json(sponsor)

    } catch (error){
        res.status(500).json({error: error})
    }

})


module.exports = router;