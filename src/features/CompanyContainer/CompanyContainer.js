import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Company from '../../components/Company/General/Company';
import { handleVisitorLog, searchFormReq, getCompanyProfileReq, handleResetSearch } from './CompanySlice';
import { handleResetCompanyTitle, handleResetBreadcrumbs, handleResetCompanyPath, handleResethasCompanyTitle } from '../General/TitleSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const CompanyContainer = ({
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleCompanySearch,
  searchCompanyRecordset,
  companyProfile,
  handleResetCompanyTitle,
  handleResetSearch,
  handleResethasCompanyTitle,
}) => {
  useEffect(() => {
    handleResetSearch();
  }, [handleResetSearch]);

  return (
    <ErrorBoundary>
    <Company
      handleVisitorLog={handleVisitorLog}
      handleResetBreadcrumbs={handleResetBreadcrumbs}
      handleResetCompanyTitle={handleResetCompanyTitle}
      handleResetCompanyPath={handleResetCompanyPath}
      handleCompanySearch={handleCompanySearch}
      searchCompanyRecordset={searchCompanyRecordset}
      companyProfile={companyProfile}
      handleResethasCompanyTitle={handleResethasCompanyTitle}
      handleResetSearch={handleResetSearch}
    />
    </ErrorBoundary>
  );
};

CompanyContainer.propTypes = {
  companyProfile: PropTypes.any,
  handleCompanySearch: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  searchCompanyRecordset: PropTypes.any
};

CompanyContainer.defaultProps = {
  handleCompanySearch: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetCompanyTitle: () => {},
  handleVisitorLog: () => {}
};

const selectDecodeToken = (state) => state.company.DecodeToken;
const selectActiveScreen = createSelector([selectDecodeToken], (DecodeToken) => DecodeToken);
const selectSearchCompanyRecordset = (state) => state.company.searchCompanyRecordset;
const selectCompanyProfile = (state) => state.company.companyProfile;

const mapStateToProps = (state) => ({
  DecodeToken: selectActiveScreen(state),
  CompanyProfile: selectCompanyProfile(state),
  searchCompanyRecordset: selectSearchCompanyRecordset(state)
});
const mapDispatchToProps = {
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleResetCompanyTitle,
  handleCompanySearch: searchFormReq,
  handleComanyProfile: getCompanyProfileReq,
  handleResetSearch,
  handleResethasCompanyTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer);
