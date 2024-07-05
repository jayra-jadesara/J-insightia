import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import InvestorActivismCampaign from '../../../components/Investor/InvestorActivism/InvestorActivismCampaign';
import {
  getInvestorActivistCampaignsDataListReq,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  handleResetActivistCampaign,
} from '../Activism/InvestorActivismSlice';
import { GET_INVESTOR_GROUPED_DATA } from '../../../constants/ProcedureConstant';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
} from '../../General/TitleSlice';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivismCampaignContainer = ({
  location,
  getInvestorActivistCampaignsDataListReq,
  DDLValues,
  chkCampaign,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  SetDDLCampaign,
  table_InvestorActivistCampaignSummary,
  table_PublicDemandDetail,
  table_InvestorActivistCampaignCharacteristics,
  table_Filings,
  table_InvestorActivistCampaignTimeline,
  table_InvestorTheses,
  table_InvestorShareholderProposals,
  table_InvestorAdvisors,
  table_InvestorStockPerformance,
  table_InvestorNews,
  table_NewsId,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  trialStatus,
  allowDownload,
  isLoading,
  DDLCampaign,
  header_InvestorActivistCampaignSummary,
  handleResetActivistCampaign,
  handleResetLoader,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetActivistCampaign();
    handleResetLoader();
    getProcedureRunningEstimateTimeReq(GET_INVESTOR_GROUPED_DATA);
    return function cleanup() {
      abortController.abort();
    };
  }, [
    handleResetActivistCampaign,
    handleResetLoader,
    getProcedureRunningEstimateTimeReq,
    location.pathname,
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    if (isLoading) {
      getProcedureRunningEstimateTimeReq(GET_INVESTOR_GROUPED_DATA);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [getProcedureRunningEstimateTimeReq, isLoading]);

  useEffect(() => {
    async function getAll(source) {
      if (
        query.investor !== undefined &&
        query.investor !== 'undefined' &&
        query.investor !== null &&
        distinctProfile !== null
      ) {
        let investorId = query.investor;
        if (distinctProfile) {
          investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
        }
        await getInvestorActivistCampaignsDataListReq({
          indiv_campaigns: DDLValues,
          investor_id: investorId,
          show_other_campaigns: chkCampaign,
          resultset: null,
          SetDDLCampaign,
          cancelToken: source.token,
        });
      }
    }
    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    if (procedureRunningEstimateTime !== undefined && isLoading) {
      getAll(source);
    }
    return function cleanup() {
      abortController.abort();
      source.cancel();
    };
  }, [
    query.investor,
    SetDDLCampaign,
    DDLValues,
    chkCampaign,
    distinctProfile,
    isLoading,
    procedureRunningEstimateTime,
  ]);

  if (
    !query.investor ||
    query.investor === 'undefined' ||
    query.investor === undefined ||
    query.investor === 'null'
  ) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }
  return (
    <ErrorBoundary>
      <InvestorActivismCampaign
        getInvestorActivistCampaignsDataListReq={
          getInvestorActivistCampaignsDataListReq
        }
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        DDLValues={DDLValues}
        chkCampaign={chkCampaign}
        handleSetCampaignDDL={handleSetCampaignDDL}
        handleSetChkCampaign={handleSetChkCampaign}
        handleIsLoading={handleIsLoading}
        SetDDLCampaign={SetDDLCampaign}
        table_InvestorActivistCampaignSummary={
          table_InvestorActivistCampaignSummary
        }
        table_PublicDemandDetail={table_PublicDemandDetail}
        table_InvestorActivistCampaignCharacteristics={
          table_InvestorActivistCampaignCharacteristics
        }
        table_Filings={table_Filings}
        table_InvestorActivistCampaignTimeline={
          table_InvestorActivistCampaignTimeline
        }
        table_InvestorTheses={table_InvestorTheses}
        table_InvestorShareholderProposals={table_InvestorShareholderProposals}
        table_InvestorAdvisors={table_InvestorAdvisors}
        table_InvestorStockPerformance={table_InvestorStockPerformance}
        table_InvestorNews={table_InvestorNews}
        table_NewsId={table_NewsId}
        allowDownload={allowDownload}
        isLoading={isLoading}
        DDLCampaign={DDLCampaign}
        investor={query.investor}
        header_InvestorActivistCampaignSummary={
          header_InvestorActivistCampaignSummary
        }
        handleResetLoader={handleResetLoader}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

const Select_table_InvestorActivistCampaignSummary = (state) =>
  state.InvestorActivismSlice.table_InvestorActivistCampaignSummary;
const Select_header_InvestorActivistCampaignSummary = (state) =>
  state.InvestorActivismSlice.header_InvestorActivistCampaignSummary;
const Select_table_PublicDemandDetail = (state) =>
  state.InvestorActivismSlice.table_PublicDemandDetail;
const Select_table_InvestorActivistCampaignCharacteristics = (state) =>
  state.InvestorActivismSlice.table_InvestorActivistCampaignCharacteristics;
const Select_table_Filings = (state) =>
  state.InvestorActivismSlice.table_Filings;
const Select_table_InvestorActivistCampaignTimeline = (state) =>
  state.InvestorActivismSlice.table_InvestorActivistCampaignTimeline;
const Select_table_InvestorTheses = (state) =>
  state.InvestorActivismSlice.table_InvestorTheses;
const Select_table_InvestorShareholderProposals = (state) =>
  state.InvestorActivismSlice.table_InvestorShareholderProposals;
const Select_table_InvestorAdvisors = (state) =>
  state.InvestorActivismSlice.table_InvestorAdvisors;
const Select_table_InvestorStockPerformance = (state) =>
  state.InvestorActivismSlice.table_InvestorStockPerformance;
const Select_table_InvestorNews = (state) =>
  state.InvestorActivismSlice.table_InvestorNews;
const Select_table_NewsId = (state) => state.InvestorActivismSlice.table_NewsId;

const Select_DDLCampaign = (state) => state.InvestorActivismSlice.DDLCampaign;
const Select_DDLValues = (state) => state.InvestorActivismSlice.DDLValues;
const Select_SetDDLCampaign = (state) =>
  state.InvestorActivismSlice.SetDDLCampaign;
const Select_chkCampaign = (state) => state.InvestorActivismSlice.chkCampaign;

const Select_trialStatus = (state) => state.InvestorActivismSlice.trialStatus;
const Select_allowDownload = (state) =>
  state.InvestorActivismSlice.allowDownload;
const Select_isLoading = (state) => state.InvestorActivismSlice.isLoading;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  table_InvestorActivistCampaignSummary:
    Select_table_InvestorActivistCampaignSummary(state),
  header_InvestorActivistCampaignSummary:
    Select_header_InvestorActivistCampaignSummary(state),
  table_PublicDemandDetail: Select_table_PublicDemandDetail(state),
  table_InvestorActivistCampaignCharacteristics:
    Select_table_InvestorActivistCampaignCharacteristics(state),
  table_Filings: Select_table_Filings(state),
  table_InvestorActivistCampaignTimeline:
    Select_table_InvestorActivistCampaignTimeline(state),
  table_InvestorTheses: Select_table_InvestorTheses(state),
  table_InvestorShareholderProposals:
    Select_table_InvestorShareholderProposals(state),
  table_InvestorAdvisors: Select_table_InvestorAdvisors(state),
  table_InvestorStockPerformance: Select_table_InvestorStockPerformance(state),
  table_InvestorNews: Select_table_InvestorNews(state),
  table_NewsId: Select_table_NewsId(state),
  DDLCampaign: Select_DDLCampaign(state),
  SetDDLCampaign: Select_SetDDLCampaign(state),
  DDLValues: Select_DDLValues(state),
  chkCampaign: Select_chkCampaign(state),

  trialStatus: Select_trialStatus(state),
  allowDownload: Select_allowDownload(state),
  isLoading: Select_isLoading(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

InvestorActivismCampaignContainer.propTypes = {
  location: PropTypes.object,
  getInvestorActivistCampaignsDataListReq: PropTypes.func.isRequired,
  DDLValues: PropTypes.any,
  chkCampaign: PropTypes.bool.isRequired,
  handleSetCampaignDDL: PropTypes.func.isRequired,
  handleSetChkCampaign: PropTypes.func.isRequired,
  handleIsLoading: PropTypes.func.isRequired,
  procedureRunningEstimateTime: PropTypes.number,
  SetDDLCampaign: PropTypes.array.isRequired,
  table_InvestorActivistCampaignSummary: PropTypes.array.isRequired,
  table_PublicDemandDetail: PropTypes.array.isRequired,
  table_InvestorActivistCampaignCharacteristics: PropTypes.array.isRequired,
  table_Filings: PropTypes.array.isRequired,
  table_InvestorActivistCampaignTimeline: PropTypes.array.isRequired,
  table_InvestorTheses: PropTypes.array.isRequired,
  table_InvestorShareholderProposals: PropTypes.array.isRequired,
  table_InvestorAdvisors: PropTypes.array.isRequired,
  table_InvestorStockPerformance: PropTypes.array.isRequired,
  table_InvestorNews: PropTypes.array.isRequired,
  getProcedureRunningEstimateTimeReq: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  DDLCampaign: PropTypes.array.isRequired,
  distinctProfile: PropTypes.any.isRequired,
};

InvestorActivismCampaignContainer.defaultProps = {
  procedureRunningEstimateTime: undefined,
  DDLValues: null,
};

const mapDispatchToProps = {
  getInvestorActivistCampaignsDataListReq,
  getProcedureRunningEstimateTimeReq,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  handleResetActivistCampaign,
  handleResetLoader,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorActivismCampaignContainer)
);
