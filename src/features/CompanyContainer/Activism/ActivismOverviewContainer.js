import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import qs from 'qs';
import {
  getActivismOverviewGraphsReq,
  getCompanyOverviewProfileReq,
  handleResetActivismGraphs,
} from './../CompanySlice';
import {
  getActivistCampaignsDataListReq,
  handleResetCampaign,
} from '../Activism/ActivistCampaigns/ActivistCampaignsSlice';
import ActivismOverview from '../../../components/Company/Activism/ActivismOverview';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';
import { addTriallogReq } from '../../../features/CompanyContainer/TrialSlice';

const ActivismOverviewContainer = ({
  pid,
  location,
  children,
  getTrialOrActualTop20List,
  getActivismOverviewGraphsReq,
  allowDownload,
  activismTypeGraphdata,
  activismFocusGraphData,
  activismLocationGraphData,
  activsimSizeGraphData,
  activsimPublicDemandGraphData,
  company_overview,
  getCompanyOverviewProfileReq,
  table_ActivismOverviewTimeline,
  getActivistCampaignsDataListReq,
  table_ActivismOverviewSummary,
  handleResetActivismGraphs,
  isLoading,
  handleResetCampaign,
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
    handleResetActivismGraphs();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetActivismGraphs, handleResetCampaign]);

  const getAll = useCallback(async () => {
    if (query.pid !== undefined && distinctProfile !== null) {
      let pId = query.pid;
      if (distinctProfile) {
        pId = TypeConstants.TRIAL_PID;
      }
      await getActivismOverviewGraphsReq(pId);
      await getCompanyOverviewProfileReq(pId);
      await getActivistCampaignsDataListReq({
        indiv_campaigns: null,
        pid: pId,
        show_other_campaigns: null,
        isOverviewPage: true,
      });
    }
  }, [query.pid, distinctProfile]);

  useEffect(() => {
    getAll();
  }, [getAll, distinctProfile]);

  return (
    <ErrorBoundary>
      <ActivismOverview
        children={children}
        rowData={getTrialOrActualTop20List}
        allowDownload={allowDownload}
        activismTypeGraphdata={activismTypeGraphdata}
        activismFocusGraphData={activismFocusGraphData}
        activismLocationGraphData={activismLocationGraphData}
        activsimSizeGraphData={activsimSizeGraphData}
        activsimPublicDemandGraphData={activsimPublicDemandGraphData}
        company_overview={company_overview}
        table_ActivistCampaignTimeline={table_ActivismOverviewTimeline}
        table_ActivistCampaignSummary={table_ActivismOverviewSummary}
        isLoading={isLoading}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

ActivismOverviewContainer.propTypes = {
  allowDownload: PropTypes.bool,
  children: PropTypes.any,
  getTrialOrActualTop20List: PropTypes.any,
  location: PropTypes.object,
};

ActivismOverviewContainer.defaultProps = {
  allowDownload: false,
  getTrialOrActualTop20List: undefined,
  location: {},
};

const selectGetTrialOrActualTop20List = (state) =>
  state.company.getTrialOrActualTop20List;

const selectAllowDownload = (state) => state.company.allowDownload;
const selectActivismTypeGraphdata = (state) =>
  state.company.activismTypeGraphdata;
const selectActivismFocusGraphData = (state) =>
  state.company.activismFocusGraphData;
const selectActivismLocationGraphData = (state) =>
  state.company.activismLocationGraphData;
const selectActivsimSizeGraphData = (state) =>
  state.company.activsimSizeGraphData;
const selectActivsimPublicDemandGraphData = (state) =>
  state.company.activsimPublicDemandGraphData;
const selectCompanyOverview = (state) => state.company.company_overview;
const Select_table_ActivismOverviewTimeline = (state) =>
  state.activistCampaigns.table_ActivismOverviewTimeline;
const Select_table_ActivismOverviewSummary = (state) =>
  state.activistCampaigns.table_ActivismOverviewSummary;

const Select_isLoading = (state) => state.activistCampaigns.isLoading;

//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const SelectDecodeToken = (state) => state.company.getTokenDecode;

const mapStateToProps = (state) => ({
  getTrialOrActualTop20List: selectGetTrialOrActualTop20List(state),
  allowDownload: selectAllowDownload(state),
  activismTypeGraphdata: selectActivismTypeGraphdata(state),
  activismFocusGraphData: selectActivismFocusGraphData(state),
  activismLocationGraphData: selectActivismLocationGraphData(state),
  activsimSizeGraphData: selectActivsimSizeGraphData(state),
  activsimPublicDemandGraphData: selectActivsimPublicDemandGraphData(state),
  company_overview: selectCompanyOverview(state),
  table_ActivismOverviewTimeline: Select_table_ActivismOverviewTimeline(state),
  table_ActivismOverviewSummary: Select_table_ActivismOverviewSummary(state),
  isLoading: Select_isLoading(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
  token: SelectDecodeToken(state),
});

const mapDispatchToProps = {
  getActivismOverviewGraphsReq,
  getCompanyOverviewProfileReq,
  getActivistCampaignsDataListReq,
  handleResetActivismGraphs,
  handleResetCampaign,
  addTriallogReq,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivismOverviewContainer)
);
