import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import ActivistInvestment from '../../../components/Company/Activism/ActivistInvestment';
import {
  handleVisitorLog,
  adm_Check_PIDReq,
  getActivistInvestorsForCompanyReq,
  getActivistNotifiedHoldingReq,
  handleResetActivismInvestments
} from './../CompanySlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';
import { addTriallogReq } from '../../../features/CompanyContainer/TrialSlice';

const ActivistInvestmentContainer = ({
  location,
  children,
  getActivistInvestorsForCompanyReq,
  lstActivistInvestors,
  getActivistNotifiedHoldingReq,
  lstActivistNotifiedHoldings,
  handleResetActivismInvestments,
  isLoadingActivistInvestmentData,
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
    handleResetActivismInvestments();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetActivismInvestments]);

  const getAll = useCallback(
    async (pId) => {
      const companyID = await adm_Check_PIDReq(pId);
      if (companyID.company_id) {
        await getActivistInvestorsForCompanyReq({
          company_id: companyID.company_id
        });
        await getActivistNotifiedHoldingReq({
          company_id: companyID.company_id
        });
      }
    },
    [getActivistInvestorsForCompanyReq, getActivistNotifiedHoldingReq]
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
      <ActivistInvestment
        children={children}
        location={location}
        lstActivistInvestors={lstActivistInvestors}
        lstActivistNotifiedHoldings={lstActivistNotifiedHoldings}
        isLoadingData={isLoadingActivistInvestmentData}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

ActivistInvestmentContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired
};
ActivistInvestmentContainer.defaultProps = {
  children: undefined
};

const SelectLstActivistInvestors = (state) =>
  state.company.lstActivistInvestors;
const SelectLstActivistNotifiedHoldings = (state) =>
  state.company.lstActivistNotifiedHoldings;
const SelectisLoadingData = (state) => state.company.isLoadingActivistInvestmentData;

//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  lstActivistInvestors: SelectLstActivistInvestors(state),
  lstActivistNotifiedHoldings: SelectLstActivistNotifiedHoldings(state),
  isLoadingActivistInvestmentData: SelectisLoadingData(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

// Mappinng the API calls to the props
const mapDispatchToProps = {
  handleVisitorLog,
  adm_Check_PIDReq,
  getActivistInvestorsForCompanyReq,
  getActivistNotifiedHoldingReq,
  addTriallogReq,
  handleResetActivismInvestments
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivistInvestmentContainer)
);
