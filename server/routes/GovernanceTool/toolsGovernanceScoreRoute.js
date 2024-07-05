const dateFormat = require('dateformat');
// const { json } = require("body-parser");
const express = require('express');
const { sql, poolPromise } = require('../../config/db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const toolsGovernanceScoreRoute = 'toolsGovernanceScoreRoute';

router.post('/GetAiGScores', authenticateToken, GetAiGScores);

async function GetAiGScores(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('status', sql.Int, productStatus)
      .execute('activist_insight.dbo.getGovernanceScores');
    const arr = result.recordset.sort((a, b) =>
      a.Company_name.toLowerCase().localeCompare(b.Company_name.toLowerCase())
    );

    const resultToolTip = await pool
      .request()
      .input('tooltip_section_id', sql.Int, req.body.tooltip_section_id)
      .execute('activist_insight.dbo.getToolTipBySection');

    res.json({ data: arr, tooltipData: resultToolTip.recordset });
  } catch (error) {
    general.ErrorLog(
      `${toolsGovernanceScoreRoute}/GetAiGScores`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
