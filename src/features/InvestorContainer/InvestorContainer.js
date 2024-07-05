import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Investor from '../../components/Investor/General/Investor';
import { handleVisitorLog, searchFormReq, getInvestorProfileReq, handleResetSearch } from './InvestorSlice';
import { handleResetCompanyTitle, handleResetBreadcrumbs, handleResetCompanyPath } from '../General/TitleSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const InvestorContainer = ({
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleInvestorSearch,
  searchInvestorRecordset,
  investorProfile,
  handleResetCompanyTitle,
  handleResetSearch
}) => {
  useEffect(() => {
    handleResetSearch();
  }, [handleResetSearch]);

  return (
    <ErrorBoundary>
      <Investor
        handleVisitorLog={handleVisitorLog}
        handleResetBreadcrumbs={handleResetBreadcrumbs}
        handleResetCompanyTitle={handleResetCompanyTitle}
        handleResetCompanyPath={handleResetCompanyPath}
        handleInvestorSearch={handleInvestorSearch}
        searchInvestorRecordset={searchInvestorRecordset}
        investorProfile={investorProfile}
        handleResetSearch={handleResetSearch}
      />
    </ErrorBoundary>
  );
};

InvestorContainer.propTypes = {
  handleInvestorSearch: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  investorProfile: PropTypes.any,
  searchInvestorRecordset: PropTypes.any
};

const selectDecodeToken = (state) => state.investor.DecodeToken;
const selectActiveScreen = createSelector([selectDecodeToken], (DecodeToken) => DecodeToken);
const selectSearchInvestorRecordset = (state) => state.investor.searchInvestorRecordset;
const selectInvestorProfile = (state) => state.investor.investorProfile;

const mapStateToProps = (state) => ({
  DecodeToken: selectActiveScreen(state),
  InvestorProfile: selectInvestorProfile(state),
  searchInvestorRecordset: selectSearchInvestorRecordset(state)
});

const mapDispatchToProps = {
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleResetCompanyTitle,
  handleInvestorSearch: searchFormReq,
  handleInvestorProfile: getInvestorProfileReq,
  handleResetSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestorContainer);
