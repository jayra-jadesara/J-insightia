import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import saveSearchConst from '../../../constants/SaveSearchToolConstants';
import DissidentVotingSummary from '../../../components/Tools/VotingTools/DissidentVotingSummary/DissidentVotingSummary';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
} from '../../General/TitleSlice';
import {
  handleOnChangeDDLSettlements,
  handleOnChangeDDLSettlementsDissidentSummary,
  handleOnChangeDDLIISCardRecommendation,
  handleOnChangeDDLGLCardRecommendation,
  handleDesiredOutcomeChecked,

  // Result - Tools DissidentVoting Summary Slice
  dissidentVotingSummarySearchReq,
  handleClearResult,
  handledResetLoadingData,
} from './ToolsDissidentVotingSummarySlice';
import { handleStartSearch } from '../../InvestorContainer/Voting/VotingOverviewSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
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
  getResolutionsTypeIdByNameReq,
  getTokenDecode,
  handleUpdateDataDissidentVotingSummaryFilters,
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
  ResetInvestorSearchOptionSelection,
  handleResetInvestorSelections,
  getAumCategorylistReq,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetCompnaySelections,
  handleAumCategorySelection,
} from '../../DashboardContainer/DashboardSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { VOTING } from '../../../constants/ProductConstants';
import {
  TokenDecodeForProductStatus,
  GetDefaultStartAndEndDate,
} from '../../../utils/general-util';
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

const DissidentVotingSummaryContainer = ({
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
  getAumCategorylistReq,
  // save search
  saveSearchTextboxValue,
  isShow_SaveThisSearch_Modal,
  saveSearch_list,
  saveSearchDDLList,
  saveSearchedDDLSelection,
  ...props
}) => {
  const [status, setStatus] = useState(null);

  const getStatus = async () => {
    const resp = await TokenDecodeForProductStatus(VOTING);
    setStatus(resp);
  };
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
      getAumCategorylistReq();
      const optionData = {
        comp: companySearchOptionSelection,
        inve: investorSearchOptionsSelection,
      };
      getDefaultPeerGroupDataReq(optionData);
    }
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, VOTING);
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getData();
      await getStatus();
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
    getAumCategorylistReq,
  ]);

  // #region Saved search

  useEffect(() => {
    props.userSearchFilter_GetReq({
      filter_type_id: saveSearchConst.DISSIDENT_VOTING_SUMMARY_TOOL,
    });
  }, []);

  const onSavedSearches_btnApply = useCallback(async () => {
    const data = saveSearch_list.filter(
      (x) => x.filter_id === saveSearchedDDLSelection.value
    );
    if (data.length > 0) {
      const filter_definition = JSON.parse(data[0].filter_definition);
      const cmp_search_id = filter_definition.companySearchId;
      const inv_search_id = filter_definition.investorSearchId;

      await props.handleUpdateDataDissidentVotingSummaryFilters(
        filter_definition
      );
      props.handleOnChangeDDLSettlementsDissidentSummary(
        filter_definition.lstSettlementDissidentSummarySelection
      );
      props.handleOnChangeDDLIISCardRecommendation(
        filter_definition.lstIISCardRecommendationSelection
      );
      props.handleOnChangeDDLGLCardRecommendation(
        filter_definition.lstGLCardRecommendationSelection
      );
      props.handleDesiredOutcomeChecked(
        filter_definition.desiredOutcomeSelection
      );
      async function get_invData() {
        if (inv_search_id !== null && props.GetInvestorSearchSelection) {
          const inv_data = await props.GetInvestorSearchSelection(
            inv_search_id
          );
          const obj = {
            label: inv_data.payload.investor_search[0].Name,
            value: inv_data.payload.investor_search[0].investor_search_id,
          };
          props.handleInvestorSearchSelectionInvComp(obj);
        } else {
          props.ResetInvestorSearchOptionSelection();
          props.handleResetInvestorSelections();
        }
      }
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
      get_invData();
    }
  }, [props]);

  function filterDataObj() {
    const { startDate, endDate } = GetDefaultStartAndEndDate();

    const data = {
      individualProponentSelection:
        props.individualProponentSelection !== undefined &&
        props.individualProponentSelection !== null
          ? props.individualProponentSelection
          : null,
      groupProponentSelection:
        props.groupProponentSelection !== undefined &&
        props.groupProponentSelection !== null
          ? props.groupProponentSelection
          : null,
      isProponentGroup: props.isProponentGroup,
      isInvCompDateChecked: props.isInvCompDateChecked,
      startInvCompDate: props.isInvCompDateChecked
        ? Date.parse(props.startInvCompDate)
        : startDate,
      endInvCompDate: props.isInvCompDateChecked
        ? Date.parse(props.endInvCompDate)
        : endDate,
      companySearchId:
        companySearchOptionSelection !== undefined
          ? companySearchOptionSelection.value
          : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined
          ? props.invCompInvestorPeerGroupSelection.value
          : null,
      meetingTypeSelection: props.meetingTypeSelection,
      sponsorSelection: props.sponsorSelection,
      lstSettlementDissidentSummarySelection:
        props.lstSettlementDissidentSummarySelection,
      lstIISCardRecommendationSelection:
        props.lstIISCardRecommendationSelection,
      lstGLCardRecommendationSelection: props.lstGLCardRecommendationSelection,
      desiredOutcomeSelection: props.desiredOutcomeSelection,
    };
    return data;
  }
  const onSavedSearches_Create = useCallback(async () => {
    const data = filterDataObj();
    const obj = {
      filter_name: saveSearchTextboxValue,
      filter_definition: JSON.stringify(data),
      filter_type_id: saveSearchConst.DISSIDENT_VOTING_SUMMARY_TOOL,
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
        filter_type_id: saveSearchConst.DISSIDENT_VOTING_SUMMARY_TOOL,
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
      filter_type_id: saveSearchConst.DISSIDENT_VOTING_SUMMARY_TOOL,
    };
    await props.userSearchFilter_DeleteReq(data);
  }, [props]);

  // #endregion

  return (
    <ErrorBoundary>
      <DissidentVotingSummary
        {...props}
        companySearchOptionSelection={companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        status={status}
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

// filter
const SelectLstSponsor = (state) => state.tools.lstSponsor;
const SelectSponsorSelection = (state) => state.tools.sponsorSelection;
const SelectLstMeetingTypes = (state) => state.tools.lstMeetingTypes;
const SelectMeetingTypeSelection = (state) => state.tools.meetingTypeSelection;
const SelectLstIndividualProxyProponent = (state) => state.tools.lstIndividualProxyProponent;
const SelectIndividualProponentSelection = (state) => state.tools.individualProponentSelection;
const SelectLstGroupProxyProponent = (state) => state.tools.lstGroupProxyProponent;
const SelectGroupProponentSelection = (state) => state.tools.groupProponentSelection;
const SelectStartInvCompDate = (state) => state.tools.startInvCompDate;
const SelectEndInvCompDate = (state) => state.tools.endInvCompDate;
const SelectIsInvCompDateChecked = (state) => state.tools.isInvCompDateChecked;
const SelectIsProponentGroup = (state) => state.tools.isProponentGroup;

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
const selectInvListRegeionAndCountries = (state) =>
  state.dashboard.invListRegeionAndCountries;
const selectLstInvestorRegeionAndCountries = (state) =>
  state.dashboard.lstInvestorRegeionAndCountries;
const selectInvestorSelection = (state) => state.dashboard.investorSelection;
const selectAumCategorySelection = (state) =>
  state.dashboard.aumCategorySelection;
const selectInvTxtMarketCapMinRange = (state) =>
  state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) =>
  state.dashboard.invTxtMarketCapMaxRange;

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
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectDefaultCmpRegeionAndCountries = (state) =>
  state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) =>
  state.dashboard.defaultPiListSectorsAndIndustries;
