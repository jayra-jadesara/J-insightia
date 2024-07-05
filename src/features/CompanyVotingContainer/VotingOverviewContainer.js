import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { resetCompanyProfile } from '../CompanyContainer/CompanySlice';
import {
  listMeetingDatesOverviewReq,
  getIssuer_Meeting_statsReq,
  listVotingOwnershipForProposalReq,
  get_OtherBoardsReq,
  handleResetLoading,
  getIssuerProfileReq,
  handleResetDdlMeetingDate,
  handleSetDdlMeetingDate,
  getVotingData_rationaleReq,
  listVotingAndOwnerhipForProposal_insightiaReq,
  getMeetingURLsReq,
  getNoActionLetterProposalDetailReq,
  getShareClassesReq,
  handleResetAll,
} from './CompanyVotingSlice';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
} from '../General/TitleSlice';
import VotingOverview from '../../components/Company/Voting/VotingOverview';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst, { COMPANY_SEARCH } from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const VotingOverviewContainer = ({
  getIssuerProfileReq,
  issuerCompanyProfile,
  location,
  children,
  votingrowData,
  listMeetingDatesOverviewReq,
  getIssuer_Meeting_statsReq,
  issuerMeetingStatsList,
  issuerMeetingStatsListHeading,
  getProposalList,
  getProposalListHeading,
  getProposalListChart,
  tableMeetingTypeId_5,
  listMeetingDatesOverview,
  listVotingOwnershipForProposal_v2,
  selectedMeetingDatesOverview,
  selectedMeetingDateOnlyOverview,
  handleResetLoading,
  loadingData,
  TrialStatus_VotingOverview,
  allowDownload,
  handleResetDdlMeetingDate,
  handleSetDdlMeetingDate,
  listVotingOwnershipForProposalReq,
  getVotingData_rationaleReq,
  getVotingData_rationale,
  get_OtherBoardsReq,
  get_OtherBoards,
  listVotingAndOwnerhipForProposal_insightiaReq,
  listVotingAndOwnerhipForProposal_insightia,
  getMeetingURLsReq,
  meetingResultURL,
  meetingSECURL,
  isAllVotingLoading,
  vote_type,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  getNoActionLetterProposalDetailReq,
  noActionLetterProposalDetailList,
  getShareClassesReq,
  isShareClasses,
  handleResetAll,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.meetingid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetAll();
    handleResetDdlMeetingDate();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetAll, handleResetDdlMeetingDate]);

  useEffect(() => {
    const abortController = new AbortController();
    const cancelToken = axios.CancelToken.source();

    let meetingid = query.meetingid;
    if (isIdNotNullOrUndefined(meetingid)) {
      getIssuerProfileReq({ meetingid: meetingid });
      if (distinctProfile) {
        meetingid = TypeConstants.TRIAL_MEETINGID;
      }
      listMeetingDatesOverviewReq({
        meetingId: meetingid,
        cancelToken: cancelToken.token,
      });
      getIssuer_Meeting_statsReq({
        meetingId: meetingid,
        cancelToken: cancelToken.token,
      });
      listVotingOwnershipForProposalReq({
        meetingid: meetingid,
        proposal_id: query.proposal_id,
        cancelToken: cancelToken.token,
      });
    }
    return function cleanup() {
      abortController.abort();
      cancelToken.cancel();
    };
  }, [
    getIssuerProfileReq,
    listMeetingDatesOverviewReq,
    getIssuer_Meeting_statsReq,
    listVotingOwnershipForProposalReq,
    location.pathname,
    location.search,
    query.meeting_id,
    query.prev_meeting_id,
    query.prev_proposal_id,
    query.proposal_id,
    distinctProfile,
  ]);

  useEffect(() => {
    if (query.meetingid && selectedMeetingDateOnlyOverview !== undefined) {
      let meetingid = query.meetingid;
      if (distinctProfile) {
        meetingid = TypeConstants.TRIAL_MEETINGID;
      }
      getMeetingURLsReq({
        meeting_id: meetingid,
        meeting_date: selectedMeetingDateOnlyOverview,
      });
    }
  }, [
    query.meetingid,
    selectedMeetingDateOnlyOverview,
    getMeetingURLsReq,
    distinctProfile,
  ]);

  useEffect(() => {
    if (issuerCompanyProfile !== undefined && issuerCompanyProfile.PID) {
      getShareClassesReq(issuerCompanyProfile.PID);
    }
  }, [issuerCompanyProfile]);

  if (!query.meetingid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

  return (
    <ErrorBoundary>
      <VotingOverview
        issuerCompanyProfile={issuerCompanyProfile}
        children={children}
        votingrowData={votingrowData}
        issuerMeetingStatsList={issuerMeetingStatsList}
        issuerMeetingStatsListHeading={issuerMeetingStatsListHeading}
        getProposalList={getProposalList}
        getProposalListHeading={getProposalListHeading}
        getProposalListChart={getProposalListChart}
        tableMeetingTypeId_5={tableMeetingTypeId_5}
        listMeetingDatesOverview={listMeetingDatesOverview}
        listVotingOwnershipForProposal_v2={listVotingOwnershipForProposal_v2}
        selectedMeetingDates={selectedMeetingDatesOverview}
        selectedMeetingDateOnly={selectedMeetingDateOnlyOverview}
        getIssuer_Meeting_statsReq={getIssuer_Meeting_statsReq}
        handleResetLoading={handleResetLoading}
        loadingData={loadingData}
        TrialStatus={TrialStatus_VotingOverview}
        allowDownload={allowDownload}
        listMeetingDatesOverviewReq={listMeetingDatesOverviewReq}
        handleSetDdlMeetingDate={handleSetDdlMeetingDate}
        listVotingOwnershipForProposalReq={listVotingOwnershipForProposalReq}
        getVotingData_rationaleReq={getVotingData_rationaleReq}
        get_OtherBoardsReq={get_OtherBoardsReq}
        get_OtherBoards={get_OtherBoards}
        getVotingData_rationale={getVotingData_rationale}
        listVotingAndOwnerhipForProposal_insightiaReq={
          listVotingAndOwnerhipForProposal_insightiaReq
        }
        listVotingAndOwnerhipForProposal_insightia={
          listVotingAndOwnerhipForProposal_insightia
        }
        getMeetingURLsReq={getMeetingURLsReq}
        meetingResultURL={meetingResultURL}
        meetingSECURL={meetingSECURL}
        isAllVotingLoading={isAllVotingLoading}
        vote_type={vote_type}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        getNoActionLetterProposalDetailReq={getNoActionLetterProposalDetailReq}
        noActionLetterProposalDetailList={noActionLetterProposalDetailList}
        getShareClassesReq={getShareClassesReq}
        isShareClasses={isShareClasses}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
      />
    </ErrorBoundary>
  );
};

