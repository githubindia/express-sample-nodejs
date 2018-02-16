module.exports = {
    "getResponse": function (rows, message) {
        var response = {
            "error_status":false,
            "status_code":200,
            "result":rows,
            "success_message": message
        }
        return response;
    },
    "dbErrorResponse": function () {
        var response = {
            "error":"Internal server error",
            "error_status":true,
            "status_code":503,
            "error_message":"DB error, connection lost."
        }
        return response;
    },
    "badRequest": function (message) {
        var response = {
            "error":"Bad request",
            "error_status":true,
            "status_code":400,
            "error_message": message
        }
        return response;
    },
    "getPageError": function (message) {
        var response = {
            "error":"Content was not found",
            "error_status":true,
            "status_code":404,
            "error_message": message
        }
        return response;
    },
    "strRegExCheck": function (str) {
        var regex = RegExp('^[a-zA-Z]+$');
        return regex.test(str);
    },
    "numRegExCheck": function (num) {
        var regex = RegExp('^[0-9]+$');
        return regex.test(num);
    }
}