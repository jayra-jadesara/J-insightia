import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CompanyGovernanceDataAndAnalyticsTool from '../../../components/Tools/GovernanceTools/CompanyGovernanceDataAndAnalyticsTool';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
} from '../../General/TitleSlice';
import saveSearchConst from '../../../constants/SaveSearchToolConstants';
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
  getResolutionsTypeIdByNameReq,
  getTokenDecode,
} from '../ToolsSlice';
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
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
} from '../../DashboardContainer/DashboardSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

import {
  handleStateOfIncorporationSelection,
  handleBoardSizeMin,
  handleBoardSizeMax,
  handlePoisonPillOwnershipMin,
  handlePoisonPillOwnershipMax,
  handlePoisonPillExpiryDateMin,
  handlePoisonPillExpiryDateMax,
  handlePoisonPillExpiryDateChecked,
  handleAvgDirectorTenureMin,
  handleAvgDirectorTenureMax,
  handleAvgAgeMin,
  handleAvgAgeMax,
  handleDirectorTerm,
  handleCurrentFemaleDirectorMin,
  handleCurrentFemaleDirectorMax,
  getProvisionsReq,
  getActivistNomineeOnBoardReq,
  getStateOfIncorporationList,
  handleTreeViewProvisionHas,
  handleTreeViewProvisionHasNot,
  handleActivistNomineeOnBoard,
  getGovernanceAdvSearchReq,
  handleResetOnSearchClick,
  handleResetCompanyGovernanceAndAnalyticsTool,
  handleUpdateDataCompanyGovernanceAndAnalyticsToolsFilters,
} from '../Governance/CompanyGovernanceAndAnalyticsToolsSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { GOVERNANCE } from '../../../constants/ProductConstants';
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

