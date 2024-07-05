// const { json } = require("body-parser");
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'toolsAiSFeelingsSearch';

router.post(
  '/GetActivistShortsFillingsData',
  authenticateToken,
  GetActivistShortsFillingsData
);

async function GetActivistShortsFillingsData(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('access', sql.Int, productStatus)
      .execute('activist_insight.dbo.ListRecentDocuments_Short');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
    `${toolsRoute}/GetActivistShortsFillingsData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
