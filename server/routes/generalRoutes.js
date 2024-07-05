const { json } = require('body-parser');
const express = require('express');
const general = require('../utill/general');

const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { PageNotFoundVisitorLog, APIErrorLog, feedbackMailTemplate } = require('../utill/mailTemplate');
const { sendMail } = require('../utill/sendmailUtil');
const { authenticateToken } = require('../utill/authUtil');
const { getClientAddress } = require('../utill/general');

const { func } = require('prop-types');

const generalRoutes = 'generalRoutes';

router.post('/sendPageNotFoundVisitorsLog', SendPageVisitorLog);
router.post('/sendAPIErrorLog', SendAPIErrorLog);
router.post('/AddVisitorLog', authenticateToken, AddVisitorLog);
router.post('/AddTrialLog', authenticateToken, AddTrialLog);
router.post('/GetCompanies', GetCompanies);
router.post('/GetCountriesMap', authenticateToken, GetCountriesMap);
router.post('/GetCountriesMapActivismCampaigns', authenticateToken, GetCountriesMapActivismCampaigns);
router.post('/GetToolTip', authenticateToken, GetToolTip);
router.post('/getForeignSecurityKey', authenticateToken, GetForeignSecurityKey);
router.post('/GetProcedureRunningEstimateTime', authenticateToken, GetProcedureRunningEstimateTime);

// AIG Headers
router.post('/GetGovShowPoisonPillTab', authenticateToken, GetGovShowPoisonPillTab);
router.post('/GetGovShowLatestFilingsTab', authenticateToken, GetGovShowLatestFilingsTab);
router.post('/GetGovShowShareholderProposalsTab', authenticateToken, GetGovShowShareholderProposalsTab);
router.post('/GetGovShowComplianceTab', authenticateToken, GetGovShowComplianceTab);
router.post('/Get_Bylaws_Charter_GovGuidelines', authenticateToken, Get_Bylaws_Charter_GovGuidelines);
router.post('/GetProfiles_insightia', authenticateToken, GetProfiles_insightia);
router.post('/FeedbackMail', authenticateToken, FeedbackMail);
router.post('/GetHistoricalGovernanceTab', authenticateToken, GetHistoricalGovernanceTab);
async function SendPageVisitorLog(req, res, next) {
  try {
    sendMail(
      'icterrors@activistinsight.com',
      '404 Visitor log',
      PageNotFoundVisitorLog(req.body.userid, req.body.url, req.body.errors)
    );
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/SendPageVisitorLog`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function SendAPIErrorLog(req, res, next) {
  try {
    sendMail('ict@insightia.com', 'API Call error', APIErrorLog(req.body.userid, req.body.url, req.body.errors));
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/SendAPIErrorLog`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function AddVisitorLog(req, res, next) {
  try {
    const getIp = getClientAddress(req);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('page_name', sql.VarChar, req.body.page_name)
      .input('query_string', sql.VarChar, req.body.query_string)
      .input('session_id', sql.Int, req.body.session_id)
      .input('ip', sql.VarChar, getIp)
      .input('current_product', sql.Int, req.body.current_product)
      .execute('AddPageLogV2');
    res.json({ result });
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/AddVisitorLog`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function AddTrialLog(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('type', sql.VarChar(200), req.body.type)
      .input('pid', sql.Int, req.body.pid)
      .execute('AddVotingPageLog');
    res.json({ result });
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/AddTrialLog`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function GetCompanies(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('dbo.testingdropdown');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetCompanies`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function GetCountriesMap(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetCountriesMapGov_insightia');
    // res.json(result.recordset);
    res.json({ type: 'FeatureCollection', features: JSON.parse(result.recordset[0].mapdata) });
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetCountriesMap`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

// worldmap widget
async function GetCountriesMapActivismCampaigns(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetCountriesMapCompanyHQ_insightia');
    // old sp GetCountriesMapActivistHQ_insightia
    res.json({ type: 'FeatureCollection', features: JSON.parse(result.recordset[0].mapdata) });
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetCountriesMapActivismCampaigns`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function GetToolTip(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('tooltip_id', sql.Int, req.body.tooltip_id).execute('getToolTip');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetToolTip`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}
async function GetProcedureRunningEstimateTime(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('stored_proc_name', sql.VarChar, req.body.procName)
      .execute('GetProcedureRunningEstimateTime');
      const timeOutFuntion = () => {
        if (result.recordset === undefined) {
          const data = [{ avg_elapsed_time: 30 }];
          res.json(data);
          general.ErrorLog(`${generalRoutes}/GetProcedureRunningEstimateTime`,
           `The procedure '${req.body.procName}' takes time longer than expected.`,
           req.user.User_Id, req.body, req.headers.origin);
          clearInterval(interval);
        } else {
          res.json(result.recordset);
          clearInterval(interval);
        }
      };
      const interval = setInterval(timeOutFuntion, 1000);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetProcedureRunningEstimateTime`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

// AiG Governance Header Checks
async function GetGovShowPoisonPillTab(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('GetGovShowPoisonPillTab');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetGovShowPoisonPillTab`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function GetGovShowLatestFilingsTab(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('GetGovShowLatestFilingsTab');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetGovShowLatestFilingsTab`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function GetGovShowShareholderProposalsTab(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('GetGovShowShareholderProposalsTab');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetGovShowShareholderProposalsTab`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function GetGovShowComplianceTab(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('GetGovShowComplianceTab');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetGovShowComplianceTab`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function Get_Bylaws_Charter_GovGuidelines(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('Get_Bylaws_Charter_GovGuidelines');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/Get_Bylaws_Charter_GovGuidelines`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function GetProfiles_insightia(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.userid)
      .input('pid', sql.Int, req.body.pid)
      .execute('GetProfiles_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetProfiles_insightia`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}

async function FeedbackMail(req, res, next) {
  try {
  await sendMail('insightia.support@diligent.com', 'Feedback', feedbackMailTemplate(req.body.userid, req.body.feedbackPage, req.body.feedbacktext));
  const pool = await poolPromise;
  const result = await pool
  .request()
  .input('userid', sql.Int, req.body.userid)
  .input('feedbackPage', sql.VarChar, req.body.feedbackPage)
  .input('feedbacktext', sql.VarChar, req.body.feedbacktext)
  .execute('Feedback_Transaction');

  res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/FeedbackMail`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
async function GetForeignSecurityKey(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('User_Id', sql.VarChar, req.body.userid)
    .execute('GetUser');
    res.json(result.recordset);
    } catch (error) {
      general.ErrorLog(`${generalRoutes}/GetForeignSecurityKey`, error, req.user.User_Id, req.body, req.headers.origin);
    }
}

async function GetHistoricalGovernanceTab(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('GetHistoricalGovernanceTabDataCheck_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${generalRoutes}/GetHistoricalGovernanceTab`, error, req.user.User_Id, req.body, req.headers.origin);
    return false;
  }
}


module.exports = router;
