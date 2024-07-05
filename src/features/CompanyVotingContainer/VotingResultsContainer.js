import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { listMeetingDatesVotingResultsReq, handleResetLoading, handleResetAll } from './CompanyVotingSlice';
import VotingResults from '../../components/Company/Voting/VotingResults';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const VotingResultsContainer = ({
  location,
  children,
  listMeetingDatesVotingResultsReq,
  listMeetingDatesVotingResults,
  selectedMeetingDatesVotingResults,
  selectedMeetingDateOnlyVotingResults,
  voteResultsList,
  voteResultsHeadingList,
  loadingData,
  TrialStatus_VotingResults,
  allowDownload,
  issuerCompanyProfile,
  handleResetLoading,
  handleResetAll,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur
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
        listMeetingDatesVotingResultsReq(TypeConstants.TRIAL_MEETINGID);
      } else {
        listMeetingDatesVotingResultsReq(query.meetingid);
      }
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [query.meetingid, location.pathname, location.search, listMeetingDatesVotingResultsReq, handleResetAll, distinctProfile]);

  return (
    <ErrorBoundary>
      <VotingResults
        children={children}
        voteResultsList={voteResultsList}
        voteResultsHeadingList={voteResultsHeadingList}
        listMeetingDatesVotingResults={listMeetingDatesVotingResults}
        selectedMeetingDatesVotingResults={selectedMeetingDatesVotingResults}
        selectedMeetingDateOnlyVotingResults={selectedMeetingDateOnlyVotingResults}
        loadingData={loadingData}
        TrialStatus={TrialStatus_VotingResults}
        allowDownload={allowDownload}
        issuerCompanyProfile={issuerCompanyProfile}
        handleResetLoading={handleResetLoading}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
      />
    </ErrorBoundary>
  );
};

VotingResultsContainer.propTypes = {
  TrialStatus_VotingResults: PropTypes.any.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  issuerCompanyProfile: PropTypes.any.isRequired,
  listMeetingDatesVotingResults: PropTypes.any.isRequired,
  listMeetingDatesVotingResultsReq: PropTypes.func.isRequired,
  loadingData: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  selectedMeetingDateOnlyVotingResults: PropTypes.any.isRequired,
  selectedMeetingDatesVotingResults: PropTypes.any.isRequired,
  voteResultsHeadingList: PropTypes.any.isRequired,
  voteResultsList: PropTypes.any.isRequired,
  handleResetLoading: PropTypes.func.isRequired
};

const selectIssuerCompanyProfile = (state) => state.companyVoting.issuerCompanyProfile;
const selectSelectedMeetingDatesVotingResults = (state) => state.companyVoting.selectedMeetingDatesVotingResults;
const selectSelectedMeetingDateOnlyVotingResults = (state) => state.companyVoting.selectedMeetingDateOnlyVotingResults;
const selectListMeetingDatesVotingResults = (state) => state.companyVoting.listMeetingDatesVotingResults;
const selectVoteResultsList = (state) => state.companyVoting.voteResultsList;
const selectVoteResultsHeadingList = (state) => state.companyVoting.voteResultsHeadingList;
const selectLoadingData = (state) => state.companyVoting.loadingData;
const selectTrialStatus = (state) => state.companyVoting.TrialStatus_VotingResults;
const selectAllowDownload = (state) => state.companyVoting.allowDownload;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  voteResultsList: selectVoteResultsList(state),
  voteResultsHeadingList: selectVoteResultsHeadingList(state),
  listMeetingDatesVotingResults: selectListMeetingDatesVotingResults(state),
  selectedMeetingDatesVotingResults: selectSelectedMeetingDatesVotingResults(state),
  selectedMeetingDateOnlyVotingResults: selectSelectedMeetingDateOnlyVotingResults(state),
  loadingData: selectLoadingData(state),
  TrialStatus_VotingResults: selectTrialStatus(state),
  allowDownload: selectAllowDownload(state),
  issuerCompanyProfile: selectIssuerCompanyProfile(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  listMeetingDatesVotingResultsReq,
  handleResetLoading,
  handleResetAll
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VotingResultsContainer));
