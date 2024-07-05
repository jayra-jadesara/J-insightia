import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';
import NoActionDataAndAnalyticsTool from '../../../components/Tools/VotingTools/NoActionLetter/NoActionDataAndAnalyticsTool';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import saveSearchConst from '../../../constants/SaveSearchToolConstants';
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
  getUserDashboardReq,
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
import {
  handleResetInvestorComparatorTool,
  handleProponentGroupsearch,
  resolutionsByInvestorFilterReq,
  getDefaultPeerGroupDataReq,
  handleClearPeerGroupCompanySelection,
  handleClearPeerGroupInvestorSelection,
  handleClearResult,
  handleCompanyChangePeerGrp,
  handleInvestorChangePeerGrp,
  handleComapnySearchSelectionInvComp,
  handleInvestorSearchSelectionInvComp,
  getTokenDecode,
} from '../ToolsSlice';
import {
  getVotingToolNoActionLetterDDLReq,
  handleStartDateSelection,
  handleEndDateSelection,
  HandleTreeviewShareholderProposalCategory,
  handleOutcomeFieldsChecked,
  handleIsDateChecked,
  handleIndividualProponentSelection,
  handleIndividualProponentSelection_v2,
  handleShareHolderProposalType_v2,
  getVotingToolNoActionLetterAnalysisDataReq,
  getPeerGroupDataReq,
  getNoActionTrackInfoReq,
  handleClearPeerGroupCompanySelection_v2,
  handleComapnySearchSelection,
  handleSetupOutputFields,
  handleUpdateDataNoActionLetterFilters,
} from './VotingToolSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { VOTING } from '../../../constants/ProductConstants';
import { TokenDecodeForProductStatus } from '../../../utils/general-util';
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
// import { getNoActionTrackInfoReq } from '../../CompanyVotingContainer/CompanyVotingSlice';

