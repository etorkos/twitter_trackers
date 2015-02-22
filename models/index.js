var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Twitter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Word, FoodTruck, Tweet;
var Schema = mongoose.Schema;

var wordSchema = new Schema({
  word: {type: String, unique: true }, //protected
  afraid: Number,
  amused: Number,
  angry: Number,
  annoyed: Number,
  dont_care: Number,
  happy: Number,
  inspired: Number,
  sad: Number
});

var foodTruckSchema = new Schema({
	name: {type: String, unique: true },
	link: String,
	twitterFeed: String,
	location: [Number]
})

var tweetSchema = new Schema({
  id: String,
  location: String,
  text: String
})

Word = mongoose.model('Word', wordSchema);
FoodTruck = mongoose.model('FoodTruck', foodTruckSchema);
Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = { "Word": Word, "FoodTruck": FoodTruck, "Tweet": Tweet};