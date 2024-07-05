import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import HoldingsDataAndAnalyticsTool from '../../components/Tools/ActivismTools/HoldingsDataAndAnalyticsTool';
import {
  getLawFirmsDataShortActivismAdvisorReq,
  handleToggleShortsSwitch
} from './ShortActivistCampaignAdvisor_Slice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import ShortActivistCampaignAdvisor from '../../../components/Tools/ShortActivismTools/ShortActivistCampaignAdvisor';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { GetPageAccess } from '../../../utils/tools-util';
import { ACTIVIST_SHORTS } from '../../../constants/ProductConstants';
import { getTokenDecode } from '../ToolsSlice';

const ShortActivistCampaignAdvisor_Container = ({
  getLawFirmsDataShortActivismAdvisorReq,
  lstShortLawFirmsDataActivismAdvisor,
  isLoadingShortData,
  procedureRunningEstimateTime,
  allowDownload,
  handleToggleShortsSwitch,
  lstShortLawFirmsDataActivismAdvisor_Summary,
  toggleShortsSummary,
  token,
  trialUserDisableDownload
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;

    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(
        ProcedureConstant.SHORTSACTIVISTCAMPAIGNADVISOR
      );
      await getLawFirmsDataShortActivismAdvisorReq({ cancelToken: source.token });
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
  }, [getLawFirmsDataShortActivismAdvisorReq]);

  return (
    <ErrorBoundary>
      <ShortActivistCampaignAdvisor
        handleToggleShortsSwitch={handleToggleShortsSwitch}
        toggleShortsSummary={toggleShortsSummary}
        lstShortLawFirmsDataActivismAdvisor={
          lstShortLawFirmsDataActivismAdvisor
        }
        lstShortLawFirmsDataActivismAdvisor_Summary={
          lstShortLawFirmsDataActivismAdvisor_Summary
        }
        isLoadingShortData={isLoadingShortData}
        allowDownload={allowDownload}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

const selectLstShortLawFirmsDataActivismAdvisor = (state) =>
  state.shortsActivistCampaignAdvisor.lstShortLawFirmsDataActivismAdvisor;
const selectIsLoadingShortData = (state) =>
  state.shortsActivistCampaignAdvisor.isLoadingShortData;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectLstShortLawFirmsDataActivismAdvisor_Summary = (state) =>
  state.shortsActivistCampaignAdvisor
    .lstShortLawFirmsDataActivismAdvisor_Summary;
const selectToggleShortsSummary = (state) =>
  state.shortsActivistCampaignAdvisor.toggleShortsSummary;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  isLoadingShortData: selectIsLoadingShortData(state),
  toggleShortsSummary: selectToggleShortsSummary(state),
  lstShortLawFirmsDataActivismAdvisor:
    selectLstShortLawFirmsDataActivismAdvisor(state),
  lstShortLawFirmsDataActivismAdvisor_Summary:
    SelectLstShortLawFirmsDataActivismAdvisor_Summary(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  handleToggleShortsSwitch,
  getTokenDecode,
  getLawFirmsDataShortActivismAdvisorReq,
  getProcedureRunningEstimateTimeReq
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortActivistCampaignAdvisor_Container);
