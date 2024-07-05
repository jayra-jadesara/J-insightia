import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Advisers from '../../components/Advisers/General/Advisor';
import {
  handleVisitorLog,
  getAdvisorSearchData,
  handleResetSearch
} from './AdvisersSlice';
import {
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath
} from '../General/TitleSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const AdvisorContainer = ({
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleAdvisorSearch,
  companyProfile,
  handleResetCompanyTitle,
  lstAdvisorSearchData,
  handleResetSearch
}) => {
  useEffect(() => {
    handleResetSearch();
  }, [handleResetSearch]);

  return (
    <ErrorBoundary>
      <Advisers
        handleVisitorLog={handleVisitorLog}
        handleResetBreadcrumbs={handleResetBreadcrumbs}
        handleResetCompanyTitle={handleResetCompanyTitle}
        handleResetCompanyPath={handleResetCompanyPath}
        handleAdvisorSearch={handleAdvisorSearch}
        companyProfile={companyProfile}
        lstAdvisorSearchData={lstAdvisorSearchData}
        handleResetSearch={handleResetSearch}
      />
    </ErrorBoundary>
  );
};

AdvisorContainer.propTypes = {
  companyProfile: PropTypes.any,
  handleAdvisorSearch: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  searchCompanyRecordset: PropTypes.any
};

AdvisorContainer.defaultProps = {
  handleAdvisorSearch: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetCompanyTitle: () => {},
  handleVisitorLog: () => {}
};

const selectDecodeToken = (state) => state.company.DecodeToken;
const selectActiveScreen = createSelector(
  [selectDecodeToken],
  (DecodeToken) => DecodeToken
);
const selectSearchCompanyRecordset = (state) =>
  state.company.searchCompanyRecordset;
const selectCompanyProfile = (state) => state.company.companyProfile;

// ----Adviser Search
const selectLstAdvisorSearchData = (state) =>
  state.advisers.lstAdvisorSearchData;

const mapStateToProps = (state) => ({
  DecodeToken: selectActiveScreen(state),
  CompanyProfile: selectCompanyProfile(state),
  searchCompanyRecordset: selectSearchCompanyRecordset(state),

  // ----Adviser Search
  lstAdvisorSearchData: selectLstAdvisorSearchData(state)
});
const mapDispatchToProps = {
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleResetCompanyTitle,
  handleAdvisorSearch: getAdvisorSearchData,
  handleResetSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorContainer);
