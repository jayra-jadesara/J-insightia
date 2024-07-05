import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Preferences from '../../components/Preferences/Preferences';
import {
  handleInvestorPeerGroupSelectionChange,
  handleCompanyPeerGroupSelectionChange,
  validateOldPasswordHashReq,
  handleChangePasswordReq,
  handleEmailPreferences,
  getPreferencesdata,
  handleResetLoading,
  handleCompanyWidgetSelection,
  handledInvestorWidgetSelection,
  //
  getUserDashboardPreferencesReq,
  handleResetCompanyWidgetSelection,
  handleResetInvestorWidgetSelection
} from './PreferencesSlice';
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
} from '../ToolsContainer/ToolsSlice';
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
  resetDashboardWidgetCompanySearchReq,
  getUserDashboardReq,
  ResetInvestorSearchOptionSelection,
  resetDashboardWidgetInvestorSearchReq,

  getAumCategorylistReq,
  handleAumCategorySelection,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections
} from '../DashboardContainer/DashboardSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const PreferencesContainer = ({
  getPreferencesdata,
  // company
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
  getUserDashboardPreferencesReq,
  handleCompanyWidgetSelection,
  handledInvestorWidgetSelection,
  cmpWidgetValue,
  // investorSearchOptionsSelection,
  // companySearchOptionSelection,
  getAumCategorylistReq,
  ResetCompanySearchOptionSelection,
  handleResetCompnaySelections,
   ...props
  }) => {
  useEffect(() => {
    const abortController = new AbortController();
    getPreferencesdata();
    getUserDashboardPreferencesReq();
    return function cleanup() {
      abortController.abort();
    };
  }, [getPreferencesdata, getUserDashboardPreferencesReq]);

  useEffect(() => {
    function getData() {
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
    investorSearchOptionsSelection
  ]);

  return (
    <ErrorBoundary>
      <Preferences
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        companySearchOptionSelection={companySearchOptionSelection}
        handledInvestorWidgetSelection={handledInvestorWidgetSelection}
        handleCompanyWidgetSelection={handleCompanyWidgetSelection}
        cmpWidgetValue={cmpWidgetValue}
        ResetCompanySearchOptionSelection={ResetCompanySearchOptionSelection}
        handleResetCompnaySelections={handleResetCompnaySelections}
        {...props}
      />
    </ErrorBoundary>
  );
};

PreferencesContainer.propTypes = {
  getPreferencesdata: PropTypes.func.isRequired
};

const SelectCompanyPeerGroupDataList = (state) =>
  state.preferences.companyPeerGroupDataList;
const SelectCompanyPeerGroupSelection = (state) =>
  state.preferences.companyPeerGroupSelection;
const SelectInvestorPeerGroupDataList = (state) =>
  state.preferences.investorPeerGroupDataList;
const SelectInvestorPeerGroupSelection = (state) =>
  state.preferences.investorPeerGroupSelection;
const SelectValidateOldPasswod = (state) =>
  state.preferences.validateOldPasswod;
const SelectEmailListItems = (state) => state.preferences.emailListItems;
const SelectPreferencesIsLoading = (state) =>
  state.preferences.preferencesIsLoading;

  // selection - company & investor search
const SelectInvCompCompanyPeerGroupSelection = (state) =>
state.tools.invCompCompanyPeerGroupSelection;
const SelectInvCompInvestorPeerGroupSelection = (state) =>
state.tools.invCompInvestorPeerGroupSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) =>
state.tools.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) =>
state.tools.isResetInvestorPeerGroupSelection;
// AUM ($bn).
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) => state.dashboard.aumCategorySelection;

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

  const selectLstWidgetSelections = (state) => state.preferences.lstWidgetSelections;
  const selectDdlWidgetSelections = (state) => state.preferences.ddlWidgetSelections;
  const selectCmpWidgetValue = (state) => state.preferences.cmpWidgetValue;
  const selectInvWidgetValue = (state) => state.preferences.invWidgetValue;
  //default selection tree view
const selectListDefaultInvestorTypeAndSubtype = (state) => state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) => state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) => state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) => state.dashboard.defaultPiListSectorsAndIndustries;

const mapStateToProps = (state) => ({
  companyPeerGroupDataList: SelectCompanyPeerGroupDataList(state),
  companyPeerGroupSelection: SelectCompanyPeerGroupSelection(state),
  investorPeerGroupDataList: SelectInvestorPeerGroupDataList(state),
  investorPeerGroupSelection: SelectInvestorPeerGroupSelection(state),
  validateOldPasswod: SelectValidateOldPasswod(state),
  emailListItems: SelectEmailListItems(state),
  preferencesIsLoading: SelectPreferencesIsLoading(state),
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

   // selection - company & investor search
   invCompCompanyPeerGroupSelection:
     SelectInvCompCompanyPeerGroupSelection(state),
   invCompInvestorPeerGroupSelection:
     SelectInvCompInvestorPeerGroupSelection(state),
   isResetCompanyPeerGroupSelection:
     SelectIsResetCompanyPeerGroupSelection(state),
   isResetInvestorPeerGroupSelection:
     SelectIsResetInvestorPeerGroupSelection(state),

     lstWidgetSelections: selectLstWidgetSelections(state),
     ddlWidgetSelections: selectDdlWidgetSelections(state),
     cmpWidgetValue: selectCmpWidgetValue(state),
     invWidgetValue: selectInvWidgetValue(state),

    // AUM ($bn).
   listAumCategory: selectListAumCategory(state),
   aumCategorySelection: selectAumCategorySelection(state),
   invListRegeionAndCountries: selectInvListRegeionAndCountries(state),
   invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
   invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),
    //default selection tree view
    listDefaultInvestorTypeAndSubtype: selectListDefaultInvestorTypeAndSubtype(state),
    lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
    defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
    defaultPiListSectorsAndIndustries: selectDefaultPiListSectorsAndIndustries(state),
});

const mapDispatchToProps = {
  handleInvestorPeerGroupSelectionChange,
  handleCompanyPeerGroupSelectionChange,
  validateOldPasswordHashReq,
  handleChangePasswordReq,
  handleEmailPreferences,
  getPreferencesdata, // getdata
  handleResetLoading,
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

  //tool slice
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
  getResolutionsTypeIdByNameReq,
  getUserDashboardPreferencesReq,
  handleCompanyWidgetSelection,
  handledInvestorWidgetSelection,
  resetDashboardWidgetCompanySearchReq,
  getUserDashboardReq,
  ResetInvestorSearchOptionSelection,
  resetDashboardWidgetInvestorSearchReq,
  handleResetCompanyWidgetSelection,
  handleResetInvestorWidgetSelection,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreferencesContainer)
);
