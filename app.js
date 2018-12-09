var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/gamesAPI');

var Game = require('./models/gameModel');

var app = express();

var port = process.env.PORT || 3000;



var gameRouter = express.Router();

gameRouter.route('/Games')
    .get(function(req,res){
        Game.find(function(arr,games){
            if(arr)
                res.status(500).send(err);
            else
                res.json(games);
        });
    });
app.use('/api', gameRouter);




app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running the app on PORT: ' + port);
});