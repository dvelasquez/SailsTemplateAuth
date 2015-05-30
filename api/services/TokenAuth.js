/**
 * Created by dvelasquez on 19-01-15.
 * @description :: Authenticates the token using the TOKEN_SECRET stored in the /config/env/{VARIABLE}
 */
var jwt = require('jsonwebtoken');
var applicationSecret = ";7chkAp8OY54?466eLJ5~A0>D@5IY1";

module.exports.issueToken = function(payload) {
  var token = jwt.sign(payload, sails.config.TOKEN_SECRET || applicationSecret);
  return token;
};

module.exports.verifyToken = function(token, verified) {
  return jwt.verify(token, sails.config.TOKEN_SECRET || applicationSecret, {}, verified);
};

module.exports.decode = function (token) {
  return jwt.decode(token, sails.config.TOKEN_SECRET || applicationSecret);
};
