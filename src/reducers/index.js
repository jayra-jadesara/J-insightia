import { combineReducers } from 'redux';
import loginReducer from '../features/LoginContainer/loginSlice';
import companyReducer from '../features/CompanyContainer/CompanySlice';
import dashboardReducer from '../features/DashboardContainer/DashboardSlice';
import companyVotingReducer from '../features/CompanyVotingContainer/CompanyVotingSlice';
import dummydataReducer from '../features/DummyDataContainer/DummyDataSlice';
import titleReducer from '../features/General/TitleSlice';
import toolsReducer from '../features/ToolsContainer/ToolsSlice';
import toolsResolutionTrackerReducer from '../features/ToolsContainer/Voting/ToolsResolutionTrackerSlice';
import toolsDissidentVotingSummaryReducer from '../features/ToolsContainer/Voting/ToolsDissidentVotingSummarySlice';
import notifiedShortPositionDataReducer from '../features/ToolsContainer/ShortActivism/NotifiedShortPositionDataSlice';
import newsReducer from '../features/NewsContainer/NewsSlice';
import investorReducer from '../features/InvestorContainer/InvestorSlice';
import investorOwnershipReducer from '../features/InvestorContainer/Ownership/InvestorOwnershipSlice';
import votingByResolutionReducer from '../features/InvestorContainer/Voting/VotingByResolutionSlice';
import proxyContestVotingReducer from '../features/InvestorContainer/Voting/ProxyContestVotingSlice';
import investorFundVotesReducer from '../features/InvestorContainer/Voting/FundVotedSlice';
import faqHelpReducer from '../features/FAQHelpContainer/FAQHelpSlice';
import preferencesReducer from '../features/PreferencesContainer/PreferencesSlice';
import magazinesReportReducer from '../features/MagazinesReportContainer/MagazinesReportSlice';
import shortCampaignDataandAnalyticsReducer from '../features/ToolsContainer/ShortActivism/ShortCampaignDataandAnalyticsToolSlice';
import investorActivistShortReducer from '../features/InvestorContainer/ActivistShorts/ActivistShortSlice';
import AdvancedVotingDataSearchSlice from '../features/ToolsContainer/Voting/AdvancedVotingDataSearchSlice';
import votingProfileSlice from '../features/InvestorContainer/VotingProfile/InvestorVotingProfileSlice';
import myAlertSliceReducer from '../features/MyAlertContainer/MyAlert/MyAlertSlice';
import votingToolSliceReducer from '../features/ToolsContainer/Voting/VotingToolSlice';
import CompanyGovernanceDataAndAnalyticsTool from '../features/ToolsContainer/Governance/CompanyGovernanceAndAnalyticsToolsSlice';
import PeopleSearchReducer from '../features/PeopleSearchContainer/PeoplesearchSlice';
import AdvisersReducer from '../features/AdvisorContainer/AdvisersSlice';
import UniversalSearchReducer from '../features/UniversalSearchContainer/UniversalSearchSlice';
import HeaderReducer from '../features/LayoutContainer/HeaderSlice';
import activistCampaignsSliceReducer from '../features/CompanyContainer/Activism/ActivistCampaigns/ActivistCampaignsSlice';
import InboxAlertSlice from '../features/MyAlertContainer/MyAlert/InboxAlertSlice';
import AdvisorVotingNoActionReducer from '../features/AdvisorContainer/Voting/VotingNoActionSlice';
import GovernanceOverviewSliceReducer from '../features/CompanyContainer/Governance/GovernanceOverviewSlice';
import VotingOverviewReducer from '../features/InvestorContainer/Voting/VotingOverviewSlice';
import PowerSearchSlice from '../features/ToolsContainer/PowerSearch/PowerSearchSlice';
import ActivistCampaignAdvisor from '../features/ToolsContainer/ActivistCampaignAdvisorSlice';
import ShortsActivistCampaignAdvisor from '../features/ToolsContainer/ShortActivism/ShortActivistCampaignAdvisor_Slice';
import FillingSearchToolReducer from '../features/ToolsContainer/FillingSearchToolsSlice';
import PoisonPillDataAndAnalyticsReducer from '../features/ToolsContainer/Governance/PoisonPillDataAndAnalyticsSlice';
import InvestorActivismReducer from '../features/InvestorContainer/Activism/InvestorActivismSlice';
import DirectorDataAndAnalyticsToolsSlice from '../features/ToolsContainer/Governance/DirectorDataAndAnalyticsToolsSlice';
import ActivismTrendsSlice from '../features/ToolsContainer/ActivismTrendsSlice';
import AiSFillingsSearchSlice from '../features/ToolsContainer/ShortActivism/AiSFillingsSearchSlice';
import RecentDownloadsSlice from '../features/RecentDownloadsContainer/RecentDownloadsSlice';
import UpcomingEventsToolSlice from '../features/ToolsContainer/Governance/UpcomingEventsToolSlice';
import GovernanceScoreToolsSlice from '../features/ToolsContainer/Governance/GovernanceScoreToolsSlice';
import TrialSlice from '../features/CompanyContainer/TrialSlice';
import AmendmentDataandAnalyticsToolSlice from '../features/ToolsContainer/Governance/AmendmentDataandAnalyticsToolSlice';
import ActivistShortsOverviewSlice from '../features/CompanyContainer/ActivistShorts/ActivistShortsOverview/ActivistShortsOverviewSlice';
import ActivistShortCampaignSlice from '../features/CompanyContainer/ActivistShorts/ActivistShortCampaignsSlice';
import HistoricalGovernanceSlice from '../features/CompanyContainer/HistoricalGovernanceSlice';
import DirectorSkillsAndAnalyticsToolsSlice from '../features/ToolsContainer/Governance/DirectorSkillsAndAnalyticsToolsSlice';
import InvestorComparatorToolSlice from '../features/ToolsContainer/Voting/InvestorComparatorToolSlice';
import SaveSearchToolSlice from '../features/ToolsContainer/General/SaveSearchToolSlice';
import CompensationToolsSlice from '../features/ToolsContainer/Compensation/CompensationToolsSlice';
import CompanyCompensationOverviewSlice from '../features/CompanyContainer/Compensation/Overview/CompanyCompensationOverviewSlice';
import PeopleCompensationSlice from '../features/PeopleSearchContainer/Compensation/CompensationSlice';
import PerformanceMetricBreakdownSlice from '../features/CompanyContainer/Compensation/PerformanceMetricBreakdownContainer/PerformanceMetricBreakdownSlice';
import ExecutivePaySlice from '../features/CompanyContainer/Compensation/ExecutivePayContainer/ExecutivePaySlice';
import CompensationPolicyDetailsSlice from '../features/CompanyContainer/Compensation/CompensationPolicyDetailsContainer/CompensationPolicyDetailsSlice';

