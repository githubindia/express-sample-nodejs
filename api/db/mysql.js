var mysql = require('mysql');
var processor = require('../src/module.js');
require('dotenv').config()
var logger = require('../logger.js');

var db_config = {
            host     : process.env.SQL_HOST, 
            user     : process.env.SQL_USER, 
            password : process.env.SQL_PASS, 
            database : process.env.SQL_DBNAME 
        }
var connection = mysql.createConnection(db_config);

function handleDisconnect() {
	connection.destroy();
	connection = mysql.createConnection(db_config);
	connection.connect(function(err) {
	    if(err) {
			setTimeout(handleDisconnect, 1000);
	    } else {
            console.log("connected");
        } 
        connection.on('error', function(err) {
            console.log(err.code); // 'ER_BAD_DB_ERROR'
            setTimeout(handleDisconnect, 1000);
        });
	});
}//Method to handle MySQL server disconnection.


connection.connect(function(err) {
  if (err) {
    logger.error("CONNECTION ERROR", err);
    setTimeout(handleDisconnect, 2000);
  } else {
    console.log('You are now connected...');
  }
})//Database connection.

connection.on('error', function(err) {
  logger.error("DB ERROR, connection lost", err);
  console.log(err.code);// 'ER_BAD_DB_ERROR'
  setTimeout(handleDisconnect, 1000)
});//Method which won't allow to close node server even after MySQL server disconnects.

module.exports = {
    "getUserRecords" : function(query, callback) {
        if(query.id == undefined) {
            connection.query('SELECT * FROM users', function(err, rows, fields) { 
                if (err) {
                    logger.error("DB ERROR, connection lost ", err);
                    var response = processor.dbErrorResponse();
                    return callback(response);
                }
                var message = "All user details are returned";
                var response = processor.getResponse(rows, message);
                logger.info(message);
                return callback(response); 
            });
        } else {
            if (processor.numRegExCheck(query.id)) {
                connection.query('select * from users where id = ?', [query.id], function(err, rows, fields) {
                    if (err) {
                        logger.error("DB ERROR", err);
                        var response = processor.dbErrorResponse();
                        return callback(response);
                        //setTimeout(handleDisconnect, 2000);
                    }
                    if(rows.length == 0) {
                        var message = "Id was not found."
                        var response = processor.getPageError(message);
                        logger.warn(message);
                        return callback(response);
                    } else {
                        var message = "Particular user details returned."
                        var response = processor.getResponse(rows, message);
                        logger.info(message);
                        return callback(response);
                    }
                })
            } else {
                message = "Id must be a number";
                var response = processor.badRequest(message);
                logger.warn('SQL WARNING', message);
                return callback(response);
            }
        }
    },

    "insertRecord" : function (body, callback) {
        if (processor.strRegExCheck(body.name)) {
            connection.query('insert into users set ?', body, function(err, rows, fields) {
                if (err) {
                    logger.error("DB ERROR", err);
                    var response = processor.dbErrorResponse();
                    return callback(response);
                }
                var message = "User details inserted."
                var response = processor.getResponse(rows, message);
                logger.info(message);
                return callback(response);
            
            });
        } else {
            var message = "Name should consists of alphabets only";
            var response = processor.badRequest(message);
            logger.warn('SQL WARNING', message);
            return callback(response);
        }
    },

    "updateRecord" : function(body, callback) {
        if (processor.strRegExCheck(body.name)) {
            if (processor.numRegExCheck(body.id)) {
                connection.query('update users set name = ? where id = ?', [body.name, body.id], function(err, rows, fields) {
                    if (err) {
                        logger.error('DB ERROR', err);
                        var response = processor.dbErrorResponse();
                        return callbck(response);
                    }
                    if(rows.affectedRows == 0) {
                        var message = "Id was not found."
                        var response = processor.getPageError(message);
                        logger.warn(message);
                        return callback(response);
                    } else {
                        var message = "User details are modified.";
                        var response = processor.getResponse(rows, message);
                        logger.info(message)
                        return callback(response);
                    }
                });
            } else {
                message = "Id must be a number";
                var response = processor.badRequest(message);
                logger.warn('SQL WARNING', message);
                return callback(response);
            }
        } else {
            message = "name must contain alphabets only";
            var response = processor.badRequest(message);
            logger.warn('SQL WARNING', message);
            return callback(response);
        }
    },

    "deleteRecord" : function(body, callback) {
        if (processor.numRegExCheck(body.id)) {
            connection.query('delete from users where id = ?', [body.id], function(err, rows, fields) {
                if (err) {
                    logger.error('DB ERROR', err);
                    var response = processor.dbErrorResponse();
                    return callback(response);
                }
                if(rows.affectedRows == 0) {
                        var message = "Id was not found."
                        var response = processor.getPageError(message);
                        logger.warn(message);
                        return callback(response);
                    } else {
                        message = "User deleted.";
                        var response = processor.getResponse(rows, message);
                        logger.info(message);
                        return callback(response);
                    }
            });
        } else {
            message = "Id must be a number";
            var response = processor.badRequest(message);
            logger.warn('SQL WARNING', message);
            return callback(response);
        }
    }
}