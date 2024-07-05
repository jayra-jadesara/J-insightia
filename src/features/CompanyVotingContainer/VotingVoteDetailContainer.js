import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { listGetVotingDataAllVotesReq, handleVoteCastChange, handleResetAll, handleSetDdlMeetingDate, listMeetingDatesReq, handleResetLoading, listGetVotingData_rationale_meetingReq } from './CompanyVotingSlice';
import VotingVoteDetail from '../../components/Company/Voting/VotingVoteDetail';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const VotingVoteDetailContainer = ({
  location,
  children,
  listGetVotingDataAllVotesReq,
  votingDataAllVotesHeadingList,
  votingDataAllVotesList,
  voteCastSelection,
  voteCastList,
  handleVoteCastChange,
  handleResetLoading,
  loadingData,
  TrialStatus_VotingDetail,
  allowDownload,
  issuerCompanyProfile,
  handleResetAll,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  listGetVotingData_rationale_meetingReq,
  votingDataRationaleMeetingAgainstList,
  votingDataRationaleMeetingAgainstHeadingList,
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
    async function getdata(meetingId, proposals, voteCast) {
      await listGetVotingDataAllVotesReq({
        meetingId,
        proposals,
        voteCast
      });
      await listGetVotingData_rationale_meetingReq(meetingId);
    }
    if (query.meetingid) {
      if (distinctProfile) {
        getdata(TypeConstants.TRIAL_MEETINGID, null, voteCastSelection.value);
        listMeetingDatesReq(TypeConstants.TRIAL_MEETINGID);
      } else {
        getdata(query.meetingid, null, voteCastSelection.value);
        listMeetingDatesReq(query.meetingid);
      }
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [query.meetingid, voteCastSelection, listGetVotingDataAllVotesReq, distinctProfile, listGetVotingData_rationale_meetingReq]);

  return (
    <ErrorBoundary>
      <VotingVoteDetail
        issuerCompanyProfile={issuerCompanyProfile}
        children={children}
        votingDataAllVotesHeadingList={votingDataAllVotesHeadingList}
        votingDataAllVotesList={votingDataAllVotesList}
        voteCastList={voteCastList}
        voteCastSelection={voteCastSelection}
        handleVoteCastChange={handleVoteCastChange}
        handleResetLoading={handleResetLoading}
        listGetVotingDataAllVotesReq={listGetVotingDataAllVotesReq}
        loadingData={loadingData}
        TrialStatus={TrialStatus_VotingDetail}
        allowDownload={allowDownload}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
        votingDataRationaleMeetingAgainstList={votingDataRationaleMeetingAgainstList}
        votingDataRationaleMeetingAgainstHeadingList={votingDataRationaleMeetingAgainstHeadingList}
        selectedMeetingDates={selectedMeetingDatesOverview}
        handleSetDdlMeetingDate={handleSetDdlMeetingDate}
        listMeetingDatesOverview={listMeetingDatesOverview}
        listMeetingDatesReq={listMeetingDatesReq}
      />
    </ErrorBoundary>
  );
};

VotingVoteDetailContainer.propTypes = {
  allowDownload: PropTypes.bool.isRequired,
  children: PropTypes.any,
  handleResetLoading: PropTypes.any,
  handleVoteCastChange: PropTypes.func.isRequired,
  issuerCompanyProfile: PropTypes.any.isRequired,
  listGetVotingDataAllVotesReq: PropTypes.func.isRequired,
  loadingData: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  voteCastList: PropTypes.any.isRequired,
  voteCastSelection: PropTypes.object.isRequired,
  votingDataAllVotesHeadingList: PropTypes.any.isRequired,
  votingDataAllVotesList: PropTypes.any.isRequired
};

VotingVoteDetailContainer.defaultProps = {
  children: undefined,
};

const selectVotingDataAllVotesList = (state) => state.companyVoting.votingDataAllVotesList;
const selectVotingDataAllVotesHeadingList = (state) => state.companyVoting.votingDataAllVotesHeadingList;
const selectVoteCastList = (state) => state.companyVoting.voteCastList;
const selectVoteCastSelection = (state) => state.companyVoting.voteCastSelection;
const selectLoadingData = (state) => state.companyVoting.loadingData;
const selectTrialStatus = (state) => state.companyVoting.TrialStatus_VotingDetail;
const selectAllowDownload = (state) => state.companyVoting.allowDownload;
const selectIssuerCompanyProfile = (state) => state.companyVoting.issuerCompanyProfile;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
//Rationals
const selectVotingDataRationaleMeetingAgainstList = (state) =>
  state.companyVoting.votingDataRationaleMeetingAgainstList;
const selectVotingDataRationaleMeetingAgainstHeadingList = (state) =>
  state.companyVoting.votingDataRationaleMeetingAgainstHeadingList;
const selectListMeetingDates = (state) =>
  state.companyVoting.listMeetingDatesOverview;
  const selectSelectedMeetingDates = (state) =>
  state.companyVoting.selectedMeetingDatesOverview;

const mapStateToProps = (state) => ({
  votingDataAllVotesList: selectVotingDataAllVotesList(state),
  votingDataAllVotesHeadingList: selectVotingDataAllVotesHeadingList(state),
  voteCastList: selectVoteCastList(state),
  voteCastSelection: selectVoteCastSelection(state),
  loadingData: selectLoadingData(state),
  TrialStatus_VotingDetail: selectTrialStatus(state),
  allowDownload: selectAllowDownload(state),
  issuerCompanyProfile: selectIssuerCompanyProfile(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
  //Rationals
votingDataRationaleMeetingAgainstList: selectVotingDataRationaleMeetingAgainstList(state),
votingDataRationaleMeetingAgainstHeadingList: selectVotingDataRationaleMeetingAgainstHeadingList(state),
  listMeetingDatesOverview: selectListMeetingDates(state),
  selectedMeetingDatesOverview: selectSelectedMeetingDates(state),
});

const mapDispatchToProps = {
  handleVoteCastChange,
  listGetVotingDataAllVotesReq,
  handleResetAll,
  listGetVotingData_rationale_meetingReq,
  handleSetDdlMeetingDate,
  listMeetingDatesReq,
  handleResetLoading
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VotingVoteDetailContainer));
