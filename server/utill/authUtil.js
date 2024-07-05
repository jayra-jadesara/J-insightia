const { Console } = require('console');
const { promises } = require('dns');
const jwt = require('jsonwebtoken');
const config = require('../config/secret.json');

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, config.secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
  var crypto = require('crypto');

  return crypto.randomBytes(length).toString('hex');
}

/**
 * generates an encrypted password for new or forgotten passwords
 * @function
 * @param {password} string - the password that the user has entered.
 */
function hashNewPassword(password) {
  var crypto = require('crypto');
  var saltString = genRandomString(28);
  return new Promise(function (resolve, reject) {
    var nodeCrypto = crypto.pbkdf2(
      new Buffer.from(password),
      new Buffer.from(saltString, 'hex'),
      95867,
      20,
      'sha1',
      (err, derivedKey) => {
        var hashInHex = derivedKey.toString('hex').toUpperCase();
        var FinalHash = Buffer.from(hashInHex, 'hex').toString('base64');
        //return our password to be put into the database
        resolve(Buffer.from(saltString, 'hex').toString('base64') + ':' + FinalHash);
      }
    );
  });
}

/**
 * validates an encrypted password vs the database
 * @function
 * @param {password} string - the password that the user has entered.
 * @param {hash} string - the full password that the database has for the user.
 */
function validatePassword(password, hash) {
  if (password && hash) {
    var salt = hash.split(':')[0];
    var hash = hash.split(':')[1];
    var crypto = require('crypto');

    var saltString = new Buffer.from(salt, 'base64').toString('hex');
    return new Promise(function (resolve, reject) {
      var nodeCrypto = crypto.pbkdf2(
        new Buffer.from(password),
        new Buffer.from(saltString, 'hex'),
        95867,
        20,
        'sha1',
        (err, derivedKey) => {
          var hashInHex = derivedKey.toString('hex').toUpperCase();
          var FinalHash = Buffer.from(hashInHex, 'hex').toString('base64');
          if (FinalHash.indexOf(hash) === 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  } else {
    false;
  }
}

/**
 * get authentication message
 * @function
 * @param {status} int - user status code.
 * @param {pwordHashed} string - user hash password
 */
function getLoginText(status, pwordHashed) {
  switch (status) {
    case 2:
    case 4:
      return 'Login Successful.';
    case -2:
      return 'You did not enter a username or password.';
    case -1:
      if (pwordHashed) return 'The username or password that you entered were not correct.';
      else return 'Your password may not be set up. Please speak to your account manager for your link to login.';
    case 0:
      return 'Your username and password have not yet been approved. Please speak to your account manager if you are waiting for access.';
    case 1:
      return 'You entered the username and password for a denied account. Please email insightia.support@diligent.com  or call us on  +1 646 513 4141 (New York ) or +44 20 7788 7772 (London) for further information.';
    case 3:
      return 'Your trial account has expired. Please speak to your account manager if you would like to discuss anything further';
    case 5:
      return 'Your account has been closed. Please speak to your account manager if you believe this is incorrect.';

    default:
      return null;
  }
}

/**
 * get reset password text message.
 * @param {ResetStatus} int - reset status code.
 */
function passwordResetText(ResetStatus) {
  switch (ResetStatus) {
    case 0:
      return 'Password successfully changed.';
    case 1:
      return 'Password not changed. 1 hour time limit expired.';
    default:
      return 'Password not changed. Invalid email token.';
  }
}

/**
 * get new user reset password text message.
 * @param {ResetStatus} int - reset status code.
 */
function newUserPasswordResetText(ResetStatus) {
  switch (ResetStatus) {
    case 0:
      return 'Password successfully set up.';
    case 1:
      return 'Password not set. Password has already been set up. Please reset your password from the login screen.';
    default:
      return 'Password not set. Invalid email address specified. Please contact your account manager.';
  }
}

module.exports = {
  authenticateToken,
  validatePassword,
  hashNewPassword,
  genRandomString,
  getLoginText,
  passwordResetText,
  newUserPasswordResetText,
};