VotingOverviewContainer.propTypes = {
  TrialStatus_VotingOverview: PropTypes.any.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  children: PropTypes.any,
  getIssuerProfileReq: PropTypes.func.isRequired,
  getIssuer_Meeting_statsReq: PropTypes.func.isRequired,
  getProposalList: PropTypes.array.isRequired,
  getProposalListChart: PropTypes.array.isRequired,
  getProposalListHeading: PropTypes.object.isRequired,
  handleResetDdlMeetingDate: PropTypes.func.isRequired,
  handleResetLoading: PropTypes.func.isRequired,
  handleSetDdlMeetingDate: PropTypes.func.isRequired,
  issuerCompanyProfile: PropTypes.object.isRequired,
  issuerMeetingStatsList: PropTypes.array.isRequired,
  issuerMeetingStatsListHeading: PropTypes.string.isRequired,
  listMeetingDatesOverview: PropTypes.array,
  listMeetingDatesOverviewReq: PropTypes.func.isRequired,
  listVotingOwnershipForProposal_v2: PropTypes.func.isRequired,
  loadingData: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  selectedMeetingDateOnlyOverview: PropTypes.any.isRequired,
  selectedMeetingDatesOverview: PropTypes.any,
  tableMeetingTypeId_5: PropTypes.any.isRequired,
  votingrowData: PropTypes.any.isRequired,
  listVotingOwnershipForProposalReq: PropTypes.func.isRequired,
  get_OtherBoardsReq: PropTypes.func.isRequired,
  get_OtherBoards: PropTypes.func.isRequired,
  getVotingData_rationaleReq: PropTypes.func.isRequired,
  getVotingData_rationale: PropTypes.func.isRequired,
  listVotingAndOwnerhipForProposal_insightiaReq: PropTypes.func.isRequired,
  listVotingAndOwnerhipForProposal_insightia: PropTypes.func.isRequired,
  getMeetingURLsReq: PropTypes.func.isRequired,
  meetingResultURL: PropTypes.func.isRequired,
  meetingSECURL: PropTypes.func.isRequired,
  getNoActionLetterProposalDetailReq: PropTypes.func.isRequired,
};

const selectVotingrowData = (state) => {
  if (state.company.rowData_voting !== undefined) {
    return state.company.rowData_voting;
  }
  return [];
};
const selectIssuerCompanyProfile = (state) =>
  state.companyVoting.issuerCompanyProfile;
