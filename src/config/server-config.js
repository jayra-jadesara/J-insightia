export const baseUrl = '';
export const tokenSecrectKey = 'd012690c-c97d-4e35-aeed-7bc6eeec4e6a';

export const configToken = {
  headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
};

// login
export const sendForgotPasswordEmail = `${baseUrl}/api/v1/sendForgotPasswordEmail`;
export const userAuthenticate = `${baseUrl}/api/v1/authenticate`;
export const resetPassword = `${baseUrl}/api/v1/resetPassword`;
export const logout = `${baseUrl}/api/v1/logout`;
export const getUserMembership = `${baseUrl}/api/v1/getUserMembership`;
export const lookupDecIPForIPLogin = `${baseUrl}/api/v1/LookupDecIPForIPLogin`;
export const authenticateIPLogin = `${baseUrl}/api/v1/authenticateIPLogin`;
export const createComputer = `${baseUrl}/api/v1/createComputer`;
export const updateComputerLogin = `${baseUrl}/api/v1/updateComputerLogin`;
export const isBranchUpToDate = `${baseUrl}/api/v1/isBranchUpToDate`;

// General
export const sendPageNotFoundVisitorsLog = `${baseUrl}/api/v1/general/sendPageNotFoundVisitorsLog`;
export const sendAPIErrorLog = `${baseUrl}/api/v1/general/sendAPIErrorLog`;

export const addVisitorLog = `${baseUrl}/api/v1/general/AddVisitorLog`;
export const addTrialLog = `${baseUrl}/api/v1/general/AddTrialLog`;
export const getCountriesMap = `${baseUrl}/api/v1/general/GetCountriesMap`;
export const getCountriesMapActivismCampaigns = `${baseUrl}/api/v1/general/GetCountriesMapActivismCampaigns`;
export const getToolTip = `${baseUrl}/api/v1/general/GetToolTip`;
export const getProcedureRunningEstimateTime = `${baseUrl}/api/v1/general/GetProcedureRunningEstimateTime`;

// Dashboard
export const getAllIssuers = `${baseUrl}/api/v1/dashboard/GetAllIssuers`;
export const piListIndices = `${baseUrl}/api/v1/dashboard/PIListIndices`;
export const getExchange = `${baseUrl}/api/v1/dashboard/GetExchange`;
export const getAIPeerGroups = `${baseUrl}/api/v1/dashboard/GetAIPeerGroups`;
export const getListRegionsAndCountries = `${baseUrl}/api/v1/dashboard/GetListCompanyRegionsAndCountries`;
export const piListSectorsAndIndustries = `${baseUrl}/api/v1/dashboard/PIListSectorsAndIndustries`;
export const freeSearchCompanyAndIndustry = `${baseUrl}/api/v1/dashboard/FreeSearchCompanyAndIndustry`;
export const getCompanySearchOptions = `${baseUrl}/api/v1/dashboard/GetCompanySearchOptions`;
export const addTblCopmanySearchCopmanies = `${baseUrl}/api/v1/dashboard/AddTblCopmanySearchCopmanies`;
export const addTblcompanySearchIndex = `${baseUrl}/api/v1/dashboard/AddTblcompanySearchIndex`;
export const updateCompanySearchOptions = `${baseUrl}/api/v1/dashboard/UpdateCompanySearchOptions`;
export const getCompanySearchSelection = `${baseUrl}/api/v1/dashboard/GetCompanySearchSelection`;
export const addTblcompanySearchExchange = `${baseUrl}/api/v1/dashboard/AddTblCompanySearchExchange`;
export const addTblCompanySearchPeerGroup = `${baseUrl}/api/v1/dashboard/AddTblCompanySearchPeerGroup`;
export const addTblCompanySearchIndustry = `${baseUrl}/api/v1/dashboard/AddTblCompanySearchIndustry`;
export const addTblCompanySearchMarketCap = `${baseUrl}/api/v1/dashboard/AddTblCompanySearchMarketCap`;
export const addtblCompanySearchCountry = `${baseUrl}/api/v1/dashboard/AddtblCompanySearchCountry`;
export const deletetblCompanySearchCountry = `${baseUrl}/api/v1/dashboard/DeletetblCompanySearchCountry`;
export const deleteTblCompanySearchIndustry = `${baseUrl}/api/v1/dashboard/DeleteTblCompanySearchIndustry`;
export const getAllDashboardWidget = `${baseUrl}/api/v1/dashboard/GetAllDashboardWidget`;
export const updateTblDashboard = `${baseUrl}/api/v1/dashboard/UpdateTblDashboard`;
export const addtblDashboardWidgetLink = `${baseUrl}/api/v1/dashboard/AddtblDashboardWidgetLink`;
export const getUserDashboard = `${baseUrl}/api/v1/dashboard/GetUserDashboard`;
export const deleteDashboardSelection = `${baseUrl}/api/v1/dashboard/DeleteDashboardSelection`;
export const getTblDashboardWidgets = `${baseUrl}/api/v1/dashboard/GetTblDashboardWidgets`;
export const getStoredProcedure = `${baseUrl}/api/v1/dashboard/GetStoredProcedure`;
export const getStoredProcedureDownload = `${baseUrl}/api/v1/dashboard/GetStoredProcedureDownload`;

export const resetDashboardWidgetCompanySearch = `${baseUrl}/api/v1/dashboard/ResetDashboardWidgetCompanySearch`;
export const resetDashboardWidgetInvestorSearch = `${baseUrl}/api/v1/dashboard/ResetDashboardWidgetInvestorSearch`;
//dashboard portals
export const GetPortalsTop3News = `${baseUrl}/api/v1/dashboard/GetPortalsTop3News`;
export const GetDashboardIdData = `${baseUrl}/api/v1/dashboard/GetDashboardIds`;
export const GetHotActivistData = `${baseUrl}/api/v1/dashboard/GetHotActivistData`;
export const GetDirectorAppointmentChartData = `${baseUrl}/api/v1/dashboard/GetDirectorAppointmentChartData`;
export const GetAigRussell3000Score = `${baseUrl}/api/v1/dashboard/GetAigRussell3000Score`;
export const GetShareHolderProposalESG = `${baseUrl}/api/v1/dashboard/GetShareHolderProposalESG`;
export const GetVotingPolicyChangesESG = `${baseUrl}/api/v1/dashboard/GetVotingPolicyChangesESG`;
export const GetUpCommingShareHolderESG = `${baseUrl}/api/v1/dashboard/GetUpCommingShareHolderESG`;
export const GetMagazinesIssuesESG = `${baseUrl}/api/v1/dashboard/GetMagazinesIssuesESG`;
// investor
export const UpdateInvestorSearchOptions = `${baseUrl}/api/v1/dashboard/UpdateInvestorSearchOptions`;
export const GetCurrentShareholder = `${baseUrl}/api/v1/dashboard/GetCurrentShareholder`;
export const AddTblInvestorSearchInvestors = `${baseUrl}/api/v1/dashboard/AddTblInvestorSearchInvestors`;
export const AddTblInvestorSearchAUM = `${baseUrl}/api/v1/dashboard/AddTblInvestorSearchAUM`;
export const DeletetblInvestors_SearchType = `${baseUrl}/api/v1/dashboard/DeletetblInvestors_SearchType`;
export const AddtblInvestors_SearchType = `${baseUrl}/api/v1/dashboard/AddtblInvestors_SearchType`;
export const GetInvestorsSearchOptions = `${baseUrl}/api/v1/dashboard/GetInvestorsSearchOptions`;
export const Deletetblinvestor_search_country = `${baseUrl}/api/v1/dashboard/Deletetblinvestor_search_country`;
export const Addtblinvestor_search_country = `${baseUrl}/api/v1/dashboard/Addtblinvestor_search_country`;
export const ListInvestorTypeAndSubtype = `${baseUrl}/api/v1/dashboard/ListInvestorTypeAndSubtype`;
export const AddtblInvestors_byshareholdercompany = `${baseUrl}/api/v1/dashboard/AddtblInvestors_byshareholdercompany`;
export const GetInvestorSearchSelection = `${baseUrl}/api/v1/dashboard/GetInvestorSearchSelection`;
export const GetAllInvestors = `${baseUrl}/api/v1/dashboard/GetAllInvestors`;
export const FreeSearchInvestor = `${baseUrl}/api/v1/dashboard/FreeSearchInvestor`;
export const GetAllInvestorsFromShareholderOfCompany = `${baseUrl}/api/v1/dashboard/GetAllInvestorsFromShareholderOfCompany`;
export const GetVulnerabilityHitsData = `${baseUrl}/api/v1/dashboard/GetVulnerabilityHitsData`;
//errorBoundary
export const getErrorBoundryDetails = `${baseUrl}/api/v1/dashboard/GetErrorBoundryDetails`;

// company
//feedback
export const sendFeedbackMail = `${baseUrl}/api/v1/general/FeedbackMail`;
//
//ForeignSecurityKey
export const getForeignSecurityKey = `${baseUrl}/api/v1/general/getForeignSecurityKey`;
// Header
export const getProfiles_insightia = `${baseUrl}/api/v1/general/GetProfiles_insightia`;
//
export const company_serarch = `${baseUrl}/api/v1/company/search`;
export const getCompanyProfile = `${baseUrl}/api/v1/company/GetCompanyProfile`;
export const listTopTwentyActivistActivity = `${baseUrl}/api/v1/company/ListTopTwentyActivistActivity`;
//Activism overview
export const getActivismOverviewGraphs = `${baseUrl}/api/v1/company/GetActivismOverviewGraphs`;
// Activism Filing
export const listCompanyFilingsByActivist_v2 = `${baseUrl}/api/v1/company/ListCompanyFilingsByActivist_v2`;
export const getCompanyActivisamTabDataCheck = `${baseUrl}/api/v1/company/GetCompanyActivisamTabDataCheck`;
// export const getAdvisorSearchData = `${baseUrl}/api/v1/company/getAdvisorSearchData`;

