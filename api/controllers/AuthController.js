/**
 * Created by dvelasquez on 19-01-15.
 * @description :: Controls the login of the app and creates a new user.
 *
 */

module.exports = {
  /**
   *
   * @param req :: Request of the body
   * @param res :: Response
   * @returns {*} :: Returns a JSON Element with the User Token.
   */
  authenticate: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      return res.json(401, {err: 'username and password required'});
    }

    User.findOneByUsername(username, function (err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid email or password'});
      }

      User.validPassword(password, user, function (err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid username or password'});
        } else {
          res.json({user: user, token: TokenAuth.issueToken(user.uuid)});
        }
      });
    });
  },
  /**
   *
   * @param req :: The request with the sended data by the Front End
   * @param res :: The response.
   * @returns {*} :: An user if the register is correct, an error if fails.
   */
  register: function (req, res) {
    //TODO: Do some validation on the input
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match'});
    }
    var uuid = require('node-uuid');
    var token = uuid.v4();

    User.create({
      uuid: token,
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      avatar: req.body.avatar,
      link: req.body.link,
      birthday: req.body.birthday
    }).exec(function (err, user) {
      if (err) {
        res.json(err.status, {err: err});
        return;
      }
      if (user) {
        res.json({user: user, token: TokenAuth.issueToken(user.uuid)});
      }
    });
  }
};
