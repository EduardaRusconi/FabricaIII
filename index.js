const express = require('express');
const mongoose = require('mongoose')

const app = express();
const port = 3000;
var path = require('path')

const router = require('./routes/personRoutes.js')

app.use(router)
app.use(express.json());
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './views'))


mongoose.connect('mongodb://localhost:27017')//('mongodb+srv://Caio:mongodb@cluster1.ajekz50.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
    console.log("Conectado!");
    app.listen(port, ()=>{
        
    })
})
.catch((err) => console.log(err))