const selectListDefaultInvestorTypeAndSubtype = (state) =>
  state.dashboard.listDefaultInvestorTypeAndSubtype;

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

// Dissident - Additional filters
const SelectLstSettlements = (state) =>
  state.toolsDissidentVotingSummary.lstSettlements;
const SelectLstSettlementSelection = (state) =>
  state.toolsDissidentVotingSummary.lstSettlementSelection;
const SelectlstSettlementDissidentSummary = (state) =>
  state.toolsDissidentVotingSummary.lstSettlementDissidentSummary;
const SelectLstSettlementDissidentSummarySelection = (state) =>
  state.toolsDissidentVotingSummary.lstSettlementDissidentSummarySelection;
const SelectLstIISCardRecommendation = (state) =>
  state.toolsDissidentVotingSummary.lstIISCardRecommendation;
const SelectLstIISCardRecommendationSelection = (state) =>
  state.toolsDissidentVotingSummary.lstIISCardRecommendationSelection;
const SelectLstGLCardRecommendation = (state) =>
  state.toolsDissidentVotingSummary.lstGLCardRecommendation;
const SelectLstGLCardRecommendationSelection = (state) =>
  state.toolsDissidentVotingSummary.lstGLCardRecommendationSelection;
const SelectIsCheckedDesiredOutcomeAll = (state) =>
  state.toolsDissidentVotingSummary.isCheckedDesiredOutcomeAll;
const SelectIsCheckedDesiredOutcomeShortSlate = (state) =>
  state.toolsDissidentVotingSummary.isCheckedDesiredOutcomeShortSlate;
const SelectIsCheckedDesiredOutcomeBoardControl = (state) =>
  state.toolsDissidentVotingSummary.isCheckedDesiredOutcomeBoardControl;
const SelectDesiredOutcomeSelection = (state) =>
  state.toolsDissidentVotingSummary.desiredOutcomeSelection;

// Page - Dissident Voting Summary
const SelectLstDissidentVotingSummaryTopTenData = (state) =>
  state.toolsDissidentVotingSummary.lstDissidentVotingSummaryData;
