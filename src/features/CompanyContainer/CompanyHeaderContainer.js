import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  handleVisitorLog,
  searchFormReq,
  getCompanyProfileReq,
  resetCompanyProfile,
  getTokenDecode
} from './CompanySlice';
import CompanyHeader from '../../components/Company/General/CompanyHeader';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const CompanyHeaderContainer = ({
  token,
  getTokenDecode,
  handleComanyProfile,
  companyProfile,
  location,
  resetCompanyProfile,
  children
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    getTokenDecode();

    if (query.pid) {
      handleComanyProfile(query.pid);
    }
    return resetCompanyProfile;
  }, [getTokenDecode, query.pid]);

  return (
    <ErrorBoundary>
      <CompanyHeader companyProfile={companyProfile} token={token} children={children} />
    </ErrorBoundary>
  );
};

CompanyHeaderContainer.propTypes = {
  children: PropTypes.any.isRequired,
  companyProfile: PropTypes.any.isRequired,
  getTokenDecode: PropTypes.func.isRequired,
  handleComanyProfile: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  resetCompanyProfile: PropTypes.func.isRequired,
  token: PropTypes.any.isRequired
};

// const selectActiveScreen = createSelector([selectDecodeToken], (DecodeToken) => DecodeToken);

const SelectDecodeToken = (state) => state.company.getTokenDecode;
// const selectDecodeToken = (state) => state.company.DecodeToken;
const selectSearchCompanyRecordset = (state) => state.company.searchCompanyRecordset;
const selectCompanyProfile = (state) => state.company.companyProfile;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  companyProfile: selectCompanyProfile(state)
});
const mapDispatchToProps = {
  handleVisitorLog,
  handleCompanySearch: searchFormReq,
  handleComanyProfile: getCompanyProfileReq,
  resetCompanyProfile,
  getTokenDecode
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyHeaderContainer));
