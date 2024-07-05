import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import ActivismFilings from '../../../components/Company/Activism/ActivismFilings';
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

const ActivismFilingsContainer = ({
  location,
  children,
  handleResetActivismFiling,
  getListCompanyFilingsByActivist_v2Req,
  activistFilings,
  isLoadingActivistFilings,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetActivismFiling();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetActivismFiling]);

  const getAll = useCallback(
    async (pId) => {
      const companyID = await adm_Check_PIDReq(pId);
      if (companyID.company_id) {
        await getListCompanyFilingsByActivist_v2Req({
          company_id: companyID.company_id,
          activist_id: null,
          longShort: 'L'
        });
      }
    },
    [getListCompanyFilingsByActivist_v2Req]
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (query.pid !== undefined && distinctProfile !== null) {
      let pId = query.pid;
      if (distinctProfile) {
        pId = TypeConstants.TRIAL_PID;
      }
      getAll(pId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [query.pid, getAll, distinctProfile]);

  return (
    <ErrorBoundary>
      <ActivismFilings
        children={children}
        location={location}
        activistFilings={activistFilings}
        isLoadingData={isLoadingActivistFilings}
        // Trial
        TrialProductStatus={trialProductStatus}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
      />
    </ErrorBoundary>
  );
};

ActivismFilingsContainer.propTypes = {
  children: PropTypes.any
};
ActivismFilingsContainer.defaultProps = {
  children: undefined
};

const SelectActivismFilings = (state) => state.company.activistFilings;
const SelectisLoadingActivistFilings = (state) =>
  state.company.isLoadingActivistFilings;

// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  activistFilings: SelectActivismFilings(state),
  isLoadingActivistFilings: SelectisLoadingActivistFilings(state),
  // Trial
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
  connect(mapStateToProps, mapDispatchToProps)(ActivismFilingsContainer)
);
