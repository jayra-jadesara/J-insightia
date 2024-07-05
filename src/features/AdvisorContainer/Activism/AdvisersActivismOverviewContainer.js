import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import AdvisersActivismOverview from '../../../components/Advisers/Activism/AdvisersActivismOverview';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import {
  getAdvisorActivismCompanyWebsiteReq,
  getAdvisorActivismPersonnelReq,
  getAdvisorActivismCampaignsReq,
  handleResetActivist
} from '../AdvisersSlice';
import typeConst from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const AdvisersActivismOverviewContainer = ({
  location,
  children,
  getAdvisorActivismCompanyWebsiteReq,
  getAdvisorActivismPersonnelReq,
  getAdvisorActivismCampaignsReq,
  getCompanyWebsiteLink,
  lstAdvisorActivismPersonnel,
  lstAdvisorActivismCampaigns,
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
      getAdvisorActivismCampaignsReq(cmpId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    distinctProfile,
    query.company_id,
    getAdvisorActivismCompanyWebsiteReq,
    getAdvisorActivismPersonnelReq,
    getAdvisorActivismCampaignsReq
  ]);

  return (
    <ErrorBoundary>
      <AdvisersActivismOverview
        children={children}
        getCompanyWebsiteLink={getCompanyWebsiteLink}
        lstAdvisorActivismPersonnel={lstAdvisorActivismPersonnel}
        lstAdvisorActivismCampaigns={lstAdvisorActivismCampaigns}
        isLoading={isLoading}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

AdvisersActivismOverviewContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

AdvisersActivismOverviewContainer.defaultProps = {
  location: {}
};

const selectGetCompanyWebsiteLink = (state) =>
  state.advisers.getCompanyWebsiteLink;
const selectLstAdvisorActivismPersonnel = (state) =>
  state.advisers.lstAdvisorActivismPersonnel;
const selectLstAdvisorActivismCampaigns = (state) =>
  state.advisers.lstAdvisorActivismCampaigns;
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
  lstAdvisorActivismCampaigns: selectLstAdvisorActivismCampaigns(state),
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
  getAdvisorActivismCampaignsReq,
  handleResetActivist
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdvisersActivismOverviewContainer)
);
