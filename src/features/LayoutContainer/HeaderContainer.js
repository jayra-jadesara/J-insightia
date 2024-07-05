import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../layout/Header';
import {
  univarsalCompanysearchFormReq,
  univarsalInvestorsearchFormReq,
  univarsalAdvisorsearchFormReq,
  univarsalPeopleSearchFormReq_V2,
  handleEvent,
  handledFeedbackText,
  sendFeedbackMailReq,
  handleClosefeedback,
} from './HeaderSlice';
import { handleDashboardFromModule } from '../DashboardContainer/DashboardSlice';
import {
  updateAlertStatusReq,
  getElementDetailReq,
  getInboxAlertByUserReq,
} from '../MyAlertContainer/MyAlert/InboxAlertSlice';
import { handleOnClickNotification } from '../General/TitleSlice';

const HeaderContainer = ({
  univarsalCompanysearchFormReq,
  univarsalInvestorsearchFormReq,
  univarsalAdvisorsearchFormReq,
  univarsalPeopleSearchFormReq_V2,
  handleEvent,
  handleDashboardFromModule,
  //alert notification data
  isAnyNotification,
  notificationData,
  updateAlertStatusReq,
  getElementDetailReq,
  handleOnClickNotification,
  getInboxAlertByUserReq,
  top20AlertData,
  distinctProfile,
  trialProductStatus,
  profileCount,
  token,
  location,
  pid,
  handledFeedbackText,
  txtFeedback,
  feedbackTextLength,
  sendFeedbackMailReq,
  isFeedbackSubmitted,
  handleClosefeedback,
  module,
  module_product_id,
  queryUniqueId,
}) => {
  const userDetails = { userEmail: window.localStorage.getItem('userEmail') };

  return (
    <Header
      userDetails={userDetails}
      univarsalCompanysearchFormReq={univarsalCompanysearchFormReq}
      univarsalInvestorsearchFormReq={univarsalInvestorsearchFormReq}
      univarsalAdvisorsearchFormReq={univarsalAdvisorsearchFormReq}
      univarsalPeopleSearchFormReq_V2={univarsalPeopleSearchFormReq_V2}
      handleEvent={handleEvent}
      handleDashboardFromModule={handleDashboardFromModule}
      //alert notification data
      isAnyNotification={isAnyNotification}
      notificationData={notificationData}
      updateAlertStatusReq={updateAlertStatusReq}
      getElementDetailReq={getElementDetailReq}
      handleOnClickNotification={handleOnClickNotification}
      getInboxAlertByUserReq={getInboxAlertByUserReq}
      top20AlertData={top20AlertData}
      token={token}
      distinctProfile={distinctProfile}
      trialProductStatus={trialProductStatus}
      profileCount={profileCount}
      location={location}
      uniqueId={pid}
      handledFeedbackText={handledFeedbackText}
      txtFeedback={txtFeedback}
      feedbackTextLength={feedbackTextLength}
      sendFeedbackMailReq={sendFeedbackMailReq}
      isFeedbackSubmitted={isFeedbackSubmitted}
      handleClosefeedback={handleClosefeedback}
      //Trial
      module={module}
      module_product_id={module_product_id}
      queryUniqueId={queryUniqueId}
    />
  );
};

//alert notification data
const selectNotificationStatus = (state) =>
  state.headerTitle ? state.headerTitle.isAnyNotification : false;
const selectNotificationData = (state) =>
  state.headerTitle ? state.headerTitle.notificationData : [];
const selectTop20AlertData = (state) =>
  state.headerTitle ? state.headerTitle.top20AlertData : [];
const selectPIDCompanyProfile = (state) =>
  state.headerTitle ? state.headerTitle.pid : undefined;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectProfileCount = (state) => state.trial.profileCount;
const selectModule = (state) => state.trial.module;
const selectModuleProductId = (state) => state.trial.module_product_id;
const selectqueryUniqueId = (state) => state.trial.queryUniqueId;

const SelectDecodeToken = (state) => state.company.getTokenDecode;
const selectFeedbackTextLength = (state) => state.header.feedbackTextLength;
const selectTextFeedback = (state) => state.header.txtFeedback;
const selectIsFeedbackSubmitted = (state) => state.header.isFeedbackSubmitted;

const mapStateToProps = (state) => ({
  //alert notification data
  isAnyNotification: selectNotificationStatus(state),
  notificationData: selectNotificationData(state),
  top20AlertData: selectTop20AlertData(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  profileCount: selectProfileCount(state),
  pid: selectPIDCompanyProfile(state),
  token: SelectDecodeToken(state),
  txtFeedback: selectTextFeedback(state),
  feedbackTextLength: selectFeedbackTextLength(state),
  isFeedbackSubmitted: selectIsFeedbackSubmitted(state),
  module: selectModule(state),
  module_product_id: selectModuleProductId(state),
  queryUniqueId: selectqueryUniqueId(state),
});

const mapDispatchToProps = {
  univarsalCompanysearchFormReq,
  univarsalInvestorsearchFormReq,
  univarsalAdvisorsearchFormReq,
  univarsalPeopleSearchFormReq_V2,
  handleEvent,
  handleDashboardFromModule,
  //alert notification data
  updateAlertStatusReq,
  getElementDetailReq,
  handleOnClickNotification,
  getInboxAlertByUserReq,
  handledFeedbackText,
  sendFeedbackMailReq,
  handleClosefeedback,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
);
