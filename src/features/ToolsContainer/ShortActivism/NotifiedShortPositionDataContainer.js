import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import NotifiedShortPositionDataTool from '../../../components/Tools/ShortActivismTools/NotifiedShortPositionDataTool';
import {
  getAiSCountriesAndStatsReq,
  handleOnChangeDdlCountriesAndState,
  getShortPositionsReq
} from './NotifiedShortPositionDataSlice';
import {
  SHORT_ACTIVISM_DEFAULT_DDL_COUNTRY_VALUE,
  SHORT_ACTIVISM_DEFAULT_DDL_COUNTRY_LABEL
} from '../../../constants/ShortActivismConstant';
import {
  getProcedureRunningEstimateTimeReq
} from '../../General/TitleSlice';
import { NOTIFIED_SHORT_POSITION_DATA } from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { getTokenDecode } from '../ToolsSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { ACTIVIST_SHORTS } from '../../../constants/ProductConstants';

const NotifiedShortPositionDataContainer = ({
  getAiSCountriesAndStatsReq,
  lstDdlAISCountriesAndState,
  lstDdlAISCountriesAndStateMostShortedSelection,
  handleOnChangeDdlCountriesAndState,
  lstShortPosition,
  getShortPositionsReq,
  trialStatus,
  userMessage,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  isLoadingMostShortedData,
  token,
  trialUserDisableDownload
}) => {
  // useEffect(async () => {
  //   await getProcedureRunningEstimateTimeReq(NOTIFIED_SHORT_POSITION_DATA);
  // }, [getProcedureRunningEstimateTimeReq]);
  useEffect(() => {
    let validation = false;
    let pageAccess = false;

    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    const getAll = async () => {
       await getProcedureRunningEstimateTimeReq(NOTIFIED_SHORT_POSITION_DATA);
       await getAiSCountriesAndStatsReq({
          defailtValue: SHORT_ACTIVISM_DEFAULT_DDL_COUNTRY_VALUE,
          defaultLabel: SHORT_ACTIVISM_DEFAULT_DDL_COUNTRY_LABEL,
          cancelToken: source.token
       });
       await getShortPositionsReq({ country_id: SHORT_ACTIVISM_DEFAULT_DDL_COUNTRY_VALUE, cancelToken: source.token });
    };
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
  }, [getAiSCountriesAndStatsReq, getShortPositionsReq]);

  return (
    <ErrorBoundary>
      <NotifiedShortPositionDataTool
        lstDdlAISCountriesAndState={lstDdlAISCountriesAndState}
        lstDdlAISCountriesAndStateMostShortedSelection={
          lstDdlAISCountriesAndStateMostShortedSelection
        }
        handleOnChangeDdlCountriesAndState={handleOnChangeDdlCountriesAndState}
        lstShortPosition={lstShortPosition}
        getShortPositionsReq={getShortPositionsReq}
        trialStatus={trialStatus}
        userMessage={userMessage}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        isLoadingMostShortedData={isLoadingMostShortedData}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

const SelectLstAISCountriesAndState = (state) =>
  state.notifiedShortPositionData.lstDdlAISCountriesAndState;
const SelectUserMessage = (state) =>
  state.notifiedShortPositionData.userMessage;
const SelectLstShortPosition = (state) =>
  state.notifiedShortPositionData.lstShortPosition;
const SelectTrialStatus = (state) =>
  state.notifiedShortPositionData.trialStatus;
const SelectIsLoadingMostShortedData = (state) =>
  state.notifiedShortPositionData.isLoadingMostShortedData;
const SelectLstAISCountriesAndStateSelection = (state) =>
  state.notifiedShortPositionData
    .lstDdlAISCountriesAndStateMostShortedSelection;

// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  lstDdlAISCountriesAndState: SelectLstAISCountriesAndState(state),
  userMessage: SelectUserMessage(state),
  lstShortPosition: SelectLstShortPosition(state),
  trialStatus: SelectTrialStatus(state),
  isLoadingMostShortedData: SelectIsLoadingMostShortedData(state),
  lstDdlAISCountriesAndStateMostShortedSelection:
    SelectLstAISCountriesAndStateSelection(state),

  // title slice
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getAiSCountriesAndStatsReq,
  handleOnChangeDdlCountriesAndState,
  getShortPositionsReq,

  // Title slice
  getProcedureRunningEstimateTimeReq
};

NotifiedShortPositionDataContainer.propTypes = {
  getAiSCountriesAndStatsReq: PropTypes.func,
  getShortPositionsReq: PropTypes.func,
  handleOnChangeDdlCountriesAndState: PropTypes.func,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  lstDdlAISCountriesAndState: PropTypes.array,
  lstShortPosition: PropTypes.array,
  lstDdlAISCountriesAndStateMostShortedSelection: PropTypes.object,
  trialStatus: PropTypes.bool,
  isLoadingMostShortedData: PropTypes.bool,
  userMessage: PropTypes.string,
  procedureRunningEstimateTime: PropTypes.number
};

NotifiedShortPositionDataContainer.defaultProps = {
  getAiSCountriesAndStatsReq: () => null,
  getShortPositionsReq: () => null,
  handleOnChangeDdlCountriesAndState: () => null,
  getProcedureRunningEstimateTimeReq: () => null,
  lstDdlAISCountriesAndState: [],
  lstShortPosition: [],
  lstDdlAISCountriesAndStateMostShortedSelection: {},
  trialStatus: false,
  isLoadingMostShortedData: true,
  userMessage: '',
  procedureRunningEstimateTime: undefined
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotifiedShortPositionDataContainer)
);
