import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';
import InvestorComparatorTool from '../../../components/Tools/VotingTools/InvestorComparatorTool';
import saveSearchConst from '../../../constants/SaveSearchToolConstants';
// import HistoricalTrendsPDF from '../../../components/Tools/VotingTools/Components/HistoricalTrendsPDF';
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
  handleResetInvestorComparatorTool,
  handleResetInvestorComparatorTool_HistoricalTrends,
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
  handleInvestorComparatorSelection,
  handleCloseInvestorDetails,
  resolutionsByInvestorDetailstReq,
  handleInvestorDetailsSelection,
  handleCloseVoringDetails,
  resolutionSearchByInvestorReq,
  getResolutionsTypeIdByNameReq,
  getInvestorVotingPowerReq,

  // historical trends
  getHistoricalTrendsReq,
  investorComparatorhistoricalTrendsChartYTDDataReq,
  investorComparatorhistoricalTrendsChartProxySeasonDataReq,
  getHistoricalTrendsChartDataInvestorComparatorReq,
  handleOnChangeHistoricalInvestor,
  handleOnClickIsSelectedFullYearData,
  handleHistoricalTrendsSelection,
  getTokenDecode,
  //
  handleUpdateDataInvestorComparatorFilters,
} from '../Voting/InvestorComparatorToolSlice';
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
  getAumCategorylistReq,
  handleAumCategorySelection,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
} from '../../DashboardContainer/DashboardSlice';
import { VOTING } from '../../../constants/ProductConstants';
import { GetPageAccess } from '../../../utils/tools-util';
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