//COmpany Overview
export const getCompanyOverviewProfile = `${baseUrl}/api/v1/company/GetCompanyOverviewProfile`;
export const getCompanyStockEvents = `${baseUrl}/api/v1/company/GetCompanyStockEvents`;
export const getLollipops_graph = `${baseUrl}/api/v1/company/GetLollipops_graph`;
export const getStockValues_graph = `${baseUrl}/api/v1/company/GetStockValues_graph`;
export const getCompanyPeerGroupOverview = `${baseUrl}/api/v1/company/GetCompanyPeerGroupOverview`;
export const getPeerGroupName = `${baseUrl}/api/v1/company/GetPeerGroupName`;

// ACTIVIST SHORT OVERVIEW: Export the routes to the stored procedures
export const getAiSCompDisclosedShortPositions = `${baseUrl}/api/v1/company/GetAiSCompDisclosedShortPositions`;
export const getAiSCompTotalShortPositions = `${baseUrl}/api/v1/company/GetAiSCompTotalShortPositions`;
export const getHistoricShortPositions = `${baseUrl}/api/v1/company/GetHistoricShortPositions`;
export const adm_Check_PID = `${baseUrl}/api/v1/company/Adm_Check_PID`;
export const listActivistInvestorsForCompany_NEW_ais = `${baseUrl}/api/v1/company/ListActivistInvestorsForCompany_NEW_ais`;
export const GetFDAProductRecallListData = `${baseUrl}/api/v1/company/GetFDAProductRecallListData`;

// ACTIVIST SHORT CAMPAIGNS
export const listActivistInvestorsForCompanyAiS = `${baseUrl}/api/v1/company/ListActivistInvestorsForCompanyAiS`;
export const getActivismSummary_AiS = `${baseUrl}/api/v1/company/GetActivismSummary_AiS`;

//Activist Short module
export const getActivistShortModuleAccess = `${baseUrl}/api/v1/company/getActivistShorSubModuleAccess`;

export const latestActivistDemands = `${baseUrl}/api/v1/company/LatestActivistDemands`;
export const listTop8TimeLine = `${baseUrl}/api/v1/company/ListTimeLines`;
export const activeActivists_Trends_Overview = `${baseUrl}/api/v1/company/ActiveActivists_Trends_Overview`;
export const companiesTargeted_Trends_Overview = `${baseUrl}/api/v1/company/CompaniesTargeted_Trends_Overview`;
export const getIssuerLatestMeetingId = `${baseUrl}/api/v1/company/getIssuerLatestMeetingId`;
export const ListMeetingDates = `${baseUrl}/api/v1/company/ListMeetingDates`;
export const getIssuerProfile = `${baseUrl}/api/v1/company/GetIssuerProfile`;
export const GetIssuer_Meeting_stats = `${baseUrl}/api/v1/company/GetIssuer_Meeting_stats`;
export const getProposalList = `${baseUrl}/api/v1/company/GetMeetingType_id`;
export const MeetingQuickViewDynamicPivotv4 = `${baseUrl}/api/v1/company/MeetingQuickViewDynamicPivotv4`;
export const GetVoteResults_v3 = `${baseUrl}/api/v1/company/GetVoteResults_v3`;
export const GetVotingData_allvotes_v2 = `${baseUrl}/api/v1/company/GetVotingData_allvotes_v2`;
export const GetVotingData_rationale_meeting_against = `${baseUrl}/api/v1/company/GetVotingData_rationale_meeting_against`;
export const ListIssuerVotesAgainst = `${baseUrl}/api/v1/company/ListIssuerVotesAgainst`;
export const GetSelectedProposalsCountry = `${baseUrl}/api/v1/company/GetSelectedProposalsCountry`;
export const BindgvVotingGrid = `${baseUrl}/api/v1/company/BindgvVotingGrid`;
export const GetShareClasses = `${baseUrl}/api/v1/company/GetShareClasses`;
export const GetNoActionTrackInfo = `${baseUrl}/api/v1/company/GetNoActionTrackInfo`;
export const noActionLettersDataExists = `${baseUrl}/api/v1/company/noActionLettersDataExists`;
export const GetNoActionLetterProposalDetail = `${baseUrl}/api/v1/company/GetNoActionLetterProposalDetail`;
export const GetVotingData_rationale_meeting = `${baseUrl}/api/v1/company/GetVotingData_rationale_meeting`;

// Voting Tools : No action letter
export const getVotingToolNoActionLetterDDL = `${baseUrl}/api/v1/noactionLetterVotingTool/getVotingToolNoActionLetterDDL`;
export const getVotingToolNoActionLetterAnalysisData = `${baseUrl}/api/v1/noactionLetterVotingTool/getVotingToolNoActionLetterAnalysisData`;
export const noActionLetterDummyData = `${baseUrl}/api/v1/dummydata/noActionLetterDummyData`;

//Tools Compensations
export const getCompensationComparatorData = `${baseUrl}/api/v1/toolCompensation/GetCompensationComparatorData`;
export const GetDirectorTypes = `${baseUrl}/api/v1/toolCompensation/GetDirectorTypes`;
export const GetAllPeopleList = `${baseUrl}/api/v1/toolCompensation/GetAllPeopleList`;
export const GetPeerGroupData = `${baseUrl}/api/v1/toolCompensation/GetPeerGroupData`;

// Company> Activism > Activist campaigns
export const getActivistCampaignsDataList = `${baseUrl}/api/v1/company/getActivistCampaignsDataList`;
export const getActivistCampaignsDataListV2 = `${baseUrl}/api/v1/company/getActivistCampaignsDataListV2`;
export const ActivistCampiagnDummyData = `${baseUrl}/api/v1/dummydata/ActivistCampiagnDummyData`;

// Company> Activism > Activist Investment
export const getActivistInvestorsForCompany = `${baseUrl}/api/v1/company/getActivistInvestorsForCompany`;
export const getActivistNotifiedHolding = `${baseUrl}/api/v1/company/getActivistNotifiedHolding`;

// Company> Governance> Overview
export const getGovOverview_meetingInfo_Quickview_StockData = `${baseUrl}/api/v1/governanceCompanyOverview/GetGovOverview_meetingInfo_Quickview_StockData`;
export const getBoardAndDirectorsIndexDDL = `${baseUrl}/api/v1/governanceCompanyOverview/GetBoardAndDirectorsIndexDDL`;
export const getComparisionTables = `${baseUrl}/api/v1/governanceCompanyOverview/GetComparisionTables`;
export const CompanyGovernanceOverviewDummyData = `${baseUrl}/api/v1/dummydata/CompanyGovernanceOverviewDummyData`;
// AIV
export const PIGetIssuer = `${baseUrl}/api/v1/company/PIGetIssuer`;
export const PIGetMostRecentAGMOrPCMeetingIdWithVotes = `${baseUrl}/api/v1/company/PIGetMostRecentAGMOrPCMeetingIdWithVotes`;
export const PIGetVoteResults = `${baseUrl}/api/v1/company/PIGetVoteResults`;
export const PIGetShareholdersTop10 = `${baseUrl}/api/v1/company/PIGetShareholdersTop10`;
export const GetShareHoldersActivistOnly = `${baseUrl}/api/v1/company/GetShareHoldersActivistOnly`;
export const GetActivismSummary = `${baseUrl}/api/v1/company/GetActivismSummary`;
export const GetVunGetAllInstitutionalMediansAndMADMs = `${baseUrl}/api/v1/company/GetVunGetAllInstitutionalMediansAndMADMs`;
export const GetVunGetAllActivistMediansAndMADMs = `${baseUrl}/api/v1/company/GetVunGetAllActivistMediansAndMADMs`;
export const VunGetAllRemunerationMediansAndMADMs = `${baseUrl}/api/v1/company/VunGetAllRemunerationMediansAndMADMs`;
export const VunGetAllDirectorMediansAndMADMs = `${baseUrl}/api/v1/company/VunGetAllDirectorMediansAndMADMs`;
export const VunGetAllRemunerationMediansAndMADMsYearAroundDate = `${baseUrl}/api/v1/company/VunGetAllRemunerationMediansAndMADMsYearAroundDate`;

export const VunList10QAnd10KForIssuer = `${baseUrl}/api/v1/company/VunList10QAnd10KForIssuer`;
export const VunGetGovDirectorInfoV4 = `${baseUrl}/api/v1/company/VunGetGovDirectorInfoV4`;
export const VunListNewsArticlesForIssuer = `${baseUrl}/api/v1/company/VunListNewsArticlesForIssuer`;
export const vunSummaryScore = `${baseUrl}/api/v1/company/VunSummaryScore`;

// AiV Charts
export const getVulnerabilityScoreOverTime = `${baseUrl}/api/v1/company/GetVulnerabilityScoreOverTime`;
export const getVulnerabilityPrankOverTime = `${baseUrl}/api/v1/company/GetVulnerabilityPrankOverTime`;

// AiG Governance

// AiG Header-Checks
export const getGovShowPoisonPillTab = `${baseUrl}/api/v1/general/GetGovShowPoisonPillTab`;
export const getGovShowLatestFilingsTab = `${baseUrl}/api/v1/general/GetGovShowLatestFilingsTab`;
export const getGovShowShareholderProposalsTab = `${baseUrl}/api/v1/general/GetGovShowShareholderProposalsTab`;
export const getGovShowComplianceTab = `${baseUrl}/api/v1/general/GetGovShowComplianceTab`;
export const get_Bylaws_Charter_GovGuidelines = `${baseUrl}/api/v1/general/Get_Bylaws_Charter_GovGuidelines`;
export const getHistoricalGovernanceTab = `${baseUrl}/api/v1/general/GetHistoricalGovernanceTab`;

