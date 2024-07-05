import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DirectorSkillsAndAnalyticsTool from '../../../components/Tools/GovernanceTools/DirectorSkillsAndAnalytics/DirectorSkillsAndAnalyticsTool';
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
  handleOnChangeTenureFrom,
  handleOnChangeTenureTo,
  handleOnChangeAgeFrom,
  handleOnChangeAgeTo,
  handleOnChangeBoardFrom,
  handleOnChangeBoardTo,
  handleOnChangeOutputFieldChecked,
  handleOnChangeOutputFieldLevelDataChecked,
  handleOnChangeOutputFieldSkillsChecked,
  handleOnChangeCurrentDirectorChecked,
  handleOnChangeBasedDataChecked,
  getDirectorAnalysisDataReq,
  handleResetSearch,
} from './DirectorSkillsAndAnalyticsToolsSlice';
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

const DirectorSkillsAndAnalyticsToolContainer = ({
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
  handleResetSearch,
  handleResetLoader,
  ...props
}) => {
  useEffect(() => {
    async function fetchData() {
      await getDirectorSectorAndIndustrySearchDataReq();
    }
    fetchData();
  }, [getDirectorSectorAndIndustrySearchDataReq]);

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

  return (
    <ErrorBoundary>
      <DirectorSkillsAndAnalyticsTool
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
      />
    </ErrorBoundary>
  );
};

DirectorSkillsAndAnalyticsToolContainer.propTypes = {
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

DirectorSkillsAndAnalyticsToolContainer.defaultProps = {
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
  state.directoSkillsAndAnalytics.lstGenderSelection;
const selectDdlGenderOption = (state) =>
  state.directoSkillsAndAnalytics.ddlGenderOption;

const selectTenureFrom = (state) => state.directoSkillsAndAnalytics.tenureFrom;
const selectTenureTo = (state) => state.directoSkillsAndAnalytics.tenureTo;
const selectAgeFrom = (state) => state.directoSkillsAndAnalytics.ageFrom;
const selectAgeTo = (state) => state.directoSkillsAndAnalytics.ageTo;
const selectBoardFrom = (state) => state.directoSkillsAndAnalytics.boardFrom;
const selectBoardTo = (state) => state.directoSkillsAndAnalytics.boardTo;

const selectLstDirectoAppointmentData = (state) =>
  state.directoSkillsAndAnalytics.lstDirectoAppointmentData;

const selectisLoading = (state) => state.directoSkillsAndAnalytics.isLoading;

const selectDirectorData = (state) =>
  state.directoSkillsAndAnalytics.directorData;
const selectDirectorAnalysis = (state) =>
  state.directoSkillsAndAnalytics.directorAnalysis;

const selectdirectorLevelData = (state) =>
  state.directoSkillsAndAnalytics.directorLevelData;
const selectcompanyLevelData = (state) =>
  state.directoSkillsAndAnalytics.companyLevelData;
const selectindividualSkills = (state) =>
  state.directoSkillsAndAnalytics.individualSkills;
const selectgroupedSkills = (state) =>
  state.directoSkillsAndAnalytics.groupedSkills;

const selectcurrentDirectorYes = (state) =>
  state.directoSkillsAndAnalytics.currentDirectorYes;
const selectcurrentDirectorNo = (state) =>
  state.directoSkillsAndAnalytics.currentDirectorNo;

const selectLstDirectorAppointmentAnalysisData0 = (state) =>
  state.directoSkillsAndAnalytics.lstDirectorAppointmentAnalysisData0;
const selectLstGenderDiversityOfDirectorAppointment = (state) =>
  state.directoSkillsAndAnalytics.lstGenderDiversityOfDirectorAppointment;
const selectLstAvgDirectorAge = (state) =>
  state.directoSkillsAndAnalytics.lstAvgDirectorAge;
const selectLstAvgDirectorTenure = (state) =>
  state.directoSkillsAndAnalytics.lstAvgDirectorTenure;
const selectLstCompaniesWithFemaleDirector = (state) =>
  state.directoSkillsAndAnalytics.lstCompaniesWithFemaleDirector;
const selectLstSectorWithAvgFemaleDirector = (state) =>
  state.directoSkillsAndAnalytics.lstSectorWithAvgFemaleDirector;
const selectLstMktCapCategoryWithAvgFemaleDirector = (state) =>
  state.directoSkillsAndAnalytics.lstMktCapCategoryWithAvgFemaleDirector;
const selectLstMktCapCategoryGenderDiversity = (state) =>
  state.directoSkillsAndAnalytics.lstMktCapCategoryGenderDiversity;
const selectLstNoOfBoardWithMaleAndFemale = (state) =>
  state.directoSkillsAndAnalytics.lstNoOfBoardWithMaleAndFemale;
const selectLstChartKeys = (state) =>
  state.directoSkillsAndAnalytics.lstChartKeys;
const selectYearToData = (state) => state.directoSkillsAndAnalytics.yearToData;
const selectCurrentData = (state) =>
  state.directoSkillsAndAnalytics.currentData;
const selectLstNoOfBoardWithMaleAndFemale_Org = (state) =>
  state.directoSkillsAndAnalytics.lstNoOfBoardWithMaleAndFemale_Org;
const selectLstCompaniesWithFemaleDirector_Org = (state) =>
  state.directoSkillsAndAnalytics.lstCompaniesWithFemaleDirector_Org;
const selectLstAllData = (state) => state.directoSkillsAndAnalytics.lstAllData;
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
  ddlGenderOption: selectDdlGenderOption(state),

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

  directorLevelData: selectdirectorLevelData(state),
  companyLevelData: selectcompanyLevelData(state),
  individualSkills: selectindividualSkills(state),
  groupedSkills: selectgroupedSkills(state),

  currentDirectorYes: selectcurrentDirectorYes(state),
  currentDirectorNo: selectcurrentDirectorNo(state),

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
  handleOnChangeTenureFrom,
  handleOnChangeTenureTo,
  handleOnChangeAgeFrom,
  handleOnChangeAgeTo,
  handleOnChangeBoardFrom,
  handleOnChangeBoardTo,
  getProcedureRunningEstimateTimeReq,
  handleOnChangeOutputFieldChecked,
  handleOnChangeOutputFieldLevelDataChecked,
  handleOnChangeOutputFieldSkillsChecked,
  handleOnChangeCurrentDirectorChecked,
  handleOnChangeBasedDataChecked,
  getDirectorAnalysisDataReq,
  handleResetSearch,
  handleResetLoader,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectorSkillsAndAnalyticsToolContainer);
