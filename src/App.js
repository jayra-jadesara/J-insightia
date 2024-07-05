import React from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import qs from 'qs';
import PageSpinner from './components/PageSpinner';
import MainLayout from './layout/MainLayout';
import { isUserAuthenticated } from './utils/login-util';
import Login from './features/LoginContainer/Login';
import { history } from './utils/navigation-util';
import AuthForm from './components/AuthForm/AuthForm';
import pathConst from './constants/PathsConstant';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/reduction.scss';
import ErrorBoundary from './components/GeneralForm/ErrorBoundary';

const getBasename = () => `/${process.env.PUBLIC_URL.split(pathConst.DASHBOARD).pop()}`;
//#region Dashboard Container path
const DashboardPage = React.lazy(() => import('./features/DashboardContainer/DashboardContainer'));
//#endregion

//#region News Container path
//#region for crosslogin
const query = qs.parse(location.search, { ignoreQueryPrefix: true });
//#endregion

const NewsPage = React.lazy(() => import('./features/NewsContainer/Latest/NewsContainer'));
const NewsLetestOverviewPage = React.lazy(() => import('./features/NewsContainer/Latest/NewsContainer'));
// news > Activism
const ActivismLatestNews = React.lazy(() => import('./features/NewsContainer/Activism/ActivismLatestNewsContainer'));
const ActivismThisweekNews = React.lazy(() => import('./features/NewsContainer/Activism/ThisweekContainer'));
const ActivismInDepthNews = React.lazy(() => import('./features/NewsContainer/Activism/InDepthContainer'));

// news > activist short
const newsActivistShorts = React.lazy(() => import('./features/NewsContainer/ActivistShorts/ActivistShortContainer'));
const AsInDepthNews = React.lazy(() => import('./features/NewsContainer/ActivistShorts/AsInDepthContainer'));

// news > activist Vulnerablity
const newsActivistVulnerablity = React.lazy(() =>
  import('./features/NewsContainer/ActivistVulnerability/LatestNewsContainer')
);
const newsActivistVulnerablityReports = React.lazy(() =>
  import('./features/NewsContainer/ActivistVulnerability/ReportsContainer')
);
const newsActivistVulnerablityHits = React.lazy(() =>
  import('./features/NewsContainer/ActivistVulnerability/HitsContainer')
);
const newsActivistVulnerablityUpdates = React.lazy(() =>
  import('./features/NewsContainer/ActivistVulnerability/UpdatesContainer')
);

// news > compensation
const NewsCompensation = React.lazy(() => import('./features/NewsContainer/Compensation/CompensationNewsContainer'));

// Investor
const InvestorPage = React.lazy(() => import('./features/InvestorContainer/InvestorContainer'));
// Investor -> Overview
const InvestorOverviewPage = React.lazy(() => import('./features/InvestorContainer/InvestorOverviewContainer'));

// Investor -> Activism
const InvestorActivismPage = React.lazy(() => import('./features/InvestorContainer/Activism/InvestorActivismContainer'));
const InvestorActivismCampaigns = React.lazy(() =>
  import('./features/InvestorContainer/Activism/InvestorActivismCampaignContainer')
);
const InvestorActivismInvestments = React.lazy(() =>
  import('./features/InvestorContainer/Activism/InvestorActivismInvestmentsContainer')
);
const InvestorActivismDemand = React.lazy(() => import('./features/InvestorContainer/Activism/InvestorActivismDemandContainer'));
const InvestorActivismOverview = React.lazy(() =>
  import('./features/InvestorContainer/Activism/InvestorActivismOverviewContainer')
);
const InvestorActivismFollowerReturns = React.lazy(() =>
  import('./features/InvestorContainer/Activism/InvestorActivismFollowerReturnsContainer')
);
const InvestorActivismPerformance = React.lazy(() =>
  import('./features/InvestorContainer/Activism/InvestorActivismPerformanceContainer')
);
const InvestorActivismPerformanceAnnual = React.lazy(() =>
  import('./features/InvestorContainer/Activism/InvestorActivismPerformanceAnnualContainer')
);
const InvestorActivismFiling = React.lazy(() =>
  import('./features/InvestorContainer/Activism/InvestorActivistmFilingContainer')
);

// Investor -> Shorts
const InvestorActivistShortsPage = React.lazy(() =>
  import('./features/InvestorContainer/ActivistShorts/InvestorActivistShortsContainer')
);
const InvestorActivistShortsOverviewPage = React.lazy(() =>
  import('./features/InvestorContainer/ActivistShorts/InvestorActivistShortsOverviewContainer')
);
const InvestorActivistShortsCampaignsPage = React.lazy(() =>
  import('./features/InvestorContainer/ActivistShorts/InvestorActivistShortsCampaignContainer')
);
const InvestorActivistShortsOwnershipDisclosuresPage = React.lazy(() =>
  import('./features/InvestorContainer/ActivistShorts/InvestorActivistShortsOwnershipDiscContainer')
);
const InvestorActivistShortsFilingsPage = React.lazy(() =>
  import('./features/InvestorContainer/ActivistShorts/InvestorActivistShortsFilingsContainer')
);

// Investor -> Voting
const InvestorVotingPage = React.lazy(() => import('./features/InvestorContainer/InvestorVotingContainer'));
const InvestorVotingOverviewPage = React.lazy(() =>
  import('./features/InvestorContainer/Voting/InvestorVotingOverviewContainer')
);
const InvestorVotingProfilePage = React.lazy(() =>
  import('./features/InvestorContainer/VotingProfile/InvestorVotingProfileContainer')
);
const InvestorVotingSummaryPage = React.lazy(() =>
  import('./features/InvestorContainer/InvestorVotingSummaryContainer')
);
const InvestorVotingbyProposalPage = React.lazy(() =>
  import('./features/InvestorContainer/Voting/VotingByResolutionContainer')
);
const InvestorVotingISSGLComparatorPage = React.lazy(() =>
  import('./features/InvestorContainer/InvestorVotingComparatorContainer')
);
const InvestorVotingRationalePage = React.lazy(() =>
  import('./features/InvestorContainer/Voting/InvestorVotingRationaleContainer')
);
const InvestorProxyContestVotingPage = React.lazy(() =>
  import('./features/InvestorContainer/Voting/ProxyContestVotingContainer')
);
const InvestorFundsVotedPage = React.lazy(() => import('./features/InvestorContainer/Voting/FundVotedContainer'));