// AiG Shareholder Proposals
export const getAIG_ShareholderProposals_v2 = `${baseUrl}/api/v1/company/GetAIG_ShareholderProposals_v2`;

// AiG Latest Filings
export const getGovCompanyDirector503 = `${baseUrl}/api/v1/company/GetGovCompanyDirector503`;
export const getCompanyDirector502_v2 = `${baseUrl}/api/v1/company/GetCompanyDirector502_v2`;
export const getCompanyDirector507_v2 = `${baseUrl}/api/v1/company/GetCompanyDirector507_v2`;
export const getCompanyDirectorshort_v2 = `${baseUrl}/api/v1/company/GetCompanyDirectorshort_v2`;
export const getCompanyDirector10k_v2 = `${baseUrl}/api/v1/company/GetCompanyDirector10k_v2`;

// AiG Company Directors
export const get_Gov_Independent_Graph_Data = `${baseUrl}/api/v1/company/Get_Gov_Independent_Graph_Data`;
export const get_Gov_Tenure_Graph_Data = `${baseUrl}/api/v1/company/Get_Gov_Tenure_Graph_Data`;
export const get_Gov_Gender_Graph_Data = `${baseUrl}/api/v1/company/Get_Gov_Gender_Graph_Data`;
export const getGovDirectorInfo = `${baseUrl}/api/v1/company/GetGovDirectorInfo`;
export const getComDirProf = `${baseUrl}/api/v1/company/GetComDirProf`;
export const getComDirUpcoming = `${baseUrl}/api/v1/company/GetComDirUpcoming`;
export const getComDirProfPast = `${baseUrl}/api/v1/company/GetComDirProfPast`;
export const getBoardNewsHeadlines = `${baseUrl}/api/v1/company/GetBoardNewsHeadlines`;
export const get_interlocking_directors_JSON_v2 = `${baseUrl}/api/v1/company/Get_interlocking_directors_JSON_v2`;
export const getComDirProfPastHeaderCol = `${baseUrl}/api/v1/company/GetComDirProfPastHeaderCol`;

// Aig Historical Governance
export const GetHistoricalGovernance = `${baseUrl}/api/v1/company/GetHistoricalGovernance`;

// Ownership-Company
export const getLatestOwnershipDateList = `${baseUrl}/api/v1/company/getLatestOwnershipDateList`;
export const getOwnershipLongInvestorData = `${baseUrl}/api/v1/company/getOwnershipLongInvestorData`;
export const getOwnershipLongFundData = `${baseUrl}/api/v1/company/getOwnershipLongFundData`;
export const getOwnershipShortInvestorData = `${baseUrl}/api/v1/company/getOwnershipShortInvestorData`;
export const getOwnershipShortFundData = `${baseUrl}/api/v1/company/getOwnershipShortFundData`;
export const getOwnershipLongShortInvestorDataCheck = `${baseUrl}/api/v1/company/getOwnershipLongShortInvestorDataCheck`;

export const OwnershipCompanyDummyData = `${baseUrl}/api/v1/dummydata/OwnershipCompanyDummyData`;

// AiG Poison Pill
export const getDetPoisonPill = `${baseUrl}/api/v1/company/GetDetPoisonPill`;
export const getItem303Material = `${baseUrl}/api/v1/company/GetItem303Material`;
export const getDetPoisonPillTopHdr = `${baseUrl}/api/v1/company/GetDetPoisonPillTopHdr`;

// AiG Bylaws
export const getCompanyDirector503 = `${baseUrl}/api/v1/company/GetCompanyDirector503`;
export const get_Bylaws_Charter_GovGuidelines_Data = `${baseUrl}/api/v1/company/Get_Bylaws_Charter_GovGuidelines_Data`;

// AiG Complience
export const getCompFillingType = `${baseUrl}/api/v1/company/GetCompFillingType`;
export const getCompStatement = `${baseUrl}/api/v1/company/GetCompStatement`;
export const getComplianceComparisonIndexes = `${baseUrl}/api/v1/company/GetComplianceComparisonIndexes`;
export const getComplianceVotinDissent = `${baseUrl}/api/v1/company/GetComplianceVotinDissent`;

// Voting Overview
export const listVotingOwnershipForProposal_v2 = `${baseUrl}/api/v1/company/ListVotingOwnershipForProposal_v2`;
export const get_OtherBoards = `${baseUrl}/api/v1/company/Get_OtherBoards`;
export const getVotingData_rationale = `${baseUrl}/api/v1/company/GetVotingData_rationale`;
export const listVotingAndOwnerhipForProposal_insightia = `${baseUrl}/api/v1/company/ListVotingAndOwnerhipForProposal_insightia`;
export const getMeetingURLs = `${baseUrl}/api/v1/company/getMeetingURLs`;

//Company Trial
export const addTriallog = `${baseUrl}/api/v1/company/addTrialPageLog`;
export const sendMailToTeam = `${baseUrl}/api/v1/company/sendMailToTeam`;
export const getActivistShortCampaignAdvisersData = `${baseUrl}/api/v1/company/GetActivistShortCampaignAdvisersData`;

export const getInvestorIdFromCampaignId = `${baseUrl}/api/v1/company/GetInvestorIdFromCampaignId`;
export const getPeerGroupDefaultName = `${baseUrl}/api/v1/company/GetPeerGroupDefaultName`;
export const UpdateCompanyVunScore = `${baseUrl}/api/v1/company/UpdateCompanyVunScore`;
// UpdateCompanyVunScore
export const getAdmGetCompanyShell_spac = `${baseUrl}/api/v1/company/GetAdmGetCompanyShell_spac`;
export const getSplitVotingDetails = `${baseUrl}/api/v1/company/GetSplitVotingDetails`;
//Compensation
export const getCompensationPerformanceMetricBreakDown = `${baseUrl}/api/v1/company/GetCompensationPerformanceMetricBreakDown`;
export const GetCompensationExecutivePayData = `${baseUrl}/api/v1/company/GetCompensationExecutivePayData`;
export const getCompensationOverviewSummaryDetails = `${baseUrl}/api/v1/company/getCompensationOverviewSummaryDetails`;
export const getCompensationOverviewExecutiveAndDirectorDetails = `${baseUrl}/api/v1/company/GetCompensationOverviewExecutiveAndDirectorDetails`;
//Compensatino Copany policy details
export const getCompensatioCompanyolicyDetailsHighestPaidExecutive = `${baseUrl}/api/v1/company/GetCompensatioCompanyolicyDetailsHighestPaidExecutive`;
export const getCompensationPolicyDetails = `${baseUrl}/api/v1/company/GetCompensationPolicyDetails`;
export const getCompensationPolicyHighestPaidExecutiveData = `${baseUrl}/api/v1/company/GetCompensationPolicyHighestPaidExecutiveData`;
export const GetCompensationNonExecutivePay = `${baseUrl}/api/v1/company/GetCompensationNonExecutivePay`;
export const GetCompensationHighestPaidExe = `${baseUrl}/api/v1/company/GetCompensationHighestPaidExe`;
export const GetCompensationReportYears = `${baseUrl}/api/v1/company/GetCompensationReportYears`;

/// investor
export const investor_search = `${baseUrl}/api/v1/investor/search`;

export const getInvestorProfile = `${baseUrl}/api/v1/investor/GetInvestorProfile`;
export const listActivistFilingsByActivist_v2 = `${baseUrl}/api/v1/investor/ListActivistFilingsByActivist_v2`;
export const listActivistFilingsByActivistAiS = `${baseUrl}/api/v1/investor/ListActivistFilingsByActivistAiS`;
export const getInvestorNavReq = `${baseUrl}/api/v1/investor/GetInvestorNavReq`;
export const getFMProfile = `${baseUrl}/api/v1/investor/GetFMProfile`;
export const getVotingRationale_byInvestor = `${baseUrl}/api/v1/votingRationale/GetVotingRationale_byInvestor`;
//investor - overview
export const getActiviststrategyData = `${baseUrl}/api/v1/investorActivism/GetActiviststrategyData`;
export const getHoldingsbyCountryChartData = `${baseUrl}/api/v1/investorActivism/GetHoldingsbyCountryChartData`;
export const getHoldingsbyIndustryChartData = `${baseUrl}/api/v1/investorActivism/GetHoldingsbyIndustryChartData`;
export const getHoldingsbyExitTypeChartData = `${baseUrl}/api/v1/investorActivism/GetHoldingsbyExitTypeChartData`;
export const getHoldingsbyMarketCapChartData = `${baseUrl}/api/v1/investorActivism/GetHoldingsbyMarketCapChartData`;
export const getActivistProfileData = `${baseUrl}/api/v1/investorActivism/GetActivistProfileData`;
export const getCampaignTypesbyActivistLst = `${baseUrl}/api/v1/investorActivism/GetCampaignTypesbyActivistLst`;
export const getActivistOfficesLst = `${baseUrl}/api/v1/investorActivism/GetActivistOfficesLst`;
export const getActivistPersonnelLst = `${baseUrl}/api/v1/investorActivism/GetActivistPersonnelLst`;
export const getActivistTimelineLst = `${baseUrl}/api/v1/investorActivism/GetActivistTimelineLst`;
export const getActivistSharholderProposalsLst = `${baseUrl}/api/v1/investorActivism/GetActivistSharholderProposalsLst`;
export const getInvestorActivisamTabDataCheck = `${baseUrl}/api/v1/investorActivism/GetInvestorActivisamTabDataCheck`;
//Investor - Activist Campaigns
export const getInvestorActivistCampaignsDataList = `${baseUrl}/api/v1/investorActivism/GetInvestorActivistCampaignsDataList`;

//Investor - Investments
export const getActivistHoldingsLst = `${baseUrl}/api/v1/investorActivism/GetActivistHoldingsLst`;
export const get13F_Filings_by_ActivistLst = `${baseUrl}/api/v1/investorActivism/Get13F_Filings_by_ActivistLst`;

