const dateFormat = require('dateformat');
const { json } = require('body-parser');

const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'toolsActicismTrends-Route';
const { func } = require('prop-types');
const Activism_trends = require('../config/SampleData/Activism_trends.json');

router.post('/getRegionsTrade', authenticateToken, getRegionsTrade);
router.post(
  '/getInvestmentPublicData',
  authenticateToken,
  getInvestmentPublicData
);
router.post(
  '/getCompaniesTargetedTrends',
  authenticateToken,
  getCompaniesTargetedTrends
);
router.post(
  '/getActiveActivistsTrends',
  authenticateToken,
  getActiveActivistsTrends
);
router.post(
  '/getActiveCompanyRegiontrends',
  authenticateToken,
  getActiveCompanyRegiontrends
);
router.post(
  '/getActiveActivistsRegiontrends',
  authenticateToken,
  getActiveActivistsRegiontrends
);
router.post(
  '/getIndustryTargetedTrends',
  authenticateToken,
  getIndustryTargetedTrends
);
router.post(
  '/getCompaniesWithMultipleactivistsTrends',
  authenticateToken,
  getCompaniesWithMultipleactivistsTrends
);
router.post(
  '/getMarketCapbyYearTrends',
  authenticateToken,
  getMarketCapbyYearTrends
);
router.post('/getActiveActivistsAUM', authenticateToken, getActiveActivistsAUM);
router.post('/getSuccessRatesTrends', authenticateToken, getSuccessRatesTrends);
router.post(
  '/getStoredProcedureDownloadExcel',
  authenticateToken,
  getStoredProcedureDownloadExcel
);

async function getRegionsTrade(req, res, next) {
  try {
    const listData = [];
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute('activist_insight.dbo.SelectedRegionsTrade');
    await result.recordset.map((d) => {
      listData.push({ label: d.Region_name, value: d.region_id });
    });
    res.json(listData);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getRegionsTrade`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getInvestmentPublicData(req, res, next) {
  try {
    res.json({ data: Activism_trends });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getInvestmentPublicData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getCompaniesTargetedTrends(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('region_id', sql.Int, req.body.region)
      .input('shortlong', sql.VarChar, req.body.shortlong)
      .input('public', sql.VarChar, req.body.public)
      .input('status', sql.Int, productStatus)
      .execute('activist_insight.dbo.CompaniesTargeted_Trends_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getCompaniesTargetedTrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getActiveActivistsTrends(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('region_id', sql.Int, req.body.region)
      .input('shortlong', sql.VarChar, req.body.shortlong)
      .input('public', sql.VarChar, req.body.public)
      .input('status', sql.Int, productStatus)
      .execute('activist_insight.dbo.ActiveActivists_Trends_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getActiveActivistsTrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getActiveCompanyRegiontrends(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('shortlong', sql.VarChar, req.body.shortlong)
      .input('public', sql.VarChar, req.body.public)
      .input('status', sql.Int, productStatus)
      .execute('activist_insight.dbo.ActiveCompany_Region_trends_insightia');

    const ChartKeys = Object.keys(result.recordset[0]);
    await ChartKeys.shift();

    // await Keys.map(d=>{
    //   ChartKeys.push(d.charAt(0).toUpperCase() + d.substring(0,d.indexOf('_pcent')).slice(1))
    // })

    res.json([result.recordset, ChartKeys]);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getActiveCompanyRegiontrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getActiveActivistsRegiontrends(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('shortlong', sql.VarChar, req.body.shortlong)
      .input('public', sql.VarChar, req.body.public)
      .input('status', sql.Int, productStatus)
      .execute('activist_insight.dbo.ActiveActivists_Region_trends_insightia');

    const ChartKeys = Object.keys(result.recordset[0]);
    await ChartKeys.shift();

    res.json([result.recordset, ChartKeys]);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getActiveActivistsRegiontrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getIndustryTargetedTrends(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('region_id', sql.Int, req.body.region)
      .input('shortlong', sql.VarChar, req.body.shortlong)
      .input('public', sql.VarChar, req.body.public)
      .input('status', sql.Int, productStatus)
      .execute('activist_insight.dbo.IndustryTargeted_Trendsv2_insightia');

    const ChartKeys = Object.keys(result.recordset[0]);
    await ChartKeys.shift();

    res.json([result.recordset, ChartKeys]);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getIndustryTargetedTrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getCompaniesWithMultipleactivistsTrends(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('region_id', sql.Int, req.body.region)
      .input('status', sql.Int, productStatus)
      .execute(
        'activist_insight.dbo.ListCompaniesWithMultipleactivistsTrends_insightia'
      );

    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getCompaniesWithMultipleactivistsTrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getMarketCapbyYearTrends(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('region_id', sql.Int, req.body.region)
      .input('shortlong', sql.VarChar, req.body.shortlong)
      .input('public', sql.VarChar, req.body.public)
      .input('status', sql.Int, productStatus)
      .execute(
        'activist_insight.dbo.MarketCapbyYear_Trends_overview_insightia'
      );

    const ChartKeys = Object.keys(result.recordset[0]);
    await ChartKeys.shift();

    res.json([result.recordset, ChartKeys]);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getMarketCapbyYearTrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getActiveActivistsAUM(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('region_id', sql.Int, req.body.region)
      .input('shortlong', sql.VarChar, req.body.shortlong)
      .input('public', sql.VarChar, req.body.public)
      .input('status', sql.Int, productStatus)
      .execute('activist_insight.dbo.ActiveActivists_AUM');

    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getActiveActivistsAUM`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getSuccessRatesTrends(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('region_id', sql.Int, req.body.region)
      .execute('activist_insight.dbo.SuccessRates_Trends');
    const data = [];
    result.recordset.filter((i) => {
      data.push({
        perc: Math.round(i.perc * 10) / 10,
        year_action: i.year_action,
      });
    });

    res.json(data);
  } catch (error) {
    console.log(error);
    general.ErrorLog(
      `${toolsRoute}/getSuccessRatesTrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getStoredProcedureDownloadExcel(req, res, next) {
  try {
    if (req.body.StoredProcedure !== null) {
      const pool = await poolPromise;
      if (req.body.parameters === 3) {
        const result = await pool
          .request()
          .input('region_id', sql.Int, req.body.region)
          .input('shortlong', sql.VarChar, req.body.shortlong)
          .input('public', sql.VarChar, req.body.public)
          .execute(req.body.StoredProcedure);
        res.json(result.recordset);
      }

      if (req.body.parameters === 1) {
        const result = await pool
          .request()
          .input('region_id', sql.Int, req.body.region)
          .execute(req.body.StoredProcedure);
        res.json(result.recordset);
      }
    } else {
      res.json([]);
    }
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/getStoredProcedureDownloadExcel/${req.body.StoredProcedure}`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// #endregion

module.exports = router;