// Investor -> News
const InvestorNewsPage = React.lazy(() => import('./features/InvestorContainer/InvestorNewsContainer'));
// Investor -> Ownership
const InvestorOwnershipPage = React.lazy(() => import('./features/InvestorContainer/InvestorOwnershipContainer'));
const InvestorOwnershipLongInvestorPage = React.lazy(() =>
  import('./features/InvestorContainer/Ownership/InvestorOwnershipLongInvestorContainer')
);
const InvestorOwnershipLongFundPage = React.lazy(() =>
  import('./features/InvestorContainer/Ownership/InvestorOwnershipLongFundContainer')
);
const InvestorOwnershipShortInvestorPage = React.lazy(() =>
  import('./features/InvestorContainer/Ownership/InvestorOwnershipShortInvestorContainer')
);
const InvestorOwnershipShortFundPage = React.lazy(() =>
  import('./features/InvestorContainer/Ownership/InvestorOwnershipShortFundContainer')
);

// news > governance
const newsGovernance = React.lazy(() => import('./features/NewsContainer/Governance/GovernanceContainer'));

// news > voting
const newsVoting = React.lazy(() => import('./features/NewsContainer/Voting/VotingContainer'));
const VoteInDepthNews = React.lazy(() => import('./features/NewsContainer/Voting/VoteInDepthContainer'));

// news > search
const newsSearch = React.lazy(() => import('./features/NewsContainer/Search/SearchContainer'));

//#endregion

//#region Advisors
// Advisor -> Search
const AdvisorPage = React.lazy(() => import('./features/AdvisorContainer/AdviserContainer'));
// Investor -> Overview
const AdvisorOverviewPage = React.lazy(() => import('./features/AdvisorContainer/AdvisorOverviewContainer'));

// Investor -> activism
const AdvisorActivismOverviewPage = React.lazy(() =>
  import('./features/AdvisorContainer/Activism/AdvisersActivismOverviewContainer')
);

// Investor -> activist shorts
const AdvisorActivistShortOverviewPage = React.lazy(() =>
  import('./features/AdvisorContainer/ActivistShort/AdvisersActivistShortOverviewContainer')
);

// Investor -> voting
const AdvisorVotingOverviewPage = React.lazy(() =>
  import('./features/AdvisorContainer/Voting/AdvisersVotingOverviewContainer')
);
//#endregion

//#region tools Container path
//Tools
const ToolsPage = React.lazy(() => import('./features/ToolsContainer/ToolsContainer'));
//Tools > Activism

const ActivistCampaignsToolPage = React.lazy(() => import('./features/ToolsContainer/ActivistCampaignsContainer'));
const PublicDemandsToolPage = React.lazy(() => import('./features/ToolsContainer/PublicDemandsToolContainer'));
const HoldingsDataAndAnalyticsToolPage = React.lazy(() =>
  import('./features/ToolsContainer/HoldingsDataAndAnalyticsContainer')
);
const ShareholderProposalsToolPage = React.lazy(() =>
  import('./components/Tools/ActivismTools/ShareholderProposalsTool')
);
// const PerformanceToolPage = React.lazy(() => import('./features/ToolsContainer/PerformanceContainer'));
// const AnnualPerformancePage = React.lazy(() => import('./components/Tools/ActivismTools/AnnualPerformance'));
// const AnnualCompoundedPage = React.lazy(() => import('./components/Tools/ActivismTools/AnnualCompounded'));
const AnnualPerformancePage = React.lazy(() => import('./features/ToolsContainer/AnnualPerformanceContainer'));
const AnnualCompoundedPage = React.lazy(() => import('./features/ToolsContainer/AnnualCompoundedContainer'));
const FollowerReturnsDataAndAnalyticsToolPage = React.lazy(() =>
  import('./components/Tools/ActivismTools/FollowerReturnsDataAndAnalyticsTool')
);
const ActivistCampaignAdvisor = React.lazy(() => import('./features/ToolsContainer/ActivistCampaignAdvisorContainer'));
const FillingsSearchToolPage = React.lazy(() => import('./features/ToolsContainer/FillingSearchToolsContainer'));
const ActivismTrendsPage = React.lazy(() => import('./features/ToolsContainer/ActivismTrendsContainer'));
//Tools > Voting
const ResolutionTrackerToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Voting/ResolutionTrackerContainer')
);
const InvestorComparatorToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Voting/InvestorComparatorContainer')
);
const HistoricalTreandsPdfTool = React.lazy(() =>
  import('./features/ToolsContainer/Voting/HistoricalTreandsPdfContainer')
);
const ISS_GLResolutionAnalysisToolPage = React.lazy(() =>
  import('./components/Tools/VotingTools/ISS_GLResolutionAnalysisTool')
);
const NoActionDataAndAnalyticsToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Voting/NoActionLetterToolContainer')
);
const DissidentVotingSummaryToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Voting/DissidentVotingSummaryContainer')
);
const AdvancedVotingDataSearchPage = React.lazy(() =>
  import('./features/ToolsContainer/Voting/AdvancedVotingDataSearchContainer')
);
const PoisonPillDataAndAnalyticsPage = React.lazy(() =>
  import('./features/ToolsContainer/Governance/PoisonPillDataAndAnalyticsContainer')
);
//Tools > Governance
const CompanyGovernanceDataAndAnalyticsToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Governance/CompanyGovernanceAndAnalyticsToolsContainer')
);
const Governance_CompanyPeerGroupComparisonMatrixToolPage = React.lazy(() =>
  import('./components/Tools/GovernanceTools/CompanyPeerGroupComparisonMatrixTool')
);
const USStateGovernanceDataToolPage = React.lazy(() =>
  import('./components/Tools/GovernanceTools/USStateGovernanceDataTool')
);
const GlobalGovernanceDataToolPage = React.lazy(() => import('./features/ToolsContainer/GlobalGovToolContainer'));
const DirectorDataAndAnalyticsToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Governance/DirectorDataAndAnalyticsToolsContainer')
);
const UpcomingEventsToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Governance/UpcomingEventsToolSliceContainer')
);
const AmendmentDataAndAnalyticsToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Governance/AmendmentDataandAnalyticsToolContainer')
);
const PoisonPillDataAndAnalyticsToolPage = React.lazy(() =>
  import('./components/Tools/GovernanceTools/PoisonPillDataAndAnalyticsTool')
);
const GovernanceScoreDataToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Governance/GovernanceScoreToolContainer')
);
const DirectorSkillsAndAnalyticsToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Governance/DirectorSkillsAndAnalyticsToolContainer')
);
//Tools > Vulnerability
const Vulnerability_CompanyPeerGroupComparisonMatrixToolPage = React.lazy(() =>
  import('./features/ToolsContainer/CompanyPeerGroupComparisonMatrixContainer')
);
const Vulnerability_AdvancedSearchToolPage = React.lazy(() =>
  import('./features/ToolsContainer/Vulnerability/AdvancedVulnerabilitySearchContainer')
);
//Tools > ShortActivism
const ShortCampaignDataandAnalyticsToolPage = React.lazy(() =>
  import('./features/ToolsContainer/ShortActivism/ShortCampaignDataandAnalyticsContainer')
);
const NotifiedShortPositionDataToolPage = React.lazy(() =>
  import('./features/ToolsContainer/ShortActivism/NotifiedShortPositionDataContainer')
);
const NotifiedShortPositionDataLatestNotificationPage = React.lazy(() =>
  import('./features/ToolsContainer/ShortActivism/NotifiedShortPositionLatestNotificationContainer')
);
const ShortActivistCampaignAdvisorPage = React.lazy(() =>
  import('./features/ToolsContainer/ShortActivism/ShortActivistCampaignAdvisor_Container')
);
const AiSFillingsSearchPage = React.lazy(() =>
  import('./features/ToolsContainer/ShortActivism/AiSFillingsSearchContainer')
);
const CompensationP4PModelerPage = React.lazy(() =>
  import('./features/ToolsContainer/Compensation/P4PMdelerContainer')
);
const CompensationRemunerationCommiteePage = React.lazy(() =>
  import('./features/ToolsContainer/Compensation/RemunerationCommiteeMemberSearchContainer')
);
const ComensationSayOnPayVotePage = React.lazy(() =>
  import('./features/ToolsContainer/Compensation/SayOnPayVoteResultsContainer')
);
const CompensationComparator = React.lazy(() =>
  import('./features/ToolsContainer/Compensation/CompensationComparatorContainer')
);

