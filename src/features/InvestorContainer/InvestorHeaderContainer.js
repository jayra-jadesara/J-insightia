import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { handleVisitorLog, searchFormReq, getInvestorProfileReq, resetInvestorProfile } from './InvestorSlice';
import InvestorHeader from '../../components/Investor/General/InvestorHeader';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const InvestorHeaderContainer = ({
  handleInvestorProfile,
  InvestorProfile,
  location,
  resetInvestorProfile,
  children
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    if (query.investor && query.investor !== 'undefined') {
      handleInvestorProfile(query.investor);
    }
    return resetInvestorProfile;
  }, [query.investor]);

  return (
    <ErrorBoundary>
      <InvestorHeader InvestorProfile={InvestorProfile} children={children} />
    </ErrorBoundary>
  );
};

InvestorHeaderContainer.propTypes = {
  InvestorProfile: PropTypes.any.isRequired,
  handleInvestorProfile: PropTypes.func.isRequired,
  resetInvestorProfile: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
};

const selectActiveScreen = createSelector([selectDecodeToken], (DecodeToken) => DecodeToken);

const selectDecodeToken = (state) => state.investor.DecodeToken;
const selectSearchInvestorRecordset = (state) => state.investor.searchInvestorRecordset;
const selectInvestorProfile = (state) => state.investor.InvestorProfile;

const mapStateToProps = (state) => ({ InvestorProfile: selectInvestorProfile(state) });
const mapDispatchToProps = {
  handleVisitorLog,
  handleInvestorSearch: searchFormReq,
  handleInvestorProfile: getInvestorProfileReq,
  resetInvestorProfile
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorHeaderContainer));
