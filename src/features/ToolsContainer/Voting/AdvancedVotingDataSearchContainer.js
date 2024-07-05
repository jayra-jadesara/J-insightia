import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import saveSearchConst from '../../../constants/SaveSearchToolConstants';
import AdvancedVotingDataSearch from '../../../components/Tools/VotingTools/AdvancedVotingDataSearch/AdvancedVotingDataSearch';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
} from '../../General/TitleSlice';
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
  handlequickSearchReq,
  getTokenDecode,
  handleResetAdvancedVotingDataSearch,
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
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  ResetInvestorSearchOptionSelection,
  getAumCategorylistReq,
  handleAumCategorySelection,
} from '../../DashboardContainer/DashboardSlice';

import {
  getAdvanceVotingDataFundnameReq,
  getVoteCastReq,
  getSupportReq,
  getOutputFieldReq,
  getManagementReccReq,
  handleVoteCastSelection,
  handleManagementRecc,
  handleFundNameSelection,
  handleIsSupportChecked,
  handleSupportFromChange,
  handleSupportToChange,
  handleOutputFieldSelection,
  handleResolutionTypeSelection,
  handleUpdateDataFromQueryString,
  handleStartInvCompDateSelection,
  handleEndInvCompDateSelection,
  isCurrentInternalUserReq,
  handleSupportSelection,
  // Result - Advanced Votinf data search Slice
  advancedVotingdataSearchReq,
  getListProposalsAndCategoriesReq,
  handleResetOnSearchClick,
  handleResetAdvancedVotingDataSearchSliceFilter,
  handleUpdateDataFilters,
} from './AdvancedVotingDataSearchSlice';
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
import {
  handleOnChangeDdlSpecificNews,
  getActivismNewsAlertsReq,
} from '../../MyAlertContainer/MyAlert/MyAlertSlice';
import { VOTING } from '../../../constants/ProductConstants';
import { GetPageAccess } from '../../../utils/tools-util';
import {
  TokenDecodeForProductStatus,
  GetDefaultStartAndEndDate,
} from '../../../utils/general-util';

