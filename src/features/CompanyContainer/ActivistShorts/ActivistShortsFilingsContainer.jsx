import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import ActivistShortsFilings from '../../../components/Company/ActivistShorts/ActivistShortsFilings';
import {
  handleVisitorLog,
  adm_Check_PIDReq,
  handleResetActivismFiling,
  getListCompanyFilingsByActivist_v2Req
} from '../CompanySlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const ActivistShortsFilingsContainer = ({
  location,
  children,
  handleResetActivismFiling,
  getListCompanyFilingsByActivist_v2Req,
  TrialLog,
  activistFilings,
  isLoadingActivistFilings,
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  const getAll = useCallback(async () => {
    if (query.pid !== undefined && distinctProfile !== null) {
      let pId = query.pid;
      if (distinctProfile) {
        pId = TypeConstants.TRIAL_PID;
      }
      const companyID = await adm_Check_PIDReq(pId);
      if (companyID.company_id) {
        await getListCompanyFilingsByActivist_v2Req({
          company_id: companyID.company_id,
          activist_id: null,
          longShort: 'S'
        });
      }
    }
  }, [query.pid, getListCompanyFilingsByActivist_v2Req, distinctProfile]);

  useEffect(() => {
    const abortController = new AbortController();
    handleResetActivismFiling();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetActivismFiling]);

  useEffect(() => {
    const abortController = new AbortController();
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [getAll]);

  return (
    <ErrorBoundary>
      <ActivistShortsFilings
        children={children}
        TrialLog={TrialLog}
        location={location}
        activistFilings={activistFilings}
        isLoading={isLoadingActivistFilings}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

ActivistShortsFilingsContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
  isLoadingActivistFilings: PropTypes.any.isRequired
};
ActivistShortsFilingsContainer.defaultProps = {
  children: undefined
};

const SelectTrialLog = (state) => state.company.TrialLog_activistShort;
const SelectisLoadingActivistFilings = (state) =>
  state.company.isLoadingActivistFilings;
const SelectActivismFilings = (state) => state.company.activistFilings;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  TrialLog: SelectTrialLog(state),
  activistFilings: SelectActivismFilings(state),
  isLoadingActivistFilings: SelectisLoadingActivistFilings(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

// Mappinng the API calls to the props
const mapDispatchToProps = {
  handleVisitorLog,
  handleResetActivismFiling,
  getListCompanyFilingsByActivist_v2Req
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivistShortsFilingsContainer)
);