const InvestorComparatorContainer = ({
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
  trialUserDisableDownload,
  isShowInvestorDetails,
  handleResetInvestorComparatorTool,
  getAumCategorylistReq,
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

  useEffect(() => {
    handleResetInvestorComparatorTool();
    getAumCategorylistReq();
    getCurrentShareholderReq();
  }, [
    handleResetInvestorComparatorTool,
    getAumCategorylistReq,
    getCurrentShareholderReq,
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsAccess() {
      getAllMeetingTypeReq();
      getAllIndividualProponentReq();
      getAllGroupProponentReq();
    }
    getNewsAccess();

    return function cleanup() {
      abortController.abort();
    };
  }, [
    getAllMeetingTypeReq,
    getAllIndividualProponentReq,
    getAllGroupProponentReq,
  ]);

  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getData() {
      piListOfIndices();
      allListOfExchange();
      listAIPeerGroup();
      allCountriesAndRegions();
      listInvestorTypeAndSubtypeReq();
      piListSectorsAndIndustries();
      getCompanySearchOptions();
      getInvestorSearchOptions();
      const optionData = {
        comp: props.companySearchOptionSelection,
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
    // getCurrentShareholderReq,
    getDefaultPeerGroupDataReq,
    props.companySearchOptionSelection,
    investorSearchOptionsSelection,
  ]);

  // #region Saved search

  useEffect(() => {
    props.userSearchFilter_GetReq({
      filter_type_id: saveSearchConst.INVESTOR_COMPARATOR_TOOL,
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

      await props.handleUpdateDataInvestorComparatorFilters(filter_definition);
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
      get_invData();
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
      isProponentGroup: props.isProponentGroup,
      isInvCompDateChecked: props.isInvCompDateChecked,
      startInvCompDate: props.isInvCompDateChecked
        ? Date.parse(props.startInvCompDate)
        : startDate,
      endInvCompDate: props.isInvCompDateChecked
        ? Date.parse(props.endInvCompDate)
        : endDate,
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined
          ? props.invCompInvestorPeerGroupSelection.value
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
      filter_type_id: saveSearchConst.INVESTOR_COMPARATOR_TOOL,
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
        filter_type_id: saveSearchConst.INVESTOR_COMPARATOR_TOOL,
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
      filter_type_id: saveSearchConst.INVESTOR_COMPARATOR_TOOL,
    };
    await props.userSearchFilter_DeleteReq(data);
  }, [props]);

  // #endregion

  return (
    <ErrorBoundary>
      <InvestorComparatorTool
        {...props}
        companySearchOptionSelection={props.companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        status={status}
        trialUserDisableDownload={trialUserDisableDownload}
        isShowInvestorDetails={isShowInvestorDetails}
        handleResetInvestorComparatorTool={handleResetInvestorComparatorTool}
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

const SelectLstSponsor = (state) => state.investorComparatorTool.lstSponsor;
const SelectSponsorSelection = (state) =>
  state.investorComparatorTool.sponsorSelection;
const SelectLstMeetingTypes = (state) =>
  state.investorComparatorTool.lstMeetingTypes;
const SelectMeetingTypeSelection = (state) =>
  state.investorComparatorTool.meetingTypeSelection;
const SelectLstIndividualProponent = (state) =>
  state.investorComparatorTool.lstIndividualProponent;
const SelectIndividualProponentSelection = (state) =>
  state.investorComparatorTool.individualProponentSelection;
const SelectLstGroupProponent = (state) =>
  state.investorComparatorTool.lstGroupProponent;
const SelectGroupProponentSelection = (state) =>
  state.investorComparatorTool.groupProponentSelection;
const SelectStartInvCompDate = (state) =>
  state.investorComparatorTool.startInvCompDate;
const SelectEndInvCompDate = (state) =>
  state.investorComparatorTool.endInvCompDate;
const SelectIsInvCompDateChecked = (state) =>
  state.investorComparatorTool.isInvCompDateChecked;
const SelectIsProponentGroup = (state) =>
  state.investorComparatorTool.isProponentGroup;
const SelectLstResolutionsByInvestorFilter = (state) =>
  state.investorComparatorTool.lstResolutionsByInvestorFilter;
const SelectLstResolutionsByInvestorFilterFullData = (state) =>
  state.investorComparatorTool.lstResolutionsByInvestorFilterFullData;
const SelectLtResolutionInvDetails = (state) =>
  state.investorComparatorTool.lstResolutionInvDetails;
const SelectLtResolutionInvDetailsFullData = (state) =>
  state.investorComparatorTool.lstResolutionInvDetailsFullData;
const SelectLtIsShowInvestorDetails = (state) =>
  state.investorComparatorTool.isShowInvestorDetails;
const SelectLtIsShowVotingDetails = (state) =>
  state.investorComparatorTool.isShowVotingDetails;
const SelectSelectedInvestorDetailsProposalTypeId = (state) =>
  state.investorComparatorTool.selectedInvestorDetailsProposalTypeId;
const SelectSelectedInvestorDetailsProposalSubLevelTypeId = (state) =>
  state.investorComparatorTool.selectedInvestorDetailsProposalSubLevelTypeId;
const SelectSelectedInvestorDetailsProposalTopLevelTypeId = (state) =>
  state.investorComparatorTool.selectedInvestorDetailsProposalTopLevelTypeId;

const SelecIsLoading = (state) => state.investorComparatorTool.isLoading;
const SelecIsLoading_InvestorVotingByProposal = (state) =>
  state.investorComparatorTool.isLoading_InvestorVotingByProposal;

const SelecIsLoadingInvestorDetails = (state) =>
  state.investorComparatorTool.isLoadingInvestorDetails;
const SelectCurrentResolutionTypeSelection = (state) =>
  state.investorComparatorTool.currentResolutionTypeSelection;

const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;

const SelectisSelectedCalendarYearData = (state) =>
  state.investorComparatorTool.isSelectedCalendarYearData;
const SelectisSelectedYearToDateData = (state) =>
  state.investorComparatorTool.isSelectedYearToDateData;
const SelectisSelectedProxySeasonData = (state) =>
  state.investorComparatorTool.isSelectedProxySeasonData;

// voting details
const SelectLstVotingDetails = (state) =>
  state.investorComparatorTool.lstVotingDetails;
const SelectIsLoadingVotingDetails = (state) =>
  state.investorComparatorTool.isLoadingVotingDetails;
const SelectlstVotingInvestorPower = (state) =>
  state.investorComparatorTool.lstVotingInvestorPower;
const SelectLstVotingPvaImpact = (state) =>
  state.investorComparatorTool.lstVotingPvaImpact;

// Historical Trends
const SelectIsShowInvestorTrends = (state) =>
  state.investorComparatorTool.isShowInvestorTrends;
const SelectIsLoadHistoricalTrends = (state) =>
  state.investorComparatorTool.isLoadHistoricalTrends;
const SelectLstDdlHistoricalsInvestors = (state) =>
  state.investorComparatorTool.lstDdlHistoricalsInvestors;
const SelectDdlHistoricalInvestorSelection = (state) =>
  state.investorComparatorTool.DdlhistoricalInvestorSelection;
const SelectLstHistoricalInvestors = (state) =>
  state.investorComparatorTool.lstHistoricalInvestors;
const SelectIsShowHistoricalTrendsFor = (state) =>
  state.investorComparatorTool.isShowHistoricalTrendsFor;
const SelectIsShowHistoricalTrendsAgainst = (state) =>
  state.investorComparatorTool.isShowHistoricalTrendsAgainst;
const SelectIsShowHistoricalTrendsAbstain = (state) =>
  state.investorComparatorTool.isShowHistoricalTrendsAbstain;
const SelectLstStackBarChartData = (state) =>
  state.investorComparatorTool.lstStackBarChartData;
const SelectLstLineChartData = (state) =>
  state.investorComparatorTool.lstLineChartData;

// Voting power
const SelectIsShowVotingPower = (state) =>
  state.investorComparatorTool.isShowVotingPower;
const SelectIsLoadVotingPowerData = (state) =>
  state.investorComparatorTool.isLoadVotingPowerData;

// selection
const SelectInvCompCompanyPeerGroupSelection = (state) =>
  state.investorComparatorTool.invCompCompanyPeerGroupSelection;
const SelectInvCompInvestorPeerGroupSelection = (state) =>
  state.investorComparatorTool.invCompInvestorPeerGroupSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) =>
  state.investorComparatorTool.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) =>
  state.investorComparatorTool.isResetInvestorPeerGroupSelection;
const SelectDecodeToken = (state) =>
  state.investorComparatorTool.getTokenDecode;

const SelectlstAllHistoricalInvestorFullYear = (state) =>
  state.investorComparatorTool.lstAllHistoricalInvestorFullYear;
const SelectlstAllHistoricalInvestorYTD = (state) =>
  state.investorComparatorTool.lstAllHistoricalInvestorYTD;
const SelectlstAllHistoricalInvestorProxySeason = (state) =>
  state.investorComparatorTool.lstAllHistoricalInvestorProxySeason;

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
const selectInvTxtMarketCapMinRange = (state) =>
  state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) =>
  state.dashboard.invTxtMarketCapMaxRange;
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

// AUM ($bn)
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) =>
  state.dashboard.aumCategorySelection;

const SelectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
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
const selectChartYearDataPDF = (state) =>
  state.investorComparatorTool.chartYearDataPDF;
const selectLineChartShowData = (state) =>
  state.investorComparatorTool.lineChartShowData;

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
  isSelectedCalendarYearData: SelectisSelectedCalendarYearData(state),
  isSelectedYearToDateData: SelectisSelectedYearToDateData(state),
  isSelectedProxySeasonData: SelectisSelectedProxySeasonData(state),

  generatePDF: selectgeneratePDF(state),
  pdfDownloadLoader: selectpdfDownloadLoader(state),
  pdfDownloadNotification: selectPdfDownloadNotification(state),
  pdfListItems: selectPdfListItems(state),
  pdfDownloadCancelBtn: selectpdfDownloadCancelBtn(state),
  pdfMenuShow: selectPDFMenuShow(state),
  // voting details
  lstVotingDetails: SelectLstVotingDetails(state),
  isLoadingVotingDetails: SelectIsLoadingVotingDetails(state),

  // Voting power
  isShowVotingPower: SelectIsShowVotingPower(state),
  isLoadVotingPowerData: SelectIsLoadVotingPowerData(state),
  lstVotingInvestorPower: SelectlstVotingInvestorPower(state),
  lstVotingPvaImpact: SelectLstVotingPvaImpact(state),

  // Historical Trends
  isShowInvestorTrends: SelectIsShowInvestorTrends(state),
  isLoadHistoricalTrends: SelectIsLoadHistoricalTrends(state),
  lstDdlHistoricalsInvestors: SelectLstDdlHistoricalsInvestors(state),
  DdlhistoricalInvestorSelection: SelectDdlHistoricalInvestorSelection(state),
  lstHistoricalInvestors: SelectLstHistoricalInvestors(state),
  isShowHistoricalTrendsFor: SelectIsShowHistoricalTrendsFor(state),
  isShowHistoricalTrendsAgainst: SelectIsShowHistoricalTrendsAgainst(state),
  isShowHistoricalTrendsAbstain: SelectIsShowHistoricalTrendsAbstain(state),
  lstStackBarChartData: SelectLstStackBarChartData(state),
  lstLineChartData: SelectLstLineChartData(state),

  currentResolutionTypeSelection: SelectCurrentResolutionTypeSelection(state),
  selectedInvestorDetailsProposalTypeId:
    SelectSelectedInvestorDetailsProposalTypeId(state),
  selectedInvestorDetailsProposalSubLevelTypeId:
    SelectSelectedInvestorDetailsProposalSubLevelTypeId(state),
  selectedInvestorDetailsProposalTopLevelTypeId:
    SelectSelectedInvestorDetailsProposalTopLevelTypeId(state),
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
  lstResolutionsByInvestorFilter: SelectLstResolutionsByInvestorFilter(state),
  lstResolutionInvDetails: SelectLtResolutionInvDetails(state),
  lstResolutionInvDetailsFullData: SelectLtResolutionInvDetailsFullData(state),
  lstResolutionsByInvestorFilterFullData:
    SelectLstResolutionsByInvestorFilterFullData(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  isLoading: SelecIsLoading(state),
  isLoading_InvestorVotingByProposal:
    SelecIsLoading_InvestorVotingByProposal(state),

  isLoadingInvestorDetails: SelecIsLoadingInvestorDetails(state),
  isShowInvestorDetails: SelectLtIsShowInvestorDetails(state),
  isShowVotingDetails: SelectLtIsShowVotingDetails(state),

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
  // AUM ($bn)
  listAumCategory: selectListAumCategory(state),
  aumCategorySelection: selectAumCategorySelection(state),

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
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),

  // selection
  invCompCompanyPeerGroupSelection:
    SelectInvCompCompanyPeerGroupSelection(state),
  invCompInvestorPeerGroupSelection:
    SelectInvCompInvestorPeerGroupSelection(state),
  isResetCompanyPeerGroupSelection:
    SelectIsResetCompanyPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection:
    SelectIsResetInvestorPeerGroupSelection(state),

  lstAllHistoricalInvestorFullYear:
    SelectlstAllHistoricalInvestorFullYear(state),
  lstAllHistoricalInvestorYTD: SelectlstAllHistoricalInvestorYTD(state),
  lstAllHistoricalInvestorProxySeason:
    SelectlstAllHistoricalInvestorProxySeason(state),

  trialUserDisableDownload: SelectTrialUserDisableDownload(state),
  listDefaultInvestorTypeAndSubtype:
    selectListDefaultInvestorTypeAndSubtype(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries:
    selectDefaultPiListSectorsAndIndustries(state),
  chartYearDataPDF: selectChartYearDataPDF(state),
  lineChartShowData: selectLineChartShowData(state),
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
  handleResetInvestorComparatorTool,
  handleResetInvestorComparatorTool_HistoricalTrends,
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
  getProcedureRunningEstimateTimeReq,
  handleComapnySearchSelectionInvComp,
  handleInvestorSearchSelectionInvComp,
  getDefaultPeerGroupDataReq,
  handleClearPeerGroupCompanySelection,
  handleClearPeerGroupInvestorSelection,
  handleClearResult,
  handleInvestorComparatorSelection,
  handleCloseInvestorDetails,
  resolutionsByInvestorDetailstReq,
  handleInvestorDetailsSelection,
  handleCloseVoringDetails,
  resolutionSearchByInvestorReq,
  getResolutionsTypeIdByNameReq,
  getInvestorVotingPowerReq,
  handleResetLoader,

  // historical trends
  getHistoricalTrendsReq,
  investorComparatorhistoricalTrendsChartYTDDataReq,
  investorComparatorhistoricalTrendsChartProxySeasonDataReq,
  getHistoricalTrendsChartDataInvestorComparatorReq,
  handleOnChangeHistoricalInvestor,
  handleOnClickIsSelectedFullYearData,
  handleHistoricalTrendsSelection,

  // Company search selection
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

  // investor search selection
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

  handleAumCategorySelection,
  getAumCategorylistReq,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
  handlePDFListItems,
  handlePDFMenuShow,
  handlePDFDownloadLoader,
  handleGeneratePDF,
  handlePDFDownloadCancelClick,
  //
  handleUpdateDataInvestorComparatorFilters,
};

InvestorComparatorContainer.propTypes = {
  allCountriesAndRegions: PropTypes.func,
  allListOfExchange: PropTypes.func,
  companySearchOptionSelection: PropTypes.object,
  getAllGroupProponentReq: PropTypes.func,
  getAllIndividualProponentReq: PropTypes.func,
  getAllMeetingTypeReq: PropTypes.func,
  getCompanySearchOptions: PropTypes.func,
  getCurrentShareholderReq: PropTypes.func,
  getDefaultPeerGroupDataReq: PropTypes.func,
  getInvestorSearchOptions: PropTypes.func,
  getPeerGroupDataReq: PropTypes.func,
  investorSearchOptionsSelection: PropTypes.object,
  listAIPeerGroup: PropTypes.func,
  listInvestorTypeAndSubtypeReq: PropTypes.func,
  piListOfIndices: PropTypes.func,
  piListSectorsAndIndustries: PropTypes.func,
  procedureRunningEstimateTime: PropTypes.number,

  listAumCategory: PropTypes.array,
  aumCategorySelection: PropTypes.any,
};

InvestorComparatorContainer.defaultProps = {
  getAllMeetingTypeReq: () => null,
  getAllIndividualProponentReq: () => null,
  getAllGroupProponentReq: () => null,
  getPeerGroupDataReq: () => null,
  getInvestorSearchOptions: () => null,
  getCompanySearchOptions: () => null,
  getCurrentShareholderReq: () => null,
  getDefaultPeerGroupDataReq: () => null,
  piListSectorsAndIndustries: () => null,
  piListOfIndices: () => null,
  allListOfExchange: () => null,
  listAIPeerGroup: () => null,
  allCountriesAndRegions: () => null,
  listInvestorTypeAndSubtypeReq: () => null,
  companySearchOptionSelection: undefined,
  investorSearchOptionsSelection: undefined,
  procedureRunningEstimateTime: undefined,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorComparatorContainer)
);
