import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import InvestorComparatorTool from '../../../components/Tools/VotingTools/InvestorComparatorTool';
import HistoricalTrendsPDF from '../../../components/Tools/VotingTools/Components/HistoricalTrendsPDF';
import InvestorComparatorConstant from '../../../constants/InvestorComparatorConstant';
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
  handleOnChangeHistoricalInvestor,
  handleOnClickIsSelectedFullYearData,
  handleHistoricalTrendsSelection,
  getTokenDecode,
} from '../Voting/InvestorComparatorToolSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
// import { ACTIVIST_SHORTS, VOTING } from '../../../constants/ProductConstants';
// import { GetPageAccess } from '../../../utils/tools-util';
// import { TokenDecodeForProductStatus } from '../../../utils/general-util';

const HistoricalTreandsPdfContainer = ({
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
  getAumCategorylistReq,
  handleOnClickIsSelectedFullYearData,
  handleHistoricalTrendsSelection,
  ...props
}) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [status, setStatus] = useState(null);
  const level = query.level;
  const proposalType = query.proposalType;
  const obj = {
    lavel: Number(level),
    proposalType: proposalType.replaceAll('#', '&').replaceAll('_', ' '),
  };
  if (window.location.pathname === '/tools/voting/investorcomparator/historicaltrends') {
    useEffect(() => {
      async function getData(data) {
        const companySearchId = query.companySearchId !== 'null' ? query.companySearchId : null;
        const investorSearchId = query.investorSearchId !== 'null' ? query.investorSearchId : null;
        const meetingType = query.meetingType !== 'null' ? query.meetingType : '';
        const proponent = query.proponent !== 'null' ? query.proponent : '';
        const sponsor = query.sponsor !== 'null' ? query.sponsor : null;
        props.getResolutionsTypeIdByNameReq(data).then((res) => {
          const dataResolutionTtype = {
            companySearchId: companySearchId,
            investorSearchId: investorSearchId,
            meetingType: meetingType,
            proponent: proponent,
            proposalSponsor: sponsor,
            proposalTypeTopLevel:
              res.payload !== false &&
              res.payload.req.lavel === InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL
                ? res.payload.response
                : null,
            ProposalTypeSubLevel:
              res.payload !== false &&
              res.payload.req.lavel === InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL
                ? res.payload.response
                : null,
            proposalType:
              res.payload !== false &&
              res.payload.req.lavel === InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE
                ? res.payload.response
                : null,
          };
          props.getHistoricalTrendsReq(dataResolutionTtype);
          props.investorComparatorhistoricalTrendsChartYTDDataReq(dataResolutionTtype);
          props.investorComparatorhistoricalTrendsChartProxySeasonDataReq(dataResolutionTtype);
        });
      }
      const level = query.level;
      const proposalType = query.proposalType;
      const yearLevel = Number(query.yearLevel);
      const lineChartData = query.lineChartParams;
      const obj = {
        lavel: Number(level),
        proposalType: proposalType.replaceAll('@', '&').replaceAll('_', ' '),
      };
      getData(obj);
      handleOnClickIsSelectedFullYearData(yearLevel);
      async function getData1() {
        handleHistoricalTrendsSelection(lineChartData.toString());
      }
      getData1();
      // const lineChartData = query.lineChartParams;
    }, [
      query.print,
      query.level,
      query.proposalType,
      query.yearLevel,
      query.lineChartParams,
      query.companySearchId,
      query.investorSearchId,
      query.meetingType,
      query.proponent,
      query.sponsor,
      query.ddlValues,
    ]);

    useEffect(() => {
      const lineChartData = query.lineChartParams;
      async function getData() {
        handleHistoricalTrendsSelection(lineChartData.toString());
      }
      getData();
    }, [
      query.lineChartParams,
      props.lstHistoricalInvestors,
      props.lineChartShowData,
      props.lstHistoricalInvestorsForYTD,
      props.lstHistoricalInvestorsAgainstYTD,
      props.lstHistoricalInvestorsAbstainYTD,
    ]);
    useEffect(() => {
      async function getData() {
        const ddlValues = query.ddlValues !== '' ? query.ddlValues : null;
        const newArray = [];
        if (ddlValues !== null) {
          const data = props.lstDdlHistoricalsInvestors;
          data.forEach(async (item) => {
            if (ddlValues.includes(`,${item.value},`)) {
              newArray.push(item);
            }
          });
          props.handleOnChangeHistoricalInvestor(newArray);
        }
      }
      getData();
    }, [query.ddlValues, props.lstDdlHistoricalsInvestors.length]);
  }
  return (
    <ErrorBoundary>
      <HistoricalTrendsPDF
        {...props}
        companySearchOptionSelection={props.companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        status={status}
        trialUserDisableDownload={trialUserDisableDownload}
        isShowInvestorDetails={isShowInvestorDetails}
        isProposalType={obj}
        handleOnClickIsSelectedFullYearData={handleOnClickIsSelectedFullYearData}
        handleHistoricalTrendsSelection={handleHistoricalTrendsSelection}
      />
    </ErrorBoundary>
  );
};

