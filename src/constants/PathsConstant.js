export const DASHBOARD = '/';
export const QUERY_PID = '?pid=';
export const QUERY_DIR = '?dir=';
export const QUERY_DIRECTOR = '?director_id=';
export const QUERY_MEETING = '?meetingid=';
export const QUERY_INVESTOR = '?investor=';
export const QUERY_INVESTOR_ID = '?investor_id=';
export const QUERY_COMPANY = '?cmpid=';
export const QUERY_COMPANY_ID = '?company_id=';
export const QUERY_NEWS = '?newsID=';
export const QUERY_AND_NEWS = '&newsID=';
export const QUERY_AND_ID = '&id=';
export const QUERY_PRINT = '&print=1';

export const QUERY_AND_ACTIVIST = '&actid=';
export const QUERY_AND_INVESTOR_PF = '&invpfid=';
export const QUERY_MAGAZINE = '?magId=';
export const QUERY_Q = '?q=';

// #region News
//= ======================================== NEWS =============================================
export const NEWSMENU = '/news';
export const NEWSARTICLE = '/news/article';

// export const NEWS_OVERVIEW = "/news/latest/overview";
export const NEWS_OVERVIEW = '/news';
export const GET_ID = '/:id';

// NEWSMENU -> ACTIVISM
export const NEWS_ACTIVISM = '/news/activism';
export const NEWS_ACTIVISM_LATEST = '/news/activism/latest';
export const NEWS_ACTIVISM_COVID19 = '/news/activism/covid19';
export const NEWS_ACTIVISM_THIS_WEEK = '/news/activism/thisweek';
export const NEWS_ACTIVISM_WEEKLY_WRAP = '/news/activism/weeklywrap';
export const NEWS_ACTIVISM_IN_DEPTH_ARTICLES = '/news/activism/indeptharticles';

// NEWSMENU -> ACTIVIST SHORTS
export const NEWS_ACTIVIST_SHORT = '/news/activistshort';
export const NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES = '/news/activistshort/indeptharticles';

// NEWSMENU -> ACTIVIST VULNERABILITY
export const NEWS_ACTIVIST_VULNERABILITY = '/news/activistvulnerability';
export const NEWS_ACTIVIST_VULNERABILITY_LATEST = '/news/activistvulnerability/latest';
export const NEWS_ACTIVIST_VULNERABILITY_REPORT = '/news/activistvulnerability/report';
export const NEWS_ACTIVIST_VULNERABILITY_HIT = '/news/activistvulnerability/hits';
export const NEWS_ACTIVIST_VULNERABILITY_UPDATES = '/news/activistvulnerability/updates';

// NEWSMENU -> GOVERNANCE
export const NEWS_GOVERNANCE = '/news/governance';

// NEWSMENU -> VOTING
export const NEWS_VOTING = '/news/voting';
export const NEWS_VOTING_IN_DEPTH_ARTICLES = '/news/voting/indeptharticles';

// NEWSMENU -> COMPENSATION
export const NEWS_COMPENSATION = '/news/compensation';

// NEWSMENU -> SEARCH
export const NEWS_SEARCH = '/news/search';

// #endregion

// #region Company
//= ======================================== COMPANY =============================================
// COMPANY SEARCH
export const COMPANY_SEARCH = '/company';
export const COMPANY_SEARCH_PAGE = '/company/companysearch';
// OVERVIEW
export const COMPANY_OVERVIEW = '/company/overview';
// ACTIVISM
export const ACTIVISM = '/company/activism';
export const ACTIVISM_OVERVIEW = '/company/activism/ActivismOverview';
export const ACTIVIST_CAMPAIGNS = '/company/activism/activistcampaigns';
export const ACTIVIST_FILINGS = '/company/activism/filing';
export const ACTIVIST_ADVISOR_SEARCH = '/company/activism/advisorsearch';
export const ACTIVIST_INVESTMENT = '/company/activism/investment';

// ACTIVIST SHORTS
export const ACTIVISTSHORTS = '/company/activistshorts';
export const ACTIVISTSHORTS_OVERVIEW = '/company/activistshorts/activistshortsoverview';
export const ACTIVISTSHORTS_CAMPAIGNS = '/company/activistshorts/activistshortcampaigns';
export const ACTIVISTSHORTS_FILINGS = '/company/activistshorts/filing';
export const ACTIVISTSHORTS_ADVISOR_SEARCH = '/company/activistshorts/advisorsearch';

