const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');
// const { dateToNull } = require('../../src/utils/general-util');

const ShortCampaignDataandAnalyticsRoute =
  'toolsShortCampaignDataandAnalytics-Route';

const ShortCampaign_data = require('../config/SampleData/ShortCampaign_data.json');

const dateFormat = require('dateformat');
const getAiSCampaignInformationData = require('../config/SampleData/AiSCampaignInformation_Data.json');

router.post(
  '/GetAiSCampaignInformation',
  authenticateToken,
  GetAiSCampaignInformation
);
router.post(
  '/GetAiSCampaignInformationDummyData',
  authenticateToken,
  GetAiSCampaignInformationDummyData
);
router.post(
  '/GetShortCampaignSamlpeData',
  authenticateToken,
  GetShortCampaignSamlpeData
);

async function GetAiSCampaignInformation(req, res) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('status', sql.Int, productStatus)
      .execute('GetAiSCampaignInformation_Insightia');

    const myJson = [];
    result.recordset.forEach((e) => {
      myJson.push({
        ...e,
        action_date: general.dateToNull(e.action_date, 'dd-mmm-yy'),
        exit_date: general.dateToNull(e.exit_date, 'dd-mmm-yy'),
      });
    });

    res.json(myJson);
  } catch (error) {
    general.ErrorLog(
      `${ShortCampaignDataandAnalyticsRoute}/GetAiSCampaignInformation`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetAiSCampaignInformationDummyData(req, res) {
  try {
    res.json(getAiSCampaignInformationData);
  } catch (error) {
    general.ErrorLog(
      `${ShortCampaignDataandAnalyticsRoute}/GetAiSCampaignInformationDummyData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetShortCampaignSamlpeData(req, res) {
  try {
    res.json(ShortCampaign_data);
  } catch (error) {
    general.ErrorLog(
      `${ShortCampaignDataandAnalyticsRoute}/GetShortCampaignSamlpeData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
module.exports = router;
