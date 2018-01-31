//Dependencies
var uc = require("upper-case");
var request = require('request');

var options = { 
                method: 'GET',
                url: 'https://developers.zomato.com/api/v2.1/categories',
                headers: { 
                    'accept': 'application/json',
                    'user-key':'361b205a64a31d13a898e55960d988e1'
                },

                body: { 
                    lang: 'en',
                    //query: usersays,
                    //sessionId: '7f4c58e0-babf-41d4-83d7-6e3b8aca0189'
                },
                json: true
            };

module.exports = {
    'loopback' : function (name) {
        return uc(name);

    },
    'concat' : function (req) {
        var result = req.body.fName + "--" + req.body.lName;
        var response = {
        "firstName" : req.body.fName, 
        "lastName" : req.body.lName,
        "result" : result,
        "error":false,
        "status_codes":200,
        "active":true
        };
        
        return response;
    },
    'loopback1' : function () {
    var result;
    request(options, function (error, response, body) {
        if (error) {
            //callback(null,error)
            console.log(error.message)
        } else {
            //callback(body,null);
            console.log(response);
        }
        result = JSON.stringify(body);
        //console.log(JSON.parse(body));
    });
    return result;
    }
}