const selectpdfDownloadLoader = (state) => state.headerTitle.pdfDownloadLoader;
const selectgeneratePDF = (state) => state.headerTitle.generatePDF;
const selectPdfDownloadNotification = (state) => state.headerTitle.pdfDownloadNotification;
const selectPdfListItems = (state) => state.headerTitle.pdfListItems;
const selectpdfDownloadCancelBtn = (state) => state.headerTitle.pdfDownloadCancelBtn;
const selectPDFMenuShow = (state) => state.headerTitle.pdfMenuShow;

////
const SelectLstSponsor = (state) => state.investorComparatorTool.lstSponsor;
const SelectSponsorSelection = (state) => state.investorComparatorTool.sponsorSelection;
const SelectLstMeetingTypes = (state) => state.investorComparatorTool.lstMeetingTypes;
const SelectMeetingTypeSelection = (state) => state.investorComparatorTool.meetingTypeSelection;
const SelectLstIndividualProponent = (state) => state.investorComparatorTool.lstIndividualProponent;
const SelectIndividualProponentSelection = (state) => state.investorComparatorTool.individualProponentSelection;
const SelectLstGroupProponent = (state) => state.investorComparatorTool.lstGroupProponent;
const SelectGroupProponentSelection = (state) => state.investorComparatorTool.groupProponentSelection;
const SelectStartInvCompDate = (state) => state.investorComparatorTool.startInvCompDate;
const SelectEndInvCompDate = (state) => state.investorComparatorTool.endInvCompDate;
const SelectIsInvCompDateChecked = (state) => state.investorComparatorTool.isInvCompDateChecked;
const SelectIsProponentGroup = (state) => state.investorComparatorTool.isProponentGroup;
const SelectLstResolutionsByInvestorFilter = (state) => state.investorComparatorTool.lstResolutionsByInvestorFilter;
const SelectLstResolutionsByInvestorFilterFullData = (state) =>
  state.investorComparatorTool.lstResolutionsByInvestorFilterFullData;
const SelectLtResolutionInvDetails = (state) => state.investorComparatorTool.lstResolutionInvDetails;
const SelectLtResolutionInvDetailsFullData = (state) => state.investorComparatorTool.lstResolutionInvDetailsFullData;
const SelectLtIsShowInvestorDetails = (state) => state.investorComparatorTool.isShowInvestorDetails;
const SelectLtIsShowVotingDetails = (state) => state.investorComparatorTool.isShowVotingDetails;
const SelectSelectedInvestorDetailsProposalTypeId = (state) =>
  state.investorComparatorTool.selectedInvestorDetailsProposalTypeId;
const SelectSelectedInvestorDetailsProposalSubLevelTypeId = (state) =>
  state.investorComparatorTool.selectedInvestorDetailsProposalSubLevelTypeId;
const SelectSelectedInvestorDetailsProposalTopLevelTypeId = (state) =>
  state.investorComparatorTool.selectedInvestorDetailsProposalTopLevelTypeId;

const SelecIsLoading = (state) => state.investorComparatorTool.isLoading;
const SelecIsLoadingInvestorDetails = (state) => state.investorComparatorTool.isLoadingInvestorDetails;
const SelectCurrentResolutionTypeSelection = (state) => state.investorComparatorTool.currentResolutionTypeSelection;

const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;

const SelectisSelectedCalendarYearData = (state) => state.investorComparatorTool.isSelectedCalendarYearData;
const SelectisSelectedYearToDateData = (state) => state.investorComparatorTool.isSelectedYearToDateData;
const SelectisSelectedProxySeasonData = (state) => state.investorComparatorTool.isSelectedProxySeasonData;

// voting details
const SelectLstVotingDetails = (state) => state.investorComparatorTool.lstVotingDetails;
const SelectIsLoadingVotingDetails = (state) => state.investorComparatorTool.isLoadingVotingDetails;
const SelectlstVotingInvestorPower = (state) => state.investorComparatorTool.lstVotingInvestorPower;
const SelectLstVotingPvaImpact = (state) => state.investorComparatorTool.lstVotingPvaImpact;

// Historical Trends
const SelectIsShowInvestorTrends = (state) => state.investorComparatorTool.isShowInvestorTrends;
const SelectIsLoadHistoricalTrends = (state) => state.investorComparatorTool.isLoadHistoricalTrends;
const SelectLstDdlHistoricalsInvestors = (state) => state.investorComparatorTool.lstDdlHistoricalsInvestors;
const SelectDdlHistoricalInvestorSelection = (state) => state.investorComparatorTool.DdlhistoricalInvestorSelection;
const SelectLstHistoricalInvestors = (state) => state.investorComparatorTool.lstHistoricalInvestors;
const SelectIsShowHistoricalTrendsFor = (state) => state.investorComparatorTool.isShowHistoricalTrendsFor;
const SelectIsShowHistoricalTrendsAgainst = (state) => state.investorComparatorTool.isShowHistoricalTrendsAgainst;
const SelectIsShowHistoricalTrendsAbstain = (state) => state.investorComparatorTool.isShowHistoricalTrendsAbstain;
const SelectLstStackBarChartData = (state) => state.investorComparatorTool.lstStackBarChartData;
const SelectLstLineChartData = (state) => state.investorComparatorTool.lstLineChartData;

