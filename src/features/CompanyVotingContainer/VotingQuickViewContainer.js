import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {} from '../CompanyContainer/CompanySlice';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  listMeetingDatesQuickviewReq,
  handleResetLoading,
  handleResetAll,
  handleSplitVotingDetails,
  getSplitVotingDetailsReq,
} from './CompanyVotingSlice';
import VotingQuickview from '../../components/Company/Voting/VotingQuickview';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const VotingQuickViewContainer = ({
  location,
  children,
  meetingQuickViewDynamicList,
  meetingQuickViewDynamicHeadingList,
  listMeetingDatesQuickviewReq,
  listMeetingDatesQuickview,
  selectedMeetingDatesQuickview,
  selectedMeetingDateOnlyQuickview,
  handleResetLoading,
  loadingData,
  TrialStatus_VotingQuickview,
  allowDownload,
  issuerCompanyProfile,
  handleResetAll,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  handleSplitVotingDetails,
  getSplitVotingDetailsReq,
  splitVotingDetail,
  splitVotingLable,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.meetingid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetAll();

    return function cleanup() {
      abortController.abort();
    };
  }, [query.meetingid, location.pathname, location.search, handleResetAll]);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.meetingid) {
      if (distinctProfile) {
        listMeetingDatesQuickviewReq({
          meetingId: TypeConstants.TRIAL_MEETINGID,
          proposalId: 0,
          GetLine: 0,
        });
      } else {
        listMeetingDatesQuickviewReq({
          meetingId: query.meetingid,
          proposalId: 0,
          GetLine: 0,
        });
      }
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    query.meetingid,
    location.pathname,
    location.search,
    listMeetingDatesQuickviewReq,
    handleResetAll,
    distinctProfile,
  ]);

  return (
    <ErrorBoundary>
      <VotingQuickview
        issuerCompanyProfile={issuerCompanyProfile}
        children={children}
        meetingQuickViewDynamicHeadingList={meetingQuickViewDynamicHeadingList}
        meetingQuickViewDynamicList={meetingQuickViewDynamicList}
        listMeetingDates={listMeetingDatesQuickview}
        selectedMeetingDates={selectedMeetingDatesQuickview}
        selectedMeetingDateOnly={selectedMeetingDateOnlyQuickview}
        handleResetLoading={handleResetLoading}
        loadingData={loadingData}
        TrialStatus={TrialStatus_VotingQuickview}
        allowDownload={allowDownload}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
        handleSplitVotingDetails={handleSplitVotingDetails}
        getSplitVotingDetailsReq={getSplitVotingDetailsReq}
        splitVotingDetail={splitVotingDetail}
        splitVotingLable={splitVotingLable}
      />
    </ErrorBoundary>
  );
};

VotingQuickViewContainer.propTypes = {
  TrialStatus_VotingQuickview: PropTypes.any.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  handleResetLoading: PropTypes.func.isRequired,
  issuerCompanyProfile: PropTypes.any.isRequired,
  listMeetingDatesQuickview: PropTypes.func.isRequired,
  listMeetingDatesQuickviewReq: PropTypes.func.isRequired,
  loadingData: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  meetingQuickViewDynamicHeadingList: PropTypes.any.isRequired,
  meetingQuickViewDynamicList: PropTypes.any.isRequired,
  selectedMeetingDateOnlyQuickview: PropTypes.any.isRequired,
  selectedMeetingDatesQuickview: PropTypes.any.isRequired,
};

const selectIssuerCompanyProfile = (state) => state.companyVoting.issuerCompanyProfile;
const selectSelectedMeetingDates = (state) => state.companyVoting.selectedMeetingDatesQuickview;
const selectSelectedMeetingDateOnly = (state) => state.companyVoting.selectedMeetingDateOnlyQuickview;
const selectListMeetingDates = (state) => state.companyVoting.listMeetingDatesQuickview;
const selectMeetingQuickViewDynamic = (state) => state.companyVoting.meetingQuickViewDynamicList;
const selectMeetingQuickViewDynamicHeadingList = (state) => state.companyVoting.meetingQuickViewDynamicHeadingList;
const selectLoadingData = (state) => state.companyVoting.loadingData;
const selectTrialStatus = (state) => state.companyVoting.TrialStatus_VotingQuickview;
const selectAllowDownload = (state) => state.companyVoting.allowDownload;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectSplitVotingDetail = (state) => state.companyVoting.splitVotingDetail;
const selectSplitVotingLable = (state) => state.companyVoting.splitVotingLable;

const mapStateToProps = (state) => ({
  meetingQuickViewDynamicList: selectMeetingQuickViewDynamic(state),
  meetingQuickViewDynamicHeadingList: selectMeetingQuickViewDynamicHeadingList(state),
  listMeetingDatesQuickview: selectListMeetingDates(state),
  selectedMeetingDatesQuickview: selectSelectedMeetingDates(state),
  selectedMeetingDateOnlyQuickview: selectSelectedMeetingDateOnly(state),
  loadingData: selectLoadingData(state),
  TrialStatus_VotingQuickview: selectTrialStatus(state),
  allowDownload: selectAllowDownload(state),
  issuerCompanyProfile: selectIssuerCompanyProfile(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
  splitVotingDetail: selectSplitVotingDetail(state),
  splitVotingLable: selectSplitVotingLable(state),
});

const mapDispatchToProps = {
  handleResetLoading,
  listMeetingDatesQuickviewReq,
  handleResetAll,
  handleSplitVotingDetails,
  getSplitVotingDetailsReq,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VotingQuickViewContainer));
