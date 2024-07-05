import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import VotingVotesAgainstMgmt from '../../components/Company/Voting/VotingVotesAgainstMgmt';
import { listGetVotingData_rationale_meeting_againstReq, handleResetAll, handleSetDdlMeetingDate, listMeetingDatesReq, handleResetLoading } from './CompanyVotingSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const VotingVotesAgainstMgmtContainer = ({
  issuerCompanyProfile,
  location,
  children,
  listGetVotingData_rationale_meeting_againstReq,
  votingDataRationaleMeetingAgainstList,
  votingDataRationaleMeetingAgainstHeadingList,
  votingIssuerVotesAgainstMgmtList,
  votingIssuerVotesAgainstMgmtHeadingList,
  handleResetLoading,
  loadingData,
  TrialStatus_VotingAgainstMgmt,
  allowDownload,
  handleResetAll,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  selectedMeetingDatesOverview,
  handleSetDdlMeetingDate,
  listMeetingDatesOverview,
  listMeetingDatesReq
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.meetingid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetAll();

    if (query.meetingid) {
      if (distinctProfile) {
        listGetVotingData_rationale_meeting_againstReq(TypeConstants.TRIAL_MEETINGID);
        listMeetingDatesReq(TypeConstants.TRIAL_MEETINGID);
      } else {
        listGetVotingData_rationale_meeting_againstReq(query.meetingid);
        listMeetingDatesReq(query.meetingid);
      }
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    query.meetingid,
    location.pathname,
    location.search,
    listGetVotingData_rationale_meeting_againstReq,
    distinctProfile
  ]);

  return (
    <ErrorBoundary>
      <VotingVotesAgainstMgmt
        issuerCompanyProfile={issuerCompanyProfile}
        children={children}
        votingDataRationaleMeetingAgainstList={votingDataRationaleMeetingAgainstList}
        votingDataRationaleMeetingAgainstHeadingList={votingDataRationaleMeetingAgainstHeadingList}
        votingIssuerVotesAgainstMgmtList={votingIssuerVotesAgainstMgmtList}
        votingIssuerVotesAgainstMgmtHeadingList={votingIssuerVotesAgainstMgmtHeadingList}
        handleResetLoading={handleResetLoading}
        loadingData={loadingData}
        TrialStatus={TrialStatus_VotingAgainstMgmt}
        allowDownload={allowDownload}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
        selectedMeetingDates={selectedMeetingDatesOverview}
        handleSetDdlMeetingDate={handleSetDdlMeetingDate}
        listMeetingDatesOverview={listMeetingDatesOverview}
        listMeetingDatesReq={listMeetingDatesReq}
      />
    </ErrorBoundary>
  );
};

VotingVotesAgainstMgmtContainer.propTypes = {
  TrialStatus_VotingAgainstMgmt: PropTypes.any.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  handleResetLoading: PropTypes.func.isRequired,
  issuerCompanyProfile: PropTypes.func.isRequired,
  listGetVotingData_rationale_meeting_againstReq: PropTypes.func.isRequired,
  loadingData: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  votingDataRationaleMeetingAgainstHeadingList: PropTypes.any.isRequired,
  votingDataRationaleMeetingAgainstList: PropTypes.any.isRequired,
  votingIssuerVotesAgainstMgmtHeadingList: PropTypes.any.isRequired,
  votingIssuerVotesAgainstMgmtList: PropTypes.any.isRequired
};

const selectIssuerCompanyProfile = (state) => state.companyVoting.issuerCompanyProfile;
const selectVotingDataRationaleMeetingAgainstList = (state) =>
  state.companyVoting.votingDataRationaleMeetingAgainstList;
const selectVotingDataRationaleMeetingAgainstHeadingList = (state) =>
  state.companyVoting.votingDataRationaleMeetingAgainstHeadingList;
const selectVotingIssuerVotesAgainstMgmtList = (state) => state.companyVoting.votingIssuerVotesAgainstMgmtList;
const selectVotingIssuerVotesAgainstMgmtHeadingList = (state) =>
  state.companyVoting.votingIssuerVotesAgainstMgmtHeadingList;
const selectLoadingData = (state) => state.companyVoting.loadingData;
const selectTrialStatus = (state) => state.companyVoting.TrialStatus_VotingAgainstMgmt;
const selectAllowDownload = (state) => state.companyVoting.allowDownload;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectListMeetingDates = (state) =>
  state.companyVoting.listMeetingDatesOverview;
  const selectSelectedMeetingDates = (state) =>
  state.companyVoting.selectedMeetingDatesOverview;

const mapStateToProps = (state) => ({
  votingDataRationaleMeetingAgainstList: selectVotingDataRationaleMeetingAgainstList(state),
  votingDataRationaleMeetingAgainstHeadingList: selectVotingDataRationaleMeetingAgainstHeadingList(state),
  votingIssuerVotesAgainstMgmtList: selectVotingIssuerVotesAgainstMgmtList(state),
  votingIssuerVotesAgainstMgmtHeadingList: selectVotingIssuerVotesAgainstMgmtHeadingList(state),
  loadingData: selectLoadingData(state),
  TrialStatus_VotingAgainstMgmt: selectTrialStatus(state),
  allowDownload: selectAllowDownload(state),
  issuerCompanyProfile: selectIssuerCompanyProfile(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
  listMeetingDatesOverview: selectListMeetingDates(state),
  selectedMeetingDatesOverview: selectSelectedMeetingDates(state),
});

const mapDispatchToProps = {
  listGetVotingData_rationale_meeting_againstReq,
  handleResetAll,
  handleSetDdlMeetingDate,
  listMeetingDatesReq,
  handleResetLoading
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VotingVotesAgainstMgmtContainer));
