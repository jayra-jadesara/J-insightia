import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import ActivistCampaigns from '../../../../components/Company/Activism/ActivistCampaigns';
import ErrorBoundary from '../../../../components/GeneralForm/ErrorBoundary';
import {
  getActivistCampaignsDataListReq,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  handleResetCampaign,
} from '../ActivistCampaigns/ActivistCampaignsSlice';
import pathConst from '../../../../constants/PathsConstant';
import { GETCOMPANYGROUPEDJOINTDEMANDSPAGEDATA } from '../../../../constants/ProcedureConstant';
import TypeConstants from '../../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../../utils/general-util';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
} from '../../../General/TitleSlice';
import { addTriallogReq } from '../../../../features/CompanyContainer/TrialSlice';

const ActivistCampaignsContainer = ({
  getActivistCampaignsDataListReq,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  //
  table_ActivistCampaignSummary,
  table_PublicDemandDetail,
  header_ActivistCampaignSummary,
  table_ActivistCampaignCharacteristics,
  table_Filings,
  table_ActivistCampaignTimeline,
  table_Theses,
  table_ShareholderProposals,
  table_Advisors,
  table_StockPerformance,
  table_News,
  table_NewsId,
  DDLCampaign,
  SetDDLCampaign,
  DDLValues,
  chkCampaign,
  trialStatus,
  allowDownload,
  isLoading,
  handleResetCampaign,
  handleResetLoader,
  location,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetCampaign();
    handleResetLoader();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetCampaign, handleResetLoader]);

  useEffect(() => {
    const abortController = new AbortController();
    if (isLoading) {
      getProcedureRunningEstimateTimeReq(GETCOMPANYGROUPEDJOINTDEMANDSPAGEDATA);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [getProcedureRunningEstimateTimeReq, isLoading]);

  useEffect(() => {
    async function getAll() {
      if (query.pid !== undefined && distinctProfile !== null) {
        let pId = query.pid;
        if (distinctProfile) {
          pId = TypeConstants.TRIAL_PID;
        }
        await getActivistCampaignsDataListReq({
          indiv_campaigns: DDLValues,
          pid: pId,
          show_other_campaigns: chkCampaign,
          resultset: null,
          SetDDLCampaign,
        });
      }
    }
    const abortController = new AbortController();
    if (isLoading) {
      getAll();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    query.pid,
    getActivistCampaignsDataListReq,
    SetDDLCampaign,
    DDLValues,
    chkCampaign,
    distinctProfile,
    isLoading,
  ]);

  return (
    <ErrorBoundary>
      <ActivistCampaigns
        getActivistCampaignsDataListReq={getActivistCampaignsDataListReq}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        handleSetCampaignDDL={handleSetCampaignDDL}
        handleSetChkCampaign={handleSetChkCampaign}
        handleIsLoading={handleIsLoading}
        //
        table_ActivistCampaignSummary={table_ActivistCampaignSummary}
        table_PublicDemandDetail={table_PublicDemandDetail}
        table_ActivistCampaignCharacteristics={
          table_ActivistCampaignCharacteristics
        }
        table_Filings={table_Filings}
        header_ActivistCampaignSummary={header_ActivistCampaignSummary}
        table_ActivistCampaignTimeline={table_ActivistCampaignTimeline}
        table_Theses={table_Theses}
        table_ShareholderProposals={table_ShareholderProposals}
        table_Advisors={table_Advisors}
        table_StockPerformance={table_StockPerformance}
        table_CompanyCampaign_News={table_News}
        table_CompanyCampaign_NewsIds={table_NewsId}
        DDLCampaign={DDLCampaign}
        DDLValues={DDLValues}
        SetDDLCampaign={SetDDLCampaign}
        chkCampaign={chkCampaign}
        // TrialStatus={trialStatus}
        allowDownload={allowDownload}
        isLoading={isLoading}
        pid={query.pid}
        handleResetLoader={handleResetLoader}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

// #region states assign
const Select_table_ActivistCampaignSummary = (state) =>
  state.activistCampaigns.table_ActivistCampaignSummary;
const Select_table_PublicDemandDetail = (state) =>
  state.activistCampaigns.table_PublicDemandDetail;
const Select_table_ActivistCampaignCharacteristics = (state) =>
  state.activistCampaigns.table_ActivistCampaignCharacteristics;
const Select_table_Filings = (state) => state.activistCampaigns.table_Filings;
const Select_table_ActivistCampaignTimeline = (state) =>
  state.activistCampaigns.table_ActivistCampaignTimeline;
const Select_header_ActivistCampaignSummary = (state) =>
  state.activistCampaigns.header_ActivistCampaignSummary;
const Select_table_Theses = (state) => state.activistCampaigns.table_Theses;
const Select_table_ShareholderProposals = (state) =>
  state.activistCampaigns.table_ShareholderProposals;
const Select_table_Advisors = (state) => state.activistCampaigns.table_Advisors;
const Select_table_StockPerformance = (state) =>
  state.activistCampaigns.table_StockPerformance;
const Select_table_News = (state) => state.activistCampaigns.table_News;
const Select_table_NewsId = (state) => state.activistCampaigns.table_NewsId;
const Select_DDLCampaign = (state) => state.activistCampaigns.DDLCampaign;
const Select_DDLValues = (state) => state.activistCampaigns.DDLValues;
const Select_SetDDLCampaign = (state) => state.activistCampaigns.SetDDLCampaign;
const Select_chkCampaign = (state) => state.activistCampaigns.chkCampaign;

const Select_trialStatus = (state) => state.activistCampaigns.trialStatus;
const Select_allowDownload = (state) => state.activistCampaigns.allowDownload;
const Select_isLoading = (state) => state.activistCampaigns.isLoading;

// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;

//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const SelectDecodeToken = (state) => state.company.getTokenDecode;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
// #endregion

const mapStateToProps = (state) => ({
  table_ActivistCampaignSummary: Select_table_ActivistCampaignSummary(state),
  table_PublicDemandDetail: Select_table_PublicDemandDetail(state),
  header_ActivistCampaignSummary: Select_header_ActivistCampaignSummary(state),
  table_ActivistCampaignCharacteristics:
    Select_table_ActivistCampaignCharacteristics(state),
  table_Filings: Select_table_Filings(state),
  table_ActivistCampaignTimeline: Select_table_ActivistCampaignTimeline(state),
  table_Theses: Select_table_Theses(state),
  table_ShareholderProposals: Select_table_ShareholderProposals(state),
  table_Advisors: Select_table_Advisors(state),
  table_StockPerformance: Select_table_StockPerformance(state),
  table_News: Select_table_News(state),
  table_NewsId: Select_table_NewsId(state),
  DDLCampaign: Select_DDLCampaign(state),
  SetDDLCampaign: Select_SetDDLCampaign(state),
  DDLValues: Select_DDLValues(state),
  chkCampaign: Select_chkCampaign(state),

  trialStatus: Select_trialStatus(state),
  allowDownload: Select_allowDownload(state),
  isLoading: Select_isLoading(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  token: SelectDecodeToken(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

ActivistCampaignsContainer.propTypes = {
  getActivistCampaignsDataListReq: PropTypes.func.isRequired,
  getProcedureRunningEstimateTimeReq: PropTypes.func.isRequired,
  handleSetCampaignDDL: PropTypes.func.isRequired,
  handleSetChkCampaign: PropTypes.func.isRequired,
  handleIsLoading: PropTypes.func.isRequired,
  procedureRunningEstimateTime: PropTypes.number,
  //
  table_ActivistCampaignSummary: PropTypes.array.isRequired,
  table_PublicDemandDetail: PropTypes.array.isRequired,
  table_ActivistCampaignCharacteristics: PropTypes.array.isRequired,
  table_Filings: PropTypes.array.isRequired,
  table_ActivistCampaignTimeline: PropTypes.array.isRequired,
  table_Theses: PropTypes.array.isRequired,
  table_ShareholderProposals: PropTypes.array.isRequired,
  table_Advisors: PropTypes.array.isRequired,
  table_StockPerformance: PropTypes.array.isRequired,
  table_News: PropTypes.array.isRequired,
  table_NewsId: PropTypes.array.isRequired,
  DDLCampaign: PropTypes.array.isRequired,
  SetDDLCampaign: PropTypes.array.isRequired,
  DDLValues: PropTypes.any,
  chkCampaign: PropTypes.bool.isRequired,

  trialStatus: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  //
  location: PropTypes.object.isRequired,
};
ActivistCampaignsContainer.defaultProps = {
  procedureRunningEstimateTime: undefined,
  DDLValues: null,
};

const mapDispatchToProps = {
  getActivistCampaignsDataListReq,
  getProcedureRunningEstimateTimeReq,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  addTriallogReq,
  handleResetCampaign,
  handleResetLoader,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivistCampaignsContainer)
);
