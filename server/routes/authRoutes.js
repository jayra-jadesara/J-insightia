const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const { response } = require('express');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { sql, poolPromise } = require('../config/db');
const config = require('../config/secret.json');

let version_data = {};

let rawdata = '';
try {
  rawdata = fs.readFileSync(path.resolve(__dirname, '..', 'version.json'));
} catch (e) {
  console.log(e);
}

try {
  // make sure that json string is the section that we want before we parse it. Gets rid of any initial characters
  rawdata = rawdata
    .toString()
    .substring(rawdata.indexOf('{'), rawdata.length - 1);
  version_data = JSON.parse(rawdata.toString());
} catch (e) {
  console.log(rawdata.toString());
  version_data = { gitBranch: null };
}
const general = require('../utill/general');

const authRoute = '/auth';

const router = express.Router();
const {
  getLoginText,
  hashNewPassword,
  passwordResetText,
  newUserPasswordResetText,
} = require('../utill/authUtil');
const { tokenMailSendTemplate } = require('../utill/mailTemplate');
const { sendMail } = require('../utill/sendmailUtil');
const auth = require('../controllers/Auth');
const { getClientAddress } = require('../utill/general');

router.post('/api/v1/authenticate', authenticate);
router.post('/api/v1/sendForgotPasswordEmail', sendForgotPasswordEmail);
router.post('/api/v1/resetPassword', resetPassword);
router.post('/api/v1/logout', logout);
router.post('/api/v1/getUserMembership', getUserMembership);
router.post('/api/v1/LookupDecIPForIPLogin', LookupDecIPForIPLogin);
router.post('/api/v1/authenticateIPLogin', authenticateIPLogin);
router.post('/api/v1/createComputer', createComputer);
router.post('/api/v1/updateComputerLogin', updateComputerLogin);
router.post('/api/v1/isBranchUpToDate', isBranchUpToDate);
router.post('/api/v1/getUserValidationDetail', getUserValidationDetail);

module.exports = router;
const authRoutes = 'authRoute';
let session_Data = [];