const CompanyGovernanceAndAnalyticsToolsContainer = ({
  token,
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
  getProvisionsReq,
  getActivistNomineeOnBoardReq,
  getStateOfIncorporationList,
  isLoadingGovernanceAdvSearch,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  trialUserDisableDownload,
  handleResetCompanyGovernanceAndAnalyticsTool,
  // save search
  saveSearchTextboxValue,
  isShow_SaveThisSearch_Modal,
  saveSearch_list,
  saveSearchDDLList,
  saveSearchedDDLSelection,
  ...props
}) => {
  useEffect(() => {
    handleResetCompanyGovernanceAndAnalyticsTool();
  }, [handleResetCompanyGovernanceAndAnalyticsTool]);

  useEffect(() => {
    async function getNewsAccess() {
      getAllMeetingTypeReq();
      getAllIndividualProponentReq();
      getAllGroupProponentReq();
    }
    getNewsAccess();
  }, [
    getAllMeetingTypeReq,
    getAllIndividualProponentReq,
    getAllGroupProponentReq,
  ]);

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
  ]);

  useEffect(() => {
    getProvisionsReq();
    getActivistNomineeOnBoardReq();
    getStateOfIncorporationList();
  }, [
    getProvisionsReq,
    getActivistNomineeOnBoardReq,
    getStateOfIncorporationList,
  ]);

  // #region Saved search

  useEffect(() => {
    props.userSearchFilter_GetReq({
      filter_type_id: saveSearchConst.COMPANYGOVERNANCEDATAANDANALYTICS_TOOL,
    });
  }, []);

  const onSavedSearches_btnApply = useCallback(async () => {
    const data = saveSearch_list.filter(
      (x) => x.filter_id === saveSearchedDDLSelection.value
    );
    if (data.length > 0) {
      const filter_definition = JSON.parse(data[0].filter_definition);
      const cmp_search_id = filter_definition.companySearchId;
      await props.handleUpdateDataCompanyGovernanceAndAnalyticsToolsFilters(
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
    const depthDDLprovisionSelectionHas = props.provisionSelectionHas.map(
      (x) => ({
        _depth: x._depth !== undefined ? x._depth : 0,
        label: x.label,
      })
    );
    const depthDDLprovisionSelectionHasNot = props.provisionSelectionHasNot.map(
      (x) => ({
        _depth: x._depth !== undefined ? x._depth : 0,
        label: x.label,
      })
    );

    const data = {
      companySearchId:
        companySearchOptionSelection !== undefined
          ? companySearchOptionSelection.value
          : null,
      stateOfIncorporationSelection: props.stateOfIncorporationSelection,
      boardSizeMin: props.boardSizeMin,
      boardSizeMax: props.boardSizeMax,
      poisonPillOwnershipMin: props.poisonPillOwnershipMin,
      poisonPillOwnershipMax: props.poisonPillOwnershipMax,
      poisonPillExpiryDateChecked: props.poisonPillExpiryDateChecked,
      poisonPillExpiryDateMin: props.poisonPillExpiryDateChecked
        ? Date.parse(props.poisonPillExpiryDateMin)
        : '',
      poisonPillExpiryDateMax: props.poisonPillExpiryDateChecked
        ? Date.parse(props.poisonPillExpiryDateMax)
        : '',
      avgDirectorTenureMin: props.avgDirectorTenureMin,
      avgDirectorTenureMax: props.avgDirectorTenureMax,
      avgAgeMin: props.avgAgeMin,
      avgAgeMax: props.avgAgeMax,
      directorTerm: props.directorTerm,
      currentFemaleDirectorMin: props.currentFemaleDirectorMin,
      currentFemaleDirectorMax: props.currentFemaleDirectorMax,
      activistNomineeOnBoardSelection: props.activistNomineeOnBoardSelection,
      provisionSelectionHas: depthDDLprovisionSelectionHas,
      provisionSelectionHasNot: depthDDLprovisionSelectionHasNot,
    };
    return data;
  }
  const onSavedSearches_Create = useCallback(async () => {
    const data = filterDataObj();
    const obj = {
      filter_name: saveSearchTextboxValue,
      filter_definition: JSON.stringify(data),
      filter_type_id: saveSearchConst.COMPANYGOVERNANCEDATAANDANALYTICS_TOOL,
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
        filter_type_id: saveSearchConst.COMPANYGOVERNANCEDATAANDANALYTICS_TOOL,
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
      filter_type_id: saveSearchConst.COMPANYGOVERNANCEDATAANDANALYTICS_TOOL,
    };
    await props.userSearchFilter_DeleteReq(data);
  }, [props]);

  // #endregion

  return (
    <ErrorBoundary>
      <CompanyGovernanceDataAndAnalyticsTool
        {...props}
        companySearchOptionSelection={companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        getProvisionsReq={getProvisionsReq}
        getActivistNomineeOnBoardReq={getActivistNomineeOnBoardReq}
        getStateOfIncorporationList={getStateOfIncorporationList}
        isLoadingGovernanceAdvSearch={isLoadingGovernanceAdvSearch}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        trialUserDisableDownload={trialUserDisableDownload}
        handleResetCompanyGovernanceAndAnalyticsTool={
          handleResetCompanyGovernanceAndAnalyticsTool
        }
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
// filter
const SelectLstSponsor = (state) => state.tools.lstSponsor;
const SelectSponsorSelection = (state) => state.tools.sponsorSelection;
const SelectLstMeetingTypes = (state) => state.tools.lstMeetingTypes;
const SelectMeetingTypeSelection = (state) => state.tools.meetingTypeSelection;
const SelectLstIndividualProponent = (state) =>
  state.tools.lstIndividualProponent;
const SelectIndividualProponentSelection = (state) =>
  state.tools.individualProponentSelection;
const SelectLstGroupProponent = (state) => state.tools.lstGroupProponent;
const SelectGroupProponentSelection = (state) =>
  state.tools.groupProponentSelection;
const SelectStartInvCompDate = (state) => state.tools.startInvCompDate;
const SelectEndInvCompDate = (state) => state.tools.endInvCompDate;
const SelectIsInvCompDateChecked = (state) => state.tools.isInvCompDateChecked;
const SelectIsProponentGroup = (state) => state.tools.isProponentGroup;

// Governance Filter
const SelectStateOfIncorporationSelection = (state) =>
  state.companyGovernance.stateOfIncorporationSelection;
const SelectLstStateOfIncorporationSelection = (state) =>
  state.companyGovernance.lstStateOfIncorporationSelection;
const SelectBoardSizeMin = (state) => state.companyGovernance.boardSizeMin;
const SelectBoardSizeMax = (state) => state.companyGovernance.boardSizeMax;
const SelectPoisonPillOwnershipMin = (state) =>
  state.companyGovernance.poisonPillOwnershipMin;
const SelectPoisonPillOwnershipMax = (state) =>
  state.companyGovernance.poisonPillOwnershipMax;
const SelectPoisonPillExpiryDateMin = (state) =>
  state.companyGovernance.poisonPillExpiryDateMin;
const SelectPoisonPillExpiryDateMax = (state) =>
  state.companyGovernance.poisonPillExpiryDateMax;
const SelectPoisonPillExpiryDateChecked = (state) =>
  state.companyGovernance.poisonPillExpiryDateChecked;
const SelectAvgDirectorTenureMin = (state) =>
  state.companyGovernance.avgDirectorTenureMin;
const SelectAvgDirectorTenureMax = (state) =>
  state.companyGovernance.avgDirectorTenureMax;
const SelectAvgAgeMin = (state) => state.companyGovernance.avgAgeMin;
const SelectAvgAgeMax = (state) => state.companyGovernance.avgAgeMax;
const SelectDirectorTerm = (state) => state.companyGovernance.directorTerm;
const SelectCurrentFemaleDirectorMin = (state) =>
  state.companyGovernance.currentFemaleDirectorMin;
const SelectCurrentFemaleDirectorMax = (state) =>
  state.companyGovernance.currentFemaleDirectorMax;
const SelectListProvisionHas = (state) =>
  state.companyGovernance.listProvisionHas;
const SelectListProvisionHasNot = (state) =>
  state.companyGovernance.listProvisionHasNot;
const SelectProvisionSelectionHas = (state) =>
  state.companyGovernance.provisionSelectionHas;
const SelectProvisionSelectionHasNot = (state) =>
  state.companyGovernance.provisionSelectionHasNot;
const SelectLstActivistNomineeOnBoard = (state) =>
  state.companyGovernance.lstActivistNomineeOnBoard;
const SelectActivistNomineeOnBoardSelection = (state) =>
  state.companyGovernance.activistNomineeOnBoardSelection;
const SelectionGovernanceAdvSearch = (state) =>
  state.companyGovernance.governanceAdvSearch;
const SelectIsLoadingGovernanceAdvSearch = (state) =>
  state.companyGovernance.isLoadingGovernanceAdvSearch;

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
  // Tools - General
  selectedInvestorDetailsProposalTypeId:
    SelectSelectedInvestorDetailsProposalTypeId(state),
  selectedInvestorDetailsProposalSubLevelTypeId:
    SelectSelectedInvestorDetailsProposalSubLevelTypeId(state),
  selectedInvestorDetailsProposalTopLevelTypeId:
    SelectSelectedInvestorDetailsProposalTopLevelTypeId(state),

  // filter
  lstSponsor: SelectLstSponsor(state),
  sponsorSelection: SelectSponsorSelection(state),
  lstMeetingTypes: SelectLstMeetingTypes(state),
  meetingTypeSelection: SelectMeetingTypeSelection(state),
  lstIndividualProponent: SelectLstIndividualProponent(state),
  individualProponentSelection: SelectIndividualProponentSelection(state),
  lstGroupProponent: SelectLstGroupProponent(state),
  groupProponentSelection: SelectGroupProponentSelection(state),
  startInvCompDate: SelectStartInvCompDate(state),
  endInvCompDate: SelectEndInvCompDate(state),
  isInvCompDateChecked: SelectIsInvCompDateChecked(state),
  isProponentGroup: SelectIsProponentGroup(state),

  //Governance Filter
  stateOfIncorporationSelection: SelectStateOfIncorporationSelection(state),
  lstStateOfIncorporationSelection:
    SelectLstStateOfIncorporationSelection(state),
  boardSizeMin: SelectBoardSizeMin(state),
  boardSizeMax: SelectBoardSizeMax(state),
  poisonPillOwnershipMin: SelectPoisonPillOwnershipMin(state),
  poisonPillOwnershipMax: SelectPoisonPillOwnershipMax(state),
  poisonPillExpiryDateMin: SelectPoisonPillExpiryDateMin(state),
  poisonPillExpiryDateMax: SelectPoisonPillExpiryDateMax(state),
  poisonPillExpiryDateChecked: SelectPoisonPillExpiryDateChecked(state),
  avgDirectorTenureMin: SelectAvgDirectorTenureMin(state),
  avgDirectorTenureMax: SelectAvgDirectorTenureMax(state),
  avgAgeMin: SelectAvgAgeMin(state),
  avgAgeMax: SelectAvgAgeMax(state),
  directorTerm: SelectDirectorTerm(state),
  currentFemaleDirectorMax: SelectCurrentFemaleDirectorMax(state),
  currentFemaleDirectorMin: SelectCurrentFemaleDirectorMin(state),
  listProvisionHas: SelectListProvisionHas(state),
  listProvisionHasNot: SelectListProvisionHasNot(state),
  provisionSelectionHas: SelectProvisionSelectionHas(state),
  provisionSelectionHasNot: SelectProvisionSelectionHasNot(state),
  lstActivistNomineeOnBoard: SelectLstActivistNomineeOnBoard(state),
  activistNomineeOnBoardSelection: SelectActivistNomineeOnBoardSelection(state),
  governanceAdvSearch: SelectionGovernanceAdvSearch(state),
  isLoadingGovernanceAdvSearch: SelectIsLoadingGovernanceAdvSearch(state),

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
  handleResetOnSearchClick,

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

  //Governance
  handleStateOfIncorporationSelection,
  handleBoardSizeMin,
  handleBoardSizeMax,
  handlePoisonPillOwnershipMin,
  handlePoisonPillOwnershipMax,
  handlePoisonPillExpiryDateMin,
  handlePoisonPillExpiryDateMax,
  handlePoisonPillExpiryDateChecked,
  handleAvgDirectorTenureMin,
  handleAvgDirectorTenureMax,
  handleAvgAgeMin,
  handleAvgAgeMax,
  handleDirectorTerm,
  handleCurrentFemaleDirectorMin,
  handleCurrentFemaleDirectorMax,
  getProvisionsReq,
  getActivistNomineeOnBoardReq,
  getStateOfIncorporationList,
  handleTreeViewProvisionHas,
  handleTreeViewProvisionHasNot,
  handleActivistNomineeOnBoard,
  getGovernanceAdvSearchReq,
  handleResetCompanyGovernanceAndAnalyticsTool,
  handleUpdateDataCompanyGovernanceAndAnalyticsToolsFilters,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
};

CompanyGovernanceAndAnalyticsToolsContainer.propTypes = {
  getAllMeetingTypeReq: PropTypes.func,
  getAllIndividualProponentReq: PropTypes.func,
  getAllGroupProponentReq: PropTypes.func,
  getProvisionsReq: PropTypes.func,
  getActivistNomineeOnBoardReq: PropTypes.func,
  getStateOfIncorporationList: PropTypes.func,
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
  isLoadingGovernanceAdvSearch: PropTypes.bool,
};

CompanyGovernanceAndAnalyticsToolsContainer.defaultProps = {
  getAllMeetingTypeReq: () => null,
  getAllIndividualProponentReq: () => null,
  getAllGroupProponentReq: () => null,
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
  getProvisionsReq: () => null,
  getActivistNomineeOnBoardReq: () => null,
  getStateOfIncorporationList: () => null,
  procedureRunningEstimateTime: undefined,
  companySearchOptionSelection: undefined,
  investorSearchOptionsSelection: undefined,
  isLoadingGovernanceAdvSearch: true,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanyGovernanceAndAnalyticsToolsContainer)
);
