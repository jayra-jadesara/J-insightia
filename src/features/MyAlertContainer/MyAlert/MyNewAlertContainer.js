import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewAlerts from '../../../components/MyAlert/Alert/NewAlerts';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader
} from '../../General/TitleSlice';
import { GOVERNANCE } from '../../../constants/ProductConstants';
import {
  handleResetInvestorComparatorTool,
  handleSponsorSelection,
  getAllMeetingTypeReq,
  handleMeetingTypeSelection,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  handleIndividualProponentSelection,
  handleGroupProponentSelection,
  handleStartInvCompDateSelection,
  handleEndInvCompDateSelection,
  handleIsInvCompDateChecked,
  handleProponentGroupsearch,
  resolutionsByInvestorFilterReq,
  handleComapnySearchSelectionInvComp,
  handleInvestorSearchSelectionInvComp,
  getDefaultPeerGroupDataReq,
  handleClearPeerGroupCompanySelection,
  handleClearPeerGroupInvestorSelection,
  handleClearResult,
  getResolutionsTypeIdByNameReq
} from '../../ToolsContainer/ToolsSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import {
  // company
  handleCompanySearchOptionSelection,
  handleIndustrySelection,
  handleCompanySelection,
  HandleFilterModel,
  handleShowIndividualOption,
  handleShowGroupOption,
  handleBulkCompanySelection,
  piListOfIndicesReq,
  getAIPeersGroups,
  getListOfExchange,
  getTreeRegionsAndCountries,
  listInvestorTypeAndSubtype,
  getPIListSectorsAndIndustriesReq,
  getCompanySearchOptions,
  getInvestorSearchOptions,
  getCurrentShareholderReq,
  allIssuersReq,
  handleIndexSelectionChange,
  handleExchangeSelectionChange,
  handleAIPeerGroupSelection,
  handleMarketCapSelection,
  searchInvestorsReq,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  HandleTreeViewIndustry,
  handleSaveCurrentList,
  HandleTreeViewCompanyLocation,
  getAllCompanySearchSelection,
  ResetCompanySearchOptionSelection,
  handleCompanySearchUpdateReq,
  searchCompanyAndIndustriesReq,
  handleCompanySingleSelection,
  handleRunReq,
  handleCompanySearchDeleteReq,

  // investor
  HandleInvestorFilterModel,
  HandleTreeViewInvestorLocation,
  getInvestorSearchSelectionReq,
  handleInvestorSelection,
  handleInvestorIsBulkUpload,
  handleBulkInvestorSelection,
  handleByShareholderOfCompany,
  getAllInvestorsFromShareholderOfCompany,
  HandleTreeViewListInvestorTypeAndSubtype,
  handleSaveInvestorCurrentList,
  handleInvestorSearchDeleteReq,
  handleInvestorSearchUpdateReq,
  handleInvestorSearchOptionSelection,
  handleReset,
  getAumCategorylistReq,
  handleAumCategorySelection,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections
} from '../../DashboardContainer/DashboardSlice';
import {
  productAvaibleForCurrentUserReq,
  getActivismNewsAlertsReq,
  getActivismEventNewsAlertsReq,
  getListFilingGroupsReq,
  handleOnChangeDdlActivisamEventNews,
  handleOnChangeDdlActivisamShortEventNews,
  handleOnChangeDdlActivismNewsFillingAlert,
  handleOnChangeDdlSpecificNews,
  handleOnChangeDdlSpecificShortNews,
  getAlertOptionsAndSubOptionsReq,
  getDirectorTypeReq,
  getGovAmendemntCategoriesReq,
  handleOnChangeAlertName,
  handleOnChangeChkNotifiedMe,
  handleOnChangeRdoEmailTo,
  handleOnChangeisJustMyJIOAlertInbox,
  handleCancelEditingAlert,
  getExistingAlertsReq,
  handleDeleteOptionAndSubOptionLink,
  handleDynamicbtnClick,
  handleOnChangeDynamicDropdown,
  handleOnChangeDynamicSubOption,
  getAlerModulAccessReq,
  handleOnChangeDdlSpecificActivistDemands,
  handleButtonAccess,
  getTokenDecode,
  handleResetAlertFilterIds
} from './MyAlertSlice';
import { getLawFirmProposalTypes } from '../../../config/server-config';

