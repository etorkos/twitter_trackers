var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var oauth = require('oauth');
var http = require('http');
var routes = require('./routes/index');
var app = express();
var server = http.createServer();
var Twit = require('twit');
var twitterKeys = require('./oauth');
console.log(twitterKeys);

app.set('views', path.join(__dirname, 'views'));
var indexHtmlPath = path.join(__dirname, './views/index.html');
var angularPath = path.join(__dirname, './bower_components')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(angularPath));

server.on('request', app);
server.listen(3000, function(){
  console.log('App is listening on port 3000');
})

app.get('/', function (req, res) {
    res.sendFile(indexHtmlPath);
});

app.use('/', routes);

  var new_york = [ '-74','40','-73','41' ];
  var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];

    var T = new Twit(twitterKeys);

    var stream = T.stream('statuses/filter', {locations:new_york});
    stream.on('tweet', function (tweet) {
      var obj = { 
        id: tweet.id,
        location: tweet.location,
        text: tweet.text}
    console.log(tweet)
    })

    // var stream = T.stream('statuses/sample')
    // stream.on('tweet', function(tweet){
    //   console.log(tweet);
    // })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
