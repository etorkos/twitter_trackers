var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'your consumer Key',
    consumerSecret: 'your consumer secret',
    callback: 'http://yoururl.tld/something'
});

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
        //store token and tokenSecret somewhere, you'll need them later; redirect user 
    }
});

twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
    if (error) {
        console.log(error);
    } else {
        //store accessToken and accessTokenSecret somewhere (associated to the user) 
        //Step 4: Verify Credentials belongs here 
    }
});