const MyNewAlertContainer = ({
  getAllMeetingTypeReq,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  getDefaultPeerGroupDataReq,
  companySearchOptionSelection,
  investorSearchOptionsSelection,
  getInvestorSearchOptions,
  getCompanySearchOptions,
  piListOfIndices,
  allListOfExchange,
  listAIPeerGroup,
  allCountriesAndRegions,
  listInvestorTypeAndSubtypeReq,
  piListSectorsAndIndustries,
  getCurrentShareholderReq,

  // current
  ddlSpecificActivistActionNews,
  ddlSpecificShortActivistActionNews,
  ddlSpecificActivistActionNewsSelection,
  ddlSpecificShortActivistActionNewsSelection,
  ddlSpecificFillingType,
  ddlSpecificFillingTypeSelection,

  ddlSpecificActivistDemands,

  // My Alert slice
  getActivismNewsAlertsReq,
  getActivismEventNewsAlertsReq,
  getListFilingGroupsReq,
  getAlertOptionsAndSubOptionsReq,
  productAvaibleForCurrentUserReq,
  getDirectorTypeReq,
  getGovAmendemntCategoriesReq,
  getAlerModulAccessReq,
  ddlSpecificActivistDemandsSelection,
  activistDemandTypeSelection,
  ddlAlertOptionActivistDemandsSelection,
  getAumCategorylistReq,

  handleButtonAccess,
  token,
  getTokenDecode,
  isEnabledButtonfor_subs_Activism,
  isEnabledButtonfor_subs_ShortActivism,
  isEnabledButtonfor_subs_Governance,
  isEnabledButtonfor_subs_Voting,
  handleResetAlertFilterIds,
  ...props
}) => {
  useEffect(() => {
    getAlerModulAccessReq();
  }, []);

  useEffect(() => {
    async function getNewsAccess() {
      getAllMeetingTypeReq();
      getAllIndividualProponentReq();
    }
    getNewsAccess();
  }, [
    getAllMeetingTypeReq,
    getAllIndividualProponentReq,
    getAllGroupProponentReq
  ]);

  useEffect(() => {
    async function getData() {
      piListOfIndices();
      allListOfExchange();
      listAIPeerGroup();
      allCountriesAndRegions();
      listInvestorTypeAndSubtypeReq();
      piListSectorsAndIndustries();
      getCompanySearchOptions();
      getInvestorSearchOptions();
      getCurrentShareholderReq();
      getCompanySearchOptions();
      getInvestorSearchOptions();
      const optionData = {
        comp: companySearchOptionSelection,
        inve: investorSearchOptionsSelection
      };
      getDefaultPeerGroupDataReq(optionData);
      getAumCategorylistReq();
    }
    getData();
  }, [
    getCompanySearchOptions,
    getInvestorSearchOptions,
    piListSectorsAndIndustries,
    piListOfIndices,
    allListOfExchange,
    listAIPeerGroup,
    allCountriesAndRegions,
    listInvestorTypeAndSubtypeReq,
    getCurrentShareholderReq,
    getDefaultPeerGroupDataReq,
    companySearchOptionSelection,
    investorSearchOptionsSelection,
    getAumCategorylistReq,
  ]);

  // My Alert - use effects
  useEffect(() => {
    getActivismNewsAlertsReq();
    getActivismEventNewsAlertsReq();
    getListFilingGroupsReq();
    getAlertOptionsAndSubOptionsReq();
    productAvaibleForCurrentUserReq(GOVERNANCE);
    getDirectorTypeReq();
    getGovAmendemntCategoriesReq();
  }, [
    getActivismEventNewsAlertsReq,
    getActivismNewsAlertsReq,
    getAlertOptionsAndSubOptionsReq,
    getDirectorTypeReq,
    getGovAmendemntCategoriesReq,
    getListFilingGroupsReq,
    productAvaibleForCurrentUserReq,
  ]);

  useEffect(() => {
    getTokenDecode();
    handleButtonAccess(token.MemberShip);
  }, [getTokenDecode]);

  return (
    <ErrorBoundary>
      <NewAlerts
        {...props}
        ddlSpecificActivistActionNews={ddlSpecificActivistActionNews}
        ddlSpecificShortActivistActionNews={ddlSpecificShortActivistActionNews}
        ddlSpecificActivistActionNewsSelection={
          ddlSpecificActivistActionNewsSelection
        }
        ddlSpecificShortActivistActionNewsSelection={
          ddlSpecificShortActivistActionNewsSelection
        }
        ddlSpecificFillingType={ddlSpecificFillingType}
        ddlSpecificFillingTypeSelection={ddlSpecificFillingTypeSelection}
        companySearchOptionSelection={companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        ddlSpecificActivistDemands={ddlSpecificActivistDemands}
        ddlSpecificActivistDemandsSelection={
          ddlSpecificActivistDemandsSelection
        }
        activistDemandTypeSelection={activistDemandTypeSelection}
        ddlAlertOptionActivistDemandsSelection={
          ddlAlertOptionActivistDemandsSelection
        }
        token={token.MemberShip}
        handleButtonAccess={handleButtonAccess}
        isEnabledButtonfor_subs_Activism={isEnabledButtonfor_subs_Activism}
        isEnabledButtonfor_subs_ShortActivism={isEnabledButtonfor_subs_ShortActivism}
        isEnabledButtonfor_subs_Governance={isEnabledButtonfor_subs_Governance}
        isEnabledButtonfor_subs_Voting={isEnabledButtonfor_subs_Voting}
        handleResetAlertFilterIds={handleResetAlertFilterIds}
      />
    </ErrorBoundary>
  );
};

MyNewAlertContainer.propTypes = {
  ddlSpecificActivistActionNewsSelection: PropTypes.array,
  ddlSpecificShortActivistActionNewsSelection: PropTypes.array,
  ddlSpecificShortActivistActionNews: PropTypes.array,
  ddlSpecificActivistActionNews: PropTypes.array,
  ddlSpecificFillingType: PropTypes.array,
  ddlSpecificFillingTypeSelection: PropTypes.array,
  ddlSpecificActivistDemands: PropTypes.array,
  ddlSpecificActivistDemandsSelection: PropTypes.array,
  getTokenDecode: PropTypes.func.isRequired,
  handleButtonAccess: PropTypes.func.isRequired,
};
MyNewAlertContainer.defaultProps = {
  ddlSpecificFillingType: [],
  ddlSpecificActivistActionNews: [],
  ddlSpecificShortActivistActionNews: [],
  ddlSpecificShortActivistActionNewsSelection: [],
  ddlSpecificActivistActionNewsSelection: [],
  ddlSpecificFillingTypeSelection: undefined,
  ddlSpecificActivistDemands: [],
  ddlSpecificActivistDemandsSelection: []
};

// My Alert slice
const SelectAlertOptions = (state) => state.myAlert.alertOptions;
const SelectAlertSubOptions = (state) => state.myAlert.alertSubOptions;
const SelectAlertStaticSubOptions = (state) =>
  state.myAlert.alertStaticSubOptions;
const SelectAlertName = (state) => state.myAlert.alertName;
const SelectChkNotifiedMe = (state) => state.myAlert.chkNotifiedMe;
const SelectIsEmailMeToo = (state) => state.myAlert.isEmailMeToo;
const SelectIsJustMyJIOAlertInbox = (state) =>
  state.myAlert.isJustMyJIOAlertInbox;
const SelectMyAlertSelectedOptionIds = (state) =>
  state.myAlert.myAlertSelectedOptionIds;
const SelectMyAlertSelectedSubOptionIds = (state) =>
  state.myAlert.myAlertSelectedSubOptionIds;
const SelectMyAlertSelectedSubOptionStatic = (state) =>
  state.myAlert.myAlertSelectedSubOptionStatic;
const SelectDdlSpecificActivistDemands = (state) =>
  state.myAlert.ddlSpecificActivistDemands;

// My Alert slice - Activism panel
const SelectDdlSpecificActivistActionNews = (state) =>
  state.myAlert.ddlSpecificActivistActionNews;
const SelectDdlSpecificShortActivistActionNews = (state) =>
  state.myAlert.ddlSpecificShortActivistActionNews;
const SelectDdlSpecificActivistActionNewsSelection = (state) =>
  state.myAlert.ddlSpecificActivistActionNewsSelection;
const SelectDdlSpecificShortActivistActionNewsSelection = (state) =>
  state.myAlert.ddlSpecificShortActivistActionNewsSelection;
const SelectDdlSpecificFillingType = (state) =>
  state.myAlert.ddlSpecificFillingType;
const SelectDdlSpecificFillingTypeSelection = (state) =>
  state.myAlert.ddlSpecificFillingTypeSelection;
const SelectDdlActivismEventNewsAlerts = (state) =>
  state.myAlert.ddlActivismEventNewsAlerts;
const SelectDdlActivismShortEventNewsAlerts = (state) =>
  state.myAlert.ddlActivismShortEventNewsAlerts;
const SelectDdlActivismEventNewsAlertsSelection = (state) =>
  state.myAlert.ddlActivismEventNewsAlertsSelection;
const SelectDdlActivismShortEventNewsAlertsSelection = (state) =>
  state.myAlert.ddlActivismShortEventNewsAlertsSelection;
const SelectDdlAlertOptionActivismFilingSelection = (state) =>
  state.myAlert.ddlAlertOptionActivismFilingSelection;
const SelectDdlAlertOptionActivismNewsSelection = (state) =>
  state.myAlert.ddlAlertOptionActivismNewsSelection;
const SelectDdlAlertOptionShortActivismNewsSelection = (state) =>
  state.myAlert.ddlAlertOptionShortActivismNewsSelection;
const SelectActivismNewsActivistTypeSelection = (state) =>
  state.myAlert.activismNewsActivistTypeSelection;
const SelectActivismShortNewsActivistTypeSelection = (state) =>
  state.myAlert.activismShortNewsActivistTypeSelection;

const SelectAllDataStore = (state) => state.myAlert.allDataStore;

// dashboard - company search
const selectIndustrySelection = (state) => state.dashboard.industrySelection;
const selectShowFilterModel = (state) => state.dashboard.showFilterModel;
const selectCompanySelection = (state) => state.dashboard.companySelection;
const selectShowIndividualOption = (state) =>
  state.dashboard.showIndividualOption;
const selectBulkCompanySelectRecordset = (state) =>
  state.dashboard.freeSearchRecordset;
const selectListOfIndicesRecordSet = (state) => state.dashboard.piListIndices;
const selectIndexSelection = (state) => state.dashboard.indexSelection;
const selectListOfExchange = (state) => state.dashboard.listExchange;
const selectExchangeSelection = (state) => state.dashboard.exchangeSelection;
const selectAIPeerGroup = (state) => state.dashboard.listAIPeersGroups;
const selectAIPeerGroupSelection = (state) =>
  state.dashboard.aiPeerGroupSelection;
const selectListMarketCap = (state) => state.dashboard.listMarketCap;
const selectMarketCapSelection = (state) => state.dashboard.marketCapSelection;
const selectTextMarketCapMinRange = (state) =>
  state.dashboard.txtMarketCapMinRange;
const selectTextMarketCapMaxRange = (state) =>
  state.dashboard.txtMarketCapMaxRange;
const selectCompanyLocationSelection = (state) =>
  state.dashboard.companyLocationSelection;
const selectListRegeionAndCountries = (state) =>
  state.dashboard.listRegeionAndCountries;
const selectPIListSectorsAndIndustries = (state) =>
  state.dashboard.piListSectorsAndIndustries;
const selectCompanySearchOptionSelection = (state) =>
  state.dashboard.companySearchOptionSelection;
const selectCompanySearchOptions = (state) =>
  state.dashboard.companySearchOptions;
const selectTextSaveCurrentList = (state) => state.dashboard.txtSaveCurrentList;
const selectSaveCurrentListButtonText = (state) =>
  state.dashboard.saveCurrentListButtonText;
const selectCompanySingleSelection = (state) =>
  state.dashboard.companySingleSelection;

// dashboard - investor search
const selectInvListRegeionAndCountries = (state) => state.dashboard.invListRegeionAndCountries;
const selectInvTxtMarketCapMinRange = (state) => state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) => state.dashboard.invTxtMarketCapMaxRange;
const selectInvestorSelection = (state) => state.dashboard.investorSelection;
const selectInvestorSearchOptions = (state) =>
  state.dashboard.investorSearchOptions;
