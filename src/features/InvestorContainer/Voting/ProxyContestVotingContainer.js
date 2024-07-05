import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import qs from 'qs';
import InvestorVotingProxyContest from '../../../components/Investor/InvestorVoting/InvestorVotingProxyContest';
import { getProcedureRunningEstimateTimeReq, handleResetLoader } from '../../General/TitleSlice';
import {
  getDissidentVotingByInvestorReq,
  getSupportByDissidentReq,
  getProxyContestsChartDataReq,
  handleClearFilterResult,
  handleGlobleResetProxyContestVoting
} from './ProxyContestVotingSlice';
import {
  handleOnChangeDDLSettlements,
  handleOnChangeDDLIISCardRecommendation,
  handleOnChangeDDLGLCardRecommendation,
  handleDesiredOutcomeChecked,
} from '../../ToolsContainer/Voting/ToolsDissidentVotingSummarySlice';
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
  handleReset,
  handleResetCompnaySelections,
  handleResetInvestorSelections,
  ResetInvestorSearchOptionSelection,
} from '../../DashboardContainer/DashboardSlice';
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
  handleInvestorComparatorSelection,
  resolutionSearchByInvestorReq,
  handleCloseInvestorDetails,
  handleCloseVoringDetails,
  handleDissidentVotingSelection
} from '../../ToolsContainer/ToolsSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const ProxyContestVotingContainer = ({
  location,
  children,
  getAllMeetingTypeReq,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  getDefaultPeerGroupDataReq,
  companySearchOptionSelection,
  investorSearchOptionsSelection,
  getCompanySearchOptions,
  piListOfIndices,
  allListOfExchange,
  listAIPeerGroup,
  allCountriesAndRegions,
  listInvestorTypeAndSubtypeReq,
  piListSectorsAndIndustries,
  getCurrentShareholderReq,
  handleGlobleResetProxyContestVoting,
  handleResetLoader,
  isLoadingInvestorVotingProxyContestData,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
  handleDissidentVotingSelection,
  handleOnChangeDDLIISCardRecommendation,
  handleOnChangeDDLGLCardRecommendation,
  handleDesiredOutcomeChecked,
  startInvCompDate,
  endInvCompDate,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [invId, SetInvestorId] = useState(query.investor);
  if (!query.investor || query.investor === 'undefined' || query.investor === undefined || query.investor === 'null') {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    async function getNewsAccess() {
      handleResetLoader();
      getAllMeetingTypeReq();
      getAllIndividualProponentReq();
      getAllGroupProponentReq();
      handleDissidentVotingSelection();
    }
    getNewsAccess();
  }, [handleResetLoader, getAllMeetingTypeReq, getAllIndividualProponentReq, getAllGroupProponentReq]);

  const data = localStorage.getItem('dissidentVotingTools');
  let startDates;
  let endDates;
  useEffect(() => {
    async function getData() {
      if (data !== null) {
        const filterData = JSON.parse(data);
        startDates = new Date(filterData.startDate);
        endDates = new Date(filterData.endDate);
        await handleDesiredOutcomeChecked(filterData.desiredOutcome);
        await handleOnChangeDDLIISCardRecommendation(filterData.issCard);
        await handleOnChangeDDLGLCardRecommendation(filterData.glCard);
        await props.handleStartInvCompDateSelection(startDates);
        await props.handleEndInvCompDateSelection(endDates);
        if (filterData.isProponentGroup) {
          await props.handleIndividualProponentSelection(filterData.individualProponentSelection);
        } else {
          await props.handleIndividualProponentSelection(filterData.groupProponentSelection);
        }
        await props.handleOnChangeDDLSettlements(filterData.settlements);
      }
    }
    getData();
  }, [handleOnChangeDDLGLCardRecommendation,
    handleOnChangeDDLIISCardRecommendation,
    handleDesiredOutcomeChecked,
    props.handleOnChangeDDLSettlements,
    props.handleIndividualProponentSelection,
    props.handleStartInvCompDateSelection,
    props.handleEndInvCompDateSelection
  ]);
  useEffect(() => {
    handleResetLoader();
    handleGlobleResetProxyContestVoting();
    function getData() {
      piListOfIndices();
      allListOfExchange();
      listAIPeerGroup();
      allCountriesAndRegions();
      listInvestorTypeAndSubtypeReq();
      piListSectorsAndIndustries();
      getCompanySearchOptions();
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
    handleGlobleResetProxyContestVoting,
    handleResetLoader,
  ]);

  useEffect(() => {
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      SetInvestorId(investorId);
    }
  }, [distinctProfile, query.investor]);

  return (
    <ErrorBoundary>
      <InvestorVotingProxyContest
        {...props}
        companySearchOptionSelection={companySearchOptionSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        handleResetLoader={handleResetLoader}
        invId={invId}
        isLoadingInvestorVotingProxyContestData={isLoadingInvestorVotingProxyContestData}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
        distinctProfile={distinctProfile}
        handleOnChangeDDLGLCardRecommendation={handleOnChangeDDLGLCardRecommendation}
        handleOnChangeDDLIISCardRecommendation={handleOnChangeDDLIISCardRecommendation}
        handleDesiredOutcomeChecked={handleDesiredOutcomeChecked}
        startInvCompDate={startInvCompDate}
        endInvCompDate={endInvCompDate}
      />
    </ErrorBoundary>
  );
};

// #region states assign
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
const selectShowIndividualOption = (state) => state.dashboard.showIndividualOption;
const selectBulkCompanySelectRecordset = (state) => state.dashboard.freeSearchRecordset;
const selectListOfIndicesRecordSet = (state) => state.dashboard.piListIndices;
const selectIndexSelection = (state) => state.dashboard.indexSelection;
const selectListOfExchange = (state) => state.dashboard.listExchange;
const selectExchangeSelection = (state) => state.dashboard.exchangeSelection;
const selectAIPeerGroup = (state) => state.dashboard.listAIPeersGroups;
const selectAIPeerGroupSelection = (state) => state.dashboard.aiPeerGroupSelection;
const selectListMarketCap = (state) => state.dashboard.listMarketCap;
const selectMarketCapSelection = (state) => state.dashboard.marketCapSelection;
const selectTextMarketCapMinRange = (state) => state.dashboard.txtMarketCapMinRange;
const selectTextMarketCapMaxRange = (state) => state.dashboard.txtMarketCapMaxRange;
const selectCompanyLocationSelection = (state) => state.dashboard.companyLocationSelection;
const selectListRegeionAndCountries = (state) => state.dashboard.listRegeionAndCountries;
const selectPIListSectorsAndIndustries = (state) => state.dashboard.piListSectorsAndIndustries;
const selectCompanySearchOptionSelection = (state) => state.dashboard.companySearchOptionSelection;
const selectCompanySearchOptions = (state) => state.dashboard.companySearchOptions;
const selectTextSaveCurrentList = (state) => state.dashboard.txtSaveCurrentList;
const selectSaveCurrentListButtonText = (state) => state.dashboard.saveCurrentListButtonText;
const selectCompanySingleSelection = (state) => state.dashboard.companySingleSelection;

// title slice
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;

// selection - company & investor search
const SelectInvCompCompanyPeerGroupSelection = (state) => state.tools.invCompCompanyPeerGroupSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) => state.tools.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) => state.tools.isResetInvestorPeerGroupSelection;
const SelectInvCompInvestorPeerGroupSelection = (state) => state.tools.invCompInvestorPeerGroupSelection;

// tools slice
const SelecIsLoading = (state) => state.tools.isLoading;
const SelectLstResolutionsByInvestorFilter = (state) => state.tools.lstResolutionsByInvestorFilter;
const SelectLstResolutionsByInvestorFilterFullData = (state) => state.tools.lstResolutionsByInvestorFilterFullData;
const SelectCurrentResolutionTypeSelection = (state) => state.tools.currentResolutionTypeSelection;

// Dissident - Additional filters
const SelectLstSettlements = (state) => state.toolsDissidentVotingSummary.lstSettlements;
const SelectLstSettlementSelection = (state) => state.toolsDissidentVotingSummary.lstSettlementSelection;
const SelectLstIISCardRecommendation = (state) => state.toolsDissidentVotingSummary.lstIISCardRecommendation;
const SelectLstIISCardRecommendationSelection = (state) =>
  state.toolsDissidentVotingSummary.lstIISCardRecommendationSelection;
const SelectLstGLCardRecommendation = (state) => state.toolsDissidentVotingSummary.lstGLCardRecommendation;
const SelectLstGLCardRecommendationSelection = (state) =>
  state.toolsDissidentVotingSummary.lstGLCardRecommendationSelection;
const SelectIsCheckedDesiredOutcomeAll = (state) => state.toolsDissidentVotingSummary.isCheckedDesiredOutcomeAll;
const SelectIsCheckedDesiredOutcomeShortSlate = (state) =>
  state.toolsDissidentVotingSummary.isCheckedDesiredOutcomeShortSlate;
const SelectIsCheckedDesiredOutcomeBoardControl = (state) =>
  state.toolsDissidentVotingSummary.isCheckedDesiredOutcomeBoardControl;
const SelectDesiredOutcomeSelection = (state) => state.toolsDissidentVotingSummary.desiredOutcomeSelection;

