import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorOverview from '../../components/Investor/General/Overview';
import { GetFMProfileReq, handleresetFmProfile } from './InvestorSlice';
import { INVESTOR_SEARCH } from '../../constants/PathsConstant';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import msgConst from '../../constants/MessageConstans';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const InvestorOverviewContainer = ({
  location,
  children,
  GetFMProfileReq,
  getFMProfile,
  handleresetFmProfile,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleresetFmProfile();
    GetFMProfileReq(query.investor);
    return function cleanup() {
      abortController.abort();
    };
  }, [GetFMProfileReq, handleresetFmProfile, query.investor]);

  // AUM digits
  function numberWithCommas(x) {
    if (x !== undefined && x !== null) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return '';
  }
  function preventFieldNullNUndefined(x) {
    if (x !== undefined && x !== null) {
      return x;
    }
    return null;
  }

  if (getFMProfile === null || getFMProfile === undefined) {
    return <div className='ps-3'>{msgConst.LOADING}</div>;
  }

  const val = numberWithCommas(preventFieldNullNUndefined(getFMProfile.assets_under_mgmt));
  const assets_under_mgmtVal = val !== '' ? `$ ${val} ($mn)` : null;
  const total_votesVal = numberWithCommas(preventFieldNullNUndefined(getFMProfile.total_votes));

  const Country_nameVal = preventFieldNullNUndefined(getFMProfile.Country_name);
  const aboutVal = preventFieldNullNUndefined(getFMProfile.about);
  const emailVal = preventFieldNullNUndefined(getFMProfile.email);
  const focused_typeVal = preventFieldNullNUndefined(getFMProfile.focused_type);
  const foundedVal = preventFieldNullNUndefined(getFMProfile.founded);
  const has_voting_dataVal = preventFieldNullNUndefined(getFMProfile.has_voting_data);
  const investor_type_nameVal = preventFieldNullNUndefined(getFMProfile.investor_type_name);
  const number_activism_campaignVal = preventFieldNullNUndefined(getFMProfile.number_activism_campaign);
  const number_short_campaignVal = preventFieldNullNUndefined(getFMProfile.number_short_campaign);

  const websiteVal = preventFieldNullNUndefined(getFMProfile.website);

  return (
    <ErrorBoundary>
      <InvestorOverview
        children={children}
        location={location}
        getFMProfile={getFMProfile}
        Country_nameVal={Country_nameVal}
        aboutVal={aboutVal}
        assets_under_mgmtVal={assets_under_mgmtVal}
        emailVal={emailVal}
        focused_typeVal={focused_typeVal}
        foundedVal={foundedVal}
        has_voting_dataVal={has_voting_dataVal}
        investor_type_nameVal={investor_type_nameVal}
        number_activism_campaignVal={number_activism_campaignVal}
        number_short_campaignVal={number_short_campaignVal}
        total_votesVal={total_votesVal}
        websiteVal={websiteVal}
      />
    </ErrorBoundary>
  );
};

InvestorOverviewContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  GetFMProfileReq: PropTypes.func,
};

InvestorOverviewContainer.defaultProps = {
  location: {},
  children: undefined,
  GetFMProfileReq: {},
};

const SelectGetFMProfile = (state) => state.investor.getFMProfile;

const mapStateToProps = (state) => ({
  getFMProfile: SelectGetFMProfile(state),
});

const mapDispatchToProps = {
  GetFMProfileReq,
  handleresetFmProfile,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorOverviewContainer)
);
