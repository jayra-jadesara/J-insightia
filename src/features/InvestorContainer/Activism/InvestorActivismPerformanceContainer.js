import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import qs from 'qs';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import InvestorActivismPerformance from '../../../components/Investor/InvestorActivism/InvestorActivismPerformance';
import { getActivistIdFromInvestorIdReq } from './../ActivistShorts/ActivistShortSlice';
import {
  getPerformancePeriodicbyActivistLstReq,
  getListofReprtingDateReq,
  handleChangeDate,
  handleResetActivistPerformance
} from '../Activism/InvestorActivismSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivismPerformanceContainer = ({
  location,
  children,
  getActivistIdFromInvestorIdReq,
  getPerformancePeriodicbyActivistLstReq,
  lstPerformancePeriodicbyActivist,
  getListofReprtingDateReq,
  lstofReprtingDate,
  reportedDate,
  handleChangeDate,
  latestdate,
  handleResetActivistPerformance,
  isLoading,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
   }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetActivistPerformance();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetActivistPerformance]);

  useEffect(() => {
    const abortController = new AbortController();

    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }

      const getAll = async () => {
        const res = await getActivistIdFromInvestorIdReq(investorId);
        const actid = res.payload.activist_id;
         let obj;
        if (actid !== null) {
          await getListofReprtingDateReq(actid);
          if (actid !== null) {
            if (reportedDate !== undefined && reportedDate.value !== undefined) {
              obj = { actid, dateReported: reportedDate.value };
            } else if (latestdate !== undefined && latestdate.length > 0) {
              obj = {
                actid,
                dateReported: latestdate[0].value
              };
            } else {
              obj = {
                actid,
                dateReported: null
              };
            }
            await getPerformancePeriodicbyActivistLstReq(obj);
          }
        }
      };
      getAll();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    distinctProfile,
    query.investor,
    reportedDate
  ]);

  return (
    <ErrorBoundary>
      <InvestorActivismPerformance
        children={children}
        lstPerformancePeriodicbyActivist={lstPerformancePeriodicbyActivist}
        lstofReprtingDate={lstofReprtingDate}
        reportedDate={reportedDate}
        handleChangeDate={handleChangeDate}
        latestdate={latestdate}
        isLoading={isLoading}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorActivismPerformanceContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

const selectLstPerformancePeriodicbyActivist = (state) =>
  state.InvestorActivismSlice.lstPerformancePeriodicbyActivist;
const selectLstofReprtingDate = (state) =>
  state.InvestorActivismSlice.lstofReprtingDate;
const selectReportedDate = (state) => state.InvestorActivismSlice.reportedDate;
const selectLatestdate = (state) => state.InvestorActivismSlice.latestdate;
const selectisLoading = (state) => state.InvestorActivismSlice.isLoading;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  isLoading: selectisLoading(state),
  lstPerformancePeriodicbyActivist:
    selectLstPerformancePeriodicbyActivist(state),
  lstofReprtingDate: selectLstofReprtingDate(state),
  reportedDate: selectReportedDate(state),
  latestdate: selectLatestdate(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  getActivistIdFromInvestorIdReq,
  getPerformancePeriodicbyActivistLstReq,
  getListofReprtingDateReq,
  handleChangeDate,
  handleResetActivistPerformance
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorActivismPerformanceContainer)
);
