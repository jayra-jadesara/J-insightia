import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  handleVisitorLog,
  getAdvisorSearchData,
  getAdvisorProfileReq,
  resetCompanyProfile,
  getTokenDecode
} from './AdvisersSlice';
import AdvisorHeader from '../../components/Advisers/General/AdvisorHeader';

const AdvisorHeaderContainer = ({
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
    if (query.company_id) {
      handleComanyProfile(query.company_id);
    }
    return resetCompanyProfile;
  }, [getTokenDecode, query.company_id]);

  return (
    <AdvisorHeader
      companyProfile={companyProfile}
      token={token}
      children={children}
    />
  );
};

AdvisorHeaderContainer.propTypes = {
  children: PropTypes.any.isRequired,
  companyProfile: PropTypes.any.isRequired,
  getTokenDecode: PropTypes.func.isRequired,
  handleComanyProfile: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  resetCompanyProfile: PropTypes.func.isRequired,
  token: PropTypes.any.isRequired
};

const selectActiveScreen = createSelector(
  [selectDecodeToken],
  (DecodeToken) => DecodeToken
);

const SelectDecodeToken = (state) => state.advisers.getTokenDecode;
// const selectDecodeToken = (state) => state.company.DecodeToken;
const selectCompanyProfile = (state) => state.company.companyProfile;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  companyProfile: selectCompanyProfile(state)
});
const mapDispatchToProps = {
  handleVisitorLog,
  handleAdvisorSearch: getAdvisorSearchData,
  handleComanyProfile: getAdvisorProfileReq,
  resetCompanyProfile,
  getTokenDecode
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvisorHeaderContainer)
);
