const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

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

app.get('/churro/:id', (req, res) => {

    let query = {
        _id: ObjectID(req.params.id)
    };


    req.db.collection('sabores').findOne(query, (error, data) =>{
        if(error){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }

        if(!data){
            res.status(404).send();
            return;
        }
            res.send(data);
    });
});

app.get('/churros/:sabor', (req, res) => {
    let query = {
        sabor: req.params.sabor
    }
    req.db.collection('sabores').find(query).toArray((error, data) =>{
        if(error){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
            res.send(data);
    });
});
app.listen(3000);