//Tools > PowerSearch
const PowerSearchToolPage = React.lazy(() => import('./features/ToolsContainer/PowerSearch/PowerSearchContainer'));

//#endregion

//#region Comapny Container path
//company
const CompanySearchPage = React.lazy(() => import('./components/Company/General/Company'));
const CompanyOverviewPage = React.lazy(() => import('./features/CompanyContainer/CompanyOverviewContainer'));

//company - activism
const ActivismPage = React.lazy(() => import('./features/CompanyContainer/Activism/ActivismContainer'));
const ActivistCampaignsPage = React.lazy(() =>
  import('./features/CompanyContainer/Activism/ActivistCampaigns/ActivistCampaignsContainer')
);
const ActivismOverviewPage = React.lazy(() => import('./features/CompanyContainer/Activism/ActivismOverviewContainer'));
const ActivismFilingPage = React.lazy(() => import('./features/CompanyContainer/Activism/ActivismFilingsContainer'));
const ActivistInvestmentPage = React.lazy(() => import('./features/CompanyContainer/Activism/ActivistInvestmentContainer'));

//company - activist short
const ActivistShortsPage = React.lazy(() => import('./features/CompanyContainer/ActivistShorts/ActivistShortsContainer'));
const ActivistShortsOverviewPage = React.lazy(() =>
  import('./features/CompanyContainer/ActivistShorts/ActivistShortsOverview/ActivistShortsOverviewContainer')
);
const ActivistShortCampaignsPage = React.lazy(() =>
  import('./features/CompanyContainer/ActivistShorts/ActivistShortCampaignsContainer')
);
const ActivistShortFilingPage = React.lazy(() => import('./features/CompanyContainer/ActivistShorts/ActivistShortsFilingsContainer'));

//company - Activist Vulnerability
const ActivistVulnerabilityPage = React.lazy(() =>
  import('./features/CompanyContainer/ActivistVulnerabilityContainer')
);

//company - Governance
const GovernancePage = React.lazy(() => import('./features/CompanyContainer/GovernanceContainer'));
const GovernanceOverviewPage = React.lazy(() =>
  import('./features/CompanyContainer/Governance/GovernanceOverviewContainer')
);
const GovBylawsCharterGuidelinesPage = React.lazy(() =>
  import('./features/CompanyContainer/BylawsCharterGovGuidelinseContainer')
);
const DirectorsPage = React.lazy(() => import('./features/CompanyContainer/DirectorContainer'));
const PoisonpillPage = React.lazy(() => import('./features/CompanyContainer/PoisonPillContainer'));
const LatestFilingsPage = React.lazy(() => import('./features/CompanyContainer/LatestFilingsContainer'));
const CompliancePage = React.lazy(() => import('./features/CompanyContainer/ComplianceContainer'));
const ShareholderProposalPage = React.lazy(() => import('./features/CompanyContainer/ShareholderProposalContainer'));
const historicalGovernancePage = React.lazy(() => import('./features/CompanyContainer/HistoricalGovernanceContainer'));

//company - News
const CompanyNewsPage = React.lazy(() => import('./features/CompanyContainer/NewsContainer'));

//company - Ownership
const CompanyOwnershipLongInvestorPage = React.lazy(() =>
  import('./features/CompanyContainer/Ownership/OwnershipLongInvestorContainer')
);
const CompanyOwnershipLongFundPage = React.lazy(() =>
  import('./features/CompanyContainer/Ownership/OwnershipLongFundContainer')
);
const CompanyOwnershipShortInvestorPage = React.lazy(() =>
  import('./features/CompanyContainer/Ownership/OwnershipShortInvestorContainer')
);
const CompanyOwnershipShortFundPage = React.lazy(() =>
  import('./features/CompanyContainer/Ownership/OwnershipShortFundContainer')
);

//company - voting
const VotingPage = React.lazy(() => import('./features/CompanyVotingContainer/VotingContainer'));
const VotingOverviewPage = React.lazy(() => import('./features/CompanyVotingContainer/VotingOverviewContainer'));
const VotingQuickviewPage = React.lazy(() => import('./features/CompanyVotingContainer/VotingQuickViewContainer'));

const VotingPolicyCheckerPage = React.lazy(() =>
  import('./features/CompanyVotingContainer/VotingPolicyCheckerContainer')
);
const VotingResultsPage = React.lazy(() => import('./features/CompanyVotingContainer/VotingResultsContainer'));
const VotingNoActionLettersPage = React.lazy(() =>
  import('./features/CompanyVotingContainer/VotingNoActionLetterContainer')
);
const VotingVoteDetailPage = React.lazy(() => import('./features/CompanyVotingContainer/VotingVoteDetailContainer'));
const VotingVotesAgainstMgmtPage = React.lazy(() =>
  import('./features/CompanyVotingContainer/VotingVotesAgainstMgmtContainer')
);

