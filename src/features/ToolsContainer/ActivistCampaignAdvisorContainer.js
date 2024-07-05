import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import HoldingsDataAndAnalyticsTool from '../../components/Tools/ActivismTools/HoldingsDataAndAnalyticsTool';
import {
  getLawFirmsDataActivismAdvisorReq,
  handleToggleSwitch
} from './ActivistCampaignAdvisorSlice';
import { getTokenDecode } from '../CompanyContainer/CompanySlice';
import { getProcedureRunningEstimateTimeReq } from '../General/TitleSlice';
import ProcedureConstant from '../../constants/ProcedureConstant';
import ActivistCampaignAdvisor from '../../components/Tools/ActivismTools/ActivistCampaignAdvisor';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { ACTIVISM } from '../../constants/ProductConstants';
import { GetPageAccess } from '../../utils/tools-util';

const ActivistCampaignAdvisorContainer = ({
  token,
  getLawFirmsDataActivismAdvisorReq,
  toggleSummary,
  handleToggleSwitch,
  lstLawFirmsDataActivismAdvisor,
  isLoadingData,
  allowDownload,
  getProcedureRunningEstimateTimeReq,
  lstLawFirmsDataActivismAdvisor_Summary,
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
        ProcedureConstant.ACTIVISTCAMPAIGNADVISOR
      );
      await getLawFirmsDataActivismAdvisorReq({ cancelToken: source.token });
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
  }, [getLawFirmsDataActivismAdvisorReq, getProcedureRunningEstimateTimeReq]);

  return (
    <ErrorBoundary>
      <ActivistCampaignAdvisor
        toggleSummary={toggleSummary}
        handleToggleSwitch={handleToggleSwitch}
        lstLawFirmsDataActivismAdvisor={lstLawFirmsDataActivismAdvisor}
        lstLawFirmsDataActivismAdvisor_Summary={
          lstLawFirmsDataActivismAdvisor_Summary
        }
        isLoadingData={isLoadingData}
        allowDownload={allowDownload}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

const selectToggleSummary = (state) =>
  state.ActivistCampaignAdvisor.toggleSummary;
const selectlstLawFirmsDataActivismAdvisor = (state) =>
  state.ActivistCampaignAdvisor.lstLawFirmsDataActivismAdvisor;
const selectIsLoadingData = (state) =>
  state.ActivistCampaignAdvisor.isLoadingData;
const SelectLstLawFirmsDataActivismAdvisor_Summary = (state) =>
  state.ActivistCampaignAdvisor.lstLawFirmsDataActivismAdvisor_Summary;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  toggleSummary: selectToggleSummary(state),
  lstLawFirmsDataActivismAdvisor: selectlstLawFirmsDataActivismAdvisor(state),
  isLoadingData: selectIsLoadingData(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  lstLawFirmsDataActivismAdvisor_Summary:
    SelectLstLawFirmsDataActivismAdvisor_Summary(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getTokenDecode,
  getLawFirmsDataActivismAdvisorReq,
  handleToggleSwitch,
  getProcedureRunningEstimateTimeReq
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivistCampaignAdvisorContainer);
