import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import DirectorDataAndAnalyticsTool from '../../../components/Tools/GovernanceTools/DirectorDataAndAnalytics/DirectorDataAndAnalyticsTool';
import saveSearchConst from '../../../constants/SaveSearchToolConstants';
import {
  getDefaultPeerGroupDataReq,
  handleCompanyChangePeerGrp,
  getDirectorSectorAndIndustrySearchDataReq,
  handleOnChangeSectorAndIndustry,
  getTokenDecode,
  handleComapnySearchSelectionInvComp,
  handleClearPeerGroupCompanySelection,
  handleClearPeerGroupInvestorSelection,
} from '../ToolsSlice';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
} from '../../General/TitleSlice';
import {
  getDirectoDataAndAnalyticsDataReq,
  handleOnChangeGenderDdl,
  handleOnChangeEthnicityDdl,
  handleOnChangeTenureFrom,
  handleOnChangeTenureTo,
  handleOnChangeAgeFrom,
  handleOnChangeAgeTo,
  handleOnChangeBoardFrom,
  handleOnChangeBoardTo,
  handleOnChangeOutputFieldChecked,
  handleOnChangeBasedDataChecked,
  getDirectorAnalysisDataReq,
  getDDLEthnicityDataReq,
  handleResetSearch,
  handleUpdateDataDirectorDataAndAnalyticsToolFilters,
} from './DirectorDataAndAnalyticsToolsSlice';
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
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
} from '../../DashboardContainer/DashboardSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { GOVERNANCE } from '../../../constants/ProductConstants';
import { GetPageAccess } from '../../../utils/tools-util';
import {
  // save search
  userSearchFilter_CreateReq,
  userSearchFilter_UpdateReq,
  userSearchFilter_DeleteReq,
  userSearchFilter_GetReq,
  handleSaveSearchTextboxValue,
  handleShow_SaveThisSearch_Modal,
  handleSetSaveSearchedDDLSelection,
} from '../General/SaveSearchToolSlice';

