const express = require('express');
const { sql, poolPromise } = require('../../config/Db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const VotingOverviewRoutes = 'VotingOverviewRoute';

router.post('/GetInvestorVoteSummary', authenticateToken, GetInvestorVoteSummary);
router.post('/IssAndglasslewis_vote', authenticateToken, IssAndglasslewis_vote);
router.post('/GetManager_voting_against', authenticateToken, GetManager_voting_against);
router.post('/GetDissident_Data_for_Investor_v2', authenticateToken, GetDissident_Data_for_Investor_v2);
router.post('/GetManager_latest_against2', authenticateToken, GetManager_latest_against2);

async function GetInvestorVoteSummary(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetInvestorVoteSummary');
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.json(null);
    }
  } catch (error) {
    general.ErrorLog(`${VotingOverviewRoutes}/GetInvestorVoteSummary`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function IssAndglasslewis_vote(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.IssAndglasslewis_vote');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${VotingOverviewRoutes}/IssAndglasslewis_vote`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetManager_voting_against(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetManager_voting_against');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${VotingOverviewRoutes}/GetManager_voting_against`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetDissident_Data_for_Investor_v2(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investorid', sql.Int, req.body.investorid)
      .execute('proxy_insight.dbo.getDissident_Data_for_Investor_v2');
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.json(null);
    }
  } catch (error) {
    general.ErrorLog(`${VotingOverviewRoutes}/GetDissident_Data_for_Investor_v2`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetManager_latest_against2(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('proxy_insight.dbo.GetManager_latest_against2');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${VotingOverviewRoutes}/GetManager_latest_against2`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

module.exports = router;
// Make a route and function within the server/routes/____routes.js
// -Add the route to the frontends server-config.js as an export
// -Within company-utils.js  create an exported function to post the call
// -Within the ____Slice.js import the function and create an async thunk function to request the call and export it, also adding it to the extraReducers with a name for its value in state.
// -Within the page container import the request function, add it to the props deconstruction, call the function within the useEffect and add the exclusion, add the request to a mapDispatchtoProps.
// -Within the page container create a function
