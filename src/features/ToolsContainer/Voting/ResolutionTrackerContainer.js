import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResolutionTrackerTool from '../../../components/Tools/VotingTools/ResolutionTracker/ResolutionTrackerTool';
import saveSearchConst from '../../../constants/SaveSearchToolConstants';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
  handlePDFListItems,
  handlePDFMenuShow,
  handlePDFDownloadLoader,
  handleGeneratePDF,
  handlePDFDownloadCancelClick,
} from '../../General/TitleSlice';
import {
  resolutionsByInvestorTrackerFilterReq,
  handleInvestorTrackerOptionsSelection,
  handleCloseResultsDetail,
  investorTrackerResultDetailsReq,
  investorTrackerResultDetailsFullDataReq,
  historicalTrendsChartDataReq,
  historicalTrendsChartDataYTDReq,
  historicalTrendsChartProxySeasonDataReq,
  handleResetHistoricalTrendsSelection,
  handleResetHistoricalDetailsSelection,
  resolutionFilterByTotalVotesAnalysisYTDReq,
  resolutionFilterByTotalProxySeasonVotesAnalysisReq,
  resolutionFilterByTotalVotesAnalysisReq,
  resolutionTrackerFilterByHistoricalTrendsReq,
  handleOnClickIsSelectedFullYearData,
  handleOnChangedCalculationMethod,
  handleResetInvestorTrackerSearch,
  handleResetResolutionTrackerTool,
  handledChangeResolutionType,
} from './ToolsResolutionTrackerSlice';
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
  handleClearResult,
  getResolutionsTypeIdByNameReq,
  getTokenDecode,
  handleResetFilter_ResolutionTrackerTool,
  handleUpdateDataResolutionTrackerFilters,
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
import { GetPageAccess } from '../../../utils/tools-util';
import { VOTING } from '../../../constants/ProductConstants';
import {
  TokenDecodeForProductStatus,
  GetDefaultStartAndEndDate,
} from '../../../utils/general-util';
import InvestorComparatorConstant from '../../../constants/InvestorComparatorConstant';
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

