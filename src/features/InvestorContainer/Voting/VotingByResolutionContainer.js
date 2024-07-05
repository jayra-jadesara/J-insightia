import React, { useEffect, useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorVotingByProposal from '../../../components/Investor/InvestorVoting/InvestorVotingResolution';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
} from '../../General/TitleSlice';
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
  votingbyproposal_handleIsInvCompDateChecked,
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
} from '../../ToolsContainer/ToolsSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorVotingByProposalContainer = ({
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
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  handleResetLoader,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
  votingbyproposal_isInvCompDateChecked,
  votingbyproposal_handleIsInvCompDateChecked,
  isLoading_InvestorVotingByProposal,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [invId, SetInvestorId] = useState(query.investor);
  const firstLoad = useRef(null);

  if (
    !query.investor ||
    query.investor === 'undefined' ||
    query.investor === undefined ||
    query.investor === 'null'
  ) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

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
    handleResetLoader();
    function getData() {
      piListOfIndices();
      allListOfExchange();
      listAIPeerGroup();
      allCountriesAndRegions();
      listInvestorTypeAndSubtypeReq();
      piListSectorsAndIndustries();
      getCompanySearchOptions();
      getCurrentShareholderReq();
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
    handleResetLoader,
  ]);

  useEffect(() => {
    if (
      query.investor !== undefined &&
      query.investor !== 'undefined' &&
      distinctProfile !== null
    ) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      SetInvestorId(investorId);
    }
  }, [distinctProfile, query.investor]);

  const onSearch = useCallback(
    async (source) => {
      await handleResetLoader();
      await props.handleClearResult();
      await props.handleResetInvestorComparatorTool();
      await getProcedureRunningEstimateTimeReq(
        ProcedureConstant.INVESTOR_COMPARATOR_DATA
      );

      if (query.print) {
        const printPDFData = {
          companySearchId: null,
          investorSearchId: null,
          meetingType: '',
          sponsor: null,
          startDate: null,
          endDate: null,
          proponent: '',
          investor_id: invId,
          cancelToken: source.token,
        };
        await props.resolutionsByInvestorFilterReq(printPDFData);
      } else {
        const data = {
          companySearchId:
            companySearchOptionSelection !== undefined
              ? companySearchOptionSelection.value
              : null,
          investorSearchId: null,
          // props.invCompInvestorPeerGroupSelection !== undefined
          //   ? props.invCompInvestorPeerGroupSelection.value
          //   : null,
          meetingType:
            props.meetingTypeSelection
              ? props.meetingTypeSelection.map((c) => c.value).toString()
              : '',
          sponsor:
            props.sponsorSelection !== undefined
              ? props.sponsorSelection.value
              : '',
          startDate: votingbyproposal_isInvCompDateChecked
            ? props.startInvCompDate
            : null,
          endDate: votingbyproposal_isInvCompDateChecked
            ? props.endInvCompDate
            : null,
          proponent: props.isProponentGroup
            ? props.individualProponentSelection &&
            Array.isArray(props.individualProponentSelection) &&
              props.isProponentGroup
              ? props.individualProponentSelection
                  .map((c) => c.value)
                  .toString()
              : ''
            : props.groupProponentSelection &&
            Array.isArray(props.groupProponentSelection) &&
              props.isProponentGroup === false
            ? props.groupProponentSelection.map((c) => c.value).toString()
            : '',
          investor_id: invId,
          cancelToken: source.token,
        };
        await props.resolutionsByInvestorFilterReq(data);
      }
      firstLoad.current = true;
    },
    [props, companySearchOptionSelection]
  );

  useEffect(() => {
    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    if (firstLoad.current === null) {
      onSearch(source);
    }
    return function cleanup() {
      abortController.abort();
      source.cancel();
    };
  }, [companySearchOptionSelection, invId]);

  return (
    <ErrorBoundary>
      <InvestorVotingByProposal
        children={children}
        {...props}
        handleResetLoader={handleResetLoader}
        companySearchOptionSelection={companySearchOptionSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        invId={invId}
        isLoading={isLoading_InvestorVotingByProposal}
        //
        isInvCompDateChecked={votingbyproposal_isInvCompDateChecked}
        handleIsInvCompDateChecked={votingbyproposal_handleIsInvCompDateChecked}
        onSearch={onSearch}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
        distinctProfile={distinctProfile}
      />
    </ErrorBoundary>
  );
};

// #region States assign
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
const SelectIsInvCompDateChecked = (state) =>
  state.tools.votingbyproposal_isInvCompDateChecked;
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

// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;

// selection - company & investor search
const SelectInvCompCompanyPeerGroupSelection = (state) =>
  state.tools.invCompCompanyPeerGroupSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) =>
  state.tools.isResetCompanyPeerGroupSelection;

// tools slice
const SelecIsLoading = (state) =>
  state.tools.isLoading_InvestorVotingByProposal;
const SelectLstResolutionsByInvestorFilter = (state) =>
  state.tools.lstResolutionsByInvestorFilter;
const SelectLstResolutionsByInvestorFilterFullData = (state) =>
  state.tools.lstResolutionsByInvestorFilterFullData;
const SelectLstExcelDownload_ResolutionsByInvestorFilter = (state) =>
  state.tools.lstExcelDownload_ResolutionsByInvestorFilter;

const SelectCurrentResolutionTypeSelection = (state) =>
  state.tools.currentResolutionTypeSelection;

// voting details
const SelectLtIsShowVotingDetails = (state) => state.tools.isShowVotingDetails;
const SelectLtIsShowInvestorDetails = (state) =>
  state.tools.isShowInvestorDetails;
const SelectLstVotingDetails = (state) => state.tools.lstVotingDetails;
const SelectIsLoadingVotingDetails = (state) =>
  state.tools.isLoadingVotingDetails;
const SelectlstVotingInvestorPower = (state) =>
  state.tools.lstVotingInvestorPower;
const SelectLstVotingPvaImpact = (state) => state.tools.lstVotingPvaImpact;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
// #endregion

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
  // voting details
  isShowVotingDetails: SelectLtIsShowVotingDetails(state),
  isShowInvestorDetails: SelectLtIsShowInvestorDetails(state),
  lstVotingDetails: SelectLstVotingDetails(state),
  isLoadingVotingDetails: SelectIsLoadingVotingDetails(state),
  lstVotingInvestorPower: SelectlstVotingInvestorPower(state),
  lstVotingPvaImpact: SelectLstVotingPvaImpact(state),

  // tools slice
  isLoading_InvestorVotingByProposal: SelecIsLoading(state),
  lstResolutionsByInvestorFilter: SelectLstResolutionsByInvestorFilter(state),
  lstResolutionsByInvestorFilterFullData:
    SelectLstResolutionsByInvestorFilterFullData(state),
  lstExcelDownload_ResolutionsByInvestorFilter:
    SelectLstExcelDownload_ResolutionsByInvestorFilter(state),

  currentResolutionTypeSelection: SelectCurrentResolutionTypeSelection(state),

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
  votingbyproposal_isInvCompDateChecked: SelectIsInvCompDateChecked(state),
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
  invCompCompanyPeerGroupSelection:
    SelectInvCompCompanyPeerGroupSelection(state),
  isResetCompanyPeerGroupSelection:
    SelectIsResetCompanyPeerGroupSelection(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
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
  votingbyproposal_handleIsInvCompDateChecked,
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
  handleReset,
  handleResetCompnaySelections,
  handleResetInvestorSelections,
  ResetInvestorSearchOptionSelection,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorVotingByProposalContainer)
);