const DirectorDataAnalyticsToolContainer = ({
  token,
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
  getDirectorSectorAndIndustrySearchDataReq,
  getDirectoDataAndAnalyticsDataReq,
  getProcedureRunningEstimateTimeReq,
  getDirectorAnalysisDataReq,
  getDDLEthnicityDataReq,
  handleResetSearch,
  handleResetLoader,
  // save search
  saveSearchTextboxValue,
  isShow_SaveThisSearch_Modal,
  saveSearch_list,
  saveSearchDDLList,
  saveSearchedDDLSelection,
  ...props
}) => {
  useEffect(() => {
    async function fetchData() {
      await getDirectorSectorAndIndustrySearchDataReq();
    }
    fetchData();
  }, [getDirectorSectorAndIndustrySearchDataReq]);

  useEffect(() => {
    getDDLEthnicityDataReq();
  }, [getDDLEthnicityDataReq]);

  useEffect(() => {
    let validation = false;
    let pageAccess = false;
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
        inve: investorSearchOptionsSelection,
      };
      getDefaultPeerGroupDataReq(optionData);
    }
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, GOVERNANCE);
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getData();
    }
    prepAccess();
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
    getDirectorSectorAndIndustrySearchDataReq,
  ]);

  // #region Saved search

  useEffect(() => {
    props.userSearchFilter_GetReq({
      filter_type_id: saveSearchConst.DIRECTORDATAANDANALYTICS_TOOL,
    });
  }, []);

  const onSavedSearches_btnApply = useCallback(async () => {
    const data = saveSearch_list.filter(
      (x) => x.filter_id === saveSearchedDDLSelection.value
    );
    if (data.length > 0) {
      const filter_definition = JSON.parse(data[0].filter_definition);
      const cmp_search_id = filter_definition.companySearchId;
      await props.handleUpdateDataDirectorDataAndAnalyticsToolFilters(
        filter_definition
      );
      async function get_cmpData() {
        if (cmp_search_id !== null && props.getAllCompanySearchSelection) {
          const cmp_data = await props.getAllCompanySearchSelection(
            cmp_search_id
          );
          const obj = {
            value: cmp_data.payload.company_search[0].company_search_id,
            label: cmp_data.payload.company_search[0].Name,
            isSaved: cmp_data.payload.company_search[0].is_saved,
          };
          await props.handleComapnySearchSelectionInvComp(obj);
        } else {
          props.ResetCompanySearchOptionSelection();
          props.handleResetCompnaySelections();
        }
      }
      get_cmpData();
    }
  }, [props]);

  function filterDataObj() {
    const data = {
      lstGenderSelection: props.lstGenderSelection,
      lstEthnicitySelection: props.lstEthnicitySelection,
      tenureFrom: props.tenureFrom !== undefined ? props.tenureFrom : null,
      tenureTo: props.tenureTo !== undefined ? props.tenureTo : null,
      boardFrom: props.boardFrom !== undefined ? props.boardFrom : null,
      boardTo: props.boardTo !== undefined ? props.boardTo : null,
      ageFrom: props.ageFrom !== undefined ? props.ageFrom : null,
      ageTo: props.ageTo !== undefined ? props.ageTo : null,
      directorAnalysis: props.directorAnalysis,
      directorData: props.directorData,
      companySearchId:
        companySearchOptionSelection !== undefined
          ? companySearchOptionSelection.value
          : null,
    };
    return data;
  }
  const onSavedSearches_Create = useCallback(async () => {
    const data = filterDataObj();
    const obj = {
      filter_name: saveSearchTextboxValue,
      filter_definition: JSON.stringify(data),
      filter_type_id: saveSearchConst.DIRECTORDATAANDANALYTICS_TOOL,
      privacy: 1,
      permission: 1,
    };
    await props.userSearchFilter_CreateReq(obj);
  }, [props]);

  const onSavedSearches_Update = useCallback(async () => {
    const data = filterDataObj();
    if (saveSearchedDDLSelection) {
      const obj = {
        filter_id: saveSearchedDDLSelection.value,
        filter_name: saveSearchTextboxValue,
        filter_definition: JSON.stringify(data),
        filter_type_id: saveSearchConst.DIRECTORDATAANDANALYTICS_TOOL,
        privacy: 1,
        permission: 1,
      };
      await props.userSearchFilter_UpdateReq(obj);
    }
  }, [props]);

  const onSavedSearches_btnDelete = useCallback(async () => {
    const data = {
      filter_id:
        saveSearchedDDLSelection !== null && saveSearchedDDLSelection.value,
      filter_type_id: saveSearchConst.DIRECTORDATAANDANALYTICS_TOOL,
    };
    await props.userSearchFilter_DeleteReq(data);
  }, [props]);

  // #endregion

  return (
    <ErrorBoundary>
      <DirectorDataAndAnalyticsTool
        {...props}
        companySearchOptionSelection={companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        getDirectoDataAndAnalyticsDataReq={getDirectoDataAndAnalyticsDataReq}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        getDirectorAnalysisDataReq={getDirectorAnalysisDataReq}
        handleResetSearch={handleResetSearch}
        handleResetLoader={handleResetLoader}
        // save search
        onSavedSearches_btnApply={onSavedSearches_btnApply}
        onSavedSearches_btnDelete={onSavedSearches_btnDelete}
        onSavedSearches_Create={onSavedSearches_Create}
        onSavedSearches_Update={onSavedSearches_Update}
        isShow_SaveThisSearch_Modal={isShow_SaveThisSearch_Modal}
        saveSearchTextboxValue={saveSearchTextboxValue}
        saveSearch_list={saveSearch_list}
        saveSearchDDLList={saveSearchDDLList}
        saveSearchedDDLSelection={saveSearchedDDLSelection}
      />
    </ErrorBoundary>
  );
};

DirectorDataAnalyticsToolContainer.propTypes = {
  getDefaultPeerGroupDataReq: PropTypes.func,
  companySearchOptionSelection: PropTypes.object,
  investorSearchOptionsSelection: PropTypes.object,
  getInvestorSearchOptions: PropTypes.func,
  getCompanySearchOptions: PropTypes.func,
  piListOfIndices: PropTypes.func,
  allListOfExchange: PropTypes.func,
  listAIPeerGroup: PropTypes.func,
  allCountriesAndRegions: PropTypes.func,
  listInvestorTypeAndSubtypeReq: PropTypes.func,
  getCurrentShareholderReq: PropTypes.func,
  piListSectorsAndIndustries: PropTypes.func,
  procedureRunningEstimateTime: PropTypes.number,
  handleCompanyChangePeerGrp: PropTypes.func,
};

DirectorDataAnalyticsToolContainer.defaultProps = {
  getDefaultPeerGroupDataReq: () => null,
  getInvestorSearchOptions: () => null,
  getCompanySearchOptions: () => null,
  piListOfIndices: () => null,
  allListOfExchange: () => null,
  listAIPeerGroup: () => null,
  allCountriesAndRegions: () => null,
  getCurrentShareholderReq: () => null,
  piListSectorsAndIndustries: () => null,
  listInvestorTypeAndSubtypeReq: () => null,
  procedureRunningEstimateTime: undefined,
  companySearchOptionSelection: undefined,
  investorSearchOptionsSelection: undefined,
};

// #region save search

const selectsaveSearchTextboxValue = (state) =>
  state.saveSearchFilter.saveSearchTextboxValue;
const selectisShow_SaveThisSearch_Modal = (state) =>
  state.saveSearchFilter.isShow_SaveThisSearch_Modal;
const selectsaveSearch_list = (state) => state.saveSearchFilter.saveSearch_list;
const selectsaveSearchDDLList = (state) =>
  state.saveSearchFilter.saveSearchDDLList;
const selectsaveSearchedDDLSelection = (state) =>
  state.saveSearchFilter.saveSearchedDDLSelection;

//#endreion
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

const selectFilterByCompanySelection = (state) =>
  state.tools.filterByCompanySelection;
//
const selectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;

const selectLstDdlDataAndAnalytics = (state) =>
  state.tools.lstDdlDataAndAnalytics;
const selectDdlSectorAndIndustrySelection = (state) =>
  state.tools.ddlSectorAndIndustrySelection;

const selectLstGenderSelection = (state) =>
  state.directoDataAndAnalytics.lstGenderSelection;
const selectLstEthnicitySelection = (state) =>
  state.directoDataAndAnalytics.lstEthnicitySelection;

const selectDdlGenderOption = (state) =>
  state.directoDataAndAnalytics.ddlGenderOption;
const selectDdlEthnicityOption = (state) =>
  state.directoDataAndAnalytics.ddlEthnicityOption;

const selectTenureFrom = (state) => state.directoDataAndAnalytics.tenureFrom;
const selectTenureTo = (state) => state.directoDataAndAnalytics.tenureTo;
const selectAgeFrom = (state) => state.directoDataAndAnalytics.ageFrom;
const selectAgeTo = (state) => state.directoDataAndAnalytics.ageTo;
const selectBoardFrom = (state) => state.directoDataAndAnalytics.boardFrom;
const selectBoardTo = (state) => state.directoDataAndAnalytics.boardTo;

const selectLstDirectoAppointmentData = (state) =>
  state.directoDataAndAnalytics.lstDirectoAppointmentData;

const selectisLoading = (state) => state.directoDataAndAnalytics.isLoading;

const selectDirectorData = (state) =>
  state.directoDataAndAnalytics.directorData;
const selectDirectorAnalysis = (state) =>
  state.directoDataAndAnalytics.directorAnalysis;

const selectLstDirectorAppointmentAnalysisData0 = (state) =>
  state.directoDataAndAnalytics.lstDirectorAppointmentAnalysisData0;
const selectLstGenderDiversityOfDirectorAppointment = (state) =>
  state.directoDataAndAnalytics.lstGenderDiversityOfDirectorAppointment;
const selectLstAvgDirectorAge = (state) =>
  state.directoDataAndAnalytics.lstAvgDirectorAge;
const selectLstAvgDirectorTenure = (state) =>
  state.directoDataAndAnalytics.lstAvgDirectorTenure;
const selectLstCompaniesWithFemaleDirector = (state) =>
  state.directoDataAndAnalytics.lstCompaniesWithFemaleDirector;
const selectLstSectorWithAvgFemaleDirector = (state) =>
  state.directoDataAndAnalytics.lstSectorWithAvgFemaleDirector;
const selectLstMktCapCategoryWithAvgFemaleDirector = (state) =>
  state.directoDataAndAnalytics.lstMktCapCategoryWithAvgFemaleDirector;
const selectLstMktCapCategoryGenderDiversity = (state) =>
  state.directoDataAndAnalytics.lstMktCapCategoryGenderDiversity;
const selectLstNoOfBoardWithMaleAndFemale = (state) =>
  state.directoDataAndAnalytics.lstNoOfBoardWithMaleAndFemale;
const selectLstChartKeys = (state) =>
  state.directoDataAndAnalytics.lstChartKeys;
const selectYearToData = (state) => state.directoDataAndAnalytics.yearToData;
const selectCurrentData = (state) => state.directoDataAndAnalytics.currentData;
const selectLstNoOfBoardWithMaleAndFemale_Org = (state) =>
  state.directoDataAndAnalytics.lstNoOfBoardWithMaleAndFemale_Org;
const selectLstCompaniesWithFemaleDirector_Org = (state) =>
  state.directoDataAndAnalytics.lstCompaniesWithFemaleDirector_Org;
const selectLstAllData = (state) => state.directoDataAndAnalytics.lstAllData;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
//default selection tree view
const selectListDefaultInvestorTypeAndSubtype = (state) =>
  state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) =>
  state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) =>
  state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) =>
  state.dashboard.defaultPiListSectorsAndIndustries;

