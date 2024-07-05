const dateFormat = require('dateformat');
const { json } = require('body-parser');

const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const investorRoutes = 'investor-Route';

// investor
router.post('/search', authenticateToken, GetSearchInvestors);
router.post('/GetInvestorProfile', authenticateToken, GetInvestorProfile);
router.post('/ListActivistFilingsByActivist_v2', authenticateToken, ListActivistFilingsByActivist_v2);
router.post('/ListActivistFilingsByActivistAiS', authenticateToken, ListActivistFilingsByActivistAiS);
router.post('/GetInvestorNavReq', authenticateToken, GetInvestorNavReq);
router.post('/GetFMProfile', authenticateToken, GetFMProfile);

/// / INVESTOR

async function GetSearchInvestors(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_name', sql.VarChar, req.body.NameSearch)
      .input('quicksearch', sql.Int, req.body.quicksearch)
      .execute('activist_insight.dbo.GetInvestorModuleAccessData');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${investorRoutes}/GetSearchInvestors`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetInvestorProfile(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor)
      .execute('proxy_insight.dbo.getInvestorName');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${investorRoutes}/GetInvestorProfile`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

//  FILING: Get filing activists and then return the activist list
async function ListActivistFilingsByActivist_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activist_id)
      .execute('ListActivistFilingsByActivist_v3');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorRoutes}/ListActivistFilingsByActivist_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ListActivistFilingsByActivistAiS(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activist_id)
      .execute('ListActivistFilingsByActivistAiS_v2');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorRoutes}/ListActivistFilingsByActivistAiS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetInvestorNavReq(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .input('user_id', sql.Int, req.body.user_id)
      .execute('GetProfilesInvestor_insightia');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${investorRoutes}/GetInvestorNavReq`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetFMProfile(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute('getInvestorOverview_insightia');
    if (result.recordset.length > 0) {
      res.json({data: result.recordset[0]});
    } else {
      res.json({data: null});
    }
  } catch (error) {
    general.ErrorLog(`${investorRoutes}/GetFMProfile`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// async function GetFMProfile(req, res, next) {
//   const pool = await poolPromise;
//   const result = await pool
//     .request()
//     .input('investor_id', sql.Int, req.body.investor_id)
//     .execute('getInvestorOverview_insightia');
//   if (result.recordset.length > 0) {
//     res.json(result.recordset[0]);
//   } else {
//     res.json(null);
//   }
// }

module.exports = router;
// Make a route and function within the server/routes/____routes.js
// -Add the route to the frontends server-config.js as an export
// -Within company-utils.js  create an exported function to post the call
// -Within the ____Slice.js import the function and create an async thunk function to request the call and export it, also adding it to the extraReducers with a name for its value in state.
// -Within the page container import the request function, add it to the props deconstruction, call the function within the useEffect and add the exclusion, add the request to a mapDispatchtoProps.
// -Within the page container create a function
