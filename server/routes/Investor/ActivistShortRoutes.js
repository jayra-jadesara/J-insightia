const express = require('express');
const { sql, poolPromise } = require('../../config/Db');

const router = express.Router();
const { authenticateToken } = require('../../utill/authUtil');
const general = require('../../utill/general');

const ActivistShortRoutes = 'ActivistShortRoute';

// Overview
router.post(
  '/GetActivistIdFromInvestor',
  authenticateToken,
  GetActivistIdFromInvestor
);
router.post(
  '/GetInvestorIdFromActivist',
  authenticateToken,
  GetInvestorIdFromActivist
);
router.post(
  '/ListCampaignTypesbyActivist',
  authenticateToken,
  ListCampaignTypesbyActivist
);
router.post(
  '/GetHoldingsbyCountryAiS',
  authenticateToken,
  GetHoldingsbyCountryAiS
);
router.post(
  '/GetHoldingsbyIndustryAiS',
  authenticateToken,
  GetHoldingsbyIndustryAiS
);
router.post(
  '/GetHoldingsbyMarketCapAiS',
  authenticateToken,
  GetHoldingsbyMarketCapAiS
);

// Campaign
router.post(
  '/GetCampaignSummarybyActivistAiS',
  authenticateToken,
  GetCampaignSummarybyActivistAiS
);

async function GetActivistIdFromInvestor(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investorId)
      .execute('proxy_insight..GetActistIdFromInvestor');
    res.json({
      activist_id:
        result.recordset.length > 0 ? result.recordset[0].activist_id : null,
    });
  } catch (error) {
    general.ErrorLog(
      `${ActivistShortRoutes}/GetActivistIdFromInvestor`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetInvestorIdFromActivist(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activist_id)
      .execute('proxy_insight..GetInvestorIdFromActivist');
    res.json({
      investor_id:
        result.recordset.length > 0 ? result.recordset[0].investor_id : null,
    });
  } catch (error) {
    general.ErrorLog(
      `${ActivistShortRoutes}/GetInvestorIdFromActivist`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ListCampaignTypesbyActivist(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activistId)
      .input('LongShort', sql.VarChar, req.body.longShort)
      .execute('ListCampaignTypesbyActivist_v2');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${ActivistShortRoutes}/ListCampaignTypesbyActivist`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

const getPersontag = (total, val) => (val * 100) / total;

async function GetHoldingsbyCountryAiS(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activistId)
      .execute('GetHoldingsbyCountry_AiS_v2');

    const myJson = [];
    let total = 0;
    if (result.recordset.length > 0) {
      total = result.recordset
        .map((c) => c.country_count)
        .reduce((a, e) => a + e);
    }

    result.recordset.forEach((e) => {
      myJson.push({
        text: `${e.country_name} (${parseInt(
          getPersontag(total, e.country_count)
        )}%)`,
        value: getPersontag(total, e.country_count),
      });
    });

    res.json(myJson);
  } catch (error) {
    general.ErrorLog(
      `${ActivistShortRoutes}/GetHoldingsbyCountryAiS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHoldingsbyIndustryAiS(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activistId)
      .execute('GetHoldingsbyIndustry_AiS_v2');

    const myJson = [];
    let total = 0;
    if (result.recordset.length > 0) {
      total = result.recordset
        .map((c) => c.count_industry)
        .reduce((a, e) => a + e);
    }
    result.recordset.forEach((e) => {
      myJson.push({
        text: `${e.industry_name} (${parseInt(
          getPersontag(total, e.count_industry)
        )}%)`,
        value: getPersontag(total, e.count_industry),
      });
    });

    res.json(myJson);
  } catch (error) {
    general.ErrorLog(
      `${ActivistShortRoutes}/GetHoldingsbyIndustryAiS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHoldingsbyMarketCapAiS(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activistId)
      .execute('GetHoldingsbyMarketCap_AiS_v2');

    const myJson = [];
    let total = 0;
    if (result.recordset.length > 0) {
      total = result.recordset
        .map((c) => c.count_category)
        .reduce((a, e) => a + e);
    }
    result.recordset.forEach((e) => {
      myJson.push({
        text: `${e.Category} (${parseInt(
          getPersontag(total, e.count_category)
        )}%)`,
        value: getPersontag(total, e.count_category),
      });
    });

    res.json(myJson);
  } catch (error) {
    general.ErrorLog(
      `${ActivistShortRoutes}/GetHoldingsbyMarketCapAiS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCampaignSummarybyActivistAiS(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activistId)
      .execute('ListCampaignSummarybyActivistAiS');

    const arr = [];
    result.recordset.map((x) => {
      arr.push({
        ...x,
        action: x.action.length > 0 ? x.action[0] : x.action,
        action_date:
          x.action_date.length > 0 ? x.action_date[0] : x.action_date,
        activist_id:
          x.activist_id.length > 0 ? x.activist_id[0] : x.activist_id,
        company_id: x.company_id.length > 0 ? x.company_id[0] : x.company_id,
        outcome: x.outcome.length > 0 ? x.outcome[0] : x.outcome,
        response: x.response.length > 0 ? x.response[0] : x.response,
        symbol: x.symbol.length > 0 ? x.symbol[0] : x.symbol,
      });
    });
    res.json({ data: arr });
  } catch (error) {
    general.ErrorLog(
      `${ActivistShortRoutes}/GetCampaignSummarybyActivistAiS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