const selectListMeetingDates = (state) =>
  state.companyVoting.listMeetingDatesOverview;
const selectIssuerMeetingStatsList = (state) =>
  state.companyVoting.issuerMeetingStatsList;
const selectIssuerMeetingStatsListHeading = (state) =>
  state.companyVoting.issuerMeetingStatsListHeading;
const selectGetProposalList = (state) => state.companyVoting.getProposalList;
const selectTableMeetingTypeId = (state) =>
  state.companyVoting.tableMeetingTypeId_5;
const selectGetProposalListHeading = (state) =>
  state.companyVoting.getProposalListHeading;
const selectGetProposalListChart = (state) =>
  state.companyVoting.getProposalListChart;
const selectSelectedMeetingDates = (state) =>
  state.companyVoting.selectedMeetingDatesOverview;
const selectSelectedMeetingDateOnly = (state) =>
  state.companyVoting.selectedMeetingDateOnlyOverview;
const selectLoadingData = (state) => state.companyVoting.loadingData;
const selectTrialStatus = (state) =>
  state.companyVoting.TrialStatus_VotingOverview;
const selectAllowDownload = (state) => state.companyVoting.allowDownload;
const selectListVotingOwnershipForProposal_v2 = (state) =>
  state.companyVoting.listVotingOwnershipForProposal_v2;
const selectGet_OtherBoards = (state) => state.companyVoting.get_OtherBoards;
const selectGetVotingData_rationale = (state) =>
  state.companyVoting.getVotingData_rationale;
const selectListVotingAndOwnerhipForProposal_insightia = (state) =>
  state.companyVoting.listVotingAndOwnerhipForProposal_insightia;
const selectgetMeetingURLs = (state) => state.companyVoting.getMeetingURLs;
const selectMeetingResultURL = (state) => state.companyVoting.meetingResultURL;
const selectMeetingSECURL = (state) => state.companyVoting.meetingSECURL;
const selectIsAllVotingLoading = (state) =>
  state.companyVoting.isAllVotingLoading;
const selectVotetype = (state) => state.companyVoting.vote_type;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectNoActionLetterProposalDetailList = (state) =>
  state.companyVoting.noActionLetterProposalDetailList;
const SelectIsShareClass = (state) => state.companyVoting.isShareClasses;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  votingrowData: selectVotingrowData(state),
  listMeetingDatesOverview: selectListMeetingDates(state),
  selectedMeetingDatesOverview: selectSelectedMeetingDates(state),
  selectedMeetingDateOnlyOverview: selectSelectedMeetingDateOnly(state),
  issuerMeetingStatsList: selectIssuerMeetingStatsList(state),
  issuerMeetingStatsListHeading: selectIssuerMeetingStatsListHeading(state),
  getProposalList: selectGetProposalList(state),
  tableMeetingTypeId_5: selectTableMeetingTypeId(state),
  getProposalListHeading: selectGetProposalListHeading(state),
  getProposalListChart: selectGetProposalListChart(state),
  loadingData: selectLoadingData(state),
  TrialStatus_VotingOverview: selectTrialStatus(state),
  issuerCompanyProfile: selectIssuerCompanyProfile(state),
  allowDownload: selectAllowDownload(state),
  listVotingOwnershipForProposal_v2:
    selectListVotingOwnershipForProposal_v2(state),
  get_OtherBoards: selectGet_OtherBoards(state),
  getVotingData_rationale: selectGetVotingData_rationale(state),
  listVotingAndOwnerhipForProposal_insightia:
    selectListVotingAndOwnerhipForProposal_insightia(state),
  getMeetingURLs: selectgetMeetingURLs(state),
  meetingResultURL: selectMeetingResultURL(state),
  meetingSECURL: selectMeetingSECURL(state),
  isAllVotingLoading: selectIsAllVotingLoading(state),
  vote_type: selectVotetype(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  noActionLetterProposalDetailList:
    SelectNoActionLetterProposalDetailList(state),
  isShareClasses: SelectIsShareClass(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  getIssuerProfileReq,
  resetCompanyProfile,
  listMeetingDatesOverviewReq,
  getIssuer_Meeting_statsReq,
  listVotingOwnershipForProposalReq,
  getVotingData_rationaleReq,
  get_OtherBoardsReq,
  listVotingAndOwnerhipForProposal_insightiaReq,
  handleResetLoading,
  handleResetDdlMeetingDate,
  handleSetDdlMeetingDate,
  getMeetingURLsReq,
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
  getNoActionLetterProposalDetailReq,
  getShareClassesReq,
  handleResetAll,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VotingOverviewContainer)
);
