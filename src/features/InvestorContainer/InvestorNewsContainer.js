import React from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import InvestorNews from '../../components/Investor/InvestorNews/InvestorNews';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const InvestorNewsContainer = ({ location, children }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  return (
    <ErrorBoundary>
      <InvestorNews children={children} />
    </ErrorBoundary>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorNewsContainer));