const NoActionLetterToolContainer = ({
  token,
  getAllCompanySearchSelection,
  ResetCompanySearchOptionSelection,
  getPeerGroupDataReq,
  getDefaultPeerGroupDataReq,
  companySearchOptionSelection,
  investorSearchOptionsSelection,
  getInvestorSearchOptions,
  getCompanySearchOptions,
  getUserDashboardReq,
  piListOfIndices,
  allListOfExchange,
  listAIPeerGroup,
  allCountriesAndRegions,
  listInvestorTypeAndSubtypeReq,
  piListSectorsAndIndustries,
  getCurrentShareholderReq,
  allIssuers,
  handleClearPeerGroupInvestorSelection,
  // Tools func below
  getVotingToolNoActionLetterDDLReq,
  DDLProponent,
  DDLShareholderProposalCategory,
  SetDDLShareholderProposalCategory,
  isCheckedOutcomeFieldsData,
  isCheckedOutcomeFieldsAnalysis,
  outcomeFieldsSelection,
  isDateChecked,
  getNoActionTrackInfoReq,
  noActionLettersList,
  selection_ByShareholderProposalCategory,
  selection_ByShareholderProposalSubCategory,
  selection_ByShareholderProposalType,
  chartProposalsBy,
  chartProposalsThatWentToAVote,
  tableSupportfromTop20Investors,
  getVotingToolNoActionLetterAnalysisDataReq,
  tableAverage,
  tableAverageHeading,
  tableISS,
  tableISSHeading,
  tableGL,
  tableGLHeading,
  loadingDataNoactionLetters,
  TrialStatus_NoActionLetter,
  allowDownload_NoActionLetter,
  handleCompanyChangePeerGrp,
  handleInvestorChangePeerGrp,
  getProcedureRunningEstimateTimeReq,
  handleSetupOutputFields,
  trialUserDisableDownload,
  location,
  // save search
  saveSearchTextboxValue,
  isShow_SaveThisSearch_Modal,
  saveSearch_list,
  saveSearchDDLList,
  saveSearchedDDLSelection,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const status = async () => {
    const voting_status = await TokenDecodeForProductStatus(VOTING);
    return voting_status;
  };
  const [voting_status, setVoting_status] = useState(0);
  useEffect(() => {
    const abortController = new AbortController();

    getVotingToolNoActionLetterDDLReq();
    return function cleanup() {
      abortController.abort();
    };
  }, [getVotingToolNoActionLetterDDLReq]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getAll() {
      const optionData = {
        comp: companySearchOptionSelection,
        inve: investorSearchOptionsSelection,
      };
      getPeerGroupDataReq(optionData);
    }
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    companySearchOptionSelection,
    investorSearchOptionsSelection,
    getPeerGroupDataReq,
  ]);

  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
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
    }
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, VOTING);
    }
    async function prepAccess() {
      const thisStatus = await status();
      setVoting_status(thisStatus);
      await handleSetupOutputFields(thisStatus);
      await getAccess();
      validation = true;
      await getData();
    }
    prepAccess();
    return function cleanup() {
      abortController.abort();
    };
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
    //
    getPeerGroupDataReq,
    handleClearPeerGroupInvestorSelection,
  ]);

  // #region Saved search

  useEffect(() => {
    props.userSearchFilter_GetReq({
      filter_type_id: saveSearchConst.NO_ACTION_LETTER_TOOL,
    });
  }, []);

  const onSavedSearches_btnApply = useCallback(async () => {
    const data = saveSearch_list.filter(
      (x) => x.filter_id === saveSearchedDDLSelection.value
    );
    if (data.length > 0) {
      const filter_definition = JSON.parse(data[0].filter_definition);
      const cmp_search_id = filter_definition.companySearchId;
      props.handleOutcomeFieldsChecked(
        filter_definition.outcomeFieldsSelection
      );
      await props.handleUpdateDataNoActionLetterFilters(filter_definition);
      async function get_cmpData() {
        if (cmp_search_id !== null && getAllCompanySearchSelection) {
          const cmp_data = await getAllCompanySearchSelection(cmp_search_id);
          const obj = {
            value: cmp_data.payload.company_search[0].company_search_id,
            label: cmp_data.payload.company_search[0].Name,
            isSaved: cmp_data.payload.company_search[0].is_saved,
          };
          await props.handleComapnySearchSelectionInvComp(obj);
        } else {
          ResetCompanySearchOptionSelection();
          props.handleResetCompnaySelections();
        }
      }
      get_cmpData();
    }
  }, [props]);

  function filterDataObj() {
    const depthDDL = SetDDLShareholderProposalCategory.map((x) => ({
      _depth: x._depth !== undefined ? x._depth : 0,
      label: x.label,
    }));
    const startDate = new Date('01/05/15');
    const endDate = new Date();
    const data = {
      DDLShareholderProposalCategory: depthDDL,
      individualProponentSelection:
        props.individualProponentSelection !== undefined &&
        props.individualProponentSelection !== null
          ? props.individualProponentSelection
          : null,
      isDateChecked: isDateChecked,
      startInvCompDate: isDateChecked
        ? Date.parse(props.startInvCompDate)
        : startDate,
      endInvCompDate: isDateChecked
        ? Date.parse(props.endInvCompDate)
        : endDate,
      companySearchId:
        companySearchOptionSelection !== undefined
          ? companySearchOptionSelection.value
          : null,
      outcomeFieldsSelection: outcomeFieldsSelection,
    };
    return data;
  }
  const onSavedSearches_Create = useCallback(async () => {
    const data = filterDataObj();
    const obj = {
      filter_name: saveSearchTextboxValue,
      filter_definition: JSON.stringify(data),
      filter_type_id: saveSearchConst.NO_ACTION_LETTER_TOOL,
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
        filter_type_id: saveSearchConst.NO_ACTION_LETTER_TOOL,
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
      filter_type_id: saveSearchConst.NO_ACTION_LETTER_TOOL,
    };
    await props.userSearchFilter_DeleteReq(data);
  }, [props]);

  // #endregion

  return (
    <ErrorBoundary>
      <NoActionDataAndAnalyticsTool
        {...props}
        allIssuers={allIssuers}
        companySearchOptionSelection={companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        getAllCompanySearchSelection={getAllCompanySearchSelection}
        ResetCompanySearchOptionSelection={ResetCompanySearchOptionSelection}
        handleClearPeerGroupInvestorSelection={
          handleClearPeerGroupInvestorSelection
        }
        handleClearPeerGroupCompanySelection={
          handleClearPeerGroupCompanySelection
        }
        handleCompanyChangePeerGrp={handleCompanyChangePeerGrp}
        handleInvestorChangePeerGrp={handleInvestorChangePeerGrp}
        getUserDashboardReq={getUserDashboardReq}
        //
        getVotingToolNoActionLetterDDLReq={getVotingToolNoActionLetterDDLReq}
        DDLShareholderProposalCategory={DDLShareholderProposalCategory}
        DDLProponent={DDLProponent}
        SetDDLShareholderProposalCategory={SetDDLShareholderProposalCategory}
        isCheckedOutcomeFieldsData={isCheckedOutcomeFieldsData}
        isCheckedOutcomeFieldsAnalysis={isCheckedOutcomeFieldsAnalysis}
        outcomeFieldsSelection={outcomeFieldsSelection}
        isDateChecked={isDateChecked}
        noActionLettersList={noActionLettersList}
        getNoActionTrackInfoReq={getNoActionTrackInfoReq}
        selection_ByShareholderProposalCategory={
          selection_ByShareholderProposalCategory
        }
        selection_ByShareholderProposalSubCategory={
          selection_ByShareholderProposalSubCategory
        }
        selection_ByShareholderProposalType={
          selection_ByShareholderProposalType
        }
        chartProposalsBy={chartProposalsBy}
        chartProposalsThatWentToAVote={chartProposalsThatWentToAVote}
        tableSupportfromTop20Investors={tableSupportfromTop20Investors}
        getVotingToolNoActionLetterAnalysisDataReq={
          getVotingToolNoActionLetterAnalysisDataReq
        }
        tableAverage={tableAverage}
        tableAverageHeading={tableAverageHeading}
        tableISS={tableISS}
        tableISSHeading={tableISSHeading}
        tableGL={tableGL}
        tableGLHeading={tableGLHeading}
        loadingDataNoactionLetters={loadingDataNoactionLetters}
        TrialStatus_NoActionLetter={TrialStatus_NoActionLetter}
        allowDownload_NoActionLetter={allowDownload_NoActionLetter}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        status={voting_status}
        trialUserDisableDownload={trialUserDisableDownload}
        location={location}
        query={query}
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
const SelectStartInvCompDate = (state) => state.votingTool.startInvCompDate;
const SelectEndInvCompDate = (state) => state.votingTool.endInvCompDate;
const SelectLstIndividualProponent = (state) =>
  state.votingTool.lstIndividualProponent;
const SelectLstGroupProponent = (state) => state.votingTool.lstGroupProponent;
const SelectIsProponentGroup = (state) => state.votingTool.isProponentGroup;
const SelectGroupProponentSelection = (state) =>
  state.votingTool.groupProponentSelection;
const SelectIndividualProponentSelection = (state) =>
  state.votingTool.individualProponentSelection;
const SelectIsInvCompDateChecked = (state) =>
  state.votingTool.isInvCompDateChecked;
const selectDDLShareholderProposalCategory = (state) =>
  state.votingTool.DDLShareholderProposalCategory;
const selectDDLProponent = (state) => state.votingTool.DDLProponent;
const selectSetDDLShareholderProposalCategory = (state) =>
  state.votingTool.SetDDLShareholderProposalCategory;
const selectisCheckedOutcomeFieldsData = (state) =>
  state.votingTool.isCheckedOutcomeFieldsAnalysis;
const selectisCheckedOutcomeFieldsAnalysis = (state) =>
  state.votingTool.isCheckedOutcomeFieldsData;
const selectoutcomeFieldsSelection = (state) =>
  state.votingTool.outcomeFieldsSelection;
const selectisDateChecked = (state) => state.votingTool.isDateChecked;
const selectselection_ByShareholderProposalCategory = (state) =>
  state.votingTool.selection_ByShareholderProposalCategory;
const selectselection_ByShareholderProposalSubCategory = (state) =>
  state.votingTool.selection_ByShareholderProposalSubCategory;
const selectselection_ByShareholderProposalType = (state) =>
  state.votingTool.selection_ByShareholderProposalType;
const selectchartProposalsBy = (state) => state.votingTool.chartProposalsBy;
const selectchartProposalsThatWentToAVote = (state) =>
  state.votingTool.chartProposalsThatWentToAVote;
const selecttableSupportfromTop20Investors = (state) =>
  state.votingTool.tableSupportfromTop20Investors;
const selecttableAverage = (state) => state.votingTool.tableAverage;
const selecttableAverageHeading = (state) =>
  state.votingTool.tableAverageHeading;
const selecttableISS = (state) => state.votingTool.tableISS;
const selecttableISSHeading = (state) => state.votingTool.tableISSHeading;
const selecttableGL = (state) => state.votingTool.tableGL;
const selecttableGLHeading = (state) => state.votingTool.tableGLHeading;
const selectloadingDataNoactionLetters = (state) =>
  state.votingTool.loadingDataNoactionLetters;
const selectTrialStatus_NoActionLetter = (state) =>
  state.votingTool.TrialStatus_NoActionLetter;
const selectallowDownload_NoActionLetter = (state) =>
  state.votingTool.allowDownload_NoActionLetter;
const selectNoActionLettersList = (state) =>
  state.votingTool.noActionLettersList;

// #region  dashboard - company search
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
// #endregion
// #region  dashboard - investor search
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

const SelectCompanyPeerGroupSelection = (state) =>
  state.votingTool.companyPeerGroupSelection;
const SelectInvestorPeerGroupSelection = (state) =>
  state.votingTool.investorPeerGroupSelection;
const SelectFilterByCompanySelection = (state) =>
  state.votingTool.filterByCompanySelection;
const SelectFilterByInvestorSelection = (state) =>
  state.votingTool.filterByInvestorSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) =>
  state.votingTool.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) =>
  state.votingTool.isResetInvestorPeerGroupSelection;

// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
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
  // filter
  lstIndividualProponent: SelectLstIndividualProponent(state),
  individualProponentSelection: SelectIndividualProponentSelection(state),
  lstGroupProponent: SelectLstGroupProponent(state),
  groupProponentSelection: SelectGroupProponentSelection(state),
  startInvCompDate: SelectStartInvCompDate(state),
  endInvCompDate: SelectEndInvCompDate(state),
  isInvCompDateChecked: SelectIsInvCompDateChecked(state),
  isProponentGroup: SelectIsProponentGroup(state),

  DDLShareholderProposalCategory: selectDDLShareholderProposalCategory(state),
  DDLProponent: selectDDLProponent(state),
  SetDDLShareholderProposalCategory:
    selectSetDDLShareholderProposalCategory(state),
  isCheckedOutcomeFieldsAnalysis: selectisCheckedOutcomeFieldsData(state),
  isCheckedOutcomeFieldsData: selectisCheckedOutcomeFieldsAnalysis(state),
  outcomeFieldsSelection: selectoutcomeFieldsSelection(state),
  isDateChecked: selectisDateChecked(state),
  selection_ByShareholderProposalCategory:
    selectselection_ByShareholderProposalCategory(state),
  selection_ByShareholderProposalSubCategory:
    selectselection_ByShareholderProposalSubCategory(state),
  selection_ByShareholderProposalType:
    selectselection_ByShareholderProposalType(state),
  chartProposalsBy: selectchartProposalsBy(state),
  chartProposalsThatWentToAVote: selectchartProposalsThatWentToAVote(state),
  tableSupportfromTop20Investors: selecttableSupportfromTop20Investors(state),
  tableAverage: selecttableAverage(state),
  tableAverageHeading: selecttableAverageHeading(state),
  tableISS: selecttableISS(state),
  tableISSHeading: selecttableISSHeading(state),
  tableGL: selecttableGL(state),
  tableGLHeading: selecttableGLHeading(state),
  loadingDataNoactionLetters: selectloadingDataNoactionLetters(state),
  TrialStatus_NoActionLetter: selectTrialStatus_NoActionLetter(state),
  allowDownload_NoActionLetter: selectallowDownload_NoActionLetter(state),
  noActionLettersList: selectNoActionLettersList(state),

  // title slice
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),

  // #region investor search selection
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
  // #endregion

  // #region Company search selection
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
  // #endregion

  companyPeerGroupSelection: SelectCompanyPeerGroupSelection(state),
  investorPeerGroupSelection: SelectInvestorPeerGroupSelection(state),
  filterByCompanySelection: SelectFilterByCompanySelection(state),
  filterByInvestorSelection: SelectFilterByInvestorSelection(state),
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
  // Title slice
  getProcedureRunningEstimateTimeReq,

  // Filter - Tool Slice
  getDefaultPeerGroupDataReq,
  handleProponentGroupsearch,
  getVotingToolNoActionLetterDDLReq,
  handleClearResult,
  handleStartDateSelection,
  handleEndDateSelection,
  handleIndividualProponentSelection,
  handleIndividualProponentSelection_v2,
  handleShareHolderProposalType_v2,
  getVotingToolNoActionLetterAnalysisDataReq,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleResetInvestorComparatorTool,
  resolutionsByInvestorFilterReq,
  getPeerGroupDataReq,
  handleCompanyChangePeerGrp,
  handleInvestorChangePeerGrp,
  handleInvestorSearchSelectionInvComp,
  handleComapnySearchSelectionInvComp,

  // Filter - Company search selection
  getUserDashboardReq,
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

  // Tools - No action letters
  HandleTreeviewShareholderProposalCategory,
  handleIsDateChecked,
  handleOutcomeFieldsChecked,
  getNoActionTrackInfoReq,
  handleClearPeerGroupCompanySelection_v2,
  handleComapnySearchSelection,
  handleSetupOutputFields,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
  handleUpdateDataNoActionLetterFilters,
  // save search
  userSearchFilter_CreateReq,
  userSearchFilter_UpdateReq,
  userSearchFilter_DeleteReq,
  userSearchFilter_GetReq,
  handleSaveSearchTextboxValue,
  handleShow_SaveThisSearch_Modal,
  handleSetSaveSearchedDDLSelection,
};

