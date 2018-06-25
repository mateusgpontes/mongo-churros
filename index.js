const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(expressMongoDb('mongodb://localhost/mongo-churros'));

app.get('/churros', (req, res) => {

    req.db.collection('sabores').find().toArray((error, data) =>{
        if(error){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
            res.send(data);
    });
});

app.post('/churro', (req, res) =>{
    req.db.collection('sabores').insert(req.body, (error) =>{
       if(error){
           res.status(500).send('Erro ao acessar o bando de dados');
           return;
       }
       res.send(req.body);
    });
});

app.listen(3000);
