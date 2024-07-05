import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../../components/Dashboard/Dashboard';
import { handleResetBreadcrumbs } from '../General/TitleSlice';
import {
  getMagazinesReportListPortalReq,
  handleSetBtnIdForExpandData,
  handleUpdateData,
  handleViewPDFFileName,
  handleMagazineIsLoading
} from '../MagazinesReportContainer/MagazinesReportSlice';
import {
  allIssuersReq,
  piListOfIndicesReq,
  getListOfExchange,
  getAIPeersGroups,
  getTreeRegionsAndCountries,
  getPIListSectorsAndIndustriesReq,
  searchCompanyAndIndustriesReq,
  getCompanySearchOptions,
  handleShowIndividualOption,
  handleExchangeSelectionChange,
  handleIndexSelectionChange,
  handleAIPeerGroupSelection,
  handleCompanySelection,
  handleCompanySingleSelection,
  handleShowGroupOption,
  handleIndustrySelection,
  handleCompanySearchOptionSelection,
  handleBulkCompanySelection,
  handleCompanySearchOptionsReq,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  handleRunReq,
  dashboardSubmitReq,
  handleMarketCapSelection,
  handleSaveCurrentList,
  handleSavedPeerGroupsInputChange,
  handleInvestorSavedPeerGroupsInputChange,
  HandleTreeViewCompanyLocation,
  HandleTreeViewIndustry,
  handleCompanySearchUpdateReq,
  handleInvestorSearchUpdateReq,
  handleSaveInvestorCurrentList,
  handleCompanySearchDeleteReq,
  getAllCompanySearchSelection,
  ResetCompanySearchOptionSelection,
  ResetInvestorSearchOptionSelection,
  HandleFilterModel,
  HandleInvestorFilterModel,
  handleReset,
  handleSidebarTab,
  userRightsForWidgetsReq,
  getAllDashboardWidgetsReq,
  addToDashboardSelection,
  handleSaveDashboardSelectionArray,
  handleTxtDashboardName,
  addtblDashboardWidgetLinkReq,
  getUserDashboardReq,
  handleRemoveWidget,
  addtblDashboardNewWidgetLinkReq,
  //
  getCurrentShareholderReq,
  handleByShareholderOfCompany,
  handleInvestorSearchDeleteReq,
  getInvestorSearchOptions,
  handleInvestorSearchOptionSelection,
  listInvestorTypeAndSubtype,
  HandleTreeViewListInvestorTypeAndSubtype,
  getInvestorSearchSelectionReq,
  HandleTreeViewInvestorLocation,
  handleInvestorSelection,
  searchInvestorsReq,
  handleBulkInvestorSelection,
  handleInvestorIsBulkUpload,
  getAllInvestorsFromShareholderOfCompany,
  //
  HandleDashBoardWidgetIdSet,
  getAllDashboardWidgetsListReq,
  getStoredProcedureReq,
  resetDashboardWidgetCompanySearchReq,
  resetDashboardWidgetInvestorSearchReq,
  handleSideBar,
  //
  getPortalsTop3NewsReq,
  resolutionsByInvestorTrackerFilterReq,
  getShareHolderProposalESGZReq,
  GetHotActivistDataReq,
  getDirectorAppointmentChartDataReq,
  getAigRussell3000ScoreReq,
  getVotingPolicyChangesESGReq,
  getUpCommingShareHolderESGReq,
  handleIsLoadingDashboard,

  getAumCategorylistReq,
  handleAumCategorySelection
} from './DashboardSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const DashboardContainer = ({
  getCompanySearchOptions,
  getInvestorSearchOptions,
  piListSectorsAndIndustries,
  allIssuers,
  piListOfIndices,
  allListOfExchange,
  listAIPeerGroup,
  allCountriesAndRegions,
  listInvestorTypeAndSubtypeReq,
  userRightsForWidgetsReq,
  getAllDashboardWidgetsReq,
  getUserDashboardReq,
  getCurrentShareholderReq,
  getAllDashboardWidgetsListReq,
  widgetList,
  getStoredProcedureReq,
  resetDashboardWidgetCompanySearchReq,
  resetDashboardWidgetInvestorSearchReq,
  handleSideBar,
  sideBarOpen,
  getPortalsTop3NewsReq,
  GetHotActivistDataReq,
  getMagazinesReportListPortalReq,
  getDirectorAppointmentChartDataReq,
  getAigRussell3000ScoreReq,
  getVotingPolicyChangesESGReq,
  getUpCommingShareHolderESGReq,
  isLoadingMagazinesReport,
  handleMagazineIsLoading,
  handleIsLoadingDashboard,
  isLoadingDashboard,

  getAumCategorylistReq,
  handleAumCategorySelection,
  ...props
}) => {
  React.useEffect(() => {
    const abortController = new AbortController();
    handleIsLoadingDashboard();
    handleMagazineIsLoading();
    async function getData_MyDash() {
      await getAllDashboardWidgetsReq();
      await userRightsForWidgetsReq();
      await allListOfExchange();
      await listAIPeerGroup();
      await allCountriesAndRegions();
      await listInvestorTypeAndSubtypeReq();
      await piListSectorsAndIndustries();
      await getCompanySearchOptions();
      await getInvestorSearchOptions();
      await getCurrentShareholderReq();
      await getAllDashboardWidgetsListReq();
      await getAumCategorylistReq();
    }
    async function getData() {
      await handleReset();
      if (props.piListIndices !== undefined && props.piListIndices.length === 0) {
        await piListOfIndices();
      }
      await getPortalsTop3NewsReq();
      await getMagazinesReportListPortalReq();
      await getDirectorAppointmentChartDataReq();
      await getAigRussell3000ScoreReq();
      await getVotingPolicyChangesESGReq();
      await getUpCommingShareHolderESGReq();
    }
    if (props.dashboardID.product_id !== 0) {
      getData();
    }
    if (props.dashboardID.product_id === 0) {
      getData_MyDash();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [props.dashboardID, handleMagazineIsLoading]);

  React.useEffect(() => {
    const abortController = new AbortController();
    async function getActivismData() {
      await GetHotActivistDataReq();
    }
    if (props.dashboardID.value === 2) {
      getActivismData();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [GetHotActivistDataReq, props.dashboardID]);

  React.useEffect(() => {
    getUserDashboardReq();
  }, [getUserDashboardReq]);

  return (
    <ErrorBoundary>
      <Dashboard
        allIssuers={allIssuers}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getUserDashboardReq={getUserDashboardReq}
        widgetList={widgetList}
        getStoredProcedureReq={getStoredProcedureReq}
        resetDashboardWidgetCompanySearchReq={resetDashboardWidgetCompanySearchReq}
        resetDashboardWidgetInvestorSearchReq={resetDashboardWidgetInvestorSearchReq}
        handleSideBar={handleSideBar}
        sideBarOpen={sideBarOpen}
        isLoadingMagazinesReport={isLoadingMagazinesReport}
        handleIsLoadingDashboard={handleIsLoadingDashboard}
        isLoadingDashboard={isLoadingDashboard}
        {...props}
      />
    </ErrorBoundary>
  );
};

DashboardContainer.propTypes = {
  allCountriesAndRegions: PropTypes.func.isRequired,
  allIssuers: PropTypes.any.isRequired,
  allListOfExchange: PropTypes.func.isRequired,
  getAllDashboardWidgetsReq: PropTypes.func.isRequired,
  getCompanySearchOptions: PropTypes.func.isRequired,
  getCurrentShareholderReq: PropTypes.func.isRequired,
  getInvestorSearchOptions: PropTypes.func.isRequired,
  getUserDashboardReq: PropTypes.func.isRequired,
  listAIPeerGroup: PropTypes.func.isRequired,
  listInvestorTypeAndSubtypeReq: PropTypes.func.isRequired,
  piListOfIndices: PropTypes.func.isRequired,
  piListSectorsAndIndustries: PropTypes.func.isRequired,
  userRightsForWidgetsReq: PropTypes.func.isRequired,
  isOutdatedVersion: PropTypes.bool,
  isLoadingMagazinesReport: PropTypes.bool.isRequired,
  handleMagazineIsLoading: PropTypes.func.isRequired,
  handleIsLoadingDashboard: PropTypes.func.isRequired,
  isLoadingDashboard: PropTypes.bool.isRequired
};

DashboardContainer.defaultProps = {
  isOutdatedVersion: false
};

// #region states assign list
const selectIsLoadingDashboard = (state) => state.dashboard.isLoadingDashboard;
const selectShowIndividualOption = (state) => state.dashboard.showIndividualOption;
const selectDashboarID = (state) => state.dashboard.dashboardID;
const selectdashboardIDOptions = (state) => state.dashboard.dashboardIDOptions;
const selectLstResolutionType = (state) => state.dashboard.lstResolutionType;
const selectMagazinesReport3_data = (state) => state.magazinesReport.magazinesReport3_data;
// companies
const selectallIssersRecordset = (state) => state.dashboard.issersRecordset;
const selectCompanySingleSelection = (state) => state.dashboard.companySingleSelection;
const selectCompanySelection = (state) => state.dashboard.companySelection;

// exchange
const selectListOfExchange = (state) => state.dashboard.listExchange;
const selectExchangeSelection = (state) => state.dashboard.exchangeSelection;

// Index
const selectListOfIndicesRecordSet = (state) => state.dashboard.piListIndices;
const selectIndexSelection = (state) => state.dashboard.indexSelection;

// AI Peer Groups
const selectAIPeerGroup = (state) => state.dashboard.listAIPeersGroups;
const selectAIPeerGroupSelection = (state) => state.dashboard.aiPeerGroupSelection;

// Market Cap ($mn):
const selectListMarketCap = (state) => state.dashboard.listMarketCap;
const selectMarketCapSelection = (state) => state.dashboard.marketCapSelection;

// AUM ($bn).
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) => state.dashboard.aumCategorySelection;

// Industry
const selectIndustrySelection = (state) => state.dashboard.industrySelection;

// By Company Location:
const selectListRegeionAndCountries = (state) => state.dashboard.listRegeionAndCountries;
const selectCompanyLocationSelection = (state) => state.dashboard.companyLocationSelection;

// By My Saved Peer Groups
const selectCompanySearchOptions = (state) => state.dashboard.companySearchOptions;
const selectCompanySearchOptionSelection = (state) => state.dashboard.companySearchOptionSelection;

const selectPIListSectorsAndIndustries = (state) => state.dashboard.piListSectorsAndIndustries;
const selectBulkCompanySelectRecordset = (state) => state.dashboard.freeSearchRecordset;

const selectSaveCurrentListButtonText = (state) => state.dashboard.saveCurrentListButtonText;
const selectIsSaveCurrentListDisable = (state) => state.dashboard.isSaveCurrentListButtonSaveDisable;
const selectIsSaveCurrentListButtonDeleteDisable = (state) => state.dashboard.isSaveCurrentListButtonDeleteDisable;
const selectTextSaveCurrentList = (state) => state.dashboard.txtSaveCurrentList;
const selectTextMarketCapMinRange = (state) => state.dashboard.txtMarketCapMinRange;
const selectTextMarketCapMaxRange = (state) => state.dashboard.txtMarketCapMaxRange;
const selectCurrentSelectionComapanySearchid = (state) => state.dashboard.currentSelectionComapanySearchid;
const selectShowFilterModel = (state) => state.dashboard.showFilterModel;
const selectShowInvestorFilterModel = (state) => state.dashboard.showInvestorFilterModel;

const selectHandleReset = (state) => state.dashboard.handleReset;

// right sidebar
const selectWidgetListForProductSelection = (state) => state.dashboard.widgetListForProductSelection;
const selectDashboardSelection = (state) => state.dashboard.dashboardSelection;

// right sidebar tab
const selectSelectedSidebarTab = (state) => state.dashboard.selectedSidebarTab;
const selectActivisamTab = (state) => state.dashboard.activisamTab;
const selectShortsTab = (state) => state.dashboard.shortsTab;
const selectVotingTab = (state) => state.dashboard.votingTab;
const selectGoveranceTab = (state) => state.dashboard.goveranceTab;
const selectVarneblityTab = (state) => state.dashboard.varneblityTab;

// right sidebartab - user access
const selectIsUserAccessActivisam = (state) => state.dashboard.isUserAccessActivisam;
const selectIsUserAccessShorts = (state) => state.dashboard.isUserAccessShorts;
const selectIsUserAccessVoting = (state) => state.dashboard.isUserAccessVoting;
const selectIsUserAccessGoverance = (state) => state.dashboard.isUserAccessGoverance;
const selectIsUserAccessCompensation = (state) => state.dashboard.isUserAccessCompensation;
const selectIsUserAccessVarneblityTab = (state) => state.dashboard.isUserAccessVarneblityTab;

// dashboard
const selectDashboardSelectionId = (state) => state.dashboard.dashboardSelectionId;
const selectTxtDashboardName = (state) => state.dashboard.txtDashboardName;
const selectDashboardSerializedData = (state) => state.dashboard.selectDashboardSerializedData;
const selectDashboardSelectionArray = (state) => state.dashboard.dashboardSelectionArray;
const selectLstHotActivist = (state) => state.dashboard.lstHotActivist;
const selectDirectorAppointmentChartData = (state) => state.dashboard.directorAppointmentChartData;
const selectAigScoreChartData = (state) => state.dashboard.AigScoreChartData;
const selectESGShareHolderProposalData = (state) => state.dashboard.ESGShareHolderProposalData;
const selectESGVotingPolicyChanges = (state) => state.dashboard.ESGVotingPolicyChanges;
const selectESGUpCommingShareHolderData = (state) => state.dashboard.ESGUpCommingShareHolderData;

// Investor
const selectlistByIndivProponent = (state) => state.dashboard.listByIndivProponent;
const selectSelectionByIndivProponent = (state) => state.dashboard.selectionByIndivProponent;
const selectInvestorSearchOptions = (state) => state.dashboard.investorSearchOptions;
const selectInvestorSearchOptionsSelection = (state) => state.dashboard.investorSearchOptionsSelection;
const selectListInvestorTypeAndSubtype = (state) => state.dashboard.listInvestorTypeAndSubtype;
const selectListInvestorTypeAndSubtypeSelection = (state) => state.dashboard.listInvestorTypeAndSubtypeSelection;
const selectInvestorLocationSelection = (state) => state.dashboard.investorLocationSelection;
const selectInvestorSelection = (state) => state.dashboard.investorSelection;
const selectInvestorBulkUpload = (state) => state.dashboard.isInvestorBulkUpload;
//
const selectHandleDashBoardWidgetIdSet = (state) => state.dashboard.dashBoardWidgetId;
const selectGetAllDashboardWidgetsList = (state) => state.dashboard.widgetList;
const selectSideBarOpen = (state) => state.dashboard.sideBarOpen;
const selectVotinProtalTop3News = (state) => state.dashboard.votingPortalTop3News;
const selectActivismPortalTop3News = (state) => state.dashboard.activismPortalTop3News;
const selectGovernancePortalTop3New = (state) => state.dashboard.governancePortalTop3New;
const selectESGPortalTop3News = (state) => state.dashboard.ESGPortalTop3News;
const selectVulnerabilityPortalTop3News = (state) => state.dashboard.vulnerabilityPortalTop3News;

const selectActivistShortTop3News = (state) => state.dashboard.activistShortTop3News;
//
const selectBtnIdForExpandData = (state) => state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) => state.magazinesReport.isLoadingMagazinesReport;
const selectInvListRegeionAndCountries = (state) => state.dashboard.invListRegeionAndCountries;
const selectInvTxtMarketCapMinRange = (state) => state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) => state.dashboard.invTxtMarketCapMaxRange;
// #endregion

//default selection tree view
const selectListDefaultInvestorTypeAndSubtype = (state) => state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) => state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) => state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) => state.dashboard.defaultPiListSectorsAndIndustries;

