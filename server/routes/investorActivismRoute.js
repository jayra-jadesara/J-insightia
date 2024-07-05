const express = require('express');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');
const dateFormat = require('dateformat');

const investorActivismRoutes = 'investorActivism-Route';

// Overview
router.post(
  '/GetActiviststrategyData',
  authenticateToken,
  GetActiviststrategyData
);
router.post(
  '/GetHoldingsbyCountryChartData',
  authenticateToken,
  GetHoldingsbyCountryChartData
);
router.post(
  '/GetHoldingsbyIndustryChartData',
  authenticateToken,
  GetHoldingsbyIndustryChartData
);
router.post(
  '/GetHoldingsbyExitTypeChartData',
  authenticateToken,
  GetHoldingsbyExitTypeChartData
);
router.post(
  '/GetHoldingsbyMarketCapChartData',
  authenticateToken,
  GetHoldingsbyMarketCapChartData
);
router.post(
  '/GetActivistProfileData',
  authenticateToken,
  GetActivistProfileData
);
router.post(
  '/GetCampaignTypesbyActivistLst',
  authenticateToken,
  GetCampaignTypesbyActivistLst
);
router.post('/GetActivistOfficesLst', authenticateToken, GetActivistOfficesLst);
router.post(
  '/GetActivistPersonnelLst',
  authenticateToken,
  GetActivistPersonnelLst
);
router.post(
  '/GetActivistTimelineLst',
  authenticateToken,
  GetActivistTimelineLst
);
router.post(
  '/GetActivistSharholderProposalsLst',
  authenticateToken,
  GetActivistSharholderProposalsLst
);

//Activist Campaigns
router.post(
  '/GetInvestorActivistCampaignsDataList',
  authenticateToken,
  GetInvestorActivistCampaignsDataList
);

//Investments
router.post(
  '/GetActivistHoldingsLst',
  authenticateToken,
  GetActivistHoldingsLst
);
router.post(
  '/Get13F_Filings_by_ActivistLst',
  authenticateToken,
  Get13F_Filings_by_ActivistLst
);

//Demands
router.post(
  '/GetActivistGBRCampaignsLst',
  authenticateToken,
  GetActivistGBRCampaignsLst
);
router.post(
  '/GetCampaignSummarybyActivistLst',
  authenticateToken,
  GetCampaignSummarybyActivistLst
);

//Follower returns
router.post(
  '/GetFollowerReturnsSearchLst',
  authenticateToken,
  GetFollowerReturnsSearchLst
);
router.post(
  '/GetFollowerReturnsActivistStatschartData',
  authenticateToken,
  GetFollowerReturnsActivistStatschartData
);
router.post(
  '/GetFollowerReturnsActivistStatsData',
  authenticateToken,
  GetFollowerReturnsActivistStatsData
);

//Performance-Periodic
router.post(
  '/GetPerformancePeriodicbyActivistLst',
  authenticateToken,
  GetPerformancePeriodicbyActivistLst
);
router.post('/GetListofReprtingDate', authenticateToken, GetListofReprtingDate);
//Performane-Anual
router.post(
  '/GetPerformanceAnnualbyActivistLst',
  authenticateToken,
  GetPerformanceAnnualbyActivistLst
);

//Activism access
router.post('/GetInvestorActivisamTabDataCheck', authenticateToken, GetInvestorActivisamTabDataCheck)

async function GetActiviststrategyData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetActiviststrategy');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetActiviststrategyData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHoldingsbyCountryChartData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetHoldingsbyCountry_v2');
    let chartArr = [];
    await result.recordset.forEach((x) => {
      chartArr.push({ text: x.Country_name, value: x.country_count });
    });
    await res.json(chartArr);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetHoldingsbyCountryChartData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHoldingsbyIndustryChartData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetHoldingsbyIndustry_v2');
    let chartArr = [];
    await result.recordset.forEach((x) => {
      chartArr.push({ text: x.industry_name, value: x.count_industry });
    });
    await res.json(chartArr);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetHoldingsbyIndustryChartData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHoldingsbyExitTypeChartData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetHoldingsbyExitType_v2');
    let chartArr = [];
    await result.recordset.forEach((x) => {
      chartArr.push({ text: x.exit_type, value: x.exit_count });
    });
    await res.json(chartArr);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetHoldingsbyExitTypeChartData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHoldingsbyMarketCapChartData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetHoldingsbyMarketCap_v2');
    let chartArr = [];
    await result.recordset.forEach((x) => {
      chartArr.push({ text: x.Category, value: x.count_category });
    });
    await res.json(chartArr);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetHoldingsbyMarketCapChartData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActivistProfileData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetActivistProfile');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetActivistProfileData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCampaignTypesbyActivistLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('ListCampaignTypesbyActivist_v3');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetCampaignTypesbyActivistLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActivistOfficesLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('ListActivistOffices');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetActivistOfficesLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActivistPersonnelLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('ListActivistPersonnel');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetActivistPersonnelLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActivistTimelineLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('ListForActivistTimeline');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetActivistTimelineLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActivistSharholderProposalsLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetActivistSharholderProposals');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetActivistSharholderProposalsLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

//Investments

async function GetActivistHoldingsLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('ListActivistHoldings');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetActivistHoldingsLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function Get13F_Filings_by_ActivistLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('List13F_Filings_by_Activist');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/Get13F_Filings_by_ActivistLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

//Demands
async function GetActivistGBRCampaignsLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('ListActivistGBRCampaigns_v2');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetActivistGBRCampaignsLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCampaignSummarybyActivistLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('ListCampaignSummarybyActivist_insightia');
    ArrResult = [];
    subArr = result.recordsets[1];

    await result.recordset.map((d) => {
      subArr.map((d1) => {
        if (d.campaign_summary_id === d1.campaign_summary_id) {
          d.subData = [d1];
        }
      });
    });
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetCampaignSummarybyActivistLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetFollowerReturnsSearchLst(req, res) {
  try {
    const pool = await poolPromise;
    const result_exited = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .input('status_id', sql.Int, 0)
      .execute('GetFollowerReturns_search_v2');
    const result_current = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .input('status_id', sql.Int, 1)
      .execute('GetFollowerReturns_search_v2');
    const result_date = await pool
      .request()
      .execute('GetActivistPortfolioPrices_date');

    result_exited.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );
    result_current.recordset.forEach((element) =>
      general.validateNulltoEmptyString(element)
    );

    const date =
      result_date.recordset.length > 0
        ? `Price at close on ${dateFormat(
            result_date.recordset[0].latest_date,
            'dd-mmm-yy',
            true
          )}`
        : '';

    await res.json({
      result_exited: result_exited.recordset,
      result_current: result_current.recordset,
      result_date: date,
    });
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetFollowerReturnsSearchLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetFollowerReturnsActivistStatschartData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetFollowerReturns_ActivistStats_chart');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetFollowerReturnsActivistStatschartData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetFollowerReturnsActivistStatsData(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetFollowerReturns_ActivistStats');
    if (result.recordset.length > 0) {
      let convertArr = Object.entries(result.recordset[0]).slice(2);
      let record1 = [],
        record2 = [],
        record3 = [],
        record4 = [],
        record5 = [],
        record6 = [];
      await record1.push('Average Total Return');
      await record2.push('Average Annualised Total Return');
      await record3.push('Average Return (S&P Total Return)');
      await record4.push('Average Annualised Return (S&P Total Return)');
      await record5.push('No. of Investments Outperforming S&P');
      await record6.push('No. of Investments Underperforming S&P');
      await convertArr.forEach((d) => {
        if (
          d[0].indexOf('annualised') === -1 &&
          d[0].indexOf('index') === -1 &&
          d[0].indexOf('count') === -1 &&
          d[0].indexOf('withdiv') === -1 &&
          d[0].indexOf('whtdiv') === -1
        ) {
          record1.push(d[1]);
        }
        if (
          d[0].includes('annualised') &&
          d[0].indexOf('index') === -1 &&
          d[0].indexOf('count') === -1 &&
          d[0].indexOf('withdiv') === -1 &&
          d[0].indexOf('whtdiv') === -1
        ) {
          record2.push(d[1]);
        }
        if (
          d[0].indexOf('annualised') === -1 &&
          d[0].includes('index') &&
          d[0].indexOf('count') === -1 &&
          d[0].indexOf('withdiv') === -1 &&
          d[0].indexOf('whtdiv') === -1
        ) {
          record3.push(d[1]);
        }
        if (
          d[0].includes('annualised') &&
          d[0].includes('index') &&
          d[0].indexOf('count') === -1 &&
          d[0].indexOf('withdiv') === -1 &&
          d[0].indexOf('whtdiv') === -1
        ) {
          record4.push(d[1]);
        }
        if (d[0].includes('count') && d[0].includes('beat')) {
          record5.push(d[1]);
        }
        if (d[0].includes('count') && d[0].includes('under')) {
          record6.push(d[1]);
        }
      });
      await res.json([record1, record2, record3, record4, record5, record6]);
    } else {
      return res.json({});
    }
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetFollowerReturnsActivistStatsData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetPerformancePeriodicbyActivistLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .input('date_reported', sql.Date, req.body.dateReported)
      .execute('GetPerformancePeriodicbyActivist_new');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetPerformancePeriodicbyActivistLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetListofReprtingDate(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('ListofReprtingDate');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetListofReprtingDate`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetPerformanceAnnualbyActivistLst(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.actid)
      .execute('GetPerformanceAnnualbyActivist_new_v3');
    await res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetPerformanceAnnualbyActivistLst`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// investor activism campaign
async function GetInvestorProfile(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('investor_id', sql.Int, req.body.investor)
      .execute('proxy_insight.dbo.getInvestorName');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetInvestorProfile`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// what you want to use
async function GetInvestorActivistCampaignsDataList(req, res, next) {
  try {
    const pool = await poolPromise;
    const result_InvestorActivistCampaigns = await pool
      .request()
      .input('indiv_campaigns', sql.VarChar, req.body.indiv_campaigns)
      .input('investor_id', sql.Int, req.body.investor_id)
      .input('show_other_campaigns', sql.Bit, req.body.show_other_campaigns)
      .input('user_id', sql.Int, req.body.user_id)
      .input('resultset', sql.Int, req.body.resultset)
      .execute('getInvestorGroupedJointDemandsPageData_insightia');

    const myJsonDDLCampaign = [];
    const myJsonDDLNewCampaign = [];
    if (
      result_InvestorActivistCampaigns.recordsets !== undefined &&
      result_InvestorActivistCampaigns.recordsets[0].length > 0
    ) {
      result_InvestorActivistCampaigns.recordsets[0].forEach((obj) => {
        myJsonDDLCampaign.push({
          label: obj.campaign_name,
          value:
            obj.campaign_linking_id !== null
              ? obj.campaign_linking_id.toString()
              : null,
        });
        myJsonDDLNewCampaign.push({
          label: obj.campaign_name,
          value:
            obj.campaign_linking_id !== null
              ? obj.campaign_linking_id.toString()
              : null,
        });
      });
    }

    if (myJsonDDLCampaign.length === 0) {
      DDLCampaign = [];
    }

    const table_InvestorActivistCampaignSummary =
      result_InvestorActivistCampaigns.recordsets[2] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[2]
        : [];
    if (table_InvestorActivistCampaignSummary.length > 0) {
      table_InvestorActivistCampaignSummary.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    const table_PublicDemandDetail =
      result_InvestorActivistCampaigns.recordsets[4] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[4]
        : [];
    if (table_PublicDemandDetail.length > 0) {
      table_PublicDemandDetail.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    const table_InvestorActivistCampaignCharacteristics =
      result_InvestorActivistCampaigns.recordsets[3] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[3]
        : [];
    if (table_InvestorActivistCampaignCharacteristics.length > 0) {
      table_InvestorActivistCampaignCharacteristics.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    const table_Filings =
      result_InvestorActivistCampaigns.recordsets[11] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[11]
        : [];
    if (table_Filings.length > 0) {
      table_Filings.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    const table_InvestorActivistCampaignTimeline =
      result_InvestorActivistCampaigns.recordsets[5] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[5]
        : [];
    if (table_InvestorActivistCampaignTimeline.length > 0) {
      table_InvestorActivistCampaignTimeline.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    const table_InvestorTheses =
      result_InvestorActivistCampaigns.recordsets[6] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[6]
        : []; //
    if (table_InvestorTheses.length > 0) {
      table_InvestorTheses.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    const table_InvestorShareholderProposals =
      result_InvestorActivistCampaigns.recordsets[7] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[7]
        : [];
    if (table_InvestorShareholderProposals.length > 0) {
      table_InvestorShareholderProposals.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    const table_InvestorAdvisors =
      result_InvestorActivistCampaigns.recordsets[8] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[8]
        : [];
    if (table_InvestorAdvisors.length > 0) {
      table_InvestorAdvisors.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    const table_InvestorStockPerformance =
      result_InvestorActivistCampaigns.recordsets[9] !== undefined
        ? result_InvestorActivistCampaigns.recordsets[9]
        : [];
    if (table_InvestorStockPerformance.length > 0) {
      table_InvestorStockPerformance.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    // #region News on Campaign
    let table_InvestorNews = [];

    let uniqueArray = [];
    result_InvestorActivistCampaigns.recordsets[10].forEach((element) => {
      if (!uniqueArray.find((x) => x.news_id === element.news_id)) {
        uniqueArray.push(element);
      }
    });

    if (uniqueArray !== undefined) {
      uniqueArray.map((x) => {
        let textShortArticle = '';
        const article =
          x.news_article !== null
            ? x.news_article
                .replace('[[B]].', '.')
                .replace('[[B]]', '')
                .replace(/HREF/g, 'target="_blank" HREF')
                .replace(/href/g, 'target="_blank" href')
                .split(/\r\n|\n|\r/gm)
            : null;

        if (article !== null && article.length > 0) {
          const articleDesc = x.news_article;
          if (articleDesc.includes('[[B]]')) {
            textShortArticle = articleDesc.split('[[B]]')[0];
          } else {
            textShortArticle = articleDesc.split(/\.|\?|\!/gm)[0];
          }

          if (textShortArticle.length > 300) {
            textShortArticle = `${textShortArticle.substring(0, 300)}...`;
          } else {
            textShortArticle = `${textShortArticle}.`;
          }
        }

        const myJsonArry = {
          campaign_name: x.campaign_name,
          pid: x.pid,
          newsid: x.news_id,
          img: x.image_filename,
          newsDate:
            x.news_date !== null
              ? general.dateToNull(x.news_date, 'd mmmm yyyy')
              : null,
          headLine: x.news_headline,
          article: article !== null ? article.join('</br>') : null,
          shortArticle: textShortArticle
            .replace(/HREF/g, 'target="_blank" HREF')
            .replace(/href/g, 'target="_blank" href'),
          visited: x.viewed,
          readOnly: false,
          activism_type: x.activism_type,
          module: x.module,
          categories: x.categories,
          Companies: x.Companies,
          source_link: x.source_link,
        };
        table_InvestorNews.push(myJsonArry);
      });
    }
    const table_News = table_InvestorNews.length > 0 ? table_InvestorNews : [];
    if (table_News.length > 0) {
      table_News.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }
    // #endregion

    const header_InvestorActivistCampaignSummary = [
      { head: 'Appoint Personnel', field: 'appoint_personnel' },
      { head: 'Personnel Removal', field: 'remove_personnel' },
      { head: 'Push For M&A', field: 'push_for_ma' },
      { head: 'Oppose M&A', field: 'oppose_ma' },
      { head: 'Divestiture', field: 'divestiture' },
      {
        head: 'Return Cash To Shareholders',
        field: 'return_cash_to_shareholders',
      },
      { head: 'Capital Structure', field: 'capital_structure' },
      { head: 'Operational', field: 'operational' },
      { head: 'Remuneration', field: 'remuneration' },
      { head: 'Environmental', field: 'environmental' },
      { head: 'Social', field: 'social' },
      { head: 'Governance', field: 'governance' },
    ];

    res.json({
      table_InvestorActivistCampaignSummary,
      table_PublicDemandDetail,
      header_InvestorActivistCampaignSummary,
      table_InvestorActivistCampaignCharacteristics,
      table_Filings,
      table_InvestorActivistCampaignTimeline,
      table_InvestorTheses,
      table_InvestorShareholderProposals,
      table_InvestorAdvisors,
      table_InvestorStockPerformance,
      myJsonDDLNewCampaign,
      table_InvestorNews,
      table_NewsId:
        table_News.length > 0 ? table_News.map((x) => x.newsid) : [],
    });
  } catch (e) {
    console.log(
      e.lineNumber,
      `-----------------\n${e.procName}\n---------------------`
    );
    console.error(e.message);
    general.ErrorLog(
      `${investorActivismRoutes}/GetInvestorActivistCampaignsDataList`,
      e,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetInvestorActivisamTabDataCheck(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('activist_id', sql.Int, req.body.activist_id)
      .execute('GetInvestorActivismTabDataCheck_insightia');
    res.json(result.recordset[0]);
  } catch (error) {
    general.ErrorLog(
      `${investorActivismRoutes}/GetInvestorActivisamTabDataCheck`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

module.exports = router;
