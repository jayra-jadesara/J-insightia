import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import GovernanceOverview from '../../../components/Company/Governance/GovernanceOverview';
import {
  getGovOverview_meetingInfo_Quickview_StockDataReq,
  handleSetDDLComparision,
  handleIsLoading,
  getComparisionTablesReq,
  getBoardAndDirectorsIndexDDLReq,
  handleResetGovernance,
} from './GovernanceOverviewSlice';
import { getProcedureRunningEstimateTimeReq, handleResetCompanyTitle, handleResethasCompanyTitle } from '../../General/TitleSlice';
import pathConst from '../../../constants/PathsConstant';
import { GETGOVBOARDANDDIRECTORSDETAILS_V3 } from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const GovernanceOverviewContainer = ({
  getGovOverview_meetingInfo_Quickview_StockDataReq,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  handleIsLoading,
  getComparisionTablesReq,
  getBoardAndDirectorsIndexDDLReq,
  handleSetDDLComparision,
  //
  table_QuickView,
  table_MeetingInfo,
  trialStatus,
  allowDownload,
  isLoading,
  table_BoardandDirectors,
  table_Ownership,
  table_ShareholderRightsandVoting,
  table_Stock,
  data_Chart,
  data_ChartInfo,
  ddlComparision,
  selection_ddlComparision,
  handleResetGovernance,
  //
  location,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  //
  handleResethasCompanyTitle,
  handleResetCompanyTitle,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid) || !isIdNotNullOrUndefined(props.hasCompanyTitle)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    handleResetGovernance();
  }, [handleResetGovernance]);

  const getData = useCallback(async () => {
    if (distinctProfile) {
      await getBoardAndDirectorsIndexDDLReq({
        pid: TypeConstants.TRIAL_PID,
      });
      await getGovOverview_meetingInfo_Quickview_StockDataReq({
        pid: TypeConstants.TRIAL_PID,
      });
    } else {
      await getBoardAndDirectorsIndexDDLReq({
        pid: query.pid !== undefined ? query.pid : null,
      });
      await getGovOverview_meetingInfo_Quickview_StockDataReq({
        pid: query.pid !== undefined ? query.pid : null,
      });
    }
  }, [
    getBoardAndDirectorsIndexDDLReq,
    getGovOverview_meetingInfo_Quickview_StockDataReq,
    query.pid,
    distinctProfile,
  ]);

  // On Load first time data render
  useEffect(() => {
    getData();
  }, [getData]);

  // For Comparision DDL tables
  const getAll = useCallback(async () => {
    if (selection_ddlComparision.value !== undefined) {
      await getProcedureRunningEstimateTimeReq(
        GETGOVBOARDANDDIRECTORSDETAILS_V3
      );
      if (distinctProfile) {
        await getComparisionTablesReq({
          pid: TypeConstants.TRIAL_PID,
          filterindex: selection_ddlComparision.value,
        });
      } else {
        await getComparisionTablesReq({
          pid: query.pid !== undefined ? query.pid : null,
          filterindex: selection_ddlComparision.value,
        });
      }
    }
  }, [
    getProcedureRunningEstimateTimeReq,
    getComparisionTablesReq,
    query.pid,
    selection_ddlComparision.value,
  ]);

  useEffect(() => {
    // if (isLoading) {
    getAll();
    // }
  }, [getAll]);

  return (
    <ErrorBoundary>
      <GovernanceOverview
        getGovOverview_meetingInfo_Quickview_StockDataReq={
          getGovOverview_meetingInfo_Quickview_StockDataReq
        }
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        handleIsLoading={handleIsLoading}
        handleSetDDLComparision={handleSetDDLComparision}
        getComparisionTablesReq={getComparisionTablesReq}
        getBoardAndDirectorsIndexDDLReq={getBoardAndDirectorsIndexDDLReq}
        //
        table_QuickView={table_QuickView}
        table_MeetingInfo={table_MeetingInfo}
        table_BoardandDirectors={table_BoardandDirectors}
        table_ShareholderRightsandVoting={table_ShareholderRightsandVoting}
        table_Ownership={table_Ownership}
        table_Stock={table_Stock}
        data_Chart={data_Chart}
        data_ChartInfo={data_ChartInfo}
        ddlComparision={ddlComparision}
        selection_ddlComparision={selection_ddlComparision}
        TrialStatus={trialStatus}
        allowDownload={allowDownload}
        isLoading={isLoading}
        pid={query.pid}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
        handleResethasCompanyTitle={handleResethasCompanyTitle}
        handleResetCompanyTitle={handleResetCompanyTitle}
      />
    </ErrorBoundary>
  );
};