const mapStateToProps = (state) => ({
  isLoadingDashboard: selectIsLoadingDashboard(state),
  dashBoardWidgetId: selectHandleDashBoardWidgetIdSet(state),
  lstResolutionType: selectLstResolutionType(state),
  magazinesReport3_data: selectMagazinesReport3_data(state),
  // investor
  isInvestorBulkUpload: selectInvestorBulkUpload(state),
  investorSelection: selectInvestorSelection(state),
  listByIndivProponent: selectlistByIndivProponent(state),
  selectionByIndivProponent: selectSelectionByIndivProponent(state),
  investorSearchOptions: selectInvestorSearchOptions(state),
  investorSearchOptionsSelection: selectInvestorSearchOptionsSelection(state),
  listInvestorTypeAndSubtype: selectListInvestorTypeAndSubtype(state),
  listInvestorTypeAndSubtypeSelection: selectListInvestorTypeAndSubtypeSelection(state),
  investorLocationSelection: selectInvestorLocationSelection(state),

  // dashboard
  dashboardSelectionId: selectDashboardSelectionId(state),
  selectDashboardSerializedData: selectDashboardSerializedData(state),
  dashboardSelectionArray: selectDashboardSelectionArray(state),
  txtDashboardName: selectTxtDashboardName(state),

  // right sidebar
  widgetListForProductSelection: selectWidgetListForProductSelection(state),
  dashboardSelection: selectDashboardSelection(state),

  // sidebar tab
  selectedSidebarTab: selectSelectedSidebarTab(state),
  activisamTab: selectActivisamTab(state),
  shortsTab: selectShortsTab(state),
  votingTab: selectVotingTab(state),
  goveranceTab: selectGoveranceTab(state),
  varneblityTab: selectVarneblityTab(state),
  sideBarOpen: selectSideBarOpen(state),

  // sidebartab - user access
  isUserAccessActivisam: selectIsUserAccessActivisam(state),
  isUserAccessShorts: selectIsUserAccessShorts(state),
  isUserAccessVoting: selectIsUserAccessVoting(state),
  isUserAccessGoverance: selectIsUserAccessGoverance(state),
  isUserAccessCompensation: selectIsUserAccessCompensation(state),
  isUserAccessVarneblityTab: selectIsUserAccessVarneblityTab(state),

  showIndividualOption: selectShowIndividualOption(state),
  saveCurrentListButtonText: selectSaveCurrentListButtonText(state),
  isSaveCurrentListButtonSaveDisable: selectIsSaveCurrentListDisable(state),
  isSaveCurrentListButtonDeleteDisable: selectIsSaveCurrentListButtonDeleteDisable(state),
  txtSaveCurrentList: selectTextSaveCurrentList(state),
  txtMarketCapMinRange: selectTextMarketCapMinRange(state),
  txtMarketCapMaxRange: selectTextMarketCapMaxRange(state),
  currentSelectionComapanySearchid: selectCurrentSelectionComapanySearchid(state),
  showFilterModel: selectShowFilterModel(state),
  showInvestorFilterModel: selectShowInvestorFilterModel(state),
  handleReset: selectHandleReset(state),

  // companies
  issersRecordset: selectallIssersRecordset(state),
  companySelection: selectCompanySelection(state),
  companySingleSelection: selectCompanySingleSelection(state),
  // magazine
  btnIdForExpandData: selectBtnIdForExpandData(state),
  isLoadingMagazinesReport: selectIsLoading(state),
  viewPDFFileName: selectViewPDFFileName(state),

  // exchange
  listOfExchange: selectListOfExchange(state),
  exchangeSelection: selectExchangeSelection(state),

  // Index
  piListIndices: selectListOfIndicesRecordSet(state),
  indexSelection: selectIndexSelection(state),

  // AI Peer Groups
  aiPeerGroups: selectAIPeerGroup(state),
  aiPeerGroupSelection: selectAIPeerGroupSelection(state),

  // Market Cap ($mn):
  listMarketCap: selectListMarketCap(state),
  marketCapSelection: selectMarketCapSelection(state),

  // AUM ($bn).
  listAumCategory: selectListAumCategory(state),
  aumCategorySelection: selectAumCategorySelection(state),

  // Industry
  piListOfSectorsAndIndustries: selectPIListSectorsAndIndustries(state),
  industrySelection: selectIndustrySelection(state),

  // By Company Location:
  listRegeionAndCountries: selectListRegeionAndCountries(state),
  companyLocationSelection: selectCompanyLocationSelection(state),

  // By My Saved Peer Groups
  listOfcompanySearchOptions: selectCompanySearchOptions(state),
  companySearchOptionSelection: selectCompanySearchOptionSelection(state),
  invListRegeionAndCountries: selectInvListRegeionAndCountries(state),
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),

  freeSearchRecordset: selectBulkCompanySelectRecordset(state),
  widgetList: selectGetAllDashboardWidgetsList(state),
  dashboardID: selectDashboarID(state),
  dashboardIDOptions: selectdashboardIDOptions(state),

  votingPortalTop3News: selectVotinProtalTop3News(state),

  activismPortalTop3News: selectActivismPortalTop3News(state),
  governancePortalTop3New: selectGovernancePortalTop3New(state),
  ESGPortalTop3News: selectESGPortalTop3News(state),
  vulnerabilityPortalTop3News: selectVulnerabilityPortalTop3News(state),
  activistShortTop3News: selectActivistShortTop3News(state),

  lstHotActivist: selectLstHotActivist(state),
  directorAppointmentChartData: selectDirectorAppointmentChartData(state),
  AigScoreChartData: selectAigScoreChartData(state),
  ESGShareHolderProposalData: selectESGShareHolderProposalData(state),
  ESGVotingPolicyChanges: selectESGVotingPolicyChanges(state),
  ESGUpCommingShareHolderData: selectESGUpCommingShareHolderData(state),
  //default selection tree view
  listDefaultInvestorTypeAndSubtype: selectListDefaultInvestorTypeAndSubtype(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries: selectDefaultPiListSectorsAndIndustries(state),
});

