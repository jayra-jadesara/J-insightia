const express = require('express');
const { sql, poolPromiseTimeout } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const toolsRoute = 'toolsResolutionTrackerRoutes';

router.post(
  '/ResolutionByInvestorFilter',
  authenticateToken,
  ResolutionByInvestorFilter
);
router.post(
  '/GetProxyResolutionDetails',
  authenticateToken,
  GetProxyResolutionDetails
);
router.post(
  '/ResolutionTrackerHistoricalTrendsChartData',
  authenticateToken,
  ResolutionTrackerHistoricalTrendsChartData
);
router.post(
  '/ResolutionTrackerHistoricalTrendsChartDataYTD',
  authenticateToken,
  ResolutionTrackerHistoricalTrendsChartDataYTD
);
router.post(
  '/ResolutionTrackerHistoricalTrendsChartProxySeasonData',
  authenticateToken,
  ResolutionTrackerHistoricalTrendsChartProxySeasonData
);
router.post(
  '/ResolutionFilterByTotalVotesAnalysisYTD',
  authenticateToken,
  ResolutionFilterByTotalVotesAnalysisYTD
);
router.post(
  '/ResolutionFilterByTotalVotesAnalysis',
  authenticateToken,
  ResolutionFilterByTotalVotesAnalysis
);
router.post(
  '/ResolutionFilterByTotalProxySeasonVotesAnalysis',
  authenticateToken,
  ResolutionFilterByTotalProxySeasonVotesAnalysis
);

router.post(
  '/ResolutionTrackerFilterByHistoricalTrends',
  authenticateToken,
  ResolutionTrackerFilterByHistoricalTrends
);

