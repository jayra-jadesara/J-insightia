import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as ToolsSlice from '../ToolsSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { GetPageAccess } from '../../../utils/tools-util';
import { ACTIVISM } from '../../../constants/ProductConstants';
import P4PModelerTool from '../../../components/Tools/CompensationTools/P4PModelerTools/P4PModelerTool';

const P4PMdelerContainer = ({
  token,
  HoldingsDataAndAnalyticsListReq,
  holdingdData,
  holdingdDataHeading,
  isLoading,
  allowDownload,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  trialUserDisableDownload,
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(ProcedureConstant.HOLDINGS_DATA_AND_ANALYTICS);
      await HoldingsDataAndAnalyticsListReq({ cancelToken: source.token });
    }
    async function getAccess() {
      await ToolsSlice.getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, ACTIVISM);
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getAll();
    }
    prepAccess();
    return function cleanup() {
      abortController.abort();
      source.cancel();
    };
  }, [HoldingsDataAndAnalyticsListReq, getProcedureRunningEstimateTimeReq]);

  return (
    <ErrorBoundary>
      <P4PModelerTool />
    </ErrorBoundary>
  );
};

P4PMdelerContainer.propTypes = {
  HoldingsDataAndAnalyticsListReq: PropTypes.func,
  allowDownload: PropTypes.bool,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  isLoading: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.any,
  holdingdDataHeading: PropTypes.any,
};

P4PMdelerContainer.defaultProps = {
  HoldingsDataAndAnalyticsListReq: () => {},
  allowDownload: false,
  getProcedureRunningEstimateTimeReq: () => {},
  isLoading: false,
};

const SelectHoldingdData = (state) => state.tools.holdingdData;
const SelectHoldingdDataHeading = (state) => state.tools.holdingdDataHeading;
const SelecIsLoading = (state) => state.tools.isLoading;
const selectAllowDownload = (state) => state.tools.allowDownload;
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  holdingdData: SelectHoldingdData(state),
  holdingdDataHeading: SelectHoldingdDataHeading(state),
  isLoading: SelecIsLoading(state),
  allowDownload: selectAllowDownload(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state),
});
const mapDispatchToProps = {
  HoldingsDataAndAnalyticsListReq: ToolsSlice.HoldingsDataAndAnalyticsListReq,
  getProcedureRunningEstimateTimeReq,
};

export default connect(mapStateToProps, mapDispatchToProps)(P4PMdelerContainer);