// ACTIVIST VULNERABILITY
export const ACTIVIST_VULNERABILITY = '/company/activistvulnerability';
// GOVERNANCE
export const GOVERNANCE = '/company/governance';
export const GOVERNANCE_OVERVIEW = '/company/governance/governanceoverview';
export const GOVERNANCE_BYLAWSCHARTERGUIDELINES = '/company/governance/bylawscharterguidelines';
export const GOVERNANCE_DIRECTORS = '/company/governance/directors';
export const GOVERNANCE_POISONPILL = '/company/governance/poisonpill';
export const GOVERNANCE_LATESTFILINGS = '/company/governance/latestfilings';
export const GOVERNANCE_COMPLIANCE = '/company/governance/compliance';
export const GOVERNANCE_SHAREHOLDERPROPOSAL = '/company/governance/shareholderproposal';
export const GOVERNANCE_DIRECTORPROFILE = '/company/governance/director';
export const GOVERNANCE_HISTORICAL = '/company/governance/historicalgovernance';
// VOTING
export const VOTING = '/company/voting';
export const VOTING_OVERVIEW = '/company/voting/VotingOverview';
export const VOTING_QUICKVIEW = '/company/voting/VotingQuickview';
export const VOTING_POLICYCHECKER = '/company/voting/VotingPolicyChecker';
export const VOTING_RESULTS = '/company/voting/VotingResults';
export const VOTING_VOTEDETAIL = '/company/voting/VotingVoteDetail';
export const VOTING_VOTESAGAINST_MGMT = '/company/voting/VotingVotesAgainstMgmt';
export const VOTING_ADVISOR_SEARCH = '/company/voting/advisorsearch';
export const VOTING_NOACTIONLETTER = '/company/voting/noactionletter';
// Company -> NEWS
export const NEWS = '/company/news';

// OWNERSHIP
export const OWNERSHIP = '/company/ownership';
export const OWNERSHIP_LONG_INVESTOR = '/company/ownership/long/investor';
export const OWNERSHIP_LONG_FUND = '/company/ownership/long/fund';
export const OWNERSHIP_SHORT_INVESTOR = '/company/ownership/short/investor';
export const OWNERSHIP_SHORT_FUND = '/company/ownership/short/fund';

export const INVESTOR_OWNERSHIP = '/investor/ownership';
export const OWNERSHIP_INVESTOR_LONG_INVESTOR = '/investor/ownership/long/investor';
export const OWNERSHIP_INVESTOR_LONG_FUND = '/investor/ownership/long/fund';
export const OWNERSHIP_INVESTOR_SHORT_INVESTOR = '/investor/ownership/short/investor';
export const OWNERSHIP_INVESTOR_SHORT_FUND = '/investor/ownership/short/fund';
// #endregion

// #region Investor
// INVESTOR SEARCH
export const INVESTOR_SEARCH = '/investor';
// INVESTOR OVERVIEW
export const INVESTOR_OVERVIEW = '/investor/overview';
// INVESTOR ACTIVISM
export const INVESTOR_ACTIVISM = '/investor/activism';
export const INVESTOR_ACTIVISM_OVERVIEW = '/investor/activism/overview';
export const INVESTOR_ACTIVISM_CAMPAIGNS = '/investor/activism/campaign';
export const INVESTOR_ACTIVISM_INVESTMENTS = '/investor/activism/investments';
export const INVESTOR_ACTIVISM_DEMANDS = '/investor/activism/demands';
export const INVESTOR_ACTIVISM_FOLLOWER_RETURNS = '/investor/activism/followerreturns';
export const INVESTOR_ACTIVISM_PERFORMANCE = '/investor/activism/performance';
export const INVESTOR_ACTIVISM_PERFORMANCE_ANNUAL = '/investor/activism/performance/annual';
export const INVESTOR_ACTIVISM_FILINGS = '/investor/activism/filing';

export const INVESTOR_ACTIVIST_SHORT = '/investor/activistshorts';
export const INVESTOR_ACTIVIST_SHORT_OVERVIEW = '/investor/activistshorts/overview';
export const INVESTOR_ACTIVIST_SHORT_CAMPAIGNS = '/investor/activistshorts/campaign';
export const INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES = '/investor/activistshorts/ownershipdisclosures';
export const INVESTOR_ACTIVIST_SHORT_FILINGS = '/investor/activistshorts/filing';

export const INVESTOR_VOTING = '/investor/voting';
export const INVESTOR_VOTING_OVERVIEW = '/investor/voting/overview';
export const INVESTOR_VOTING_PROFILE = '/investor/voting/profile';
export const INVESTOR_VOTING_SUMMARY = '/investor/voting/votingsummary';
export const INVESTOR_VOTING_BY_PROPOSAL = '/investor/voting/votingbyproposal';
export const INVESTOR_ISS_GL_COMPARATOR = '/investor/voting/issglcomparator';
export const INVESTOR_VOTING_RATIONALE = '/investor/voting/votingrationale';
export const INVESTOR_PROXY_CONTEST_VOTING = '/investor/voting/proxycontestvoting';
export const INVESTOR_FUNDS_VOTED = '/investor/voting/fundsvoted';

export const INVESTOR_NEWS = '/investor/news';
// #endregion

// #region Tools
// Advisor Search
export const ADVISOR_SEARCH = '/advisor';

// Advisor Overview
export const ADVISOR_OVERVIEW = '/advisor/overview';

// Advisor Activism
export const ADVISOR_ACTIVISM = '/advisor/activism';
export const ADVISOR_ACTIVISM_OVERVIEW = '/advisor/activism';
// Advisor Activist Shorts
export const ADVISOR_ACTIVISTSHORT = '/advisor/activistshorts';
export const ADVISOR_ACTIVISTSHORT_OVERVIEW = '/advisor/activistshorts/overview';
// Advisor Voting
export const ADVISOR_VOTING = '/advisor/voting';
export const ADVISOR_VOTING_OVERVIEW = '/advisor/voting/noaction';

// #endregion

// UniversalSearch
export const UNIVERSAL_SEARCH = '/universalsearch';

// #region Tools
// TOOLMENU
export const TOOLMENU = '/tools';
// TOOLS > ACTIVISM
export const ACTIVIST_CAMPAIGNS_TOOL = '/tools/activism/activistcampaigns';
export const PUBLICDEMANDS_TOOL = '/tools/activism/publicdemand';
export const HOLDINGSDATA_AND_ANALYTICS_TOOL = '/tools/activism/holdingsdataandanalytics';
export const SHAREHOLDER_PROPOSALS_TOOL = '/tools/activism/shareholderproposals';
// export const PERFORMANCE_TOOL = '/tools/activism/performance';
export const ANNUAL_PERFORMANCE = '/tools/activism/performance/annual';
export const ANNUAL_COMPOUNDED = '/tools/activism/performance/compounded';
export const FOLLOWER_RETURNS_DATA_AND_ANALYTICS_TOOL = '/tools/activism/followerreturnsdataandanalytics';
export const FILLINGS_SEARCH_TOOL = '/tools/activism/filingssearch';
export const ACTIVIST_CAMPAIGN_ADVISOR = '/tools/activism/activistcampaignadvisor';
export const ACTIVISM_TRENDS = '/tools/activism/activismtrends';

// TOOLS > VOTING
export const RESOLUTION_TRACKER_TOOL = '/tools/voting/resolutiontracker';
export const INVESTOR_COMPARATOR_TOOL = '/tools/voting/investorcomparator';
export const HISTORICAL_TRENDS_PDF = '/tools/voting/investorcomparator/historicaltrends';
export const ISS_GL_RESOLUTIONANALYSIS_TOOL = '/tools/voting/issglresolutionanalysis';
export const NOACTIONDATA_AND_ANALYTICS_TOOL = '/tools/voting/noactiondataandanalytics';
export const DISSIDENT_VOTING_SUMMARY_TOOL = '/tools/voting/dissidentvotingsummary';
export const ADVANCED_VOTING_DATA_SEARCH = '/tools/voting/advancevotingdatasearch';
// TOOLS > GOVERNANCE
export const COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL = '/tools/governance/companygovernancedataandanalytics';
export const GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL = '/tools/governance/companypeergroupcomparisonmatrix';
export const US_STATEGOVERNANCEDATA_TOOL = '/tools/governance/usstategovernancedata';
export const GLOBAL_GOVERNANCEDATA_TOOL = '/tools/governance/globalgovernancedata';
export const DIRECTORDATA_AND_ANALYTICS_TOOL = '/tools/governance/directordataandanalytics';
export const UPCOMING_EVENTS_TOOL = '/tools/governance/upcomingevents';
export const AMENDMENT_DATA_AND_ANALYTICS_TOOL = '/tools/governance/amendmentdataandanalytics';
export const POISONPILLDATA_AND_ANALYTICS_TOOL = '/tools/governance/poisonpilldataandanalytics';
export const GOVERNANCE_SCORE_DATA_TOOL = '/tools/governance/governancescoredata';
export const GOVERNANCE_DIRECTOR_SKILLS_AND_ANALYTICS_TOOL = '/tools/governance/directorskillsandanalytics';

// TOOLS > VULNAREBILITY
export const VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL =
  '/tools/vulnerability/companypeergroupcomparisonmatrix';
// TOOLS > SHORT ACTIVISM
export const VULNAREBILITY_ADVANCED_SEARCH = '/tools/vulnerability/vulnerabilityadvancedsearch';
export const SHORT_CAMPAIGN_DATA_AND_ANALYTICS = '/tools/shortactivism/shortcampaigndataandanalytics';
export const NOTIFIED_SHORT_POSITION_DATA = '/tools/shortactivism/notifiedshortpositiondata/mostshorted';
export const NOTIFIED_SHORT_POSITION_DATA_Latest_Notification =
  '/tools/shortactivism/notifiedshortpositiondata/latestnotification';
export const SHORT_ACTIVIST_CAMPAIGN_ADVISOR = '/tools/shortactivism/shortactivistcampaignadvisor';
export const SHORT_ACTIVIST_FILLINGS_SEARCH = '/tools/shortactivism/filingssearch';

// TOOLS > POWERSEARCH
export const POWERSEARCH_TOOL = '/tools/powersearch';

//TOOLS > COMPENSATION
export const COMPENSATION_P4P_MODELER = '/tools/compensation/P4Pmodeler';
export const COMPENSATION_SAY_ON_PAY_VOTE_RESULTS = '/tools/compensation/sayonpayvoteresults';
export const COMPENSATION_REMUNERATION_COMMITEE_MEMBER = '/tools/compensation/remunerationcommitteemembersearch';
export const COMPENSATION_COMPARATOR = '/tools/compensation/compensationcomparator';
// #endregion

// #region FAQ
// GENERAL
export const FAQHELP_GENERAL = '/faqhelp/general';
export const GENERAL_FAQ = '/faqhelp/general/faq';
export const GENERAL_DEFINITION = '/faqhelp/general/definition';
// ACTIVISM
export const FAQHELP_ACTIVISM = '/faqhelp/activism';
export const ACTIVISM_FAQ = '/faqhelp/activism/faq';
export const ACTIVISM_DEFINITION = '/faqhelp/activism/definition';

// ACTIVIST SHORTS
export const FAQHELP_ACTIVISTSHORTS = '/faqhelp/activistshorts';
export const ACTIVISTSHORTS_FAQ = '/faqhelp/activistshorts/faq';
export const ACTIVISTSHORTS_DEFINITION = '/faqhelp/activistshorts/definition';
// ACTIVIST VULNERABILITY
export const FAQHELP_ACTIVIST_VULNERABILITY = '/faqhelp/activistvulnerability';
export const ACTIVIST_VULNERABILITY_FAQ = '/faqhelp/activistvulnerability/faq';
export const ACTIVIST_VULNERABILITY_DEFINITION = '/faqhelp/activistvulnerability/definition';
// GOVERNANCE
export const FAQHELP_GOVERNANCE = '/faqhelp/governance';
export const GOVERNANCE_FAQ = '/faqhelp/governance/faq';
export const GOVERNANCE_DEFINITION = '/faqhelp/governance/definition';
// VOTING
export const FAQHELP_VOTING = '/faqhelp/voting';
export const VOTING_FAQ = '/faqhelp/voting/faq';
export const VOTING_DEFINITION = '/faqhelp/voting/definition';
//COMPENSATION
export const FAQHELP_COMPENSATION = '/faqhelp/compensation';
export const COMPENSATION_FAQHELP = '/faqhelp/compensation/faq';

// #endregion

// #region Preferences
export const PREFERENCES = '/preferences';
// #endregion

// #region Notes Example
export const NOTES_WIDGET_EXAMPLE_PAGE = '/noteswidgetexample';
/// /#endregion

// #region credential-form
export const CREDENTIAL_FORM = '/credential-form';
// #endregion

// #region alert
// export const ALERT = '/alert';

// GENERAL
export const MY_ALERT_NEW = '/alert/myalert';
export const MY_ALERT_EXISTING_ALERT = '/alert/existingAlert';
export const MY_ALERT_INBOX = '/alert/alertInbox';
// #endregion

// #region recentdownloads
export const RECENT_DOWNLOADS = '/recentdownloads';
// #endregion

// #region people search
export const PEOPLE_SEARCH = '/people';
export const PEOPLE_OVERVIEW = '/people/overview';
export const DIRECTORSHIP_AND_EXECUTIVE = '/people/directorshipandexecutive';
export const COMPENSATION = '/people/compensation';

// #endregion

// #region Company > COMPENSATION
export const COMPANY_COMPENSATION = '/company/compensation';
export const COMPANY_COMPENSATION_OVERVIEW = '/company/compensation/overview';
export const COMPANY_COMPENSATION_PERFORMANCE_METRIC_BREAKDOWN = '/company/compensation/performancemetricbreakdown';
export const COMPANY_COMPENSATION_EXECUTIVE_PAY = '/company/compensation/executivepay';
export const COMPANY_COMPENSATION_POLICY_DETAILS = '/company/compensation/compensationpolicydetails';

export const PEOPLE_COMPENSATION = '/people/compensation';
// #endregion

// #region Publications
export const PROXY_MONTHLY = '/publications/proxymonthly';
export const SPECIAL_REPORTS = '/publications/specialreports';
export const SEARCH_ALLREPORTS = '/publications/searchallreports';

