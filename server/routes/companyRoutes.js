const dateFormat = require('dateformat');
const { json } = require('body-parser');

const express = require('express');
const { arrayAsString } = require('pdf-lib');
const { sql, poolPromise } = require('../config/db');

const router = express.Router();
const { authenticateToken } = require('../utill/authUtil');
const general = require('../utill/general');

const companyroutes = 'company-Route';

const { sendMail } = require('../utill/sendmailUtil');
const { DemoRequestMail } = require('../utill/mailTemplate');
// const { VarChar } = require("mssql");
const upComingDummyData = require('../config/SampleData/Upcoming_director_dummy_data.json');

router.post('/search', authenticateToken, GetSearchResult);
router.post('/GetCompanyProfile', authenticateToken, GetCompanyProfile);
router.post('/ListTopTwentyActivistActivity', authenticateToken, GetListTopTwentyActivistActivity);
// Overview
router.post('/GetCompanyOverviewProfile', authenticateToken, GetCompanyOverviewProfile);
router.post('/GetCompanyStockEvents', authenticateToken, GetCompanyStockEvents);
router.post('/GetCompanyPeerGroupOverview', authenticateToken, GetCompanyPeerGroupOverview);
router.post('/GetPeerGroupName', authenticateToken, GetPeerGroupName);
router.post('/GetLollipops_graph', authenticateToken, GetLollipops_graph);
router.post('/GetStockValues_graph', authenticateToken, GetStockValues_graph);

// Activist Filing
router.post('/ListCompanyFilingsByActivist_v2', authenticateToken, ListCompanyFilingsByActivist_v2);
router.post('/GetActivismOverviewGraphs', authenticateToken, GetActivismOverviewGraphs);

// NSW-I24
router.post('/ListActivistInvestorsForCompany_NEW_ais', authenticateToken, ListActivistInvestorsForCompany_NEW_ais);
router.post('/GetAiSCompDisclosedShortPositions', authenticateToken, GetAiSCompDisclosedShortPositions);
router.post('/Adm_Check_PID', authenticateToken, Adm_Check_PID);
router.post('/GetAiSCompTotalShortPositions', authenticateToken, GetAiSCompTotalShortPositions);
router.post('/GetHistoricShortPositions', authenticateToken, GetHistoricShortPositions);
router.post('/GetFDAProductRecallListData', authenticateToken, GetFDAProductRecallListData);

// NSW-I25
router.post('/ListActivistInvestorsForCompanyAiS', authenticateToken, ListActivistInvestorsForCompanyAiS);
router.post('/GetCampaignReturnsByCompanyAIS', authenticateToken, GetCampaignReturnsByCompanyAIS);
router.post('/getAiSDetails', authenticateToken, getAiSDetails);
router.post('/CompanyAllegationsTabAiS', authenticateToken, CompanyAllegationsTabAiS);
router.post('/GetFollowerReturnsByCompanyAIS', authenticateToken, GetFollowerReturnsByCompanyAIS);
router.post('/ListCompanyFilingsByActivist_V2_ais', authenticateToken, ListCompanyFilingsByActivist_V2_ais);
router.post('/GetActivismSummary_AiS', authenticateToken, GetActivismSummary_AiS);
router.post('/ListCompanyNewsByActivistAiS', authenticateToken, ListCompanyNewsByActivistAiS);
router.post('/LatestActivistDemands', authenticateToken, GetLatestActivistDemands);
router.post('/ListTimeLines', authenticateToken, GetListTop8TimeLine);
router.post('/ActiveActivists_Trends_Overview', authenticateToken, GetActiveActivists_Trends_Overview);
router.post('/CompaniesTargeted_Trends_Overview', authenticateToken, GetCompaniesTargeted_Trends_Overview);
router.post('/getIssuerLatestMeetingId', authenticateToken, getIssuerLatestMeetingId);
router.post('/GetIssuerProfile', authenticateToken, GetIssuerProfile);
router.post('/ListMeetingDates', authenticateToken, ListMeetingDates);
router.post('/GetIssuer_Meeting_stats', authenticateToken, GetIssuer_Meeting_stats);
router.post('/GetMeetingType_id', authenticateToken, GetMeetingType_id);
router.post('/MeetingQuickViewDynamicPivotv4', authenticateToken, MeetingQuickViewDynamicPivotv4);
router.post('/GetVoteResults_v3', authenticateToken, GetVoteResults_v3);
router.post('/GetVotingData_allvotes_v2', authenticateToken, GetVotingData_allvotes_v2);
router.post('/GetVotingData_rationale_meeting_against', authenticateToken, GetVotingData_rationale_meeting_against);
router.post('/ListIssuerVotesAgainst', authenticateToken, ListIssuerVotesAgainst);
router.post('/GetVotingData_rationale_meeting', authenticateToken, GetVotingData_rationale_meeting);

// AIG

// AiG Shareholder Proposals
router.post('/GetAIG_ShareholderProposals_v2', authenticateToken, GetAIG_ShareholderProposals_v2);

// AiG Latest Filings
router.post('/GetGovCompanyDirector503', authenticateToken, GetGovCompanyDirector503);
router.post('/GetCompanyDirector502_v2', authenticateToken, GetCompanyDirector502_v2);
router.post('/GetCompanyDirector507_v2', authenticateToken, GetCompanyDirector507_v2);
router.post('/GetCompanyDirectorshort_v2', authenticateToken, GetCompanyDirectorshort_v2);
router.post('/GetCompanyDirector10k_v2', authenticateToken, GetCompanyDirector10k_v2);

// AiG Company Directors
router.post('/GetGovDirectorInfo', authenticateToken, GetGovDirectorInfo);
router.post('/Get_Gov_Independent_Graph_Data', authenticateToken, Get_Gov_Independent_Graph_Data);
router.post('/Get_Gov_Tenure_Graph_Data', authenticateToken, Get_Gov_Tenure_Graph_Data);
router.post('/Get_Gov_Gender_Graph_Data', authenticateToken, Get_Gov_Gender_Graph_Data);
router.post('/GetComDirProf', authenticateToken, GetComDirProf);
router.post('/GetComDirProfPast', authenticateToken, GetComDirProfPast);
router.post('/GetBoardNewsHeadlines', authenticateToken, GetBoardNewsHeadlines);
router.post('/Get_interlocking_directors_JSON_v2', authenticateToken, Get_interlocking_directors_JSON_v2);
router.post('/GetComDirProfPastHeaderCol', authenticateToken, GetComDirProfPastHeaderCol);
router.post('/GetComDirUpcoming', authenticateToken, GetComDirUpcoming);

// AiG Poison Pill
router.post('/GetDetPoisonPill', authenticateToken, GetDetPoisonPill);
router.post('/GetItem303Material', authenticateToken, GetItem303Material);
router.post('/GetDetPoisonPillTopHdr', authenticateToken, GetDetPoisonPillTopHdr);

// AiG Bylaws
router.post('/GetCompanyDirector503', authenticateToken, GetCompanyDirector503);
router.post('/Get_Bylaws_Charter_GovGuidelines_Data', authenticateToken, Get_Bylaws_Charter_GovGuidelines_Data);

// AiG Complience
router.post('/GetCompFillingType', authenticateToken, GetCompFillingType);
router.post('/GetCompStatement', authenticateToken, GetCompStatement);
router.post('/GetComplianceComparisonIndexes', authenticateToken, GetComplianceComparisonIndexes);
router.post('/GetComplianceVotinDissent', authenticateToken, GetComplianceVotinDissent);
router.post('/GetSelectedProposalsCountry', authenticateToken, GetSelectedProposalsCountry);

//AiG
router.post('/GetHistoricalGovernance', authenticateToken, GetHistoricalGovernance);

// AIV
router.post('/VunList10QAnd10KForIssuer', authenticateToken, VunList10QAnd10KForIssuer);
router.post('/VunGetGovDirectorInfoV4', authenticateToken, VunGetGovDirectorInfoV4);
router.post('/PIGetShareholdersTop10', authenticateToken, PIGetShareholdersTop10);
router.post('/GetShareHoldersActivistOnly', authenticateToken, GetShareHoldersActivistOnly);
router.post('/GetActivismSummary', authenticateToken, GetActivismSummary);
router.post('/GetVunGetAllInstitutionalMediansAndMADMs', authenticateToken, GetVunGetAllInstitutionalMediansAndMADMs);
router.post('/GetVunGetAllActivistMediansAndMADMs', authenticateToken, GetVunGetAllActivistMediansAndMADMs);
router.post('/PIGetIssuer', authenticateToken, PIGetIssuer);
router.post('/PIGetMostRecentAGMOrPCMeetingIdWithVotes', authenticateToken, PIGetMostRecentAGMOrPCMeetingIdWithVotes);
router.post('/PIGetVoteResults', authenticateToken, PIGetVoteResults);
router.post('/VunGetAllRemunerationMediansAndMADMs', authenticateToken, VunGetAllRemunerationMediansAndMADMs);
router.post('/VunGetAllDirectorMediansAndMADMs', authenticateToken, VunGetAllDirectorMediansAndMADMs);
router.post(
  '/VunGetAllRemunerationMediansAndMADMsYearAroundDate',
  authenticateToken,
  VunGetAllRemunerationMediansAndMADMsYearAroundDate
);
router.post('/VunListNewsArticlesForIssuer', authenticateToken, VunListNewsArticlesForIssuer);
router.post('/VunSummaryScore', authenticateToken, VunSummaryScore);

// AiV Charts
router.post('/GetVulnerabilityScoreOverTime', authenticateToken, GetVulnerabilityScoreOverTime);
router.post('/GetVulnerabilityPrankOverTime', authenticateToken, GetVulnerabilityPrankOverTime);

// Voting
router.post('/ListVotingOwnershipForProposal_v2', authenticateToken, ListVotingOwnershipForProposal_v2);
router.post('/GetShareholder_Proposal_Details_VotingOverview', authenticateToken, GetShareholder_Proposal_Details_VotingOverview);
router.post('/Get_OtherBoards', authenticateToken, Get_OtherBoards);
router.post('/GetVotingData_rationale', authenticateToken, GetVotingData_rationale);
router.post(
  '/ListVotingAndOwnerhipForProposal_insightia',
  authenticateToken,
  ListVotingAndOwnerhipForProposal_insightia
);
router.post('/getMeetingURLs', authenticateToken, getMeetingURLs);
// router.post('/GetSelectedProposalsCountry', authenticateToken, GetSelectedProposalsCountry);
router.post('/BindgvVotingGrid', authenticateToken, BindgvVotingGrid);
router.post('/GetShareClasses', authenticateToken, GetShareClasses);
// Ownership
router.post('/getLatestOwnershipDateList', authenticateToken, getLatestOwnershipDateList);
router.post('/getOwnershipLongInvestorData', authenticateToken, getOwnershipLongInvestorData);
router.post('/getOwnershipLongFundData', authenticateToken, getOwnershipLongFundData);
router.post('/getOwnershipShortInvestorData', authenticateToken, getOwnershipShortInvestorData);
router.post('/getOwnershipShortFundData', authenticateToken, getOwnershipShortFundData);
router.post('/getOwnershipLongShortInvestorDataCheck', authenticateToken, getOwnershipLongShortInvestorDataCheck);

router.post('/GetNoActionTrackInfo', authenticateToken, GetNoActionTrackInfo);
router.post('/noActionLettersDataExists', authenticateToken, noActionLettersDataExists);
router.post('/GetNoActionLetterProposalDetail', authenticateToken, GetNoActionLetterProposalDetail);

router.post('/getActivistCampaignsDataList', authenticateToken, getActivistCampaignsDataList);
router.post('/getActivistCampaignsDataListV2', authenticateToken, getActivistCampaignsDataListV2);

// Activist Investment
router.post('/getActivistInvestorsForCompany', authenticateToken, getActivistInvestorsForCompany);
router.post('/getActivistNotifiedHolding', authenticateToken, getActivistNotifiedHolding);
router.post('/getActivistCampaignsDDL', authenticateToken, getActivistCampaignsDDL);
router.post('/getActivistShorSubModuleAccess', authenticateToken, getActivistShortSubModuleAccess);

//Trial User
router.post('/addTrialPageLog', authenticateToken, addTrialPageLog);
router.post('/sendMailToTeam', authenticateToken, sendMailToTeam);
router.post('/GetActivistShortCampaignAdvisersData', authenticateToken, GetActivistShortCampaignAdvisersData);
router.post('/GetInvestorIdFromCampaignId', authenticateToken, GetInvestorIdFromCampaignId);
router.post('/GetPeerGroupDefaultName', authenticateToken, GetPeerGroupDefaultName);
router.post('/UpdateCompanyVunScore', authenticateToken, UpdateCompanyVunScore);
// UpdateCompanyVunScore
router.post('/GetAdmGetCompanyShell_spac', authenticateToken, GetAdmGetCompanyShell_spac);
router.post('/GetSplitVotingDetails', authenticateToken, GetSplitVotingDetails);

//Activism access
router.post('/GetCompanyActivisamTabDataCheck', authenticateToken, GetCompanyActivisamTabDataCheck);
router.post('/GetCompensationPerformanceMetricBreakDown', authenticateToken, GetCompensationPerformanceMetricBreakDown);
router.post('/GetCompensationExecutivePayData', authenticateToken, GetCompensationExecutivePayData);
router.post('/GetCompensationOverviewSummaryDetails', authenticateToken, GetCompensationOverviewSummaryDetails);
router.post('/GetCompensationOverviewExecutiveAndDirectorDetails', authenticateToken, GetCompensationOverviewExecutiveAndDirectorDetails);
router.post('/GetCompensatioCompanyolicyDetailsHighestPaidExecutive', authenticateToken, GetCompensatioCompanyolicyDetailsHighestPaidExecutive);
router.post('/GetCompensationPolicyDetails', authenticateToken, GetCompensationPolicyDetails);
router.post('/GetCompensationPolicyHighestPaidExecutiveData', authenticateToken, GetCompensationPolicyHighestPaidExecutiveData);
router.post('/GetCompensationNonExecutivePay', authenticateToken, GetCompensationNonExecutivePay);
router.post('/GetCompensationHighestPaidExe', authenticateToken, GetCompensationHighestPaidExe);
router.post('/GetCompensationReportYears', authenticateToken, GetCompensationReportYears);

//Activism access
router.post('/GetCompanyActivisamTabDataCheck', authenticateToken, GetCompanyActivisamTabDataCheck)

