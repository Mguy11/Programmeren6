var gameController = function(Game){
    
    var post = function(req,res){
        var game = new Game(req.body);

        game.save();
        res.status(201).send(game);
    }


    var get = function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Game.find(query, function(arr,games){
            if(arr)
                res.status(500).send(err);
            else
                res.json(games);
        });
    }

    return {
        post: post,
        get: get
    }
}


module.exports = gameController;