export default combineReducers({
  header: HeaderReducer,
  headerTitle: titleReducer,
  invFundVoted: investorFundVotesReducer,
  invVotingOverview: VotingOverviewReducer,
  investorVotingProfile: votingProfileSlice,
  magazinesReport: magazinesReportReducer,
  login: loginReducer,
  company: companyReducer,
  dashboard: dashboardReducer,
  companyVoting: companyVotingReducer,
  dummydata: dummydataReducer,
  tools: toolsReducer,
  toolsResolutionTracker: toolsResolutionTrackerReducer,
  toolsDissidentVotingSummary: toolsDissidentVotingSummaryReducer,
  news: newsReducer,
  investor: investorReducer,
  investorOwnership: investorOwnershipReducer,
  faqhelp: faqHelpReducer,
  preferences: preferencesReducer,
  votingByResolution: votingByResolutionReducer,
  proxyContestVoting: proxyContestVotingReducer,
  notifiedShortPositionData: notifiedShortPositionDataReducer,
  shortCampaignDataandAnalytics: shortCampaignDataandAnalyticsReducer,
  investorActivistShort: investorActivistShortReducer,
  advancedVotingDataSearch: AdvancedVotingDataSearchSlice,
  myAlert: myAlertSliceReducer,
  votingTool: votingToolSliceReducer,
  companyGovernance: CompanyGovernanceDataAndAnalyticsTool,
  Peoplesearch: PeopleSearchReducer,
  advisers: AdvisersReducer,
  universalsearch: UniversalSearchReducer,
  activistCampaigns: activistCampaignsSliceReducer,
  advisorVotingNoAction: AdvisorVotingNoActionReducer,
  inboxAlert: InboxAlertSlice,
  companyGovernanceOverview: GovernanceOverviewSliceReducer,
  powersearch: PowerSearchSlice,
  ActivistCampaignAdvisor,
  shortsActivistCampaignAdvisor: ShortsActivistCampaignAdvisor,
  fillingSearchTool: FillingSearchToolReducer,
  poisonpill: PoisonPillDataAndAnalyticsReducer,
  InvestorActivismSlice: InvestorActivismReducer,
  directoDataAndAnalytics: DirectorDataAndAnalyticsToolsSlice,
  activismtrends: ActivismTrendsSlice,
  aisfillingssearch: AiSFillingsSearchSlice,
  RecentDownloads: RecentDownloadsSlice,
  upcomingMeetings: UpcomingEventsToolSlice,
  governancescoretool: GovernanceScoreToolsSlice,
  trial: TrialSlice,
  amendmentDataandAnalyticsTool: AmendmentDataandAnalyticsToolSlice,
  companyActivistShortsOverview: ActivistShortsOverviewSlice,
  activistShortCampaigns: ActivistShortCampaignSlice,
  historicalGovernance: HistoricalGovernanceSlice,
  directoSkillsAndAnalytics: DirectorSkillsAndAnalyticsToolsSlice,
  investorComparatorTool: InvestorComparatorToolSlice,
  saveSearchFilter: SaveSearchToolSlice,
  CompensationTools: CompensationToolsSlice,
  companyCompensationOverview: CompanyCompensationOverviewSlice,
  peopleCompensation: PeopleCompensationSlice,
  companyPerformanceMetricBreakdown: PerformanceMetricBreakdownSlice,
  companyCompensationExecutivePay: ExecutivePaySlice,
  companyCompensationPolicy: CompensationPolicyDetailsSlice,
});