async function GetShareClasses(req, res, next) {
  try {
    const pool = await poolPromise;
    const { pid } = req.body;
    const result = await pool.request().input('pid', sql.Int, pid).execute('GetShareClasses');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetShareClasses`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function BindgvVotingGrid(req, res, next) {
  try {
    const pool = await poolPromise;
    let arrPolicyCheckerCustom = [];
    const myJson = [];
    let myJsonHeading = [];
    const resultPolicyCheckerCustom = await pool
      .request()
      .input('investor_search_id', sql.Int, req.body.investor_search_id)
      .input('meeting_id', sql.Int, req.body.meetingId)
      .input('proposal_type_id', sql.Int, req.body.proposal_type_id)
      .execute('proxy_insight.dbo.PolicyCheckerCustom_insightia');
    arrPolicyCheckerCustom = resultPolicyCheckerCustom.recordset;

    // Heading
    myJsonHeading = {
      heading: [
        {
          Rank: 'Rank',
          investor_profile_name: 'Investor',
          Policy: 'Policy',
          shares: 'Shares',
          AveragePCent: 'For (%)',
          synth_iss_pcent: 'ISS Match (%)',
          synth_gl_pcent: 'GL Match (%)',
          synth_iss_pcent_against: 'ISS Against Match (%)',
          synth_gl_pcent_against: 'GL Against Match (%)',
          shares_perc: 'Shares (%)',
          shares_voted: 'Shares Voted (%)',
        },
      ],
    };

    if (arrPolicyCheckerCustom.length > 0) {
      function preventNullOrUndefinedFn(obj) {
        if (obj !== null && obj !== undefined) {
          return obj;
        }
        return '';
      }
      function NumberFormat(objNumber) {
        if (objNumber !== null && objNumber !== undefined) {
          const nf = new Intl.NumberFormat();
          return nf.format(Math.round(objNumber));
        }
        return '';
      }

      // Data
      arrPolicyCheckerCustom.forEach((obj) => {
        myJson.push({
          Rank: preventNullOrUndefinedFn(obj.Rank),
          investor_profile_name: preventNullOrUndefinedFn(obj.investor_profile_name),
          Policy: preventNullOrUndefinedFn(obj.Policy),
          shares: preventNullOrUndefinedFn(obj.shares) !== '' ? NumberFormat(obj.shares) : '',
          AveragePCent: preventNullOrUndefinedFn(obj.AveragePCent) !== '' ? obj.AveragePCent.toFixed(1) : '',
          synth_iss_pcent: preventNullOrUndefinedFn(obj.synth_iss_pcent) !== '' ? obj.synth_iss_pcent.toFixed(1) : '',
          synth_gl_pcent: preventNullOrUndefinedFn(obj.synth_gl_pcent) !== '' ? obj.synth_gl_pcent.toFixed(1) : '',
          synth_iss_pcent_against:
            preventNullOrUndefinedFn(obj.synth_iss_pcent_against) !== '' ? obj.synth_iss_pcent_against.toFixed(1) : '',
          synth_gl_pcent_against:
            preventNullOrUndefinedFn(obj.synth_gl_pcent_against) !== '' ? obj.synth_gl_pcent_against.toFixed(1) : '',
          plDown: preventNullOrUndefinedFn(obj.plDown),
          resolution_text: preventNullOrUndefinedFn(obj.resolution_text),
          shares_perc: preventNullOrUndefinedFn(obj.shares_perc) !== '' ? obj.shares_perc.toFixed(1) : '',
          shares_voted: preventNullOrUndefinedFn(obj.shares_voted) !== '' ? obj.shares_voted.toFixed(1) : '',
          investor_Id: obj.investor_Id,
        });
      });

      res.json({ data: myJson, heading: myJsonHeading.heading[0] });
    } else {
      res.json({
        data: [{ Rank: '', investor_profile_name: 'No Data Available' }],
        heading: myJsonHeading.heading[0],
      });
    }
  } catch (error) {
    general.ErrorLog(`${companyroutes}/BindgvVotingGrid`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// Company Overview
async function GetCompanyOverviewProfile(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('getCompanyOverviewProfile');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompanyOverviewProfile`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCompanyStockEvents(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('getCompanyStockEvents');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetCompanyStockEvents`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetCompanyPeerGroupOverview(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .input('searchid', sql.Int, req.body.cmp_search_id)
      .input('activist_vulnerability', sql.Int, req.body.activist_vulnerability)
      .execute('GetCompanyQuickSearch_PeerGroup_insightia');

    const perChunk = 10;
    const Finalresult = result.recordset.reduce((resultArray, data, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(data);

      return resultArray;
    }, []);

    // res.json({ data: result.recordset });
    res.json({ data: Finalresult, originalData: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompanyPeerGroupOverview`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetPeerGroupName(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('GetPeerGroupName');

    res.json({ data: result.recordset.length > 0 ? result.recordset[0].peer_group_name : '' });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetPeerGroupName`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetSelectedProposalsCountry(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.GetSelectedProposalsCountry');
    const arr = result.recordset;
    const myJson = [];
    arr.forEach((obj) => {
      myJson.push({ label: obj.proposal_type, value: obj.proposal_type_id });
    });
    res.json({ data: myJson });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetSelectedProposalsCountry`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getIssuerLatestMeetingId(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('getIssuerLatestMeetingId');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getIssuerLatestMeetingId`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCompaniesTargeted_Trends_Overview(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.userid)
      .input('shortlong', sql.VarChar, 'L')
      .input('public', sql.VarChar, 'p')
      .execute('CompaniesTargeted_Trends_Overview');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompaniesTargeted_Trends_Overview`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActiveActivists_Trends_Overview(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.userid)
      .input('shortlong', sql.VarChar, 'L')
      .input('public', sql.VarChar, 'p')
      .execute('ActiveActivists_Trends_Overview');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetActiveActivists_Trends_Overview`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetListTop8TimeLine(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('user_id', sql.Int, req.body.userid).execute('ListTop8TimeLine');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetListTop8TimeLine`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetLatestActivistDemands(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('user_id', sql.Int, req.body.userid).execute('latestActivistDemandsv2');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetLatestActivistDemands`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetListTopTwentyActivistActivity(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('ListTopTwentyActivistActivity');
    const myJson = [];
    await Promise.all(
      result.recordset.map(async (p) => {
        try {
          const pool = await poolPromise;
          const result1 = await pool
            .request()
            .input('activist_id', sql.Int, p.activist_id)
            .input('company_id', sql.Int, p.company_id)
            .input('seq_id', sql.Int, p.seq_id)
            .execute('GetPrevious13D');
          if (result1.recordset.length !== 0) {
            myJson.push({ ...p, Previous13D: result1.recordset[0].pcent_held });
          } else {
            myJson.push({ ...p, Previous13D: null });
          }
        } catch (err) {
          throw err;
        }
      })
    );
    res.json({ data: myJson });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetListTopTwentyActivistActivity`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// Avtivism overview
async function GetActivismOverviewGraphs(req, res, next) {
  try {
    const DemandArr = [
      'Appoint Personnel',
      'Remove Personnel',
      'Push For M&A',
      'Oppose M&A',
      'Divestiture',
      'Operational',
      'Return Cash to Shareholders',
      'Capital Structure',
      'Remuneration',
      'Environmental',
      'Social',
      'Governance',
    ];
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('GetCompanyActivismOverviewGraphsData');
    const lstActivismTypeGraphsData = [];
    const lstActivismFocusGraphsData = [];
    const lstActivismLocationGraphsData = [];
    const lstActivismSizeGraphsData = [];
    const lstActivismPublicDemandGraphsData = [];
    result.recordsets[0].forEach((items) => {
      lstActivismTypeGraphsData.push({
        text: items.investor_type_name,
        value: items.number_of_campaigns,
      });
    });
    result.recordsets[1].forEach((items) => {
      lstActivismFocusGraphsData.push({
        text: items.focused_type,
        value: items.number_of_campaigns,
      });
    });
    result.recordsets[2].forEach((items) => {
      lstActivismLocationGraphsData.push({
        text: items.Country_name,
        value: items.number_of_campaigns,
      });
    });
    result.recordsets[3].forEach((items) => {
      lstActivismSizeGraphsData.push({
        text: items.aum_groups,
        value: items.number_of_campaigns,
      });
    });
    if (result.recordsets[4].length > 0) {
      DemandArr.forEach((a) => {
        let flag = 0;
        result.recordsets[4].forEach((items) => {
          if (items.activism_group_name === a) {
            lstActivismPublicDemandGraphsData.push({
              label: items.activism_group_name,
              value: items.number_of_campaigns,
            });
            flag = 1;
          }
        });
        if (flag === 0) {
          lstActivismPublicDemandGraphsData.push({
            label: a,
            value: 0,
          });
        }
      });
    }
    res.json({
      lstActivismType: lstActivismTypeGraphsData,
      lstActivismFocus: lstActivismFocusGraphsData,
      lstActivismLocation: lstActivismLocationGraphsData,
      lstActivismSize: lstActivismSizeGraphsData,
      lstActivismPublicDemand: lstActivismPublicDemandGraphsData,
    });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetActivismOverviewGraphs`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// SHORT OVERVIEW: Gets short postions and adds historic positions for current short campains
async function GetAiSCompDisclosedShortPositions(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.body.pid)
      .execute('GetAiSCompDisclosedShortPositions');
    const newResult = [];
    // await all async functions to complete, then for each(map) investor for historic positions
    await Promise.all(
      result.recordset.map(async (r) => {
        const getHistory = await GetHistoricPositions_v2({
          pid: req.body.pid,
          Investor_Name: r.Investor,
        });
        // Join tables in new array
        newResult.push({ ...r, historicPositions: getHistory });
      })
    );
    // for (const r of  result.recordset) {
    //   const getHistory = await GetHistoricPositions_v2({
    //     pid: req.body.pid,
    //     Investor_Name: r.Investor,
    //   });
    //   // Join tables in new array
    //   newResult.push({ ...r, historicPositions: getHistory });
    // }

    res.json({ data: newResult });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetAiSCompDisclosedShortPositions`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

//  FILING: Get filing activists and then return the activist list
async function ListCompanyFilingsByActivist_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.company_id)
      .input('activist_id', sql.Int, req.body.activist_id)
      .input('LongShort', sql.Char, req.body.longShort) // always B(oth) for filings
      .execute('ListCompanyFilingsByActivist_v3');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/ListCompanyFilingsByActivist_v2`);
  }
}

// ACTIVIST SHORT OVERVIEW: Gets short postions and adds historic positions for historic short campains
async function GetHistoricShortPositions(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('gethistoricshortpositions');
    const newResult = [];
    // await all async functions to complete, then for each(map) investor for historic positions
    // for (const r of result.recordset) {
    //   const getHistory = await GetHistoricPositions_v2({
    //     pid: req.body.pid,
    //     Investor_Name: r.Investor,
    //   });
    //   // Join tables in new array
    //   newResult.push({ ...r, historicPositions: getHistory });
    // }
    await Promise.all(
      result.recordset.map(async (r) => {
        const getHistory = await GetHistoricPositions_v2({
          pid: req.body.pid,
          Investor_Name: r.Investor,
        });
        // Join tables in new array
        newResult.push({ ...r, historicPositions: getHistory });
      })
    );
    res.json({ data: newResult });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetHistoricShortPositions`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// ACTIVIST SHORT OVERVIEW:gets the hisoric postions for a companys pid by the investor name.
// Used in conjunction with short positons to build a company profile
async function GetHistoricPositions_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.pid)
      .input('Investor_Name', sql.VarChar, req.Investor_Name)
      .execute('GetHistoricPositions_v2');
    return result.recordset;
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetHistoricPositions_v2`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// ACTIVIST SHORT OVERVIEW: Gets the current list of activist investors from company id
async function ListActivistInvestorsForCompany_NEW_ais(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.company_id)
      .execute('ListActivistInvestorsForCompany_NEW_ais');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/ListActivistInvestorsForCompany_NEW_ais`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// ACTIVIST SHORT OVERVIEW gets the history of all the held short positions
// GetAiSCompTotalShortPositions stored procedure due to be replaced with less empty spaces
async function GetAiSCompTotalShortPositions(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetAiSCompTotalShortPositions');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetAiSCompTotalShortPositions`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// ACTIVIST SHORT OVERVIEW: Gets the list from companyId.
async function GetFDAProductRecallListData(req, res, next) {
  try {
    const pool = await poolPromise;

    // const getCompanyId = await pool.request().input('pid', sql.Int, req.body.pid).execute('getCompanyId');
    // const CompanyId =
    //   getCompanyId.recordset !== undefined && getCompanyId.recordset !== null
    //     ? getCompanyId.recordset.length > 0
    //       ? getCompanyId.recordset[0].company_id.toString()
    //       : null
    //     : null;

    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.companyId)
      .execute('WebCompAS_Overview_FDAProductRecall');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetFDAProductRecallListData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// GENERAL/ACTIVIST SHORT OVERVIEW: Gets the CompanyID from the PID
async function Adm_Check_PID(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('Adm_Check_PID');
    res.json(result.recordset.length > 0 ? result.recordset[0] : []);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/Adm_Check_PID`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// ACTIVIST SHORT CAMPAIGNS

async function getAiSDetails(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('campaign_id', sql.Int, req.campaign_id).execute('getAiSDetails');
    return result.recordset;
  } catch (error) {
    general.ErrorLog(`${companyroutes}/getAiSDetails`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetCampaignReturnsByCompanyAIS(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('campaign_id', sql.Int, req.campaign_id)
      .execute('GetCampaignReturnsByCompanyAIS');
    return result.recordset;
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCampaignReturnsByCompanyAIS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetFollowerReturnsByCompanyAIS(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('campaign_id', sql.Int, req.campaign_id)
      .execute('GetFollowerReturnsByCompanyAIS');
    return result.recordset;
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetFollowerReturnsByCompanyAIS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ListCompanyFilingsByActivist_V2_ais(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.company_id)
      .input('activist_id', sql.Int, req.activist_id)
      .execute('ListCompanyFilingsByActivist_V3_ais');
    return result.recordset;
  } catch (error) {
    general.ErrorLog(
    `${companyroutes}/ListCompanyFilingsByActivist_V2_ais`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ListCompanyNewsByActivistAiS(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.company_id)
      .input('activist_id', sql.Int, req.activist_id)
      .execute('ListCompanyNewsByActivistAiS');
    return result.recordset;
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/ListCompanyNewsByActivistAiS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ListActivistInvestorsForCompanyAiS(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.company_id)
      .execute('ListActivistInvestorsForCompany_NEW_ais');
    const newResult = [];
    // await all async functions to complete, then for each(map) investor for historic positions

    await Promise.all(
      result.recordset.map(async (r) => {
        const campaignCompanyReturns = await GetCampaignReturnsByCompanyAIS({
          campaign_id: r.campaign_summary_id,
        });

        const campaignDetails = await getAiSDetails({
          campaign_id: r.campaign_summary_id,
        });

        const campaignFollowerReturns = await GetFollowerReturnsByCompanyAIS({
          campaign_id: r.campaign_summary_id,
        });

        const companyFilings = await ListCompanyFilingsByActivist_V2_ais({
          company_id: req.body.company_id,
          activist_id: r.activist_id,
        });

        const companyNews = await ListCompanyNewsByActivistAiS({
          company_id: req.body.company_id,
          activist_id: r.activist_id,
        });
        // Join tables in new array
        newResult.push({
          ...r,
          campaignCompanyReturns,
          campaignFollowerReturns,
          campaignDetails,
          companyFilings,
          companyNews,
        });
      })
    );
    const arr = [];
    newResult.map((x) => {
      arr.push({
        ...x,
        campaignDetails1:
          x.campaignDetails !== null && x.campaignDetails !== undefined && x.campaignDetails.length > 0
            ? x.campaignDetails[0].all_allegations
            : '',
      });
    });
    res.json({ data: arr });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/ListActivistInvestorsForCompanyAiS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function CompanyAllegationsTabAiS(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.company_id)
      .execute('CompanyAllegationsTabAiS');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/CompanyAllegationsTabAiS`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActivismSummary_AiS(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.company_id)
      .execute('GetActivismSummary_AiS');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetActivismSummary_AiS`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// async function GetSearchResult(req, res, next) {
//   const pool = await poolPromise;
//   const result = await pool
//     .request()
//     .input('Comp_name', sql.VarChar, req.body.nameSearch)
//     .input('Chr', sql.VarChar, null)
//     .execute('GetGovQuicksearchCompany_v2');
//   res.json({ data: result.recordset });
// }

// NEW SEARCH UPDATE
async function GetSearchResult(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('search_criteria', sql.VarChar, req.body.nameSearch)
      .input('quicksearch', sql.Int, req.body.quicksearch)
      .execute('GetCompanyQuickSearch_insightia');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetSearchResult`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// AIV

// AIV: GET ISSUER which contains the centralised information for the companies vulnerability
async function PIGetIssuer(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.body.pid)
      .execute('PIGetIssuer');

    const newResult = [];
    // await all async functions to complete, then for each(map) investor for historic positions
    await Promise.all(
      result.recordset.map(async (r) => {
        const getKeyFinancials = await VunListKeyFinancialsForCIK_v2({
          cik_id: r.SEC_ID,
          user: req.user,
          body: req.body,
          headers: req.header
        });

        const getKeyRatios = await VunListKeyRatiosForCIKV2({
          cik_id: r.SEC_ID,
          cmp_search_id: req.body.cmp_search_id,
          user: req.user,
          body: req.body,
          headers: req.header
        });

        const getSharePricePerformance = await AppGetSharePricePerformance({
          symbol: r.symbol,
          user: req.user,
          body: req.body,
          headers: req.header
        });

        const getActivismSummary = await GetActivismSummary({
          company_id: r.company_id,
          user: req.user,
          body: req.body,
          headers: req.header
        });
        const getActivistInvestors = await GetShareHoldersActivistOnly({
          company_id: r.company_id,
          user: req.user,
          body: req.body,
          headers: req.header
        });
        const getEngagement = await GetShareHolderswithActivistTop10_v2({
          company_id: r.company_id,
          user: req.user,
          body: req.body,
          headers: req.header
        });
        const getFundamentalMaxEndDate = await GetFundamentalMaxEndDate({
          cik_id: r.SEC_ID,
          user: req.user,
          body: req.body,
          headers: req.header
        });

        const vunKeyFinancials = getKeyFinancials.key_financials;
        const vunYears = getKeyFinancials.past_years.length > 0 ? getKeyFinancials.past_years[0] : {};
        const vunKeyRatios = getKeyRatios.key_ratios;
        const activistInvestors = getActivistInvestors.activist_investors;
        const activismSummary = getActivismSummary.activism_summary;
        const engagement = getEngagement.engagement;
        const maxEndDate = getFundamentalMaxEndDate.Max_end_date;
        const activistInPlay = r.Campaign_in_play;
        const percentileRank = ((r.prank * 100) / 100);
        const tickerName = r.symbol;

        const vunSPP = [];
        if (
          getSharePricePerformance.share_price_performance.length > 0
        ) {
          if (
            typeof getSharePricePerformance.share_price_performance[0] !== 'undefined'
          ) {
            const newData = { row_heading: 'Current Price' };
            const data = getSharePricePerformance.share_price_performance[0];
            Object.keys(data).forEach((key) => {
              newData[key] = data[key];
            });
            vunSPP.push(newData);
          }
        }

        newResult.push({
          vunKeyFinancials,
          vunYears,
          vunKeyRatios,
          activistInvestors,
          activismSummary,
          engagement,
          maxEndDate,
          activistInPlay,
          percentileRank,
          tickerName,
          vunSPP: vunSPP.length > 0 ? vunSPP[0] : {},
          ...r,
        });
      })
    );
    res.json({ data: newResult[0] });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/PIGetIssuer`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// AIV OWNERSHIP : GET TOP 10 Shareholders
async function PIGetShareholdersTop10(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.VarChar, req.body.pid).execute('PIGetShareholdersTop10_v2');
    res.json({ response: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/PIGetShareholdersTop10`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// Top 10 engagement GetShareHolderswithActivistTop10_v2
async function GetShareHolderswithActivistTop10_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.VarChar, req.company_id)
      .execute('GetShareHolderswithActivistTop10_v2');
    return { engagement: result.recordset };
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetShareHolderswithActivistTop10_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AIV VOTING centralises Voting results
async function PIGetMostRecentAGMOrPCMeetingIdWithVotes(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.VarChar, req.body.pid)
      .execute('PIGetMostRecentAGMOrPCMeetingIdWithVotes');
    const newVotingResult = [];
    // await all async functions to complete, then for each(map) investor for historic positions
    await Promise.all(
      result.recordset.map(async (p) => {
        const getPIVoteResults = await PIGetVoteResultsStaggered({
          meeting_id: p.meeting_id,
          user: req.user,
          headers: req.headers
        });
        const getRemunerationMedian = await VunGetAllRemunerationMediansAndMADMs({
          pid: req.body.pid,
          cmp_search_id: req.body.cmp_search_id,
          user: req.user,
          headers: req.headers
        });
        const getRemunerationOneYearBack = await VunGetAllRemunerationMediansAndMADMsYearAroundDate({
          pid: req.body.pid,
          meeting_date: p.meeting_date,
          cmp_search_id: req.body.cmp_search_id,
          user: req.user,
          headers: req.headers
        });
        const getAllDirectorMedian = await VunGetAllDirectorMediansAndMADMs({
          pid: req.body.pid,
          meeting_date: p.meeting_date,
          cmp_search_id: req.body.cmp_search_id,
          user: req.user,
          headers: req.headers
        });

        const meetingDate = p.meeting_date;
        const recentVotingResults = getPIVoteResults.pivote_results;
        const votingRemuneration = getRemunerationMedian.voting_remuneration_median;
        const votingRemunerationOneYearBack = getRemunerationOneYearBack.voting_one_year_back;
        const directorMedian_DirectorMedian =
          getAllDirectorMedian !== undefined &&
          getAllDirectorMedian.voting_director_median.length > 0
            ? getAllDirectorMedian.voting_director_median
            : [];

            const directorMedian_RemunerationOneYearBack =
            getRemunerationOneYearBack !== undefined &&
            getRemunerationOneYearBack.voting_one_year_back.length > 0
              ? getRemunerationOneYearBack.voting_one_year_back
              : [];

              const directorMedian = [
                ...directorMedian_DirectorMedian,
                ...directorMedian_RemunerationOneYearBack
              ];

        newVotingResult.push({
          ...p,
          meetingDate,
          recentVotingResults,
          votingRemuneration,
          votingRemunerationOneYearBack,
          directorMedian,
        });
      })
    );
    res.json({ data: newVotingResult[0] });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/PIGetMostRecentAGMOrPCMeetingIdWithVotes`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AIV AGM Voting Results
async function PIGetVoteResults(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('meeting_id', sql.VarChar, req.meeting_id).execute('PIGetVoteResults');
    return { pivote_results: result.recordset };
  } catch (error) {
    general.ErrorLog(`${companyroutes}/PIGetVoteResults`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// AIV AGM Voting Results
async function PIGetVoteResultsStaggered(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('meeting_id', sql.VarChar, req.meeting_id).execute('PIGetVoteResultsStaggered');
    return { pivote_results: result.recordset };
  } catch (error) {
    general.ErrorLog(`${companyroutes}/PIGetVoteResultsStaggered`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function VunGetAllDirectorMediansAndMADMs(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.VarChar, req.pid)
      .input('MeetingDate', sql.Date, req.meeting_date)
      .input('searchid', sql.Int, req.cmp_search_id)
      .execute('VunGetAllDirectorMediansAndMADMsYearAroundDate');
    return { voting_director_median: result.recordset };
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/VunGetAllDirectorMediansAndMADMs`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// VOTING AGM RESULTS Remuneration
async function VunGetAllRemunerationMediansAndMADMs(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('pid', sql.Int, req.pid)
    .input('searchid', sql.Int, req.cmp_search_id)
    .execute('VunGetAllRemunerationMediansAndMADMs');
    return { voting_remuneration_median: result.recordset };
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/VunGetAllRemunerationMediansAndMADMs`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// VOTING AGM RESULTS if ONE YEAR BACK VunGetAllRemunerationMediansAndMADMsYearAroundDate
async function VunGetAllRemunerationMediansAndMADMsYearAroundDate(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.pid)
      .input('MeetingDate', sql.Date, req.meeting_date)
      .input('searchid', sql.Int, req.cmp_search_id)
      .execute('VunGetAllRemunerationMediansAndMADMsYearAroundDate');
    return { voting_one_year_back: result.recordset };
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/VunGetAllRemunerationMediansAndMADMsYearAroundDate`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AIV OWNERSHIP: ACTIVIST INVESTORS
async function GetShareHoldersActivistOnly(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.VarChar, req.company_id)
      .execute('GetShareHoldersActivistOnly_v2');
    return { activist_investors: result.recordset };
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetShareHoldersActivistOnly`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AIV OWNERSHIP : ACTIVIST SUMMARY
async function GetActivismSummary(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('company_id', sql.VarChar, req.company_id).execute('GetActivismSummary');
    return { activism_summary: result.recordset };
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetActivismSummary`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
// AIV Top 10 OWNERSHIP MEDIAN FOOTER VunGetAllInstitutionalMediansAndMADMs
async function GetVunGetAllInstitutionalMediansAndMADMs(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.VarChar, req.body.pid)
      .input('searchid', sql.Int, req.body.cmp_search_id)
      .execute('VunGetAllInstitutionalMediansAndMADMs');
    res.json({ response: result.recordset[0] });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetVunGetAllInstitutionalMediansAndMADMs`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVunGetAllActivistMediansAndMADMs(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.VarChar, req.body.pid)
      .input('searchid', sql.Int, req.body.cmp_search_id)
      .execute('VunGetAllActivistMediansAndMADMs');
    res.json({ response: result.recordset[0] });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetVunGetAllActivistMediansAndMADMs`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AIV:gets the key financial reports, as well as the 5 previous years
// Used in conjunction with short positons to build a company profile
async function VunListKeyFinancialsForCIK_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('CIK_id', sql.Int, req.cik_id).execute('VunListKeyFinancialsForCIK_v2');
    return {
      key_financials: result.recordsets[0],
      past_years: result.recordsets[1],
    };
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/VunListKeyFinancialsForCIK_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AIV:gets the key ratios reports
// Used in conjunction with short positons to build a company profile
async function VunListKeyRatiosForCIKV2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('CIK_id', sql.Int, req.cik_id)
      .input('searchid', sql.Int, req.cmp_search_id)
      .execute('VunListKeyRatiosForCIKFilteredV2');
    return { key_ratios: result.recordset };
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/VunListKeyRatiosForCIKV2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetFundamentalMaxEndDate(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('CIK_id', sql.Int, req.cik_id).execute('GetFundamentalMaxEndDate');
    return result.recordset[0];
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetFundamentalMaxEndDate`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
// AIV:gets the Share Price Performance
// Used in conjunction with short positons to build a company profile
async function AppGetSharePricePerformance(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('symbol', sql.VarChar, req.symbol).execute('AppGetSharePricePerformance');
    return { share_price_performance: result.recordset };
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/AppGetSharePricePerformance`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AIV: Get recent filings
async function VunList10QAnd10KForIssuer(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.VarChar, req.body.pid).execute('VunList10QAnd10KForIssuer');

    const aivRecentFilings = [];
    result.recordset.map((x) =>
      aivRecentFilings.push({
        ...x,
        datetime:
          x.datetime !== null || x.datetime !== ''
            ? dateFormat(x.datetime, 'dd-mmm-yy', true)
            : '',
      })
    );
    res.json({ data: aivRecentFilings });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/VunList10QAnd10KForIssuer`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AIV: Get recent Governer Director Info, Default Peer Group
async function VunGetGovDirectorInfoV4(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.VarChar, req.body.pid)
      .input('searchid', sql.Int, req.body.cmp_search_id)
      // V3 for testing only, when new peer group comes in then use v4
      .execute('VunGetGovDirectorInfoV4');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/VunGetGovDirectorInfoV4`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// AIV: Get Vulnerability Report
async function VunListNewsArticlesForIssuer(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('VunListNewsArticlesForIssuer');

    const aivVulnerabilityReport = result.recordset;

    const reportSetter = [];
    const reportIDSetters = [];
    if (aivVulnerabilityReport.length > 0) {
      aivVulnerabilityReport.forEach((report) => {
        reportSetter.push({
          activism_type: null,
          article: report.news_article,
          headLine: report.news_headline,
          img: report.image_filename,
          newsDate: report.news_date !== null ? `${dateFormat(report.news_date, 'dd-mmm-yy', true)}` : '',
          newsid: report.news_id,
          readOnly: false,
          shortArticle: report.news_article.substring(
            0,
            report.news_article.indexOf('[[B]]')
          ),
          visited: 0,
        });
        reportIDSetters.push(report.news_id);
      });
    }
    res.json({ vunReport: reportSetter, vunReportIDs: reportIDSetters });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/VunListNewsArticlesForIssuer`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// END AIV

async function GetCompanyProfile(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetIssuerProfile_bypid');
    if (result.recordset.length > 0) {
      return res.json({
        data: result.recordset[0],
        company_name: result.recordset[0].Company_name,
        company_logo: result.recordset[0].company_logo,
      });
    }
    res.json({ data: result.recordset, company_name: [], company_logo: [] });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetCompanyProfile`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// original getissuerprofile
async function GetIssuerProfile(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.GetIssuerProfile');
    if (result.recordset.length > 0) {
      return res.json({
        data: result.recordset[0],
        meeting_id: req.body.meeting_id,
        pid: result.recordset[0].PID,
        company_name: result.recordset[0].Company_name,
      });
    }
    res.json({
      data: result.recordset,
      meeting_id: '',
      pid: '',
      company_name: [],
    });
    // res.json({ data: result.recordset, meeting_id: req.body.meeting_id });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetIssuerProfile`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function ListMeetingDates(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.ListMeetingDates');
    const arr = result.recordset;
    const myJson = [];
    arr.forEach((obj) => {
      myJson.push({ label: obj.meeting_date_list, value: obj.meeting_id });
    });
    res.json({ data: myJson });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/ListMeetingDates`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// AiG: Governance

// AiG: Shareholder Proposals
async function GetAIG_ShareholderProposals_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetAIG_ShareholderProposals_v2');
    const newResult = [];
    await Promise.all(
      result.recordset.map(async (r) => {
        const proponents = await GetAIG_Proponents({
          proposal_id: r.proposal_id,
        });
        // Join tables in new array
        newResult.push({
          ...r,
          proponents,
        });
      })
    );
    res.json({ data: newResult });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetAIG_ShareholderProposals_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetAIG_Proponents(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('proposal_id', sql.VarChar, req.proposal_id).execute('GetAIG_Proponents');
    return result.recordset;
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetAIG_Proponents`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// AiG Latest Filing
async function GetGovCompanyDirector503(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetGovCompanyDirector503');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetGovCompanyDirector503`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompanyDirector502_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetCompanyDirector502_v2');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompanyDirector502_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompanyDirector507_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetCompanyDirector507_v2');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompanyDirector507_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompanyDirectorshort_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetCompanyDirectorshort_v2');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompanyDirectorshort_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompanyDirector10k_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetCompanyDirector10k_v2');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompanyDirector10k_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AiG: Directors

// AiG Directos Header
async function GetGovDirectorInfo(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetGovDirectorInfo');
    res.json({ data: result.recordset.length > 0 ? result.recordset[0] : {} });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetGovDirectorInfo`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function Get_Gov_Independent_Graph_Data(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('Get_Gov_Independent_Graph_Data');
    res.json({ data: result.recordset.length > 0 ? result.recordset[0] : {} });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/Get_Gov_Independent_Graph_Data`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function Get_Gov_Tenure_Graph_Data(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('Get_Gov_Tenure_Graph_Data');
    res.json({ data: result.recordset.length > 0 ? result.recordset[0] : {} });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/Get_Gov_Tenure_Graph_Data`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function Get_Gov_Gender_Graph_Data(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('Get_Gov_Gender_Graph_Data');
    res.json({ data: result.recordset.length > 0 ? result.recordset[0] : {} });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/Get_Gov_Gender_Graph_Data`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AiG Directors Body
function getCommittee(commit, strCommittee, iDirectorID) {
  let boolGreen = false;
  let boolYellow = false;
  commit.forEach((e) => {
    if (e.comm_name === strCommittee) {
      if (e.chair_director_id === iDirectorID) {
        boolYellow = true;
      }
      boolGreen = true;
    }
  });

  if (boolYellow) {
    return 'Committee Chair';
  }
  if (boolGreen) {
    return 'Committee';
  }
}

async function GetComDirProf(req, res, next) {
  try {
    const pool = await poolPromise;
    const newResult = [];

    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetComDirProf_v2');
    const resultHeader = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetComDirProfPastHeaderCol');
    const committeeHeaders = resultHeader.recordset.length > 0 ? resultHeader.recordset : [];

    const resultData = result.recordsets.length > 0 ? result.recordsets[0] : [];
    const resultChartData = result.recordsets.length > 0 ? result.recordsets[1] : [];

    const arrEthnicityChart = [];
    let visibleEthnicity_Column = false;
    resultChartData.map((x) => {
      arrEthnicityChart.push({ text: x.ethnicity_name, value: x.count });
    });
    const nullCount = resultData.map((x) => x.ethnicity_name).filter((y) => y === null).length;
    if (nullCount <= 2 && resultData.length > 0) {
      visibleEthnicity_Column = true;
    }

    await Promise.all(
      resultData.map(async (r, i) => {
        const commit = await GetComDirProfPastCheck({
          PID: r.PID,
          Director_appoinment_id: r.Director_appoinment_id,
        });
        // Join tables in new array
        newResult.push({
          ...r,
          Independent: r.Independent === null || r.Independent === undefined || r.Independent === 0 ? '' : 'Independent',
          latest_vote: r.latest_vote !== undefined && r.latest_vote !== null ? r.latest_vote.toFixed(2) : '',
          ethnicity_name: r.ethnicity_name === null ? 'Not disclosed' : r.ethnicity_name,
          commit,
        });
      })
    );

    const createJsonArr = [];
    const currDirectorsProf2 = [];

    await Promise.all(
      newResult.filter((x, i) => {
        const createJson = {};
        committeeHeaders.filter(async (header, ind) => {
          createJson.index = i;
          createJson[header.comm_name] = await getCommittee(x.commit, header.comm_name, x.Director_id);
          if (ind === committeeHeaders.length - 1) {
            createJsonArr.push(createJson);
          }
        });
      })
    );

    newResult.map((e, i) => {
      currDirectorsProf2.push({ ...e, ...createJsonArr[i] });
    });
    const arr = currDirectorsProf2.sort((a, b) => {
      if (a.Surname < b.Surname) {
        return -1;
      }
      if (a.Surname === b.Surname) {
        return 0;
      }
      return 1;
    });

    res.json({ data: arr, committeeHeaders, visibleEthnicity_Column, arrEthnicityChart });
  } catch (error) {
    console.log(error);
    general.ErrorLog(`${companyroutes}/GetComDirProf`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetComDirUpcoming(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('Get_Upcoming_Appointments_and_Departures');
      res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetComDirUpcoming`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetComDirProfPastCheck(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.PID)
      .input('director_appointment_id', sql.Int, req.Director_appoinment_id)
      .execute('GetComDirProfPastCheck');
    return result.recordset;
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetComDirProfPastCheck`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetComDirProfPastHeaderCol(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetComDirProfPastHeaderCol');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetComDirProfPastHeaderCol`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetComDirProfPast(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetComDirProfPast');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetComDirProfPast`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetBoardNewsHeadlines(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetBoardNewsHeadlines');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetBoardNewsHeadlines`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function Get_interlocking_directors_JSON_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.body.pid)
      .execute('get_interlocking_directors_JSON_v2');
    const arrInterlockingDirectors = result.recordset !== undefined ? result.recordset[0].director_json : [];
    let nodes = [];
    let links = [];
    if (Object.keys(arrInterlockingDirectors).length > 0) {
      const obj = JSON.parse(arrInterlockingDirectors);
      nodes = obj.nodes;
      links = obj.links;
    }

    res.json({
      data: arrInterlockingDirectors,
      nodes: nodes,
      links: links,
    });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/Get_interlocking_directors_JSON_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AiG Poison Pill
async function GetDetPoisonPill(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetDetPoisonPill');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetDetPoisonPill`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetItem303Material(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetItem303Material');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetItem303Material`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetDetPoisonPillTopHdr(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetDetPoisonPillTopHdr');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetDetPoisonPillTopHdr`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// AiG Bylaws Charter Gov Guidelines
async function GetCompanyDirector503(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetCompanyDirector503');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetCompanyDirector503`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function Get_Bylaws_Charter_GovGuidelines_Data(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.body.pid)
      .execute('Get_Bylaws_Charter_GovGuidelines_Data_v2');
    res.json(result.recordsets);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/Get_Bylaws_Charter_GovGuidelines_Data`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// AiG Compliance
async function GetCompFillingType(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetCompFillingType');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetCompFillingType`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetCompStatement(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetCompStatement');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetCompStatement`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetComplianceComparisonIndexes(req, res, next) {
  try {
    const myjson = [];
    const pool = await poolPromise;
    const result = await pool.request().execute('GetComplianceComparisonIndexes');
    const resultDDL = await pool.request().input('pid', sql.Int, req.body.pid).execute('getBoardAndDirectorsIndex');
    //
    resultDDL.recordset.forEach((element) => general.validateNulltoEmptyString(element));
    const result_company_profile = await pool.request().input('pid', sql.Int, req.body.pid).execute('getCompanyOverviewProfile');
    const data = result_company_profile.recordset[0];
    const ddl_data = resultDDL.recordset;

    if (ddl_data.length > 0) {
      ddl_data.forEach((item) => {
            const str = item.index_name.replace(' ', '');
            myjson.push({
              id: item.index_id, text: item.index_name, value1: str
            });
      });
    }

    if (myjson.length <= 0) {
      resultDDL.recordset.map((x) => {
        if (x.default === 1) {
          const str = x.index_name.replace(' ', '');
          myjson.push({ id: x.index_id, text: x.index_name, value1: str });
        }
      });
    }
    //
    const newResult = [];
    await Promise.all(
      myjson.map(async (r, i) => {
        const commit = await GetCurrentPreviousNonCompliance({
          PID: req.body.pid,
          index: r.id,
        });
        // Join tables in new array
        newResult.push({
          ...r,
          commit,
        });
      })
    );
    const ordering = {}; // map for efficient lookup of sortIndex
    const sortOrder = ['FTSE 100', 'FTSE 350', 'FTSE 250', 'FTSE SMALLCAP', 'FTSE Fledgling', 'FTSE AIM All-Share'];
    for (let i = 0; i < sortOrder.length; i++) {
      ordering[sortOrder[i]] = i;
    }

    newResult.sort((a, b) => ordering[a.text] - ordering[b.text]);
    res.json(newResult);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetComplianceComparisonIndexes`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCurrentPreviousNonCompliance(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.Int, req.PID)
      .input('index', sql.Int, req.index)
      .execute('GetCurrentPreviousNonCompliance');
    return result.recordsets;
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCurrentPreviousNonCompliance`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetComplianceVotinDissent(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetComplianceVotinDissent');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetComplianceVotinDissent`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// async function GetSelectedProposalsCountry(req, res, next) {
//   const pool = await poolPromise;
//   const result = await pool.request().input('meeting_id', sql.Int, req.body.meeting_id).execute('proxy_insight.dbo.GetSelectedProposalsCountry');
//   const arr = result.recordset;
//   const myJson = [];
//   arr.forEach((obj) => {
//     myJson.push({ label: obj.proposal_type, value: obj.proposal_type_id });
//   });
//   res.json({ data: myJson });
// }

// AIV Charts
async function GetVulnerabilityScoreOverTime(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.VarChar, req.body.pid)
      .execute('GetVulnerabilityScoreOverTime');
    res.json({ response: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetVulnerabilityScoreOverTime`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVulnerabilityPrankOverTime(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PID', sql.VarChar, req.body.pid)
      .execute('GetVulnerabilityPrankOverTime');
    res.json({ response: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetVulnerabilityPrankOverTime`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVotingData_rationale_meeting_against(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.GetVotingData_rationale_meeting_against');
    const arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];

    // Heading
    myJsonHeading = {
      heading: [
        {
          investor_id: 'investor_id',
          manager: 'Voting Manager',
          proposal_number_orig: 'No.',
          proposal_detail: 'Proposal Detail',
          vote_cast: 'Vote Cast',
          vote_reason: 'Rationale',
        },
      ],
    };

    // Data
    arr.forEach((obj) => {
      myJson.push({
        investor_id: obj.investor_id !== null && obj.investor_id !== undefined ? obj.investor_id : '',
        manager: obj.manager !== null && obj.manager !== undefined ? obj.manager : '',
        proposal_number_orig:
          obj.proposal_number_orig !== null && obj.proposal_number_orig !== undefined ? obj.proposal_number_orig : '',
        proposal_detail: obj.proposal_detail !== null && obj.proposal_detail !== undefined ? obj.proposal_detail : '',
        vote_cast: obj.vote_cast !== null && obj.vote_cast !== undefined ? obj.vote_cast : '',
        vote_reason: obj.vote_reason !== null && obj.vote_reason !== undefined ? obj.vote_reason : '',
      });
    });

    res.json({ data: myJson, heading: myJsonHeading.heading[0] });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetVotingData_rationale_meeting_against`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function ListIssuerVotesAgainst(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.ListIssuerVotesAgainst');
    const arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];

    // Heading
    myJsonHeading = {
      heading: [
        {
          investor_id: 'investor_id',
          manager: 'Voting Manager',
          fund_name: 'Fund',
          number: 'No.',
          proposal_detail: 'Proposal Detail',
          vote_cast: 'Vote Cast',
        },
      ],
    };

    // Data
    arr.forEach((obj) => {
      myJson.push({
        investor_id: obj.investor_id !== null && obj.investor_id !== undefined ? obj.investor_id : '',
        manager: obj.manager !== null && obj.manager !== undefined ? obj.manager : '',
        fund_name: obj.fund_name !== null && obj.fund_name !== undefined ? obj.fund_name : '',
        number: obj.number !== null && obj.number !== undefined ? obj.number : '',
        proposal_detail: obj.proposal_detail !== null && obj.proposal_detail !== undefined ? obj.proposal_detail : '',
        vote_cast: obj.vote_cast !== null && obj.vote_cast !== undefined ? obj.vote_cast : '',
      });
    });

    res.json({ data: myJson, heading: myJsonHeading.heading[0] });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/ListIssuerVotesAgainst`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetVotingData_allvotes_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .input('proposals', sql.Int, req.body.proposals)
      .input('voteCast', sql.VarChar, req.body.voteCast)
      .execute('proxy_insight.dbo.GetVotingData_allvotes_v2');
    const arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];

    // Heading
    myJsonHeading = {
      heading: [
        {
          investor_id: 'investor_id',
          proposal_number_orig: 'No.',
          proposal_detail: 'Proposal Detail',
          manager: 'Voting Manager',
          fund_name: 'Fund',
          vote_cast: 'Vote Cast',
        },
      ],
    };

    // Data
    arr.forEach((obj) => {
      myJson.push({
        investor_id: obj.investor_id !== null && obj.investor_id !== undefined ? obj.investor_id : '',
        proposal_number_orig:
          obj.proposal_number_orig !== null && obj.proposal_number_orig !== undefined ? obj.proposal_number_orig : '',
        proposal_detail: obj.proposal_detail !== null && obj.proposal_detail !== undefined ? obj.proposal_detail : '',
        manager: obj.manager !== null && obj.manager !== undefined ? obj.manager : '',
        fund_name: obj.fund_name !== null && obj.fund_name !== undefined ? obj.fund_name : '',
        vote_cast: obj.vote_cast !== null && obj.vote_cast !== undefined ? obj.vote_cast : '',
      });
    });

    res.json({ data: myJson, heading: myJsonHeading.heading[0] });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetVotingData_allvotes_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVoteResults_v3(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.GetVoteResults_v3');
    const arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];

    function getOutcome(key) {
      let newkey = '';
      if (key !== null && key !== undefined) {
        newkey = key.toLowerCase();
      }
      // newkey = key !== null && key !== undefined ? key.toLowerCase() : key;
      switch (newkey) {
        case 'u':
          return '';
        case 'p':
          return 'Passed';
        case 'f':
          return 'Failed';
        case 'd':
          return 'Did not go to a vote';
        case '1':
          return 'One Year';
        case '2':
          return 'Two Year';
        case '3':
          return 'Three Year';
      }
    }
    function NumberFormat(objNumber) {
      if (objNumber !== null && objNumber !== undefined) {
        const nf = new Intl.NumberFormat();
        return nf.format(Math.round(objNumber));
      }
      return '';
    }

    // Heading
    myJsonHeading = {
      heading: [
        {
          proposal_id: 'proposal_id',
          proposal_number_orig: 'No.',
          proposal_detail: 'Proposal Detail',
          sponsor: 'Spnsr',
          for_shares: "(000's)",
          for_pcent: '%',
          against_shares: "(000's)",
          against_pcent: '%',
          abstain_shares: "(000's)",
          abstain_pcent: '%',
          broker_shares: "(000's)",
          broker_pcent: '%',
          outcome: 'Outcome',
        },
      ],
    };

    // Data
    arr.forEach((obj) => {
      myJson.push({
        proposal_id: obj.proposal_id !== null && obj.proposal_id !== undefined ? obj.proposal_id : '',
        proposal_number_orig:
          obj.proposal_number_orig !== null && obj.proposal_number_orig !== undefined ? obj.proposal_number_orig : '',
        proposal_detail: obj.proposal_detail !== null && obj.proposal_detail !== undefined ? obj.proposal_detail : '',
        sponsor: obj.sponsor,
        for_shares: NumberFormat(obj.for_shares),
        for_pcent: obj.for_pcent !== null && obj.for_pcent !== undefined ? obj.for_pcent.toFixed(1) : '',
        against_shares: NumberFormat(obj.against_shares),
        against_pcent:
          obj.against_pcent !== null && obj.against_pcent !== undefined ? obj.against_pcent.toFixed(1) : '',
        abstain_shares: NumberFormat(obj.abstain_shares),
        abstain_pcent:
          obj.abstain_pcent !== null && obj.abstain_pcent !== undefined ? obj.abstain_pcent.toFixed(1) : '',
        broker_shares: NumberFormat(obj.broker_shares),
        broker_pcent: obj.broker_pcent !== null && obj.broker_pcent !== undefined ? obj.broker_pcent.toFixed(1) : '',
        outcome: getOutcome(obj.outcome),
      });
    });

    res.json({ data: myJson, heading: myJsonHeading.heading[0] });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetVoteResults_v3`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function MeetingQuickViewDynamicPivotv4(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_idAs', sql.Int, req.body.meeting_id)
      .input('proposal_idAs', sql.Int, req.body.proposal_id)
      .execute('proxy_insight.dbo.MeetingQuickViewDynamicPivotv4');

    const resultHeader = await pool
      .request()
      .input('meetingID', sql.Int, req.body.meeting_id)
      .input('proposal_id', sql.Int, req.body.proposal_id)
      .input('GetLine', sql.Int, req.body.GetLine)
      .execute('proxy_insight.dbo.GetProposalsbyMeetingIDMultiple');

    const myJson = [];
    const myJsonHeading = [];
    let myJsonContainProxy = [];
    const arrayField = [];
    let proxyContain = false;
    let proxyContainForData = false;
    let investorLabelAdd = true;
    let DissidentsValue = '';
    let tooltipArray = [];

    const resultContainProxy = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.ListMeetingDates');
    myJsonContainProxy = resultContainProxy.recordset;
    myJsonContainProxy.forEach((obj) => {
      if (obj.meeting_id.toString() === req.body.meeting_id) {
        // Selected Date contain "Proxy Contest" then true
        if (obj.meeting_date_list.includes('Proxy Contest')) {
          proxyContain = true;
          proxyContainForData = true;
        }
      }
    });

    const arr = result.recordset;
    const arrHeading = resultHeader.recordset;
    function RemoveColumnField(obj) {
      let itemKey;
      for (itemKey in obj) {
        if (obj.hasOwnProperty(itemKey)) {
          const fieldValue = obj[itemKey];
          // For Image name
          obj[itemKey] =
            getImageNameAndLinkName(obj[itemKey]) === undefined ? obj[itemKey] : getImageNameAndLinkName(obj[itemKey]);
          // if (obj[itemKey].toString().includes('.png')) {
            // Take tooltip name
            tooltipArray.push({ [`${itemKey}_tooltip`]: fieldValue });
            if (itemKey.includes('_')) {
              const propent_id = itemKey.split('_')[1];
              tooltipArray.push({ [`${itemKey}_propent_id`]: propent_id });
            }
          // }
        }
        deleteField(itemKey, obj);
      }
    }
    function getImageNameAndLinkName(key) {
      let newkey = '';
      if (key !== null && key !== undefined) {
        if (typeof key !== 'number') {
          newkey = key.toLowerCase().trim();
        }
      } else {
        newkey = null;
      }
      switch (newkey) {
        case 'for':
          return 'GreenYes.png';
        case 'against':
          return 'RedCross.png';
        case 'withhold':
          return 'RedCross.png';
        case 'dnv':
          return 'RedCrclWithLine.png';
        case 'abstain':
          return 'OrangeCross.png';
        case 'legend':
          return '';
        case 'one year':
          return '1Yr';
        case 'two years':
          return '2Yrs';
        case 'three years':
          return '3Yrs';
        case null:
          return '';
      }
    }
    function deleteField(itemKey, obj) {
      // Extra feild delete
      if (proxyContainForData) {
        proxyContainForData = true;
        if (itemKey === 'Rank' || itemKey === '# Dissidents') {
          delete obj[itemKey];
          return true;
        }
      } else if (itemKey === 'Rank' || itemKey === 'Diss FOR (of XY)' || itemKey === '# Dissidents') {
        delete obj[itemKey];
        return true;
      }
    }

    // Data
    if (arr !== undefined && arr.length > 0) {
      DissidentsValue =
        arr[0]['# Dissidents'] !== undefined && arr[0]['# Dissidents'] !== null ? arr[0]['# Dissidents'] : '';
      const arrData = arr;

      arrData.forEach((obj) => {
        if (obj instanceof Object) {
          RemoveColumnField(obj);
        }

        // Prepare data json
        let finalStringTooltipJson = ',';
        let originalJson = JSON.stringify(obj);
        for (let i = 0; i <= tooltipArray.length - 1; i++) {
          finalStringTooltipJson = `${
            finalStringTooltipJson + JSON.stringify(tooltipArray[i]).replace('{', '').replace('}', '').trim()
          },`;
        }
        if (finalStringTooltipJson.length > 1 && originalJson.length > 0) {
          finalStringTooltipJson = `${finalStringTooltipJson.substr(0, finalStringTooltipJson.length - 1)}}`;
          const removeLastBracket = originalJson.substr(0, originalJson.length - 1);
          originalJson = removeLastBracket + finalStringTooltipJson;
          tooltipArray = JSON.parse(originalJson);
        }
        if (tooltipArray.length !== 0) {
          myJson.push(tooltipArray);
        }
        tooltipArray = [];
      });
    }

    // Heading
    if (arrHeading.length > 0) {
      arrHeading.forEach((obj) => {
        if (investorLabelAdd) {
          investorLabelAdd = false;
          myJsonHeading.push({
            shortLabel: 'investor_id',
            fullLabel: 'investor_id',
            field: '',
          });
          myJsonHeading.push({
            shortLabel: 'Investor',
            fullLabel: 'Investor',
            field: '',
          });
        }
        if (proxyContain) {
          proxyContain = false;
          const addDissForLabel = `Diss FOR (of ${DissidentsValue})`;
          myJsonHeading.push({
            shortLabel: addDissForLabel,
            fullLabel: addDissForLabel,
            field: '',
          });
        }
        myJsonHeading.push({
          shortLabel: obj.proposal_number_orig,
          fullLabel: obj.PROPOSAL_DETAILS,
          field: '',
        });
      });

      if (arr.columns instanceof Object) {
        let itemKey;
        for (itemKey in arr.columns) {
          const status = deleteField(itemKey, arr.columns);
          if (!status) {
            arrayField.push({ itemKey });
          }
        }
      }
      let index = 0;
      myJsonHeading.forEach((obj) => {
        obj.field = arrayField[index].itemKey;
        index++;
      });
    }
    proxyContainForData = false;
    res.json({ data: myJson, heading: myJsonHeading });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/MeetingQuickViewDynamicPivotv4`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetIssuer_Meeting_stats(req, res, next) {
  try {
    let country = '';
    const pool = await poolPromise;
    const resultCountry = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.GetIssuerProfile');
    if (resultCountry.recordset.length > 0 &&
        resultCountry.recordset[0].country !== null &&
        resultCountry.recordset[0].country !== undefined) {
      country = resultCountry.recordset[0].country.toLowerCase();
    }
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.GetIssuer_Meeting_stats');
    const arr = result.recordsets;
    if (arr.length > 0) {
      const myJson2 = [
        arr[0][0].voter_turnout === null ? '' : `${Math.round(arr[0][0].voter_turnout)}%`,
        arr[0][0].Institutional_ownership === null ? '' : `${Math.round(arr[0][0].Institutional_ownership)}%`,
        arr[0][0].voting_managers_recorded,
        arr[0][0].funds_recorded,
      ];
      const myJson3 = [
        arr[1][0].voter_turnout_prev === null ? '' : `${Math.round(arr[1][0].voter_turnout_prev)}%`,
        arr[1][0].Institutional_ownership_prev === null ? '' : `${Math.round(arr[1][0].Institutional_ownership_prev)}%`,
        arr[1][0].voting_managers_recorded_prev,
        arr[1][0].funds_recorded_prev,
      ];

      const withoutUSJson = {
        data: [
          {
            'Meeting Date': '# Voting Managers recorded (to date)',
            CurrDate: '',
            PrevDate: '',
          },
          {
            'Meeting Date': '# Funds recorded (to date)',
            CurrDate: '',
            PrevDate: '',
          },
        ],
      };
      const resultJson = {
        data: [
          {
            'Meeting Date': 'Voter Turnout (%)',
            CurrDate: '',
            PrevDate: '',
          },
          {
            'Meeting Date': '% Institutional Ownership (13F Filers)',
            CurrDate: '',
            PrevDate: '',
          },
          {
            'Meeting Date': '# Voting Managers recorded (to date)',
            CurrDate: '',
            PrevDate: '',
          },
          {
            'Meeting Date': '# Funds recorded (to date)',
            CurrDate: '',
            PrevDate: '',
          },
        ],
      };

      const resultHeadingJSON = {
        // MeetingDate_Heading: "Meeting Date",
        PrevDate_Heading:
          arr[2][0].prev_meeting_date !== null ? dateFormat(arr[2][0].prev_meeting_date, 'dd mmm yyyy', true) : 'N/A',
      };

      for (let index = 0; index < resultJson.data.length; index++) {
        resultJson.data[index].CurrDate = myJson2[index];
        resultJson.data[index].PrevDate = myJson3[index];
      }
      for (let index = 0; index < withoutUSJson.data.length; index++) {
        withoutUSJson.data[index].CurrDate = myJson2[index + 2];
        withoutUSJson.data[index].PrevDate = myJson3[index + 2];
      }

      if (country === 'us') {
        res.json({ data: resultJson.data, heading: resultHeadingJSON });
      } else {
        res.json({ data: withoutUSJson.data, heading: resultHeadingJSON });
      }
    } else {
      res.json({});
    }
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetIssuer_Meeting_stats`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// enter new stored proc here GetVotingData_rationale
async function ListVotingOwnershipForProposal_v2(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .input('proposal_id', sql.Int, req.body.proposal_id)
      .execute('proxy_insight.dbo.ListVotingOwnershipForProposal_v2');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/ListVotingOwnershipForProposal_v2`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetShareholder_Proposal_Details_VotingOverview(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .input('proposal_id', sql.Int, req.body.proposal_id)
      .execute('proxy_insight.dbo.WebCompV_GetShareholder_Proposal_Details');
    let dataRes = {};
    const elseVal = 'N/A';

    if (result.recordset.length > 0) {
      const arr = result.recordset[0];
      dataRes = {
        proponents:
          arr.proponents !== null && arr.proponents.trim() !== ''
            ? arr.proponents
            : elseVal,
        Support_at_Prev_Meeting:
          arr.Support_at_Prev_Meeting !== null &&
          arr.Support_at_Prev_Meeting !== 0
            ? `${arr.Support_at_Prev_Meeting}%`
            : elseVal,
        Prev_time_submited:
          arr.Prev_time_submited !== null && arr.Prev_time_submited !== 0
            ? arr.Prev_time_submited
            : elseVal,
      };
    }
    if (
      dataRes.proponents === elseVal &&
      dataRes.Support_at_Prev_Meeting === elseVal &&
      dataRes.Prev_time_submited === elseVal
    ) {
      dataRes = {};
    }
    res.json({ data: dataRes });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetShareholder_Proposal_Details_VotingOverview`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function Get_OtherBoards(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('proposal_id', sql.Int, req.body.proposal_id)
      .execute('proxy_insight.dbo.Get_OtherBoards');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/Get_OtherBoards`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetVotingData_rationale(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .input('proposal_id', sql.Int, req.body.proposal_id)
      .execute('proxy_insight.dbo.GetVotingData_rationale');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetVotingData_rationale`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// all votings
async function ListVotingAndOwnerhipForProposal_insightia(req, res, next) {
  try {
    const pool = await poolPromise;
    const resultV6 = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .input('proposal_id', sql.Int, req.body.proposal_id)
      .input('prev_meeting_id', sql.Int, req.body.prev_meeting_id)
      .input('prev_proposal_id', sql.Int, req.body.prev_proposal_id)
      .execute('proxy_insight.dbo.ListVotingAndOwnerhipForProposal_insightia');

    const mergeData = [];
    resultV6.recordsets[1].forEach((e) => {
      if (e === undefined) return null;
      mergeData.push({
        investor_name: e.investor_name,
        Voting_Policy_Summary: e.Voting_Policy_Summary,
        Policy_Download: e.Policy_Download,
        PVA: e.PVA,
        owns_pcent: e.owns_pcent,
        owns_pcent_pq: e.owns_pcent_pq,
        Vote: e.vote,
        prev_Vote: e.prev_vote,
        avg_for: e.avg_for,
        avg_for_prev: e.avg_for_prev,
        ISS_match: e.ISS_match,
        GL_match: e.GL_match,
        fund_name: resultV6.recordsets[2].filter((f) => f.investor_name === e.investor_name),
        vote: resultV6.recordsets[2].vote,
        prev_vote: resultV6.recordsets[2].prev_vote,
      });
    });
    res.json({ data: mergeData, vote_type: req.body.vote_type });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/ListVotingAndOwnerhipForProposal_insightia`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// getMeetingURLs
async function getMeetingURLs(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .input('meeting_date', sql.Date, req.body.meeting_date)
      .execute('proxy_insight.dbo.getMeetingURLs');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/getMeetingURLs`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function GetMeetingType_id(req, res, next) {
  try {
    let meeting_type_id = 0;
    let isPreMeeting = false;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meetingId)
      .execute('proxy_insight.dbo.GetMeetingType_id');
    if (
      result.recordset !== undefined &&
      result.recordset !== null &&
      result.recordset.length > 0
    ) {
      if (result.recordset[0].meeting_type_id === null) {
        meeting_type_id = 12;
      } else {
        meeting_type_id = result.recordsets[0] !== undefined ? result.recordset[0].meeting_type_id : 0;
      }
    }

    if (meeting_type_id !== 5) {
      const resultData = await pool
        .request()
        .input('meeting_id', sql.Int, req.body.meetingId)
        .input('previous_meeting_id', sql.Int, req.body.prevMeetingId)
        .input('set_adjustment', sql.Int, req.body.set_adjustment)
        .execute('proxy_insight.dbo.GetMeeting_proposals_synth_Insightia');

      if (resultData.recordsets[0] !== undefined && resultData.recordsets[0].length > 0) {
        if (resultData.recordsets[1] !== undefined && resultData.recordsets[1][0].is_post) {
          isPreMeeting = true;
        }

        // Heading
        const resultHeadingJson = {
          heading: [
            {
              isPreMeeting,
              No: 'No.',
              ProposalDetail: 'Proposal Detail',
              Spn: 'Spn',
              MRec: 'MRec',
              For: 'For',
              'Chg_AG/AB': isPreMeeting === true ? 'Chg' : 'AG/AB',
              AG_FOR: isPreMeeting === true ? 'AG' : 'FOR',
              'AB/WH_AG': isPreMeeting === true ? 'AB/WH' : 'AG',
              'Pass_AB/WH': isPreMeeting === true ? 'Pass' : 'AB/WH',
              currentMeetingDateYear: '', // yyyy
              Chg: 'Chg',
              IssCurrYear: '', // yy
              IssPrevYear:
                resultData.recordsets[4] !== undefined && resultData.recordsets[4].length === 1
                  ? dateFormat(resultData.recordsets[4][0].meeting_date, 'yy', true)
                  : 'N/A',
              GlCurrYear: '', // yy
              GlPrevYear:
              resultData.recordsets[4] !== undefined && resultData.recordsets[4].length === 1
                  ? dateFormat(resultData.recordsets[4][0].meeting_date, 'yy', true)
                  : 'N/A',
            },
          ],
        };
        const myJson = [];
        const myJsonChart = [];

        // Check data conditions in loop (all function)
        function isCondition_proposal_type_id(data) {
          data = data === null ? '' : data;
          if (
            data.toString() !== '' &&
            (data.toString() === '221' ||
              data.toString() === '222' ||
              data.toString() === '218' ||
              data.toString() === '207')
          ) {
            return true;
          }
          return false;
        }
        function chartFnPoint(obj) {
          let vsAvg = 0;
          if (
            obj.votes_for !== null &&
            obj.votes_for !== 'n/a' &&
            obj.avg_this_year !== null &&
            obj.avg_this_year !== 'n/a'
          ) {
            vsAvg = (obj.votes_for - obj.avg_this_year).toFixed(1);
            return vsAvg;
          }
          return vsAvg;
        }
        function isPreMeetingFn(isPreMeeting, obj, label) {
          switch (label) {
            case 'Spn':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                return obj.Sponsor;
              }
              return '';

            case 'MRec':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                return obj.mgmt_recommendation !== null
                  ? obj.mgmt_recommendation
                  : 'Unknown';
              }
              return '';

            case 'MRecImage':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                return getImageName(obj.mgmt_recommendation);
              }
              return '';

            case 'currentMeetingDateYear':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (obj.avg_this_year !== null) {
                  return obj.avg_this_year !== null
                    ? obj.avg_this_year.toFixed(1)
                    : '';
                }
                return 'n/a';
              }
              return '';

            case 'Chg':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (obj.avg_this_year !== null && obj.avg_prev_year !== null) {
                  if (obj.avg_this_year > obj.avg_prev_year) {
                    return 'Up.png';
                  }
                  return 'Down.png';
                }
                return '';
              }
              return '';

            case 'ChgTooltip':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (obj.avg_this_year !== null && obj.avg_prev_year !== null) {
                  return (obj.avg_this_year - obj.avg_prev_year).toFixed(1);
                }
                return '';
              }
              return '';

            case 'For':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return obj.votes_for !== null ? obj.votes_for.toFixed(1) : '';
                }
                return obj.votes_for;
              }
              return '';

            case 'Chg_AG/AB':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  if (obj.votes_for === null || obj.votes_for_prev === null) {
                    return 'n/a';
                  }
                  if ((obj.votes_for - obj.votes_for_prev) % 1 !== 0) {
                    return (obj.votes_for - obj.votes_for_prev).toFixed(1);
                  }
                  return obj.votes_for - obj.votes_for_prev;
                }
                if (obj.votes_against_abstain % 1 !== 0) {
                  return obj.votes_against_abstain !== null
                    ? obj.votes_against_abstain.toFixed(1)
                    : '';
                }
                return obj.votes_against_abstain;
              }
              return '';

            case 'AG_FOR':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return obj.votes_against !== null
                    ? obj.votes_against.toFixed(1)
                    : '';
                }
                if (obj.prev_votes_for !== null) {
                  return obj.prev_votes_for !== null
                    ? obj.prev_votes_for.toFixed(1)
                    : '';
                }
                return 'n/a';
              }
              return '';

            case 'AB/WH_AG':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return obj.votes_abstain_withh !== null
                    ? obj.votes_abstain_withh.toFixed(1)
                    : '';
                }
                if (obj.prev_votes_against !== null) {
                  return obj.prev_votes_against !== null
                    ? obj.prev_votes_against.toFixed(1)
                    : '';
                }
                return 'n/a';
              }
              return '';

            case 'Pass_AB/WH_star':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  if (obj.Pass !== null || obj.outcome_type !== null) {
                    if (obj.Pass === 'p' || obj.Pass === 'f') {
                      return obj.outcome_type;
                    }
                    return '';
                  }
                } else {
                  if (obj.prev_abstain_withh !== null) {
                    return obj.prev_abstain_withh !== null
                      ? obj.prev_abstain_withh.toFixed(1)
                      : '';
                  }
                  return 'n/a';
                }
              } else {
                return '';
              }

            case 'Pass_AB/WH_Tooltip':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  if (obj.Pass !== null) {
                    if (obj.Pass === 'p') {
                      return 'Pass';
                    }
                    if (obj.Pass === 'f') {
                      return 'Fail';
                    }
                    return '';
                  }
                  return '';
                }
                if (obj.prev_abstain_withh !== null) {
                  return obj.prev_abstain_withh !== null
                    ? obj.prev_abstain_withh.toFixed(1)
                    : '';
                }
                return 'n/a';
              }
              return '';

            case 'Pass_AB/WH':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  if (obj.Pass !== null) {
                    if (obj.Pass === 'p') {
                      return 'GreenYes.png';
                    }
                    if (obj.Pass === 'f') {
                      return 'RedCross.png';
                    }
                    return '';
                  }
                  return '';
                }
                if (obj.prev_abstain_withh !== null) {
                  return obj.prev_abstain_withh !== null
                    ? obj.prev_abstain_withh.toFixed(1)
                    : '';
                }
                return 'n/a';
              }
              return '';

            case 'IssCurrYear':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return getImageName(obj.ISS_rec_curr);
                }
                return getImageName(obj.ISS_rec);
              }
              return '';

            case 'IssPrevYear':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return getImageName(obj.ISS_rec_prev);
                }
                return getImageName(obj.prev_ISS_rec);
              }
              return '';

            case 'GlCurrYear':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return getImageName(obj.GL_rec_curr);
                }
                return getImageName(obj.GL_rec);
              }
              return '';

            case 'GlPrevYear':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return getImageName(obj.GL_rec_prev);
                }
                return getImageName(obj.prev_GL_rec);
              }
              return '';

            case 'IssCurrYearTooltip':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return obj.ISS_rec_curr !== null
                    ? obj.ISS_rec_curr
                    : 'Unknown';
                }
                return obj.ISS_rec !== null ? obj.ISS_rec : 'Unknown';
              }
              return '';

            case 'IssPrevYearTooltip':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return obj.ISS_rec_prev !== null
                    ? obj.ISS_rec_prev
                    : 'Unknown';
                }
                return obj.prev_ISS_rec !== null
                  ? obj.prev_ISS_rec
                  : 'Unknown';
              }
              return '';

            case 'GlCurrYearTooltip':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return obj.GL_rec_curr !== null
                    ? obj.GL_rec_curr
                    : 'Unknown';
                }
                return obj.GL_rec !== null ? obj.GL_rec : 'Unknown';
              }
              return '';

            case 'GlPrevYearTooltip':
              if (
                isCondition_proposal_type_id(obj.proposal_type_id) === false
              ) {
                if (isPreMeeting) {
                  return obj.GL_rec_prev !== null
                    ? obj.GL_rec_prev
                    : 'Unknown';
                }
                return obj.prev_GL_rec !== null
                  ? obj.prev_GL_rec
                  : 'Unknown';
              }
              return '';

            default:
              break;
          }
        }
        function getImageName(key) {
          const newkey = key !== null && key !== undefined && key !== '' ? key.toLowerCase() : key;
          switch (newkey) {
            case 'for':
              return 'GreenYes.png';
            case 'against':
              return 'RedCross.png';
            case 'withhold':
              return 'RedCross.png';
            case 'dnv':
              return 'RedCrclWithLine.png';
            case 'abstain':
              return 'OrangeCross.png';
            case 'legend':
              return '';
            default:
              return 'deskIcon.png';
          }
        }
        // Data
        resultData.recordsets[0] !== undefined && resultData.recordsets[0].forEach((obj) => {
          myJson.push({
            No: obj.proposal_number_orig,
            ProposalDetail: obj.proposal_detail,
            proposal_type: obj.proposal_type,
            proposal_type_id: obj.proposal_type_id,
            proposal_id: obj.proposal_id,

            Spn: isPreMeetingFn(isPreMeeting, obj, 'Spn'),

            MRec: isPreMeetingFn(isPreMeeting, obj, 'MRec'),
            MRecImage: isPreMeetingFn(isPreMeeting, obj, 'MRecImage'),

            For: isPreMeetingFn(isPreMeeting, obj, 'For'),

            'Chg_AG/AB': isPreMeetingFn(isPreMeeting, obj, 'Chg_AG/AB'),

            AG_FOR: isPreMeetingFn(isPreMeeting, obj, 'AG_FOR'),

            'AB/WH_AG': isPreMeetingFn(isPreMeeting, obj, 'AB/WH_AG'),

            'Pass_AB/WH_star': isPreMeetingFn(isPreMeeting, obj, 'Pass_AB/WH_star'),
            'Pass_AB/WH': isPreMeetingFn(isPreMeeting, obj, 'Pass_AB/WH'),
            'Pass_AB/WH_Tooltip': isPreMeetingFn(isPreMeeting, obj, 'Pass_AB/WH_Tooltip'),

            // //forCurr
            currentMeetingDateYear: isPreMeetingFn(isPreMeeting, obj, 'currentMeetingDateYear'),
            // isCondition_proposal_type_id(obj.proposal_type_id) ? (obj.avg_this_year !== null ? obj.avg_this_year.toFixed(1) : "n/a") : "",

            // //forPrev
            Chg: isPreMeetingFn(isPreMeeting, obj, 'Chg'),
            ChgTooltip: isPreMeetingFn(isPreMeeting, obj, 'ChgTooltip'),

            // ISS
            IssCurrYear: isPreMeetingFn(isPreMeeting, obj, 'IssCurrYear'),
            IssPrevYear: isPreMeetingFn(isPreMeeting, obj, 'IssPrevYear'),
            IssCurrYearTooltip: isPreMeetingFn(isPreMeeting, obj, 'IssCurrYearTooltip'),
            IssPrevYearTooltip: isPreMeetingFn(isPreMeeting, obj, 'IssPrevYearTooltip'),
            // GL
            GlCurrYear: isPreMeetingFn(isPreMeeting, obj, 'GlCurrYear'),
            GlPrevYear: isPreMeetingFn(isPreMeeting, obj, 'GlPrevYear'),
            GlCurrYearTooltip: isPreMeetingFn(isPreMeeting, obj, 'GlCurrYearTooltip'),
            GlPrevYearTooltip: isPreMeetingFn(isPreMeeting, obj, 'GlPrevYearTooltip'),
          });
        });

        // Chart
        resultData.recordsets[0] !== undefined && resultData.recordsets[0].forEach((obj) => {
          myJsonChart.push({
            value: chartFnPoint(obj),
            label: obj.proposal_number_orig,
          });
        });

        if (isPreMeeting) {
          return res.json({
            data: myJson,
            chart: myJsonChart,
            heading: resultHeadingJson.heading,
            tableMeetingTypeId_5: false,
          });
        }
        return res.json({
          data: myJson,
          heading: resultHeadingJson.heading,
          tableMeetingTypeId_5: false,
        });
      }
    } else {
      // Meeting type =5

      const myJson = [];
      const resultHeadingJson = {
        heading: [
          {
            No: 'No.',
            Proposal: 'Proposal',
            Spnsr: 'Spnsr',
            ProposalDetail: 'Proposal Detail',
            ISS: 'ISS',
            GL: 'GL',
            For: 'For',
            Agt: 'Agt',
            Abs: 'Abs',
            'W/H': 'W/H',
            Total: 'Total',
          },
        ],
      };

      const resultData1 = await pool
        .request()
        .input('meeting_id', sql.Int, req.body.meetingId)
        .execute('proxy_insight.dbo.GetMeeting_proposals_management_v2');
      const resultData2 = await pool
        .request()
        .input('meeting_id', sql.Int, req.body.meetingId)
        .execute('proxy_insight.dbo.GetMeeting_proposals_Dissident_v2');
      const resultData3 = await pool
        .request()
        .input('meeting_id', sql.Int, req.body.meetingId)
        .execute('proxy_insight.dbo.GetMeeting_proposals_Both_v2');

      if (resultData1.recordsets[0].length > 0) {
        myJson.push({
          section: 'heading',
          proposal_number_orig: 'Management Nominees',
        });

        // myJson.push({
        //   proposal_number_orig: obj.proposal_number_orig,
        //   proposal_id: obj.proposal_id,
        //   proposal_detail: obj.proposal_detail,
        //   proposal_detail_navigateUrl:
        //     obj.proposal_detail === 'Management Nominees' ||
        //     obj.proposal_detail === 'Dissident Nominees' ||
        //     obj.proposal_detail === 'Other Items' ||
        //     obj.proposal_detail === 'One Year' ||
        //     obj.proposal_detail === 'Two Years' ||
        //     obj.proposal_detail === 'Three Years'
        //       ? ''
        //       : '',

        //   Sponsor: obj.Sponsor,
        //   proposal_type: obj.proposal_type,
        //   ISS: obj.ISS,
        //   GL: obj.GL,
        //   votes_for: obj.votes_for === 0 ? '-' : obj.votes_for,
        //   votes_against: obj.votes_against === 0 ? '-' : obj.votes_against,
        //   votes_abstained: obj.votes_abstained === 0 ? '-' : obj.votes_abstained,
        //   votes_withheld: obj.votes_withheld === 0 ? '-' : obj.votes_withheld,
        //   total_votes: obj.total_votes === 0 ? '-' : obj.total_votes,
        //   section: 'heading',
        //   proposal_number_orig: 'Management Nominees',
        // });
        resultData1.recordsets[0].forEach((obj) => {
          myJson.push({
            proposal_id: obj.proposal_id,
            proposal_number_orig: obj.proposal_number_orig,
            proposal_detail: obj.proposal_detail,
            proposal_detail_navigateUrl:
              obj.proposal_detail === 'Management Nominees' ||
              obj.proposal_detail === 'Dissident Nominees' ||
              obj.proposal_detail === 'Other Items' ||
              obj.proposal_detail === 'One Year' ||
              obj.proposal_detail === 'Two Years' ||
              obj.proposal_detail === 'Three Years'
                ? ''
                : '',

            Sponsor: obj.Sponsor,
            proposal_type: obj.proposal_type,
            ISS: obj.ISS,
            GL: obj.GL,
            votes_for: obj.votes_for && obj.votes_for === 0 ? '-' : obj.votes_for,
            votes_against: obj.votes_against && obj.votes_against === 0 ? '-' : obj.votes_against,
            votes_abstained: obj.votes_abstained && obj.votes_abstained === 0 ? '-' : obj.votes_abstained,
            votes_withheld: obj.votes_withheld && obj.votes_withheld === 0 ? '-' : obj.votes_withheld,
            total_votes: obj.total_votes && obj.total_votes === 0 ? '-' : obj.total_votes,
          });
        });
      }

      if (resultData2.recordsets[0].length > 0) {
        myJson.push({
          section: 'heading',
          proposal_number_orig: 'Dissident Nominees',
        });
        resultData2.recordsets[0].forEach((obj) => {
          myJson.push({
            proposal_id: obj.proposal_id,
            proposal_number_orig: obj.proposal_number_orig,
            proposal_detail: obj.proposal_detail,
            proposal_detail_navigateUrl:
              obj.proposal_detail === 'Management Nominees' ||
              obj.proposal_detail === 'Dissident Nominees' ||
              obj.proposal_detail === 'Other Items' ||
              obj.proposal_detail === 'One Year' ||
              obj.proposal_detail === 'Two Years' ||
              obj.proposal_detail === 'Three Years'
                ? ''
                : '',
            Sponsor: obj.Sponsor,
            proposal_type: obj.proposal_type,
            ISS: obj.ISS,
            GL: obj.GL,
            votes_for: obj.votes_for && obj.votes_for === 0 ? '-' : obj.votes_for,
            votes_against: obj.votes_against && obj.votes_against === 0 ? '-' : obj.votes_against,
            votes_abstained: obj.votes_abstained && obj.votes_abstained === 0 ? '-' : obj.votes_abstained,
            votes_withheld: obj.votes_withheld && obj.votes_withheld === 0 ? '-' : obj.votes_withheld,
            total_votes: obj.total_votes && obj.total_votes === 0 ? '-' : obj.total_votes,
          });
        });
      }

      if (resultData3.recordsets[0].length > 0) {
        myJson.push({
          section: 'heading',
          proposal_number_orig: 'Other Items',
        });

        // myJson.push({
        //   proposal_number_orig: obj.proposal_number_orig,
        //   proposal_detail: obj.proposal_detail,
        //   proposal_detail_navigateUrl:
        //     obj.proposal_detail === 'Management Nominees' ||
        //     obj.proposal_detail === 'Dissident Nominees' ||
        //     obj.proposal_detail === 'Other Items' ||
        //     obj.proposal_detail === 'One Year' ||
        //     obj.proposal_detail === 'Two Years' ||
        //     obj.proposal_detail === 'Three Years'
        //       ? ''
        //       : '',
        //   Sponsor: obj.Sponsor,
        //   proposal_type: obj.proposal_type,
        //   proposal_id: obj.proposal_id,
        //   ISS: obj.ISS,
        //   GL: obj.GL,
        //   votes_for: obj.votes_for === 0 ? '-' : obj.votes_for,
        //   votes_against: obj.votes_against === 0 ? '-' : obj.votes_against,
        //   votes_abstained: obj.votes_abstained === 0 ? '-' : obj.votes_abstained,
        //   votes_withheld: obj.votes_withheld === 0 ? '-' : obj.votes_withheld,
        //   total_votes: obj.total_votes === 0 ? '-' : obj.total_votes,
        //   section: 'heading',
        //   proposal_number_orig: 'Other Items',
        // });
        resultData3.recordsets[0].forEach((obj) => {
          myJson.push({
            proposal_id: obj.proposal_id,
            proposal_number_orig: obj.proposal_number_orig,
            proposal_detail: obj.proposal_detail,
            proposal_detail_navigateUrl:
              obj.proposal_detail === 'Management Nominees' ||
              obj.proposal_detail === 'Dissident Nominees' ||
              obj.proposal_detail === 'Other Items' ||
              obj.proposal_detail === 'One Year' ||
              obj.proposal_detail === 'Two Years' ||
              obj.proposal_detail === 'Three Years'
                ? ''
                : '',
            Sponsor: obj.Sponsor,
            proposal_type: obj.proposal_type,
            ISS: obj.ISS,
            GL: obj.GL,
            votes_for: obj.votes_for && obj.votes_for === 0 ? '-' : obj.votes_for,
            votes_against: obj.votes_against && obj.votes_against === 0 ? '-' : obj.votes_against,
            votes_abstained: obj.votes_abstained && obj.votes_abstained === 0 ? '-' : obj.votes_abstained,
            votes_withheld: obj.votes_withheld && obj.votes_withheld === 0 ? '-' : obj.votes_withheld,
            total_votes: obj.total_votes && obj.total_votes === 0 ? '-' : obj.total_votes,
          });
        });
      }

      // Data
      for (let index = 0; index < myJson.length; index++) {
        let synth = false;
        if (myJson[index].ISS !== undefined && myJson[index].GL !== undefined) {
          let iss = myJson[index].ISS === null ? '' : myJson[index].ISS;
          let gl = myJson[index].GL === null ? '' : myJson[index].GL;

          if (iss.length > 0) {
            if (iss.substr(iss.length - 1) === '*') {
              synth = true;
              iss = iss.substr(0, iss.length - 1).trim();
            }

            switch (iss) {
              case '1 Year':
                iss = `1Yr${synth ? '*' : ''}`;
                break;
              case '3 Years':
                iss = `3Yr${synth ? '*' : ''}`;
                break;
              case 'Abstain':
                iss = `Abs${synth ? '*' : ''}`;
                break;
              case 'Against':
                iss = `Agt${synth ? '*' : ''}`;
                break;
              case 'Consent':
                iss = `Consent${synth ? '*' : ''}`;
                break;
              case 'DNV':
                iss = `DNV${synth ? '*' : ''}`;
                break;
              case 'DNV This Card':
                iss = `DNV${synth ? '*' : ''}`;
                break;
              case 'Do Not Revoke Consent':
                iss = `Do Not Revoke Consent${synth ? '*' : ''}`;
                break;
              case 'Do Not Vote':
                iss = `DNV${synth ? '*' : ''}`;
                break;
              case 'For':
                iss = `For${synth ? '*' : ''}`;
                break;
              case 'NULL':
                iss = `${synth ? '*' : ''}`;
                break;
              case 'One Year':
                iss = `1Yr${synth ? '*' : ''}`;
                break;
              case 'Revoke Consent':
                iss = `Revoke Consent${synth ? '*' : ''}`;
                break;
              case 'Split':
                iss = `Split${synth ? '*' : ''}`;
                break;
              case 'Undetermined':
                iss = `Undetermined${synth ? '*' : ''}`;
                break;
              case 'Withhold':
                iss = `W/H${synth ? '*' : ''}`;
                break;
              case 'Withhold Consent':
                iss = `Wi/H Consent${synth ? '*' : ''}`;
                break;
              // case Else:
              //   iss = iss;
              //   break;
              default:
                iss = iss;
                break;
            }
            myJson[index].ISS = iss;
          }

          synth = false;

          if (gl.length > 0) {
            if (gl.substr(gl.length - 1) === '*') {
              synth = true;
              gl = gl.substr(0, gl.length - 1).trim();
            }

            switch (gl) {
              case '1 Year':
                gl = `1Yr${synth ? '*' : ''}`;
                break;
              case '3 Years':
                gl = `3Yr${synth ? '*' : ''}`;
                break;
              case 'Abstain':
                gl = `Abs${synth ? '*' : ''}`;
                break;
              case 'Against':
                gl = `Agt${synth ? '*' : ''}`;
                break;
              case 'Consent':
                gl = `Consent${synth ? '*' : ''}`;
                break;
              case 'DNV':
                gl = `DNV${synth ? '*' : ''}`;
                break;
              case 'DNV This Card':
                gl = `DNV${synth ? '*' : ''}`;
                break;
              case 'Do Not Revoke Consent':
                gl = `Do Not Revoke Consent${synth ? '*' : ''}`;
                break;
              case 'Do Not Vote':
                gl = `DNV${synth ? '*' : ''}`;
                break;
              case 'For':
                gl = `For${synth ? '*' : ''}`;
                break;
              case 'NULL':
                gl = `${synth ? '*' : ''}`;
                break;
              case 'One Year':
                gl = `1Yr${synth ? '*' : ''}`;
                break;
              case 'Revoke Consent':
                gl = `Revoke Consent${synth ? '*' : ''}`;
                break;
              case 'Split':
                gl = `Split${synth ? '*' : ''}`;
                break;
              case 'Undetermined':
                gl = `Undetermined${synth ? '*' : ''}`;
                break;
              case 'Withhold':
                gl = `W/H${synth ? '*' : ''}`;
                break;
              case 'Withhold Consent':
                gl = `Wi/H Consent${synth ? '*' : ''}`;
                break;
              // case Else:
              //   iss = iss;
              //   break;
              default:
                gl = iss;
                break;
            }
            myJson[index].GL = gl;
          }
        }
      }

      return res.json({
        data: myJson,
        heading: resultHeadingJson.heading,
        tableMeetingTypeId_5: true,
      });
    }
    return res.json({
      data: [],
      chart: [],
      heading: [],
      tableMeetingTypeId_5: false,
    });
  } catch (error) {
    res.json({
      data: [],
      chart: [],
      heading: [],
      tableMeetingTypeId_5: false,
    });
    general.ErrorLog(`${companyroutes}/GetMeetingType_id`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// Company > Voting > No action Letters

async function GetNoActionTrackInfo(req, res, next) {
  try {
    const pool = await poolPromise;
    const CHECKED_ALL = 'checked all';
    let {
      index_id,
      start_date,
      end_date,
      proposal_type_top,
      proposal_type_sub,
      proposal_type,
      industry_id,
      proponent,
      Resolutions_Filter,
      meeting_id,
      company_search_id,
    } = req.body;
    if (proposal_type_top === CHECKED_ALL) {
      const result = await pool.request().execute('proxy_insight.dbo.GetTblProposal_Type_TopLevel');
      proposal_type_top = result.recordset
        .filter((item) => item.proposal_type_top_level_id)
        .map((item) => item.proposal_type_top_level_id)
        .toString();
    }
    const result = await pool
      .request()
      .input('index_id', sql.VarChar, index_id)
      .input('start_date', sql.Date, start_date)
      .input('end_date', sql.Date, end_date)
      .input('proposal_type_top', sql.VarChar, proposal_type_top)
      .input('proposal_type_sub', sql.VarChar, proposal_type_sub)
      .input('proposal_type', sql.VarChar, proposal_type)
      .input('industry_id', sql.VarChar, industry_id)
      .input('proponent', sql.VarChar, proponent)
      .input('Resolutions_Filter', sql.VarChar, Resolutions_Filter)
      .input('meeting_id', sql.Int, meeting_id)
      .input('company_search_id', sql.Int, company_search_id)
      .execute('proxy_insight.dbo.GetNoActionTrackInfo_insightia');
    result.recordset.forEach((element) => general.validateNulltoEmptyString(element));
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetNoActionTrackInfo`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

async function noActionLettersDataExists(req, res, next) {
  try {
    const pool = await poolPromise;
    const { pid } = req.body;
    const result = await pool.request().input('pid', sql.Int, pid).execute('proxy_insight.dbo.NoActionLettersTab');
    res.json({ data: result.recordset });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/noActionLettersDataExists`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetNoActionLetterProposalDetail(req, res, next) {
  try {
    const pool = await poolPromise;
    const { proposal_id } = req.body;

    const result = await pool
      .request()
      .input('ProposalD', sql.Int, proposal_id)
      .execute('proxy_insight.dbo.GetNoActionLetterProposalDetail');
    if (result.recordset.length > 0) {
      const { NoActionLetterId } = result.recordset[0];
      const result_GetResltProposalDetail = await pool
        .request()
        .input('NoActionLetterId', sql.Int, NoActionLetterId)
        .execute('proxy_insight.dbo.GetResltProposalDetail');
      result_GetResltProposalDetail.recordset.forEach((element) => general.validateNulltoEmptyString(element));
      if (result_GetResltProposalDetail.recordset.length > 0) {
        return res.json({ data: result_GetResltProposalDetail.recordset[0] });
      }
    }
    res.json({ data: {} });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetNoActionLetterProposalDetail`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

// #region OwnerShip Long/ Short - Company
async function getLatestOwnershipDateList(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('PeriodOfReport', sql.Date, '2015-01-01')
      .execute('proxy_insight.dbo.getLatestOwnershipDateList');
    const arr = result.recordset;
    const myJson = [];

    myJson.push({ label: 'Latest Ownership', value: null });
    arr.forEach((obj) => {
      myJson.push({
        label:
          obj.period_of_report !== null && obj.period_of_report !== undefined
            ? `As at: ${dateFormat(obj.period_of_report, 'dd-mmm-yyyy', true)}`
            : '',
        value:
          obj.period_of_report !== null && obj.period_of_report !== undefined
            ? Number(dateFormat(obj.period_of_report, 'yyyymmdd', true))
            : '',
      });
    });

    res.json({ DateList: myJson });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getLatestOwnershipDateList`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getOwnershipLongInvestorData(req, res, next) {
  try {
    const { filterRecords } = req.body;

    let period_of_report = null;
    if (req.body.period_of_report === null || req.body.period_of_report === undefined) {
      period_of_report = null;
    } else {
      period_of_report = `${req.body.period_of_report.toString().substr(0, 4)}-${req.body.period_of_report
        .toString()
        .substr(4, 2)}-${req.body.period_of_report.toString().substr(6, 2)}`;
    }
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .input('period_of_report', sql.Date, period_of_report)
      .input('change_comparison', sql.Int, req.body.change_comparison)
      .execute('proxy_insight.dbo.GetOwnershipLongData_Insightia');
    let arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    let statusTop5 = false;

    // Heading
    myJsonHeading = {
      investor: 'Investors',
      all_investor: 'All Investors',
      top_20_investor: 'Top 20 Investors',
      type: 'Type',
      period_of_report: 'As at:',
      shares_value: "Value ($000's)",
      shares: 'Shares',
      shares_pcent: '%',
      change_in_holdings_shares: 'Shares',
      change_in_holdings_pcent: 'Percentage Point Change',
      voting_sole: 'Sole',
      voting_shared: 'Shared',
      voting_none: 'None',
      levelofactivism: 'Level of Activism',
    };
    if (arr.length > 0) {
      const totalArray = arr;
    if (filterRecords === null && arr.length >= 5) {
      statusTop5 = true;
      arr = arr.slice(0, 5); // TOP 5 & status = 2
    }
    if (filterRecords && arr.length >= 20) {
      arr = arr.slice(0, 20); // TOP 20
    }

    // Data
    arr.forEach((element) => general.validateNulltoEmptyString(element));
    arr.forEach((obj) => {
      myJson.push({
        investor_id: obj.investor_Id,
        investor: obj.filer_name,
        type: obj.investor_type_name,
        period_of_report: obj.period_of_report !== '' ? dateFormat(obj.period_of_report, 'dd-mmm-yyyy', true) : '',
        shares_value: obj.value,
        shares: obj.shares,
        shares_pcent: obj.shares_pcent !== '' ? obj.shares_pcent.toFixed(1) : '',
        change_in_holdings_shares: obj.shares_change,
        change_in_holdings_shares_originalvalue: obj.shares_change,
        change_in_holdings_pcent: obj.shares_change_pcent !== '' ? obj.shares_change_pcent.toFixed(1) : '',
        voting_sole: obj.voting_sole,
        voting_shared: obj.voting_shared,
        voting_none: obj.voting_none,
        levelofactivism: obj.focused_type,
      });
    });
    const ttl_shares_value = totalArray.map((bill) => Number(bill.value)).reduce((acc, bill) => Number(bill) + acc);
    const ttl_shares = totalArray.map((bill) => Number(bill.shares)).reduce((acc, bill) => Number(bill) + acc);
    const ttl_shares_pcent = totalArray
      .map((bill) => Number(bill.shares_pcent))
      .reduce((acc, bill) => Number(bill) + acc);
    const ttl_voting_sole = totalArray
      .map((bill) => Number(bill.voting_sole))
      .reduce((acc, bill) => Number(bill) + acc);
    const ttl_voting_shared = totalArray
      .map((bill) => Number(bill.voting_shared))
      .reduce((acc, bill) => Number(bill) + acc);
    const ttl_voting_none = totalArray
      .map((bill) => Number(bill.voting_none))
      .reduce((acc, bill) => Number(bill) + acc);

    const myJsonTotal = [
      {
        investor_id: '',
        investor: 'Total',
        type: '',
        period_of_report: '',
        shares_value: general.NumberFormatFn(ttl_shares_value),
        shares: general.NumberFormatFn(ttl_shares),
        shares_pcent: ttl_shares_pcent.toFixed(1),
        change_in_holdings_shares: '',
        change_in_holdings_pcent: '',
        voting_sole: general.NumberFormatFn(ttl_voting_sole),
        voting_shared: general.NumberFormatFn(ttl_voting_shared),
        voting_none: general.NumberFormatFn(ttl_voting_none),
        levelofactivism: '',
      },
    ];

    res.json({
      data: myJson,
      heading: myJsonHeading,
      dataFooter: myJsonTotal,
      statusTop5,
    });
    } else {
      res.json({
        data: myJson,
        heading: myJsonHeading,
        dataFooter: [],
        statusTop5,
      });
    }
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getOwnershipLongInvestorData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getOwnershipLongFundData(req, res, next) {
  try {
    const { filterRecords } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('proxy_insight.dbo.GetOwnershipLongFundData_Insightia');
    let arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    let statusTop5 = false;

    // Heading
    myJsonHeading = {
      regName: 'Registrant',
      all_regName: 'All Funds',
      top_20_regName: 'Top 20 Funds',
      seriesName: 'Series',
      balance: 'Shares',
      valUSD: "Value($000's)",
      ReppdDate: 'As at:',
      voting_managers: 'Voting Manager',
    };
    if (arr.length > 0) {
      const totalArray = arr;
    if (filterRecords === null && arr.length >= 5) {
      statusTop5 = true;
      arr = arr.slice(0, 5); // TOP 5 & status = 2
    }
    if (filterRecords && arr.length >= 20) {
      arr = arr.slice(0, 20); // TOP 20
    }

    // Data
    arr.forEach((element) => general.validateNulltoEmptyString(element));
    arr.forEach((obj) => {
      myJson.push({
        seriesid: obj.seriesid,
        investor_cik: obj.investor_cik,
        voting_investor_ids: obj.voting_investor_ids.includes(',')
          ? obj.voting_investor_ids.split(',')[0]
          : obj.voting_investor_ids,
        regName: obj.regName,
        seriesName: obj.seriesName,
        balance: obj.balance,
        valUSD: obj.valUSD,
        ReppdDate: obj.ReppdDate !== '' ? dateFormat(obj.ReppdDate, 'dd-mm-yy', true) : '',
        voting_managers: obj.voting_managers.includes('/') ? obj.voting_managers.split('/')[0] : obj.voting_managers,
      });
    });

    const ttl_balance = totalArray.map((bill) => Number(bill.balance)).reduce((acc, bill) => Number(bill) + acc);
    const ttl_valUSD = totalArray.map((bill) => Number(bill.valUSD)).reduce((acc, bill) => Number(bill) + acc);

    const myJsonTotal = [
      {
        seriesid: '',
        investor_cik: '',
        voting_investor_ids: '',
        regName: 'Total',
        seriesName: '',
        balance: general.NumberFormatFn(ttl_balance),
        valUSD: general.NumberFormatFn(ttl_valUSD),
        ReppdDate: '',
        voting_managers: '',
      },
    ];

    res.json({
      data: myJson,
      heading: myJsonHeading,
      dataFooter: myJsonTotal,
      statusTop5,
    });
    } else {
      res.json({
        data: myJson,
        heading: myJsonHeading,
        dataFooter: [],
        statusTop5,
      });
    }
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getOwnershipLongFundData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getOwnershipShortInvestorData(req, res, next) {
  try {
    const { filterRecords } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('proxy_insight.dbo.GetOwnershipShortInvestorData_Insightia');
    let arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    let statusTop5 = false;

    // Heading
    myJsonHeading = {
      voting_managers: 'Voting Manager',
      top_20_investor: 'Top 20 Investors',
      all_investor: 'All Investors',
      balance: 'Shares',
      valUSD: "Value($000's)",
      ReppdDate: 'As At:',
    };
    if (arr.length > 0) {
      const totalArray = arr;
    if (filterRecords === null && arr.length >= 5) {
      statusTop5 = true;
      arr = arr.slice(0, 5); // TOP 5 & status = 2
    }
    if (filterRecords && arr.length >= 20) {
      arr = arr.slice(0, 20); // TOP 20
    }

    // Data
    arr.forEach((element) => general.validateNulltoEmptyString(element));
    arr.forEach((obj) => {
      myJson.push({
        voting_investor_ids: obj.voting_investor_ids.includes(',')
          ? obj.voting_investor_ids.split(',')[0]
          : obj.voting_investor_ids,
        voting_managers: obj.voting_managers.includes('/') ? obj.voting_managers.split('/')[0] : obj.voting_managers,
        balance: obj.balance,
        valUSD: obj.valUSD,
        ReppdDate: obj.ReppdDate !== '' ? dateFormat(obj.ReppdDate, 'dd-mm-yy', true) : '',
      });
    });

    const ttl_balance = totalArray.map((bill) => Number(bill.balance)).reduce((acc, bill) => Number(bill) + acc);
    const ttl_valUSD = totalArray.map((bill) => Number(bill.valUSD)).reduce((acc, bill) => Number(bill) + acc);

    const myJsonTotal = [
      {
        voting_investor_ids: '',
        voting_managers: 'Total',
        balance: general.NumberFormatFn(ttl_balance),
        valUSD: general.NumberFormatFn(ttl_valUSD),
        ReppdDate: '',
      },
    ];

    res.json({
      data: myJson,
      heading: myJsonHeading,
      dataFooter: myJsonTotal,
      statusTop5,
    });
    } else {
      res.json({
        data: myJson,
        heading: myJsonHeading,
        dataFooter: [],
        statusTop5,
      });
    }
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getOwnershipShortInvestorData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getOwnershipShortFundData(req, res, next) {
  try {
    const { filterRecords } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('proxy_insight.dbo.GetOwnershipShortFundData_Insightia');
    let arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];
    let statusTop5 = false;

    // Heading
    myJsonHeading = {
      regName: 'Registrant',
      all_regName: 'All Funds',
      top_20_regName: 'Top 20 Funds',
      seriesName: 'Series',
      balance: 'Shares',
      valUSD: 'Value ($)',
      ReppdDate: 'As at:',
      voting_managers: 'Voting Manager',
    };
    if (arr.length > 0) {
      const totalArray = arr;
      if (filterRecords === null && arr.length >= 5) {
        statusTop5 = true;
        arr = arr.slice(0, 5); // TOP 5 & status = 2
      }
      if (filterRecords && arr.length >= 20) {
        arr = arr.slice(0, 20); // TOP 20
      }

      // Data
      arr.forEach((element) => general.validateNulltoEmptyString(element));
      arr.forEach((obj) => {
        myJson.push({
          investor_cik: obj.investor_cik,
          voting_investor_ids: obj.voting_investor_ids,
          regName: obj.regName,
          seriesName: obj.seriesName,
          balance: obj.balance,
          valUSD: obj.valUSD,
          ReppdDate: obj.ReppdDate !== '' ? dateFormat(obj.ReppdDate, 'dd-mm-yy', true) : '',
          voting_managers: obj.voting_managers,
        });
      });

      const ttl_balance = totalArray.map((bill) => Number(bill.balance)).reduce((acc, bill) => Number(bill) + acc);
      const ttl_valUSD = totalArray.map((bill) => Number(bill.valUSD)).reduce((acc, bill) => Number(bill) + acc);

      const myJsonTotal = [
        {
          voting_investor_ids: '',
          investor_cik: '',
          regName: 'Total',
          seriesName: '',
          balance: general.NumberFormatFn(ttl_balance),
          valUSD: general.NumberFormatFn(ttl_valUSD),
          ReppdDate: '',
          voting_managers: '',
        },
      ];

      res.json({
        data: myJson,
        heading: myJsonHeading,
        dataFooter: myJsonTotal,
        statusTop5,
      });
    } else {
      res.json({
        data: myJson,
        heading: myJsonHeading,
        dataFooter: [],
        statusTop5,
      });
    }
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getOwnershipShortFundData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

//  Company Overview - Stock Graph
async function GetStockValues_graph(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.company_id)
      .execute('GetStockValues_graph');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetStockValues_graph`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

//  Company Overview - Lollipops Graph
async function GetLollipops_graph(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('company_id', sql.Int, req.body.company_id).execute('GetLollipops_graph');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/GetLollipops_graph`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}
// #endregion

// #region Activism > Activist campaign
function commonCampaign(result_ActivistCampaigns) {
  let table_ActivistCampaignSummary = [];
  let table_PublicDemandDetail = [];
  let header_ActivistCampaignSummary = [];
  let table_ActivistCampaignCharacteristics = [];
  let table_Filings = [];
  let table_ActivistCampaignTimeline = [];
  let table_Theses = [];
  let table_ShareholderProposals = [];
  let table_Advisors = [];
  let table_StockPerformance = [];
  let table_News = [];

  if (
    result_ActivistCampaigns.recordsets !== undefined &&
    result_ActivistCampaigns.recordsets.length > 0
  ) {
    table_ActivistCampaignSummary =
      result_ActivistCampaigns.recordsets[2] !== undefined
        ? result_ActivistCampaigns.recordsets[2]
        : [];
    if (table_ActivistCampaignSummary.length > 0) {
      table_ActivistCampaignSummary.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }
    table_PublicDemandDetail =
      result_ActivistCampaigns.recordsets[4] !== undefined
        ? result_ActivistCampaigns.recordsets[4]
        : [];
    if (table_PublicDemandDetail.length > 0) {
      table_PublicDemandDetail.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    table_ActivistCampaignCharacteristics =
      result_ActivistCampaigns.recordsets[3] !== undefined
        ? result_ActivistCampaigns.recordsets[3]
        : [];
    if (table_ActivistCampaignCharacteristics.length > 0) {
      table_ActivistCampaignCharacteristics.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    table_Filings =
      result_ActivistCampaigns.recordsets[11] !== undefined
        ? result_ActivistCampaigns.recordsets[11]
        : [];
    if (table_Filings.length > 0) {
      table_Filings.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    table_ActivistCampaignTimeline =
      result_ActivistCampaigns.recordsets[5] !== undefined
        ? result_ActivistCampaigns.recordsets[5]
        : [];
    if (table_ActivistCampaignTimeline.length > 0) {
      table_ActivistCampaignTimeline.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    table_Theses =
      result_ActivistCampaigns.recordsets[6] !== undefined
        ? result_ActivistCampaigns.recordsets[6]
        : []; //
    if (table_Theses.length > 0) {
      table_Theses.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    table_ShareholderProposals =
      result_ActivistCampaigns.recordsets[7] !== undefined
        ? result_ActivistCampaigns.recordsets[7]
        : [];
    if (table_ShareholderProposals.length > 0) {
      table_ShareholderProposals.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    table_Advisors =
      result_ActivistCampaigns.recordsets[8] !== undefined
        ? result_ActivistCampaigns.recordsets[8]
        : [];
    if (table_Advisors.length > 0) {
      table_Advisors.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    table_StockPerformance =
      result_ActivistCampaigns.recordsets[9] !== undefined
        ? result_ActivistCampaigns.recordsets[9]
        : [];
    if (table_StockPerformance.length > 0) {
      table_StockPerformance.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }

    // #region News section
    const temp_table_News = [];
    if (result_ActivistCampaigns.recordsets[10] !== undefined) {
      const uniqueArray = [];
      result_ActivistCampaigns.recordsets[10].forEach((element) => {
        if (!uniqueArray.find((x) => x.news_id === element.news_id)) {
          uniqueArray.push(element);
        }
      });

      uniqueArray.map((x) => {
        let textShortArticle = '';
        const article =
          x.news_article
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
          newsid: x.news_id,
          img: x.image_filename,
          newsDate:
            x.news_date !== null
              ? general.dateToNull(x.news_date, 'd mmmm yyyy')
              : null,
          headLine: x.news_headline,
          article: article !== null ? article.join('</br>') : null,
          shortArticle: textShortArticle && textShortArticle
            .replace(/HREF/g, 'target="_blank" HREF')
            .replace(/href/g, 'target="_blank" href'),
          visited: x.viewed,
          readOnly: false,
          activism_type: x.activism_type,
          module: x.module,
          categories: x.categories,
          Investors: x.Investors,
          campaign_name: x.campaign_name,
          grouped_joint_demand: x.grouped_joint_demand,
          investor_id: x.investor_id,
          source_link: x.source_link
        };
        temp_table_News.push(myJsonArry);
      });
    }
    table_News = temp_table_News.length > 0 ? temp_table_News : [];
    if (table_News.length > 0) {
      table_News.forEach((element) =>
        general.validateNulltoEmptyString(element)
      );
    }
    // #endregion

    header_ActivistCampaignSummary = [
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
  }
  return {
    table_ActivistCampaignSummary,
    table_PublicDemandDetail,
    header_ActivistCampaignSummary,
    table_ActivistCampaignCharacteristics,
    table_Filings,
    table_ActivistCampaignTimeline,
    table_Theses,
    table_ShareholderProposals,
    table_Advisors,
    table_StockPerformance,
    table_News,
    table_NewsId: table_News.length > 0 ? table_News.map((x) => x.newsid) : [],
  };
}
async function getActivistCampaignsDataList(req, res, next) {
  try {
    const pool = await poolPromise;
    const getCompanyId = await pool.request().input('pid', sql.Int, req.body.pid).execute('getCompanyId');
    const CompanyId =
      getCompanyId.recordset !== undefined && getCompanyId.recordset !== null
        ? getCompanyId.recordset.length > 0
          ? getCompanyId.recordset[0].company_id.toString()
          : null
        : null;

    const result_ActivistCampaigns = await pool
      .request()
      .input('indiv_campaigns', sql.VarChar, req.body.indiv_campaigns)
      .input('company_id', sql.Int, CompanyId)
      .input('show_other_campaigns', sql.Bit, req.body.show_other_campaigns)
      .execute('getCompanyGroupedJointDemandsPageData_insightia');

    const myJsonDDLCampaign = [];
    const myJsonDDLNewCampaign = [];
    if (result_ActivistCampaigns.recordsets !== undefined && result_ActivistCampaigns.recordsets.length > 0) {
      if (result_ActivistCampaigns.recordsets[0].length > 0) {
        result_ActivistCampaigns.recordsets[0].forEach((obj) => {
          myJsonDDLCampaign.push({
            label: obj.campaign_name,
            value: obj.campaign_linking_id !== null ? obj.campaign_linking_id.toString() : null,
          });
          myJsonDDLNewCampaign.push({
            label: obj.campaign_name,
            value: obj.campaign_linking_id !== null ? obj.campaign_linking_id.toString() : null,
          });
        });
      }
    }

    const result_ActivistCampaigns_Timelines = await pool
      .request()
      .input('company_id', sql.Int, CompanyId)
      .execute('WebCompA_Get_Timelines');
    if (
      result_ActivistCampaigns.recordsets !== undefined &&
      result_ActivistCampaigns.recordsets.length > 0
    ) {
      result_ActivistCampaigns.recordsets[5] =
        result_ActivistCampaigns_Timelines.recordset;
    }
    // if (myJsonDDLCampaign.length === 0) {
    //   DDLCampaign = [];
    // }
    const data = await commonCampaign(result_ActivistCampaigns);
    res.json({ ...data, myJsonDDLNewCampaign });
  } catch (e) {
    general.ErrorLog(`${companyroutes}/getActivistCampaignsDataList`, e, req.user.User_Id, req.body, req.headers.origin);
    console.log(e.lineNumber, `-----------------\n${e.procName}\n---------------------`);
    console.error(e.message);
  }
}
async function getActivistCampaignsDataListV2(req, res, next) {
  try {
    const pool = await poolPromise;
    const getCompanyId = await pool.request().input('pid', sql.Int, req.body.pid).execute('getCompanyId');
    const CompanyId =
      getCompanyId.recordset !== undefined && getCompanyId.recordset !== null
        ? getCompanyId.recordset.length > 0
          ? getCompanyId.recordset[0].company_id.toString()
          : null
        : null;

    const result_ActivistCampaigns = await pool
      .request()
      .input('indiv_campaigns', sql.VarChar, req.body.indiv_campaigns)
      .input('company_id', sql.Int, CompanyId)
      .input('show_other_campaigns', sql.Bit, req.body.show_other_campaigns)
      .input('user_id', sql.Int, req.body.user_id)
      .input('resultset', sql.Int, req.body.resultset)
      .execute('getCompanyGroupedJointDemandsPageData_insightia_v2');

    const myJsonDDLCampaign = [];
    const myJsonDDLNewCampaign = [];
    if (result_ActivistCampaigns.recordsets !== undefined && result_ActivistCampaigns.recordsets.length > 0) {
      if (result_ActivistCampaigns.recordsets[0].length > 0) {
        result_ActivistCampaigns.recordsets[0].forEach((obj) => {
          myJsonDDLCampaign.push({
            label: obj.campaign_name.replaceAll('#| ', ', '),
            value: obj.campaign_linking_id !== null ? obj.campaign_linking_id.toString() : null,
          });
          myJsonDDLNewCampaign.push({
            label: obj.campaign_name.replaceAll('#| ', ', '),
            value: obj.campaign_linking_id !== null ? obj.campaign_linking_id.toString() : null,
          });
        });
      }
    }
    if (req.body.isOverviewPage) {
      const result_ActivistCampaigns_Timelines = await pool
        .request()
        .input('company_id', sql.Int, CompanyId)
        .execute('WebCompA_Get_Timelines');
      if (
        result_ActivistCampaigns.recordsets !== undefined &&
        result_ActivistCampaigns.recordsets.length > 0
      ) {
        result_ActivistCampaigns.recordsets[5] =
          result_ActivistCampaigns_Timelines.recordset;
      }
    }
    // if (myJsonDDLCampaign.length === 0) {
    //   DDLCampaign = [];
    // }

    const data = await commonCampaign(result_ActivistCampaigns);
    res.json({ ...data, myJsonDDLNewCampaign });
  } catch (e) {
    general.ErrorLog(`${companyroutes}/getActivistCampaignsDataListV2`, e, req.user.User_Id, req.body, req.headers.origin);
    console.log(e.lineNumber, `-----------------\n${e.procName}\n---------------------`);
    console.error(e.message);
  }
}

async function VunSummaryScore(req, res, next) {
  try {
    let resObj = {};
    const pool = await poolPromise;
    const result = await pool.request().input('PID', sql.Int, req.body.pid).execute('PIGetIssuer');
    if (result.recordset.length > 0) {
      resObj = {
        score_data: result.recordset[0].score && Number(result.recordset[0].score).toFixed(1),
        score: result.recordset[0].prank && Math.round(result.recordset[0].prank),
        ranking: result.recordset[0].vulnerability_rating && result.recordset[0].vulnerability_rating,
        colour: result.recordset[0].colour && result.recordset[0].colour,
        max_score: 100,
      };
    } else {
      resObj = {
        score_data: '',
        score: '',
        ranking: '',
        colour: '',
        max_score: ''
      };
    }
    res.json(resObj);
  } catch (error) {
    general.ErrorLog(`${companyroutes}/VunSummaryScore`, error, req.user.User_Id, req.body, req.headers.origin);
  }
}

// Activist Investment
async function getActivistInvestorsForCompany(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.company_id)
      .execute('ListActivistInvestorsForCompany_NEW');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getActivistInvestorsForCompany`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getActivistNotifiedHolding(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('company_id', sql.Int, req.body.company_id)
      .execute('ListNotifiedHoldings_insight');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getActivistNotifiedHolding`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
    res.json([]);
  }
}

// #endregion

// #region Activism > Activist campaign

async function getActivistCampaignsDDL(req, res, next) {
  try {
    const pool = await poolPromise;
    const getCompanyId = await pool.request().input('pid', sql.Int, req.body.pid).execute('getCompanyId');
    const CompanyId = getCompanyId.recordset !== undefined ? getCompanyId.recordset[0].company_id.toString() : null;

    const result_ddlCampaign = await pool
      .request()
      .input('indiv_campaigns', sql.VarChar, req.body.indiv_campaigns)
      .input('company_id', sql.Int, CompanyId)
      .input('show_other_campaigns', sql.Bit, req.body.show_other_campaigns)
      .execute('getCompanyGroupedJointDemandsPageData_insightia');

    const myJsonDDLCampaign = [];
    if (result_ddlCampaign.recordsets[0].length > 0 && result_ddlCampaign.recordsets !== undefined) {
      result_ddlCampaign.recordsets[0].forEach((obj) => {
        myJsonDDLCampaign.push({
          label: obj.campaign_name,
          value: obj.campaign_linking_id !== null ? obj.campaign_linking_id.toString() : null,
        });
      });
    }

    if (myJsonDDLCampaign.length === 0) {
      return res.json({
        DDLCampaign: [],
      });
    }
    res.json({
      DDLCampaign: [
        {
          label: 'All',
          value: '0',
          children: myJsonDDLCampaign,
          checked: true,
          expanded: true,
        },
      ],
    });
  } catch (e) {
    general.ErrorLog(
      `${companyroutes}/getActivistCampaignsDDL`,
      e,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
    console.log(e.lineNumber, `-----------------\n${e.procName}\n---------------------`);
    console.error(e.message);
  }
}

// Get Activism Short Module Access
async function getActivistShortSubModuleAccess(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('pid', sql.Int, req.body.pid).execute('GetActivismShortSubModuleAccess');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/getActivistShortSubModuleAccess`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function addTrialPageLog(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('user_id', sql.Int, req.body.user_id)
      .input('type', sql.VarChar, req.body.type)
      .input('pid', sql.Int, req.body.id)
      .execute('AddTrialPageLog_insightia');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/addTrialPageLog`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function sendMailToTeam(req, res, next) {
  try {
    sendMail(
      'salesteam@insightia.com',
      req.body.subject,
      DemoRequestMail(req.body.user_id, req.body.url, req.body.email, req.body.number_profile, req.body.trialUser)
    );
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/sendMailToTeam`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function getOwnershipLongShortInvestorDataCheck(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('proxy_insight.dbo.GetOwnershipLongShortDataCheck_Insightia');
    res.json(result.recordset[0]);
  } catch (error) {
    console.log(error);
    general.ErrorLog(
      `${companyroutes}/getOwnershipLongShortInvestorDataCheck`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetActivistShortCampaignAdvisersData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input('campaign_id', sql.Int, req.body.campaign_id).execute('GetAdvisersAiS');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetActivistShortCampaignAdvisersData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetInvestorIdFromCampaignId(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('campaign_id', sql.Int, req.body.campaign_id)
      .execute('GetInvestorIdFromCampaignId');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetInvestorIdFromCampaignId`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetPeerGroupDefaultName(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('getPeerGroupName');
    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetPeerGroupDefaultName`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function UpdateCompanyVunScore(req, res, next) {
  try {
    const pool = await poolPromise;
    let AdHocSetId = 0;
    async function CalcNewScores() {
      try {
        let NoRecs = 0;
        let ROAECount = 0;
        let MADM = 0;
        let NoCompsToPR = 0;
        let MedianProb = 0;
        const pool = await poolPromise;
        const resultAdHocSet = await pool.request().execute('VunCreateAdHocSet');
        if (resultAdHocSet.recordset.length > 0) {
          AdHocSetId = resultAdHocSet.recordset[0].ad_hoc_set_id;
        }
        await pool
            .request()
            .input('searchid', sql.Int, req.body.cmp_search_id)
            .input('pid', sql.Int, req.body.pid)
            .input('ad_hoc_set_id', sql.Int, AdHocSetId)
            .execute('VunPutCustomSearchIntoAdHocSet');

              //#region 
        // VunPutCustomSearchIntoAdHocSet
        // if (VCId > 0) {
        //   const resultVunGetComparisonSpec = await pool
        //     .request()
        //     .input('vulnerability_comparison_id', sql.Int, VCId)
        //     .execute('VunGetComparisonSpec');
        //   if (resultVunGetComparisonSpec.recordset.length > 0) {
        //     SQLQuery_CalcNewScores = `INSERT INTO tmpVulScoreCalcsAdHoc (ad_hoc_set_id, PID, Company_name) ${resultVunGetComparisonSpec.recordset[0].company_query} ORDER BY Company_name`;
        //     if (lblNoCompanies2_Visible) {
        //       SQLQuery_CalcNewScores = SQLQuery_CalcNewScores.replace(
        //         'SELECT DISTINCT tblissuer.PID',
        //         `SELECT DISTINCT TOP ${prpGetMaxComparisons.toString()} ${AdHocSetId.toString()} , tblissuer.PID, Company_name`
        //       );
        //       SQLQuery_CalcNewScores = SQLQuery_CalcNewScores.replace(
        //         'SELECT tblVulnerability_comparison_companies.pid',
        //         `SELECT TOP ${prpGetMaxComparisons.toString()} ${AdHocSetId.toString()} , tblVulnerability_comparison_companies.pid, Company_name`
        //       );
        //     } else {
        //       SQLQuery_CalcNewScores = SQLQuery_CalcNewScores.replace(
        //         'SELECT DISTINCT tblissuer.PID',
        //         `SELECT DISTINCT ${AdHocSetId.toString()}, tblissuer.PID, Company_name`
        //       );
        //       SQLQuery_CalcNewScores = SQLQuery_CalcNewScores.replace(
        //         'SELECT tblVulnerability_comparison_companies.pid',
        //         `SELECT ${AdHocSetId.toString()}, tblVulnerability_comparison_companies.pid, Company_name`
        //       );
        //     }
        //   }
        //   await pool.request().query(SQLQuery_CalcNewScores);
        // } else {
        //   await pool
        //     .request()
        //     .input('vulnerability_comparison_id', sql.Int, (VCId * -1).toString())
        //     .execute('VunPutCustomPeerGroupIntoAdHocSet');
        // }
        //#endregion

        const resultVunAdHocRescoreStartProcess = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocRescoreStartProcess');
        if (resultVunAdHocRescoreStartProcess.recordset.length > 0) {
          NoRecs = resultVunAdHocRescoreStartProcess.recordset[0].RecCount;
        }

        const resultVunAdHocCountROAEToPercentileRank = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocCountROAEToPercentileRank');
        if (resultVunAdHocCountROAEToPercentileRank.recordset.length > 0) {
          ROAECount = resultVunAdHocCountROAEToPercentileRank.recordset[0].RecCount;
        }

        const resultVunAdHocListROAEToPercentileRank = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocListROAEToPercentileRank');
        if (resultVunAdHocListROAEToPercentileRank.recordset.length > 0) {
          let index = 0;
          // eslint-disable-next-line no-restricted-syntax
          for (const element of resultVunAdHocListROAEToPercentileRank.recordset) {
            index += 1;
            const PercentileRank = (index / ROAECount) * 100.0;

            await pool
              .request()
              .input('PID', sql.Int, element.PID)
              .input('ad_hoc_set_id', sql.Int, AdHocSetId)
              .input('ROAE_Pntl', sql.Decimal(18, 8), PercentileRank)
              .execute('VunAdHocSetROAEPercentileRank');
          }
        }

        // Update ROAE_Pntl
        await pool.request().input('ad_hoc_set_id', sql.Int, AdHocSetId).execute('VunAdHocSetNullROAEPercentileTo50');
        const resultVunAdHocCountTSR1ToPercentileRank = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocCountTSR1ToPercentileRank');
        if (resultVunAdHocCountTSR1ToPercentileRank.recordset.length > 0) {
          ROAECount = resultVunAdHocCountTSR1ToPercentileRank.recordset[0].RecCount;
        }

        const resultVunAdHocListTSR1ToPercentileRank = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocListTSR1ToPercentileRank');
        if (resultVunAdHocListTSR1ToPercentileRank.recordset.length > 0) {
          let index = 0;
          // eslint-disable-next-line no-restricted-syntax
          for (const element of resultVunAdHocListTSR1ToPercentileRank.recordset) {
            index += 1;
            const PercentileRank = (index / ROAECount) * 100.0;
            await pool
              .request()
              .input('pid', sql.Int, element.PID)
              .input('ad_hoc_set_id', sql.Int, AdHocSetId)
              .input('TSR1_Pntl', sql.Decimal(18, 8), PercentileRank)
              .execute('VunAdHocSetTSR1PercentileRank');
          }
        }

        await pool.request().input('ad_hoc_set_id', sql.Int, AdHocSetId).execute('VunAdHocSetNullTSR1PercentileTo50');
        const resultVunAdHocListAllScoringParameters = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocListAllScoringParameters');
        if (resultVunAdHocListAllScoringParameters.recordset.length > 0) {
          // eslint-disable-next-line no-restricted-syntax
          for (const element of resultVunAdHocListAllScoringParameters.recordset) {
            const { PID, IO, AO, ROAE_Pntl, TSR1_Pntl } = element;
            const C1 =
              -3.603633549 + 0.005396722 * IO + 0.01334804 * AO + -0.002948911 * ROAE_Pntl + -0.006057689 * TSR1_Pntl;
            const Score = Math.exp(C1) / (1 + Math.exp(C1));
            await pool
              .request()
              .input('PID', sql.Int, PID)
              .input('ad_hoc_set_id', sql.Int, AdHocSetId)
              .input('Prob', sql.Decimal(18, 8), Score)
              .execute('VunAdHocStoreProb');
          }
        }

        const resultVunAdHocCalcMedianProb = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocCalcMedianProb');
        if (resultVunAdHocCalcMedianProb.recordset.length > 0) {
          MedianProb = resultVunAdHocCalcMedianProb.recordset[0].MedProb;
        }

        await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .input('MedProb', sql.Decimal(18, 8), MedianProb)
          .execute('VunAdHocCalcProbDiff');
        const resultVunAdHocCalcMADM = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .input('prob_median', sql.Decimal(18, 8), MedianProb)
          .execute('VunAdHocCalcMADM');
        if (resultVunAdHocCalcMADM.recordset.length > 0) {
          MADM = resultVunAdHocCalcMADM.recordset[0].MADM;
        }
        await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .input('MedProb', sql.Decimal(18, 8), MedianProb)
          .input('MADM', sql.Decimal(18, 8), MADM)
          .execute('VunAdHocCalcScore');
        const resultVunAdHocCountScoresToPercentileRank = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocCountScoresToPercentileRank');
        if (resultVunAdHocCountScoresToPercentileRank.recordset.length > 0) {
          NoCompsToPR = resultVunAdHocCountScoresToPercentileRank.recordset[0].NoRecs;
        }

        const resultVunAdHocListScoresToPercentileRank = await pool
          .request()
          .input('ad_hoc_set_id', sql.Int, AdHocSetId)
          .execute('VunAdHocListScoresToPercentileRank');
        if (resultVunAdHocListScoresToPercentileRank.recordset.length > 0) {
          let index = 0;
          // eslint-disable-next-line no-restricted-syntax
          for (const element of resultVunAdHocListScoresToPercentileRank.recordset) {
            // Update PRank
            index += 1;
            if (element.Src.toString() === '1') {
              const PercentileRank = (index / NoCompsToPR) * 100.0;
              await pool
                .request()
                .input('PID', sql.Int, element.PID)
                .input('ad_hoc_set_id', sql.Int, AdHocSetId)
                .input('PRank', sql.Decimal(18, 8), PercentileRank)
                .execute('VunAdHocSetScorePercentileRank');
            }
          }
        }
        return {
          AdHocSetId,
          NoRecs,
          ROAECount,
          MedianProb,
          MADM,
          NoCompsToPR,
        };
      } catch (e) {
        general.ErrorLog(
          `${companyroutes}/CalcNewScores`,
          e,
          req.user.User_Id,
          req.body,
          req.headers.origin
        );
      }
    }
    await CalcNewScores();
    const result = await pool
    .request()
    .input('ad_hoc_set_id', sql.Int, AdHocSetId)
    .input('pid', sql.Int, req.body.pid)
    .execute('VunAdHocGetSingleScoreAndPRank');
    const data = [];
    result.recordset.filter((item) => {
      data.push({
        ranking: item.vulnerability_rating,
        score_data: item.Score !== null ? item.Score.toFixed(1) : 0,
        max_score: 100,
        score: item.PRank !== null ? item.PRank.toFixed(0) : 0
      });
    });
    res.json(data);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/UpdateCompanyVunScore`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetAdmGetCompanyShell_spac(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('pid', sql.Int, req.body.pid)
    .execute('AdmGetCompanyShell_spac');

    res.json(result.recordset);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetAdmGetCompanyShell_spac`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
// async function GetUpcomingDeparturesDirector(req, res, next) {
//   try {
//     const pool = await poolPromise;
//     const result = await pool
//       .request()
//       .input('pid', sql.Int, req.pid)
//       .input('director_id', sql.Int, req.director_id)
//       .execute('Get_Upcoming_Departures_director');
//     return result.recordset;
//   } catch (error) {
//     general.ErrorLog(`${companyroutes}/GetUpcomingDeparturesDirector`, error, req.user.User_Id, req.body, req.headers.origin);
//   }
// }

async function GetCompanyActivisamTabDataCheck(req, res, next) {
try {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('company_id', sql.Int, req.body.company_id)
    .input('activist_id', sql.Int, req.body.activist_id)
    .execute('GetCompanyActivismTabDataCheck_insightia');
  res.json(result.recordset[0]);
} catch (error) {
  general.ErrorLog(
    `${companyroutes}/GetCompanyActivisamTabDataCheck`,
    error,
    req.user.User_Id,
    req.body,
    req.headers.origin
  );
}
}

async function GetHistoricalGovernance(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('GetHistoricalGovernance');
    res.json(result.recordset ? result.recordset : []);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetHistoricalGovernance`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetSplitVotingDetails(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .input('proposal_id', sql.Int, req.body.proposal_id)
      .input('prev_meeting_id', sql.Int, req.body.prev_meeting_id)
      .input('prev_proposal_id', sql.Int, req.body.prev_proposal_id)
      .execute('proxy_insight.dbo.ListVotingAndOwnerhipForProposal_insightia');
      const data = result.recordsets[2];
      const finalData = [];
      data.filter((item) => {
        if (item.investor_id === req.body.investor_id) {
          finalData.push(item);
        }
      });
    res.json(finalData);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetSplitVotingDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetVotingData_rationale_meeting(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('meeting_id', sql.Int, req.body.meeting_id)
      .execute('proxy_insight.dbo.WebCompV_VoteDetails_Rationale_Meeting_Data');
    const arr = result.recordset;
    const myJson = [];
    let myJsonHeading = [];

    // Heading
    myJsonHeading = {
      heading: [
        {
          investor_id: 'investor_id',
          manager: 'Voting Manager',
          proposal_number_orig: 'No.',
          proposal_detail: 'Proposal Detail',
          vote_cast: 'Vote Cast',
          vote_reason: 'Rationale',
        },
      ],
    };

    // Data
    arr.forEach((obj) => {
      myJson.push({
        investor_id: obj.investor_id !== null && obj.investor_id !== undefined ? obj.investor_id : '',
        manager: obj.manager !== null && obj.manager !== undefined ? obj.manager : '',
        proposal_number_orig:
          obj.proposal_number_orig !== null && obj.proposal_number_orig !== undefined ? obj.proposal_number_orig : '',
        proposal_detail: obj.proposal_detail !== null && obj.proposal_detail !== undefined ? obj.proposal_detail : '',
        vote_cast: obj.vote_cast !== null && obj.vote_cast !== undefined ? obj.vote_cast : '',
        vote_reason: obj.vote_reason !== null && obj.vote_reason !== undefined ? obj.vote_reason : '',
      });
    });

    res.json({ data: myJson, heading: myJsonHeading.heading[0] });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetVotingData_rationale_meeting_against`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCompensationReportYears(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('GetReportYears_Insightia');
      const data = result.recordset;
      const uniqueYear = [...new Set(data.map((item) => item.report_year))];
      uniqueYear.sort((a, b) => b - a);
      const yearData = [];
      uniqueYear.filter((year) => {
        yearData.push({
          label: year,
          value: year
        });
      });
    res.json(result.recordset ? { yearData: yearData } : []);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensationReportYears`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCompensationPerformanceMetricBreakDown(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .input('director_appointment_id', sql.Int, req.body.director_appointment_id)
      .input('year', sql.Int, req.body.year)
      .execute('getperformancemetricbreakdown_insightia');
      const data = result.recordset;
      const newArray = [];
      const uniqueYear = [...new Set(data.map((item) => item.report_year))];
      const yearData = [];
      uniqueYear.filter((year) => {
        yearData.push({
          label: year,
          value: year
        });
      });
      data.filter((item, i) => {
        let updated = false;
        const addData = () => {
          const obj = {};
        const objData = {};
        obj['director_id'] = item['Director ID'];
        obj['director_name'] = item['Director'];
        obj['position'] = item['position'];
        obj['report_year'] = item['report_year'];
        obj['item_id'] = i;
        objData['plan'] = item['Plan'];
        objData['incentive_type'] = item['Incentive Type'];
        objData['bonus_type'] = item['Bonus Type'];
        objData['metric'] = item['Metric'];
        objData['weighting'] = item['Weighting'];
        objData['target'] = item['Target'];
        objData['unit'] = item['Unit'];
        objData['threshold'] = item['Threshold'];
        objData['maximum_requirment'] = item['Maximum Requirment'];
        obj['data'] = [objData];
        newArray.push(obj);
        };
        if (newArray.length > 0) {
          newArray.filter((subItem) => {
            const uniqueData = [...new Set(newArray.map((item1) => item1.director_id))];
            if (uniqueData.includes(item['Director ID'])) {
              if (item['Director ID'] === subItem.director_id) {
                const obj = {};
                const objData = {};
                objData['plan'] = item['Plan'];
                objData['incentive_type'] = item['Incentive Type'];
                objData['bonus_type'] = item['Bonus Type'];
                objData['metric'] = item['Metric'];
                objData['weighting'] = item['Weighting'];
                objData['target'] = item['Target'];
                objData['unit'] = item['Unit'];
                objData['threshold'] = item['Threshold'];
                objData['maximum_requirment'] = item['Maximum Requirment'];
                obj['data'] = [objData];
                subItem.data.push(objData);
                updated = true;
              }
            } else {
              if (!updated) {
                addData();
              }
            }
          });
        } else {
          if (!updated) {
            addData();
          }
        }
      });
    res.json(result.recordset ? { data: newArray, yearData: yearData } : []);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensationPerformanceMetricBreakDown`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCompensationExecutivePayData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('GetExecutivePayGranted_Insightia');

    const result1 = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('GetExecutivePayRealised_Insightia');
    const result2 = await pool
      .request()
      .input('pid', sql.Int, req.body.pid)
      .execute('GetExecutivePayOutstanding_Insightia');

      const dataGranted = result.recordsets.length > 0 && result.recordsets[0].length > 0 ? result.recordsets[0] : [{ records: 0 }];
      const nonExecutiveDirectorGranted = dataGranted[0].records === 0 ? [] : result.recordsets[2];
      const HighestTotalGranted = dataGranted[0].records === 0 ? [] : result.recordsets[1];
      const nonExecutiveDListGranted = dataGranted[0].records === 0 ? [] : result.recordsets[3];

      const dataRealized = result1.recordsets.length > 0 && result1.recordsets[0].length > 0 ? result1.recordsets[0] : [{ records: 0 }];
      const HighestTotalRealized = dataRealized[0].records === 0 ? [] : result1.recordsets[1];

      const dataOutstanding = result2.recordsets.length > 0 && result2.recordsets[0].length > 0 ? result2.recordsets[0] : [{ records: 0 }];
      const nonExecutiveDirectorOutstanding = dataOutstanding[0].records === 0 ? [] : result2.recordsets[2];
      const HighestTotalOutstanding = dataOutstanding[0].records === 0 ? [] : result2.recordsets[1];
      const nonExecutiveDListOutstanding = dataOutstanding[0].records === 0 ? [] : result2.recordsets[3];

      if (dataGranted[0].records === 0 && dataRealized[0].records === 0 && dataOutstanding[0].records === 0) {
        res.json(result.recordset ? { data: [], yearData: [], yearList: [], directorList: [] } : []);
      } else {
      const Dkeys = dataGranted[0].records !== 0 ? Object.keys(dataGranted[0]) : [];
      const yearKeyData = ['Yr1', 'Yr3', 'Yr5'];
      // const defaultKey = ['PID', 'director_name', 'Director_appoinment_id', 'director_id', 'director_type', 'element', 'elno', 'Yr1', 'Yr3', 'Yr5', 'start_year', 'end_year', 'year_of_pay'];
      const defaultKey = Dkeys.sort((a, b) => a - b).filter((item) => !isFinite(item));
      const uniqueDirectorsGranted = dataGranted[0].records !== 0 ? [...new Set(dataGranted.map((item) => item.Position))] : [];
      const uniqueDirectorsRealized = dataRealized[0].records !== 0 ? [...new Set(dataRealized.map((item) => item.Position))] : [];
      const uniqueDirectorsOutstanding = dataOutstanding[0].records !== 0 ? [...new Set(dataOutstanding.map((item) => item.Position))] : [];
      const mergeArray = [...uniqueDirectorsGranted, ...uniqueDirectorsRealized, ...uniqueDirectorsOutstanding];
      const finalUniqueDirectors = [...new Set(mergeArray.map((item) => item))];
      const GrantedKey = Object.keys(dataGranted[0]);
      const RealizedKey = Object.keys(dataRealized[0]);
      const OutstandinKey = Object.keys(dataOutstanding[0]);
      const allKeys = [...GrantedKey, ...RealizedKey, ...OutstandinKey];
      const finalYearKeys = allKeys.filter((item) => isFinite(item));
      const yearsData = [...new Set(finalYearKeys.map((item) => Number(item)))];
      const defaultKeyForData = defaultKey.filter((item) => !yearKeyData.some((subItem) => subItem === item));
      //create data Director position wise 
      const mergeData = [];
      finalUniqueDirectors.filter((item) => {
        const obj = { director_name: item };
        const data = [];
        const data1 = [];
        const data2 = [];
        if (dataGranted[0].records !== 0) {
          dataGranted.filter((subItem) => {
            const keys = Object.keys(subItem).filter((item) => !defaultKeyForData.some((subKey) => subKey === item));
            let updated = false;
            if (item === subItem.Position) {
              if (subItem.elno === 1) {
                if (data.length > 0) {
                  data.filter((item) => {
                    if (item.elno === 1) {
                      keys.filter((itemKey) => {
                        item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                      });
                      updated = true;
                    }
                  });
                }
                  if (!updated) {
                    data.unshift({ ...subItem, element: null, type: 'Total Granted Compensation*' });
                  }
              } else {
                // data['tableData'] = [{ ...subItem, type: 'Total Granted Compensation*' }];
                if (data.length > 0) {
                  data.filter((item) => {
                   if (item.elno === subItem.elno) {
                    keys.filter((itemKey) => {
                      item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                    });
                      updated = true;
                    }
                  });
                }
                if (!updated) {
                  data.push({ ...subItem, type: 'Total Granted Compensation*' });
                }
              }
            }
          });
        }
        if (dataRealized[0].records !== 0) {
          dataRealized.filter((subItem) => {
            const keys = Object.keys(subItem).filter((item) => !defaultKeyForData.some((subKey) => subKey === item));
            let updated = false;
            if (item === subItem.Position) {
              if (subItem.elno === 1) {
                if (data1.length > 0) {
                  data1.filter((item) => {
                    if (item.elno === 1) {
                      keys.filter((itemKey) => {
                        item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                      });
                      updated = true;
                    }
                  });
                }
                  if (!updated) {
                    data1.unshift({ ...subItem, element: null, type: 'Total Realised Compensation' });
                  }
              } else {
                // data['tableData'] = [{ ...subItem, type: 'Total Granted Compensation*' }];
                if (data1.length > 0) {
                  data1.filter((item) => {
                   if (item.elno === subItem.elno) {
                    keys.filter((itemKey) => {
                      item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                    });
                      updated = true;
                    }
                  });
                }
                if (!updated) {
                  data1.push({ ...subItem, type: 'Total Realised Compensation' });
                }
              }
            }
          });
        }
        if (dataOutstanding[0].records !== 0) {
          dataOutstanding.filter((subItem) => {
            const keys = Object.keys(subItem).filter((item) => !defaultKeyForData.some((subKey) => subKey === item));
            let updated = false;
            if (item === subItem.Position) {
              if (subItem.elno === 1) {
                if (data2.length > 0) {
                  data2.filter((item) => {
                    if (item.elno === 1) {
                      keys.filter((itemKey) => {
                        item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                      });
                      updated = true;
                    }
                  });
                }
                  if (!updated) {
                    data2.unshift({ ...subItem, element: null, type: 'Total Outstanding Compensation*' });
                  }
              } else {
                // data['tableData'] = [{ ...subItem, type: 'Total Granted Compensation*' }];
                if (data2.length > 0) {
                  data2.filter((item) => {
                   if (item.elno === subItem.elno) {
                    keys.filter((itemKey) => {
                      item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                    });
                      updated = true;
                    }
                  });
                }
                if (!updated) {
                  data2.push({ ...subItem, type: 'Total Outstanding Compensation*' });
                }
              }
            }
          });
        }
        obj['tableData'] = [...data, ...data1, ...data2];
        mergeData.push(obj);
      });
      //
      const yearData = [];
      yearsData.filter((item, index) => {
        yearData.push({
          label: `${index + 1} Years`,
          value: Number(index + 1)
        });
      });
      const date = new Date().getFullYear();
      const ddlYears = yearsData.sort((a, b) => (b - a)).slice(0, 6);
      const ddlYear = yearData.slice(0, 6);
      //directo list
      const directorList = [];
      mergeData.filter((item) => {
        const directorLists = [...new Set(item.tableData.map((item1) => `${item1.director_name} (${item1.start_year} - ${item1.end_year !== null ? item1.end_year : date})`))];
        directorList.push({
          type: item.director_name,
          list: directorLists
        });
      });
      //Highest total directors data
      const highestDirectoTotal = [];
      const objHighest = { director_name: 'Hightest Paid Executives - Total' };
      const dataHighestG = [];
      const dataHighestR = [];
      const dataHighestO = [];
      HighestTotalGranted.filter((subItem) => {
        const keys = Object.keys(subItem).filter((item) => !defaultKeyForData.some((subKey) => subKey === item));
        let updated = false;
          if (subItem.elno === 1) {
              if (!updated) {
                dataHighestG.unshift({ ...subItem, element: null, type: 'Total Granted Compensation*' });
              }
          } else {
            // data['tableData'] = [{ ...subItem, type: 'Total Granted Compensation*' }];
            if (dataHighestG.length > 0) {
              dataHighestG.filter((item) => {
               if (item.elno === subItem.elno) {
                keys.filter((itemKey) => {
                  item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                });
                  updated = true;
                }
              });
            }
            if (!updated) {
              dataHighestG.push({ ...subItem, type: 'Total Granted Compensation*' });
            }
          }
      });
      HighestTotalRealized.filter((subItem) => {
        const keys = Object.keys(subItem).filter((item) => !defaultKeyForData.some((subKey) => subKey === item));
        let updated = false;
          if (subItem.elno === 1) {
              if (!updated) {
                dataHighestR.unshift({ ...subItem, element: null, type: 'Total Realised Compensation' });
              }
          } else {
            // data['tableData'] = [{ ...subItem, type: 'Total Granted Compensation*' }];
            if (dataHighestR.length > 0) {
              dataHighestR.filter((item) => {
               if (item.elno === subItem.elno) {
                keys.filter((itemKey) => {
                  item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                });
                  updated = true;
                }
              });
            }
            if (!updated) {
              dataHighestR.push({ ...subItem, type: 'Total Realised Compensation' });
            }
          }
      });
      HighestTotalOutstanding.filter((subItem) => {
        const keys = Object.keys(subItem).filter((item) => !defaultKeyForData.some((subKey) => subKey === item));
        let updated = false;
          if (subItem.elno === 1) {
              if (!updated) {
                dataHighestO.unshift({ ...subItem, element: null, type: 'Total Outstanding Compensation*' });
              }
          } else {
            // data['tableData'] = [{ ...subItem, type: 'Total Granted Compensation*' }];
            if (dataHighestO.length > 0) {
              dataHighestO.filter((item) => {
               if (item.elno === subItem.elno) {
                keys.filter((itemKey) => {
                  item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                });
                  updated = true;
                }
              });
            }
            if (!updated) {
              dataHighestO.push({ ...subItem, type: 'Total Outstanding Compensation*' });
            }
          }
      });
      objHighest['tableData'] = [...dataHighestG, ...dataHighestR, ...dataHighestO];
      highestDirectoTotal.push(objHighest);
      //Non Executive Data start
      const nonExecutiveData = [];
      const objNonExecutive = { director_name: 'Non-Executives Total' };
      const dataNonExecutiveG = [];
      const dataNonExecutiveR = [];
      const dataNonExecutiveO = [];
      nonExecutiveDirectorGranted.filter((subItem) => {
        const keys = Object.keys(subItem).filter((item) => !defaultKeyForData.some((subKey) => subKey === item));
        let updated = false;
          if (subItem.elno === 1) {
              if (!updated) {
                dataNonExecutiveG.unshift({ ...subItem, element: null, type: 'Total Granted Compensation*' });
              }
          } else {
            // data['tableData'] = [{ ...subItem, type: 'Total Granted Compensation*' }];
            if (dataNonExecutiveG.length > 0) {
              dataNonExecutiveG.filter((item) => {
               if (item.elno === subItem.elno) {
                keys.filter((itemKey) => {
                  item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                });
                  updated = true;
                }
              });
            }
            if (!updated) {
              dataNonExecutiveG.push({ ...subItem, type: 'Total Granted Compensation*' });
            }
          }
      });
      nonExecutiveDirectorOutstanding.filter((subItem) => {
        const keys = Object.keys(subItem).filter((item) => !defaultKeyForData.some((subKey) => subKey === item));
        let updated = false;
          if (subItem.elno === 1) {
              if (!updated) {
                dataNonExecutiveO.unshift({ ...subItem, element: null, type: 'Total Outstanding Compensation*' });
              }
          } else {
            // data['tableData'] = [{ ...subItem, type: 'Total Granted Compensation*' }];
            if (dataNonExecutiveO.length > 0) {
              dataNonExecutiveO.filter((item) => {
               if (item.elno === subItem.elno) {
                keys.filter((itemKey) => {
                  item[`${itemKey}`] = item[`${itemKey}`] ? item[`${itemKey}`] : 0 + subItem[`${itemKey}`] ? subItem[`${itemKey}`] : 0;
                });
                  updated = true;
                }
              });
            }
            if (!updated) {
              dataNonExecutiveO.push({ ...subItem, type: 'Total Outstanding Compensation*' });
            }
          }
      });
      objNonExecutive['tableData'] = [...dataNonExecutiveG];
      nonExecutiveData.push(objNonExecutive);
      //Director list with Year
      const directorListNon = [];
      const current_year = new Date().getFullYear();
      nonExecutiveDListGranted.filter((item) => {
        const addData = () => {
          directorListNon.push(({
            director_name: `${item.director_name}(${item.start_year} - ${item.end_year === null ? current_year : item.end_year})`,
            director_id: item.director_id,
            start_year: [item.start_year],
            end_year: [item.end_year === null ? current_year : item.end_year]
          }));
        };
        let updated = false;
        // if (!updated) {
        //   addData();
        // }
        if (directorListNon.length > 0) {
          directorListNon.filter((itemDirector) => {
            const uniqueArray = [...new Set(directorListNon.map((item) => item.director_id))];
            if (uniqueArray.includes(item.director_id)) {
              if (item.director_id === itemDirector.director_id && !itemDirector.start_year.includes(item.start_year) && !itemDirector.end_year.includes(item.end_year === null ? current_year : item.end_year)) {
                itemDirector.director_name = `${itemDirector.director_name}(${item.start_year} - ${item.end_year === null ? current_year : item.end_year})`;
                itemDirector.start_year.push(item.start_year);
                itemDirector.end_year.push(item.end_year === null ? current_year : item.end_year);
                updated = true;
              } else {
                updated = true;
              }
            } else {
              if (!updated) {
                addData();
                updated = true;
              }
            }
          });
        } else {
          if (!updated) {
            addData();
          }
        }
      });
      nonExecutiveDListOutstanding.filter((item) => {
        const addData = () => {
          directorListNon.push(({
            director_name: `${item.director_name}(${item.start_year} - ${item.end_year === null ? current_year : item.end_year})`,
            director_id: item.director_id,
            start_year: [item.start_year],
            end_year: [item.end_year === null ? current_year : item.end_year]
          }));
        };
        let updated = false;
        // if (!updated) {
        //   addData();
        // }
        if (directorListNon.length > 0) {
          directorListNon.filter((itemDirector) => {
            const uniqueArray = [...new Set(directorListNon.map((item) => item.director_id))];
            if (uniqueArray.includes(item.director_id)) {
              if (item.director_id === itemDirector.director_id && !itemDirector.start_year.includes(item.start_year) && !itemDirector.end_year.includes(item.end_year === null ? current_year : item.end_year)) {
                itemDirector.director_name = `${itemDirector.director_name}(${item.start_year} - ${item.end_year === null ? current_year : item.end_year})`;
                itemDirector.start_year.push(item.start_year);
                itemDirector.end_year.push(item.end_year === null ? current_year : item.end_year);
                updated = true;
              } else {
                updated = true;
              }
            } else {
              if (!updated) {
                addData();
                updated = true;
              }
            }
          });
        } else {
          if (!updated) {
            addData();
          }
        }
      });
    res.json(result.recordset ? { data: mergeData, yearData: ddlYear, yearList: ddlYears, directorList: directorList, HighestData: highestDirectoTotal, nonExecutiveData: nonExecutiveData, nonExeDirectorList: directorListNon } : []);
      }
  } catch (error) {
    res.json({
      errorMessage: error.message,
      errorLineNumber: error.lineNumber,
      error: error.toString(),
      data: [],
      yearData: [],
      yearList: [],
      directorList: [],
    });
    general.ErrorLog(
      `${companyroutes}/GetCompensationExecutivePayData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompensationOverviewSummaryDetails(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('pid', sql.Int, req.body.pid)
    .execute('WebCompC_Get_SummaryDetails');
    const summaryData = result.recordsets[0];
    const chartData1 = result.recordsets[1];
    const chartData2 = result.recordsets[2];
    const newData = [];
    let DateRange = [];
    let UniqueYear = [];
    if (chartData2.length > 0 && chartData1.length > 0) {
      UniqueYear = [...new Set(chartData2.map((item) => Number(item.year_of_pay)))];
      const UniqueDate = [...new Set(chartData2.map((item) => Number(item.year_of_pay)))];
      //Create DateRange combining year_of_pay and report_date
      DateRange = [...new Set(UniqueDate.concat(UniqueYear))];
      // UniqueYear.sort((a, b) => a - b);
      // UniqueDate.sort((a, b) => a - b);
      DateRange.sort((a, b) => a - b);
      // const firstYear = UniqueYear[0];
      // adding + 1 year to display latest report_date on sparkline chart
      chartData1.filter((item) => {
        const obj = [];
        const YearObj = [];
        chartData2.filter((item1, i) => {
          if (item1.Director_id === item.Director_id) {
            YearObj.push({
              date: item1.year_of_pay,
            });
            obj.push(Number(item1.Total_Actual));
          }
        });
        const maxNumber = Math.max(...obj);
        const minNumber = Math.min(...obj);
        obj.sort((a, b) => a - b);
        YearObj.sort((a, b) => a.date - b.date);
        newData.push({
          director_name: item.Director_Name,
          director_id: item.Director_id,
          realized_pay: minNumber,
          most_recent_realized_pay: maxNumber,
          chart_data: obj,
          dateColumns: YearObj
        });
      });
    }
    res.json({ summaryData: summaryData, chartData: newData, yearData: DateRange });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensationOverviewSummaryDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
//Compensation Overview page
async function GetCompensationOverviewExecutiveAndDirectorDetails(req, res, next) {
  try {
    const pool = await poolPromise;
    const pid = req.body.pid;
    const result = await pool
    .request()
    .input('PID', sql.Int, req.body.pid)
    .execute('WebCompC_Get_DirectorAndExecutiveDetails');
    const resultHeader = await pool.request().input('PID', sql.Int, req.body.pid).execute('GetComDirProfPastHeaderCol');
    const committeeHeaders = resultHeader.recordset.length > 0 ? resultHeader.recordset : [];
    const newResult = [];
    const resultData = result.recordsets.length > 0 ? result.recordsets[2] : [];
    await Promise.all(
      resultData.map(async (r, i) => {
        const commit = await GetComDirProfPastCheck({
          PID: pid,
          Director_appoinment_id: r.Director_appoinment_id,
        });
        // Join tables in new array
        newResult.push({
          ...r,
          Independent: r.Independent === null || r.Independent === undefined || r.Independent === 0 ? '' : 'Independent',
          latest_vote: r.latest_vote !== undefined && r.latest_vote !== null ? r.latest_vote.toFixed(2) : '',
          ethnicity_name: r.ethnicity_name === null ? 'Not disclosed' : r.ethnicity_name,
          commit,
        });
      })
    );

    const createJsonArr = [];
    const currDirectorsProf2 = [];

    await Promise.all(
      newResult.filter((x, i) => {
        const createJson = {};
        committeeHeaders.filter(async (header, ind) => {
          createJson.index = i;
          createJson[header.comm_name] = await getCommittee(x.commit, header.comm_name, x.director_id);
          if (ind === committeeHeaders.length - 1) {
            createJsonArr.push(createJson);
          }
        });
      })
    );
    newResult.map((e, i) => {
      currDirectorsProf2.push({ ...e, ...createJsonArr[i] });
    });
    const arr = currDirectorsProf2.sort((a, b) => {
      if (a.Surname < b.Surname) {
        return -1;
      }
      if (a.Surname === b.Surname) {
        return 0;
      }
      return 1;
    });
    res.json({
      executieData: result.recordsets[0],
      yearHeader: result.recordsets[1],
      directorData: arr,
      committeeHeaders: committeeHeaders
    });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensationOverviewExecutiveAndDirectorDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompensatioCompanyolicyDetailsHighestPaidExecutive(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('PID', sql.Int, req.body.pid)
    .execute('WebCompC_Get_ShortLongIncentiveDetails');
    res.json({
      shortIncentiveExecutiveData: result.recordsets[0],
      longIncentiveExecutiveData: result.recordsets[1],
    });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensatioCompanyolicyDetailsHighestPaidExecutive`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompensationPolicyDetails(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('PID', sql.Int, req.body.pid)
    .execute('WebCompC_Get_PolicyDetails');
    const data = result.recordset;
    const uniqueYears = [...new Set(data.map((item) => item.report_year))];
    const yearData = [];
    uniqueYears.filter((item) => {
      yearData.push({
        label: item,
        value: item
      });
    });
    res.json({ data: result.recordset, yearData: yearData });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensationPolicyDetails`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompensationPolicyHighestPaidExecutiveData(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('PID', sql.Int, req.body.pid)
    .execute('WebCompC_Get_HighestPaidExecutivesDetails');
    const mainKesy = ['director_id', 'director_name', 'director_type', 'position', 'element', 'elno'];
    const data = result.recordset;
    if (data[0].Results === 0) {
      res.json({ data: [], header: [] });
      return 0;
    }
    const sourceRows = {};
    data.forEach((row) => {
      if (!sourceRows[row.director_id]) {
        sourceRows[row.director_id] = {};
      }
      sourceRows[row.director_id] = row;
    });
    const original_keys = Object.keys(data[0]);
    const dyanmicKey = original_keys.filter((item) => !mainKesy.some((subItem) => item === subItem));
    const updatedData = [];
    data.forEach((row, index) => {
      let updated = false;
      if (updatedData.length > 0) {
        updatedData.forEach((subItem) => {
          const uniqueArray = [...new Set(updatedData.map((item) => item.director_id))];
          if (uniqueArray.includes(row.director_id)) {
            if (subItem.director_id === row.director_id) {
              subItem.data.push(row);
              updated = true;
            } else {
              updated = true;
            }
          } else {
            if (!updated) {
              updatedData.push(
                {
                    director_id: row.director_id,
                    director_name: row.director_name,
                    director_type: row.director_type,
                    Rank: index,
                    data: [row]
                });
            }
          }
        });
      } else {
        if (!updated) {
          updatedData.push(
            {
                director_id: row.director_id,
                director_name: row.director_name,
                director_type: row.director_type,
                Rank: index,
                data: [row]
            });
        }
          }
    });
    res.json({ data: updatedData, header: dyanmicKey });
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensationPolicyHighestPaidExecutiveData`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
async function GetCompensationNonExecutivePay(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('pid', sql.Int, req.body.pid)
    .execute('GetNonExectuive_Insightia');

    const result1 = await pool
    .request()
    .input('pid', sql.Int, req.body.pid)
    .execute('GetNonExec_StockOwnership_Inisghtia');
    const resultData = result.recordset;
    const result1Data = result1.recordset;
    const data = [];
    resultData.filter((item) => {
      result1Data.filter((item1) => {
        if (item.Director_appoinment_id === item1.director_appoinment_id) {
          data.push({
            ...item,
            total_actual: item1.total_actual,
            stock_ownership: item1.stock_ownership
          });
        }
      });
    });

    res.json(result.recordset ? data : []);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensationNonExecutivePay`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}

async function GetCompensationHighestPaidExe(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('pid', sql.Int, req.body.pid)
    .execute('GetExecutiveHighestPaid_Insightia');

    const result1 = await pool
    .request()
    .input('pid', sql.Int, req.body.pid)
    .execute('GetHighestPaidExec_StockOwnership_Inisghtia');
    const resultData = result.recordset;
    const result1Data = result1.recordset;
    const data = [];
    resultData.filter((item) => {
      result1Data.filter((item1) => {
        if (item.Director_appoinment_id === item1.director_appoinment_id) {
          data.push({
            ...item,
            total_actual: item1.total_actual,
            stock_ownership: item1.stock_ownership
          });
        }
      });
    });

    res.json(result.recordset ? data : []);
  } catch (error) {
    general.ErrorLog(
      `${companyroutes}/GetCompensationNonExecutivePay`,
      error,
      req.user.User_Id,
      req.body,
      req.headers.origin
    );
  }
}
module.exports = router;