const ResolutionTrackerContainer = ({
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
  trialUserDisableDownload,
  handleResetResolutionTrackerTool,
  handleResetFilter_ResolutionTrackerTool,
  lstResolutionType,
  isProponentGroup,
  // save search
  saveSearchTextboxValue,
  isShow_SaveThisSearch_Modal,
  saveSearch_list,
  saveSearchDDLList,
  saveSearchedDDLSelection,
  ...props
}) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [status, setStatus] = useState(null);

  const getStatus = async () => {
    const resp = await TokenDecodeForProductStatus(VOTING);
    setStatus(resp);
  };

  if (query.print) {
    useEffect(() => {
      const companySearchId =
        query.companySearchId !== 'null' ? query.companySearchId : null;
      const start_date =
        query.startDate !== 'null'
          ? query.startDate.replaceAll('_', ' ').replaceAll('"', '')
          : null;
      const end_date =
        query.endDate !== 'null'
          ? query.endDate.replaceAll('_', ' ').replaceAll('"', '')
          : null;
      const data = {
        companySearchId: companySearchId !== null ? companySearchId : null,
        investorSearchId:
          props.invCompInvestorPeerGroupSelection !== undefined
            ? props.invCompInvestorPeerGroupSelection.value
            : null,
        meetingType:
          query.meetingType !== 'null'
            ? query.meetingType.replaceAll('"', '')
            : '',
        sponsor:
          query.proposalSponsor !== 'undefined' ? query.proposalSponsor : null,
        startDate: start_date !== 'null' ? new Date(start_date) : null,
        endDate: end_date !== 'null' ? new Date(end_date) : null,
        proponent:
          query.proponent !== 'null' ? query.proponent.replaceAll('"', '') : '',
      };
      props.resolutionsByInvestorTrackerFilterReq(data);
    }, [query.print]);
    useEffect(() => {
      if (
        props.lstResolutionByInvestorfilterData &&
        props.lstResolutionByInvestorfilterData.length > 0
      ) {
        props.handleInvestorTrackerOptionsSelection(
          query.tblLavel,
          query.tblKeyVal.replaceAll('"', '').replaceAll('_', ' '),
          query.tblinvId,
          query.tblclickFor
        );
      }
    }, [
      query.tblLavel,
      query.tblKeyVal,
      query.tblinvId,
      query.tblclickFor,
      props.lstResolutionByInvestorfilterData.length,
    ]);

    async function getPDFData() {
      const level = query.level;
      const proposalType = query.proposalType;
      const yearLevel = Number(query.yearLevel);
      const tblData =
        query.tblData !== null ? query.tblData.replaceAll('_', ' ') : null;
      const obj = {
        lavel: Number(level),
        proposalType: proposalType.replaceAll('_', ' '),
      };
      props
        .getResolutionsTypeIdByNameReq(obj)
        .then(async (res) => {
          const companySearchId =
            query.companySearchId !== 'null' ? query.companySearchId : null;
          const start_date =
            query.startDate !== 'null'
              ? query.startDate.replaceAll('_', ' ').replaceAll('"', '')
              : null;
          const end_date =
            query.endDate !== 'null'
              ? query.endDate.replaceAll('_', ' ').replaceAll('"', '')
              : null;
          const chartData = {
            ProposalType:
              res.payload !== false &&
              res.payload.req.lavel ===
                InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE
                ? res.payload.response
                : null,
            ProposalTopLevel:
              res.payload !== false &&
              res.payload.req.lavel ===
                InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL
                ? res.payload.response
                : null,
            ProposalSubLavel:
              res.payload !== false &&
              res.payload.req.lavel ===
                InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL
                ? res.payload.response
                : null,
            MeetingType:
              query.meetingType !== 'null'
                ? query.meetingType.replaceAll('"', '')
                : '',
            Proponent:
              query.proponent !== 'null'
                ? query.proponent.replaceAll('"', '')
                : '',
            ProposalSponsor:
              query.proposalSponsor !== 'undefined'
                ? query.proposalSponsor
                : null,
            companySearchId: companySearchId !== null ? companySearchId : null,
            management_recc: '',
            outcome: '',
          };
          await props.historicalTrendsChartProxySeasonDataReq(chartData);
          await props.historicalTrendsChartDataYTDReq(chartData);
          await props.historicalTrendsChartDataReq(chartData);

          await props.resolutionFilterByTotalProxySeasonVotesAnalysisReq(
            chartData
          );
          await props.resolutionFilterByTotalVotesAnalysisYTDReq(chartData);
          await props.resolutionFilterByTotalVotesAnalysisReq(chartData);
        })
        .catch((e) => console.log('error', e));
      const tblObj = {
        label: tblData,
        value: tblData,
      };
      await props.handleOnClickIsSelectedFullYearData(yearLevel);
      await props.handleOnChangedCalculationMethod(tblObj);
    }
    useEffect(() => {
      const abortController = new AbortController();
      const level = query.level;
      const proposalType = query.proposalType;
      const yearLevel = Number(query.yearLevel);
      const tblData =
        query.tblData !== null ? query.tblData.replaceAll('_', ' ') : null;
      const tblObj = {
        label: tblData,
        value: tblData,
      };
      getPDFData();
      return function cleanup() {
        abortController.abort();
      };
    }, [query.print, query.level, query.proposalType]);
    useEffect(() => {
      const yearLevel = Number(query.yearLevel);
      const tblData =
        query.tblData !== null ? query.tblData.replaceAll('_', ' ') : null;
      const tblObj = {
        label: tblData,
        value: tblData,
      };
      props.handleOnClickIsSelectedFullYearData(yearLevel);
      props.handleOnChangedCalculationMethod(tblObj);
    }, [
      query.yearLevel,
      query.tblData,
      props.lstHistoricalChartData,
      props.lstHistoricalAnalysisChartProxySeasonData,
      props.historicalTrendsVotesProxySeasonAnalysis,
    ]);
  }

  if (!query.print) {
    useEffect(() => {
      const abortController = new AbortController();
      handleResetFilter_ResolutionTrackerTool();
      handleResetResolutionTrackerTool();
      return function cleanup() {
        abortController.abort();
      };
    }, [
      handleResetResolutionTrackerTool,
      handleResetFilter_ResolutionTrackerTool,
    ]);

    useEffect(() => {
      let validation = false;
      let pageAccess = false;
      const abortController = new AbortController();

      async function getNewsAccess() {
        getAllMeetingTypeReq();
        getAllIndividualProponentReq();
        getAllGroupProponentReq();
      }
      async function getAccess() {
        await getTokenDecode();
        pageAccess = await GetPageAccess(token.MemberShip, VOTING);
      }
      async function prepAccess() {
        await getAccess();
        validation = true;
        await getNewsAccess();
        await getStatus();
      }
      prepAccess();
      return function cleanup() {
        abortController.abort();
      };
    }, [
      getAllMeetingTypeReq,
      getAllIndividualProponentReq,
      getAllGroupProponentReq,
    ]);

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
          inve: investorSearchOptionsSelection,
        };
        getDefaultPeerGroupDataReq(optionData);
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
    ]);
  }

  // #region Saved search

  useEffect(() => {
    props.userSearchFilter_GetReq({
      filter_type_id: saveSearchConst.RESOLUTION_TRACKER_TOOL,
    });
  }, []);

  const onSavedSearches_btnApply = useCallback(async () => {
    const data = saveSearch_list.filter(
      (x) => x.filter_id === saveSearchedDDLSelection.value
    );
    if (data.length > 0) {
      const filter_definition = JSON.parse(data[0].filter_definition);
      const cmp_search_id = filter_definition.companySearchId;
      await props.handleUpdateDataResolutionTrackerFilters(filter_definition);
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
      isProponentGroup: isProponentGroup,
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
      meetingTypeSelection: props.meetingTypeSelection,
      sponsorSelection: props.sponsorSelection,
    };
    return data;
  }
  const onSavedSearches_Create = useCallback(async () => {
    const data = filterDataObj();
    const obj = {
      filter_name: saveSearchTextboxValue,
      filter_definition: JSON.stringify(data),
      filter_type_id: saveSearchConst.RESOLUTION_TRACKER_TOOL,
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
        filter_type_id: saveSearchConst.RESOLUTION_TRACKER_TOOL,
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
      filter_type_id: saveSearchConst.RESOLUTION_TRACKER_TOOL,
    };
    await props.userSearchFilter_DeleteReq(data);
  }, [props]);

  // #endregion

  return (
    <ErrorBoundary>
      <ResolutionTrackerTool
        {...props}
        companySearchOptionSelection={companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        trialUserDisableDownload={trialUserDisableDownload}
        status={status}
        lstResolutionType={lstResolutionType}
        isProponentGroup={isProponentGroup}
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

// Tools - investor tracker
const SelectIsResolutionByInvestorFilterLoading = (state) =>
  state.toolsResolutionTracker.isResolutionByInvestorFilterLoading;
const SelectLstResByInvestorFilter = (state) =>
  state.toolsResolutionTracker.lstResolutionByInvestorfilterData;
const SelectLstResByInvestorFilterFullData = (state) =>
  state.toolsResolutionTracker.lstResolutionByInvestorFilterFullData;
const SelectCurrentResolutionTypeSelection = (state) =>
  state.toolsResolutionTracker.currentResolutionTypeSelection;

// Tools - Result Details
const SelectIsShowResultDetails = (state) =>
  state.toolsResolutionTracker.isShowResultDetails;
const SelectLstResultDetails = (state) =>
  state.toolsResolutionTracker.lstResultDetails;
const SelectLstResultDetailsFullDataForExcel = (state) =>
  state.toolsResolutionTracker.lstResultDetailsFullDataForExcel;
const SelectIsLoadingResultDetailsData = (state) =>
  state.toolsResolutionTracker.isLoadingResultDetailsData;
const SelectIsLoadingResultDetailsFullData = (state) =>
  state.toolsResolutionTracker.isLoadingResultDetailsFullData;

// Tools - Historical Trends
const SelectDdlCalculationMethod = (state) =>
  state.toolsResolutionTracker.ddlCalculationMethod;
const SelectDdlCalculationMethodSelection = (state) =>
  state.toolsResolutionTracker.ddlCalculationMethodSelection;
const SelectIsShowHistoricalTrends = (state) =>
  state.toolsResolutionTracker.isShowHistoricalTrends;
const SelectIsLoadingHistoricalTrendsData = (state) =>
  state.toolsResolutionTracker.isLoadingHistoricalTrendsData;
const SelectLstHistoricalChartData = (state) =>
  state.toolsResolutionTracker.lstHistoricalChartData;

const SelectlstHistoricalAnalysisChartData = (state) =>
  state.toolsResolutionTracker.lstHistoricalAnalysisChartData;
const SelectlstHistoricalAnalysisChartDataYTD = (state) =>
  state.toolsResolutionTracker.lstHistoricalAnalysisChartDataYTD;
const SelectlstHistoricalAnalysisChartProxySeasonData = (state) =>
  state.toolsResolutionTracker.lstHistoricalAnalysisChartProxySeasonData;

const SelectLstHistoricalTrendsTotalVotesAnalysis = (state) =>
  state.toolsResolutionTracker.lstHistoricalTrendsTotalVotesAnalysis;
const SelectLstHistoricalTrendsTotalVotesAnalysisSummary = (state) =>
  state.toolsResolutionTracker.lstHistoricalTrendsTotalVotesAnalysisSummary;
const SelectLstHistoricalTrendsTotalVotesAnalysisDetails = (state) =>
  state.toolsResolutionTracker.lstHistoricalTrendsTotalVotesAnalysisDetails;
const SelectIsSelectedFullYearData = (state) =>
  state.toolsResolutionTracker.isSelectedFullYearData;
const SelectIsSelectedYearToDateData = (state) =>
  state.toolsResolutionTracker.isSelectedYearToDateData;
const SelectIsSelectedProxySeasonData = (state) =>
  state.toolsResolutionTracker.isSelectedProxySeasonData;

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
const selectpdfDownloadLoader = (state) => state.headerTitle.pdfDownloadLoader;
const selectgeneratePDF = (state) => state.headerTitle.generatePDF;
const selectPdfDownloadNotification = (state) =>
  state.headerTitle.pdfDownloadNotification;
const selectPdfListItems = (state) => state.headerTitle.pdfListItems;
const selectpdfDownloadCancelBtn = (state) =>
  state.headerTitle.pdfDownloadCancelBtn;
const selectPDFMenuShow = (state) => state.headerTitle.pdfMenuShow;
const selectLstResolutionType = (state) =>
  state.toolsResolutionTracker.lstResolutionType;
const selectResolutionChartLevel = (state) =>
  state.toolsResolutionTracker.resolutionChartLevel;
const selectResolutionDdlData = (state) =>
  state.toolsResolutionTracker.resolutionDdlData;
const selectLstHistoricalAnalysisChartProxySeasonData = (state) =>
  state.toolsResolutionTracker.lstHistoricalAnalysisChartProxySeasonData;
const selectHistoricalTrendsVotesProxySeasonAnalysis = (state) =>
  state.toolsResolutionTracker.historicalTrendsVotesProxySeasonAnalysis;
const selectResolutionMultiTableData = (state) =>
  state.toolsResolutionTracker.resolutionMultiTableData;

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
  // Tools - General
  resolutionMultiTableData: selectResolutionMultiTableData(state),
  lstHistoricalAnalysisChartProxySeasonData:
    selectLstHistoricalAnalysisChartProxySeasonData(state),
  historicalTrendsVotesProxySeasonAnalysis:
    selectHistoricalTrendsVotesProxySeasonAnalysis(state),
  selectedInvestorDetailsProposalTypeId:
    SelectSelectedInvestorDetailsProposalTypeId(state),
  selectedInvestorDetailsProposalSubLevelTypeId:
    SelectSelectedInvestorDetailsProposalSubLevelTypeId(state),
  selectedInvestorDetailsProposalTopLevelTypeId:
    SelectSelectedInvestorDetailsProposalTopLevelTypeId(state),

  // Tools Investor tracker
  isResolutionByInvestorFilterLoading:
    SelectIsResolutionByInvestorFilterLoading(state),
  lstResolutionByInvestorfilterData: SelectLstResByInvestorFilter(state),
  lstResolutionByInvestorFilterFullData:
    SelectLstResByInvestorFilterFullData(state),
  currentResolutionTypeSelection: SelectCurrentResolutionTypeSelection(state),

  // Tools - Historical Trends
  ddlCalculationMethod: SelectDdlCalculationMethod(state),
  ddlCalculationMethodSelection: SelectDdlCalculationMethodSelection(state),
  isShowHistoricalTrends: SelectIsShowHistoricalTrends(state),
  isLoadingHistoricalTrendsData: SelectIsLoadingHistoricalTrendsData(state),
  lstHistoricalChartData: SelectLstHistoricalChartData(state),

  lstHistoricalAnalysisChartData: SelectlstHistoricalAnalysisChartData(state),
  lstHistoricalAnalysisChartDataYTD:
    SelectlstHistoricalAnalysisChartDataYTD(state),

  lstHistoricalTrendsTotalVotesAnalysis:
    SelectLstHistoricalTrendsTotalVotesAnalysis(state),
  lstHistoricalTrendsTotalVotesAnalysisSummary:
    SelectLstHistoricalTrendsTotalVotesAnalysisSummary(state),
  lstHistoricalTrendsTotalVotesAnalysisDetails:
    SelectLstHistoricalTrendsTotalVotesAnalysisDetails(state),
  isSelectedFullYearData: SelectIsSelectedFullYearData(state),
  isSelectedYearToDateData: SelectIsSelectedYearToDateData(state),
  isSelectedProxySeasonData: SelectIsSelectedProxySeasonData(state),

  // Tools - Result Details
  isShowResultDetails: SelectIsShowResultDetails(state),
  lstResultDetails: SelectLstResultDetails(state),
  lstResultDetailsFullDataForExcel:
    SelectLstResultDetailsFullDataForExcel(state),
  isLoadingResultDetailsData: SelectIsLoadingResultDetailsData(state),
  isLoadingResultDetailsFullData: SelectIsLoadingResultDetailsFullData(state),
  generatePDF: selectgeneratePDF(state),
  pdfDownloadLoader: selectpdfDownloadLoader(state),
  pdfDownloadNotification: selectPdfDownloadNotification(state),
  pdfListItems: selectPdfListItems(state),
  pdfDownloadCancelBtn: selectpdfDownloadCancelBtn(state),
  pdfMenuShow: selectPDFMenuShow(state),

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
  lstResolutionType: selectLstResolutionType(state),
  resolutionChartLevel: selectResolutionChartLevel(state),
  resolutionDdlData: selectResolutionDdlData(state),
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

  // Tools - Investor tracker
  resolutionsByInvestorTrackerFilterReq,
  handleInvestorTrackerOptionsSelection,
  handleResetInvestorTrackerSearch,

  // Tools - More details
  handleCloseResultsDetail,
  investorTrackerResultDetailsReq,
  investorTrackerResultDetailsFullDataReq,
  handleResetHistoricalDetailsSelection,

  // Tools - Historical Trends
  historicalTrendsChartDataReq,
  historicalTrendsChartDataYTDReq,
  historicalTrendsChartProxySeasonDataReq,
  handleResetHistoricalTrendsSelection,
  resolutionFilterByTotalVotesAnalysisYTDReq,
  resolutionFilterByTotalProxySeasonVotesAnalysisReq,
  resolutionTrackerFilterByHistoricalTrendsReq,
  resolutionFilterByTotalVotesAnalysisReq,
  handleOnClickIsSelectedFullYearData,
  handleOnChangedCalculationMethod,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
  handleResetResolutionTrackerTool,
  handleResetFilter_ResolutionTrackerTool,
  handleUpdateDataResolutionTrackerFilters,
  //pdf

  handlePDFListItems,
  handlePDFMenuShow,
  handlePDFDownloadLoader,
  handleGeneratePDF,
  handlePDFDownloadCancelClick,
  handledChangeResolutionType,
  // save search
  userSearchFilter_CreateReq,
  userSearchFilter_UpdateReq,
  userSearchFilter_DeleteReq,
  userSearchFilter_GetReq,
  handleSaveSearchTextboxValue,
  handleShow_SaveThisSearch_Modal,
  handleSetSaveSearchedDDLSelection,
};

ResolutionTrackerContainer.propTypes = {
  handleResetResolutionTrackerTool: PropTypes.func,
  handleResetFilter_ResolutionTrackerTool: PropTypes.func,
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

ResolutionTrackerContainer.defaultProps = {
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
  handleResetResolutionTrackerTool: () => null,
  handleResetFilter_ResolutionTrackerTool: () => null,
  procedureRunningEstimateTime: undefined,
  companySearchOptionSelection: undefined,
  investorSearchOptionsSelection: undefined,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResolutionTrackerContainer)
);