async function ResolutionByInvestorFilter(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(req.body.token, req.body.product_id);

    let StartDate = null;
    let EndDate = null;

    if (req.body.StartDate !== null) {
      StartDate = general.dateCorrection(req.body.StartDate);
    }

    if (req.body.EndDate !== null) {
      EndDate = general.dateCorrection(req.body.EndDate);
    }

    const result = await pool
      .request()
      .input('start_date', sql.Date, StartDate)
      .input('end_date', sql.Date, EndDate)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight..resolutions_by_invest_filter_Insightia');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${toolsRoute}/ResolutionByInvestorFilter`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetProxyResolutionDetails(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );

    let StartDate = null;
    let EndDate = null;

    if (req.body.StartDate !== null) {
      StartDate = general.dateCorrection(req.body.StartDate);
    }

    if (req.body.EndDate !== null) {
      EndDate = general.dateCorrection(req.body.EndDate);
    }

    const result = await pool
      .request()
      .input('start_date', sql.Date, StartDate)
      .input('end_date', sql.Date, EndDate)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('proposal_type_id', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTopLevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalSubLavel)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('limited', sql.Int, req.body.Limited)
      .input('status', sql.Int, productStatus)
      .execute('proxy_insight..GetProxyresolutionSearch_Insightia');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/GetProxyResolutionDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

//#region Historic Trends Buttons API
async function analysisTable_ResolutionTracker(result) {
  try {
    let myResult = {};
    if (result.recordsets.length > 0) {
      const updateSummary = [];
      result.recordsets[0].forEach((e, i) => {
        updateSummary.push({
          ...e,
          detail: UpdateResolutionTrackerSummaryText(e.detail),
        });
        if (i === 3 || i === 5) {
          updateSummary.push({});
        }
      });
      myResult = { ...myResult, Summary: updateSummary };
    }
    if (result.recordsets.length > 1) {
      const sharesoutstandingJson = [];
      const forAndAgainstJson = [];
      const forAgainstAndAbstainJson = [];
      const ForAgainstAbstainandBrokerNonVotesJson = [];
      result.recordsets[1].forEach((e, i) => {
        sharesoutstandingJson.push({
          detail: UpdateResolutionTrackerDetailsText(e.detail),
          Y0Number: e['Y0 Number ALL'],
          Y0Perc: e['Y0 Perc ALL'],
          Y1Number: e['Y1 Number ALL'],
          Y1Perc: e['Y1 Perc ALL'],
          Y2Number: e['Y2 Number ALL'],
          Y2Perc: e['Y2 Perc ALL'],
          Y3Number: e['Y3 Number ALL'],
          Y3Perc: e['Y3 Perc ALL'],
          Y4Number: e['Y4 Number ALL'],
          Y4Perc: e['Y4 Perc ALL'],
        });
        forAndAgainstJson.push({
          detail: UpdateResolutionTrackerDetailsText(e.detail),
          Y0Number: e['Y0 Number For/Against'],
          Y0Perc: e['Y0 Perc For/Against'],
          Y1Number: e['Y1 Number For/Against'],
          Y1Perc: e['Y1 Perc For/Against'],
          Y2Number: e['Y2 Number For/Against'],
          Y2Perc: e['Y2 Perc For/Against'],
          Y3Number: e['Y3 Number For/Against'],
          Y3Perc: e['Y3 Perc For/Against'],
          Y4Number: e['Y4 Number For/Against'],
          Y4Perc: e['Y4 Perc For/Against'],
        });
        forAgainstAndAbstainJson.push({
          detail: UpdateResolutionTrackerDetailsText(e.detail),
          Y0Number: e['Y0 Number Shares Outstanding'],
          Y0Perc: e['Y0 Perc Shares Outstanding'],
          Y1Number: e['Y1 Number Shares Outstanding'],
          Y1Perc: e['Y1 Perc Shares Outstanding'],
          Y2Number: e['Y2 Number Shares Outstanding'],
          Y2Perc: e['Y2 Perc Shares Outstanding'],
          Y3Number: e['Y3 Number Shares Outstanding'],
          Y3Perc: e['Y3 Perc Shares Outstanding'],
          Y4Number: e['Y4 Number Shares Outstanding'],
          Y4Perc: e['Y4 Perc Shares Outstanding'],
        });
        ForAgainstAbstainandBrokerNonVotesJson.push({
          detail: UpdateResolutionTrackerDetailsText(e.detail),
          Y0Number: e['Y0 Number For/Against/Abstain/Broker'],
          Y0Perc: e['Y0 Perc For/Against/Abstain/Broker'],
          Y1Number: e['Y1 Number For/Against/Abstain/Broker'],
          Y1Perc: e['Y1 Perc For/Against/Abstain/Broker'],
          Y2Number: e['Y2 Number For/Against/Abstain/Broker'],
          Y2Perc: e['Y2 Perc For/Against/Abstain/Broker'],
          Y3Number: e['Y3 Number For/Against/Abstain/Broker'],
          Y3Perc: e['Y3 Perc For/Against/Abstain/Broker'],
          Y4Number: e['Y4 Number For/Against/Abstain/Broker'],
          Y4Perc: e['Y4 Perc For/Against/Abstain/Broker'],
        });

        if (i === 2) {
          sharesoutstandingJson.push({});
          forAndAgainstJson.push({});
          forAgainstAndAbstainJson.push({});
          ForAgainstAbstainandBrokerNonVotesJson.push({});
        }
      });
      myResult = {
        ...myResult,
        Sharesoutstanding: sharesoutstandingJson,
        ForAndAgainst: forAndAgainstJson,
        ForAgainstAndAbstain: forAgainstAndAbstainJson,
        ForAgainstAbstainandBrokerNonVotes:
          ForAgainstAbstainandBrokerNonVotesJson,
      };
    }
    if (result.recordsets.length > 2) {
      myResult = { ...myResult, CurrentYear: result.recordsets[2] };
    }
    return myResult;
  } catch (error) {
    console.log(`${toolsRoute}/analysisTable`);
  }
}
//
async function ResolutionTrackerHistoricalTrendsChartData(req, res) {
  req.setTimeout(0);
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('proposal_type_id', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTopLevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalSubLavel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..Resolution_filter_by_total_votes_graph_Insightia'
      );

    const arr = result.recordset;
    arr.sort((currentYear, newYear) => {
      const currentYearValue = parseInt(
        currentYear.meeting_year.toString().replace('YTD', '')
      );
      const nextYearValue = parseInt(
        newYear.meeting_year.toString().replace('YTD', '')
      );
      return currentYearValue - nextYearValue;
    });
    arr.forEach((obj) => {
      general.RenameKey(obj, 'prop_num', 'Proposals');
      general.RenameKey(obj, 'for_pcent', 'Support');
      general.RenameKey(obj, 'iss_votes', 'ISS* For');
      general.RenameKey(obj, 'gl_votes', 'GL For');
    });

    const myJson = [];
    let data = [];
    if (typeof arr === 'string') {
      data = JSON.parse(arr);
    } else {
      data = arr;
    }
    data.forEach((e, i) => {
      myJson.push({
        ...e,
        meeting_year:
          arr.length - 1 !== i
            ? e.meeting_year.toString().replace('YTD', '')
            : e.meeting_year,
        Proposals: Number(e.Proposals),
        pop_num: e.Proposals,
        Support:
          e.Support !== null ? Number(Number(e.Support).toFixed(2)) : null,
        'ISS* For':
          e['ISS* For'] !== null
            ? Number(Number(e['ISS* For']).toFixed(2))
            : null,
        'GL For':
          e['GL For'] !== null ? Number(Number(e['GL For']).toFixed(2)) : null,
      });
    });

    res.json({ data: myJson.length > 0 ? myJson : [] });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ResolutionTrackerHistoricalTrendsChartData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function ResolutionFilterByTotalVotesAnalysis(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const result = await pool
      .request()
      .input('proposal_type_id', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTopLevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalSubLavel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      // .input('management_recc', sql.VarChar, req.body.management_recc)
      // .input('outcome', sql.VarChar, req.body.outcome)
      .execute(
        'proxy_insight..Resolution_filter_by_total_votes_analysis_Insightia'
      );
    const myResult = await analysisTable_ResolutionTracker(result);
    res.json({ data: myResult });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ResolutionFilterByTotalVotesAnalysis`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// YTD
async function ResolutionTrackerHistoricalTrendsChartDataYTD(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('proposal_type_id', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTopLevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalSubLavel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..Resolution_filter_by_total_votes_graph_YTD_Insightia'
      );

    const arr = result.recordset;
    arr.sort((currentYear, nextYear) => {
      const currentYearValue = parseInt(
        currentYear.meeting_year.toString().replace('YTD', '')
      );
      const nextYearValue = parseInt(
        nextYear.meeting_year.toString().replace('YTD', '')
      );
      return currentYearValue - nextYearValue;
    });
    arr.forEach((obj) => {
      general.RenameKey(obj, 'prop_num', 'Proposals');
      general.RenameKey(obj, 'for_pcent', 'Support');
      general.RenameKey(obj, 'iss_votes', 'ISS* For');
      general.RenameKey(obj, 'gl_votes', 'GL For');
    });

    const myJson = [];
    arr.forEach((e) => {
      myJson.push({
        ...e,
        Proposals: Number(e.Proposals),
        pop_num: e.Proposals,
        Support: e.Support !== null ? Number(e.Support).toFixed(2) : null,
        'ISS* For':
          e['ISS* For'] !== null ? Number(e['ISS* For']).toFixed(2) : null,
        'GL For': e['GL For'] !== null ? Number(e['GL For']).toFixed(2) : null,
      });
    });
    res.json({ data: myJson.length > 0 ? myJson : [] });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ResolutionTrackerHistoricalTrendsChartDataYTD`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function ResolutionFilterByTotalVotesAnalysisYTD(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const result = await pool
      .request()
      .input('proposal_type_id', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTopLevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalSubLavel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      // .input('management_recc', sql.VarChar, req.body.management_recc)
      // .input('outcome', sql.VarChar, req.body.outcome)
      .execute(
        'proxy_insight..Resolution_filter_by_total_votes_analysis_YTD_InsightIa'
      );

    const myResult = await analysisTable_ResolutionTracker(result);
    res.json({ data: myResult });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ResolutionFilterByTotalVotesAnalysisYTD`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// ProxySeason
async function ResolutionTrackerHistoricalTrendsChartProxySeasonData(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const productStatus = await general.TokenDecodeForProductStatus(
      req.body.token,
      req.body.product_id
    );
    const result = await pool
      .request()
      .input('proposal_type_id', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTopLevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalSubLavel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('status', sql.Int, productStatus)
      .execute(
        'proxy_insight..WebToolsV_ResolutionTracker_HistoricalTrends_ProxySeasonData'
      );

    const arr = result.recordset;
    arr.sort((currentYear, nextYear) => {
      const currentYearValue = parseInt(
        currentYear.meeting_year.toString().replace('YTD', '')
      );
      const nextYearValue = parseInt(
        nextYear.meeting_year.toString().replace('YTD', '')
      );
      return currentYearValue - nextYearValue;
    });
    arr.forEach((obj) => {
      general.RenameKey(obj, 'prop_num', 'Proposals');
      general.RenameKey(obj, 'for_pcent', 'Support');
      general.RenameKey(obj, 'iss_votes', 'ISS* For');
      general.RenameKey(obj, 'gl_votes', 'GL For');
    });

    const myJson = [];
    arr.forEach((e) => {
      myJson.push({
        ...e,
        Proposals: Number(e.Proposals),
        pop_num: e.Proposals,
        Support: e.Support !== null ? Number(e.Support).toFixed(2) : null,
        'ISS* For':
          e['ISS* For'] !== null ? Number(e['ISS* For']).toFixed(2) : null,
        'GL For': e['GL For'] !== null ? Number(e['GL For']).toFixed(2) : null,
      });
    });
    res.json({ data: myJson.length > 0 ? myJson : [] });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ResolutionTrackerHistoricalTrendsChartProxySeasonData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function ResolutionFilterByTotalProxySeasonVotesAnalysis(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const result = await pool
      .request()
      .input('proposal_type_id', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTopLevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalSubLavel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .execute(
        'proxy_insight..WebToolsV_ResolutionTracker_HistoricalTrends_ProxySeasonAnalysisData'
      );

    const myResult = await analysisTable_ResolutionTracker(result);
    res.json({ data: myResult });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/ResolutionFilterByTotalProxySeasonVotesAnalysis`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
//#endregion

function UpdateResolutionTrackerSummaryText(text) {
  switch (text) {
    case '5 result pass':
      return 'Pass*';
    case '6 result fail':
      return 'Fail*';
    case '4 result exists':
      return 'Resolutions with vote results';
    case '2 resolution withdrawn':
      return 'Resolutions Withdrawn';
    case '1 resolution voted on':
      return 'Resolutions that went to a vote';
    case '3 resolution pending':
      return 'Vote Results not disclosed/pending';
    case '7 Recommend ISS against':
      return 'ISS AGAINST';
    case '8 Recommend GL against':
      return 'Glass Lewis AGAINST';
    default:
      break;
  }
}
function UpdateResolutionTrackerDetailsText(text) {
  switch (text) {
    case '3 Average abstain':
      return 'Average % Abstain';
    case '2 Average against':
      return 'Average % Against';
    case '1 Average for':
      return 'Average % For';
    case '4 Less than 95% Support':
      return 'Less than 95% Support';
    case '5 Less than 80% Support':
      return 'Less than 80% Support';
    case '6 Less than 70% Support':
      return 'Less than 70% Support';
    case '7 Less than 50% Support':
      return 'Less than 50% Support';
    case '8 Less than 30% Support':
      return 'Less than 30% Support';
    case '9 Less than 3% Support':
      return 'Less than 3% Support';
    default:
      break;
  }
}
async function ResolutionTrackerFilterByHistoricalTrends(req, res) {
  try {
    const pool = await poolPromiseTimeout;
    const result = await pool
      .request()
      .input('proposal_type_id', sql.Int, req.body.ProposalType)
      .input('proposal_top_level', sql.Int, req.body.ProposalTopLevel)
      .input('proposal_sub_level', sql.Int, req.body.ProposalSubLavel)
      .input('meeting_type', sql.VarChar, req.body.MeetingType)
      .input('proponent', sql.VarChar, req.body.Proponent)
      .input('proposal_sponsor', sql.Int, req.body.ProposalSponsor)
      .input('company_search_id', sql.Int, req.body.CopampanySearchId)
      .input('management_recc', sql.Int, req.body.management_recc)
      .input('outcome', sql.Int, req.body.outcome)
      // .input('status', sql.Int, req.body.status)
      // .input('resultset', sql.Int, req.body.resultset)
      // .input('debug', sql.Int, req.body.debug)
      .execute(
        'proxy_insight..WebToolsV_ResolutionTracker_HistoricalTrends'
      );

    const YTDAnalysis = await analysisTable_ResolutionTracker({ recordsets: [result.recordsets[0], result.recordsets[1]] });
    const CurrentYear = result.recordsets[2];
    const YTDGraph = await formatGraphData(result.recordsets[3], true);
    const FinancialAnalysis = await analysisTable_ResolutionTracker({ recordsets: [result.recordsets[4], result.recordsets[5]] });
    const FinancialGraph = await formatGraphData(result.recordsets[6], false);
    const ProxySeasonAnalysis = await analysisTable_ResolutionTracker({ recordsets: [result.recordsets[7], result.recordsets[8]] });
    const ProxySeasonGraph = await formatGraphData(result.recordsets[9], true);

    res.json({ CurrentYear, YTDAnalysis, YTDGraph, FinancialAnalysis, FinancialGraph, ProxySeasonAnalysis, ProxySeasonGraph });
  } catch (error) {
    general.ErrorLog(
      `${toolsRoute}/WebToolsV_ResolutionTracker_HistoricalTrends`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

function formatGraphData(result, isYTDorProxy) {
  const arr = result;
  arr.sort((currentYear, nextYear) => {
    const currentYearValue = parseInt(
      currentYear.meeting_year.toString().replace('YTD', '')
    );
    const nextYearValue = parseInt(
      nextYear.meeting_year.toString().replace('YTD', '')
    );
    return currentYearValue - nextYearValue;
  });
  arr.forEach((obj) => {
    general.RenameKey(obj, 'prop_num', 'Proposals');
    general.RenameKey(obj, 'for_pcent', 'Support');
    general.RenameKey(obj, 'iss_votes', 'ISS* For');
    general.RenameKey(obj, 'gl_votes', 'GL For');
  });

  if (isYTDorProxy) {
      const myJson = [];
      arr.forEach((e) => {
      myJson.push({
          ...e,
          Proposals: Number(e.Proposals),
          pop_num: e.Proposals,
          Support: e.Support !== null ? Number(e.Support).toFixed(2) : null,
          'ISS* For':
          e['ISS* For'] !== null ? Number(e['ISS* For']).toFixed(2) : null,
          'GL For': e['GL For'] !== null ? Number(e['GL For']).toFixed(2) : null,
      });
      });
      return ({ data: myJson.length > 0 ? myJson : [] });
  }

  const myJson = [];
  let data = [];
  if (typeof arr === 'string') {
    data = JSON.parse(arr);
  } else {
    data = arr;
  }
  data.forEach((e, i) => {
    myJson.push({
      ...e,
      meeting_year:
        arr.length - 1 !== i
          ? e.meeting_year.toString().replace('YTD', '')
          : e.meeting_year,
      Proposals: Number(e.Proposals),
      pop_num: e.Proposals,
      Support:
        e.Support !== null ? Number(Number(e.Support).toFixed(2)) : null,
      'ISS* For':
        e['ISS* For'] !== null
          ? Number(Number(e['ISS* For']).toFixed(2))
          : null,
      'GL For':
        e['GL For'] !== null ? Number(Number(e['GL For']).toFixed(2)) : null,
    });
  });

  return ({ data: myJson.length > 0 ? myJson : [] });
}

module.exports = router;
