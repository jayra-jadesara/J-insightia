import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  handleSwitchDataAndStats,
  getPoisonPillStatsReq,
  getRightsAgentReq,
  getPoisonPillRecentInsightiaReq
} from './PoisonPillDataAndAnalyticsSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import PoisonPillDataAndAnalytics from '../../../components/Tools/GovernanceTools/PoisonPillDataAndAnalyticsTool';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { getTokenDecode } from '../ToolsSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { GOVERNANCE } from '../../../constants/ProductConstants';

const PoisonPillDataAndAnalyticsContainer = ({
  token,
  allowDownload,
  handleSwitchDataAndStats,
  isPoisonData,
  getPoisonPillStatsReq,
  poisonPillGraph1,
  poisonPillGraph2,
  poisonPillGraph3,
  poisonPillPieChart,
  poisonPillCardData,
  getRightsAgentReq,
  lstRightsAgentData,
  getPoisonPillRecentInsightiaReq,
  lstPoisonPillRecentInsightia,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  isLoadingPoisonData,
  trialUserDisableDownload
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(
        ProcedureConstant.GETPOISONPILLRECENTINSIGHTIA
      );
      await getPoisonPillStatsReq();
      await getRightsAgentReq();
      await getPoisonPillRecentInsightiaReq();
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
  }, [
    getProcedureRunningEstimateTimeReq,
    getPoisonPillStatsReq,
    getRightsAgentReq,
    getPoisonPillRecentInsightiaReq
  ]);

  return (
    <ErrorBoundary>
      <PoisonPillDataAndAnalytics
        allowDownload={allowDownload}
        handleSwitchDataAndStats={handleSwitchDataAndStats}
        isPoisonData={isPoisonData}
        poisonPillGraph1={poisonPillGraph1}
        poisonPillGraph2={poisonPillGraph2}
        poisonPillGraph3={poisonPillGraph3}
        poisonPillPieChart={poisonPillPieChart}
        poisonPillCardData={poisonPillCardData}
        lstRightsAgentData={lstRightsAgentData}
        lstPoisonPillRecentInsightia={lstPoisonPillRecentInsightia}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        isLoadingPoisonData={isLoadingPoisonData}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

const SelectIsPoisonData = (state) => state.poisonpill.isPoisonData;
const SelectPoisonPillGraph1 = (state) => state.poisonpill.poisonPillGraph1;
const SelectPoisonPillGraph2 = (state) => state.poisonpill.poisonPillGraph2;
const SelectPoisonPillGraph3 = (state) => state.poisonpill.poisonPillGraph3;
const SelectPoisonPillPieChart = (state) => state.poisonpill.poisonPillPieChart;
const SelectPoisonPillCardData = (state) => state.poisonpill.poisonPillCardData;
const SelectLstRightsAgentData = (state) => state.poisonpill.lstRightsAgentData;
const SelectLstPoisonPillRecentInsightia = (state) =>
  state.poisonpill.lstPoisonPillRecentInsightia;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectIsLoadingPoisonData = (state) =>
  state.poisonpill.isLoadingPoisonData;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  isPoisonData: SelectIsPoisonData(state),
  poisonPillGraph1: SelectPoisonPillGraph1(state),
  poisonPillGraph2: SelectPoisonPillGraph2(state),
  poisonPillGraph3: SelectPoisonPillGraph3(state),
  poisonPillPieChart: SelectPoisonPillPieChart(state),
  poisonPillCardData: SelectPoisonPillCardData(state),
  lstRightsAgentData: SelectLstRightsAgentData(state),
  lstPoisonPillRecentInsightia: SelectLstPoisonPillRecentInsightia(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  isLoadingPoisonData: SelectIsLoadingPoisonData(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  handleSwitchDataAndStats,
  getPoisonPillStatsReq,
  getRightsAgentReq,
  getPoisonPillRecentInsightiaReq,
  getProcedureRunningEstimateTimeReq
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoisonPillDataAndAnalyticsContainer);
