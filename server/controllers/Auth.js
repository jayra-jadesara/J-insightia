const { json } = require('body-parser');
const { sql, poolPromise } = require('../config/db');

const { validatePassword } = require('../utill/authUtil');

class AuthController {
  async authenticate({ username, password }) {
    let isValidPwd = false;
    const pool = await poolPromise;
    const result = await pool.request().input('email', sql.VarChar, username).execute('getPHash');

    if (result.recordset.length > 0) {
    //check AI password
      isValidPwd = await validatePassword(password, result.recordset[0].pword);
      if (isValidPwd) {
      //if it's valid then send it back
        return { isValidPwd, pwordHashed: result.recordset[0].pword };
      }
      //if not valid then check PI password
        isValidPwd = await validatePassword(password, result.recordset[0].proxy_pword);
        if (isValidPwd) {
        //if valid then send it back
          return { isValidPwd, pwordHashed: result.recordset[0].proxy_pword };
        }
        //if neither are valid then send back with a hash that has one
          if (result.recordset[0].pword !== null) {
            return { isValidPwd, pwordHashed: result.recordset[0].pword };
          }
          //send PI if AI doesn't have one
          return { isValidPwd, pwordHashed: result.recordset[0].proxy_pword };
    }
      return { isValidPwd, pwordHashed: '' };
  }

  async sendForgotPasswordEmail({ email }) {
    const pool = await poolPromise;
    const result = await pool.request().input('Email', sql.VarChar, email).execute('LoginLookupUserByEmail');
    return { result: result.recordset };
  }

  async resetPassword({ pwdresettoken }) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pwdresettoken', sql.BigInt, pwdresettoken)
      .output('ResetStatus', sql.Int)
      .execute('LoginCheckPwdResetToken');
    return { result };
  }

  async resetUserPassword({ email }) {
    const pool = await poolPromise;
    const result = await pool.request().input('Email', sql.VarChar, email).execute('CheckUserForPasswordAi');

    return { result };
  }
}
const controller = new AuthController();
module.exports = controller;
