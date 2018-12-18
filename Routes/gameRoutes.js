var express = require('express');

var routes = function(Game){
    var gameRouter = express.Router();

    var gameController = require('../Controllers/gameController')(Game);

    gameRouter.route('/')
    
        .post(gameController.post)
        .get(gameController.get)
        .options(gameController.options)

    gameRouter.use('/:gameId', function(req,res,next){

        Game.findById(req.params.gameId, function(arr,game){
            if(arr)
                res.status(500).send(err);
            else if(game)
            {
                req.game = game;
                next();
            }
            else
            {
                res.status(404).send('No game found.');
            }
        });

    });
    gameRouter.route('/:gameId')

        .get(function(req, res){
            let returnGame = req.game.toJSON();
            returnGame._links = {};
            let newLink = 'http://' + req.headers.host + '/api/games/?genre' + returnGame.genre;
            returnGame._links.FilterByThisGenre = newLink.replace(' ', '%20');
            returnGame._links.self = {};
            returnGame._links.self.href = 'http://' + req.headers.host + '/api/games/' + returnGame._id;
            returnGame._links.collection = {};
            returnGame._links.collection.href = 'http://' + req.headers.host + '/api/games/';
            res.json(returnGame);
        })

        .put(function(req,res){
            if(!req.body.title || !req.body.studio || !req.body.genre){
                res.status(400)
                res.send('All fields are required!');
            }
            else{
            req.game.title = req.body.title;
            req.game.studio = req.body.studio;
            req.game.genre = req.body.genre;
            req.game.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.game);
                }

            })  
        }
        }) 
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.game[p] = req.body[p];
            }

            req.game.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(req.game);
            });
        })

        .delete(function(req,res){
            req.game.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        })

        .options(function(req,res){

            res.header('Allow', 'GET, PUT, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
            res.sendStatus(200).end();
        });

    return gameRouter;

};

module.exports = routes;