//Investor - Demands
export const getActivistGBRCampaignsLst = `${baseUrl}/api/v1/investorActivism/GetActivistGBRCampaignsLst`;
export const getCampaignSummarybyActivistLst = `${baseUrl}/api/v1/investorActivism/GetCampaignSummarybyActivistLst`;

//Investor - Follower returns
export const getFollowerReturnsSearchLst = `${baseUrl}/api/v1/investorActivism/GetFollowerReturnsSearchLst`;
export const getFollowerReturnsActivistStatschartData = `${baseUrl}/api/v1/investorActivism/GetFollowerReturnsActivistStatschartData`;
export const getFollowerReturnsActivistStatsData = `${baseUrl}/api/v1/investorActivism/GetFollowerReturnsActivistStatsData`;

//Investor - performance
export const getPerformancePeriodicbyActivistLst = `${baseUrl}/api/v1/investorActivism/GetPerformancePeriodicbyActivistLst`;
export const getListofReprtingDate = `${baseUrl}/api/v1/investorActivism/GetListofReprtingDate`;
export const getPerformanceAnnualbyActivistLst = `${baseUrl}/api/v1/investorActivism/GetPerformanceAnnualbyActivistLst`;

// Investor - voting
export const getDissidentVotingByInvestor = `${baseUrl}/api/v1/investorVoting/GetDissidentVotingByInvestor`;
export const getSupportByDissident = `${baseUrl}/api/v1/investorVoting/GetSupportByDissident`;
export const getProxyContestsChartData = `${baseUrl}/api/v1/investorVoting/GetProxyContestsChartData`;

// Investor - voting profile
export const getInvestorDDLList = `${baseUrl}/api/v1/investorVotingProfile/GetInvestorDDLList`;
export const getVotingProfileTopSection = `${baseUrl}/api/v1/investorVotingProfile/GetVotingProfileTopSection`;
export const getVotingProfileBottomSection = `${baseUrl}/api/v1/investorVotingProfile/GetVotingProfileBottomSection`;

export const investorVotingProfileDummyData = `${baseUrl}/api/v1/dummydata/investorVotingProfileDummyData`;

// Investor - Activist short
export const getActivistIdFromInvestor = `${baseUrl}/api/v1/investorActivistShort/GetActivistIdFromInvestor`;
export const getInvestorIdFromActivist = `${baseUrl}/api/v1/investorActivistShort/GetInvestorIdFromActivist`;
export const listCampaignTypesbyActivist = `${baseUrl}/api/v1/investorActivistShort/ListCampaignTypesbyActivist`;
export const getHoldingsbyCountryAiS = `${baseUrl}/api/v1/investorActivistShort/GetHoldingsbyCountryAiS`;
export const getHoldingsbyIndustryAiS = `${baseUrl}/api/v1/investorActivistShort/GetHoldingsbyIndustryAiS`;
export const getHoldingsbyMarketCapAiS = `${baseUrl}/api/v1/investorActivistShort/GetHoldingsbyMarketCapAiS`;
export const getCampaignSummarybyActivistAiS = `${baseUrl}/api/v1/investorActivistShort/GetCampaignSummarybyActivistAiS`;
// investor - ownership
export const investor_getLatestOwnershipDateList = `${baseUrl}/api/v1/investorOwnership/getLatestOwnershipDateList`;
export const getInvestor_OwnershipLongInvestorData = `${baseUrl}/api/v1/investorOwnership/getInvestor_OwnershipLongInvestorData`;
export const getInvestor_OwnershipLongFundData_Insightia = `${baseUrl}/api/v1/investorOwnership/getInvestor_OwnershipLongFundData_Insightia`;
export const getInvestor_OwnershipShortInvestorData_Insightia = `${baseUrl}/api/v1/investorOwnership/getInvestor_OwnershipShortInvestorData_Insightia`;
export const getInvestor_OwnershipShortFundData_Insightia = `${baseUrl}/api/v1/investorOwnership/getInvestor_OwnershipShortFundData_Insightia`;
export const getInvestorOwnershipLongShortDataCheck = `${baseUrl}/api/v1/investorOwnership/getInvestorOwnershipLongShortDataCheck`;

export const investorOwnershipCompanyDummyData = `${baseUrl}/api/v1/dummydata/investorOwnershipCompanyDummyData`;

// investor - fund votes
export const getVotedByManagerList = `${baseUrl}/api/v1/fundVotes/GetVotedByManagerList`;
//investor voting overview
export const getInvestorVoteSummary = `${baseUrl}/api/v1/votingOverview/GetInvestorVoteSummary`;
export const issAndglasslewis_vote = `${baseUrl}/api/v1/votingOverview/IssAndglasslewis_vote`;
export const getManager_voting_against = `${baseUrl}/api/v1/votingOverview/GetManager_voting_against`;
export const getDissident_Data_for_Investor_v2 = `${baseUrl}/api/v1/votingOverview/GetDissident_Data_for_Investor_v2`;
export const getManager_latest_against2 = `${baseUrl}/api/v1/votingOverview/GetManager_latest_against2`;

// sample data
export const GetVotingListTrialUser = `${baseUrl}/api/v1/company/GetVotingListTrialUser`;
export const votingOverviewPageTrialList = `${baseUrl}/api/v1/dummydata/GetVotingOverviewPageTrialList`;
export const votingQuickviewPageTrialList = `${baseUrl}/api/v1/dummydata/GetVotingQuickviewPageTrialList`;
export const votingResultsPageTrialList = `${baseUrl}/api/v1/dummydata/GetVotingResultsPageTrialList`;
export const votingDetailPageTrialList = `${baseUrl}/api/v1/dummydata/GetVotingDetailPageTrialList`;
export const votingAgainstMgmtPageTrialList = `${baseUrl}/api/v1/dummydata/GetVotingAgainstMgmtPageTrialList`;
export const votingPolicyCheckerPageTrialList = `${baseUrl}/api/v1/dummydata/GetVotingPolicyCheckerPageTrialList`;

// Advisor
export const getAdvisorSearchData = `${baseUrl}/api/v1/advisor/getAdvisorSearchData`;
export const getAdvisorModuleAccessData = `${baseUrl}/api/v1/advisor/getAdvisorModuleAccessData`;
export const getAdvisorProfile = `${baseUrl}/api/v1/advisor/getAdvisorProfile`;
export const getAdvisorActivismCompanyWebsite = `${baseUrl}/api/v1/advisor/getAdvisorActivismCompanyWebsite`;
export const getAdvisorActivismPersonnel = `${baseUrl}/api/v1/advisor/getAdvisorActivismPersonnel`;
export const getAdvisorActivismCampaigns = `${baseUrl}/api/v1/advisor/getAdvisorActivismCampaigns`;
export const getAdvisorActivistShortCampaigns = `${baseUrl}/api/v1/advisor/getAdvisorActivistShortCampaigns`;
export const getIntermediaryData = `${baseUrl}/api/v1/advisor/getIntermediaryData`;
export const getAdvisorVotingDetailInfo = `${baseUrl}/api/v1/advisor/getAdvisorVotingDetailInfo`;
export const getAdvisorVotingWindandInstrByYear = `${baseUrl}/api/v1/advisor/getAdvisorVotingWindandInstrByYear`;
export const getLawFirmProposalTypes = `${baseUrl}/api/v1/advisor/GetLawFirmProposalTypes`;

// news
export const addNewsVisitorLog = `${baseUrl}/api/v1/news/AddNewsVisitorLog`;
export const getLatestNewsFiltered = `${baseUrl}/api/v1/news/GetLatestNewsFiltered`;
export const listnewswithTag = `${baseUrl}/api/v1/news/ListnewswithTag`;
export const listForViewNewsTimelineTop5 = `${baseUrl}/api/v1/news/ListForViewNewsTimelineTop5`;
export const dummyActivismTimeline = `${baseUrl}/api/v1/news/DummyActivismTimeline`;
export const getNewsMoreInformationLinks = `${baseUrl}/api/v1/news/GetNewsMoreInformationLinks`;
export const getNewsDetails = `${baseUrl}/api/v1/news/GetNewsDetails`;
export const getCompanyNewsIds = `${baseUrl}/api/v1/news/GetCompanyNewsIds`;
export const getInvestorNewsIds = `${baseUrl}/api/v1/news/GetInvestorNewsIds`;
export const getMostReadNews = `${baseUrl}/api/v1/news/GetMostReadNews`;
export const getLatestReadNews = `${baseUrl}/api/v1/news/GetLatestReadNews`;
export const getNewsNextPrevious = `${baseUrl}/api/v1/news/GetNewsNextPrevious`;

export const getAllProductLatestNews = `${baseUrl}/api/v1/news/GetAllProductLatestNews`;
export const getNewsEvents = `${baseUrl}/api/v1/news/GetNewsEvents`;
export const getStakeholding = `${baseUrl}/api/v1/news/GetStakeholding`;
export const getActivistObjective = `${baseUrl}/api/v1/news/GetActivistObjective`;
export const newsFilter = `${baseUrl}/api/v1/news/NewsFilter`;
export const getProductMemberships = `${baseUrl}/api/v1/news/GetProductMemberships`;

