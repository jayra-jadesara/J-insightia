var express = require('express');
var router = express.Router();

const { authenticateToken } = require('../utill/authUtil');
const d3BarChartData = require('../config/SampleData/D3BarChart_data.json');
const d3StackBarChartData = require('../config/SampleData/D3StackBarChart_data.json');
const d3SharePriceChartData = require('../config/SampleData/D3SharePriceChart_data.json');
const d3PieChartData = require('../config/SampleData/D3PieChart_data.json');
const d3DoughnutChartData = require('../config/SampleData/d3DoughnutChart_data.json');
const d3InterlockingData = require('../config/SampleData/D3Interlocking_data.json');
const votingOverviewData = require('../config/SampleData/VotingOverview_data.json');
const votingQuickviewData = require('../config/SampleData/VotingQuickview_data.json');
const votingResultsData = require('../config/SampleData/VotingResults_data.json');
const votingDetailData = require('../config/SampleData/VotingDetail_data.json');
const votingAgainstMgmtData = require('../config/SampleData/VotingAgainstMgmt_data.json');
const votingPolicyCheckerData = require('../config/SampleData/VotingPolicyChecker_data.json');
const globalGovToolData = require('../config/SampleData/GlobalGovTool.json');
const ownershipCompanyDummyData = require('../config/SampleData/OwnershipCompany_data.json');
const OwnershipInvestor_data = require('../config/SampleData/OwnershipInvestor_data.json');
const investorVotingProfile_data = require('../config/SampleData/investorVotingProfile_data.json');
const noActionLetter_data = require('../config/SampleData/NoActionLetters_data.json');
const ActivistCampiagn_data = require('../config/SampleData/ActivistCampiagn_data.json');
const CompanyGovernanceOverview_data = require('../config/SampleData/CompanyGovernanceOverview_data.json');

router.post('/OwnershipCompanyDummyData', authenticateToken, OwnershipCompanyDummyData);
router.post('/investorOwnershipCompanyDummyData', authenticateToken, investorOwnershipCompanyDummyData);

router.post('/GetD3BarChartDummyData', authenticateToken, GetD3BarChartDummyData);
router.post('/GetD3StackBarChartDummyData', authenticateToken, GetD3StackBarChartDummyData);
router.post('/GetD3SharePriceChartDummyData', authenticateToken, GetD3SharePriceChartDummyData);
router.post('/GetD3PieChartDummyData', authenticateToken, GetD3PieChartDummyData);
router.post('/GetD3DoughnutChartData', authenticateToken, GetD3DoughnutChartData);
router.post('/GetD3InterlockingDummyData', authenticateToken, GetD3InterlockingDummyData);
router.post('/GetVotingOverviewPageTrialList', authenticateToken, GetVotingOverviewPageTrialList);
router.post('/GetVotingQuickviewPageTrialList', authenticateToken, GetVotingQuickviewPageTrialList);
router.post('/GetVotingResultsPageTrialList', authenticateToken, GetVotingResultsPageTrialList);
router.post('/GetVotingDetailPageTrialList', authenticateToken, GetVotingDetailPageTrialList);
router.post('/GetVotingAgainstMgmtPageTrialList', authenticateToken, GetVotingAgainstMgmtPageTrialList);
router.post('/GetVotingPolicyCheckerPageTrialList', authenticateToken, GetVotingPolicyCheckerPageTrialList);
//
router.post('/GetGlobalGovToolTrialList', authenticateToken, GetGlobalGovToolTrialList);

// //
router.post('/GetVotingListTrialUser', authenticateToken, GetVotingListTrialUser);
router.post('/GetActivismListTrialUser', authenticateToken, GetActivismListTrialUser);
router.post('/GetVulnerabilityListTrialUser', authenticateToken, GetVulnerabilityListTrialUser);
router.post('/GetActivistShortListTrialUser', authenticateToken, GetActivistShortListTrialUser);
router.post('/GetGovernanceListTrialUser', authenticateToken, GetGovernanceListTrialUser);
router.post('/investorVotingProfileDummyData', authenticateToken, investorVotingProfileDummyData);
router.post('/noActionLetterDummyData', authenticateToken, noActionLetterDummyData);
router.post('/ActivistCampiagnDummyData', authenticateToken, ActivistCampiagnDummyData);
router.post('/CompanyGovernanceOverviewDummyData', authenticateToken, CompanyGovernanceOverviewDummyData);

const Voting_data = require('../config/SampleData/Voting_data.json');
const Activism_data = require('../config/SampleData/Activism_data.json');
const Vulnerability_data = require('../config/SampleData/Vulnerability_data.json');
const Governance_data = require('../config/SampleData/Governance_data.json');
const ActivistShort_data = require('../config/SampleData/ActivistShort_data.json');

async function GetGlobalGovToolTrialList(req, res, next) {
  res.json({ data: globalGovToolData });
}
async function GetVotingOverviewPageTrialList(req, res, next) {
  res.json({ data: votingOverviewData });
}
async function GetVotingQuickviewPageTrialList(req, res, next) {
  res.json({ data: votingQuickviewData });
}
async function GetVotingResultsPageTrialList(req, res, next) {
  res.json({ data: votingResultsData });
}
async function GetVotingDetailPageTrialList(req, res, next) {
  res.json({ data: votingDetailData });
}
async function GetVotingAgainstMgmtPageTrialList(req, res, next) {
  res.json({ data: votingAgainstMgmtData });
}
async function GetVotingPolicyCheckerPageTrialList(req, res, next) {
  res.json({ data: votingPolicyCheckerData });
}

async function GetD3InterlockingDummyData(req, res, next) {
  res.json({ data: d3InterlockingData });
}

async function GetD3DoughnutChartData(req, res, next) {
  res.json({ data: d3DoughnutChartData });
}

async function GetD3PieChartDummyData(req, res, next) {
  res.json({ data: d3PieChartData });
}

async function GetD3SharePriceChartDummyData(req, res, next) {
  res.json({ data: d3SharePriceChartData });
}

async function GetD3StackBarChartDummyData(req, res, next) {
  res.json({ data: d3StackBarChartData });
}

async function GetD3BarChartDummyData(req, res, next) {
  res.json({ data: d3BarChartData });
}

//sample trial data
async function GetVotingListTrialUser(req, res, next) {
  res.json({ data: Voting_data });
}

async function GetActivismListTrialUser(req, res, next) {
  res.json({ data: Activism_data });
}

async function GetVulnerabilityListTrialUser(req, res, next) {
  res.json({ data: Vulnerability_data });
}

async function GetActivistShortListTrialUser(req, res, next) {
  res.json({ data: ActivistShort_data });
}

async function GetGovernanceListTrialUser(req, res, next) {
  res.json({ data: Governance_data });
}

async function OwnershipCompanyDummyData(req, res, next) {
  res.json({ data: ownershipCompanyDummyData });
}
async function investorOwnershipCompanyDummyData(req, res, next) {
  res.json({ data: OwnershipInvestor_data });
}
async function investorVotingProfileDummyData(req, res, next) {
  res.json({ data: investorVotingProfile_data });
}
async function noActionLetterDummyData(req, res, next) {
  res.json({ data: noActionLetter_data });
}
async function ActivistCampiagnDummyData(req, res, next) {
  res.json({ data: ActivistCampiagn_data });
}
async function CompanyGovernanceOverviewDummyData(req, res, next) {
  res.json({ data: CompanyGovernanceOverview_data });
}

module.exports = router;
