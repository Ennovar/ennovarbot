"use strict";

var Promise = require('bluebird');
var request = require('request');
var query = Promise.promisify(request.get, {context: request});

/**
 * @param short url to get redirect for
 * @returns {Promise}
 */
module.exports = function(short) {
    return query(short, null).then(function(res){ return res.request.uri.href }).catch(function(err){ return short });
};
