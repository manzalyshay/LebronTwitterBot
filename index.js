console.log('Twitter bot started');

var Twit = require('twit');
var fs = require('fs');
var config = require('./config');
var T = new Twit(config);

// // Optional filter by Cleveland location
// var Cleveland = [ '-81.89', '41.21', '-81.32', '41.60' ]
//
// var stream = T.stream('statuses/filter', { locations: Cleveland })

//  filter by keywords
var stream = T.stream('statuses/filter', { track: ['lebron', 'lebron james', 'kingjames'] })

stream.on('tweet', gotTweet);

function gotTweet(tweet) {

    if (tweet){
        //Retweets the tweet containing the keywords

        var nameID = tweet.id_str;


        // Post a gif with a mention to the tweet author
        var name = tweet.user.screen_name;

        var b64content = fs.readFileSync(process.cwd() + "/lebron.gif", { encoding: 'base64' });

        T.post('media/upload', {media: b64content}, function(err, data, res) {
            if (err) console.log(err);
            console.log(data);
            T.post('statuses/update', {status: 'KING JAMES', media_ids: data.media_id_string}, function(err, params, res) {
                if (err) console.log(err);
                console.log(params);
            });
        });


         T.post('statuses/retweet', { id: nameID }, retweeted);
         console.log('Attempting to retweet ' + tweet.id_str + ": " + tweet.text);

        // retweet callback
        function retweeted(err, data, response) {
            if (err) {
                console.log("Error: " + err.message);
            } else {
                console.log('Retweeted: ' + tweet.id);
            }
        }

    }
}