// Voting power
const SelectIsShowVotingPower = (state) => state.investorComparatorTool.isShowVotingPower;
const SelectIsLoadVotingPowerData = (state) => state.investorComparatorTool.isLoadVotingPowerData;

// selection
const SelectInvCompCompanyPeerGroupSelection = (state) => state.investorComparatorTool.invCompCompanyPeerGroupSelection;
const SelectInvCompInvestorPeerGroupSelection = (state) =>
  state.investorComparatorTool.invCompInvestorPeerGroupSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) => state.investorComparatorTool.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) =>
  state.investorComparatorTool.isResetInvestorPeerGroupSelection;
const SelectDecodeToken = (state) => state.investorComparatorTool.getTokenDecode;

const SelectlstAllHistoricalInvestorFullYear = (state) => state.investorComparatorTool.lstAllHistoricalInvestorFullYear;
const SelectlstAllHistoricalInvestorYTD = (state) => state.investorComparatorTool.lstAllHistoricalInvestorYTD;
const SelectlstAllHistoricalInvestorProxySeason = (state) =>
  state.investorComparatorTool.lstAllHistoricalInvestorProxySeason;
const selectLineChartShowData = (state) => state.investorComparatorTool.lineChartShowData;

const selectLstHistoricalInvestorsForYTD = (state) => state.investorComparatorTool.lstHistoricalInvestorsForYTD;
const selectLstHistoricalInvestorsAgainstYTD = (state) => state.investorComparatorTool.lstHistoricalInvestorsAgainstYTD;
const selectLstHistoricalInvestorsAbstainYTD = (state) => state.investorComparatorTool.lstHistoricalInvestorsAbstainYTD;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
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
  selectedInvestorDetailsProposalTypeId: SelectSelectedInvestorDetailsProposalTypeId(state),
  selectedInvestorDetailsProposalSubLevelTypeId: SelectSelectedInvestorDetailsProposalSubLevelTypeId(state),
  selectedInvestorDetailsProposalTopLevelTypeId: SelectSelectedInvestorDetailsProposalTopLevelTypeId(state),
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
  lstResolutionsByInvestorFilterFullData: SelectLstResolutionsByInvestorFilterFullData(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  isLoading: SelecIsLoading(state),
  isLoadingInvestorDetails: SelecIsLoadingInvestorDetails(state),
  isShowInvestorDetails: SelectLtIsShowInvestorDetails(state),
  isShowVotingDetails: SelectLtIsShowVotingDetails(state),
  isSelectedCalendarYearData: SelectisSelectedCalendarYearData(state),
  isSelectedYearToDateData: SelectisSelectedYearToDateData(state),
  isSelectedProxySeasonData: SelectisSelectedProxySeasonData(state),

  invCompCompanyPeerGroupSelection: SelectInvCompCompanyPeerGroupSelection(state),
  invCompInvestorPeerGroupSelection: SelectInvCompInvestorPeerGroupSelection(state),
  isResetCompanyPeerGroupSelection: SelectIsResetCompanyPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection: SelectIsResetInvestorPeerGroupSelection(state),

  lstAllHistoricalInvestorFullYear: SelectlstAllHistoricalInvestorFullYear(state),
  lstAllHistoricalInvestorYTD: SelectlstAllHistoricalInvestorYTD(state),
  lstAllHistoricalInvestorProxySeason: SelectlstAllHistoricalInvestorProxySeason(state),

  lstHistoricalInvestorsForYTD: selectLstHistoricalInvestorsForYTD(state),
  lstHistoricalInvestorsAgainstYTD: selectLstHistoricalInvestorsAgainstYTD(state),
  lstHistoricalInvestorsAbstainYTD: selectLstHistoricalInvestorsAbstainYTD(state),
  lineChartShowData: selectLineChartShowData(state),
});

const mapDispatchToProps = {
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
  handleOnChangeHistoricalInvestor,
  handleHistoricalTrendsSelection,
  handlePDFListItems,
  handlePDFMenuShow,
  handlePDFDownloadLoader,
  handleGeneratePDF,
  handlePDFDownloadCancelClick,
  //
  handleOnClickIsSelectedFullYearData,
  investorComparatorhistoricalTrendsChartProxySeasonDataReq,
  investorComparatorhistoricalTrendsChartYTDDataReq,
};

HistoricalTreandsPdfContainer.propTypes = {
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

HistoricalTreandsPdfContainer.defaultProps = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HistoricalTreandsPdfContainer));
