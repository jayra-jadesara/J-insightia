import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AsInDepth from '../../../components/News/ActivistShorts/AsInDepth';
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

const AsInDepthContainer = ({
  location,
  listnewswithTagReq,
  newsAccessReq,
  handleResetSidebarNews,
  isDisableNewsActivistShort,
  ...props
}) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [handleResetSidebarNews]);
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsAccess() {
      await newsAccessReq(product.ACTIVIST_SHORTS);
      await listnewswithTagReq(NewsTag.ACTIVIST_SHORTS_NEWS_TAG_IN_DEPTH);
    }
    getNewsAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [listnewswithTagReq, newsAccessReq]);
  return (
    <ErrorBoundary>
      <AsInDepth {...props} location={location} isDisableNewsActivistShort={isDisableNewsActivistShort} />
    </ErrorBoundary>
  );
};

AsInDepthContainer.propTypes = {
  listnewswithTagReq: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectInDepthArticals = (state) => state.news.shortsInDepthArticals;
const SelectLatestNews = (state) => state.news.latestNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;
const SelectIsDisableNewsActivistShort = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsActivistShort : undefined;

const mapStateToProps = (state) => ({
  inDepthArticals: SelectInDepthArticals(state),
  latestNews: SelectLatestNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state),
  isDisableNewsActivistShort: SelectIsDisableNewsActivistShort(state),
});

const mapDispatchToProps = {
  listnewswithTagReq,
  handleNewsVisitorLog,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AsInDepthContainer)
);