const AdvancedVotingDataSearchContainer = ({
  location,
  token,
  getAllMeetingTypeReq,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  getDefaultPeerGroupDataReq,
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
  getAdvanceVotingDataFundnameReq,
  getVoteCastReq,
  getSupportReq,
  getOutputFieldReq,
  getManagementReccReq,
  isLoadingAdvanceVotingDataSearch,
  ddlListOfProposalType,
  ddlSpecificActivistActionNewsSelection,
  getActivismNewsAlertsReq,
  listOfcompanySearchOptions,
  handleComapnySearchSelectionInvComp,
  investorSearchOptions,
  handleInvestorSearchSelectionInvComp,
  handleUpdateDataFromQueryString,
  isCurrentInternalUserReq,
  getListProposalsAndCategoriesReq,
  SetDDLProposalCategory,
  trialUserDisableDownload,
  getAumCategorylistReq,
  handleResetAdvancedVotingDataSearch,
  handleResetAdvancedVotingDataSearchSliceFilter,
  // save search
  saveSearchTextboxValue,
  isShow_SaveThisSearch_Modal,
  saveSearch_list,
  saveSearchDDLList,
  saveSearchedDDLSelection,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [status, setStatus] = useState(null);

  const getStatus = async () => {
    const resp = await TokenDecodeForProductStatus(VOTING);
    setStatus(resp);
  };

  useEffect(() => {
    const abortController = new AbortController();
    handleResetAdvancedVotingDataSearch(); // Reset filter from ToolSlice
    handleResetAdvancedVotingDataSearchSliceFilter(); // Reset filter from AdvancedVotingDataSearchSlice
    async function getNewsAccess() {
      getAllMeetingTypeReq();
      getAllIndividualProponentReq();
      getAllGroupProponentReq();
      getAdvanceVotingDataFundnameReq();
      getVoteCastReq();
      getSupportReq();
      getOutputFieldReq();
      getManagementReccReq();
      getListProposalsAndCategoriesReq();
    }
    getNewsAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    getAllMeetingTypeReq,
    getAllIndividualProponentReq,
    getAllGroupProponentReq,
    getAdvanceVotingDataFundnameReq,
    getManagementReccReq,
    getOutputFieldReq,
    getSupportReq,
    getVoteCastReq,
    getListProposalsAndCategoriesReq,
    handleResetAdvancedVotingDataSearch,
    handleResetAdvancedVotingDataSearchSliceFilter,
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
      getCompanySearchOptions();
      getInvestorSearchOptions();
      getActivismNewsAlertsReq();
      const optionData = {
        comp: props.companySearchOptionSelection,
        inve: investorSearchOptionsSelection,
      };
      getDefaultPeerGroupDataReq(optionData);
      getAumCategorylistReq();
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
    getDefaultPeerGroupDataReq,
    props.companySearchOptionSelection,
    investorSearchOptionsSelection,
    getActivismNewsAlertsReq,
    getAumCategorylistReq,
  ]);

  const onSearch = useCallback(async () => {
    await props.handleResetOnSearchClick();
    await props.handleResetLoader();
    await props.handleClearResult();
    await props.handleResetInvestorComparatorTool();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.ADVANCED_VOTING_SEARCHING_TOOL
    );

    const data = {
      internal: props.showInternal,
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined
          ? props.invCompInvestorPeerGroupSelection.value
          : null,
      investorid:
        props.investorid !== undefined && props.investorid !== ''
          ? props.investorid
          : null,
      meetingType:
        props.meetingTypeSelection !== null &&
        props.meetingTypeSelection !== undefined &&
        props.meetingTypeSelection.length !== 0
          ? props.meetingTypeSelection.map((c) => c.value).toString()
          : null,
      sponsor:
        props.sponsorSelection !== undefined
          ? props.sponsorSelection.value
          : null,
      meetingStartDate: props.isInvCompDateChecked
        ? props.startInvCompDate
        : null,
      meetingEndDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      supportMin: props.isSupportChecked ? props.supportFrom : null,
      supportMax: props.isSupportChecked ? props.supportTo : null,
      support: props.isSupportChecked
        ? props.supportSelection.label !== null
          ? props.supportSelection.label
          : null
        : null,
      fundId:
        props.ddlAdvanceVotingDataFundSelection !== undefined &&
        props.ddlAdvanceVotingDataFundSelection[0].value !== null
          ? props.ddlAdvanceVotingDataFundSelection
              .map((c) => c.value)
              .toString()
          : null,
      voteCast:
        props.voteCastSelection !== undefined &&
        props.voteCastSelection[0].value !== null
          ? props.voteCastSelection.map((c) => c.mlabel).toString()
          : null,
      managementRecc:
        props.managementReccSelection !== undefined &&
        props.managementReccSelection[0].value !== null
          ? props.managementReccSelection.map((c) => c.mlabel).toString()
          : null,
      proposalType:
        props.resolutionTypeSelection !== undefined &&
        props.resolutionTypeSelection !== '' &&
        props.resolutionTypeSelection !== null
          ? props.resolutionTypeSelection
          : null,
      ShowVotingDetail: props.showVotingDetails,
      showInvestorVotingDetail: props.showInvestorVotingDetail,
      ShowVoteResults: props.showVoteResults,
      ShowRationale: props.showRationale,
    };

    await props.advancedVotingdataSearchReq(data);
  }, [props]);

  useEffect(() => {
    const abortController = new AbortController();
    isCurrentInternalUserReq();
    if (Object.keys(query).length) {
      // set query string date
      isCurrentInternalUserReq();
      const data = {
        investorid: query.investorid !== undefined ? query.investorid : null,
        meetingStartDate: query.datefrom !== undefined ? query.datefrom : null,
        meetingEndDate: query.dateto !== undefined ? query.dateto : null,
      };
      handleUpdateDataFromQueryString(
        data.meetingStartDate,
        data.meetingEndDate,
        data.investorid
      );

      let cmpSearch;
      if (query.company_search_id) {
        cmpSearch = listOfcompanySearchOptions.filter(
          (c) => c.value === Number(query.company_search_id)
        );
        if (cmpSearch.length > 0) {
          handleComapnySearchSelectionInvComp(cmpSearch[0]);
          onSearch();
        }
      } else {
        onSearch();
      }
      return function cleanup() {
        abortController.abort();
      };
    }
  }, [
    onSearch,
    query.company_search_id,
    query.datefrom,
    investorSearchOptions,
    query.dateto,
    query.investorid,
    listOfcompanySearchOptions,
    handleComapnySearchSelectionInvComp,
    handleUpdateDataFromQueryString,
    isCurrentInternalUserReq,
    query,
  ]);

  // #region Saved search

  useEffect(() => {
    props.userSearchFilter_GetReq({
      filter_type_id: saveSearchConst.ADVANCED_VOTING_DATA_SEARCH_TOOL,
    });
  }, []);

  const onSavedSearches_btnApply = useCallback(async () => {
    const data = saveSearch_list.filter(
      (x) => x.filter_id === saveSearchedDDLSelection.value
    );
    if (data.length > 0) {
      const filter_definition = JSON.parse(data[0].filter_definition);
      const meetingTypeSelection = filter_definition.meetingTypeSelection;
      const sponsorSelection = filter_definition.sponsorSelection;
      const cmp_search_id = filter_definition.companySearchId;
      const inv_search_id = filter_definition.investorSearchId;
      const isInvCompDateChecked = filter_definition.isInvCompDateChecked;

      await props.handleUpdateDataFilters(filter_definition);
      await props.handleMeetingTypeSelection(meetingTypeSelection);
      await props.handleSponsorSelection(sponsorSelection);
      await props.handleIsInvCompDateChecked({
        target: { checked: isInvCompDateChecked },
      });
      async function get_invData() {
        if (inv_search_id !== null && props.GetInvestorSearchSelection) {
          const inv_data = await props.GetInvestorSearchSelection(
            inv_search_id
          );
          const obj = {
            label: inv_data.payload.investor_search[0].Name,
            value: inv_data.payload.investor_search[0].investor_search_id,
          };
          handleInvestorSearchSelectionInvComp(obj);
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
          await handleComapnySearchSelectionInvComp(obj);
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
    const depthDDL = SetDDLProposalCategory.map((x) => ({
      _depth: x._depth !== undefined ? x._depth : 0,
      label: x.label,
    }));
    const a = ddlListOfProposalType;
    const { startDate, endDate } = GetDefaultStartAndEndDate();
    const data = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined
          ? props.invCompInvestorPeerGroupSelection.value
          : null,
      investorid: props.investorid,
      meetingTypeSelection: props.meetingTypeSelection,
      sponsorSelection: props.sponsorSelection,
      isInvCompDateChecked: props.isInvCompDateChecked,
      startInvCompDate: props.isInvCompDateChecked
        ? Date.parse(props.startInvCompDate)
        : Date.parse(startDate),
      endInvCompDate: props.isInvCompDateChecked
        ? Date.parse(props.endInvCompDate)
        : Date.parse(endDate),
      isSupportChecked: props.isSupportChecked,
      supportFrom: props.isSupportChecked ? props.supportFrom : 0,
      supportTo: props.isSupportChecked ? props.supportTo : 0,
      supportSelection: props.supportSelection,
      ddlAdvanceVotingDataFundSelection:
        props.ddlAdvanceVotingDataFundSelection,
      voteCastSelection: props.voteCastSelection,
      managementReccSelection: props.managementReccSelection,
      ddlListOfProposalType: depthDDL,
      outputFieldSelection: props.outputFieldSelection,
      showVotingDetails: props.showVotingDetails,
      showRationale: props.showRationale,
      showInvestorVotingDetail: props.showInvestorVotingDetail,
      showInternal: props.showInternal,
      showVoteResults: props.showVoteResults,
    };
    return data;
  }
  const onSavedSearches_Create = useCallback(async () => {
    const data = filterDataObj();
    const obj = {
      filter_name: saveSearchTextboxValue,
      filter_definition: JSON.stringify(data),
      filter_type_id: saveSearchConst.ADVANCED_VOTING_DATA_SEARCH_TOOL,
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
        filter_type_id: saveSearchConst.ADVANCED_VOTING_DATA_SEARCH_TOOL,
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
      filter_type_id: saveSearchConst.ADVANCED_VOTING_DATA_SEARCH_TOOL,
    };
    await props.userSearchFilter_DeleteReq(data);
  }, [props]);

  // #endregion

  return (
    <ErrorBoundary>
      <AdvancedVotingDataSearch
        {...props}
        companySearchOptionSelection={props.companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        isLoadingAdvanceVotingDataSearch={isLoadingAdvanceVotingDataSearch}
        ddlListOfProposalType={ddlListOfProposalType}
        listOfcompanySearchOptions={listOfcompanySearchOptions}
        handleComapnySearchSelectionInvComp={
          handleComapnySearchSelectionInvComp
        }
        handleInvestorSearchSelectionInvComp={
          handleInvestorSearchSelectionInvComp
        }
        investorSearchOptions={investorSearchOptions}
        ddlSpecificActivistActionNewsSelection={
          ddlSpecificActivistActionNewsSelection
        }
        SetDDLProposalCategory={SetDDLProposalCategory}
        handlequickSearchReq={handlequickSearchReq}
        onSearch={onSearch}
        trialUserDisableDownload={trialUserDisableDownload}
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

const SelectDecodeToken = (state) => state.tools.getTokenDecode;
// filter
const SelectLstSponsor = (state) => state.tools.lstSponsor;
const SelectSponsorSelection = (state) => state.tools.sponsorSelection;
const SelectLstVoteCast = (state) => state.advancedVotingDataSearch.lstVoteCast;
const SelectVoteCastSelection = (state) =>
  state.advancedVotingDataSearch.voteCastSelection;
const SelectLstSupport = (state) => state.advancedVotingDataSearch.lstSupport;

const SelectIsSupportChecked = (state) =>
  state.advancedVotingDataSearch.isSupportChecked;
const SelectSupportFrom = (state) => state.advancedVotingDataSearch.supportFrom;
const SelectSupportTo = (state) => state.advancedVotingDataSearch.supportTo;
const SelectOutputFieldSelection = (state) =>
  state.advancedVotingDataSearch.outputFieldSelection;
const SelectLstOutputField = (state) =>
  state.advancedVotingDataSearch.lstOutputField;
const SelectResolutionTypeSelection = (state) =>
  state.advancedVotingDataSearch.resolutionTypeSelection;
const SelectLstResolutionType = (state) =>
  state.advancedVotingDataSearch.lstResolutionType;
const SelectLstAdvancedVotingDataSearch = (state) =>
  state.advancedVotingDataSearch.lstAdvancedVotingDataSearch;
const SelectLstManagementRecc = (state) =>
  state.advancedVotingDataSearch.lstManagementRecc;
const SelectManagementReccSelection = (state) =>
  state.advancedVotingDataSearch.managementReccSelection;
const SelectDdlAdvanceVotingDataFunds = (state) =>
  state.advancedVotingDataSearch.ddlAdvanceVotingDataFunds;
const SelectDdlAdvanceVotingDataFundSelection = (state) =>
  state.advancedVotingDataSearch.ddlAdvanceVotingDataFundSelection;
const SelectUserMessage = (state) => state.advancedVotingDataSearch.userMessage;
const SelectShowVotingDetails = (state) =>
  state.advancedVotingDataSearch.showVotingDetails;
const SelectShowInvestorVotingDetail = (state) =>
  state.advancedVotingDataSearch.showInvestorVotingDetail;
const SelectSetInvestorVotingDetail = (state) =>
  state.advancedVotingDataSearch.setInvestorVotingDetail;
const SelectShowVoteResults = (state) =>
  state.advancedVotingDataSearch.showVoteResults;
const SelectShowRationale = (state) =>
  state.advancedVotingDataSearch.showRationale;
const SelectShowInternal = (state) =>
  state.advancedVotingDataSearch.showInternal;

const SelectLstMeetingTypes = (state) => state.tools.lstMeetingTypes;
const SelectMeetingTypeSelection = (state) => state.tools.meetingTypeSelection;
const SelectLstIndividualProponent = (state) =>
  state.tools.lstIndividualProponent;
const SelectIndividualProponentSelection = (state) =>
  state.tools.individualProponentSelection;
const SelectLstGroupProponent = (state) => state.tools.lstGroupProponent;
const SelectGroupProponentSelection = (state) =>
  state.tools.groupProponentSelection;
const SelectStartInvCompDate = (state) =>
  state.advancedVotingDataSearch.startInvCompDate;
const SelectEndInvCompDate = (state) =>
  state.advancedVotingDataSearch.endInvCompDate;
const SelectIsInternalUser = (state) =>
  state.advancedVotingDataSearch.isInternalUser;
const SelectIsInvCompDateChecked = (state) => state.tools.isInvCompDateChecked;
const SelectIsProponentGroup = (state) => state.tools.isProponentGroup;
const SelectInvestorid = (state) => state.advancedVotingDataSearch.investorid;

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
const SelectSupportSelection = (state) =>
  state.advancedVotingDataSearch.supportSelection;
// page - advance voting data search
const SelectIsLoadingAdvanceVotingDataSearch = (state) =>
  state.advancedVotingDataSearch.isLoadingAdvanceVotingDataSearch;

const SelectDdlListOfProposalType = (state) =>
  state.advancedVotingDataSearch.ddlListOfProposalType;
const SelectDdlSpecificActivistActionNewsSelection = (state) =>
  state.myAlert.ddlSpecificActivistActionNewsSelection;
const SelectSetDDLProposalCategory = (state) =>
  state.advancedVotingDataSearch.SetDDLProposalCategory;
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
const selectInvListRegeionAndCountries = (state) =>
  state.dashboard.invListRegeionAndCountries;
const selectInvTxtMarketCapMinRange = (state) =>
  state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) =>
  state.dashboard.invTxtMarketCapMaxRange;
// AUM ($bn)
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) =>
  state.dashboard.aumCategorySelection;

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
  // page - advance voting data search
  isLoadingAdvanceVotingDataSearch:
    SelectIsLoadingAdvanceVotingDataSearch(state),

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
  lstVoteCast: SelectLstVoteCast(state),
  voteCastSelection: SelectVoteCastSelection(state),
  lstSupport: SelectLstSupport(state),
  supportSelection: SelectSupportSelection(state),
  supportFrom: SelectSupportFrom(state),
  supportTo: SelectSupportTo(state),
  outputFieldSelection: SelectOutputFieldSelection(state),
  lstOutputField: SelectLstOutputField(state),
  resolutionTypeSelection: SelectResolutionTypeSelection(state),
  lstResolutionType: SelectLstResolutionType(state),
  lstAdvancedVotingDataSearch: SelectLstAdvancedVotingDataSearch(state),
  lstManagementRecc: SelectLstManagementRecc(state),
  managementReccSelection: SelectManagementReccSelection(state),
  ddlAdvanceVotingDataFunds: SelectDdlAdvanceVotingDataFunds(state),
  ddlAdvanceVotingDataFundSelection:
    SelectDdlAdvanceVotingDataFundSelection(state),
  lstMeetingTypes: SelectLstMeetingTypes(state),
  meetingTypeSelection: SelectMeetingTypeSelection(state),
  lstIndividualProponent: SelectLstIndividualProponent(state),
  individualProponentSelection: SelectIndividualProponentSelection(state),
  lstGroupProponent: SelectLstGroupProponent(state),
  groupProponentSelection: SelectGroupProponentSelection(state),
  startInvCompDate: SelectStartInvCompDate(state),
  endInvCompDate: SelectEndInvCompDate(state),
  isSupportChecked: SelectIsSupportChecked(state),
  isInvCompDateChecked: SelectIsInvCompDateChecked(state),
  isProponentGroup: SelectIsProponentGroup(state),
  userMessage: SelectUserMessage(state),
  investorid: SelectInvestorid(state),
  isInternalUser: SelectIsInternalUser(state),
  showVotingDetails: SelectShowVotingDetails(state),
  showInvestorVotingDetail: SelectShowInvestorVotingDetail(state),
  showVoteResults: SelectShowVoteResults(state),
  showRationale: SelectShowRationale(state),
  showInternal: SelectShowInternal(state),
  setInvestorVotingDetail: SelectSetInvestorVotingDetail(state),

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

  // My Alert slice
  ddlListOfProposalType: SelectDdlListOfProposalType(state),
  ddlSpecificActivistActionNewsSelection:
    SelectDdlSpecificActivistActionNewsSelection(state),
  SetDDLProposalCategory: SelectSetDDLProposalCategory(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state),
  //default selection tree view
  listDefaultInvestorTypeAndSubtype:
    selectListDefaultInvestorTypeAndSubtype(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries:
    selectDefaultPiListSectorsAndIndustries(state),
  invListRegeionAndCountries: selectInvListRegeionAndCountries(state),
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),
  // AUM ($bn)
  listAumCategory: selectListAumCategory(state),
  aumCategorySelection: selectAumCategorySelection(state),
});

const mapDispatchToProps = {
  // Title slice
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,

  // Filter - Tool Slice
  handleResetAdvancedVotingDataSearch,
  getDefaultPeerGroupDataReq,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  handleProponentGroupsearch,
  getAllMeetingTypeReq,
  handleMeetingTypeSelection,
  handleFundNameSelection,
  handleClearResult,
  handleIsInvCompDateChecked,
  handleIsSupportChecked,
  handleSponsorSelection,
  handleGroupProponentSelection,
  handleStartInvCompDateSelection,
  handleSupportFromChange,
  handleSupportToChange,
  handleOutputFieldSelection,
  handleEndInvCompDateSelection,
  handleIndividualProponentSelection,
  handleInvestorSearchSelectionInvComp,
  handleComapnySearchSelectionInvComp,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleResetInvestorComparatorTool,
  resolutionsByInvestorFilterReq,
  handlequickSearchReq,
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
  getAumCategorylistReq,
  handleAumCategorySelection,
  handleSupportSelection,
  // Result - Advanced Votinf data search Slice
  advancedVotingdataSearchReq,
  getListProposalsAndCategoriesReq,
  ResetInvestorSearchOptionSelection,
  handleResetAdvancedVotingDataSearchSliceFilter,

  // slice - advance voting
  getAdvanceVotingDataFundnameReq,
  getVoteCastReq,
  getSupportReq,
  getOutputFieldReq,
  getManagementReccReq,
  handleManagementRecc,
  handleVoteCastSelection,
  handleResolutionTypeSelection,
  handleUpdateDataFromQueryString,
  isCurrentInternalUserReq,
  handleResetOnSearchClick,

  // My Alert - slice
  handleOnChangeDdlSpecificNews,
  getActivismNewsAlertsReq,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleUpdateDataFilters,
  // save search
  userSearchFilter_CreateReq,
  userSearchFilter_UpdateReq,
  userSearchFilter_DeleteReq,
  userSearchFilter_GetReq,
  handleSaveSearchTextboxValue,
  handleShow_SaveThisSearch_Modal,
  handleSetSaveSearchedDDLSelection,
};

AdvancedVotingDataSearchContainer.propTypes = {
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
  isLoadingAdvanceVotingDataSearch: PropTypes.bool,
  ddlSpecificActivistActionNewsSelection: PropTypes.array,
  ddlListOfProposalType: PropTypes.array,
};

AdvancedVotingDataSearchContainer.defaultProps = {
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
  isLoadingAdvanceVotingDataSearch: true,
  ddlListOfProposalType: [],
  ddlSpecificActivistActionNewsSelection: [],
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdvancedVotingDataSearchContainer)
);
