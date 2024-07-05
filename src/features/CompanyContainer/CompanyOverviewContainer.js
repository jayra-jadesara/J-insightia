import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import Overview from '../../components/Company/General/Overview';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';
import {
  getCompanyOverviewProfileReq,
  getCompanyStockEventsReq,
  handleResetCompanyOverview,
  adm_Check_PIDReq,
  getStockValues_graphReq,
  getLollipops_graphReq,
  vunSummaryScore,
  getcompany_PeerGroupOverviewReq,
  getPeerGroupNameReq,
  GetAdmGetCompanyShell_spacReq,
  handledLoading
} from './CompanySlice';
import {
  getGovOverview_meetingInfo_Quickview_StockDataReq,
  handleResetGovernance,
} from './Governance/GovernanceOverviewSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const CompanyOverviewContainer = ({
  location,
  children,
  getCompanyOverviewProfileReq,
  company_overview,
  handleResetCompanyOverview,
  getCompanyStockEventsReq,
  stock_events,
  getStockValues_graphReq,
  getLollipops_graphReq,
  annotatedStockGraph,
  lollipopsGraph,
  getGovOverview_meetingInfo_Quickview_StockDataReq,
  data_Chart,
  vunSummaryScore,
  vunSummaryScoreData,
  vunSummaryScoreDataScore,
  vunSummaryScoreDataMaxScore,
  handleResetGovernance,
  getcompany_PeerGroupOverviewReq,
  getPeerGroupNameReq,
  isLoadingData_Overview,
  lstCompanyPeerGroup,
  lblPeerGroups,
  lstOriginalData,
  GetAdmGetCompanyShell_spacReq,
  companyShellSPAC,
  shell_or_spac,
  handledLoading,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetGovernance();
    handleResetCompanyOverview();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetCompanyOverview, handleResetGovernance]);

  useEffect(() => {
    const abortController = new AbortController();
    const cancelToken = axios.CancelToken.source();

    if (query.pid) {
      getAll(cancelToken);
      const data = {
        pid: query.pid,
        cmp_search_id: null,
        activist_vulnerability: false,
        cancelToken: cancelToken.token,
      };
      getcompany_PeerGroupOverviewReq(data);
      getPeerGroupNameReq(query.pid);
    }
    return function cleanup() {
      abortController.abort();
      cancelToken.cancel();
    };
  }, [query.pid, getAll]);

  const getAll = useCallback(
    async (cancelToken) => {
      const abortController = new AbortController();
      const pidData = { pid: query.pid, cancelToken: cancelToken.token };

      const companyID = await adm_Check_PIDReq(query.pid);
      await getCompanyOverviewProfileReq(query.pid);
      await getCompanyStockEventsReq(query.pid);
      await getGovOverview_meetingInfo_Quickview_StockDataReq({
        pid: query.pid !== undefined ? query.pid : null,
      });
      await vunSummaryScore(pidData);
      await GetAdmGetCompanyShell_spacReq(query.pid);

      if (companyID.company_id) {
        await getStockValues_graphReq({ company_id: companyID.company_id });
        await getLollipops_graphReq({ company_id: companyID.company_id });
      }
      return function cleanup() {
        abortController.abort();
        cancelToken.cancel();
      };
    },
    [
      query.pid,
      getCompanyOverviewProfileReq,
      getCompanyStockEventsReq,
      getGovOverview_meetingInfo_Quickview_StockDataReq,
      vunSummaryScore,
      getStockValues_graphReq,
      getLollipops_graphReq,
      GetAdmGetCompanyShell_spacReq,
    ]
  );

  if (props.hasCompanyTitle === undefined) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  return (
    <ErrorBoundary>
      <Overview
        children={children}
        company_overview={company_overview}
        stock_events={stock_events}
        annotatedStockGraph={annotatedStockGraph}
        lollipopsGraph={lollipopsGraph}
        data_Chart={data_Chart}
        vunSummaryScoreData={vunSummaryScoreData}
        vunSummaryScoreDataScore={vunSummaryScoreDataScore}
        vunSummaryScoreDataMaxScore={vunSummaryScoreDataMaxScore}
        isLoadingData={isLoadingData_Overview}
        lstCompanyPeerGroup={lstCompanyPeerGroup}
        lstOriginalData={lstOriginalData}
        lblPeerGroups={lblPeerGroups}
        companyShellSPAC={companyShellSPAC}
        shell_or_spac={shell_or_spac}
      />
    </ErrorBoundary>
  );
};
CompanyOverviewContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.any.isRequired,
};
const selectCompanyOverview = (state) => state.company.company_overview;
const selectStockEvents = (state) => state.company.stock_events;
const selectAnnotatedStockGraph = (state) => state.company.annotatedStockGraph;
const selectLollipopsGraph = (state) => state.company.lollipopsGraph;
const selectVunSummaryScoreData = (state) => state.company.vunSummaryScoreData;
const selectVunSummaryScoreDataScore = (state) =>
  state.company.vunSummaryScoreDataScore;
const selectVunSummaryScoreDataMaxScore = (state) =>
  state.company.vunSummaryScoreDataMaxScore;
const Select_data_Chart = (state) => state.companyGovernanceOverview.data_Chart;
const Select_company_PeerGroupOverview = (state) =>
  state.company.lstCompanyPeerGroup;
const Select_company_lblPeerGroups = (state) => state.company.lblPeerGroups;
const Select_lstOriginalData = (state) => state.company.lstOriginalData;
const Select_isLoadingData = (state) => state.company.isLoadingData_Overview;

const selectshell_or_spac = (state) => state.company.shell_or_spac;
const selectcompanyShellSPAC = (state) => state.company.companyShellSPAC;
const selectHasCompanyTitle = (state) => state.headerTitle.hasCompanyTitle;

const mapStateToProps = (state) => ({
  company_overview: selectCompanyOverview(state),
  stock_events: selectStockEvents(state),
  annotatedStockGraph: selectAnnotatedStockGraph(state),
  lollipopsGraph: selectLollipopsGraph(state),
  vunSummaryScoreData: selectVunSummaryScoreData(state),
  vunSummaryScoreDataScore: selectVunSummaryScoreDataScore(state),
  vunSummaryScoreDataMaxScore: selectVunSummaryScoreDataMaxScore(state),
  data_Chart: Select_data_Chart(state),
  lstCompanyPeerGroup: Select_company_PeerGroupOverview(state),
  lblPeerGroups: Select_company_lblPeerGroups(state),
  lstOriginalData: Select_lstOriginalData(state),
  isLoadingData_Overview: Select_isLoadingData(state),
  shell_or_spac: selectshell_or_spac(state),
  companyShellSPAC: selectcompanyShellSPAC(state),
  hasCompanyTitle: selectHasCompanyTitle(state),
});
const mapDispatchToProps = {
  getCompanyOverviewProfileReq,
  handleResetCompanyOverview,
  getCompanyStockEventsReq,
  getGovOverview_meetingInfo_Quickview_StockDataReq,
  getStockValues_graphReq,
  getLollipops_graphReq,
  vunSummaryScore,
  handleResetGovernance,
  getcompany_PeerGroupOverviewReq,
  getPeerGroupNameReq,
  GetAdmGetCompanyShell_spacReq,
  handledLoading
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyOverviewContainer)
);
