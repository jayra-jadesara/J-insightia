import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  handleSwitchDataAndStats,
  getAIGUpcomingMeetingsReq,
  getUpcomingAppointmentsAndDeparturesReq,
} from './UpcomingEventsToolSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import UpcomingEventsTool from '../../../components/Tools/GovernanceTools/UpcomingEventsTool';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { getTokenDecode } from '../ToolsSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { GOVERNANCE } from '../../../constants/ProductConstants';

const UpcomingEventsToolSliceContainer = ({
  allowDownload,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  handleSwitchDataAndStats,
  getAIGUpcomingMeetingsReq,
  getUpcomingAppointmentsAndDeparturesReq,
  token,
  ...props
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(ProcedureConstant.GETAIGUPCOMINGMEETINGS);
      await getAIGUpcomingMeetingsReq();
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
  }, [getAIGUpcomingMeetingsReq]);

  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(ProcedureConstant.GETUPCOMINGAPPOINTMENTSANDDEPARTURES);
      await getUpcomingAppointmentsAndDeparturesReq();
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
  }, [getUpcomingAppointmentsAndDeparturesReq]);

  return (
    <ErrorBoundary>
      <UpcomingEventsTool
        allowDownload={allowDownload}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        handleSwitchDataAndStats={handleSwitchDataAndStats}
        {...props}
      />
    </ErrorBoundary>
  );
};

const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
const SelectIsLoadingMeetingData = (state) => state.upcomingMeetings.isLoadingMeetingData;
const SelectIsMeetingData = (state) => state.upcomingMeetings.isMeetingData;
const SelectMeetingCardData = (state) => state.upcomingMeetings.meetingCardData;
const SelectAppointmentsAndDeparturesCardData = (state) => state.upcomingMeetings.appointmentsAndDeparturesCardData;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  isLoadingMeetingData: SelectIsLoadingMeetingData(state),
  isMeetingData: SelectIsMeetingData(state),
  meetingCardData: SelectMeetingCardData(state),
  appointmentsAndDeparturesCardData: SelectAppointmentsAndDeparturesCardData(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state),
});

const mapDispatchToProps = {
  getProcedureRunningEstimateTimeReq,
  handleSwitchDataAndStats,
  getAIGUpcomingMeetingsReq,
  getUpcomingAppointmentsAndDeparturesReq,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEventsToolSliceContainer);
