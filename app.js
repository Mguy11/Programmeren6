let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/GamesAPI');

let Game = require('./models/gameModel');

let app = express();

let port = process.env.PORT || 8000;

app.options("/api", function(req, res, next){

    res.header('Allow', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.send(200);

  });

  app.options("/api/:gameId", function(req, res, next){

    res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
    res.send(200);

  });

app.use(function(req, res, next){

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');

    if(req.accepts('json')){
        next()
        return;
    }

    res.sendStatus(404)
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

gameRouter = require('./Routes/gameRoutes')(Game);

app.use('/api/', gameRouter);

app.get('/', function(req, res){
    res.send('Welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running the app on PORT: ' + port);
});

module.exports = app;