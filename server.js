const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//configuração basica
const router = require('express').Router();
const app = express();
app.use(bodyParser.json()); //para ler o corpo da requisição no formato json


//conexão do banco
mongoose.connect("mongodb://127.0.0.1:27017/rev", { 
    useNewUrlParser: true, 
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000
});

//model
const UserSchema = new mongoose.Schema({
    name: {type : String},
    email: {type:String, required : true} ,
    password : {type:String, required : true}
})

const User = mongoose.model('User', UserSchema);



//criando rota de teste
app.post("/cadastro", async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    /*
    && - E
    || - OU
    ! - não
    */
    if(name == null || email == null || password == null){
        return res.status(400).json({error : "Digite os campos!!!"});
    }

    const user = new User({
        name : name,
        email :email,
        password: password
    })
   try {
      const newUser = await user.save();
      res.json({error : null, msg: "Cadastro ok!!!", userId : newUser._id})

    }
    catch (error){
        res.status(400).json({error});
    }
});

//criando uma rota de get
app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

//faz a leitura de portas
app.listen(3000, ()=>{
    console.log("rodando na porta 3000");
})

