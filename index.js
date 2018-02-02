var express = require('express');
var processor = require('./processor/module.js');
var bodyParser = require('body-parser');
var request = require('request');
var async = require('async');
var app = express();

var port = process.env.PORT||3000;


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
})//Sends HTML

app.get("/api/process", function(req, res) {
    var result = processor.loopback("Amit");
    res.send(result);
})//Sample for Sending and Receiveing Data


app.post("/api", function(req, res) {
    console.log("Incoming Request Payload" + JSON.stringify(req.body));
    var answer = processor.concat(req);
    
    res.send(answer);
})//POST sample

// Getting a response from zomato api.
app.get("/getApi", function(req, res){
    var result = processor.loopback1();
    res.send(result);
})

app.get("/asynccall", function(req, res){
async.waterfall([
  function(callback) {
    request({ 
            method: 'GET',
            url: 'https://developers.zomato.com/api/v2.1/search',
            headers: { 
                'accept': 'application/json',
                'user-key':'361b205a64a31d13a898e55960d988e1'
            },
            body: {
                lang: 'en',
            },
            json: true
            }, function (error, res, body) {
                 //console.log("Making API Call 1");
                 //console.log("1 Here : "+JSON.stringify(body))
                    var bod = {  
                        "results_found":1262410,
                        "results_start":0,
                        "results_shown":20,
                        "restaurants":[  
                            {  
                                "restaurant":{  
                                    "R":{  
                                    "res_id":16612621
                                    },
                                    "apikey":"361b205a64a31d13a898e55960d988e1",
                                    "id":"16612621",
                                    "name":"Miss Nellie's Cafe",
                                    "url":"https://www.zomato.com/kendall-nsw/miss-nellies-cafe-kendall-kendall?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                                    "switch_to_order_menu":0,
                                    "cuisines":"Cafe",
                                    "average_cost_for_two":0,
                                    "price_range":1,
                                    "currency":"$",
                                    "thumb":"",
                                    "photos_url":"https://www.zomato.com/kendall-nsw/miss-nellies-cafe-kendall-kendall/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
                                    "menu_url":"https://www.zomato.com/kendall-nsw/miss-nellies-cafe-kendall-kendall/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
                                    "featured_image":"",
                                    "has_online_delivery":0,
                                    "is_delivering_now":0,
                                    "deeplink":"zomato://restaurant/16612621",
                                    "has_table_booking":0,
                                    "events_url":"https://www.zomato.com/kendall-nsw/miss-nellies-cafe-kendall-kendall/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
                                }
                            }
                        ]
                        }
                 callback(null, body);
            })
    },
  function(arg, callback) {
      //console.log("Obtainer Res ID : "+arg);
      var resId = arg.restaurants[0].restaurant.R.res_id;
      console.log("restaurant id: ", resId);
      request({ 
                method: 'GET',
                url: 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + resId,
                headers: { 
                    'accept': 'application/json',
                    'user-key':'361b205a64a31d13a898e55960d988e1'
                },
                body: {
                    lang: 'en',
                },
                json: true
            }, function(error, res ,body) {
                 callback(null, resId);
            })
  },
  function(resId, callback) {
    request({ 
            method: 'GET',
            url: 'https://developers.zomato.com/api/v2.1/reviews?res_id=' + resId,
            headers: { 
                'accept': 'application/json',
                'user-key':'361b205a64a31d13a898e55960d988e1'
            },
            body: {
                lang: 'en',
            },
            json: true
            }, function(error, res ,body){
            //console.log("3 Here"+JSON.stringify(body));
            var reviews = {  
                        "reviews_count":1,
                        "reviews_start":0,
                        "reviews_shown":1,
                        "user_reviews":[  
                            {  
                                "review":{  
                                    "rating":4,
                                    "review_text":"A quick stop by from a trip to Coffs habour  Super delicious beef Cheesy Melt and Milkshake.  Nice local family business, very friendly and ...",
                                    "id":"33314615",
                                    "rating_color":"5BA829",
                                    "review_time_friendly":"4 days ago",
                                    "rating_text":"Great!",
                                    "timestamp":1517110108,
                                    "likes":0,
                                    "user":{  
                                    "name":"Howie Pee",
                                    "zomato_handle":"howiepee",
                                    "foodie_level":"Super Foodie",
                                    "foodie_level_num":10,
                                    "foodie_color":"f58552",
                                    "profile_url":"https://www.zomato.com/howiepee?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                                    "profile_image":"https://b.zmtcdn.com/data/user_profile_pictures/90e/371fe183a40fe4df0f8d228bd8ebf90e.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A",
                                    "profile_deeplink":"zomato://u/22313698"
                                    },
                                    "comments_count":0
                                }
                            }
                        ],
                        "Respond to reviews via Zomato Dashboard":"https://www.zomato.com/business/claim?ref=rpg&resid=16612621#claim"
                        }
            callback(null, body);
            })
    }
], function(error, results) {
  //console.log(results);
  console.log("rating: ",results.user_reviews[0].review.rating);
  console.log("comments: " + results.user_reviews[0].review.review_text);
});
res.send("correct");
})

app.listen(port);
console.log("Server Running Successfully at port " + port);