// MAIN MAGAZINE NAV
export const LATEST_REPORTS = '/publications';
export const ACTIVISM_MAGAZINE = '/publications/activism';
export const VOTING_MAGAZINE = '/publications/voting';
export const SHORTS_MAGAZINE = '/publications/shorts';
export const GOVERNANCE_MAGAZINE = '/publications/governance';
// ACTIVISM MAGAZINE SUB NAV ITEMS
export const ACTIVISM_LATEST_REPORTS = '/publications/activism';
export const ACTIVISM_MONTHLY_REPORTS = '/publications/activism/monthlyreports';
export const ACTIVISM_QUARTERLY_STATS_REPORTS = '/publications/activism/quarterlystatsreports';
export const ACTIVISM_SPECIAL_REPORTS = '/publications/activism/specialreports';
export const ACTIVISM_13F_REPORTS = '/publications/activism/13Freports';
// VOTING MAGAZINE SUB ITEMS
export const VOTING_LATEST_REPORTS = '/publications/voting';
export const VOTING_MONTHLY_REPORTS = '/publications/voting/monthlyreports';
export const VOTING_SPECIAL_REPORTS = '/publications/voting/specialreports';
// SHORTS MAGAZINE SUB ITEMS
export const SHORTS_LATEST_REPORTS = '/publications/shorts';
// GOVERNANCE MAGAZINE SUB ITEMS
export const GOVERNANCE_LATEST_REPORTS = '/publications/governance';
//#endregion

// #region Examples
export const TABLE_EXAMPLE_PAGE = '/TableExample';
export const D3_PIE_CHART_EXAMPLE_PAGE = '/DummyDataContainer/D3PiechartexampleContainer';
export const D3_STACKBAR_CHART_EXAMPLE_PAGE = '/DummyDataContainer/D3StackBarChartExampleContainer';
export const D3_INTERLOCKING_EXAMPLE_PAGE = '/DummyDataContainer/D3InterlockingContainer';
export const D3_SQUARE_PILLCHART = '/DummyDataContainer/D3TreeMapChart';
export const D3_MAP_PAGE = '/D3MapExample';
export const D3_MULTI_TABLE_PAGE = '/DummyDataContainer/MultiTableContainer';
export const UNDER_CONSTRUCTION_PAGE = '/underconstruction';
// #endregion

// #region  PDF URL
export const DOCS_INSIGHTIA_COM_REPORTS = 'https://docs.insightia.com/reports/';
export const DOCS_INSIGHTIA_REDLINE_REPORTS = 'https://docs.insightia.com/investor_docs/';
export const DOCS_INSIGHTIA_PUBLISHINGS_REPORTS = 'https://docs.insightia.com/issues/';
// #endregion

// #region  IMAGE LINKS
// Static Images
export const UP_ARROW_BLUE_IMG = '/images/icons/up_arrow_blue.png';
export const DOWN_ARROW_RED_IMG = '/images/icons/down_arrow_red.png';
export const NEW_POSITION_IMG = '/images/icons/new_position.png';
export const N0_CHANGE_IMG = '/images/icons/no_change.png';
export const LINKEDIN_SMALL_IMG = '/images/elements/LinkedIn_smallv2.png';
export const LINKEDIN_LARGE_IMG = '/images/icons/LinkedIn_large.jpg';
export const GREEN_FLAG_LARGE = '/images/icons/GreenFlag_large.png';
export const RED_FLAG_LARGE = '/images/icons/RedFlag_large.png';
export const GREEN_YES_IMG = '/images/icons/GreenYes.png';
export const RED_CROSS_IMG = '/images/icons/RedCross.png';
export const GREY_FLAG_IMG = '/images/icons/GreyFlag.png';
export const ICON_TICK_IMG = '/images/icons/tick.png';

// DOTS/Tags
export const YELLOW_C_DOT = '/images/icons/yellowCdot.png';
export const GREEN_DOT = '/images/icons/greendot.png';
export const INFO_DOT = '/images/icons/info.png';

export const CEO_TAG = '/images/icons/CEO.png';
export const LEAD_DIRECTOR_TAG = '/images/icons/LeadDirector.png';
export const CHAIR_TAG = '/images/icons/Chair.png';
export const PRESIDING_DIRECTOR_TAG = '/images/icons/PresidingDirector.png';
export const ACTIVIST_TAG = '/images/icons/Activist.png';
export const BIG_HELP_IMG = '/images/icons/big-help.png';
export const BIG_DATAFEED_IMG = '/images/icons/big-datafeed.png';

// Sidebar/logos
export const DASHBOARD_ICON_SVG = '/images/elements/dashboard.svg';
export const COMPANIES_ICON_SVG = '/images/elements/companies.svg';
export const INVESTORS_ICON_SVG = '/images/elements/investors.svg';
export const PEOPLE_ICON_SVG = '/images/elements/people.svg';
export const ADVISOR_ICON_SVG = '/images/elements/advisors.svg';
export const NEWS_ICON_SVG = '/images/elements/news.svg';
export const MAGAZINES_ICON_SVG = '/images/elements/magazines.svg';
export const TOOLS_ICON_SVG = '/images/elements/tools.svg';
export const INSIGHTIA_LOGO = '/images/elements/insightia-logo.svg';
export const INSIGHTIA_LOGO_STANDARD = '/Images/logo/Insightia_color.svg';

// #region  Footer Img and Links.
export const INSIGHTIA_TWITTER_IMG = '/images/icons/Twitter.png';
export const INSIGHTIA_LINKEDIN_IMG = '/images/icons/Linkedin.png';
export const INSIGHTIA_TWITTER_URL = 'https://twitter.com/InsightiaLtd';
export const INSIGHTIA_LINKEDIN_URL = 'https://www.linkedin.com/company/insightia-ltd/';
// #endregion

