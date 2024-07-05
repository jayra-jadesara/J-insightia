const dateFormat = require('dateformat');
// const { json } = require("body-parser");
const express = require('express');
const { sql, poolPromise } = require('../../config/db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const toolsRoute = 'toolsPoisonPillDataAndAnalytics-Route';

router.post('/getPoisonPillStats', authenticateToken, GetPoisonPillStats);
router.post('/getRightsAgent', authenticateToken, GetRightsAgent);
router.post('/getPoisonPillRecentInsightia', authenticateToken, GetPoisonPillRecentInsightia);

async function GetPoisonPillStats(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool.request()
    .input('status', sql.Int, productStatus)
    .execute('getPoisonPillStats');
    res.json(result.recordsets);
  } catch (error) {
    general.ErrorLog(`${toolsRoute}/GetPoisonPillStats`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetRightsAgent(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('excel_download', sql.Int, req.body.excel_download_id)
      .input('status', sql.Int, productStatus)
      .execute('getRightsAgent');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${toolsRoute}/GetRightsAgent`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetPoisonPillRecentInsightia(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool.request()
    .input('status', sql.Int, productStatus)
    .execute('getPoisonPill_Recent_insightia');
    res.json(result.recordsets);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetPoisonPillRecentInsightia`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