//#endregion

//#region Other pages path

//MAGAZINES REPORTs
// const ActivismMonthly_MagazinesReport = React.lazy(() => import('./features/MagazinesReportContainer/ActivismMonthlyContainer'));
const Latest_MagazinesReport = React.lazy(() => import('./features/MagazinesReportContainer/LatestContainer'));
// const Activism_MagazinesReport = React.lazy(() => import('./features/MagazinesReportContainer/ActivismMagazineContainer'));
const Activism_Latest_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/ActivismLatestMagazineContainer')
);
const Activism_Monthly_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/ActivismMonthlyReportsContainer')
);
const Activism_Quarterly_Stats_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/ActivismQuarterlyStatsContainer')
);
const Activism_Special_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/ActivismSpecialContainer')
);
const Activism_13F_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/Activism13FContainer')
);

// const Voting_MagazinesReport = React.lazy(() => import('./features/MagazinesReportContainer/VotingMagazineContainer'));
const Voting_Latest_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/VotingLatestContainer')
);
const Voting_Monthly_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/VotingMonthlyContainer')
);
const Voting_Special_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/VotingSpecialContainer')
);

const Shorts_Latest_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/ShortsLatestContainer')
);
const Governance_Latest_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/GovernanceLatestContainer')
);

const ProxyMonthly_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/ProxyMonthlyContainer')
);
const SpecialReports_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/SpecialReportsContainer')
);
const SearchAllReports_MagazinesReport = React.lazy(() =>
  import('./features/MagazinesReportContainer/SearchAllReportsContainer')
);

//FAQ/HELP
const GeneralFAQ = React.lazy(() => import('./features/FAQHelpContainer/GeneralFAQContainer'));
const ActivismFAQ = React.lazy(() => import('./features/FAQHelpContainer/ActivismFAQContainer'));
const ActivistShortsFAQ = React.lazy(() => import('./features/FAQHelpContainer/ActivistShortsFAQContainer'));
const ActivistVulnerabilityFAQ = React.lazy(() =>
  import('./features/FAQHelpContainer/ActivistVulnerabilityFAQContainer')
);
const GovernanceFAQ = React.lazy(() => import('./features/FAQHelpContainer/GovernanceFAQContainer'));
const VotingFAQ = React.lazy(() => import('./features/FAQHelpContainer/VotingFAQContainer'));

const GeneralDefinition = React.lazy(() => import('./features/FAQHelpContainer/GeneralDefinitionsConatainer'));
const ActivismDefinition = React.lazy(() => import('./features/FAQHelpContainer/ActivismDefinitionsContainer'));
const ActivistShortsDefinition = React.lazy(() =>
  import('./features/FAQHelpContainer/ActivistShortsDefinitionsContainer')
);
const ActivistVulnerabilityDefinition = React.lazy(() =>
  import('./features/FAQHelpContainer/ActivistVulnerabilityDefinitionsContainer')
);
const GovernanceDefinition = React.lazy(() => import('./features/FAQHelpContainer/GovernanceDefinitionsContainer'));
const VotingDefinition = React.lazy(() => import('./features/FAQHelpContainer/VotingDefinitionsContainer'));

const CompensationFAQ = React.lazy(() => import('./features/FAQHelpContainer/CompensationFAQContainer'));

//Preferences
const PreferencesPage = React.lazy(() => import('./features/PreferencesContainer/PreferencesContainer'));

//

//others
const PageNotFound = React.lazy(() => import('./pages/NotFound'));
const CompanyPage = React.lazy(() => import('./features/CompanyContainer/CompanyContainer'));

//Universal Search
const UniversalSearch = React.lazy(() => import('./features/UniversalSearchContainer/UniversalSearchContainer'));

// Example
const TableExamplePage = React.lazy(() => import('./pages/TableExample'));

const D3PieChartExamplePage = React.lazy(() => import('./features/DummyDataContainer/D3PiechartexampleContainer'));
const D3StackbarChartExamplePage = React.lazy(() =>
  import('./features/DummyDataContainer/D3StackBarChartExampleContainer')
);
const D3InterlockingExamplePage = React.lazy(() => import('./features/DummyDataContainer/D3InterlockingContainer'));
const D3MapPage = React.lazy(() => import('./pages/D3MapExample'));
const D3MultiTablePage = React.lazy(() => import('./features/DummyDataContainer/MultiTableContainer'));
const NotesWidgetExamplePage = React.lazy(() => import('./pages/NotesWidgetExample'));
const UnderConstructionPage = React.lazy(() => import('./pages/UnderConstruction'));
const D3SquarePillChartChartExamplePage = React.lazy(() => import('./features/DummyDataContainer/D3TreeMapContainer'));

//#endregion

// #region Company > Compensation 
const CompanyCompensationOverviewPage = React.lazy(() => import('./features/CompanyContainer/Compensation/Overview/CompanyCompensationOverviewContainer'));
const CompanyCompensationPerformanceMetricBreakDown = React.lazy(() => import('./features/CompanyContainer/Compensation/PerformanceMetricBreakdownContainer/PerformanceMetricBreakdownContainer'));
const CompanyCompensationExecutivePay = React.lazy(() => import('./features/CompanyContainer/Compensation/ExecutivePayContainer/ExecutivePayContainer'));
const CompanyCompensationPolicyDetails = React.lazy(() => import('./features/CompanyContainer/Compensation/CompensationPolicyDetailsContainer/CompensationPolicyDetailsContainer'));
// #endregion

//#region MyAlert

const MyAlertPage = React.lazy(() => import('./features/MyAlertContainer/MyAlert/MyNewAlertContainer'));
const RecentDownloadsPage = React.lazy(() => import('./features/RecentDownloadsContainer/RecentDownloadsContainer'));
const MyAlertExistingAlerts = React.lazy(() => import('./features/MyAlertContainer/MyAlert/ExistingAlertContainer'));
const MyAlertInbox = React.lazy(() => import('./features/MyAlertContainer/MyAlert/InboxAlertContainer'));

//#endregion

//#region
const PeopleSearch = React.lazy(() => import('./features/PeopleSearchContainer/PeoplesearchContainer'));
const PeopleOverview = React.lazy(() => import('./features/PeopleSearchContainer/PeopleOverviewContainer'));
const DirectorshipAndExecutive = React.lazy(() =>
  import('./features/PeopleSearchContainer/DirectorshipAndExecutive/DirectorshipAndExecutiveContainer')
);
const CompensationPeople = React.lazy(() =>
  import('./features/PeopleSearchContainer/Compensation/CompensationPeopleContainer')
);
//#endregion