const selectInvestorSearchOptionsSelection = (state) =>
  state.dashboard.investorSearchOptionsSelection;
const selectShowInvestorFilterModel = (state) =>
  state.dashboard.showInvestorFilterModel;
const selectInvestorLocationSelection = (state) =>
  state.dashboard.investorLocationSelection;
const selectListInvestorTypeAndSubtype = (state) =>
  state.dashboard.listInvestorTypeAndSubtype;
const selectListInvestorTypeAndSubtypeSelection = (state) =>
  state.dashboard.listInvestorTypeAndSubtypeSelection;
const selectInvestorBulkUpload = (state) =>
  state.dashboard.isInvestorBulkUpload;
const selectlistByIndivProponent = (state) =>
  state.dashboard.listByIndivProponent;
const selectSelectionByIndivProponent = (state) =>
  state.dashboard.selectionByIndivProponent;
const selectIsSaveCurrentListButtonDeleteDisable = (state) =>
  state.dashboard.isSaveCurrentListButtonDeleteDisable;

// AUM ($bn)
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) => state.dashboard.aumCategorySelection;

// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;

// selection - company & investor search
const SelectInvCompCompanyPeerGroupSelection = (state) =>
  state.tools.invCompCompanyPeerGroupSelection;
const SelectInvCompInvestorPeerGroupSelection = (state) =>
  state.tools.invCompInvestorPeerGroupSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) =>
  state.tools.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) =>
  state.tools.isResetInvestorPeerGroupSelection;

