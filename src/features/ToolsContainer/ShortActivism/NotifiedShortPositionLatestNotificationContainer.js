import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotifiedShortPositionLatestNotification from '../../../components/Tools/ShortActivismTools/NotifiedShortPositionLatestNotification';
import {
  getAiSCountriesAndStatsReq,
  handleOnChangeLatestNotificationDdlCountriesAndState,
  getAiSRecentShortPositionsReq
} from './NotifiedShortPositionDataSlice';
import { SHORT_ACTIVISM_DEFAULT_DDL_COUNTRY_LABEL } from '../../../constants/ShortActivismConstant';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader
} from '../../General/TitleSlice';
import { NOTIFIED_SHORT_LATEST_NOTIFICATION_DATA } from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const NotifiedShortPositionLatestNotificationContainer = ({
  getAiSCountriesAndStatsReq,
  lstDdlAISCountriesAndState,
  lstDdlAISCountriesAndStateLetestNotificationSelection,
  handleOnChangeLatestNotificationDdlCountriesAndState,
  getAiSRecentShortPositionsReq,
  trialStatus,
  lstAiSRecentShortPositions,
  userMessage,
  procedureRunningEstimateTime,
  getProcedureRunningEstimateTimeReq,
  isLoadingLatestNotificationData,
  handleResetLoader,
  trialUserDisableDownload
}) => {
  const getAll = async () => {
    handleResetLoader();
    await getProcedureRunningEstimateTimeReq(NOTIFIED_SHORT_LATEST_NOTIFICATION_DATA);
    await getAiSCountriesAndStatsReq({
      defailtValue: null,
      defaultLabel: SHORT_ACTIVISM_DEFAULT_DDL_COUNTRY_LABEL
    });
    await getAiSRecentShortPositionsReq(null);
  };
  useEffect(() => {
    getAll();
  }, []);

  return (
    <ErrorBoundary>
      <NotifiedShortPositionLatestNotification
        lstDdlAISCountriesAndState={lstDdlAISCountriesAndState}
        lstDdlAISCountriesAndStateLetestNotificationSelection={
          lstDdlAISCountriesAndStateLetestNotificationSelection
        }
        handleOnChangeLatestNotificationDdlCountriesAndState={
          handleOnChangeLatestNotificationDdlCountriesAndState
        }
        getAiSRecentShortPositionsReq={getAiSRecentShortPositionsReq}
        trialStatus={trialStatus}
        lstAiSRecentShortPositions={lstAiSRecentShortPositions}
        userMessage={userMessage}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        isLoadingLatestNotificationData={isLoadingLatestNotificationData}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

const SelectLstAISCountriesAndState = (state) =>
  state.notifiedShortPositionData.lstDdlAISCountriesAndState;
const SelectLstAISCountriesAndStateSelection = (state) =>
  state.notifiedShortPositionData
    .lstDdlAISCountriesAndStateLetestNotificationSelection;
const SelectTrialStatus = (state) =>
  state.notifiedShortPositionData.trialStatus;
const SelectLstAiSRecentShortPositions = (state) =>
  state.notifiedShortPositionData.lstAiSRecentShortPositions;
const SelectUserMessage = (state) =>
  state.notifiedShortPositionData.userMessage;
const SelectIsLoadingLatestNotificationData = (state) =>
  state.notifiedShortPositionData.isLoadingLatestNotificationData;

// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  lstDdlAISCountriesAndState: SelectLstAISCountriesAndState(state),
  lstDdlAISCountriesAndStateLetestNotificationSelection:
    SelectLstAISCountriesAndStateSelection(state),
  trialStatus: SelectTrialStatus(state),
  lstAiSRecentShortPositions: SelectLstAiSRecentShortPositions(state),
  userMessage: SelectUserMessage(state),
  isLoadingLatestNotificationData: SelectIsLoadingLatestNotificationData(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getAiSCountriesAndStatsReq,
  handleOnChangeLatestNotificationDdlCountriesAndState,
  getAiSRecentShortPositionsReq,
  handleResetLoader,
  // Title slice
  getProcedureRunningEstimateTimeReq,
};

NotifiedShortPositionLatestNotificationContainer.propTypes = {
  getAiSCountriesAndStatsReq: PropTypes.func,
  getAiSRecentShortPositionsReq: PropTypes.func,
  handleOnChangeLatestNotificationDdlCountriesAndState: PropTypes.func,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  lstDdlAISCountriesAndState: PropTypes.array,
  lstAiSRecentShortPositions: PropTypes.array,
  lstDdlAISCountriesAndStateLetestNotificationSelection: PropTypes.object,
  trialStatus: PropTypes.bool,
  isLoadingLatestNotificationData: PropTypes.bool,
  userMessage: PropTypes.string,
  procedureRunningEstimateTime: PropTypes.number
};

NotifiedShortPositionLatestNotificationContainer.defaultProps = {
  getAiSCountriesAndStatsReq: () => null,
  getAiSRecentShortPositionsReq: () => null,
  handleOnChangeLatestNotificationDdlCountriesAndState: () => null,
  getProcedureRunningEstimateTimeReq: () => null,
  lstDdlAISCountriesAndState: [],
  lstAiSRecentShortPositions: [],
  lstDdlAISCountriesAndStateLetestNotificationSelection: {},
  trialStatus: false,
  isLoadingLatestNotificationData: true,
  userMessage: '',
  procedureRunningEstimateTime: undefined
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotifiedShortPositionLatestNotificationContainer)
);
