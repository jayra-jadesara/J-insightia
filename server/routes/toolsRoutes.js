const dateFormat = require('dateformat');
// const { json } = require("body-parser");
const express = require('express');
const { sql, poolPromise, poolPromiseTimeout } = require('../config/db');
const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');
// const { general.dateToNull } = require('../../src/utils/general-util');

const toolsRoute = 'tools-Route';

router.post(
  '/PublicCampaignToolLists',
  authenticateToken,
  PublicCampaignToolLists
);
router.post(
  '/GetHoldingsDataAndAnalyticsData',
  authenticateToken,
  GetHoldingsDataAndAnalyticsData
);

router.post(
  '/GetPerformanceOverviewV2',
  authenticateToken,
  GetPerformanceOverviewV2
);
router.post(
  '/GetPerformanceCompounded',
  authenticateToken,
  GetPerformanceCompounded
);
router.post(
  '/ListFundPerformanceByYearV2',
  authenticateToken,
  ListFundPerformanceByYearV2
);
router.post('/GetAllMeetingType', authenticateToken, GetAllMeetingType);
router.post(
  '/GetAllIndividualProponent',
  authenticateToken,
  GetAllIndividualProponent
);
router.post('/GetAllGroupProponent', authenticateToken, GetAllGroupProponent);
router.post(
  '/ResolutionsByInvestorFilter',
  authenticateToken,
  ResolutionsByInvestorFilter
);
router.post('/ResolutionsByTarget', authenticateToken, ResolutionsByTarget);
router.post(
  '/ResolutionSearchByInvestor',
  authenticateToken,
  ResolutionSearchByInvestor
);
router.post('/GetHistoricalTrends', authenticateToken, GetHistoricalTrends);
router.post(
  '/InvestorComparatorhistoricalTrendsChartYTDData',
  authenticateToken,
  InvestorComparatorhistoricalTrendsChartYTDData
);
router.post(
  '/InvestorComparatorhistoricalTrendsChartProxySeasonData',
  authenticateToken,
  InvestorComparatorhistoricalTrendsChartProxySeasonData
);
router.post(
  '/GetHistoricalTrendsChartDataInvestorComparator',
  authenticateToken,
  GetHistoricalTrendsChartDataInvestorComparator
);

router.post(
  '/GetInvestorVotingPower',
  authenticateToken,
  GetInvestorVotingPower
);
router.post(
  '/GetResolutionsTypeIdByName',
  authenticateToken,
  GetResolutionsTypeIdByName
);
router.post(
  '/GetDirectorSectorAndIndustrySearchData',
  authenticateToken,
  GetDirectorSectorAndIndustrySearchData
);

// Performance Tools - Annual Performance
async function GetPerformanceOverviewV2(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('status', sql.Int, productStatus)
      .execute('GetPerformanceOverviewv2');
    const newPerformanceResult = [];
    // await all async functions to complete, then for each(map) for historic positions
    await Promise.all(
      result.recordset.map(async (p) => {
        const getListofyearFundsResults = await ListFundPerformanceByYearV2({
          Year: p.year,
        });
        // Join tables in new array
        newPerformanceResult.push({
          ...p,
          ...getListofyearFundsResults,
        });
      })
    );
    // sort the array by year
    const sortedAnnualPerformanceData = newPerformanceResult.sort((a, b) => {
      const keyA = new Date(a.year);
      const keyB = new Date(b.year);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    res.json(sortedAnnualPerformanceData);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetPerformanceOverviewV2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// Performance Tools - Annual Compounded GetPerformanceCompounded
async function GetPerformanceCompounded(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('status', sql.Int, productStatus)
      .execute('GetPerformanceCompounded');
    const newCompoundedResult = [];
    // await all async functions to complete, then for each(map) for historic positions
    await Promise.all(
      result.recordset.map(async (r) => {
        const getListofyearFundsCompoundedResults =
          await ListFundPerformanceByYearV2({
            Year: r.year,
          });
        // Join tables in new array
        newCompoundedResult.push({
          ...r,
          ...getListofyearFundsCompoundedResults,
        });
      })
    );
    // sort the array by year
    const sortedCompoundedPerformanceData = newCompoundedResult.sort((a, b) => {
      const keyA = new Date(a.year);
      const keyB = new Date(b.year);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    res.json(sortedCompoundedPerformanceData);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetPerformanceCompounded`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// ListFundPerformanceByYearV2 the same stored proc for annual and compounded performance
async function ListFundPerformanceByYearV2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('Year', sql.Int, req.Year)
      .execute('ListFundPerformanceByYearV2 ');
    return { listOfPerformance: result.recordset };
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ListFundPerformanceByYearV2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function PublicCampaignToolLists(req, res, next) {
  try {
    const pool = await poolPromise;
    let result;
    let status = false;
    let statusIcon = false;
    if (req.body.status === 2 && req.body.product_id === 1) {
      result = await pool
        .request()
        .execute('dbo.PublicCampaignTrialistsStatus2'); // Trialists  (status = 2)
      statusIcon = true;
    }
    if (
      req.body.status !== 2 &&
      req.body.status !== 4 &&
      req.body.product_id === 1
    ) {
      result = await pool.request().execute('dbo.PublicCampaignNotStatus2or4'); // Non users ( status <> 2 and status  <> 4)
      status = true;
      statusIcon = true;
    }
    if (req.body.status === 4 && req.body.product_id === 1) {
      result = await pool.request().execute('dbo.PublicCampaignFullUserList'); // Public Campaign Full User (status = 4)
    }
    const arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    // Heading
    myJsonHeading = {
      heading: [
        {
          activist_name: 'Investor',
          investor_id: 'Investor ID',
          focused_type: 'Focused',
          activist_founded: 'Activist Founded',
          company_name: 'Company',
          PID: 'PID',
          symbol: 'Stock Symbol',
          first_action_date: 'Demand Date',
          date_first_invested: 'Date Invested',
          Year_action: 'Demand Year',
          pcent_held: 'Current Holding (%)',
          action: 'Demand',
          activism_group_name: 'Demand Group',
          response_date: 'Outcome Date',
          response: 'Proxy Contest (Gain Board Representation Only)',
          seats_proposed: 'Seats Proposed (Gain Board Representation Only)',
          seats_won: 'Seats Gained (Gain Board Representation Only)',
          vote_settlement:
            'Seats Gained Method  (Gain Board Representation Only)',
          outcome: 'Outcome',
          company_HQ: 'Company HQ',
          company_region: 'Company Region',
          investor_HQ: 'Investor HQ',
          investor_region: 'Investor Region',
          exchange_name: 'Exchange',
          industry_name: 'Industry',
          industry_sector_name: 'Sector',
          market_cap_USD: 'Mkt Cap ($mn)',
          market_cap_category: 'Mkt Cap Category',
          current_status: 'Status',
          exit_date: 'Exit Date',
          exit_type: 'Exit Type',
          price_per_share: 'Price Per Share',
          Purchase_Value_mn: 'Purchase Value (Mn)',
          currency: 'Currency',
          buyer: 'Buyer',
          investor_type_name: 'Investor Type',
          investor_sub_type_names: 'Investor Sub Type',
        },
      ],
    };
    // Data
    arr.forEach((obj) => {
      myJson.push({
        activist_name: obj.activist_name,
        investor_id: obj.investor_id,
        focused_type: obj.focused_type,
        activist_founded: obj.activist_founded,
        company_name: obj.company_name,
        company_HQ: obj.company_HQ,
        company_region: obj.company_region,
        investor_HQ: obj.investor_HQ,
        investor_region: obj.investor_region,
        PID: obj.PID,
        symbol: obj.symbol,
        action_date: general.dateToNull(obj.action_date, 'dd-mmm-yy'),
        first_action_date: general.dateToNull(
          obj.first_action_date,
          'dd-mmm-yy'
        ),
        date_first_invested: general.dateToNull(
          obj.date_first_invested,
          'dd-mmm-yy'
        ),
        Year_action: obj.Year_action,
        //obj.pcent_held,
        pcent_held:
          obj.pcent_held !== undefined && obj.pcent_held !== null
            ? obj.pcent_held < 0
              ? obj.pcent_held.toFixed(1).toString().replace('-', '<')
              : obj.pcent_held.toFixed(1)
            : '',
        action: obj.action,
        activism_group_name: obj.activism_group_name,
        response_date: general.dateToNull(obj.response_date, 'dd-mmm-yy'),
        response: obj.response,
        seats_proposed: obj.seats_proposed,
        seats_won: obj.seats_won,
        vote_settlement: obj.vote_settlement,
        outcome: obj.outcome,
        exchange_name: obj.exchange_name,
        industry_name: obj.industry_name,
        industry_sector_name: obj.industry_sector_name,
        market_cap_USD:
          obj.market_cap_USD !== undefined && obj.market_cap_USD !== null
            ? obj.market_cap_USD.toFixed(1)
            : '',
        market_cap_category: obj.market_cap_category,
        current_status: obj.current_status,
        exit_date: general.dateToNull(obj.exit_date, 'dd-mmm-yy'),
        exit_type: obj.exit_type,
        price_per_share: obj.price_per_share,
        Purchase_Value_mn: obj.Purchase_Value_mn,
        currency:
          obj.price_per_share !== undefined &&
          obj.price_per_share !== null &&
          obj.Purchase_Value_mn !== undefined &&
          obj.Purchase_Value_mn !== null
            ? obj.currency
            : '',
        buyer: obj.buyer,
        investor_type_name: obj.investor_type_name,
        investor_sub_type_names: obj.investor_sub_type_names,
      });
    });
    res.json({
      data: myJson,
      heading: myJsonHeading.heading[0],
      trialStatus: status,
      statusIcon,
    });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/PublicCampaignToolLists`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetAllMeetingType(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute('proxy_insight..Getmeeting_typeofPI');
    const arr = result.recordset;
    arr.forEach((obj) => {
      general.RenameKey(obj, 'meeting_type_id', 'value');
      general.RenameKey(obj, 'meeting_type', 'label');
    });
    res.json(arr);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetAllMeetingType`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetAllIndividualProponent(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute('proxy_insight..GetProponantofPI');
    const arr = result.recordset;
    arr.forEach((obj) => {
      general.RenameKey(obj, 'proponent_id', 'value');
      general.RenameKey(obj, 'proponent_name', 'label');
    });

    const result1 = await pool
      .request()
      .execute('proxy_insight..GetProxyProponantofPI_ProxyContest');
    const arr1 = result1.recordset;
    arr1.forEach((obj) => {
      general.RenameKey(obj, 'proponent_id', 'value');
      general.RenameKey(obj, 'proponent_name', 'label');
    });

    res.json({ arr: arr, arr1: arr1 });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetAllIndividualProponent`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetAllGroupProponent(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute('proxy_insight..GetProponantofPI_by_type');
    const arr = result.recordset;
    arr.forEach((obj) => {
      general.RenameKey(obj, 'proponent_ids', 'value');
      general.RenameKey(obj, 'proponent_type', 'label');
    });

    const result1 = await pool
      .request()
      .execute('proxy_insight..GetProponantofPI_by_type_ProxyContest');
    const arr1 = result1.recordset;
    arr1.forEach((obj) => {
      general.RenameKey(obj, 'proponent_ids', 'value');
      general.RenameKey(obj, 'proponent_type', 'label');
    });

    res.json({ arr: arr, arr1: arr1 });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetAllGroupProponent`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ResolutionsByInvestorFilter(req, res, next) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('start_date', sql.Date, req.body.StartDate)
      .input('end_date', sql.Date, req.body.EndDate)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('status', sql.Int, productStatus)
      .input('investor_id', sql.Int, req.body.investor_id)
      .execute(
        'proxy_insight..resolutions_by_invest_filter_new_system_insightia'
      );

    function getvalueGetter(data, fieldname) {
      if (data !== undefined) {
        if (data[fieldname] === 100) {
          return data[fieldname] ? parseFloat(data[fieldname].toFixed(0)) : '';
        }
        return data[fieldname] ? parseFloat(data[fieldname].toFixed(1)) : '';
      }
      return null;
    }
    // const excelData = result.recordset.filter((x)=>x.proposal_type !== null && x.proposal_sponsor !==null);
    const excelData = result.recordset;
    let excelDataArr = [];
    excelData.map((x) => {
      excelDataArr.push({
        'Proposal Type':
          x.proposal_top_level === null ? 'All' : x.proposal_top_level,
        'Proposal Category': x.Category_Sub_level,
        Proposal: x.proposal_type,
        'M/S': x.proposal_sponsor,
        'Meetings (#)': x.number_of_meetings,
        'Votes (#)': x.votes_cast,
        'For (%)': getvalueGetter(x, 'for_pcent'),
        'Against (%)': getvalueGetter(x, 'against_pcent'),
        'Split (%)': getvalueGetter(x, 'split_pcent'),
        'Abstain (%)': getvalueGetter(x, 'abstain_pcent'),
        'Withhold (%)': getvalueGetter(x, 'withheld_pcent'),
        'DNV (#)': x.dnv,
        'ISS Match (%)': getvalueGetter(x, 'match_iss'),
        'GL Match (%)': getvalueGetter(x, 'match_gl'),
        'ISS Against Match (%)': getvalueGetter(x, 'match_iss_against'),
        'GL Against Match (%)': getvalueGetter(x, 'match_gl_against'),
        'ISS For Match (%)': getvalueGetter(x, 'iss_for_match'),
        'GL For Match (%)': getvalueGetter(x, 'gl_for_Match'),
      });
    });
    res.json({ data: result.recordset, excelData: excelDataArr });
  } catch (error) {
    res.json([]);
    general.ErrorLog(
      `${toolsRoute}/ResolutionsByInvestorFilter`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ResolutionsByTarget(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('start_date', sql.Date, req.body.StartDate)
      .input('end_date', sql.Date, req.body.EndDate)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('proposal_type_toplevel', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_type_sublevel', sql.Int, req.body.ProposalTypeSublevel)
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight..resolutions_byNewTarget_Insightia');

    const arr = result.recordset;
    res.json(arr);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ResolutionsByTarget`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ResolutionSearchByInvestor(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('start_date', sql.Date, req.body.StartDate)
      .input('end_date', sql.Date, req.body.EndDate)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_id', sql.Int, req.body.InvestorSearchId)
      .input('proposal_type_toplevel', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_type_sublevel', sql.Int, req.body.ProposalTypeSublevel)
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight..resolutionSearchbyinvestor_Insightia');
    res.json(result.recordset ? result.recordset : []);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ResolutionSearchByInvestor`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetInvestorVotingPower(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalTypeSublevel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('meeting_date_from', sql.Date, req.body.StartDate)
      .input('meeting_date_to', sql.Date, req.body.EndDate)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight..GetInvestorVotingPower_Insightia');

    const poolPvaImpact = await poolPromise;
    const resultPvaImpact = await poolPvaImpact
      .request()
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalTypeSublevel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('meeting_date_from', sql.Date, req.body.StartDate)
      .input('meeting_date_to', sql.Date, req.body.EndDate)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight..GetPvaImpact_Insightia');

    res.json({
      VotingPower: result.recordset,
      PvaImpact: resultPvaImpact.recordset,
    });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetInvestorVotingPower`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetResolutionsTypeIdByName(req, res) {
  try {
    if (req.body.Lavel === 0) {
      res.json(null);
    } else {
      const pool = await poolPromiseTimeout;
      const result = await pool
        .request()
        .input('Lavel', sql.Int, req.body.Lavel)
        .input('Proposal_type', sql.VarChar, req.body.ProposalType)
        .execute('proxy_insight..GetResolutionsTypeIdByName');
      if (result.recordset.length > 0) {
        res.json(result.recordset[0].id);
      } else {
        res.json(1);
      }
    }
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetResolutionsTypeIdByName`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHistoricalTrendsFn(result, req) {
  try {
    const arrInvTrends = result.recordsets;

    let myHistoricalTrendsJson = {};

    if (arrInvTrends.length > 0) {
      myHistoricalTrendsJson = {
        ...myHistoricalTrendsJson,
        allInvestor: arrInvTrends[0],
      };
    }

    if (arrInvTrends.length > 1) {
      myHistoricalTrendsJson = {
        ...myHistoricalTrendsJson,
        defaultStackBarSelection: arrInvTrends[1],
      };
    }

    if (arrInvTrends.length > 2) {
      myHistoricalTrendsJson = {
        ...myHistoricalTrendsJson,
        invFor: arrInvTrends[2],
      };
    }

    if (arrInvTrends.length > 3) {
      myHistoricalTrendsJson = {
        ...myHistoricalTrendsJson,
        invAgainst: arrInvTrends[3],
      };
    }

    if (arrInvTrends.length > 4) {
      myHistoricalTrendsJson = {
        ...myHistoricalTrendsJson,
        invAbstain: arrInvTrends[4],
      };
    }

    if (arrInvTrends.length > 5) {
      const ddlInvestor = arrInvTrends[5];
      let myJsonStr = '';
      ddlInvestor.forEach((e) => {
        myJsonStr += e.ddlList;
      });
      if (myJsonStr !== '') {
        const ddlArray = JSON.parse(myJsonStr);
        const selectedDdlLst = [];
        if (ddlArray !== null) {
          ddlArray.forEach((obj) => {
            general.RenameKey(obj, 'id', 'value');
            general.RenameKey(obj, 'text', 'label');
            if (obj.selected === 'True') {
              selectedDdlLst.push(obj);
            }
          });
        }

        myHistoricalTrendsJson = {
          ...myHistoricalTrendsJson,
          ddlInvestor: ddlArray,
          selectedDdlInvestor: selectedDdlLst,
        };
      } else {
        myHistoricalTrendsJson = { ...myHistoricalTrendsJson, ddlInvestor: [] };
      }
    }

    return myHistoricalTrendsJson;
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetHistoricalTrendsFn`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHistoricalTrendsChartDataInvestorComparator(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );

    const resultHistoricalTrends_CalendarYearData = await pool
      .request()
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('proposal_type_toplevel', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_type_sublevel', sql.Int, req.body.ProposalTypeSublevel)
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('defaultDdlSelection', sql.Int, req.body.DefaultSelection)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..WebToolsV_InvestorComparator_HistoricalTrends_CalendarYearData'
      );
    const HistoricalTrends_CalendarYearData = await GetHistoricalTrendsFn(
      resultHistoricalTrends_CalendarYearData
    );
    /////////

    const resultHistoricalTrends_YTDData = await pool
      .request()
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('proposal_type_toplevel', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_type_sublevel', sql.Int, req.body.ProposalTypeSublevel)
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('defaultDdlSelection', sql.Int, req.body.DefaultSelection)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..WebToolsV_InvestorComparator_HistoricalTrends_YTDData'
      );
    const HistoricalTrends_YTDData = await GetHistoricalTrendsFn(
      resultHistoricalTrends_YTDData
    );
    ///////////////////

    const resultHistoricalTrends_ProxySeasonData = await pool
      .request()
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('proposal_type_toplevel', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_type_sublevel', sql.Int, req.body.ProposalTypeSublevel)
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('defaultDdlSelection', sql.Int, req.body.DefaultSelection)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..WebToolsV_InvestorComparator_HistoricalTrends_ProxySeasonData'
      );
    const HistoricalTrends_ProxySeasonData = await GetHistoricalTrendsFn(
      resultHistoricalTrends_ProxySeasonData
    );

    res.json({
      HistoricalTrends_CalendarYearData,
      HistoricalTrends_YTDData,
      HistoricalTrends_ProxySeasonData,
    });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetHistoricalTrendsChartDataInvestorComparator`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHistoricalTrends(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('proposal_type_toplevel', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_type_sublevel', sql.Int, req.body.ProposalTypeSublevel)
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('defaultDdlSelection', sql.Int, req.body.DefaultSelection)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..WebToolsV_InvestorComparator_HistoricalTrends_CalendarYearData'
      );

    const myHistoricalTrendsJson = await GetHistoricalTrendsFn(result, req);
    res.json(myHistoricalTrendsJson);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetHistoricalTrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function InvestorComparatorhistoricalTrendsChartYTDData(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('proposal_type_toplevel', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_type_sublevel', sql.Int, req.body.ProposalTypeSublevel)
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('defaultDdlSelection', sql.Int, req.body.DefaultSelection)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..WebToolsV_InvestorComparator_HistoricalTrends_YTDData'
      );

    const myHistoricalTrendsJson = await GetHistoricalTrendsFn(result, req);
    res.json(myHistoricalTrendsJson);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/InvestorComparatorhistoricalTrendsChartYTDData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function InvestorComparatorhistoricalTrendsChartProxySeasonData(
  req,
  res
) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('investor_search_id', sql.Int, req.body.InvestorSearchId)
      .input('proposal_type_toplevel', sql.Int, req.body.ProposalTypeToplevel)
      .input('proposal_type_sublevel', sql.Int, req.body.ProposalTypeSublevel)
      .input('proposal_type', sql.Int, req.body.ProposalType)
      .input('defaultDdlSelection', sql.Int, req.body.DefaultSelection)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..WebToolsV_InvestorComparator_HistoricalTrends_ProxySeasonData'
      );

    const myHistoricalTrendsJson = await GetHistoricalTrendsFn(result, req);
    res.json(myHistoricalTrendsJson);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/InvestorComparatorhistoricalTrendsChartProxySeasonData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetHoldingsDataAndAnalyticsData(req, res, next) {
  try {
    const pool = await poolPromise;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('status', sql.Int, productStatus)
      .execute('dbo.GetHoldingsDataAndAnalyticsList');

    const arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    // Heading
    myJsonHeading = {
      heading: [
        {
          activist_name: 'Investor',
          investor_id: 'Investor ID',
          Activist_country: 'Investor HQ',
          focused_type: 'Focus Type',
          AUM_dollars: 'AUM ($mn)',
          assets_date: 'AUM As At',
          company_name: 'Company',
          PID: 'PID',
          Company_country: 'Company HQ',
          industry_name: 'Industry',
          industry_sector_name: 'Sector',
          market_cap_USD: 'Mkt Cap ($mn)',
          market_cap_category: 'Category',
          symbol: 'Stock Symbol',
          exchange_name: 'Exchange',
          date_first_invested: 'Date First Invested',
          year_first_invested: 'Year First Invested',
          pcent_held: 'Current Holding (%)',
          Status: 'Status',
          exit_date: 'Date Exited',
          exit_type: 'Exit Type',
          price_per_share: 'Price Per Share',
          Purchase_Value_mn: 'Purchase Value (Mn)',
          currency: 'Currency',
          Buyer: 'Buyer',
          publicDemand: 'Public Demand',
          returnf: 'Total Follower Return',
          return_snpf: 'S&P 500 Follower Return',
          return_annf: 'Total Follower Return Annualised',
          return_snp_annf: 'S&P 500 Follower Return Annualised',
        },
      ],
    };
    // Data
    arr.forEach((obj) => {
      myJson.push({
        activist_name: obj.activist_name,
        investor_id: obj.investor_id,
        Activist_country: obj.Activist_country,
        focused_type: obj.focused_type,
        AUM_dollars: obj.AUM_dollars,
        assets_date: general.dateToNull(obj.assets_date, 'dd-mmm-yy'),
        company_name: obj.company_name,
        PID: obj.PID,
        Company_country: obj.Company_country,
        industry_name: obj.industry_name,
        industry_sector_name: obj.industry_sector_name,
        market_cap_USD: obj.market_cap_USD,
        market_cap_category: obj.market_cap_category,
        symbol: obj.symbol,
        exchange_name: obj.exchange_name,
        date_first_invested: general.dateToNull(
          obj.date_first_invested,
          'dd-mmm-yy',
          false
        ),
        year_first_invested: obj.year_first_invested,
        pcent_held: obj.pcent_held,
        Status: obj.Status,
        exit_date: general.dateToNull(obj.exit_date, 'dd-mmm-yy'),
        exit_type: obj.exit_type,
        price_per_share: obj.price_per_share,
        Purchase_Value_mn: obj.Purchase_Value_mn,
        currency: obj.currency,
        Buyer: obj.Buyer,
        publicDemand: obj.publicDemand,
        returnf: obj.returnf,
        return_snpf: obj.return_snpf,
        return_annf: obj.return_annf,
        return_snp_annf: obj.return_snp_annf,
      });
    });
    res.json({
      data: myJson,
      heading: myJsonHeading.heading[0],
    });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetHoldingsDataAndAnalyticsData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetDirectorSectorAndIndustrySearchData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('PIListSectorsAndIndustries');

    const jsonCampaignActionsAndGroups = [];
    const unique = [
      ...new Set(result.recordset.map((item) => item.industry_sector_id)),
    ];
    unique.map((e) => {
        let labeltext;
        let Valuetext;
        const jsonChildren = [];
        result.recordset
          .filter((person) => person.industry_sector_id === e)
          .map((row) => {
            labeltext = row.industry_sector_name;
            Valuetext = row.industry_sector_id;
            jsonChildren.push({
              label: row.industry_name,
              value: row.industry_id,
              expanded: false,
            });
          });
        jsonCampaignActionsAndGroups.push({
          label: labeltext,
          value: Valuetext,
          children: jsonChildren,
          expanded: false,
        });
      });
    res.json(jsonCampaignActionsAndGroups);
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetDirectorSectorAndIndustrySearchData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
module.exports = router;