// Tools - General
const SelectSelectedInvestorDetailsProposalTypeId = (state) =>
  state.tools.selectedInvestorDetailsProposalTypeId;
const SelectSelectedInvestorDetailsProposalSubLevelTypeId = (state) =>
  state.tools.selectedInvestorDetailsProposalSubLevelTypeId;
const SelectSelectedInvestorDetailsProposalTopLevelTypeId = (state) =>
  state.tools.selectedInvestorDetailsProposalTopLevelTypeId;

const SelectDdlSpecificActivistDemandsSelection = (state) =>
  state.myAlert.ddlSpecificActivistDemandsSelection;
const SelectActivistDemandTypeSelection = (state) =>
  state.myAlert.activistDemandTypeSelection;
const SelectDdlAlertOptionActivistDemandsSelection = (state) =>
  state.myAlert.ddlAlertOptionActivistDemandsSelection;
  //default selection tree view
const selectListDefaultInvestorTypeAndSubtype = (state) => state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) => state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) => state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) => state.dashboard.defaultPiListSectorsAndIndustries;

const SelectDecodeToken = (state) => state.myAlert.getTokenDecode;
const selectIsActivismButtonDisabled = (state) => state.myAlert.isEnabledButtonfor_subs_Activism;
const selectIsActivist_ShortsButtonDisabled = (state) => state.myAlert.isEnabledButtonfor_subs_ShortActivism;
const selectIsVotingButtonDisabled = (state) => state.myAlert.isEnabledButtonfor_subs_Voting;
const selectIsGovernanceButtonDisabled = (state) => state.myAlert.isEnabledButtonfor_subs_Governance;
const selectAlert_cmp_search_id = (state) => state.myAlert.alert_cmp_search_id;
const selectAlert_inv_search_id = (state) => state.myAlert.alert_inv_search_id;

