var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gameModel = new Schema({
    title: {type: String},
    studio: {type: String},
    genre: {type: String},
    played: {type: Boolean, default:false}
});

module.exports = mongoose.model('Game', gameModel);