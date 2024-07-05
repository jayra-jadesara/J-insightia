import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  getActivistCampaignsToolReq,
  handleToggleSwitch,
  handleActivistCampaignsToolReset
} from '../ToolsContainer/ToolsSlice';
import { getTokenDecode } from '../CompanyContainer/CompanySlice';
import { getProcedureRunningEstimateTimeReq } from '../General/TitleSlice';
import ProcedureConstant from '../../constants/ProcedureConstant';
import ActivistCampaignsTool from '../../components/Tools/ActivismTools/ActivistCampaignsTool';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { GetPageAccess } from '../../utils/tools-util';
import { ACTIVISM } from '../../constants/ProductConstants';

const ActivistCampaignsContainer = ({
  allowDownload,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  toggleSummary,
  getActivistCampaignsToolReq,
  handleActivistCampaignsToolReset,
  handleToggleSwitch,
  getActivistCampaignsTool,
  token,
  isLoadingData,
  trialUserDisableDownload
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    async function getAll() {
      await handleActivistCampaignsToolReset();
      await getProcedureRunningEstimateTimeReq(
        ProcedureConstant.ACTIVISTCAMPAIGNS
      );
      await getActivistCampaignsToolReq({ cancelToken: source.token });
    }
    async function getAccess() {
      await getTokenDecode();
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
  }, [getActivistCampaignsToolReq, getProcedureRunningEstimateTimeReq]);

  return (
    <ErrorBoundary>
      <ActivistCampaignsTool
        toggleSummary={toggleSummary}
        handleToggleSwitch={handleToggleSwitch}
        handleActivistCampaignsToolReset={handleActivistCampaignsToolReset}
        getActivistCampaignsTool={getActivistCampaignsTool}
        isLoadingData={isLoadingData}
        allowDownload={allowDownload}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

const selectIsLoadingData = (state) => state.tools.isLoadingData;
const selectAllowDownload = (state) => state.tools.allowDownload;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const selectToggleSummary = (state) => state.tools.toggleSummary;
const selectGetActivistCampaignsTool = (state) =>
  state.tools.getActivistCampaignsTool;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  isLoadingData: selectIsLoadingData(state),
  allowDownload: selectAllowDownload(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  toggleSummary: selectToggleSummary(state),
  getActivistCampaignsTool: selectGetActivistCampaignsTool(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getTokenDecode,
  getActivistCampaignsToolReq,
  handleToggleSwitch,
  getProcedureRunningEstimateTimeReq,
  handleActivistCampaignsToolReset
};

ActivistCampaignsContainer.propTypes = {
  getActivistCampaignsToolReq: PropTypes.func,
  allowDownload: PropTypes.bool,
  // getProcedureRunningEstimateTimeReq: PropTypes.func,
  getTokenDecode: PropTypes.func,
  isLoadingData: PropTypes.bool
};

ActivistCampaignsContainer.defaultProps = {
  getActivistCampaignsToolReq: () => {},
  allowDownload: false,
  // getProcedureRunningEstimateTimeReq: () => {},
  getTokenDecode: () => {},
  isLoadingData: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivistCampaignsContainer);
