import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  listSelectedProposalsCountryReq,
  listBindgvVotingGridReq,
  handleProposalsCountryChange,
  handleResetLoading,
  handleResetPolicyCheckerDataLoading,
  handleResetAll,
} from './CompanyVotingSlice';
import VotingPolicyChecker from '../../components/Company/Voting/VotingPolicyChecker';
import { getProcedureRunningEstimateTimeReq, handleResetLoader } from '../General/TitleSlice';
import TypeConstants from '../../constants/TrialTypeConstants';
// import { filterFunctions } from '../../utils/general-util';
import { COMPANY_VOTING_POLICYCHECKERCUSTOM_INSIGHTIA } from '../../constants/ProcedureConstant';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';
import {
  handleInvestorSearchSelectionInvComp,
  getDefaultPeerGroupDataReq,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
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
  ResetInvestorSearchOptionSelection,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  getAumCategorylistReq,
  handleAumCategorySelection,
} from '../DashboardContainer/DashboardSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const VotingPolicyCheckerContainer = ({
  location,
  children,
  listSelectedProposalsCountryReq,
  listBindgvVotingGridReq,
  handleProposalsCountryChange,
  proposalsCountryList,
  policyCheckerList,
  isLoadingPolicyCheckerList,
  policyCheckerHeadingList,
  firstSelectProposalsCountry,
  handleResetLoading,
  TrialStatus_VotingPolicyChecker,
  allowDownload,
  issuerCompanyProfile,
  getDefaultPeerGroupDataReq,
  investorSearchOptionsSelection,
  getInvestorSearchOptions,
  invCompInvestorPeerGroupSelection,
  allCountriesAndRegions,
  getCurrentShareholderReq,
  piListSectorsAndIndustries,
  piListOfIndices,
  allListOfExchange,
  listAIPeerGroup,
  listInvestorTypeAndSubtypeReq,
  handleResetAll,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  handleResetPolicyCheckerDataLoading,
  investorSearchOptions,

  getAllMeetingTypeReq,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  companySearchOptionSelection,
  getCompanySearchOptions,
  piListOfIndicesReq,
  getListOfExchange,
  getAIPeersGroups,
  getTreeRegionsAndCountries,
  getPIListSectorsAndIndustriesReq,
  getAumCategorylistReq,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.meetingid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function loading() {
      await props.handleResetLoader();
      await handleResetPolicyCheckerDataLoading();
      await getProcedureRunningEstimateTimeReq(COMPANY_VOTING_POLICYCHECKERCUSTOM_INSIGHTIA);
    }
    loading();
    handleResetAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetAll]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      if (query.meetingid !== undefined && distinctProfile !== null) {
        let meetingId = query.meetingid;
        if (distinctProfile) {
          meetingId = TypeConstants.TRIAL_MEETINGID;
        }
        await listSelectedProposalsCountryReq(meetingId).then(async (res) => {
          if (res.payload && res.payload.length > 0) {
            await listBindgvVotingGridReq({
              meetingId: query.meetingid,
              proposal_type_id: res.payload[0].value,
              investor_search_id:
                invCompInvestorPeerGroupSelection !== undefined && invCompInvestorPeerGroupSelection !== null
                  ? invCompInvestorPeerGroupSelection.value
                  : null,
            });
          }
        });
      }
    }
    getData();
    return function cleanup() {
      abortController.abort();
    };
  }, [query.meetingid, distinctProfile, invCompInvestorPeerGroupSelection]);

  useEffect(() => {
    async function getData() {
      piListOfIndicesReq();
      getListOfExchange();
      getAIPeersGroups();
      getTreeRegionsAndCountries();
      listInvestorTypeAndSubtypeReq();
      getPIListSectorsAndIndustriesReq();
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
      getAumCategorylistReq();
    }
    getData();
  }, [
    getCompanySearchOptions,
    getInvestorSearchOptions,
    getPIListSectorsAndIndustriesReq,
    piListOfIndicesReq,
    getListOfExchange,
    getAIPeersGroups,
    getTreeRegionsAndCountries,
    listInvestorTypeAndSubtypeReq,
    getCurrentShareholderReq,
    getDefaultPeerGroupDataReq,
    companySearchOptionSelection,
    investorSearchOptionsSelection,
    getAumCategorylistReq,
  ]);

  return (
    <ErrorBoundary>
      <VotingPolicyChecker
        {...props}
        handleResetPolicyCheckerDataLoading={handleResetPolicyCheckerDataLoading}
        issuerCompanyProfile={issuerCompanyProfile}
        children={children}
        proposalsCountryList={proposalsCountryList}
        policyCheckerList={policyCheckerList}
        policyCheckerHeadingList={policyCheckerHeadingList}
        firstSelectProposalsCountry={firstSelectProposalsCountry}
        handleProposalsCountryChange={handleProposalsCountryChange}
        listBindgvVotingGridReq={listBindgvVotingGridReq}
        handleResetLoading={handleResetLoading}
        TrialStatus={TrialStatus_VotingPolicyChecker}
        allowDownload={allowDownload}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        investorSearchOptions={investorSearchOptions}
        invCompInvestorPeerGroupSelection={invCompInvestorPeerGroupSelection}
        ResetInvestorSearchOptionSelection={props.ResetInvestorSearchOptionSelection}
        handleClearPeerGroupInvestorSelection={props.handleClearPeerGroupInvestorSelection}
        isLoadingPolicyCheckerList={isLoadingPolicyCheckerList}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
      />
    </ErrorBoundary>
  );
};

VotingPolicyCheckerContainer.propTypes = {
  TrialStatus_VotingPolicyChecker: PropTypes.any.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  children: PropTypes.object,
  firstSelectProposalsCountry: PropTypes.any,
  handleProposalsCountryChange: PropTypes.func.isRequired,
  handleResetLoading: PropTypes.func.isRequired,
  issuerCompanyProfile: PropTypes.any.isRequired,
  listBindgvVotingGridReq: PropTypes.func.isRequired,
  listSelectedProposalsCountryReq: PropTypes.func.isRequired,
  handleResetPolicyCheckerDataLoading: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  policyCheckerHeadingList: PropTypes.any.isRequired,
  policyCheckerList: PropTypes.any.isRequired,
  proposalsCountryList: PropTypes.any.isRequired,

  getDefaultPeerGroupDataReq: PropTypes.func,
  companySearchOptionSelection: PropTypes.object,
  investorSearchOptionsSelection: PropTypes.object,
  getInvestorSearchOptions: PropTypes.func,
  getCompanySearchOptions: PropTypes.func,
};

// #region States assign
const selectIssuerCompanyProfile = (state) => state.companyVoting.issuerCompanyProfile;
const selectProposalsCountryList = (state) => state.companyVoting.proposalsCountryList;
const selectPolicyCheckerList = (state) => state.companyVoting.policyCheckerList;
const selectIsLoadingPolicyCheckerList = (state) => state.companyVoting.isLoadingPolicyCheckerList;
const selectPolicyCheckerHeadingList = (state) => state.companyVoting.policyCheckerHeadingList;
const selectFirstSelectProposalsCountry = (state) => state.companyVoting.firstSelectProposalsCountry;
const selectTrialStatus = (state) => state.companyVoting.TrialStatus_VotingPolicyChecker;
const selectAllowDownload = (state) => state.companyVoting.allowDownload;

// selection
const SelectInvCompInvestorPeerGroupSelection = (state) => state.tools.invCompInvestorPeerGroupSelection;
const selectCurrentSelectionInvestorSearchid = (state) => state.dashboard.currentSelectionInvestorSearchid;

// dashboard - company search
const selectBulkCompanySelectRecordset = (state) => state.dashboard.freeSearchRecordset;
const selectIndustrySelection = (state) => state.dashboard.industrySelection;
const selectShowFilterModel = (state) => state.dashboard.showFilterModel;
const selectShowIndividualOption = (state) => state.dashboard.showIndividualOption;

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

const selectListRegeionAndCountries = (state) => state.dashboard.listRegeionAndCountries;
const selectPIListSectorsAndIndustries = (state) => state.dashboard.piListSectorsAndIndustries;

const selectTextSaveCurrentList = (state) => state.dashboard.txtSaveCurrentList;
const selectSaveCurrentListButtonText = (state) => state.dashboard.saveCurrentListButtonText;

// dashboard - investor search
const selectCompanySearchOptionSelection = (state) => state.dashboard.companySearchOptionSelection;
const selectInvestorSelection = (state) => state.dashboard.investorSelection;
const selectInvestorSearchOptions = (state) => state.dashboard.investorSearchOptions;
const selectInvestorSearchOptionsSelection = (state) => state.dashboard.investorSearchOptionsSelection;
const selectShowInvestorFilterModel = (state) => state.dashboard.showInvestorFilterModel;
const selectInvestorLocationSelection = (state) => state.dashboard.investorLocationSelection;
const selectListInvestorTypeAndSubtype = (state) => state.dashboard.listInvestorTypeAndSubtype;
const selectListInvestorTypeAndSubtypeSelection = (state) => state.dashboard.listInvestorTypeAndSubtypeSelection;
const selectInvestorBulkUpload = (state) => state.dashboard.isInvestorBulkUpload;
const selectlistByIndivProponent = (state) => state.dashboard.listByIndivProponent;
const selectSelectionByIndivProponent = (state) => state.dashboard.selectionByIndivProponent;
const selectIsSaveCurrentListButtonDeleteDisable = (state) => state.dashboard.isSaveCurrentListButtonDeleteDisable;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

// title slice
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;

// dashboard - investor search
const selectInvListRegeionAndCountries = (state) => state.dashboard.invListRegeionAndCountries;
const selectInvTxtMarketCapMinRange = (state) => state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) => state.dashboard.invTxtMarketCapMaxRange;

// AUM ($bn)
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) => state.dashboard.aumCategorySelection;

// title slice
// selection - company & investor search
const SelectInvCompCompanyPeerGroupSelection = (state) => state.tools.invCompCompanyPeerGroupSelection;

const SelectIsResetCompanyPeerGroupSelection = (state) => state.tools.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) => state.tools.isResetInvestorPeerGroupSelection;
//default selection tree view
const selectListDefaultInvestorTypeAndSubtype = (state) => state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) => state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) => state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) => state.dashboard.defaultPiListSectorsAndIndustries;
// #endregion

// #endregion

