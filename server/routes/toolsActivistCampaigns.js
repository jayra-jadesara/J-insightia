// const { json } = require("body-parser");
const express = require('express');
const { sql, poolPromise } = require('../config/db');
const {
  activistCampaignService,
} = require('../services/activistCampaignService');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'toolsActivistCampaigns';
const activistCampaign = new activistCampaignService();

router.post(
  '/GetActivistCampaignsTool',
  authenticateToken,
  GetActivistCampaignsTool
);

async function GetActivistCampaignsTool(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    // activistCampaign.getData(req.body, (rows, lastRow) => {
    //   res.json({ rows, lastRow, result: rows.recordset });
    // });
    const result = await pool
      .request()
      .input('status', sql.Int, productStatus)
      .execute('pIW_Tool_ActivistCampaignsTool_v2');
    res.json({
      rows: result,
      result: result.recordset,
      lastRow: result.recordset.length,
    });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetActivistCampaignsTool`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
