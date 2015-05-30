/**
 * User.js
 *
 * @description :: Represents an User in the system. Their data for log in or authenticate is stored here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var passwordHash = require('password-hash');
module.exports = {

  attributes: {
    uuid: {
      type: 'STRING',
      required: true,
      primaryKey: true,
      unique: true
    },

    name: {
      type: 'STRING',
      required: true
    },

    username: {
      type: 'STRING',
      required: true
    },

    password: {
      type: 'STRING',
      required: true,
      minLength: 6
    },

    email: {
      type: 'STRING',
      required: true
    },

    avatar: {
      type: "STRING"
    },

    link: {
      type: "STRING"
    },
    birthday: {
      type: "DATE"
    },
    toJSON: function () {
      var obj = this.toObject();
      //delete obj.password;
      return obj;
    }

  },

  beforeCreate: function (values, next) {
    var passwordHash = require('password-hash');
    values.password = passwordHash.generate(values.password);
    next();

  },
  beforeUpdate: function (values, next) {
    if (values.password) {
      User.findOneByUuid(values.uuid, function (err, user) {
        if (!user) {
          return res.json(401, {err: 'invalid email or password'});
        } else {
          var passwordHash = require('password-hash');
          values.password = passwordHash.generate(values.password);
          next();
        }
      });
    } else {
      next();
    }
  },
  validPassword: function (password, user, cb) {
    var passwordHash = require('password-hash');
    if (passwordHash.verify( password, user.password)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};

