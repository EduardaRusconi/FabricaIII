require('dotenv').config()
const router = require('express').Router()
const Sub = require('../models/sub.js')
const Sponsor = require('../models/sponsor.js')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')


router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))



router.post('/login', async (req, res) =>{
    const {name, login, password} = req.body

    if(!name || !login || !password){
        return res.status(422).json({"msg": "Preencha todos os campos!"})
    }
    if (!password){
        return res.status(422).json({ "msg": "Senhas não conferem"})
    }

    const UserExists = await User.findOne({ login: login})
    if(UserExists){
        return res.status(422).json({ "msg": "Login ja cadastrado"})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User ({
        name,
        login,
        password: passwordHash,
        
    })

    try{
        

        await user.save()
        res.status(201).json({"msg": 'Login cadastrado'})

    } catch (error){
        res.status(500).json({error: error})
    }


    //const checkpassword = await bcrypt.compare()
})

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  
    try {
      const secret = "fhdsajkhfdjklsFDSAFDSAfhdsajfdsa10324sad65fdsFDSAfdsa45f4dsa"
  
      jwt.verify(token, secret);
  
      next();
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" });
    }
  }

router.post('/login/auth', async (req, res)=>{
    const {login, password} = req.body

    if(!login || !password){
        res.status(422).json({msg: 'Email/senha necessario'})
    }

    const user = await User.findOne({ login: login})
    if(!user){
        return res.status(422).json({ "msg": "Login não encontrado"})
    }
    
    const checkpassword = await bcrypt.compare(password, user.password)

    if(!checkpassword){
        return res.status(422).json({"msg": 'Senha invalida'})
    }

    try{
        const secret = "fhdsajkhfdjklsFDSAFDSAfhdsajfdsa10324sad65fdsFDSAfdsa45f4dsa"
        const token = jwt.sign(
        {
            id: user._id
        },
        secret
        )
        res.status(200).json({msg: 'Autenticação realizada com sucesso', token})
    } catch(error){
        res.status(500).json({error: error})
    }

})

router.get('/login/:id', checkToken, async (req, res) =>{
    const id = req.params.id

    const user = await User.findById(id, '-password')
    if(!user){
        return res.status(404).json({msg: 'Usuario não encontrado'})
    }
    res.status(200).json({ user })
})

function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({msg: 'Acesso negado!'})
    }
    try {
        const secret = "fhdsajkhfdjklsFDSAFDSAfhdsajfdsa10324sad65fdsFDSAfdsa45f4dsa"
        jwt.verify(token, secret)

        next()
    } catch (error) {
        res.status(400).json({msg: 'Token invalido!'})
    }
}



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