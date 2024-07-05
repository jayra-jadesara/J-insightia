import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';
import {
  getAiSCompDisclosedShortPositionsReq,
  getHistoricShortPositionsReq,
  getAiSCompTotalShortPositionsReq,
  adm_Check_PIDReq,
  handleResetActivistShortsOverview,
  listActivistInvestorsForCompanyAiSReq,
  getActivismSummary_AiSReq,
  getCompanyOverviewProfileReq,
  getFDAProductRecallListReq,
} from '../ActivistShortsOverview/ActivistShortsOverviewSlice';
import { handleShortSellerCampaign } from '../../../DashboardContainer/DashboardSlice';
import ActivistShortsOverview from '../../../../components/Company/ActivistShorts/ActivistShortsOverview';
import ErrorBoundary from '../../../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../../../constants/TrialTypeConstants';
import pathConst from '../../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../../utils/general-util';

const ActivistShortsOverviewContainer = ({
  location,
  children,
  allowDownload,
  getAiSCompDisclosedShortPositionsReq,
  getAiSCompTotalShortPositionsReq,
  getHistoricShortPositionsReq,
  activismshortCurrentShortPositionrowData,
  activistShortHistoricShortPositionrowData,
  activistShortTotalShortPositionrowData,
  handleResetActivistShortsOverview,
  listActivistInvestorsForCompanyAiSReq,
  getActivismSummary_AiSReq,
  aiSInvestorForCompanyrowData,
  ddlForCampaingData,
  company_overview,
  ddlShortSellerCampaignData,
  handleShortSellerCampaign,
  aiSActivismSummaryrowData,
  getCompanyOverviewProfileReq,
  getFDAProductRecallListReq,
  rowData_FDAProductRecallList,
  adm_Check_PIDReq,
  adm_Check_PID,
  isLoadingData,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetActivistShortsOverview();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetActivistShortsOverview]);

  const getCompanyId = useCallback(
    async (pId) => {
      const abortController = new AbortController();
      await adm_Check_PIDReq(pId);
      return function cleanup() {
        abortController.abort();
      };
    },
    [adm_Check_PIDReq]
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (query.pid !== undefined && distinctProfile !== null) {
      let pId = query.pid;
      if (distinctProfile) {
        pId = TypeConstants.TRIAL_PID;
      }
      getCompanyId(pId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [getCompanyId, distinctProfile]);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.pid !== undefined && distinctProfile !== null) {
      let pId = query.pid;
      if (distinctProfile) {
        pId = TypeConstants.TRIAL_PID;
      }
      getAiSCompDisclosedShortPositionsReq(pId);
      getHistoricShortPositionsReq(pId);
      getAiSCompTotalShortPositionsReq(pId);
      getCompanyOverviewProfileReq(pId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    distinctProfile,
    getAiSCompDisclosedShortPositionsReq,
    getHistoricShortPositionsReq,
    getAiSCompTotalShortPositionsReq,
    getCompanyOverviewProfileReq
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getData(cmpId) {
      if (cmpId.company_id) {
        await listActivistInvestorsForCompanyAiSReq(cmpId.company_id);
        await getActivismSummary_AiSReq(cmpId.company_id);
        await getFDAProductRecallListReq(cmpId.company_id);
      }
    }
    getData(adm_Check_PID);
    return function cleanup() {
      abortController.abort();
    };
  }, [adm_Check_PID]);

  return (
    <ErrorBoundary>
      <ActivistShortsOverview
        children={children}
        allowDownload={allowDownload}
        activismshortCurrentShortPositionrowData={
          activismshortCurrentShortPositionrowData
        }
        activistShortTotalShortPositionrowData={
          activistShortTotalShortPositionrowData
        }
        activistShortHistoricShortPositionrowData={
          activistShortHistoricShortPositionrowData
        }
        aiSInvestorForCompanyrowData={aiSInvestorForCompanyrowData}
        ddlForCampaingData={ddlForCampaingData}
        company_overview={company_overview}
        ddlShortSellerCampaignData={ddlShortSellerCampaignData}
        handleShortSellerCampaign={handleShortSellerCampaign}
        aiSActivismSummaryrowData={aiSActivismSummaryrowData}
        rowData_FDAProductRecallList={rowData_FDAProductRecallList}
        isLoadingData={isLoadingData}
        // Tria;
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

// #region states assign
const SelectisLoadingData = (state) =>
  state.companyActivistShortsOverview.isLoadingData;

const SelectActivistShortCurrentShortPositionrowData = (state) =>
  state.companyActivistShortsOverview.rowData_activistShortCurrentShortPosition;

const SelectActivistShortHistoricShortPositionrowData = (state) =>
  state.companyActivistShortsOverview
    .rowData_activistShortHistoricShortPosition;
const SelectActivistShortTotalShortPositionrowData = (state) =>
  state.companyActivistShortsOverview.rowData_activistShortTotalShortPosition;
const SelectAiSInvestorForCompanyrowData = (state) => state.companyActivistShortsOverview.rowData_AiSInvestorForCompany;
const SelectAiSActivismSummaryrowData = (state) =>
  state.companyActivistShortsOverview.rowData_AiSActivismSummary;
const selectCompanyOverview = (state) =>
  state.companyActivistShortsOverview.company_overview;
const selectDdlShortSellerCampaignData = (state) =>
  state.companyActivistShortsOverview.ddlShortSellerCampaignData;
const SelectFDAProductRecallListData = (state) => state.companyActivistShortsOverview.rowData_FDAProductRecallList;

const selectadm_Check_PID = (state) =>
  state.companyActivistShortsOverview.adm_Check_PID;

const selectAllowDownload = (state) => state.company.allowDownload;
const selectDdlForCampaingData = (state) => state.company.ddlForCampaingData;
const selectDdlShortSellertSelectedVal = (state) =>
  state.dashboard.ddlShortSellertSelectedVal;

// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
// #endregion

// Binding values to the props from the state
const mapStateToProps = (state) => ({
  isLoadingData: SelectisLoadingData(state),

  activismshortCurrentShortPositionrowData:
    SelectActivistShortCurrentShortPositionrowData(state),

  adm_Check_PID: selectadm_Check_PID(state),

  activistShortHistoricShortPositionrowData:
    SelectActivistShortHistoricShortPositionrowData(state),
  activistShortTotalShortPositionrowData:
    SelectActivistShortTotalShortPositionrowData(state),
  aiSInvestorForCompanyrowData: SelectAiSInvestorForCompanyrowData(state),
  allowDownload: selectAllowDownload(state),
  ddlForCampaingData: selectDdlForCampaingData(state),
  company_overview: selectCompanyOverview(state),
  ddlShortSellerCampaignData: selectDdlShortSellerCampaignData(state),
  ddlShortSellertSelectedVal: selectDdlShortSellertSelectedVal(state),
  aiSActivismSummaryrowData: SelectAiSActivismSummaryrowData(state),
  rowData_FDAProductRecallList: SelectFDAProductRecallListData(state),

  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

// Mappinng the API calls to the props
const mapDispatchToProps = {
  getAiSCompDisclosedShortPositionsReq,
  getHistoricShortPositionsReq,
  getAiSCompTotalShortPositionsReq,
  handleResetActivistShortsOverview,
  listActivistInvestorsForCompanyAiSReq,
  getActivismSummary_AiSReq,
  handleShortSellerCampaign,
  getCompanyOverviewProfileReq,
  adm_Check_PIDReq,
  getFDAProductRecallListReq
};

ActivistShortsOverviewContainer.propTypes = {
  activismshortCurrentShortPositionrowData: PropTypes.array.isRequired,
  activistShortHistoricShortPositionrowData: PropTypes.array.isRequired,
  activistShortTotalShortPositionrowData: PropTypes.array.isRequired,
  allowDownload: PropTypes.bool,
  children: PropTypes.object,
  getAiSCompDisclosedShortPositionsReq: PropTypes.func.isRequired,
  getAiSCompTotalShortPositionsReq: PropTypes.func.isRequired,
  getHistoricShortPositionsReq: PropTypes.func.isRequired,
  handleResetActivistShortsOverview: PropTypes.func.isRequired,
  location: PropTypes.object,
  search: PropTypes.string,
  aiSInvestorForCompanyrowData: PropTypes.array.isRequired,
  ddlForCampaingData: PropTypes.array.isRequired
};

ActivistShortsOverviewContainer.defaultProps = {
  location: { search: '&id=' },
  children: {},
  allowDownload: false,
  search: ''
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivistShortsOverviewContainer)
);