NoActionLetterToolContainer.propTypes = {
  getVotingToolNoActionLetterDDLReq: PropTypes.func,
  //
  getUserDashboardReq: PropTypes.func.isRequired,
  allIssuers: PropTypes.func.isRequired,
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
  //
  DDLProponent: PropTypes.array.isRequired,
  DDLShareholderProposalCategory: PropTypes.array.isRequired,
  getPeerGroupDataReq: PropTypes.func.isRequired,
  getAllCompanySearchSelection: PropTypes.func.isRequired,
  ResetCompanySearchOptionSelection: PropTypes.func.isRequired,
  handleClearPeerGroupInvestorSelection: PropTypes.func.isRequired,
  handleClearPeerGroupCompanySelection: PropTypes.func.isRequired,
  SetDDLShareholderProposalCategory: PropTypes.array.isRequired,
  isCheckedOutcomeFieldsAnalysis: PropTypes.bool,
  isCheckedOutcomeFieldsData: PropTypes.bool,
  outcomeFieldsSelection: PropTypes.number.isRequired,
  isDateChecked: PropTypes.bool.isRequired,
  selection_ByShareholderProposalCategory: PropTypes.string.isRequired,
  selection_ByShareholderProposalSubCategory: PropTypes.string.isRequired,
  selection_ByShareholderProposalType: PropTypes.string.isRequired,
  getNoActionTrackInfoReq: PropTypes.func.isRequired,
  noActionLettersList: PropTypes.any.isRequired,

  chartProposalsBy: PropTypes.array.isRequired,
  chartProposalsThatWentToAVote: PropTypes.array.isRequired,
  tableSupportfromTop20Investors: PropTypes.array,
  tableAverage: PropTypes.array,
  tableAverageHeading: PropTypes.array.isRequired,
  tableISS: PropTypes.array.isRequired,
  tableISSHeading: PropTypes.array.isRequired,
  tableGL: PropTypes.array.isRequired,
  tableGLHeading: PropTypes.array.isRequired,
  loadingDataNoactionLetters: PropTypes.bool.isRequired,
  TrialStatus_NoActionLetter: PropTypes.bool.isRequired,
  allowDownload_NoActionLetter: PropTypes.bool.isRequired,

  getVotingToolNoActionLetterAnalysisDataReq: PropTypes.func.isRequired,
  handleCompanyChangePeerGrp: PropTypes.func.isRequired,
  handleInvestorChangePeerGrp: PropTypes.func.isRequired,
};

NoActionLetterToolContainer.defaultProps = {
  getVotingToolNoActionLetterDDLReq: () => null,
  //
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
  tableSupportfromTop20Investors: undefined,
  tableAverage: undefined,
  isCheckedOutcomeFieldsAnalysis: false,
  isCheckedOutcomeFieldsData: false,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NoActionLetterToolContainer)
);
