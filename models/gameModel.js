let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let gameModel = new Schema({
    title: {type: String},
    studio: {type: String},
    genre: {type: String},
    _links: {
        self: {href: {type: String}},
        collection: {href: {type: String}}
    }
   
});

module.exports = mongoose.model('Game', gameModel);