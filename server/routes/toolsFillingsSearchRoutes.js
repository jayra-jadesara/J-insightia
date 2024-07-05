const dateFormat = require('dateformat');
// const { json } = require("body-parser");
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'toolsFillingsSearch-Route';

router.post('/GetToolsActivismFillingsData', authenticateToken, GetToolsActivismFillingsData);

async function GetToolsActivismFillingsData(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
    .request()
    .input('status', sql.Int, productStatus)
    .execute('GetToolsActivismFillingsData ');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetToolsActivismFillingsData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