const mapStateToProps = (state) => ({
  // Activism panel
  ddlSpecificShortActivistActionNews:
    SelectDdlSpecificShortActivistActionNews(state),
  ddlSpecificActivistActionNews: SelectDdlSpecificActivistActionNews(state),
  ddlSpecificActivistActionNewsSelection:
    SelectDdlSpecificActivistActionNewsSelection(state),
  ddlSpecificShortActivistActionNewsSelection:
    SelectDdlSpecificShortActivistActionNewsSelection(state),
  ddlSpecificFillingType: SelectDdlSpecificFillingType(state),
  ddlSpecificFillingTypeSelection: SelectDdlSpecificFillingTypeSelection(state),
  ddlActivismEventNewsAlerts: SelectDdlActivismEventNewsAlerts(state),
  ddlActivismShortEventNewsAlerts: SelectDdlActivismShortEventNewsAlerts(state),
  ddlActivismShortEventNewsAlertsSelection:
    SelectDdlActivismShortEventNewsAlertsSelection(state),
  ddlActivismEventNewsAlertsSelection:
    SelectDdlActivismEventNewsAlertsSelection(state),
  ddlAlertOptionActivismFilingSelection:
    SelectDdlAlertOptionActivismFilingSelection(state),
  ddlAlertOptionActivismNewsSelection:
    SelectDdlAlertOptionActivismNewsSelection(state),
  ddlAlertOptionShortActivismNewsSelection:
    SelectDdlAlertOptionShortActivismNewsSelection(state),
  activismNewsActivistTypeSelection:
    SelectActivismNewsActivistTypeSelection(state),
  activismShortNewsActivistTypeSelection:
    SelectActivismShortNewsActivistTypeSelection(state),

  // My Alert slice
  alertOptions: SelectAlertOptions(state),
  alertSubOptions: SelectAlertSubOptions(state),
  alertStaticSubOptions: SelectAlertStaticSubOptions(state),
  alertName: SelectAlertName(state),
  chkNotifiedMe: SelectChkNotifiedMe(state),
  isEmailMeToo: SelectIsEmailMeToo(state),
  isJustMyJIOAlertInbox: SelectIsJustMyJIOAlertInbox(state),
  myAlertSelectedOptionIds: SelectMyAlertSelectedOptionIds(state),
  myAlertSelectedSubOptionIds: SelectMyAlertSelectedSubOptionIds(state),
  myAlertSelectedSubOptionStatic: SelectMyAlertSelectedSubOptionStatic(state),
  allDataStore: SelectAllDataStore(state),
  // Tools - General
  selectedInvestorDetailsProposalTypeId:
    SelectSelectedInvestorDetailsProposalTypeId(state),
  selectedInvestorDetailsProposalSubLevelTypeId:
    SelectSelectedInvestorDetailsProposalSubLevelTypeId(state),
  selectedInvestorDetailsProposalTopLevelTypeId:
    SelectSelectedInvestorDetailsProposalTopLevelTypeId(state),

  // title slice
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),

  // investor search selection
  investorSearchOptionsSelection: selectInvestorSearchOptionsSelection(state),
  investorSelection: selectInvestorSelection(state),
  isInvestorBulkUpload: selectInvestorBulkUpload(state),
  investorSearchOptions: selectInvestorSearchOptions(state),
  showInvestorFilterModel: selectShowInvestorFilterModel(state),
  investorLocationSelection: selectInvestorLocationSelection(state),
  listInvestorTypeAndSubtype: selectListInvestorTypeAndSubtype(state),
  listInvestorTypeAndSubtypeSelection:
    selectListInvestorTypeAndSubtypeSelection(state),
  listByIndivProponent: selectlistByIndivProponent(state),
  selectionByIndivProponent: selectSelectionByIndivProponent(state),
  isSaveCurrentListButtonDeleteDisable:
    selectIsSaveCurrentListButtonDeleteDisable(state),

    // AUM ($bn)
  listAumCategory: selectListAumCategory(state),
  aumCategorySelection: selectAumCategorySelection(state),

  // Company search selection
  companySearchOptionSelection: selectCompanySearchOptionSelection(state),
  industrySelection: selectIndustrySelection(state),
  showFilterModel: selectShowFilterModel(state),
  companySelection: selectCompanySelection(state),
  showIndividualOption: selectShowIndividualOption(state),
  freeSearchRecordset: selectBulkCompanySelectRecordset(state),
  piListIndices: selectListOfIndicesRecordSet(state),
  indexSelection: selectIndexSelection(state),
  listOfExchange: selectListOfExchange(state),
  exchangeSelection: selectExchangeSelection(state),
  aiPeerGroups: selectAIPeerGroup(state),
  aiPeerGroupSelection: selectAIPeerGroupSelection(state),
  listMarketCap: selectListMarketCap(state),
  marketCapSelection: selectMarketCapSelection(state),
  companyLocationSelection: selectCompanyLocationSelection(state),
  listRegeionAndCountries: selectListRegeionAndCountries(state),
  piListOfSectorsAndIndustries: selectPIListSectorsAndIndustries(state),
  listOfcompanySearchOptions: selectCompanySearchOptions(state),
  txtSaveCurrentList: selectTextSaveCurrentList(state),
  saveCurrentListButtonText: selectSaveCurrentListButtonText(state),
  companySingleSelection: selectCompanySingleSelection(state),
  txtMarketCapMinRange: selectTextMarketCapMinRange(state),
  txtMarketCapMaxRange: selectTextMarketCapMaxRange(state),
  invListRegeionAndCountries: selectInvListRegeionAndCountries(state),
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),
  // selection - company & investor search
  invCompCompanyPeerGroupSelection:
    SelectInvCompCompanyPeerGroupSelection(state),
  invCompInvestorPeerGroupSelection:
    SelectInvCompInvestorPeerGroupSelection(state),
  isResetCompanyPeerGroupSelection:
    SelectIsResetCompanyPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection:
    SelectIsResetInvestorPeerGroupSelection(state),

  ddlSpecificActivistDemands: SelectDdlSpecificActivistDemands(state),
  ddlSpecificActivistDemandsSelection:
    SelectDdlSpecificActivistDemandsSelection(state),
  activistDemandTypeSelection: SelectActivistDemandTypeSelection(state),
  ddlAlertOptionActivistDemandsSelection:
    SelectDdlAlertOptionActivistDemandsSelection(state),

    token: SelectDecodeToken(state),
    isEnabledButtonfor_subs_Activism: selectIsActivismButtonDisabled(state),
    isEnabledButtonfor_subs_ShortActivism: selectIsActivist_ShortsButtonDisabled(state),
    isEnabledButtonfor_subs_Voting: selectIsVotingButtonDisabled(state),
    isEnabledButtonfor_subs_Governance: selectIsGovernanceButtonDisabled(state),
    //default selection tree view
    listDefaultInvestorTypeAndSubtype: selectListDefaultInvestorTypeAndSubtype(state),
    lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
    defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
    defaultPiListSectorsAndIndustries: selectDefaultPiListSectorsAndIndustries(state),

    alert_cmp_search_id: selectAlert_cmp_search_id(state),
    alert_inv_search_id: selectAlert_inv_search_id(state),
});

