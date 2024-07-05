const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: __dirname + '\\.env' });

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

app.use(cors());
app.use(express.static(`${path.join(__dirname, '../')}/insightia_react`)); // app.use(express.static(`${path.join(__dirname, '../')}/public`));
app.use('/pdfcreation', express.static(path.join(__dirname, '../server') + '/public/pdfcreation'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1gb' })); // 50mb

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', '/insightia_react', 'index.html'));
});

app.use('/api/v1/pdf', require('./routes/generatePDF/pdfRoutes'));
app.use('/', require('./routes/authRoutes'));
app.use('/api/v1/general', require('./routes/generalRoutes'));
app.use('/api/v1/company', require('./routes/companyRoutes'));
app.use('/api/v1/investor', require('./routes/investorRoutes'));
app.use('/api/v1/investorActivistShort', require('./routes/Investor/ActivistShortRoutes'));
app.use('/api/v1/investorOwnership', require('./routes/investorOwnershipRoutes'));
app.use('/api/v1/investorVoting', require('./routes/investorVotingRoutes'));
app.use('/api/v1/investorActivism', require('./routes/investorActivismRoute'));
app.use('/api/v1/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/v1/dummydata', require('./routes/dummydataRoutes'));
app.use('/api/v1/tools', require('./routes/toolsRoutes'));
app.use('/api/v1/toolsResolutionTracker', require('./routes/toolsResolutionTrackerRoutes'));
app.use('/api/v1/toolDissidentVotingSummary', require('./routes/toolDissidentVotingSummary'));
app.use('/api/v1/companygovernancedataandanalytics', require('./routes/companygovernancedataandanalytics'));
app.use('/api/v1/advancedVotingDataSearch', require('./routes/advancedVotingDataSearch'));
app.use('/api/v1/news', require('./routes/newsRouter'));
app.use('/api/v1/faqhelp', require('./routes/faqHelpRoutes'));
app.use('/api/v1/preferences', require('./routes/preferencesRoutes'));
app.use('/api/v1/magazinesReport', require('./routes/magazinesReportRoutes'));
app.use('/api/v1/globalGovernanceTool', require('./routes/globalGovernanceToolRoutes'));
app.use('/api/v1/notifiedShortPositionDataTool', require('./routes/notifiedShortPositionDataToolRoutes'));
app.use('/api/v1/companyPeerGroupComparisonMatrixTool', require('./routes/companyPeerGroupComparisonMatrixToolRoutes'));
app.use('/api/v1/toolsShortCampaignDataandAnalytics', require('./routes/toolsShortCampaignDataandAnalyticsRoutes'));
app.use('/api/v1/votingRationale', require('./routes/votingRationaleRoutes'));
app.use('/api/v1/investorVotingProfile', require('./routes/Investor/VotingProfileRoutes'));
app.use('/api/v1/fundVotes', require('./routes/Investor/FundVotes'));
app.use('/api/v1/myAlerts', require('./routes/MyAlert/myAlertsRoutes'));
app.use('/api/v1/noactionLetterVotingTool', require('./routes/VotingTool/noactionLetterToolRoutes'));
app.use('/api/v1/people', require('./routes/peopleSearchRoutes'));
app.use('/api/v1/advisor', require('./routes/advisorRoute'));
app.use('/api/v1/alertInbox', require('./routes/MyAlert/alertInboxRoutes'));
app.use('/api/v1/powersearch', require('./routes/powerSearchRoutes'));
app.use('/api/v1/governanceCompanyOverview', require('./routes/Governance/governanceCompanyOverviewRoutes'));
app.use('/api/v1/votingOverview', require('./routes/Investor/VotingOverviewRoutes'));
app.use('/api/v1/toolsActivistCampaigns', require('./routes/toolsActivistCampaigns'));
app.use('/api/v1/toolsActivistCampaignAdvisor', require('./routes/toolsActivistCampaignAdvisor'));
app.use(
  '/api/v1/toolsPoisonPillDataAndAnalytics',
  require('./routes/VotingTool/PoisonPillDataAndAnalyticsToolsRoutes')
);
app.use('/api/v1/toolsUpcomingEventRoutes', require('./routes/GovernanceTool/upcomingEventsToolRoutes'));
app.use('/api/v1/toolsGovernanceScoreData', require('./routes/GovernanceTool/toolsGovernanceScoreRoute'));
app.use('/api/v1/toolsAmendmentDataandAnalytics', require('./routes/GovernanceTool/toolsAmendmentDataandAnalyticsRoutes'));

app.use('/api/v1/toolsFillingsSearch', require('./routes/toolsFillingsSearchRoutes'));
app.use('/api/v1/directorDataAndAnalyticsTool', require('./routes/GovernanceTool/directorDataAndAnalyticsToolRoutes'));
app.use('/api/v1/toolsActivismTrends', require('./routes/toolsActicismTrendsRoutes'));
app.use('/api/v1/toolsAiSFeelingsSearch', require('./routes/toolsAiSFeelingsSearch'));
app.use('/api/v1/toolsSaveSearches', require('./routes/saveSearchRoutes'));
app.use('/api/v1/toolCompensation', require('./routes/toolCompensationRoutes'));
app.use('/api/v1/peopleCompensation', require('./routes/peopleCompensationRoutes'));

const port = process.env.PORT || 8080;
server.listen(port);
console.log(`listening on: ${port}`);

// If no route is matched, it must be 404
app.use((req, res) => {
  res.status(404).end();
});