const mapStateToProps = (state) => ({
  // #region save search

  saveSearchTextboxValue: selectsaveSearchTextboxValue(state),
  isShow_SaveThisSearch_Modal: selectisShow_SaveThisSearch_Modal(state),
  saveSearch_list: selectsaveSearch_list(state),
  saveSearchDDLList: selectsaveSearchDDLList(state),
  saveSearchedDDLSelection: selectsaveSearchedDDLSelection(state),

  //#endreion
  token: SelectDecodeToken(state),
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
  lstDdlDataAndAnalytics: selectLstDdlDataAndAnalytics(state),
  ddlSectorAndIndustrySelection: selectDdlSectorAndIndustrySelection(state),
  lstGenderSelection: selectLstGenderSelection(state),
  lstEthnicitySelection: selectLstEthnicitySelection(state),
  ddlGenderOption: selectDdlGenderOption(state),
  ddlEthnicityOption: selectDdlEthnicityOption(state),

  tenureFrom: selectTenureFrom(state),
  tenureTo: selectTenureTo(state),
  ageFrom: selectAgeFrom(state),
  ageTo: selectAgeTo(state),
  boardFrom: selectBoardFrom(state),
  boardTo: selectBoardTo(state),

  lstDirectoAppointmentData: selectLstDirectoAppointmentData(state),

  filterByCompanySelection: selectFilterByCompanySelection(state),
  procedureRunningEstimateTime: selectProcedureRunningEstimateTime(state),
  isLoading: selectisLoading(state),

  directorData: selectDirectorData(state),
  directorAnalysis: selectDirectorAnalysis(state),

  lstDirectorAppointmentAnalysisData0:
    selectLstDirectorAppointmentAnalysisData0(state),
  lstGenderDiversityOfDirectorAppointment:
    selectLstGenderDiversityOfDirectorAppointment(state),
  lstAvgDirectorAge: selectLstAvgDirectorAge(state),
  lstAvgDirectorTenure: selectLstAvgDirectorTenure(state),
  lstCompaniesWithFemaleDirector: selectLstCompaniesWithFemaleDirector(state),
  lstSectorWithAvgFemaleDirector: selectLstSectorWithAvgFemaleDirector(state),
  lstMktCapCategoryWithAvgFemaleDirector:
    selectLstMktCapCategoryWithAvgFemaleDirector(state),
  lstMktCapCategoryGenderDiversity:
    selectLstMktCapCategoryGenderDiversity(state),
  lstNoOfBoardWithMaleAndFemale: selectLstNoOfBoardWithMaleAndFemale(state),
  lstNoOfBoardWithMaleAndFemale_Org:
    selectLstNoOfBoardWithMaleAndFemale_Org(state),
  lstCompaniesWithFemaleDirector_Org:
    selectLstCompaniesWithFemaleDirector_Org(state),
  lstChartKeys: selectLstChartKeys(state),
  yearToData: selectYearToData(state),
  currentData: selectCurrentData(state),
  lstAllData: selectLstAllData(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state),
  //default selection tree view
  listDefaultInvestorTypeAndSubtype:
    selectListDefaultInvestorTypeAndSubtype(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries:
    selectDefaultPiListSectorsAndIndustries(state),
});

const mapDispatchToProps = {
  // save search
  userSearchFilter_CreateReq,
  userSearchFilter_UpdateReq,
  userSearchFilter_DeleteReq,
  userSearchFilter_GetReq,
  handleSaveSearchTextboxValue,
  handleShow_SaveThisSearch_Modal,
  handleSetSaveSearchedDDLSelection,
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
  handleCompanyChangePeerGrp,

  // toolsslice
  getDefaultPeerGroupDataReq,
  getDirectorSectorAndIndustrySearchDataReq,
  handleOnChangeSectorAndIndustry,
  handleComapnySearchSelectionInvComp,
  handleClearPeerGroupCompanySelection,
  handleClearPeerGroupInvestorSelection,
  ResetInvestorSearchOptionSelection,

  // directo slice
  getDirectoDataAndAnalyticsDataReq,
  handleOnChangeGenderDdl,
  handleOnChangeEthnicityDdl,
  handleOnChangeTenureFrom,
  handleOnChangeTenureTo,
  handleOnChangeAgeFrom,
  handleOnChangeAgeTo,
  handleOnChangeBoardFrom,
  handleOnChangeBoardTo,
  getProcedureRunningEstimateTimeReq,
  handleOnChangeOutputFieldChecked,
  handleOnChangeBasedDataChecked,
  getDirectorAnalysisDataReq,
  getDDLEthnicityDataReq,
  handleResetSearch,
  handleUpdateDataDirectorDataAndAnalyticsToolFilters,
  handleResetLoader,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectorDataAnalyticsToolContainer);
