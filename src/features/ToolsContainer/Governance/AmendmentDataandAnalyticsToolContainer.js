import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AmendmentDataAndAnalyticsTool from '../../../components/Tools/GovernanceTools/AmendmentDataAndAnalyticsTool';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { getDataAmendmentDataandAnalyticsReq } from './AmendmentDataandAnalyticsToolSlice';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { getTokenDecode } from '../ToolsSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { GOVERNANCE } from '../../../constants/ProductConstants';

const AmendmentDataandAnalyticsToolContainer = ({
  token,
  getDataAmendmentDataandAnalyticsReq,
  getProcedureRunningEstimateTimeReq,
  isLoadingAmendmentDataandAnalyticsTool,
  ...props
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(
        ProcedureConstant.GOVERNANCE_AMENDMENT_DATA_AND_ANALYTICS_TOOL
      );
      await getDataAmendmentDataandAnalyticsReq();
    }
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, GOVERNANCE);
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getAll();
    }
    prepAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <ErrorBoundary>
      <AmendmentDataAndAnalyticsTool
        {...props}
        isLoading={isLoadingAmendmentDataandAnalyticsTool}
      />
    </ErrorBoundary>
  );
};

AmendmentDataandAnalyticsToolContainer.propTypes = {};

AmendmentDataandAnalyticsToolContainer.defaultProps = {};

const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectIsLoadingAmendmentDataandAnalyticsTool = (state) =>
  state.amendmentDataandAnalyticsTool.isLoadingAmendmentDataandAnalyticsTool;
const SelectTable_AmendmentDataandAnalytics = (state) =>
  state.amendmentDataandAnalyticsTool.table_AmendmentDataandAnalytics;
  const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  isLoadingAmendmentDataandAnalyticsTool:
    SelectIsLoadingAmendmentDataandAnalyticsTool(state),
  table_AmendmentDataandAnalytics: SelectTable_AmendmentDataandAnalytics(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getDataAmendmentDataandAnalyticsReq,
  getProcedureRunningEstimateTimeReq
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AmendmentDataandAnalyticsToolContainer)
);
