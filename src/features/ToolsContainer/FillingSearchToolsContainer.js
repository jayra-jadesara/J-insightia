import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FillingsSearchTool from '../../components/Tools/ActivismTools/FillingsSearchTool';
import { getToolsActivismFillingsDataReq } from './FillingSearchToolsSlice';

import { getProcedureRunningEstimateTimeReq } from '../General/TitleSlice';
import ProcedureConstant from '../../constants/ProcedureConstant';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { getTokenDecode } from './ToolsSlice';
import { GetPageAccess } from '../../utils/tools-util';
import { ACTIVISM } from '../../constants/ProductConstants';

const FillingSearchToolsContainer = ({
  token,
  isLoading,
  allowDownload,
  getToolsActivismFillingsDataReq,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  lstToolsActivismFillingsData,
  isLoadingFillingData
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(
        ProcedureConstant.GETTOOLSACTIVISMFILLINGDATA
      );
      await getToolsActivismFillingsDataReq({ cancelToken: source.token });
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
  }, [getToolsActivismFillingsDataReq, getProcedureRunningEstimateTimeReq]);

  return (
    <ErrorBoundary>
      <FillingsSearchTool
        // TrialStatus={}
        //   StatusIcon={}
        isLoading={isLoading}
        allowDownload={allowDownload}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        lstToolsActivismFillingsData={lstToolsActivismFillingsData}
        isLoadingFillingData={isLoadingFillingData}
      />
    </ErrorBoundary>
  );
};

const SelectLstToolsActivismFillingsData = (state) =>
  state.fillingSearchTool.lstToolsActivismFillingsData;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectIsLoadingFillingData = (state) =>
  state.fillingSearchTool.isLoadingFillingData;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  lstToolsActivismFillingsData: SelectLstToolsActivismFillingsData(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  isLoadingFillingData: SelectIsLoadingFillingData(state)
});

const mapDispatchToProps = {
  getProcedureRunningEstimateTimeReq,
  getToolsActivismFillingsDataReq
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FillingSearchToolsContainer);
