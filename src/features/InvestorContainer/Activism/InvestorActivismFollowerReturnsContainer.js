import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorActivismFollowerReturns from '../../../components/Investor/InvestorActivism/InvestorActivismFollowerReturns';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import { getActivistIdFromInvestorIdReq } from './../ActivistShorts/ActivistShortSlice';
import {
  getFollowerReturnsSearchLstReq,
  getFollowerReturnsActivistStatschartDataReq,
  getFollowerReturnsActivistStatsDataReq,
  handleResetInvestorFollowerReturns,
  handleResetActivismFollowerReturn,
  handleIsLoading,
} from '../Activism/InvestorActivismSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivismFollowerReturnsContainer = ({
  location,
  children,
  getActivistIdFromInvestorIdReq,
  getFollowerReturnsSearchLstReq,
  lstFollowerReturnsSearch_current,
  lstFollowerReturnsSearch_date,
  lstFollowerReturnsSearch_exited,
  getFollowerReturnsActivistStatschartDataReq,
  FollowerReturnsActivistStatschartData,
  getFollowerReturnsActivistStatsDataReq,
  FollowerReturnsActivistStatsData,
  isLoading,
  handleResetActivismFollowerReturn,
  handleIsLoading,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    handleResetInvestorFollowerReturns();
  }, [handleResetInvestorFollowerReturns]);

  useEffect(() => {
    handleResetActivismFollowerReturn();
    if (
      query.investor !== undefined &&
      query.investor !== 'undefined' &&
      distinctProfile !== null
    ) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }

      const getData = async () => {
        const res = await getActivistIdFromInvestorIdReq(investorId);
        const actid = res.payload.activist_id;
        if (actid !== null) {
          await getFollowerReturnsSearchLstReq({ actid: actid });
          await getFollowerReturnsActivistStatschartDataReq(actid);
          await getFollowerReturnsActivistStatsDataReq(actid);
          await handleIsLoading(false);
        }
      };
      getData();
    }
  }, [
    getFollowerReturnsSearchLstReq,
    getFollowerReturnsActivistStatschartDataReq,
    getFollowerReturnsActivistStatsDataReq,
    query.investor,
    handleResetActivismFollowerReturn,
    distinctProfile,
  ]);

  return (
    <ErrorBoundary>
      <InvestorActivismFollowerReturns
        children={children}
        lstFollowerReturnsSearch_current={lstFollowerReturnsSearch_current}
        lstFollowerReturnsSearch_date={lstFollowerReturnsSearch_date}
        lstFollowerReturnsSearch_exited={lstFollowerReturnsSearch_exited}
        FollowerReturnsActivistStatschartData={
          FollowerReturnsActivistStatschartData
        }
        FollowerReturnsActivistStatsData={FollowerReturnsActivistStatsData}
        isLoading={isLoading}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorActivismFollowerReturnsContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

const selectLstFollowerReturnsSearchCurrent = (state) =>
  state.InvestorActivismSlice.lstFollowerReturnsSearch_current;
const selectlstFollowerReturnsSearch_date = (state) =>
  state.InvestorActivismSlice.lstFollowerReturnsSearch_date;

const selectLstFollowerReturnsSearchExited = (state) =>
  state.InvestorActivismSlice.lstFollowerReturnsSearch_exited;

const selectFollowerReturnsActivistStatschartData = (state) =>
  state.InvestorActivismSlice.FollowerReturnsActivistStatschartData;
const selectFollowerReturnsActivistStatsData = (state) =>
  state.InvestorActivismSlice.FollowerReturnsActivistStatsData;
const selectFollowerReturnsisLoading = (state) =>
  state.InvestorActivismSlice.isLoading;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  lstFollowerReturnsSearch_exited: selectLstFollowerReturnsSearchExited(state),
  lstFollowerReturnsSearch_current:
    selectLstFollowerReturnsSearchCurrent(state),
  lstFollowerReturnsSearch_date: selectlstFollowerReturnsSearch_date(state),

  FollowerReturnsActivistStatschartData:
    selectFollowerReturnsActivistStatschartData(state),
  FollowerReturnsActivistStatsData:
    selectFollowerReturnsActivistStatsData(state),
  isLoading: selectFollowerReturnsisLoading(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  getActivistIdFromInvestorIdReq,
  getFollowerReturnsSearchLstReq,
  getFollowerReturnsActivistStatschartDataReq,
  getFollowerReturnsActivistStatsDataReq,
  handleResetActivismFollowerReturn,
  handleIsLoading
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorActivismFollowerReturnsContainer)
);