const SelectIsLoadingDissidentVotingSummaryData = (state) =>
  state.toolsDissidentVotingSummary.isLoadingDissidentVotingSummaryData;
const SelectTrialStatus = (state) =>
  state.toolsDissidentVotingSummary.trialStatus;
const SelectIsShowLimitedData = (state) =>
  state.toolsDissidentVotingSummary.isShowLimitedData;
const SelectUserMessage = (state) =>
  state.toolsDissidentVotingSummary.userMessage;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;

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

const mapStateToProps = (state) => ({
  // #region save search

  saveSearchTextboxValue: selectsaveSearchTextboxValue(state),
  isShow_SaveThisSearch_Modal: selectisShow_SaveThisSearch_Modal(state),
  saveSearch_list: selectsaveSearch_list(state),
  saveSearchDDLList: selectsaveSearchDDLList(state),
  saveSearchedDDLSelection: selectsaveSearchedDDLSelection(state),

  //#endreion
  token: SelectDecodeToken(state),
  // Page - Dissident Voting Summary
  lstDissidentVotingSummaryData:
    SelectLstDissidentVotingSummaryTopTenData(state),
  isLoadingDissidentVotingSummaryData:
    SelectIsLoadingDissidentVotingSummaryData(state),
  trialStatus: SelectTrialStatus(state),
  isShowLimitedData: SelectIsShowLimitedData(state),
  userMessage: SelectUserMessage(state),

  // Dissident - Additional filters
  lstSettlements: SelectLstSettlements(state),
  lstSettlementSelection: SelectLstSettlementSelection(state),
  lstSettlementDissidentSummary: SelectlstSettlementDissidentSummary(state),
  lstSettlementDissidentSummarySelection:
    SelectLstSettlementDissidentSummarySelection(state),
  lstIISCardRecommendation: SelectLstIISCardRecommendation(state),
  lstIISCardRecommendationSelection:
    SelectLstIISCardRecommendationSelection(state),
  lstGLCardRecommendation: SelectLstGLCardRecommendation(state),
  lstGLCardRecommendationSelection:
    SelectLstGLCardRecommendationSelection(state),
  isCheckedDesiredOutcomeAll: SelectIsCheckedDesiredOutcomeAll(state),
  isCheckedDesiredOutcomeShortSlate:
    SelectIsCheckedDesiredOutcomeShortSlate(state),
  isCheckedDesiredOutcomeBoardControl:
    SelectIsCheckedDesiredOutcomeBoardControl(state),
  desiredOutcomeSelection: SelectDesiredOutcomeSelection(state),

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
  lstIndividualProponent: SelectLstIndividualProxyProponent(state),
  individualProponentSelection: SelectIndividualProponentSelection(state),
  lstGroupProponent: SelectLstGroupProxyProponent(state),
  groupProponentSelection: SelectGroupProponentSelection(state),
  startInvCompDate: SelectStartInvCompDate(state),
  endInvCompDate: SelectEndInvCompDate(state),
  isInvCompDateChecked: SelectIsInvCompDateChecked(state),
  isProponentGroup: SelectIsProponentGroup(state),

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
  listDefaultInvestorTypeAndSubtype:
    selectListDefaultInvestorTypeAndSubtype(state),

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
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  aumCategorySelection: selectAumCategorySelection(state),
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),
  listAumCategory: selectListAumCategory(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries:
    selectDefaultPiListSectorsAndIndustries(state),

  // selection - company & investor search
  invCompCompanyPeerGroupSelection:
    SelectInvCompCompanyPeerGroupSelection(state),
  invCompInvestorPeerGroupSelection:
    SelectInvCompInvestorPeerGroupSelection(state),
  isResetCompanyPeerGroupSelection:
    SelectIsResetCompanyPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection:
    SelectIsResetInvestorPeerGroupSelection(state),
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
  //
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
  handleUpdateDataDissidentVotingSummaryFilters,
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

  // filters - Tools DissidentVoting Summary Slice
  handleOnChangeDDLSettlements,
  handleOnChangeDDLSettlementsDissidentSummary,
  handleOnChangeDDLIISCardRecommendation,
  handleOnChangeDDLGLCardRecommendation,
  handleDesiredOutcomeChecked,

  // Result - Tools DissidentVoting Summary Slice
  dissidentVotingSummarySearchReq,
  ResetInvestorSearchOptionSelection,
  handleResetInvestorSelections,
  getAumCategorylistReq,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetCompnaySelections,
  handleStartSearch,
  handledResetLoadingData,
  handleAumCategorySelection,
};

DissidentVotingSummaryContainer.propTypes = {
  getAllMeetingTypeReq: PropTypes.func,
  getAllIndividualProponentReq: PropTypes.func,
  getAllGroupProponentReq: PropTypes.func,
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
};

DissidentVotingSummaryContainer.defaultProps = {
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
  procedureRunningEstimateTime: undefined,
  companySearchOptionSelection: undefined,
  investorSearchOptionsSelection: undefined,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DissidentVotingSummaryContainer)
);