const mapStateToProps = (state) => ({
  // title slice
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),

  proposalsCountryList: selectProposalsCountryList(state),
  policyCheckerList: selectPolicyCheckerList(state),
  isLoadingPolicyCheckerList: selectIsLoadingPolicyCheckerList(state),
  policyCheckerHeadingList: selectPolicyCheckerHeadingList(state),
  firstSelectProposalsCountry: selectFirstSelectProposalsCountry(state),
  TrialStatus_VotingPolicyChecker: selectTrialStatus(state),
  issuerCompanyProfile: selectIssuerCompanyProfile(state),
  allowDownload: selectAllowDownload(state),

  // selection
  invCompInvestorPeerGroupSelection: SelectInvCompInvestorPeerGroupSelection(state),
  currentSelectionInvestorSearchid: selectCurrentSelectionInvestorSearchid(state),

  // Company search selection
  companySearchOptionSelection: selectCompanySearchOptionSelection(state),
  freeSearchRecordset: selectBulkCompanySelectRecordset(state),
  industrySelection: selectIndustrySelection(state),
  showFilterModel: selectShowFilterModel(state),
  showIndividualOption: selectShowIndividualOption(state),
  piListIndices: selectListOfIndicesRecordSet(state),
  indexSelection: selectIndexSelection(state),
  listOfExchange: selectListOfExchange(state),
  exchangeSelection: selectExchangeSelection(state),
  aiPeerGroups: selectAIPeerGroup(state),
  aiPeerGroupSelection: selectAIPeerGroupSelection(state),
  listMarketCap: selectListMarketCap(state),
  marketCapSelection: selectMarketCapSelection(state),
  listRegeionAndCountries: selectListRegeionAndCountries(state),
  selectPIListSectorsAndIndustries: selectPIListSectorsAndIndustries(state),
  txtSaveCurrentList: selectTextSaveCurrentList(state),
  saveCurrentListButtonText: selectSaveCurrentListButtonText(state),
  txtMarketCapMinRange: selectTextMarketCapMinRange(state),
  txtMarketCapMaxRange: selectTextMarketCapMaxRange(state),

  // investor search selection
  investorSearchOptionsSelection: selectInvestorSearchOptionsSelection(state),
  investorSelection: selectInvestorSelection(state),
  isInvestorBulkUpload: selectInvestorBulkUpload(state),
  investorSearchOptions: selectInvestorSearchOptions(state),
  showInvestorFilterModel: selectShowInvestorFilterModel(state),
  investorLocationSelection: selectInvestorLocationSelection(state),
  listInvestorTypeAndSubtype: selectListInvestorTypeAndSubtype(state),
  listInvestorTypeAndSubtypeSelection: selectListInvestorTypeAndSubtypeSelection(state),
  listByIndivProponent: selectlistByIndivProponent(state),
  selectionByIndivProponent: selectSelectionByIndivProponent(state),
  isSaveCurrentListButtonDeleteDisable: selectIsSaveCurrentListButtonDeleteDisable(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),

  // investor search selection
  // AUM ($bn)
  listAumCategory: selectListAumCategory(state),
  aumCategorySelection: selectAumCategorySelection(state),
  // selection - company & investor search
  invCompCompanyPeerGroupSelection: SelectInvCompCompanyPeerGroupSelection(state),
  isResetCompanyPeerGroupSelection: SelectIsResetCompanyPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection: SelectIsResetInvestorPeerGroupSelection(state),
  listDefaultInvestorTypeAndSubtype: selectListDefaultInvestorTypeAndSubtype(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries: selectDefaultPiListSectorsAndIndustries(state),

  invListRegeionAndCountries: selectInvListRegeionAndCountries(state),
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),
});

const mapDispatchToProps = {
  handleProposalsCountryChange,
  handleResetLoading,
  listSelectedProposalsCountryReq,
  listBindgvVotingGridReq,
  handleClearPeerGroupInvestorSelection,
  handleResetPolicyCheckerDataLoading,
  ResetInvestorSearchOptionSelection,

  // Title slice
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,

  // Tools
  handleInvestorSearchSelectionInvComp,
  getDefaultPeerGroupDataReq,

  // Company search selection
  handleCompanySearchOptionSelection,
  handleIndustrySelection,
  HandleFilterModel,
  handleCompanySelection,
  handleShowIndividualOption,
  handleShowGroupOption,
  handleBulkCompanySelection,
  piListOfIndicesReq: piListOfIndicesReq,
  getListOfExchange: getListOfExchange,
  getAIPeersGroups: getAIPeersGroups,
  getTreeRegionsAndCountries: getTreeRegionsAndCountries,
  listInvestorTypeAndSubtypeReq: listInvestorTypeAndSubtype,
  getPIListSectorsAndIndustriesReq: getPIListSectorsAndIndustriesReq,
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

  // investor
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
  handleResetAll,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  getAumCategorylistReq,
  handleAumCategorySelection,
  handleClearPeerGroupCompanySelection,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VotingPolicyCheckerContainer));
