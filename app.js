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

app.use(function(req, res, next){

    if (req.accepts('json')) {
  
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
      
      next()
      return
    }
  
    res.status(415).send('This app only accepts json')
  });

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

module.exports = app;