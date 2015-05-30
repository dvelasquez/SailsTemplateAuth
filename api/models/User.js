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
    values.password = passwordHash.generate('password123');
    next();

  },
  beforeUpdate: function (values, next) {
    if (values.password) {
      User.findOneByUuid(values.uuid, function (err, user) {
        if (!user) {
          return res.json(401, {err: 'invalid email or password'});
        } else {
          var passwordHash = require('password-hash');
          values.password = passwordHash.generate('password123');
          next();
        }
      });
    } else {
      next();
    }
  },
  validPassword: function (password, user, cb) {
    var passwordHash = require('password-hash');
    if (passwordHash.verify(user.password, hashedPassword)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
    //bcrypt.compare(password, user.password, function (err, match) {
    //  if (err) cb(err);
    //
    //  if (match) {
    //    cb(null, true);
    //  } else {
    //    cb(err);
    //  }
    //});
  },

  afterUpdate: function (values, next) {
    var tag = Tag.findOne(
      {
        where: {
          user: values.uuid
        },
        sort: 'createdAt ASC'
      },
      function (error, tag) {
        if (error) {
          // do something with the error.
          req.send(error);
        }
        tag.name = values.name;
        tag.mail = values.email;
        tag.avatar = values.avatar;

        tag.save(function (error) {
          if (error) {
            // do something with the error.
          } else {
            // value saved!
            next();
          }
        });
      });
  }
};