// proxy Contest voting slice
const SelectLstSupportbyDissident = (state) => state.proxyContestVoting.lstSupportByDissident;
const SelectLstVotingAtProxyContestsData = (state) => state.proxyContestVoting.lstVotingAtProxyContestsData;
const SelectVotingSummaryAtProxyContests = (state) => state.proxyContestVoting.votingSummaryAtProxyContests;
const SelectlstProxyContestChartData = (state) => state.proxyContestVoting.lstProxyContestChartData;
const SelectIsLoadingInvestorVotingProxyContestData = (state) =>
  state.proxyContestVoting.isLoadingInvestorVotingProxyContestData;
const SelectIsTrialStatusForProxyContestVotingData = (state) =>
  state.proxyContestVoting.isTrialStatusForProxyContestVotingData;
const SelectUserMessage = (state) => state.proxyContestVoting.userMessage;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
// #endregion
// #region
const selectIsStartSearch = (state) => state.invVotingOverview.isStartSearch;
// #endregion

//default selection tree view
const selectListDefaultInvestorTypeAndSubtype = (state) => state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) => state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) => state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) => state.dashboard.defaultPiListSectorsAndIndustries;

const mapStateToProps = (state) => ({
  // proxy Contest voting slice
  lstSupportByDissident: SelectLstSupportbyDissident(state),
  lstVotingAtProxyContestsData: SelectLstVotingAtProxyContestsData(state),
  votingSummaryAtProxyContests: SelectVotingSummaryAtProxyContests(state),
  lstProxyContestChartData: SelectlstProxyContestChartData(state),
  isLoadingInvestorVotingProxyContestData: SelectIsLoadingInvestorVotingProxyContestData(state),
  isTrialStatusForProxyContestVotingData: SelectIsTrialStatusForProxyContestVotingData(state),
  userMessage: SelectUserMessage(state),

  // Dissident - Additional filters
  lstSettlements: SelectLstSettlements(state),
  lstSettlementSelection: SelectLstSettlementSelection(state),
  lstIISCardRecommendation: SelectLstIISCardRecommendation(state),
  lstIISCardRecommendationSelection: SelectLstIISCardRecommendationSelection(state),
  lstGLCardRecommendation: SelectLstGLCardRecommendation(state),
  lstGLCardRecommendationSelection: SelectLstGLCardRecommendationSelection(state),
  isCheckedDesiredOutcomeAll: SelectIsCheckedDesiredOutcomeAll(state),
  isCheckedDesiredOutcomeShortSlate: SelectIsCheckedDesiredOutcomeShortSlate(state),
  isCheckedDesiredOutcomeBoardControl: SelectIsCheckedDesiredOutcomeBoardControl(state),
  desiredOutcomeSelection: SelectDesiredOutcomeSelection(state),

  // tools slice
  isLoading: SelecIsLoading(state),
  lstResolutionsByInvestorFilter: SelectLstResolutionsByInvestorFilter(state),
  lstResolutionsByInvestorFilterFullData: SelectLstResolutionsByInvestorFilterFullData(state),
  currentResolutionTypeSelection: SelectCurrentResolutionTypeSelection(state),

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
  invCompCompanyPeerGroupSelection: SelectInvCompCompanyPeerGroupSelection(state),
  isResetCompanyPeerGroupSelection: SelectIsResetCompanyPeerGroupSelection(state),
  invCompInvestorPeerGroupSelection: SelectInvCompInvestorPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection: SelectIsResetInvestorPeerGroupSelection(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
  isStartSearch: selectIsStartSearch(state),

  //default selection tree view
  listDefaultInvestorTypeAndSubtype: selectListDefaultInvestorTypeAndSubtype(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries: selectDefaultPiListSectorsAndIndustries(state),
});

const mapDispatchToProps = {
  // filters - Tools DissidentVoting Summary Slice
  handleOnChangeDDLSettlements,
  handleOnChangeDDLIISCardRecommendation,
  handleOnChangeDDLGLCardRecommendation,
  handleDesiredOutcomeChecked,

  // Title slice
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
  handleInvestorComparatorSelection,
  resolutionSearchByInvestorReq,
  handleCloseInvestorDetails,
  handleCloseVoringDetails,

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

  // Proxy Contest Voting slice
  getDissidentVotingByInvestorReq,
  getSupportByDissidentReq,
  getProxyContestsChartDataReq,
  handleClearFilterResult,
  handleGlobleResetProxyContestVoting,
  handleReset,
  handleResetCompnaySelections,
  handleResetInvestorSelections,
  ResetInvestorSearchOptionSelection,
  handleDissidentVotingSelection,
};

ProxyContestVotingContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProxyContestVotingContainer));