const mapDispatchToProps = {
  // Title slice
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,

  // Filter - Tool Slice
  getDefaultPeerGroupDataReq,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  handleProponentGroupsearch,
  getAllMeetingTypeReq,
  handleMeetingTypeSelection,
  handleClearResult,
  handleIsInvCompDateChecked,
  handleSponsorSelection,
  handleGroupProponentSelection,
  handleStartInvCompDateSelection,
  handleEndInvCompDateSelection,
  handleIndividualProponentSelection,
  handleInvestorSearchSelectionInvComp,
  handleComapnySearchSelectionInvComp,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleResetInvestorComparatorTool,
  resolutionsByInvestorFilterReq,

  // Others - Tool Slice
  getResolutionsTypeIdByNameReq,

  // Filter - Company search selection
  handleCompanySearchOptionSelection,
  handleIndustrySelection,
  HandleFilterModel,
  handleCompanySelection,
  handleShowIndividualOption,
  handleShowGroupOption,
  handleBulkCompanySelection,
  piListOfIndices: piListOfIndicesReq,
  allListOfExchange: getListOfExchange,
  listAIPeerGroup: getAIPeersGroups,
  allCountriesAndRegions: getTreeRegionsAndCountries,
  listInvestorTypeAndSubtypeReq: listInvestorTypeAndSubtype,
  piListSectorsAndIndustries: getPIListSectorsAndIndustriesReq,
  getCompanySearchOptions,
  getInvestorSearchOptions,
  getCurrentShareholderReq,
  allIssuers: allIssuersReq,
  handleIndexSelectionChange,
  handleExchangeSelectionChange,
  handleAIPeerGroupSelection,
  handleMarketCapSelection,
  handleSearchInvestor: searchInvestorsReq,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  HandleTreeViewIndustry,
  handleSaveCurrentList,
  HandleTreeViewCompanyLocation,
  getAllCompanySearchSelection,
  ResetCompanySearchOptionSelection,
  handleCompanySearchUpdateReq,
  handleCompanyAndIndustry: searchCompanyAndIndustriesReq,
  handleCompanySingleSelection,
  handdleRun: handleRunReq,
  handleCompanySearchDeleteReq,

  // Filter - investor search selection
  HandleInvestorFilterModel,
  HandleTreeViewInvestorLocation,
  GetInvestorSearchSelection: getInvestorSearchSelectionReq,
  handleInvestorSelection,
  handleInvestorIsBulkUpload,
  handleBulkInvestorSelection,
  handleByShareholderOfCompany,
  getAllInvestorsFromShareholderOfCompany,
  HandleTreeViewListInvestorTypeAndSubtype,
  handleSaveInvestorCurrentList,
  handleInvestorSearchDeleteReq,
  handleInvestorSearchUpdateReq,
  handleInvestorSearchOptionSelection,
  handleReset,
  handleAumCategorySelection,
  getAumCategorylistReq,

  // My Alert - slice
  getActivismNewsAlertsReq,
  getActivismEventNewsAlertsReq,
  getListFilingGroupsReq,
  handleOnChangeDdlActivisamEventNews,
  handleOnChangeDdlActivisamShortEventNews,
  handleOnChangeDdlActivismNewsFillingAlert,
  handleOnChangeDdlSpecificNews,
  handleOnChangeDdlSpecificShortNews,
  getAlertOptionsAndSubOptionsReq,
  productAvaibleForCurrentUserReq,
  getDirectorTypeReq,
  getGovAmendemntCategoriesReq,

  // my Alert - general
  getExistingAlertsReq,
  handleOnChangeAlertName,
  handleOnChangeChkNotifiedMe,
  handleOnChangeisJustMyJIOAlertInbox,
  handleOnChangeRdoEmailTo,
  handleCancelEditingAlert,
  handleDeleteOptionAndSubOptionLink,
  getAlerModulAccessReq,
  handleDynamicbtnClick,
  handleOnChangeDynamicDropdown,
  handleOnChangeDynamicSubOption,
  handleOnChangeDdlSpecificActivistDemands,
  getTokenDecode,
  handleButtonAccess,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  handleResetAlertFilterIds
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyNewAlertContainer)
);
