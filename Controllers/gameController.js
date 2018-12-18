var gameController = function(Game){
    
    var post = function(req,res){
        var game = new Game(req.body);
        
        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else{
        game.save();
        res.status(201);
        res.send(game);
        }
    }


    var get = function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }

        Game.find(query, function(arr,Games){

            if(arr)
                res.status(500).send(err);
            else
                var items = [];

                Games.forEach(function(element, index, array){
                    var item = element.toJSON();
                    item._links = {};
                    item._links.self = {};
                    item._links.self.href = 'http://' + req.headers.host + '/api/games/' + item._id;
                    item._links.collection = {}
                    item._links.collection.href = "http://" + req.headers.host + 'api/games';
                    items.push(item);
                })

                let _links = {
                    "self": {
                        "href": "http://51.68.188.157:8000/api/games"
                    }
            }

            let pagination = {
                "currentPage": 1,
                "currentItems": 28,
                "totalPages": 1,
                "totalItems": 28,
                "_links": {
                    "first": {
                        "page": 1,
                        "href": "http://51.68.188.157:8000/api/games"
                    },
                    "last": {
                        "page": 1,
                        "href": "http://51.68.188.157:8000/api/games"
                    },
                    "previous": {
                        "page": 1,
                        "href": "http://51.68.188.157:8000/api/games"
                    },
                    "next": {
                        "page": 1,
                        "href": "http://51.68.188.157:8000/api/games"
                    }
                }
            }

                res.json({items, _links, pagination});
        });
    }

    var options = function(req,res){

        res.header('Allow', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.sendStatus(200).end();
    }

    var optionsDetail = function(req,res){

        res.header('Allow', 'GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
        res.sendStatus(200).end();
    }

  

    return {
        post: post,
        get: get,
        options: options,
        optionsDetail: optionsDetail
    }
}


module.exports = gameController;