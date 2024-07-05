const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'notifiedShortPositionDataToolRoutes';

router.post('/GetAiSCountriesAndStats', authenticateToken, GetAiSCountriesAndStats);
router.post('/GetShortPositions', authenticateToken, GetShortPositions);
router.post('/GetShortPositionsTopTwenty', authenticateToken, GetShortPositionsTopTwenty);
router.post('/GetAiSRecentShortPositions', authenticateToken, GetAiSRecentShortPositions);
router.post('/GetAiSRecentShortPositionsTopTwenty', authenticateToken, GetAiSRecentShortPositionsTopTwenty);

async function GetAiSCountriesAndStats(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetAiS_stats_get_countries');

    const myJson = [{ value: req.body.DefailtValue, label: req.body.DefaultLabel }];
    result.recordset.forEach((e) => {
      myJson.push({ value: e.country_id, label: e.Country_name });
    });

    res.json(myJson);
  } catch (error) {
    general.ErrorLog(`${toolsRoute}/GetAiSCountriesAndStats`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetShortPositions(req, res) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool.request()
    .input('country_id', sql.Int, req.body.country_id)
    .input('status', sql.Int, productStatus)
    .execute('getshortpositions');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${toolsRoute}/GetShortPositions`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetShortPositionsTopTwenty(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('country_id', sql.Int, req.body.country_id)
      .execute('getshortpositions_top20');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${toolsRoute}/GetShortPositionsTopTwenty`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAiSRecentShortPositions(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      // .input('country_id', sql.Int, req.body.country_id)
      .execute('GetAiS_recent_short_positions_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${toolsRoute}/GetAiSRecentShortPositions`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetAiSRecentShortPositionsTopTwenty(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('country_id', sql.Int, req.body.country_id)
      .execute('GetAiS_recent_short_positions_top20');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetAiSRecentShortPositionsTopTwenty`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
