// const { json } = require("body-parser");
const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'toolsActivistCampaignAdvisor';

router.post('/GetLawFirmsDataActivismAdvisor', authenticateToken, GetLawFirmsDataActivismAdvisor);
router.post('/GetLawFirmsDataShortActivismAdvisor', authenticateToken, GetLawFirmsDataShortActivismAdvisor);

async function GetLawFirmsDataActivismAdvisor(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool.request().input('status', sql.Int, productStatus).execute('GetLawFirms_insightia');
    let Arr = result.recordsets[0];
    await Arr.forEach((d) => {
      if (d.acting_for === 'Activist' || d.acting_for === 'Investor') {
        d.acting_for_v2 = 'Investor';
      } else if (d.acting_for === 'Issuer' || d.acting_for === 'Company') {
        d.acting_for_v2 = 'Company';
      }
    });
    res.json([Arr, result.recordsets[1]]);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetLawFirmsDataActivismAdvisor`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetLawFirmsDataShortActivismAdvisor(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool.request()
    .input('status', sql.Int, productStatus)
    .input('access', sql.Int, productStatus)
    .execute('GetLawFirmsshort_insightia');
    let Arr = result.recordset;
    await Arr.forEach((d) => {
      if (d.acting_for === 'Activist' || d.acting_for === 'Investor') {
        d.acting_for_v2 = 'Investor';
      } else if (d.acting_for === 'Issuer' || d.acting_for === 'Company') {
        d.acting_for_v2 = 'Company';
      }
    });
    res.json([Arr, result.recordsets[1]]);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetLawFirmsDataShortActivismAdvisor`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
