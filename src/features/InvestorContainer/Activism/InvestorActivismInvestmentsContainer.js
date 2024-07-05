import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import InvestorActivismInvestment from '../../../components/Investor/InvestorActivism/InvestorActivismInvestment';
import { getActivistIdFromInvestorIdReq } from './../ActivistShorts/ActivistShortSlice';
import {
  getActivistHoldingsLstReq,
  get13F_Filings_by_ActivistLstReq,
  handleResetActivistInvestment,
} from '../Activism/InvestorActivismSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';
import { handleResetLoader } from '../../General/TitleSlice';

const InvestorActivismInvestmentsContainer = ({
  location,
  children,
  //Overview
  getActivistIdFromInvestorIdReq,
  getActivistHoldingsLstReq,
  get13F_Filings_by_ActivistLstReq,
  lstActivistHoldings,
  lst13F_Filings_by_Activist,
  handleResetActivistInvestment,
  isLoading,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
  handleResetLoader,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    handleResetActivistInvestment();
    handleResetLoader();
  }, [handleResetActivistInvestment, handleResetLoader, location.pathname]);

  useEffect(() => {
    if (
      query.investor !== undefined &&
      query.investor !== 'undefined' &&
      distinctProfile !== null
    ) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      getActivistIdFromInvestorIdReq(investorId).then((res) => {
        const actid = res.payload.activist_id;
        if (actid !== null) {
          getActivistHoldingsLstReq(actid);
          get13F_Filings_by_ActivistLstReq(actid);
        }
      });
    }
  }, [
    getActivistHoldingsLstReq,
    query.investor,
    get13F_Filings_by_ActivistLstReq,
    distinctProfile,
  ]);

  return (
    <ErrorBoundary>
      <InvestorActivismInvestment
        children={children}
        lstActivistHoldings={lstActivistHoldings}
        lst13F_Filings_by_Activist={lst13F_Filings_by_Activist}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
        isLoading={isLoading}
      />
    </ErrorBoundary>
  );
};

InvestorActivismInvestmentsContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  distinctProfile: PropTypes.any.isRequired,
};

const selectLstActivistHoldings = (state) =>
  state.InvestorActivismSlice.lstActivistHoldings;
const selectLst13F_Filings_by_Activist = (state) =>
  state.InvestorActivismSlice.lst13F_Filings_by_Activist;
const selectisLoading = (state) => state.InvestorActivismSlice.isLoading;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  lstActivistHoldings: selectLstActivistHoldings(state),
  lst13F_Filings_by_Activist: selectLst13F_Filings_by_Activist(state),
  isLoading: selectisLoading(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  getActivistIdFromInvestorIdReq,
  getActivistHoldingsLstReq,
  get13F_Filings_by_ActivistLstReq,
  handleResetActivistInvestment,
  handleResetLoader,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorActivismInvestmentsContainer)
);
