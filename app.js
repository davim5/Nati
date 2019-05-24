const express = require('express');
const app = express();
let http = require('http');
let fs = require('fs');
var bodyParser = require("body-parser");
app.set('view engine','ejs');
var request = require('request');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) =>{
    fs.readFile('views/index.ejs', null, function(error,data){
        res.write(data); 
    })

})

app.get('/filmes', function(req,res){
    
    var nomeDoFilme = req.query.nomeDoFilme;
    console.log(nomeDoFilme);


    request("http://www.omdbapi.com/?t=" + nomeDoFilme + "&apikey=99b54562", function(error, response, body){
        console.log('StatusCode: ',response && response.statusCode);
        console.log('body:', body);
        res.render("resultado", {
             DadosFilmes: JSON.parse(body)

        });
        
    })    
});

app.listen(3000);