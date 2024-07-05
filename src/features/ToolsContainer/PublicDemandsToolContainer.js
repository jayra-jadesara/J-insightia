import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PublicDemandsTool from '../../components/Tools/ActivismTools/PublicDemandsTool';
import { getTokenDecode, PublicCampaignToolListsReq } from './ToolsSlice';
import productConst, { ACTIVISM } from '../../constants/ProductConstants';
import { getProcedureRunningEstimateTimeReq } from '../General/TitleSlice';
import ProcedureConstant from '../../constants/ProcedureConstant';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { GetPageAccess } from '../../utils/tools-util';

const PublicDemandsToolContainer = ({
  token,
  PublicCampaignToolListsReq,
  publicDemandToolData,
  publicDemandToolHeading,
  publicDemandToolTrialStatus,
  publicDemandToolStatusIcon,
  isLoading,
  allowDownload,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  trialUserDisableDownload
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(
        ProcedureConstant.PUBLIC_CAMPAIGN_FULL_USER_LIST
      );
      await getTokenDecode();
      const resStatus = token.MemberShip.find(
        (c) => c.product_id === productConst.ACTIVISM
      ).status;
      await PublicCampaignToolListsReq({
        status: resStatus,
        product_id: productConst.ACTIVISM,
        cancelToken: source.token
      });
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
  }, [
    getTokenDecode,
    PublicCampaignToolListsReq,
    getProcedureRunningEstimateTimeReq
  ]);

  return (
    <ErrorBoundary>
      <PublicDemandsTool
        publicDemandToolData={publicDemandToolData}
        publicDemandToolHeading={publicDemandToolHeading}
        TrialStatus={publicDemandToolTrialStatus}
        StatusIcon={publicDemandToolStatusIcon}
        isLoading={isLoading}
        allowDownload={allowDownload}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

PublicDemandsToolContainer.propTypes = {
  PublicCampaignToolListsReq: PropTypes.func,
  allowDownload: PropTypes.bool,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  getTokenDecode: PropTypes.func,
  isLoading: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.any,
  publicDemandToolData: PropTypes.any,
  publicDemandToolHeading: PropTypes.any,
  publicDemandToolStatusIcon: PropTypes.any,
  publicDemandToolTrialStatus: PropTypes.any
};

PublicDemandsToolContainer.defaultProps = {
  PublicCampaignToolListsReq: () => {},
  allowDownload: false,
  getProcedureRunningEstimateTimeReq: () => {},
  getTokenDecode: () => {},
  isLoading: false
};

const SelectPublicDemandToolData = (state) => state.tools.publicDemandToolData;
const SelectPublicDemandToolHeading = (state) =>
  state.tools.publicDemandToolHeading;
const SelectPublicDemandToolTrialStatus = (state) =>
  state.tools.publicDemandToolTrialStatus;
const SelectPublicDemandToolstatusIcon = (state) =>
  state.tools.publicDemandToolStatusIcon;
const SelecIsLoading = (state) => state.tools.isLoading;
const selectAllowDownload = (state) => state.tools.allowDownload;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  publicDemandToolData: SelectPublicDemandToolData(state),
  publicDemandToolHeading: SelectPublicDemandToolHeading(state),
  publicDemandToolTrialStatus: SelectPublicDemandToolTrialStatus(state),
  publicDemandToolStatusIcon: SelectPublicDemandToolstatusIcon(state),
  isLoading: SelecIsLoading(state),
  allowDownload: selectAllowDownload(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getTokenDecode,
  PublicCampaignToolListsReq,
  getProcedureRunningEstimateTimeReq
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicDemandsToolContainer);