export const GetActivismListTrialUser = `${baseUrl}/api/v1/dummydata/GetActivismListTrialUser`;
export const GetVulnerabilityListTrialUser = `${baseUrl}/api/v1/dummydata/GetVulnerabilityListTrialUser`;
export const GetActivistShortListTrialUser = `${baseUrl}/api/v1/dummydata/GetActivistShortListTrialUser`;
export const GetGovernanceListTrialUser = `${baseUrl}/api/v1/dummydata/GetGovernanceListTrialUser`;
//
export const d3BarChartDummyData = `${baseUrl}/api/v1/dummydata/GetD3BarChartDummyData`;
export const d3StackBarChartDummyData = `${baseUrl}/api/v1/dummydata/GetD3StackBarChartDummyData`;
export const d3SharePriceChartDummyData = `${baseUrl}/api/v1/dummydata/GetD3SharePriceChartDummyData`;
export const d3PieChartDummyData = `${baseUrl}/api/v1/dummydata/GetD3PieChartDummyData`;
export const d3DoughnutChartData = `${baseUrl}/api/v1/dummydata/GetD3DoughnutChartData`;
export const d3InterlockingChartDummydata = `${baseUrl}/api/v1/dummydata/GetD3InterlockingDummyData`;

// Tools
export const PublicCampaignToolLists = `${baseUrl}/api/v1/tools/PublicCampaignToolLists`;
export const GetPerformanceOverviewV2 = `${baseUrl}/api/v1/tools/GetPerformanceOverviewV2`;
export const GetPerformanceCompounded = `${baseUrl}/api/v1/tools/GetPerformanceCompounded`;
export const ListFundPerformanceByYearV2 = `${baseUrl}/api/v1/tools/ListFundPerformanceByYearV2`;
export const getGlobalGovProvisionList = `${baseUrl}/api/v1/globalGovernanceTool/getGlobalGovProvisionList`;
export const getCountryGovList = `${baseUrl}/api/v1/globalGovernanceTool/getCountryGovList`;
export const getStateGovList = `${baseUrl}/api/v1/globalGovernanceTool/getStateGovList`;
export const getStateGovDetailList = `${baseUrl}/api/v1/globalGovernanceTool/getStateGovDetailList`;
export const GetGlobalGovToolTrialList = `${baseUrl}/api/v1/dummydata/GetGlobalGovToolTrialList`;
export const getAllMeetingType = `${baseUrl}/api/v1/tools/GetAllMeetingType`;
export const getAllGroupProponent = `${baseUrl}/api/v1/tools/GetAllGroupProponent`;
export const getAllIndividualProponent = `${baseUrl}/api/v1/tools/GetAllIndividualProponent`;
export const resolutionsByInvestorFilter = `${baseUrl}/api/v1/tools/ResolutionsByInvestorFilter`;
export const getResolutionsByTarget = `${baseUrl}/api/v1/tools/ResolutionsByTarget`;
export const resolutionSearchByInvestor = `${baseUrl}/api/v1/tools/ResolutionSearchByInvestor`;
export const getHistoricalTrends = `${baseUrl}/api/v1/tools/GetHistoricalTrends`;
export const getResolutionsTypeIdByName = `${baseUrl}/api/v1/tools/GetResolutionsTypeIdByName`;
export const getInvestorVotingPower = `${baseUrl}/api/v1/tools/GetInvestorVotingPower`;
//Director data and Analytics
export const getDirectorSectorAndIndustrySearchData = `${baseUrl}/api/v1/tools/GetDirectorSectorAndIndustrySearchData`;
export const getDirectorDataAndAnalyticsData = `${baseUrl}/api/v1/directorDataAndAnalyticsTool/getDirectorDataAndAnalyticsData`;
export const getDirectorAnalysisData = `${baseUrl}/api/v1/directorDataAndAnalyticsTool/getDirectorAnalysisData`;
export const getDDLEthnicityData = `${baseUrl}/api/v1/directorDataAndAnalyticsTool/getDDLEthnicityData`;

export const getHoldingsDataAndAnalyticsData = `${baseUrl}/api/v1/tools/GetHoldingsDataAndAnalyticsData`;

export const getVulDDL = `${baseUrl}/api/v1/companyPeerGroupComparisonMatrixTool/getVulDDL`;
export const GetVulDataList = `${baseUrl}/api/v1/companyPeerGroupComparisonMatrixTool/GetVulDataList`;
export const getVCId = `${baseUrl}/api/v1/companyPeerGroupComparisonMatrixTool/getVCId`;

// Tools - Investor Tracker
export const resolutionByInvestorTrackerFilter = `${baseUrl}/api/v1/toolsResolutionTracker/ResolutionByInvestorFilter`;
export const investorTrackerResultDetails = `${baseUrl}/api/v1/toolsResolutionTracker/GetProxyResolutionDetails`;
export const historicalTrendsChartData = `${baseUrl}/api/v1/toolsResolutionTracker/ResolutionTrackerHistoricalTrendsChartData`;
export const historicalTrendsChartYTDData = `${baseUrl}/api/v1/toolsResolutionTracker/ResolutionTrackerHistoricalTrendsChartDataYTD`;
export const historicalTrendsChartProxySeasonData = `${baseUrl}/api/v1/toolsResolutionTracker/ResolutionTrackerHistoricalTrendsChartProxySeasonData`;
export const resolutionFilterByTotalVotesAnalysisYTD = `${baseUrl}/api/v1/toolsResolutionTracker/ResolutionFilterByTotalVotesAnalysisYTD`;
export const resolutionFilterByTotalProxySeasonVotesAnalysis = `${baseUrl}/api/v1/toolsResolutionTracker/ResolutionFilterByTotalProxySeasonVotesAnalysis`;
export const resolutionFilterByTotalVotesAnalysis = `${baseUrl}/api/v1/toolsResolutionTracker/ResolutionFilterByTotalVotesAnalysis`;
export const resolutionTrackerFilterByHistoricalTrends = `${baseUrl}/api/v1/toolsResolutionTracker/ResolutionTrackerFilterByHistoricalTrends`;

// Tools -Investor comparator
export const investorComparatorhistoricalTrendsChartYTDData = `${baseUrl}/api/v1/tools/InvestorComparatorhistoricalTrendsChartYTDData`;
export const investorComparatorhistoricalTrendsChartProxySeasonData = `${baseUrl}/api/v1/tools/InvestorComparatorhistoricalTrendsChartProxySeasonData`;
export const getHistoricalTrendsChartDataInvestorComparator = `${baseUrl}/api/v1/tools/GetHistoricalTrendsChartDataInvestorComparator`;

// Tools - Dissident Voting Summary
export const dissidentVotteFiltersLimitedData = `${baseUrl}/api/v1/toolDissidentVotingSummary/DissidentVotteFiltersLimitedData`;
export const dissidentVotteFilters = `${baseUrl}/api/v1/toolDissidentVotingSummary/DissidentVotteFilters`;

// Tools - Fillings Search
export const getToolsActivismFillingsData = `${baseUrl}/api/v1/toolsFillingsSearch/GetToolsActivismFillingsData`;

// Advanced Voting data Search
export const getAdvanceVotingDataFundname = `${baseUrl}/api/v1/advancedVotingDataSearch/GetAdvanceVotingDataFundname`;
export const advancedVotingDataSearchlist = `${baseUrl}/api/v1/advancedVotingDataSearch/AdvancedVotingDataSearchList`;
export const getVoteCast = `${baseUrl}/api/v1/advancedVotingDataSearch/GetVoteCast`;
export const getManagementRecc = `${baseUrl}/api/v1/advancedVotingDataSearch/GetManagementRecc`;
export const getSupport = `${baseUrl}/api/v1/advancedVotingDataSearch/GetSupport`;
export const getOutputField = `${baseUrl}/api/v1/advancedVotingDataSearch/GetOutputField`;
export const getListProposalsAndCategories = `${baseUrl}/api/v1/advancedVotingDataSearch/GetListProposalsAndCategories`;

// Tools - Short Activism
export const getAiSCountriesAndStats = `${baseUrl}/api/v1/notifiedShortPositionDataTool/getAiSCountriesAndStats`;
export const getShortPositions = `${baseUrl}/api/v1/notifiedShortPositionDataTool/GetShortPositions`;
export const getShortPositionsTopTwenty = `${baseUrl}/api/v1/notifiedShortPositionDataTool/GetShortPositionsTopTwenty`;
export const getAiSRecentShortPositions = `${baseUrl}/api/v1/notifiedShortPositionDataTool/GetAiSRecentShortPositions`;
export const getAiSRecentShortPositionsTopTwenty = `${baseUrl}/api/v1/notifiedShortPositionDataTool/GetAiSRecentShortPositionsTopTwenty`;
export const getActivistShortsFillingsData = `${baseUrl}/api/v1/toolsAiSFeelingsSearch/GetActivistShortsFillingsData`;
// Tool - ShortCampaignDataandAnalytics
export const getAiSCampaignInformation = `${baseUrl}/api/v1/toolsShortCampaignDataandAnalytics/GetAiSCampaignInformation`;
export const getAiSCampaignInformationDummyData = `${baseUrl}/api/v1/toolsShortCampaignDataandAnalytics/GetAiSCampaignInformationDummyData`;
export const getShortCampaignSamlpeData = `${baseUrl}/api/v1/toolsShortCampaignDataandAnalytics/GetShortCampaignSamlpeData`;

// Tools - Activism Trends
export const getRegionsTrade = `${baseUrl}/api/v1/toolsActivismTrends/getRegionsTrade`;
export const getInvestmentPublicData = `${baseUrl}/api/v1/toolsActivismTrends/getInvestmentPublicData`;
export const getCompaniesTargetedTrends = `${baseUrl}/api/v1/toolsActivismTrends/getCompaniesTargetedTrends`;
export const getActiveActivistsTrends = `${baseUrl}/api/v1/toolsActivismTrends/getActiveActivistsTrends`;
export const getActiveCompanyRegiontrends = `${baseUrl}/api/v1/toolsActivismTrends/getActiveCompanyRegiontrends`;
export const getActiveActivistsRegiontrends = `${baseUrl}/api/v1/toolsActivismTrends/getActiveActivistsRegiontrends`;
export const getIndustryTargetedTrends = `${baseUrl}/api/v1/toolsActivismTrends/getIndustryTargetedTrends`;
export const getCompaniesWithMultipleactivistsTrends = `${baseUrl}/api/v1/toolsActivismTrends/getCompaniesWithMultipleactivistsTrends`;
export const getMarketCapbyYearTrends = `${baseUrl}/api/v1/toolsActivismTrends/getMarketCapbyYearTrends`;
export const getActiveActivistsAUM = `${baseUrl}/api/v1/toolsActivismTrends/getActiveActivistsAUM`;
export const getSuccessRatesTrends = `${baseUrl}/api/v1/toolsActivismTrends/getSuccessRatesTrends`;
export const getStoredProcedureDownloadExcel = `${baseUrl}/api/v1/toolsActivismTrends/getStoredProcedureDownloadExcel`;

