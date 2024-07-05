import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ShortCampaignDataandAnalyticsTool from '../../../components/Tools/ShortActivismTools/ShortCampaignDataandAnalyticsTool';
import {
  getAiSCampaignInformationReq,
  getShortCampaignSamlpeDataReq,
  handleOnChangeDdlSelectedValue,
  handleResetShortCampaignDataAndAnalyticsTool
} from './ShortCampaignDataandAnalyticsToolSlice';
import { handleButtonAccess, getTokenDecode } from '../ToolsSlice';
import { history } from '../../../utils/navigation-util';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GET_AIS_CAMPAIGN_INFORMATION_INSIGHTIA } from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { TOOLMENU } from '../../../constants/PathsConstant';
import { GetPageAccess } from '../../../utils/tools-util';
import { ACTIVIST_SHORTS } from '../../../constants/ProductConstants';
import { addTriallogReq } from '../../CompanyContainer/TrialSlice';

const ShortCampaignDataandAnalyticsContainer = ({
  getTokenDecode,
  token,
  handleButtonAccess,
  getProcedureRunningEstimateTimeReq,
  getAiSCampaignInformationReq,
  getShortCampaignSamlpeDataReq,
  isCampaignDataandAnalyticsLoading,
  lstCampaignDataandAnalyticsData,
  lstShortCampaignSampleData,
  procedureRunningEstimateTime,
  allowDownload,
  userMessage,
  trialStatus,
  ddlSelectedValue,
  handleOnChangeDdlSelectedValue,
  handleResetShortCampaignDataAndAnalyticsTool,
  trialUserDisableDownload
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    async function getAll() {
        await handleResetShortCampaignDataAndAnalyticsTool();
        await getProcedureRunningEstimateTimeReq(
          GET_AIS_CAMPAIGN_INFORMATION_INSIGHTIA
        );
        await getAiSCampaignInformationReq({ cancelToken: source.token });
          await getShortCampaignSamlpeDataReq({ cancelToken: source.token });
    }

    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, ACTIVIST_SHORTS);
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
    getAiSCampaignInformationReq,
    getProcedureRunningEstimateTimeReq,
    getShortCampaignSamlpeDataReq,
    handleResetShortCampaignDataAndAnalyticsTool,
  ]);

  return (
    <ErrorBoundary>
      <ShortCampaignDataandAnalyticsTool
        isCampaignDataandAnalyticsLoading={isCampaignDataandAnalyticsLoading}
        lstCampaignDataandAnalyticsData={lstCampaignDataandAnalyticsData}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        lstShortCampaignSampleData={lstShortCampaignSampleData}
        allowDownload={allowDownload}
        userMessage={userMessage}
        trialStatus={trialStatus}
        ddlSelectedValue={ddlSelectedValue}
        handleOnChangeDdlSelectedValue={handleOnChangeDdlSelectedValue}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

ShortCampaignDataandAnalyticsContainer.propTypes = {
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  getAiSCampaignInformationReq: PropTypes.func,
  getShortCampaignSamlpeDataReq: PropTypes.func,
  isCampaignDataandAnalyticsLoading: PropTypes.bool,
  allowDownload: PropTypes.bool,
  trialStatus: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.number,
  lstCampaignDataandAnalyticsData: PropTypes.array,
  lstShortCampaignSampleData: PropTypes.array,
  userMessage: PropTypes.string,
  ddlSelectedValue: PropTypes.any
};

ShortCampaignDataandAnalyticsContainer.defaultProps = {
  getProcedureRunningEstimateTimeReq: () => null,
  getAiSCampaignInformationReq: () => null,
  getShortCampaignSamlpeDataReq: () => null,
  isCampaignDataandAnalyticsLoading: true,
  allowDownload: true,
  trialStatus: true,
  procedureRunningEstimateTime: undefined,
  lstCampaignDataandAnalyticsData: [],
  lstShortCampaignSampleData: [],
  userMessage: '',
  ddlSelectedValue: undefined
};
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectIsCampaignDataandAnalyticsLoading = (state) =>
  state.shortCampaignDataandAnalytics.isCampaignDataandAnalyticsLoading;
const SelectLstCampaignDataandAnalyticsData = (state) =>
  state.shortCampaignDataandAnalytics.lstCampaignDataandAnalyticsData;
const selectAllowDownload = (state) =>
  state.shortCampaignDataandAnalytics.allowDownload;
const SelectUserMessage = (state) =>
  state.shortCampaignDataandAnalytics.userMessage;
const SelectTrialStatus = (state) =>
  state.shortCampaignDataandAnalytics.trialStatus;
const SelectLstShortCampaignSampleData = (state) =>
  state.shortCampaignDataandAnalytics.lstShortCampaignSampleData;
const SelectDdlSelectedValue = (state) =>
  state.shortCampaignDataandAnalytics.ddlSelectedValue;
// title
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  isCampaignDataandAnalyticsLoading:
    SelectIsCampaignDataandAnalyticsLoading(state),
  lstCampaignDataandAnalyticsData: SelectLstCampaignDataandAnalyticsData(state),
  allowDownload: selectAllowDownload(state),
  userMessage: SelectUserMessage(state),
  trialStatus: SelectTrialStatus(state),
  lstShortCampaignSampleData: SelectLstShortCampaignSampleData(state),
  ddlSelectedValue: SelectDdlSelectedValue(state),
  // title
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getAiSCampaignInformationReq,
  getProcedureRunningEstimateTimeReq,
  getShortCampaignSamlpeDataReq,
  handleOnChangeDdlSelectedValue,
  handleButtonAccess,
  getTokenDecode,
  handleResetShortCampaignDataAndAnalyticsTool,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShortCampaignDataandAnalyticsContainer)
);