const PrivateRoute = ({ component: Component, ...rest }) => {
  const propRest = rest;
  return (

    <Route
      {...propRest}
      render={(props) => {
        if (isUserAuthenticated()) {
          return <Component {...props} />;
        }
        history.push(pathConst.CREDENTIAL_FORM);
      }}
    />
  );
};

function App() {
  return (
    <Router basename={() => getBasename()} history={history}>
      <Switch>
        <Route
          path={pathConst.CREDENTIAL_FORM}
          Component={AuthForm}
          render={(props) => {
            if (query.otk) {
              localStorage.removeItem('token');
              localStorage.removeItem('userEmail');
              return <Login {...props} />;
            }
            if (isUserAuthenticated()) {
              return <Redirect to={pathConst.DASHBOARD} />;
            }
            return <Login {...props} />;
          }}
        />
        <MainLayout>
          <React.Suspense fallback={<PageSpinner />}>
            <Switch>
              {/* <PrivateRoute exact path={pathConst.ACTIVISM_MONTHLY} component={ActivismMonthly_MagazinesReport} /> */}
              <PrivateRoute exact path={pathConst.LATEST_REPORTS} component={Latest_MagazinesReport} />
              {/* <PrivateRoute exact path={pathConst.ACTIVISM_MAGAZINE} component={Activism_MagazinesReport} /> */}
              <PrivateRoute
                exact
                path={pathConst.ACTIVISM_LATEST_REPORTS}
                component={Activism_Latest_MagazinesReport}
              />
              <PrivateRoute
                exact
                path={pathConst.ACTIVISM_MONTHLY_REPORTS}
                component={Activism_Monthly_MagazinesReport}
              />
              <PrivateRoute
                exact
                path={pathConst.ACTIVISM_QUARTERLY_STATS_REPORTS}
                component={Activism_Quarterly_Stats_MagazinesReport}
              />
              <PrivateRoute
                exact
                path={pathConst.ACTIVISM_SPECIAL_REPORTS}
                component={Activism_Special_MagazinesReport}
              />
              <PrivateRoute exact path={pathConst.ACTIVISM_13F_REPORTS} component={Activism_13F_MagazinesReport} />

              {/* <PrivateRoute exact path={pathConst.VOTING_MAGAZINE} component={Voting_MagazinesReport} /> */}
              <PrivateRoute exact path={pathConst.VOTING_LATEST_REPORTS} component={Voting_Latest_MagazinesReport} />
              <PrivateRoute exact path={pathConst.VOTING_MONTHLY_REPORTS} component={Voting_Monthly_MagazinesReport} />
              <PrivateRoute exact path={pathConst.VOTING_SPECIAL_REPORTS} component={Voting_Special_MagazinesReport} />

              <PrivateRoute exact path={pathConst.SHORTS_LATEST_REPORTS} component={Shorts_Latest_MagazinesReport} />
              <PrivateRoute
                exact
                path={pathConst.GOVERNANCE_LATEST_REPORTS}
                component={Governance_Latest_MagazinesReport}
              />

              <PrivateRoute exact path={pathConst.PROXY_MONTHLY} component={ProxyMonthly_MagazinesReport} />
              <PrivateRoute exact path={pathConst.SPECIAL_REPORTS} component={SpecialReports_MagazinesReport} />
              <PrivateRoute exact path={pathConst.SEARCH_ALLREPORTS} component={SearchAllReports_MagazinesReport} />

              <PrivateRoute exact path={pathConst.DASHBOARD} component={DashboardPage} />
              <PrivateRoute exact path={pathConst.PREFERENCES} component={PreferencesPage} />
              <PrivateRoute exact path={pathConst.GENERAL_FAQ} component={GeneralFAQ} />
              <PrivateRoute exact path={pathConst.GENERAL_DEFINITION} component={GeneralDefinition} />
              <PrivateRoute exact path={pathConst.ACTIVISM_FAQ} component={ActivismFAQ} />
              <PrivateRoute exact path={pathConst.ACTIVISTSHORTS_FAQ} component={ActivistShortsFAQ} />
              <PrivateRoute exact path={pathConst.ACTIVIST_VULNERABILITY_FAQ} component={ActivistVulnerabilityFAQ} />
              <PrivateRoute exact path={pathConst.GOVERNANCE_FAQ} component={GovernanceFAQ} />
              <PrivateRoute exact path={pathConst.VOTING_FAQ} component={VotingFAQ} />
              <PrivateRoute exact path={pathConst.ACTIVISM_DEFINITION} component={ActivismDefinition} />
              <PrivateRoute exact path={pathConst.ACTIVISTSHORTS_DEFINITION} component={ActivistShortsDefinition} />
              <PrivateRoute exact path={pathConst.COMPENSATION_FAQHELP} component={CompensationFAQ} />
              <PrivateRoute
                exact
                path={pathConst.ACTIVIST_VULNERABILITY_DEFINITION}
                component={ActivistVulnerabilityDefinition}
              />
              <PrivateRoute exact path={pathConst.GOVERNANCE_DEFINITION} component={GovernanceDefinition} />
              <PrivateRoute exact path={pathConst.VOTING_DEFINITION} component={VotingDefinition} />
              <PrivateRoute exact path={pathConst.COMPANY_SEARCH} component={CompanyPage} />

              {/* Universal Search */}
              <PrivateRoute exact path={pathConst.UNIVERSAL_SEARCH} component={UniversalSearch} />

              {/* My Alert */}
              <PrivateRoute exact path={pathConst.MY_ALERT_NEW} component={MyAlertPage} />
              <PrivateRoute exact path={pathConst.RECENT_DOWNLOADS} component={RecentDownloadsPage} />
              <PrivateRoute exact path={pathConst.MY_ALERT_EXISTING_ALERT} component={MyAlertExistingAlerts} />
              <PrivateRoute exact path={pathConst.MY_ALERT_INBOX} component={MyAlertInbox} />
              {/* People Search */}
              <PrivateRoute exact path={pathConst.PEOPLE_SEARCH} component={PeopleSearch} />
              <PrivateRoute exact path={pathConst.DIRECTORSHIP_AND_EXECUTIVE} component={DirectorshipAndExecutive} />

              <PrivateRoute exact path={pathConst.PEOPLE_OVERVIEW} component={PeopleOverview} />
              <PrivateRoute exact path={pathConst.PEOPLE_COMPENSATION} component={CompensationPeople} />

              {/* news */}
              <PrivateRoute exact path={pathConst.NEWSMENU} component={NewsPage} />

              {/* Investors */}
              <PrivateRoute exact path={pathConst.INVESTOR_SEARCH} component={InvestorPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_OVERVIEW} component={InvestorOverviewPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_ACTIVISM} component={InvestorActivismPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_ACTIVISM_CAMPAIGNS} component={InvestorActivismCampaigns} />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ACTIVISM_INVESTMENTS}
                component={InvestorActivismInvestments}
              />
              <PrivateRoute exact path={pathConst.INVESTOR_ACTIVISM_DEMANDS} component={InvestorActivismDemand} />
              <PrivateRoute exact path={pathConst.INVESTOR_ACTIVISM_OVERVIEW} component={InvestorActivismOverview} />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ACTIVISM_FOLLOWER_RETURNS}
                component={InvestorActivismFollowerReturns}
              />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ACTIVISM_PERFORMANCE}
                component={InvestorActivismPerformance}
              />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ACTIVISM_PERFORMANCE_ANNUAL}
                component={InvestorActivismPerformanceAnnual}
              />
              <PrivateRoute exact path={pathConst.INVESTOR_ACTIVISM_FILINGS} component={InvestorActivismFiling} />

              <PrivateRoute exact path={pathConst.INVESTOR_ACTIVIST_SHORT} component={InvestorActivistShortsPage} />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW}
                component={InvestorActivistShortsOverviewPage}
              />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ACTIVIST_SHORT_CAMPAIGNS}
                component={InvestorActivistShortsCampaignsPage}
              />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES}
                component={InvestorActivistShortsOwnershipDisclosuresPage}
              />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ACTIVIST_SHORT_FILINGS}
                component={InvestorActivistShortsFilingsPage}
              />

              <PrivateRoute exact path={pathConst.INVESTOR_VOTING} component={InvestorVotingPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_VOTING_OVERVIEW} component={InvestorVotingOverviewPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_VOTING_PROFILE} component={InvestorVotingProfilePage} />
              <PrivateRoute exact path={pathConst.INVESTOR_VOTING_SUMMARY} component={InvestorVotingSummaryPage} />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_VOTING_BY_PROPOSAL}
                component={InvestorVotingbyProposalPage}
              />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_ISS_GL_COMPARATOR}
                component={InvestorVotingISSGLComparatorPage}
              />
              <PrivateRoute exact path={pathConst.INVESTOR_VOTING_RATIONALE} component={InvestorVotingRationalePage} />
              <PrivateRoute
                exact
                path={pathConst.INVESTOR_PROXY_CONTEST_VOTING}
                component={InvestorProxyContestVotingPage}
              />
              <PrivateRoute exact path={pathConst.INVESTOR_FUNDS_VOTED} component={InvestorFundsVotedPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_NEWS} component={InvestorNewsPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_NEWS + pathConst.GET_ID} component={InvestorNewsPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_OWNERSHIP} component={InvestorOwnershipPage} />
              <PrivateRoute
                exact
                path={pathConst.OWNERSHIP_INVESTOR_LONG_INVESTOR}
                component={InvestorOwnershipLongInvestorPage}
              />
              <PrivateRoute
                exact
                path={pathConst.OWNERSHIP_INVESTOR_LONG_FUND}
                component={InvestorOwnershipLongFundPage}
              />
              <PrivateRoute
                exact
                path={pathConst.OWNERSHIP_INVESTOR_SHORT_INVESTOR}
                component={InvestorOwnershipShortInvestorPage}
              />
              <PrivateRoute
                exact
                path={pathConst.OWNERSHIP_INVESTOR_SHORT_FUND}
                component={InvestorOwnershipShortFundPage}
              />

              <PrivateRoute exact path={pathConst.NEWS_SEARCH} component={newsSearch} />
              <PrivateRoute exact path={pathConst.NEWS_OVERVIEW} component={NewsLetestOverviewPage} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVISM_LATEST} component={ActivismLatestNews} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVISM_THIS_WEEK} component={ActivismThisweekNews} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVISM_IN_DEPTH_ARTICLES} component={ActivismInDepthNews} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVIST_SHORT} component={newsActivistShorts} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES} component={AsInDepthNews} />
              <PrivateRoute
                exact
                path={pathConst.NEWS_ACTIVIST_VULNERABILITY_LATEST}
                component={newsActivistVulnerablity}
              />
              <PrivateRoute
                exact
                path={pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT}
                component={newsActivistVulnerablityReports}
              />
              <PrivateRoute
                exact
                path={pathConst.NEWS_ACTIVIST_VULNERABILITY_HIT}
                component={newsActivistVulnerablityHits}
              />
              <PrivateRoute
                exact
                path={pathConst.NEWS_ACTIVIST_VULNERABILITY_UPDATES}
                component={newsActivistVulnerablityUpdates}
              />
              <PrivateRoute exact path={pathConst.NEWS_COMPENSATION} component={NewsCompensation} />
              <PrivateRoute exact path={pathConst.NEWS_GOVERNANCE} component={newsGovernance} />
              <PrivateRoute exact path={pathConst.NEWS_VOTING} component={newsVoting} />
              <PrivateRoute exact path={pathConst.NEWS_VOTING_IN_DEPTH_ARTICLES} component={VoteInDepthNews} />
              <PrivateRoute exact path={pathConst.NEWS_SEARCH + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_OVERVIEW + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVISM_LATEST + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVISM_COVID19 + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVISM_THIS_WEEK + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVISM_WEEKLY_WRAP + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute
                exact
                path={pathConst.NEWS_ACTIVISM_IN_DEPTH_ARTICLES + pathConst.GET_ID}
                component={NewsPage}
              />
              <PrivateRoute exact path={pathConst.NEWS_ACTIVIST_SHORT + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute
                exact
                path={pathConst.NEWS_ACTIVIST_VULNERABILITY_LATEST + pathConst.GET_ID}
                component={NewsPage}
              />
              <PrivateRoute
                exact
                path={pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT + pathConst.GET_ID}
                component={NewsPage}
              />
              <PrivateRoute exact path={pathConst.NEWS_GOVERNANCE + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_VOTING + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_VOTING_IN_DEPTH_ARTICLES + pathConst.GET_ID} component={NewsPage} />
              <PrivateRoute exact path={pathConst.NEWS_COMPENSATION + pathConst.GET_ID} component={NewsPage} />

              {/* Advisors */}
              <PrivateRoute exact path={pathConst.ADVISOR_SEARCH} component={AdvisorPage} />
              <PrivateRoute exact path={pathConst.ADVISOR_OVERVIEW} component={AdvisorOverviewPage} />
              <PrivateRoute exact path={pathConst.ADVISOR_ACTIVISM_OVERVIEW} component={AdvisorActivismOverviewPage} />
              <PrivateRoute exact path={pathConst.ADVISOR_ACTIVISTSHORT} component={AdvisorActivistShortOverviewPage} />
              <PrivateRoute exact path={pathConst.ADVISOR_VOTING_OVERVIEW} component={AdvisorVotingOverviewPage} />

              {/* Notes */}
              <PrivateRoute exact path={pathConst.NOTES_WIDGET_EXAMPLE_PAGE} component={NotesWidgetExamplePage} />
              {/* Company > Compensation */}
              <PrivateRoute exact path={pathConst.COMPANY_COMPENSATION_OVERVIEW} component={CompanyCompensationOverviewPage} />
              <PrivateRoute exact path={pathConst.COMPANY_COMPENSATION_PERFORMANCE_METRIC_BREAKDOWN} component={CompanyCompensationPerformanceMetricBreakDown} />
              <PrivateRoute exact path={pathConst.COMPANY_COMPENSATION_EXECUTIVE_PAY} component={CompanyCompensationExecutivePay} />
              <PrivateRoute exact path={pathConst.COMPANY_COMPENSATION_POLICY_DETAILS} component={CompanyCompensationPolicyDetails} />

              {/* Tools*/}
              <PrivateRoute exact path={pathConst.TOOLMENU} component={ToolsPage} />
              {/* Tools > Activism */}
              <PrivateRoute exact path={pathConst.ACTIVIST_CAMPAIGNS_TOOL} component={ActivistCampaignsToolPage} />
              <PrivateRoute exact path={pathConst.PUBLICDEMANDS_TOOL} component={PublicDemandsToolPage} />
              <PrivateRoute
                exact
                path={pathConst.HOLDINGSDATA_AND_ANALYTICS_TOOL}
                component={HoldingsDataAndAnalyticsToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.SHAREHOLDER_PROPOSALS_TOOL}
                component={ShareholderProposalsToolPage}
              />
              {/* <PrivateRoute exact path={pathConst.PERFORMANCE_TOOL} component={PerformanceToolPage} /> */}
              <PrivateRoute exact path={pathConst.ANNUAL_PERFORMANCE} component={AnnualPerformancePage} />
              <PrivateRoute exact path={pathConst.ANNUAL_COMPOUNDED} component={AnnualCompoundedPage} />
              <PrivateRoute
                exact
                path={pathConst.FOLLOWER_RETURNS_DATA_AND_ANALYTICS_TOOL}
                component={FollowerReturnsDataAndAnalyticsToolPage}
              />
              <PrivateRoute exact path={pathConst.FILLINGS_SEARCH_TOOL} component={FillingsSearchToolPage} />
              <PrivateRoute exact path={pathConst.ACTIVIST_CAMPAIGN_ADVISOR} component={ActivistCampaignAdvisor} />
              <PrivateRoute exact path={pathConst.ACTIVISM_TRENDS} component={ActivismTrendsPage} />
              {/* Tools > Voting */}
              <PrivateRoute exact path={pathConst.RESOLUTION_TRACKER_TOOL} component={ResolutionTrackerToolPage} />
              <PrivateRoute exact path={pathConst.INVESTOR_COMPARATOR_TOOL} component={InvestorComparatorToolPage} />
              <PrivateRoute exact path={pathConst.HISTORICAL_TRENDS_PDF} component={HistoricalTreandsPdfTool} />
              <PrivateRoute
                exact
                path={pathConst.ISS_GL_RESOLUTIONANALYSIS_TOOL}
                component={ISS_GLResolutionAnalysisToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.NOACTIONDATA_AND_ANALYTICS_TOOL}
                component={NoActionDataAndAnalyticsToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.DISSIDENT_VOTING_SUMMARY_TOOL}
                component={DissidentVotingSummaryToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.ADVANCED_VOTING_DATA_SEARCH}
                component={AdvancedVotingDataSearchPage}
              />
              <PrivateRoute
                exact
                path={pathConst.POISONPILLDATA_AND_ANALYTICS_TOOL}
                component={PoisonPillDataAndAnalyticsPage}
              />
              {/* Tools > Governance */}
              <PrivateRoute
                exact
                path={pathConst.COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL}
                component={CompanyGovernanceDataAndAnalyticsToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL}
                component={Governance_CompanyPeerGroupComparisonMatrixToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.US_STATEGOVERNANCEDATA_TOOL}
                component={USStateGovernanceDataToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.GLOBAL_GOVERNANCEDATA_TOOL}
                component={GlobalGovernanceDataToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.DIRECTORDATA_AND_ANALYTICS_TOOL}
                component={DirectorDataAndAnalyticsToolPage}
              />
              <PrivateRoute exact path={pathConst.UPCOMING_EVENTS_TOOL} component={UpcomingEventsToolPage} />
              <PrivateRoute
                exact
                path={pathConst.AMENDMENT_DATA_AND_ANALYTICS_TOOL}
                component={AmendmentDataAndAnalyticsToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.POISONPILLDATA_AND_ANALYTICS_TOOL}
                component={PoisonPillDataAndAnalyticsToolPage}
              />
              <PrivateRoute exact path={pathConst.GOVERNANCE_SCORE_DATA_TOOL} component={GovernanceScoreDataToolPage} />
              <PrivateRoute exact path={pathConst.GOVERNANCE_DIRECTOR_SKILLS_AND_ANALYTICS_TOOL} component={DirectorSkillsAndAnalyticsToolPage} />

              {/* Tools > Vulnerability */}
              <PrivateRoute
                exact
                path={pathConst.VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL}
                component={Vulnerability_CompanyPeerGroupComparisonMatrixToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.VULNAREBILITY_ADVANCED_SEARCH}
                component={Vulnerability_AdvancedSearchToolPage}
              />
              {/* Tools > ShortActivism */}
              <PrivateRoute
                exact
                path={pathConst.SHORT_CAMPAIGN_DATA_AND_ANALYTICS}
                component={ShortCampaignDataandAnalyticsToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.NOTIFIED_SHORT_POSITION_DATA}
                component={NotifiedShortPositionDataToolPage}
              />
              <PrivateRoute
                exact
                path={pathConst.NOTIFIED_SHORT_POSITION_DATA_Latest_Notification}
                component={NotifiedShortPositionDataLatestNotificationPage}
              />
              <PrivateRoute
                exact
                path={pathConst.SHORT_ACTIVIST_CAMPAIGN_ADVISOR}
                component={ShortActivistCampaignAdvisorPage}
              />
              <PrivateRoute exact path={pathConst.SHORT_ACTIVIST_FILLINGS_SEARCH} component={AiSFillingsSearchPage} />
              <PrivateRoute exact path={pathConst.COMPENSATION_P4P_MODELER} component={CompensationP4PModelerPage} />
              <PrivateRoute exact path={pathConst.COMPENSATION_SAY_ON_PAY_VOTE_RESULTS} component={ComensationSayOnPayVotePage} />
              <PrivateRoute exact path={pathConst.COMPENSATION_REMUNERATION_COMMITEE_MEMBER} component={CompensationRemunerationCommiteePage} />
              <PrivateRoute exact path={pathConst.COMPENSATION_COMPARATOR} component={CompensationComparator} />

              {/* Tools > PowerSearch */}
              <PrivateRoute exact path={pathConst.POWERSEARCH_TOOL} component={PowerSearchToolPage} />

              {/* company */}
              <PrivateRoute exact path={pathConst.GOVERNANCE} component={GovernancePage} />
              <PrivateRoute exact path={pathConst.GOVERNANCE_OVERVIEW} component={GovernanceOverviewPage} />
              <PrivateRoute
                exact
                path={pathConst.GOVERNANCE_BYLAWSCHARTERGUIDELINES}
                component={GovBylawsCharterGuidelinesPage}
              />
              <PrivateRoute exact path={pathConst.GOVERNANCE_DIRECTORS} component={DirectorsPage} />
              <PrivateRoute exact path={pathConst.GOVERNANCE_POISONPILL} component={PoisonpillPage} />
              <PrivateRoute exact path={pathConst.GOVERNANCE_LATESTFILINGS} component={LatestFilingsPage} />
              <PrivateRoute exact path={pathConst.GOVERNANCE_COMPLIANCE} component={CompliancePage} />
              <PrivateRoute exact path={pathConst.GOVERNANCE_SHAREHOLDERPROPOSAL} component={ShareholderProposalPage} />
              <PrivateRoute exact path={pathConst.GOVERNANCE_HISTORICAL} component={historicalGovernancePage} />
              <PrivateRoute exact path={pathConst.NEWS} component={CompanyNewsPage} />
              <PrivateRoute exact path={pathConst.NEWS + pathConst.GET_ID} component={CompanyNewsPage} />
              <PrivateRoute
                exact
                path={pathConst.OWNERSHIP_LONG_INVESTOR}
                component={CompanyOwnershipLongInvestorPage}
              />
              <PrivateRoute exact path={pathConst.OWNERSHIP_LONG_FUND} component={CompanyOwnershipLongFundPage} />
              <PrivateRoute
                exact
                path={pathConst.OWNERSHIP_SHORT_INVESTOR}
                component={CompanyOwnershipShortInvestorPage}
              />
              <PrivateRoute exact path={pathConst.OWNERSHIP_SHORT_FUND} component={CompanyOwnershipShortFundPage} />
              <PrivateRoute exact path={pathConst.COMPANY_OVERVIEW} component={CompanyOverviewPage} />
              <PrivateRoute exact path={pathConst.ACTIVISM} component={ActivismPage} />
              <PrivateRoute exact path={pathConst.ACTIVISM_OVERVIEW} component={ActivismOverviewPage} />
              <PrivateRoute exact path={pathConst.ACTIVIST_FILINGS} component={ActivismFilingPage} />
              <PrivateRoute exact path={pathConst.ACTIVIST_INVESTMENT} component={ActivistInvestmentPage} />
              <PrivateRoute exact path={pathConst.ACTIVIST_CAMPAIGNS} component={ActivistCampaignsPage} />
              <PrivateRoute exact path={pathConst.COMPANY_SEARCH_PAGE} component={CompanySearchPage} />
              <PrivateRoute exact path={pathConst.ACTIVISTSHORTS} component={ActivistShortsPage} />
              <PrivateRoute exact path={pathConst.ACTIVISTSHORTS_OVERVIEW} component={ActivistShortsOverviewPage} />
              <PrivateRoute exact path={pathConst.ACTIVISTSHORTS_CAMPAIGNS} component={ActivistShortCampaignsPage} />
              <PrivateRoute exact path={pathConst.ACTIVISTSHORTS_FILINGS} component={ActivistShortFilingPage} />
              <PrivateRoute exact path={pathConst.ACTIVIST_VULNERABILITY} component={ActivistVulnerabilityPage} />
              <PrivateRoute exact path={pathConst.VOTING} component={VotingPage} />
              <PrivateRoute exact path={pathConst.VOTING_OVERVIEW} component={VotingOverviewPage} />
              <PrivateRoute exact path={pathConst.VOTING_QUICKVIEW} component={VotingQuickviewPage} />
              <PrivateRoute exact path={pathConst.VOTING_POLICYCHECKER} component={VotingPolicyCheckerPage} />
              <PrivateRoute exact path={pathConst.VOTING_RESULTS} component={VotingResultsPage} />
              <PrivateRoute exact path={pathConst.VOTING_NOACTIONLETTER} component={VotingNoActionLettersPage} />

              <PrivateRoute exact path={pathConst.VOTING_VOTEDETAIL} component={VotingVoteDetailPage} />
              <PrivateRoute exact path={pathConst.VOTING_VOTESAGAINST_MGMT} component={VotingVotesAgainstMgmtPage} />
              {/* example  */}
              <PrivateRoute exact path={pathConst.TABLE_EXAMPLE_PAGE} component={TableExamplePage} />
              <PrivateRoute exact path={pathConst.D3_PIE_CHART_EXAMPLE_PAGE} component={D3PieChartExamplePage} />
              <PrivateRoute
                exact
                path={pathConst.D3_STACKBAR_CHART_EXAMPLE_PAGE}
                component={D3StackbarChartExamplePage}
              />
              <PrivateRoute exact path={pathConst.D3_INTERLOCKING_EXAMPLE_PAGE} component={D3InterlockingExamplePage} />
              <PrivateRoute exact path={pathConst.D3_SQUARE_PILLCHART} component={D3SquarePillChartChartExamplePage} />
              <PrivateRoute exact path={pathConst.D3_MAP_PAGE} component={D3MapPage} />
              <PrivateRoute exact path={pathConst.D3_MULTI_TABLE_PAGE} component={D3MultiTablePage} />
              <PrivateRoute exact path={pathConst.UNDER_CONSTRUCTION_PAGE} component={UnderConstructionPage} />
              <PrivateRoute component={PageNotFound} />
            </Switch>
          </React.Suspense>
        </MainLayout>

      </Switch>
    </Router>
  );
}

export default App;