// Tool - Save seacrhes
export const userSearchFilter_Create = `${baseUrl}/api/v1/toolsSaveSearches/UserSearchFilter_Create`;
export const userSearchFilter_Update = `${baseUrl}/api/v1/toolsSaveSearches/UserSearchFilter_Update`;
export const userSearchFilter_Delete = `${baseUrl}/api/v1/toolsSaveSearches/UserSearchFilter_Delete`;
export const userSearchFilter_Get = `${baseUrl}/api/v1/toolsSaveSearches/UserSearchFilter_Get`;

// Tool - Governance
export const getProvisionsList = `${baseUrl}/api/v1/companygovernancedataandanalytics/GetProvisionsList`;
export const getActivistNomineeOnBoardList = `${baseUrl}/api/v1/companygovernancedataandanalytics/GetActivistNomineeOnBoard`;
export const getStateOfIncorporationdList = `${baseUrl}/api/v1/companygovernancedataandanalytics/GetStateOfIncorporationdList`;
export const getGovernanceAdvSearchReq = `${baseUrl}/api/v1/companygovernancedataandanalytics/GetGovernanceAdvSearchReq`;
export const getGovernanceScores = `${baseUrl}/api/v1/toolsGovernanceScoreData/GetAiGScores`;
export const getDataAmendmentDataandAnalytics = `${baseUrl}/api/v1/toolsAmendmentDataandAnalytics/GetDataAmendmentDataandAnalytics`;

//Tools - Governance - UpcomingEvents
export const getAIGUpcomingMeetings = `${baseUrl}/api/v1/toolsUpcomingEventRoutes/getAIGUpcomingMeetings`;
export const getUpcomingAppointmentsAndDepartures = `${baseUrl}/api/v1/toolsUpcomingEventRoutes/getUpcomingAppointmentsAndDepartures`;

// Tool - Activist Campaigns
export const getActivistCampaignsTool = `${baseUrl}/api/v1/toolsActivistCampaigns/GetActivistCampaignsTool`;

//Tools - ToolsActivistCampaignAdvisor
export const getLawFirmsDataActivismAdvisor = `${baseUrl}/api/v1/toolsActivistCampaignAdvisor/GetLawFirmsDataActivismAdvisor`;

//Tools - ShortToolsActivistCampaignAdvisor
export const getLawFirmsDataShortActivismAdvisor = `${baseUrl}/api/v1/toolsActivistCampaignAdvisor/GetLawFirmsDataShortActivismAdvisor`;

//Tools - Voting - Poison Pill Data and Analytics
export const getPoisonPillStats = `${baseUrl}/api/v1/toolsPoisonPillDataAndAnalytics/getPoisonPillStats`;
export const getRightsAgent = `${baseUrl}/api/v1/toolsPoisonPillDataAndAnalytics/getRightsAgent`;
export const getPoisonPillRecentInsightia = `${baseUrl}/api/v1/toolsPoisonPillDataAndAnalytics/getPoisonPillRecentInsightia`;
// FAQHelp
export const getdata_FAQS_definition = `${baseUrl}/api/v1/faqhelp/Getdata_FAQS_definition`;

// People
export const people_search = `${baseUrl}/api/v1/people/search`;
export const getPropleProfile = `${baseUrl}/api/v1/people/getPeopleProfile`;
export const getDirectorPersonInfo = `${baseUrl}/api/v1/people/getDirectorPersonInfo`;
export const getDirectorAppointmentInfo = `${baseUrl}/api/v1/people/getDirectorAppointmentInfo`;
export const getDirectorAppointmentInfo2 = `${baseUrl}/api/v1/people/getDirectorAppointmentInfo2`;
export const getDirectorsDetails = `${baseUrl}/api/v1/people/GetDirectorsDetails`;
export const getDirectorContactData = `${baseUrl}/api/v1/people/GetDirectorContactData`;
export const getDirectorOnBoardData = `${baseUrl}/api/v1/people/GetDirectorOnBoardData`;
export const GetGanttChartSampleData = `${baseUrl}/api/v1/people/GetGanttChartSampleData`;
export const GetIndividualGrantedPeopleCompensation = `${baseUrl}/api/v1/peopleCompensation/GetIndividualGrantedPeopleCompensation`;
export const getPeopleOverview = `${baseUrl}/api/v1/people/GetPeopleOverview`;
// GetGanttChartSampleData
// Preferences
export const GetCompanyPeerGroup = `${baseUrl}/api/v1/preferences/GetCompanyPeerGroup`;
export const GetInvestorPeerGroup = `${baseUrl}/api/v1/preferences/GetInvestorPeerGroup`;
export const GetPeerGroupsData = `${baseUrl}/api/v1/preferences/GetPeerGroupsData`;
export const AddSelectionInvestorPeerGroup = `${baseUrl}/api/v1/preferences/AddSelectionInvestorPeerGroup`;
export const AddSelectionCompanyPeerGroup = `${baseUrl}/api/v1/preferences/AddSelectionCompanyPeerGroup`;
export const ValidateOldPasswordHash = `${baseUrl}/api/v1/preferences/ValidateOldPasswordHash`;
export const HandleChangePassword = `${baseUrl}/api/v1/preferences/HandleChangePassword`;
export const SavePreferencesV3 = `${baseUrl}/api/v1/preferences/SavePreferencesV3`;
export const GetEmailPreferences = `${baseUrl}/api/v1/preferences/GetPreferences`;

// Magazines Report
export const getMagazinesReportList = `${baseUrl}/api/v1/magazinesReport/getMagazinesReportList`;
export const GetMagazine_ProxyOrSpecialReports_insightiaList = `${baseUrl}/api/v1/magazinesReport/GetMagazine_ProxyOrSpecialReports_insightia`;
export const searchAiMMagazineText = `${baseUrl}/api/v1/magazinesReport/SearchAiMMagazineText`;

// My Alerts
export const getActivismNewsAlerts = `${baseUrl}/api/v1/myAlerts/GetActivismNewsAlerts`;
export const getActivismEventNewsAlerts = `${baseUrl}/api/v1/myAlerts/V2AListAlertEvents`;
export const listFilingGroups = `${baseUrl}/api/v1/myAlerts/ListFilingGroups`;
export const getAlertOptionsAndSubOptions = `${baseUrl}/api/v1/myAlerts/GetAlertOptionsAndSubOptions`;
export const getDirectorType = `${baseUrl}/api/v1/myAlerts/GetDirectorType`;
export const govAmendemntCategories = `${baseUrl}/api/v1/myAlerts/GetGovAmendemntCategories`;
export const updateTblalert = `${baseUrl}/api/v1/myAlerts/UpdateTblalert`;
export const inserttblAlertOptionLink = `${baseUrl}/api/v1/myAlerts/InserttblAlertOptionLink`;
export const inserttblAlertSubOptionLink = `${baseUrl}/api/v1/myAlerts/InserttblAlertSubOptionLink`;
export const getExistingAlerts = `${baseUrl}/api/v1/myAlerts/GetExistingAlerts`;
export const getAlertDetails = `${baseUrl}/api/v1/myAlerts/GetAlertDetails`;
export const deleteTblAlertOptionLink = `${baseUrl}/api/v1/myAlerts/DeleteTblAlertOptionLink`;
export const getAlertModuleAccess = `${baseUrl}/api/v1/myAlerts/GetAlertModuleAccess`;

//Alert Inbox
export const getInboxAlertName = `${baseUrl}/api/v1/alertInbox/GetAlertInbox`;
export const getAlertFilingDetails = `${baseUrl}/api/v1/alertInbox/GetAlertFilingDetails`;
export const getSampleData = `${baseUrl}/api/v1/alertInbox/GetSampleData`;
export const getInboxAlertByUser = `${baseUrl}/api/v1/alertInbox/GetInboxAlertByUser`;
export const getAlertInboxType = `${baseUrl}/api/v1/alertInbox/GetAlertInboxType`;
export const GetElementDetails = `${baseUrl}/api/v1/alertInbox/GetElementDetails`;

export const DeleteAlert = `${baseUrl}/api/v1/alertInbox/deleteAlert`;
export const UpdateAlertStatus = `${baseUrl}/api/v1/alertInbox/UpdateAlertStatus`;
export const GetAlertNotificationData = `${baseUrl}/api/v1/alertInbox/GetAlertNotificationData`;

export const GetInboxAlertDetails = `${baseUrl}/api/v1/alertInbox/GetInboxAlertDetails`;
export const GetTop20AlertResult = `${baseUrl}/api/v1/alertInbox/GetTop20AlertResult`;

// powersearch
export const getPowerSearch = `${baseUrl}/api/v1/powersearch/powersearch`;
export const getPowerSearchFilter = `${baseUrl}/api/v1/powersearch/filter/get`;
export const createPowerSearchFilter = `${baseUrl}/api/v1/powersearch/filter/create`;
export const listPowerSearchFilter = `${baseUrl}/api/v1/powersearch/filter/list`;
export const updatePowerSearchFilter = `${baseUrl}/api/v1/powersearch/filter/update`;
export const deletePowerSearchFilter = `${baseUrl}/api/v1/powersearch/filter/delete`;
export const createPowerSearchFilterVuln = `${baseUrl}/api/v1/powersearch/filter/createVuln`;
export const listPowerSearchFilterVuln = `${baseUrl}/api/v1/powersearch/filter/listVuln`;
export const updatePowerSearchFilterVuln = `${baseUrl}/api/v1/powersearch/filter/updateVuln`;
export const deletePowerSearchFilterVuln = `${baseUrl}/api/v1/powersearch/filter/deleteVuln`;

