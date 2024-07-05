import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WeeklyWrap from '../../../components/News/Activism/WeeklyWrap';
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

const WeeklyWrapContainer = ({ location, listnewswithTagReq, newsAccessReq, handleResetSidebarNews, ...props }) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [handleResetSidebarNews]);
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsAccess() {
      await newsAccessReq(product.ACTIVISM);
      await listnewswithTagReq(NewsTag.NEWS_TAG_WEEKLY_WRAP);
    }
    getNewsAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [listnewswithTagReq, newsAccessReq]);
  return (
    <ErrorBoundary>
  <WeeklyWrap {...props} location={location} />
  </ErrorBoundary>

  );
};

WeeklyWrapContainer.propTypes = {
  listnewswithTagReq: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectWeeklyWrapNewsNews = (state) => state.news.weeklyWrapNews;
const SelectLatestNews = (state) => state.news.latestNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;

const mapStateToProps = (state) => ({
  weeklyWrapNews: SelectWeeklyWrapNewsNews(state),
  latestNews: SelectLatestNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state)
});

const mapDispatchToProps = {
  listnewswithTagReq,
  handleNewsVisitorLog,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeeklyWrapContainer));
