import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import AdvisersActivistShortOverview from '../../../components/Advisers/ActivistShort/AdvisersActivistShortOverview';
import {
  getAdvisorActivismCompanyWebsiteReq,
  getAdvisorActivismPersonnelReq,
  getAdvisorActivistShortCampaignsReq,
  handleResetActivist
} from '../AdvisersSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const AdvisersActivistShortOverviewContainer = ({
  location,
  children,
  getAdvisorActivismCompanyWebsiteReq,
  getAdvisorActivismPersonnelReq,
  getAdvisorActivistShortCampaignsReq,
  getCompanyWebsiteLink,
  lstAdvisorActivismPersonnel,
  lstAdvisorActivistShortCampaigns,
  handleResetActivist,
  isLoading,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.company_id)) {
    return <Redirect to={pathConst.ADVISOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetActivist();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetActivist]);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.company_id !== undefined && query.company_id !== 'undefined' && distinctProfile !== null) {
      let cmpId = query.company_id;
      if (distinctProfile) {
        cmpId = typeConst.TRIAL_ADVISERS_COMPANYID;
      }
      getAdvisorActivismCompanyWebsiteReq(cmpId);
      getAdvisorActivismPersonnelReq(cmpId);
      getAdvisorActivistShortCampaignsReq(cmpId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    distinctProfile,
    query.company_id,
    getAdvisorActivismCompanyWebsiteReq,
    getAdvisorActivismPersonnelReq,
    getAdvisorActivistShortCampaignsReq
  ]);

  return (
    <ErrorBoundary>
      <AdvisersActivistShortOverview
        children={children}
        getCompanyWebsiteLink={getCompanyWebsiteLink}
        lstAdvisorActivismPersonnel={lstAdvisorActivismPersonnel}
        lstAdvisorActivistShortCampaigns={lstAdvisorActivistShortCampaigns}
        isLoading={isLoading}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

AdvisersActivistShortOverviewContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

AdvisersActivistShortOverviewContainer.defaultProps = {
  location: {}
};

const selectGetCompanyWebsiteLink = (state) =>
  state.advisers.getCompanyWebsiteLink;
const selectLstAdvisorActivismPersonnel = (state) =>
  state.advisers.lstAdvisorActivismPersonnel;
const selectLstAdvisorActivistShortCampaigns = (state) =>
  state.advisers.lstAdvisorActivistShortCampaigns;
const selectisLoading = (state) => state.advisers.isLoading;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  getCompanyWebsiteLink: selectGetCompanyWebsiteLink(state),
  lstAdvisorActivismPersonnel: selectLstAdvisorActivismPersonnel(state),
  lstAdvisorActivistShortCampaigns:
    selectLstAdvisorActivistShortCampaigns(state),
  isLoading: selectisLoading(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  getAdvisorActivismCompanyWebsiteReq,
  getAdvisorActivismPersonnelReq,
  getAdvisorActivistShortCampaignsReq,
  handleResetActivist
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdvisersActivistShortOverviewContainer)
);