const mapDispatchToProps = {
  listAIPeerGroup: getAIPeersGroups,
  allIssuers: allIssuersReq,
  piListOfIndices: piListOfIndicesReq,
  allListOfExchange: getListOfExchange,
  allCountriesAndRegions: getTreeRegionsAndCountries,
  listInvestorTypeAndSubtypeReq: listInvestorTypeAndSubtype,
  piListSectorsAndIndustries: getPIListSectorsAndIndustriesReq,
  handleCompanyAndIndustry: searchCompanyAndIndustriesReq,
  handleBulkInvestorSelection,
  handleSearchInvestor: searchInvestorsReq,
  getCompanySearchOptions,
  getInvestorSearchOptions,
  handleExchangeSelectionChange,
  handleIndexSelectionChange,
  handleAIPeerGroupSelection,
  handleCompanySelection,
  handleCompanySingleSelection,
  handleShowIndividualOption,
  handleShowGroupOption,
  handleMarketCapSelection,
  handleIndustrySelection,
  handleCompanySearchOptionSelection,
  handleBulkCompanySelection,
  handleSaveCurrentList,
  handleMarketCapMinRange,
  handleCompanySearchOptionsReq,
  handleMarketCapMaxRange,
  HandleTreeViewIndustry,
  handleSavedPeerGroupsInputChange,
  HandleTreeViewCompanyLocation,
  HandleTreeViewInvestorLocation,
  handleInvestorSelection,
  HandleTreeViewListInvestorTypeAndSubtype,
  handdleRun: handleRunReq,
  handleCompanySearchUpdateReq,
  handleInvestorSearchUpdateReq,
  handleSaveInvestorCurrentList,
  handleCompanySearchDeleteReq,
  handleInvestorSearchDeleteReq,
  getAllCompanySearchSelection,
  GetInvestorSearchSelection: getInvestorSearchSelectionReq,
  ResetCompanySearchOptionSelection,
  ResetInvestorSearchOptionSelection,
  handleInvestorSavedPeerGroupsInputChange,
  HandleFilterModel,
  HandleInvestorFilterModel,
  handleReset,
  handleSidebarTab,
  userRightsForWidgetsReq,
  getAllDashboardWidgetsReq,
  addToDashboardSelection,
  dashboardSubmitReq,
  handleSaveDashboardSelectionArray,
  handleTxtDashboardName,
  addtblDashboardWidgetLinkReq,
  getUserDashboardReq,
  handleRemoveWidget,
  addtblDashboardNewWidgetLinkReq,
  handleResetBreadcrumbs,
  handleByShareholderOfCompany,
  getCurrentShareholderReq,
  handleInvestorSearchOptionSelection,
  handleInvestorIsBulkUpload,
  getAllInvestorsFromShareholderOfCompany,
  //
  HandleDashBoardWidgetIdSet,
  getAllDashboardWidgetsListReq,
  getStoredProcedureReq,
  resetDashboardWidgetCompanySearchReq,
  resetDashboardWidgetInvestorSearchReq,
  handleSideBar,
  getPortalsTop3NewsReq,
  resolutionsTrackerData: resolutionsByInvestorTrackerFilterReq,
  GetHotActivistDataReq,
  getMagazinesReportListPortalReq,
  getDirectorAppointmentChartDataReq,
  getAigRussell3000ScoreReq,
  handleSetBtnIdForExpandData,
  handleUpdateData,
  handleViewPDFFileName,
  handleMagazineIsLoading,
  shareHolderProposalData: getShareHolderProposalESGZReq,
  getVotingPolicyChangesESGReq,
  getUpCommingShareHolderESGReq,
  handleIsLoadingDashboard,

  handleAumCategorySelection,
  getAumCategorylistReq
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
