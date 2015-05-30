/**
 * Created by dvelasquez on 19-01-15.
 * @description :: A simple GUID - Token Generator for objects created in localdb
 */
module.exports.generateGUID = function(){
  var uuid = require('node-uuid');
  return uuid.v4();
};