async function authenticate(req, res, next) {
  if (!session_Data) {
    session_Data = [];
  }
  const getIp = getClientAddress(req);
  const { isValidPwd, pwordHashed } = await auth.authenticate(req.body);
  const pool2 = await poolPromise;
  let result2 = [];
  try {
    if (session_Data.length === 0) {
      result2 = await pool2
       .request()
       .input('email', sql.VarChar, req.body.username)
       .input('validated', sql.VarChar, isValidPwd)
       .input('IP', sql.VarChar, getIp)
       .execute('ValidateLoginForProducts_v3');
   }
  } catch (error) {
    await general.ErrorLog(
      'authRoutes/ValidateLoginForProducts_v3',
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
    // Temporary text
    const text = 'There has been an error attempting to log';
    res.status(500).json({ text });
    return;
  }
  const ispayguser = session_Data.length > 0 ? session_Data[0].ispayguser : result2.recordset[0].ispayguser;
  const session_id = session_Data.length > 0 ? session_Data[0].Session_Id : result2.recordset[0].Session_Id;
  const check_cost_code = Object.prototype.hasOwnProperty.call(req.body, 'costCode');
  if (ispayguser !== null && ispayguser && !check_cost_code && result2.recordset) {
    session_Data = result2.recordset;
    res.status(200).json({
      ispayguser: ispayguser,
    });
  } else {
    const userinfo = session_Data.length > 0 ? session_Data[0] : result2.recordset[0];
    const text = getLoginText(userinfo.Status, pwordHashed);
    let costCodeData = [];
    if (isValidPwd && (userinfo.Status === 4 || userinfo.Status === 2)) {
      try {
        if (ispayguser && req.body.costCode !== null) {
          costCodeData = await pool2
            .request()
            .input('session_id', sql.Int, session_id)
            .input('cost_code', sql.VarChar, req.body.costCode)
            .execute('UpdateLogInWithCostCode');
        }
      } catch (error) {
        general.ErrorLog(
          'authRoutes/UpdateLogInWithCostCode',
          error,
          'N/A',
          req.body,
          req.headers.origin
        );
        res.status(500).json({ text: 'issue with updating the Login with cost code' });
        return;
      }
      let resultProMembership = [];
      try {
        const poolProductMembership = await poolPromise;
        resultProMembership = await poolProductMembership
          .request()
          .input('user_Id', sql.VarChar, userinfo.User_Id)
          .execute('GetProductMemberships_v2');
      } catch (error) {
        general.ErrorLog(
          'authRoutes/GetProductMemberships_v2',
          error,
          'N/A',
          req.body,
          req.headers.origin
        );
        res.status(500).json({ text: 'Issue with getting the product memberships' });
        return;
      }
      try {
        const username = await pool2
          .request()
          .input('User_Id', sql.VarChar, userinfo.User_Id)
          .execute('GetUser');

          let showActivistIcon = null;
          let showProxyIcon = null;

          if (username.recordset.length > 0) {
            showActivistIcon = username.recordset[0].show_activist_icon;
            showProxyIcon = username.recordset[0].show_proxy_icon;
          }
        const token = jwt.sign(
          {
            User_Id: userinfo.User_Id,
            UserEmail: req.body.username,
            Username:
              username.recordset.length > 0
                ? username.recordset[0].username
                : '',
            Status: userinfo.Status,
            showActivistIcon: showActivistIcon,
            showProxyIcon: showProxyIcon,
            PDF_Downloads: userinfo.PDF_Downloads,
            Session_Id: userinfo.Session_Id,
            Site_id: userinfo.Site_id,
            ispayguser: userinfo.ispayguser,
            DoNotShowMoneyWarning: userinfo.DoNotShowMoneyWarning,
            log_id: userinfo.log_id,
            MemberShip: resultProMembership.recordset,
          },
          config.secret,
          {
            expiresIn: '2 days',
          }
        );
        session_Data = [];
        res.status(200).json({
          ...userinfo,
          token,
          text,
          showActivistIcon,
          showProxyIcon,
        });
      } catch (error) {
        general.ErrorLog(
          'authRoutes/GetUser',
          error,
          'N/A',
          req.body,
          req.headers.origin
        );
        res.status(500).json({ text: 'Issue with getting the users details' });
      }
    } else {
      res.status(200).json({ text });
    }
  }
}

async function getUserValidationDetail(req, res, next) {
  const getIp = getClientAddress(req);
  const pool2 = await poolPromise;
  const result = await pool2
    .request()
    .input('key_string', sql.VarChar, req.body.otk)
    .execute('CheckOneTimeKey');
  if (result.recordset !== undefined && result.recordset.length > 0) {
    const userId =
      result.recordset !== undefined &&
      result.recordset.length > 0 &&
      result.recordset[0].user_id;
    const userDetails = await pool2
      .request()
      .input('User_Id', sql.VarChar, userId)
      .execute('GetUser');
    const isValidPwd =
      result.recordset.length > 0 && result.recordset !== undefined;
    if (result.recordset.length > 0 && result.recordset !== undefined) {
      const result2 = await pool2
        .request()
        .input('email', sql.VarChar, userDetails.recordset[0].Email)
        .input('validated', sql.VarChar, isValidPwd)
        .input('IP', sql.VarChar, getIp)
        .execute('ValidateLoginForProducts_v3');
      const userinfo = result2.recordset[0];
      if (isValidPwd && (userinfo.Status === 4 || userinfo.Status === 2)) {
        const poolProductMembership = await poolPromise;
        const resultProMembership = await poolProductMembership
          .request()
          .input('user_Id', sql.VarChar, userinfo.User_Id)
          .execute('GetProductMemberships_v2');
        try {
          const username = await pool2
            .request()
            .input('User_Id', sql.VarChar, userinfo.User_Id)
            .execute('GetUser');
            let showActivistIcon = null;
          let showProxyIcon = null;

          if (username.recordset.length > 0) {
            showActivistIcon = username.recordset[0].show_activist_icon;
            showProxyIcon = username.recordset[0].show_proxy_icon;
          }
          const token = jwt.sign(
            {
              User_Id: userinfo.User_Id,
              UserEmail: userDetails.recordset[0].Email,
              Username:
                username.recordset.length > 0
                  ? username.recordset[0].username
                  : '',
              Status: userinfo.Status,
              showActivistIcon: showActivistIcon,
              showProxyIcon: showProxyIcon,
              PDF_Downloads: userinfo.PDF_Downloads,
              Session_Id: userinfo.Session_Id,
              Site_id: userinfo.Site_id,
              ispayguser: userinfo.ispayguser,
              DoNotShowMoneyWarning: userinfo.DoNotShowMoneyWarning,
              log_id: userinfo.log_id,
              MemberShip: resultProMembership.recordset,
            },
            config.secret,
            {
              expiresIn: '2 days',
            }
          );
          res.status(200).json({
            ...userinfo,
            token,
            email: userDetails.recordset[0].Email,
            showActivistIcon,
            showProxyIcon,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        res.status(200).json({ text: 'Loggin unsuccesfull' });
      }
    }
  } else {
    res.status(200).json({ text: 'Loggin unsuccesfull' });
  }
}

async function sendForgotPasswordEmail(req, res, next) {
  const { result } = await auth.sendForgotPasswordEmail(req.body);
  if (result && result.length > 0 && result[0].pword !== null) {
    const pool = await poolPromise;
    let resetToken = null;
    try {
      resetToken = await pool
      .request()
      .input('Email', sql.VarChar, req.body.email)
      .output('PwdResetToken', sql.BigInt)
      .execute('LoginGeneratePwdResetToken');
    } catch (error) {
      general.ErrorLog(
        'authRoutes/sendForgotPasswordEmail/LoginGeneratePwdResetToken',
        error,
        'N/A',
        req.body,
        req.headers.origin
      );
      res.status(400).json({ IsValid: false });
      return null;
    }
    // send token by email [ resetToken.output.PwdResetToken ]
    try {
    sendMail(
      req.body.email,
      'Insightia : Reset Password',
      tokenMailSendTemplate(req.body.hostName, resetToken.output.PwdResetToken)
    );
  } catch (error) {
    general.ErrorLog(
      'authRoutes/sendForgotPasswordEmail/sendMail',
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
    res.status(400).json({ IsValid: false });
    return null;
  }
    res.status(200).json({ ...resetToken, IsValid: true });
  } else {
    res.status(200).json({ ...result, IsValid: false });
  }
}

async function resetPassword(req, res, next) {
  if (req.body.email !== undefined && req.body.email !== null) {
    const getIp = getClientAddress(req);
    const hasPassword = await hashNewPassword(req.body.newpassword);
    const pool = await poolPromise;
    const LoginResultUserPassword = await pool
      .request()
      .input('Password', sql.VarChar, hasPassword)
      .input('email', sql.VarChar, req.body.email)
      .input('IP', sql.VarChar, getIp)
      .output('ResetStatus', sql.Int)
      .execute('LoginsetUserPassword_v2');
    const text = newUserPasswordResetText(
      LoginResultUserPassword.output.ResetStatus
    );
    res.status(200).json({
      ...LoginResultUserPassword,
      text,
    });
  } else if (
    req.body.pwdresettoken !== undefined &&
    req.body.pwdresettoken !== null
  ) {
    const { result } = await auth.resetPassword(req.body);
    if (result && result.output.ResetStatus === 0) {
      const getIp = getClientAddress(req);
      const hasPassword = await hashNewPassword(req.body.newpassword);
      const bigIntValue = BigInt(req.body.pwdresettoken);
      const pool2 = await poolPromise;
      const LoginResultUserPassword = await pool2
        .request()
        .input('Password', sql.VarChar, hasPassword)
        .input('PwdResetToken', sql.BigInt, bigIntValue)
        .input('IP', sql.VarChar, getIp)
        .output('ResetStatus', sql.Int)
        .output('email', sql.varchar)
        .execute('LoginResetUserPassword_v2');
      const text = passwordResetText(
        LoginResultUserPassword.output.ResetStatus
      );
      res.status(200).json({
        ...LoginResultUserPassword,
        text,
      });
    } else {
      res.status(200).json({
        ...result,
        text: 'Password not changed. Invalid email token.',
      });
    }
  }
}

async function logout(req, res, next) {
  try {
    const getIp = getClientAddress(req);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.userid)
      .input('session_id', sql.Int, req.body.sessionid)
      .input('IP', sql.VarChar, getIp)
      .execute('RecordLogoutEvent');
    res.status(200).json(result);
  } catch (error) {
    general.ErrorLog(
      'authRoutes/Logout',
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
  }
}

async function getUserMembership(req, res, next) {
  try {
    const poolProductMembership = await poolPromise;
    const resultProMembership = await poolProductMembership
      .request()
      .input('user_Id', sql.Int, req.body.User_Id)
      .execute('GetProductMemberships_v2');
    res.status(200).json(resultProMembership.recordset);
  } catch (error) {
    general.ErrorLog(
      `${authRoutes}/GetTop20AlertResult`,
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
  }
}

function LongIntegerFromIP(p_strIP) {
  let arrTemp = [];
  let portTemp = [];
  let lngTemp = 0;
  // split off port number
  portTemp = p_strIP.split(':');
  // remove any artifacts to ensure a set format
  arrTemp = portTemp[0].replace(/^.*:/, '').split('.');

  if (arrTemp.length > 0) {
    arrTemp.forEach((temp, i) => {
      lngTemp += temp * 256 ** (3 - i);
    });
    return lngTemp;
  }
  return p_strIP.replace(/\D/g, '');
}

async function LookupDecIPForIPLogin(req, res, next) {
  try {
    const getIp = getClientAddress(req);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('DecIP', sql.BigInt, LongIntegerFromIP(getIp))
      .execute('LookupDecIPForIPLogin');
    // await all async functions to complete, then for each(map) investor for historic positions
    res.status(200).json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${authRoutes}/LookupDecIPForIPLogin`,
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
  }
}

async function authenticateIPLogin(req, res, next) {
  const getIp = getClientAddress(req);
  let result = [];
  if (getIp) {
    try {
      const pool = await poolPromise;
    result = await pool
      .request()
      .input('DecIP', sql.BigInt, LongIntegerFromIP(getIp))
      .execute('LookupDecIPForIPLogin');
    } catch (error) {
      general.ErrorLog(
        `${authRoutes}/authenticateIPLogin/LookupDecIPForIPLogin`,
        error,
        'N/A',
        req.body,
        req.headers.origin
      );
      res.status(500).json({ text: 'Login Issue with Looking Up IP' });
      return;
    }
  }

  let result2 = [];
  let result3 = [];

  try {
    const pool3 = await poolPromise;
    result3 = await pool3
      .request()
      .input('User_Id', sql.Int, result.recordset[0].User_id)
      .execute('GetUserCredentials');
  } catch (error) {
    general.ErrorLog(
      `${authRoutes}/authenticateIPLogin/GetUserCredentials`,
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
    res.status(500).json({ text: 'Login Issue with getting user credentials' });
    return;
  }

  try {
    const pool2 = await poolPromise;
    result2 = await pool2
      .request()
      .input('email', sql.VarChar, result3.recordset[0].Email)
      .input('validated', sql.VarChar, 1)
      .input('IP', sql.VarChar, LongIntegerFromIP(getIp))
      .execute('ValidateLoginForProducts_v3');
  } catch (error) {
    general.ErrorLog(
      `${authRoutes}/authenticateIPLogin/ValidateLoginForProducts_v3`,
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
    res.status(500).json({ text: 'Login Issue with Validating Login for products' });
    return;
  }

  const userinfo = result2.recordset[0];
  let resultProMembership = [];
  try {
    const poolProductMembership = await poolPromise;
    resultProMembership = await poolProductMembership
      .request()
      .input('user_Id', sql.VarChar, result.recordset[0].User_id)
      .execute('GetProductMemberships_v2');
  } catch (error) {
    general.ErrorLog(
      `${authRoutes}/authenticateIPLogin/GetProductMemberships_v2`,
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
    res.status(500).json({ text: 'Login Issue with getting Product Membership' });
    return;
  }

  const text = getLoginText(userinfo.Status, 0);
  if (result.recordset.length === 0) res.status(200).json({ ...userinfo, text });
  if (
    result.recordset[0].Ok === 1 &&
    (userinfo.Status === 4 || userinfo.Status === 2)
  ) {
    try {
      const pool2 = await poolPromise;
      const username = await pool2
            .request()
            .input('User_Id', sql.VarChar, userinfo.User_Id)
            .execute('GetUser');
            let showActivistIcon = null;
          let showProxyIcon = null;

          if (username.recordset.length > 0) {
            showActivistIcon = username.recordset[0].show_activist_icon;
            showProxyIcon = username.recordset[0].show_proxy_icon;
          }
      const token = jwt.sign(
        {
          User_Id: userinfo.User_Id,
          UserEmail: result3.recordset[0].Email,
          Status: userinfo.Status,
          showActivistIcon: showActivistIcon,
          showProxyIcon: showProxyIcon,
          PDF_Downloads: userinfo.PDF_Downloads,
          Session_Id: userinfo.Session_Id,
          Site_id: userinfo.Site_id,
          ispayguser: userinfo.ispayguser,
          DoNotShowMoneyWarning: userinfo.DoNotShowMoneyWarning,
          log_id: userinfo.log_id,
          MemberShip: resultProMembership.recordset,
        },
        config.secret,
        {
          expiresIn: '2 days',
        }
      );
      res.status(200).json({ ...userinfo, token, text, showActivistIcon, showProxyIcon });
    } catch (error) {
      general.ErrorLog(
        `${authRoutes}/authenticateIPLogin/JWTtoken`,
        error,
        'N/A',
        req.body,
        req.headers.origin
      );
      res.status(500).json({ text: 'Login Issue with JWT Token' });
    }
  } else {
    res.status(200).json({ ...userinfo, text });
  }
}

async function createComputer(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('computer_code', sql.VarChar, req.body.computer_code)
      .input('owner', sql.Int, req.body.owner)
      .input('user_agent', sql.VarChar, req.body.user_agent)
      .input('browser', sql.VarChar, req.body.browser)
      .input('version', sql.VarChar, req.body.version)
      .execute('CreateComputer');
    res.status(200).json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${authRoutes}/createComputer`,
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
  }
}

async function updateComputerLogin(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('computer_id', sql.VarChar, req.body.computer_id)
      .execute('UpdateComputerLogin');
    res.status(200).json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${authRoutes}/createComputer`,
      error,
      'N/A',
      req.body,
      req.headers.origin
    );
  }
}

async function isBranchUpToDate(req, res, next) {
  try {
    const CurrentCommitOriginStage = req.body.gitBranch;
    res.status(200).json({
      isOutdatedVersion:
        version_data.gitBranch !== CurrentCommitOriginStage ||
        version_data.gitBranch !== null,
      serverVersion: version_data,
      localVersion: CurrentCommitOriginStage,
    });
  } catch (error) {
    general.ErrorLog(`${authRoute}/isBranchUpToDate`, error);
  }
}
