var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gameModel = new Schema({
    title: {type: String},
    studio: {type: String},
    genre: {type: String},
    _links: JSON
   
});

module.exports = mongoose.model('games', gameModel);