const Select_table_QuickView = (state) =>
  state.companyGovernanceOverview.table_QuickView;
const Select_table_MeetingInfo = (state) =>
  state.companyGovernanceOverview.table_MeetingInfo;
const Select_table_BoardandDirectors = (state) =>
  state.companyGovernanceOverview.table_BoardandDirectors;
const Select_table_ShareholderRightsandVoting = (state) =>
  state.companyGovernanceOverview.table_ShareholderRightsandVoting;
const Select_table_Ownership = (state) =>
  state.companyGovernanceOverview.table_Ownership;
const Select_table_Stock = (state) =>
  state.companyGovernanceOverview.table_Stock;
const Select_data_Chart = (state) => state.companyGovernanceOverview.data_Chart;
const Select_data_ChartInfo = (state) =>
  state.companyGovernanceOverview.data_ChartInfo;
const Select_ddlComparision = (state) =>
  state.companyGovernanceOverview.ddlComparision;
const Select_selection_ddlComparision = (state) =>
  state.companyGovernanceOverview.selection_ddlComparision;

const Select_trialStatus = (state) =>
  state.companyGovernanceOverview.trialStatus;
const Select_allowDownload = (state) =>
  state.companyGovernanceOverview.allowDownload;
const Select_isLoading = (state) => state.companyGovernanceOverview.isLoading;

// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const selectHasCompanyTitle = (state) => state.headerTitle.hasCompanyTitle;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  table_QuickView: Select_table_QuickView(state),
  table_MeetingInfo: Select_table_MeetingInfo(state),
  table_BoardandDirectors: Select_table_BoardandDirectors(state),
  table_ShareholderRightsandVoting:
    Select_table_ShareholderRightsandVoting(state),
  table_Ownership: Select_table_Ownership(state),
  table_Stock: Select_table_Stock(state),
  data_Chart: Select_data_Chart(state),
  data_ChartInfo: Select_data_ChartInfo(state),
  ddlComparision: Select_ddlComparision(state),
  selection_ddlComparision: Select_selection_ddlComparision(state),

  trialStatus: Select_trialStatus(state),
  allowDownload: Select_allowDownload(state),
  isLoading: Select_isLoading(state),

  // title slice
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  hasCompanyTitle: selectHasCompanyTitle(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

GovernanceOverviewContainer.propTypes = {
  getGovOverview_meetingInfo_Quickview_StockDataReq: PropTypes.func.isRequired,
  getProcedureRunningEstimateTimeReq: PropTypes.func.isRequired,
  handleIsLoading: PropTypes.func.isRequired,
  procedureRunningEstimateTime: PropTypes.number,
  getComparisionTablesReq: PropTypes.func.isRequired,
  getBoardAndDirectorsIndexDDLReq: PropTypes.func.isRequired,
  handleSetDDLComparision: PropTypes.func.isRequired,
  //
  table_QuickView: PropTypes.object.isRequired,
  table_MeetingInfo: PropTypes.object.isRequired,
  table_BoardandDirectors: PropTypes.array.isRequired,
  table_ShareholderRightsandVoting: PropTypes.array.isRequired,
  table_Ownership: PropTypes.array.isRequired,
  table_Stock: PropTypes.array.isRequired,
  data_Chart: PropTypes.object.isRequired,
  data_ChartInfo: PropTypes.string.isRequired,
  ddlComparision: PropTypes.array.isRequired,
  selection_ddlComparision: PropTypes.any,

  trialStatus: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  //
  location: PropTypes.object.isRequired,
};
GovernanceOverviewContainer.defaultProps = {
  procedureRunningEstimateTime: undefined,
  selection_ddlComparision: undefined
};

const mapDispatchToProps = {
  getGovOverview_meetingInfo_Quickview_StockDataReq,
  getProcedureRunningEstimateTimeReq,
  handleSetDDLComparision,
  handleIsLoading,
  getComparisionTablesReq,
  getBoardAndDirectorsIndexDDLReq,
  handleResetGovernance,
  handleResethasCompanyTitle,
  handleResetCompanyTitle
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GovernanceOverviewContainer)
);