// pdf
export const getPDF = `${baseUrl}/api/v1/pdf/getPDF`;
export const getPDFClose = `${baseUrl}/api/v1/pdf/getPDFClose`;
export const getRecentDownloadList = `${baseUrl}/api/v1/pdf/getRecentDownloadList`;

export const loginViaAdmin = `${baseUrl}/api/v1/getUserValidationDetail`;
export const getAumCategorylist = `${baseUrl}/api/v1/dashboard/GetAUMCategorylist`;

export default {
  createPowerSearchFilter,
  getPowerSearchFilter,
  updatePowerSearchFilter,
  deletePowerSearchFilter,
  listPowerSearchFilter,
  // My Alerts
  getActivismNewsAlerts,
  getActivismEventNewsAlerts,
  listFilingGroups,
  getAlertOptionsAndSubOptions,
  getDirectorType,
  govAmendemntCategories,
  updateTblalert,
  inserttblAlertOptionLink,
  inserttblAlertSubOptionLink,
  getExistingAlerts,
  getAlertDetails,
  deleteTblAlertOptionLink,
  getAlertModuleAccess,
  UpdateAlertStatus,
  GetInboxAlertDetails,
  GetTop20AlertResult,

  //Alert Inbox
  getInboxAlertName,
  getAlertFilingDetails,
  getSampleData,
  getAlertInboxType,
  getInboxAlertByUser,
  GetElementDetails,
  DeleteAlert,
  GetAlertNotificationData,

  getMagazinesReportList,
  GetMagazine_ProxyOrSpecialReports_insightiaList,
  searchAiMMagazineText,
  getTblDashboardWidgets,
  getProfiles_insightia,
  sendFeedbackMail,
  getForeignSecurityKey,
  //
  configToken,
  sendForgotPasswordEmail,
  userAuthenticate,
  resetPassword,
  sendPageNotFoundVisitorsLog,
  sendAPIErrorLog,
  addVisitorLog,
  addTrialLog,
  adm_Check_PID,
  logout,
  lookupDecIPForIPLogin,
  authenticateIPLogin,
  company_serarch,
  getCompanyProfile,
  tokenSecrectKey,
  getCountriesMap,
  getCountriesMapActivismCampaigns,
  getToolTip,
  listTopTwentyActivistActivity,
  getActivismOverviewGraphs,
  getAiSCompDisclosedShortPositions,
  getActivistShortModuleAccess,
  getHistoricShortPositions,
  listActivistInvestorsForCompany_NEW_ais,
  GetFDAProductRecallListData,
  getAiSCompTotalShortPositions,
  latestActivistDemands,
  listTop8TimeLine,
  activeActivists_Trends_Overview,
  companiesTargeted_Trends_Overview,
  getIssuerLatestMeetingId,
  getIssuerProfile,
  GetVotingData_allvotes_v2,
  ListMeetingDates,
  GetIssuer_Meeting_stats,
  getProposalList,
  MeetingQuickViewDynamicPivotv4,
  GetVoteResults_v3,
  GetVotingData_rationale_meeting_against,
  ListIssuerVotesAgainst,
  BindgvVotingGrid,
  GetShareClasses,
  GetSelectedProposalsCountry,
  GetVotingListTrialUser,
  getStoredProcedure,
  getStoredProcedureDownload,
  resetDashboardWidgetCompanySearch,
  resetDashboardWidgetInvestorSearch,
  createComputer,
  updateComputerLogin,
  // AIV
  PIGetIssuer,
  PIGetMostRecentAGMOrPCMeetingIdWithVotes,
  PIGetVoteResults,
  PIGetShareholdersTop10,
  GetShareHoldersActivistOnly,
  GetActivismSummary,
  GetVunGetAllInstitutionalMediansAndMADMs,
  GetVunGetAllActivistMediansAndMADMs,
  VunList10QAnd10KForIssuer,
  VunGetGovDirectorInfoV4,
  VunGetAllRemunerationMediansAndMADMs,
  VunGetAllDirectorMediansAndMADMs,
  VunGetAllRemunerationMediansAndMADMsYearAroundDate,
  VunListNewsArticlesForIssuer,
  getAdvisorSearchData,
  getAdvisorModuleAccessData,
  getAdvisorProfile,
  getAdvisorActivismCompanyWebsite,
  getAdvisorActivismPersonnel,
  getAdvisorActivismCampaigns,
  getAdvisorActivistShortCampaigns,
  getIntermediaryData,
  getAdvisorVotingDetailInfo,
  getAdvisorVotingWindandInstrByYear,
  getLawFirmProposalTypes,
  vunSummaryScore,
  //
  votingOverviewPageTrialList,
  votingQuickviewPageTrialList,
  votingResultsPageTrialList,
  votingDetailPageTrialList,
  votingAgainstMgmtPageTrialList,
  votingPolicyCheckerPageTrialList,
  //
  GetActivismListTrialUser,
  GetVulnerabilityListTrialUser,
  GetActivistShortListTrialUser,
  GetGovernanceListTrialUser,
  getAllIssuers,
  piListIndices,
  getExchange,
  getAIPeerGroups,
  getListRegionsAndCountries,
  piListSectorsAndIndustries,
  freeSearchCompanyAndIndustry,
  getCompanySearchOptions,
  updateCompanySearchOptions,
  addTblCopmanySearchCopmanies,
  getCompanySearchSelection,
  addTblcompanySearchIndex,
  addTblcompanySearchExchange,
  addTblCompanySearchPeerGroup,
  addTblCompanySearchIndustry,
  addTblCompanySearchMarketCap,
  addtblCompanySearchCountry,
  d3BarChartDummyData,
  d3StackBarChartDummyData,
  d3SharePriceChartDummyData,
  d3PieChartDummyData,
  d3DoughnutChartData,
  d3InterlockingChartDummydata,
  getAllDashboardWidget,
  updateTblDashboard,
  addtblDashboardWidgetLink,
  getUserDashboard,
  deleteDashboardSelection,
  //dashboard portals
  GetPortalsTop3News,
  GetDashboardIdData,
  GetHotActivistData,
  GetDirectorAppointmentChartData,
  GetAigRussell3000Score,
  GetShareHolderProposalESG,
  GetVotingPolicyChangesESG,
  GetUpCommingShareHolderESG,
  GetMagazinesIssuesESG,
  // Tools
  PublicCampaignToolLists,
  getGlobalGovProvisionList,
  getCountryGovList,
  getStateGovList,
  getStateGovDetailList,
  GetGlobalGovToolTrialList,
  //
  deletetblCompanySearchCountry,
  deleteTblCompanySearchIndustry,

  // investor
  getInvestorProfile,
  getInvestorNavReq,
  investor_search,
  getVotingRationale_byInvestor,

  //investor - overview
  getActiviststrategyData,
  getHoldingsbyCountryChartData,
  getHoldingsbyIndustryChartData,
  getHoldingsbyExitTypeChartData,
  getHoldingsbyMarketCapChartData,
  getActivistProfileData,
  getCampaignTypesbyActivistLst,
  getActivistOfficesLst,
  getActivistPersonnelLst,
  getActivistTimelineLst,
  getActivistSharholderProposalsLst,
  getInvestorActivisamTabDataCheck,
  //investor activist campaigns
  getInvestorActivistCampaignsDataList,
  //Investor - investments
  getActivistHoldingsLst,
  get13F_Filings_by_ActivistLst,

  //Investor - Demands
  getActivistGBRCampaignsLst,
  getCampaignSummarybyActivistLst,

  //Investor - Follower returns
  getFollowerReturnsSearchLst,
  getFollowerReturnsActivistStatschartData,
  getFollowerReturnsActivistStatsData,

  //Investor - Performance
  getPerformancePeriodicbyActivistLst,
  getListofReprtingDate,
  getPerformanceAnnualbyActivistLst,

  //
  addNewsVisitorLog,
  listnewswithTag,
  listForViewNewsTimelineTop5,
  dummyActivismTimeline,
  getNewsMoreInformationLinks,
  getNewsDetails,
  getLatestNewsFiltered,
  getCompanyNewsIds,
  getInvestorNewsIds,

  // investor - ownership
  investorOwnershipCompanyDummyData,

  investor_getLatestOwnershipDateList,
  getInvestor_OwnershipLongInvestorData,
  getInvestor_OwnershipLongFundData_Insightia,
  getInvestor_OwnershipShortInvestorData_Insightia,
  getInvestor_OwnershipShortFundData_Insightia,
  getInvestorOwnershipLongShortDataCheck,
  // investor - voting
  getDissidentVotingByInvestor,
  getSupportByDissident,
  getProxyContestsChartData,
  // investor - voting profile
  getVotingProfileTopSection,
  getVotingProfileBottomSection,
  getInvestorDDLList,
  investorVotingProfileDummyData,
  // investor - fund votes
  getVotedByManagerList,
  getInvestorVoteSummary,
  issAndglasslewis_vote,
  getManager_voting_against,
  getDissident_Data_for_Investor_v2,
  getManager_latest_against2,
  //
  UpdateInvestorSearchOptions,
  GetCurrentShareholder,
  AddTblInvestorSearchInvestors,
  AddTblInvestorSearchAUM,
  DeletetblInvestors_SearchType,
  GetInvestorsSearchOptions,
  AddtblInvestors_SearchType,
  Deletetblinvestor_search_country,
  Addtblinvestor_search_country,
  ListInvestorTypeAndSubtype,
  AddtblInvestors_byshareholdercompany,
  GetInvestorSearchSelection,
  GetAllInvestors,
  FreeSearchInvestor,
  GetAllInvestorsFromShareholderOfCompany,
  GetVulnerabilityHitsData,
  getErrorBoundryDetails,
  getMostReadNews,
  getLatestReadNews,
  getAllProductLatestNews,
  getNewsEvents,
  getStakeholding,
  getActivistObjective,
  getdata_FAQS_definition,
  getNewsNextPrevious,
  //
  GetCompanyPeerGroup,
  GetInvestorPeerGroup,
  AddSelectionCompanyPeerGroup,
  AddSelectionInvestorPeerGroup,
  GetPeerGroupsData,
  ValidateOldPasswordHash,
  HandleChangePassword,
  SavePreferencesV3,
  GetEmailPreferences,
  newsFilter,
  getProductMemberships,
  getVulnerabilityScoreOverTime,
  getVulnerabilityPrankOverTime,
  //
  getAllMeetingType,
  getAllGroupProponent,
  getAllIndividualProponent,
  resolutionsByInvestorFilter,
  getProcedureRunningEstimateTime,
  getUserMembership,
  //
  getGovShowPoisonPillTab,
  getGovShowLatestFilingsTab,
  getGovShowShareholderProposalsTab,
  getGovShowComplianceTab,
  get_Bylaws_Charter_GovGuidelines,
  getHistoricalGovernanceTab,
  getAIG_ShareholderProposals_v2,
  getGovCompanyDirector503,
  getCompanyDirector502_v2,
  getCompanyDirector507_v2,
  getCompanyDirectorshort_v2,
  getCompanyDirector10k_v2,
  getGovDirectorInfo,
  get_Gov_Independent_Graph_Data,
  get_Gov_Tenure_Graph_Data,
  get_Gov_Gender_Graph_Data,
  getComDirProf,
  getComDirUpcoming,
  getComDirProfPast,
  getBoardNewsHeadlines,
  get_interlocking_directors_JSON_v2,
  getComDirProfPastHeaderCol,
  getDetPoisonPill,
  getItem303Material,
  getDetPoisonPillTopHdr,
  getCompanyDirector503,
  get_Bylaws_Charter_GovGuidelines_Data,
  getCompFillingType,
  getCompStatement,
  getComplianceComparisonIndexes,
  getComplianceVotinDissent,
  GetPerformanceOverviewV2,
  GetPerformanceCompounded,
  ListFundPerformanceByYearV2,
  GetHistoricalGovernance,
  //
  getVulDDL,
  getVCId,
  GetVulDataList,
  getResolutionsByTarget,
  resolutionSearchByInvestor,

  getHistoricalTrends,
  investorComparatorhistoricalTrendsChartYTDData,
  investorComparatorhistoricalTrendsChartProxySeasonData,
  getHistoricalTrendsChartDataInvestorComparator,

  getResolutionsTypeIdByName,
  getInvestorVotingPower,
  listVotingOwnershipForProposal_v2,
  get_OtherBoards,
  getVotingData_rationale,
  listVotingAndOwnerhipForProposal_insightia,
  getMeetingURLs,
  getHoldingsDataAndAnalyticsData,
  //director data and analytics
  getDirectorSectorAndIndustrySearchData,
  getDirectorDataAndAnalyticsData,
  getDirectorAnalysisData,
  getDDLEthnicityData,
  //company trial
  addTriallog,
  sendMailToTeam,
  getActivistShortCampaignAdvisersData,
  getInvestorIdFromCampaignId,
  getPeerGroupDefaultName,
  UpdateCompanyVunScore,
  getAdmGetCompanyShell_spac,
  getSplitVotingDetails,
  //Compensation
  getCompensationPerformanceMetricBreakDown,
  GetCompensationExecutivePayData,
  getCompensationOverviewSummaryDetails,
  getCompensationOverviewExecutiveAndDirectorDetails,
  //Compensattion Policy Changes
  getCompensatioCompanyolicyDetailsHighestPaidExecutive,
  getCompensationPolicyDetails,
  getCompensationPolicyHighestPaidExecutiveData,
  GetCompensationNonExecutivePay,
  GetCompensationHighestPaidExe,
  GetCompensationReportYears,
  // Tools - Investor Tracker
  resolutionByInvestorTrackerFilter,
  investorTrackerResultDetails,
  historicalTrendsChartData,
  historicalTrendsChartYTDData,
  historicalTrendsChartProxySeasonData,
  resolutionFilterByTotalVotesAnalysisYTD,
  resolutionFilterByTotalProxySeasonVotesAnalysis,
  resolutionFilterByTotalVotesAnalysis,

  // Tools - Dissident Voting Summary
  dissidentVotteFiltersLimitedData,
  dissidentVotteFilters,

  // Tools - Fillings Search
  getToolsActivismFillingsData,
  // Tools- save searches
  userSearchFilter_Create,
  userSearchFilter_Update,
  userSearchFilter_Delete,
  userSearchFilter_Get,
  // Tools - Governance
  getProvisionsList,
  getActivistNomineeOnBoardList,
  getStateOfIncorporationdList,
  // Advanced Voting data Search
  getAdvanceVotingDataFundname,
  advancedVotingDataSearchlist,
  getManagementRecc,
  getVoteCast,
  getSupport,
  getOutputField,
  getListProposalsAndCategories,
  getGovernanceScores,
  getDataAmendmentDataandAnalytics,

  //Tools - Governance - UpcomingEvents
  getAIGUpcomingMeetings,
  getUpcomingAppointmentsAndDepartures,

  //Tools - ToolsActivistCampaignAdvisor
  getActivistCampaignsTool,
  getLawFirmsDataActivismAdvisor,

  //Tools - ShortToolsActivistCampaignAdvisor
  getLawFirmsDataShortActivismAdvisor,

  //Tools - Voting - Poison Pill Data and Analytics
  getPoisonPillStats,
  getRightsAgent,
  getPoisonPillRecentInsightia,

  // Ownership-Company
  getLatestOwnershipDateList,
  getOwnershipLongInvestorData,
  getOwnershipLongFundData,
  OwnershipCompanyDummyData,
  getOwnershipShortInvestorData,
  getOwnershipShortFundData,
  getOwnershipLongShortInvestorDataCheck,

  // Tools - Short Activism
  getAiSCountriesAndStats,
  getShortPositions,
  getShortPositionsTopTwenty,
  getAiSRecentShortPositions,
  getAiSRecentShortPositionsTopTwenty,
  getActivistShortsFillingsData,

  // Tool - ShortCampaignDataandAnalytics
  getAiSCampaignInformation,
  getAiSCampaignInformationDummyData,
  getShortCampaignSamlpeData,

  // Tools - Activism Trends
  getRegionsTrade,
  getInvestmentPublicData,
  getCompaniesTargetedTrends,
  getActiveActivistsTrends,
  getActiveCompanyRegiontrends,
  getActiveActivistsRegiontrends,
  getIndustryTargetedTrends,
  getCompaniesWithMultipleactivistsTrends,
  getMarketCapbyYearTrends,
  getActiveActivistsAUM,
  getSuccessRatesTrends,
  getStoredProcedureDownloadExcel,

  // Investor - Activist Short
  getActivistIdFromInvestor,
  getInvestorIdFromActivist,
  listCampaignTypesbyActivist,
  getHoldingsbyCountryAiS,
  getHoldingsbyIndustryAiS,
  getHoldingsbyMarketCapAiS,
  getCampaignSummarybyActivistAiS,
  getFMProfile,
  // Filings
  listCompanyFilingsByActivist_v2,
  listActivistFilingsByActivist_v2,
  listActivistFilingsByActivistAiS,
  getCompanyActivisamTabDataCheck,
  // No Action letters
  GetNoActionTrackInfo,
  noActionLettersDataExists,
  GetNoActionLetterProposalDetail,
  GetVotingData_rationale_meeting,
  // Voting Tools : No action letters
  getVotingToolNoActionLetterDDL,
  getVotingToolNoActionLetterAnalysisData,
  noActionLetterDummyData,
  // Tools Compensation 
  getCompensationComparatorData,
  GetDirectorTypes,
  GetAllPeopleList,
  GetPeerGroupData,
  // people search
  people_search,
  getPropleProfile,
  getDirectorPersonInfo,
  getDirectorAppointmentInfo,
  getDirectorAppointmentInfo2,
  getDirectorsDetails,
  getDirectorContactData,
  getDirectorOnBoardData,
  GetGanttChartSampleData,
  GetIndividualGrantedPeopleCompensation,
  getPeopleOverview,
  //company overview
  getCompanyOverviewProfile,
  getCompanyStockEvents,
  getLollipops_graph,
  getStockValues_graph,
  getCompanyPeerGroupOverview,
  getPeerGroupName,
  // Company> Activism > Activist campaigns
  getActivistCampaignsDataList,
  getActivistCampaignsDataListV2,
  ActivistCampiagnDummyData,
  // Company> Activism > Activist Investment
  getActivistInvestorsForCompany,
  getActivistNotifiedHolding,
  // power seacrh
  getPowerSearch,
  // Company> Governance> Overview
  getGovOverview_meetingInfo_Quickview_StockData,
  getBoardAndDirectorsIndexDDL,
  getComparisionTables,
  CompanyGovernanceOverviewDummyData,
  // pdf
  getPDF,
  getPDFClose,
  getRecentDownloadList,
  // branch versioning
  isBranchUpToDate,
  // Tools -> Adv. Vuln Search
  createPowerSearchFilterVuln,
  listPowerSearchFilterVuln,
  updatePowerSearchFilterVuln,
  deletePowerSearchFilterVuln,

  loginViaAdmin,
  getAumCategorylist,
};
