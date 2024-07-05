import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InDepth from '../../../components/News/Activism/InDepth';
import {
  listnewswithTagReq,
  handleNewsVisitorLog,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
} from '../NewsSlice';

import NewsTag from '../../../constants/NewsTagConstant';
import product from '../../../constants/ProductConstants';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const InDepthContainer = ({
  location,
  listnewswithTagReq,
  newsAccessReq,
  handleResetSidebarNews,
  isDisableNewsActivismLatest,
  ...props
}) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [handleResetSidebarNews]);
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsAccess() {
      await newsAccessReq(product.ACTIVISM);
      await listnewswithTagReq(NewsTag.ACTIVISM_NEWS_TAG_IN_DEPTH);
      await listnewswithTagReq(NewsTag.NEWS_TAG_IN_DEPTH);
    }
    getNewsAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [listnewswithTagReq, newsAccessReq]);
  return (
    <ErrorBoundary>
      <InDepth {...props} location={location} isDisableNewsActivismLatest={isDisableNewsActivismLatest} />
    </ErrorBoundary>
  );
};

InDepthContainer.propTypes = {
  listnewswithTagReq: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectInDepthArticals = (state) => state.news.inDepthArticals;
const SelectLatestNews = (state) => state.news.latestNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;
// tab
const SelectIsAccessNewsActivismLatest = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsActivismLatest : undefined;

const mapStateToProps = (state) => ({
  inDepthArticals: SelectInDepthArticals(state),
  latestNews: SelectLatestNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state),
  isDisableNewsActivismLatest: SelectIsAccessNewsActivismLatest(state),
});

const mapDispatchToProps = {
  listnewswithTagReq,
  handleNewsVisitorLog,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InDepthContainer)
);
