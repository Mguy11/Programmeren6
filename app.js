var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/gamesAPI_test');
}
else{
    db = mongoose.connect('mongodb://localhost/GamesAPI');
}
var Game = require('./models/gameModel');

var app = express();

var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

gameRouter = require('./Routes/gameRoutes')(Game);

app.use('/api/games', gameRouter);

app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running the app on PORT: ' + port);
});

app.options("/api/games", function(req,res,next){
    res.header('Accesa-Control-Allow-Origin', null);
    res.header('Allow', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Header', 'Content-Type, Authorization, Content-Length, X-Request-Width');
    res.send(200);
  });



module.exports = app;