// Dynamic Links
export const COMPANY_LOGO_PATH = 'https://media.insightia.com/images/company_logos/';
export const ADVISOR_LOGO_PATH = '/images/advisor_logos/';
//piimages is where data is currently saved to an PI module
export const CONTACT_IMG_PATH = 'https://media.insightia.com/images/contacts/';
export const FLAG_IMAGE_PATH = '/images/Flags/';
//aiimages is where data is currently saved to an AI module
export const NEWS_IMAGE_PATH = 'https://media.insightia.com/images/news/';
export const ICON_IMAGE_PATH = '/images/Icons/';
export const MAGAZINE_IMAGE_PATH = 'https://media.insightia.com/images/news/';
export const MAGAZINE_ISSUE_IMAGE_PATH = 'https://media.insightia.com/images/magazine/';
export const PDF_ISSUE_PATH = '/images/Icons/';

// #endregion
//#region  PDF URL

//#endregion
export default {
  // MENU SVGS
  DASHBOARD_ICON_SVG,
  COMPANIES_ICON_SVG,
  INVESTORS_ICON_SVG,
  PEOPLE_ICON_SVG,
  ADVISOR_ICON_SVG,
  NEWS_ICON_SVG,
  MAGAZINES_ICON_SVG,
  TOOLS_ICON_SVG,
  INSIGHTIA_LOGO,
  COMPANY_LOGO_PATH,
  MAGAZINE_IMAGE_PATH,
  PDF_ISSUE_PATH,
  // IMAGES
  ICON_IMAGE_PATH,
  GREY_FLAG_IMG,
  LINKEDIN_LARGE_IMG,
  ICON_TICK_IMG,
  GREEN_FLAG_LARGE,
  YELLOW_C_DOT,
  GREEN_DOT,
  INFO_DOT,
  CEO_TAG,
  CHAIR_TAG,
  PRESIDING_DIRECTOR_TAG,
  LEAD_DIRECTOR_TAG,
  ACTIVIST_TAG,
  RED_CROSS_IMG,
  GREEN_YES_IMG,
  RED_FLAG_LARGE,
  FLAG_IMAGE_PATH,
  NEWS_IMAGE_PATH,
  CONTACT_IMG_PATH,
  ADVISOR_LOGO_PATH,
  UP_ARROW_BLUE_IMG,
  DOWN_ARROW_RED_IMG,
  NEW_POSITION_IMG,
  N0_CHANGE_IMG,
  BIG_HELP_IMG,
  BIG_DATAFEED_IMG,
  LINKEDIN_SMALL_IMG,
  INSIGHTIA_LOGO_STANDARD,
  INSIGHTIA_TWITTER_IMG,
  INSIGHTIA_LINKEDIN_IMG,
  INSIGHTIA_TWITTER_URL,
  INSIGHTIA_LINKEDIN_URL,
  // QUERY
  QUERY_PID,
  QUERY_DIR,
  QUERY_DIRECTOR,
  QUERY_MEETING,
  QUERY_INVESTOR,
  QUERY_COMPANY,
  QUERY_AND_ACTIVIST,
  QUERY_NEWS,
  QUERY_COMPANY_ID,
  QUERY_AND_INVESTOR_PF,
  QUERY_MAGAZINE,
  QUERY_INVESTOR_ID,
  QUERY_Q,
  QUERY_AND_NEWS,
  QUERY_AND_ID,
  QUERY_PRINT,
  // MAGAZINES_REPORTS
  // ACTIVISM_MONTHLY,
  PROXY_MONTHLY,
  SPECIAL_REPORTS,
  SEARCH_ALLREPORTS,
  LATEST_REPORTS,
  ACTIVISM_MAGAZINE,
  VOTING_MAGAZINE,
  SHORTS_MAGAZINE,
  GOVERNANCE_MAGAZINE,
  ACTIVISM_LATEST_REPORTS,
  ACTIVISM_MONTHLY_REPORTS,
  ACTIVISM_QUARTERLY_STATS_REPORTS,
  ACTIVISM_SPECIAL_REPORTS,
  ACTIVISM_13F_REPORTS,
  VOTING_LATEST_REPORTS,
  VOTING_MONTHLY_REPORTS,
  VOTING_SPECIAL_REPORTS,
  SHORTS_LATEST_REPORTS,
  GOVERNANCE_LATEST_REPORTS,
  //
  TABLE_EXAMPLE_PAGE,
  D3_PIE_CHART_EXAMPLE_PAGE,
  D3_STACKBAR_CHART_EXAMPLE_PAGE,
  D3_INTERLOCKING_EXAMPLE_PAGE,
  D3_SQUARE_PILLCHART,
  D3_MAP_PAGE,
  D3_MULTI_TABLE_PAGE,
  CREDENTIAL_FORM,
  // Alert
  MY_ALERT_NEW,
  RECENT_DOWNLOADS,
  MY_ALERT_EXISTING_ALERT,
  MY_ALERT_INBOX,

  // people search
  PEOPLE_SEARCH,
  PEOPLE_OVERVIEW,
  DIRECTORSHIP_AND_EXECUTIVE,
  COMPENSATION,
  // company > Compensation
  COMPANY_COMPENSATION,
  COMPANY_COMPENSATION_OVERVIEW,
  PEOPLE_COMPENSATION,
  COMPANY_COMPENSATION_PERFORMANCE_METRIC_BREAKDOWN,
  COMPANY_COMPENSATION_POLICY_DETAILS,
  COMPANY_COMPENSATION_EXECUTIVE_PAY,
  // FAQ
  FAQHELP_GENERAL,
  GENERAL_FAQ,
  GENERAL_DEFINITION,
  FAQHELP_ACTIVISM,
  ACTIVISM_FAQ,
  ACTIVISM_DEFINITION,
  FAQHELP_ACTIVISTSHORTS,
  ACTIVISTSHORTS_FAQ,
  ACTIVISTSHORTS_DEFINITION,
  FAQHELP_ACTIVIST_VULNERABILITY,
  ACTIVIST_VULNERABILITY_FAQ,
  ACTIVIST_VULNERABILITY_DEFINITION,
  FAQHELP_GOVERNANCE,
  GOVERNANCE_FAQ,
  GOVERNANCE_DEFINITION,
  FAQHELP_VOTING,
  VOTING_FAQ,
  VOTING_DEFINITION,
  FAQHELP_COMPENSATION,
  COMPENSATION_FAQHELP,
  //
  DASHBOARD,
  NEWSMENU,
  TOOLMENU,
  COMPANY_SEARCH,
  COMPANY_OVERVIEW,
  ACTIVISM,
  ACTIVISM_OVERVIEW,
  ACTIVIST_CAMPAIGNS,
  ACTIVISTSHORTS_CAMPAIGNS,
  ACTIVISTSHORTS,
  ACTIVISTSHORTS_OVERVIEW,
  ACTIVIST_VULNERABILITY,
  ACTIVIST_ADVISOR_SEARCH,
  GOVERNANCE,
  GOVERNANCE_OVERVIEW,
  GOVERNANCE_BYLAWSCHARTERGUIDELINES,
  GOVERNANCE_DIRECTORS,
  GOVERNANCE_POISONPILL,
  GOVERNANCE_LATESTFILINGS,
  GOVERNANCE_COMPLIANCE,
  GOVERNANCE_SHAREHOLDERPROPOSAL,
  GOVERNANCE_DIRECTORPROFILE,
  GOVERNANCE_HISTORICAL,
  VOTING,
  VOTING_OVERVIEW,
  VOTING_QUICKVIEW,
  VOTING_POLICYCHECKER,
  VOTING_RESULTS,
  VOTING_VOTEDETAIL,
  VOTING_VOTESAGAINST_MGMT,
  VOTING_NOACTIONLETTER,
  VOTING_ADVISOR_SEARCH,
  NEWS,
  NEWSARTICLE,
  OWNERSHIP,
  OWNERSHIP_LONG_INVESTOR,
  OWNERSHIP_SHORT_INVESTOR,
  OWNERSHIP_LONG_FUND,
  OWNERSHIP_SHORT_FUND,
  // investor
  INVESTOR_OWNERSHIP,
  OWNERSHIP_INVESTOR_LONG_INVESTOR,
  OWNERSHIP_INVESTOR_SHORT_INVESTOR,
  OWNERSHIP_INVESTOR_LONG_FUND,
  OWNERSHIP_INVESTOR_SHORT_FUND,
  // Tools
  // PERFORMANCE_TOOL,
  ADVANCED_VOTING_DATA_SEARCH,
  ACTIVIST_CAMPAIGNS_TOOL,
  PUBLICDEMANDS_TOOL,
  HOLDINGSDATA_AND_ANALYTICS_TOOL,
  SHAREHOLDER_PROPOSALS_TOOL,
  ANNUAL_PERFORMANCE,
  ANNUAL_COMPOUNDED,
  FOLLOWER_RETURNS_DATA_AND_ANALYTICS_TOOL,
  FILLINGS_SEARCH_TOOL,
  RESOLUTION_TRACKER_TOOL,
  INVESTOR_COMPARATOR_TOOL,
  HISTORICAL_TRENDS_PDF,
  ISS_GL_RESOLUTIONANALYSIS_TOOL,
  NOACTIONDATA_AND_ANALYTICS_TOOL,
  DISSIDENT_VOTING_SUMMARY_TOOL,
  COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL,
  GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
  US_STATEGOVERNANCEDATA_TOOL,
  GLOBAL_GOVERNANCEDATA_TOOL,
  DIRECTORDATA_AND_ANALYTICS_TOOL,
  UPCOMING_EVENTS_TOOL,
  AMENDMENT_DATA_AND_ANALYTICS_TOOL,
  POISONPILLDATA_AND_ANALYTICS_TOOL,
  VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
  SHORT_CAMPAIGN_DATA_AND_ANALYTICS,
  NOTIFIED_SHORT_POSITION_DATA,
  NOTIFIED_SHORT_POSITION_DATA_Latest_Notification,
  POWERSEARCH_TOOL,
  ACTIVIST_CAMPAIGN_ADVISOR,
  SHORT_ACTIVIST_CAMPAIGN_ADVISOR,
  SHORT_ACTIVIST_FILLINGS_SEARCH,
  ACTIVISM_TRENDS,
  GOVERNANCE_SCORE_DATA_TOOL,
  GOVERNANCE_DIRECTOR_SKILLS_AND_ANALYTICS_TOOL,
  VULNAREBILITY_ADVANCED_SEARCH,
  // advisor
  ADVISOR_SEARCH,
  ADVISOR_OVERVIEW,
  ADVISOR_ACTIVISM,
  ADVISOR_ACTIVISM_OVERVIEW,
  ADVISOR_ACTIVISTSHORT,
  ADVISOR_ACTIVISTSHORT_OVERVIEW,
  ADVISOR_VOTING,
  ADVISOR_VOTING_OVERVIEW,
  //Tools compesation
  COMPENSATION_P4P_MODELER,
  COMPENSATION_SAY_ON_PAY_VOTE_RESULTS,
  COMPENSATION_REMUNERATION_COMMITEE_MEMBER,
  COMPENSATION_COMPARATOR,

  // UniversalSearch
  UNIVERSAL_SEARCH,
  // news
  NEWS_OVERVIEW,
  GET_ID,
  NEWS_ACTIVISM,
  NEWS_ACTIVISM_LATEST,
  NEWS_ACTIVISM_COVID19,
  NEWS_ACTIVISM_THIS_WEEK,
  NEWS_ACTIVISM_WEEKLY_WRAP,
  NEWS_ACTIVISM_IN_DEPTH_ARTICLES,
  NEWS_ACTIVIST_SHORT,
  NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES,
  NEWS_ACTIVIST_VULNERABILITY,
  NEWS_ACTIVIST_VULNERABILITY_LATEST,
  NEWS_ACTIVIST_VULNERABILITY_REPORT,
  NEWS_ACTIVIST_VULNERABILITY_HIT,
  NEWS_ACTIVIST_VULNERABILITY_UPDATES,
  NEWS_GOVERNANCE,
  NEWS_VOTING,
  NEWS_VOTING_IN_DEPTH_ARTICLES,
  NEWS_COMPENSATION,
  NEWS_SEARCH,
  // filings
  ACTIVIST_FILINGS,
  ACTIVISTSHORTS_FILINGS,
  INVESTOR_ACTIVISM_FILINGS,
  INVESTOR_ACTIVIST_SHORT_FILINGS,
  ACTIVISTSHORTS_ADVISOR_SEARCH,
  ACTIVIST_INVESTMENT,
  // INVESTORMENU,
  INVESTOR_SEARCH,
  INVESTOR_OVERVIEW,
  INVESTOR_ACTIVISM,
  INVESTOR_ACTIVISM_OVERVIEW,
  INVESTOR_ACTIVISM_CAMPAIGNS,
  INVESTOR_ACTIVISM_INVESTMENTS,
  INVESTOR_ACTIVISM_DEMANDS,
  INVESTOR_ACTIVISM_FOLLOWER_RETURNS,
  INVESTOR_ACTIVISM_PERFORMANCE,
  INVESTOR_ACTIVISM_PERFORMANCE_ANNUAL,
  INVESTOR_ACTIVIST_SHORT,
  INVESTOR_ACTIVIST_SHORT_OVERVIEW,
  INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES,
  INVESTOR_ACTIVIST_SHORT_CAMPAIGNS,
  INVESTOR_VOTING,
  INVESTOR_VOTING_OVERVIEW,
  INVESTOR_VOTING_PROFILE,
  INVESTOR_VOTING_SUMMARY,
  INVESTOR_VOTING_BY_PROPOSAL,
  INVESTOR_ISS_GL_COMPARATOR,
  INVESTOR_VOTING_RATIONALE,
  INVESTOR_PROXY_CONTEST_VOTING,
  INVESTOR_FUNDS_VOTED,
  INVESTOR_NEWS,
  PREFERENCES,
  COMPANY_SEARCH_PAGE,
  NOTES_WIDGET_EXAMPLE_PAGE,
  UNDER_CONSTRUCTION_PAGE,
  MAGAZINE_ISSUE_IMAGE_PATH,
  DOCS_INSIGHTIA_COM_REPORTS,
  DOCS_INSIGHTIA_REDLINE_REPORTS,
  DOCS_INSIGHTIA_PUBLISHINGS_REPORTS,
};
