import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Covid19 from '../../../components/News/Activism/Covid19';
import {
  listnewswithTagReq,
  newsAccessReq,
  handleNewsVisitorLog,
  handleSelectSidebarNews,
  handleResetSidebarNews
} from '../NewsSlice';

import NewsTag from '../../../constants/NewsTagConstant';
import product from '../../../constants/ProductConstants';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const Covid19Container = ({ location, listnewswithTagReq, newsAccessReq, handleResetSidebarNews, ...props }) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [handleResetSidebarNews]);
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsAccess() {
      await newsAccessReq(product.ACTIVISM);
      await listnewswithTagReq(NewsTag.NEWS_TAG_COVID_19);
    }
    getNewsAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [listnewswithTagReq, newsAccessReq]);
  return (
    <ErrorBoundary>
  <Covid19 {...props} location={location} />
  </ErrorBoundary>
  );
};

Covid19Container.propTypes = {
  listnewswithTagReq: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectCovid19News = (state) => state.news.covid19News;
const SelectLatestNews = (state) => state.news.latestNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;

const mapStateToProps = (state) => ({
  covid19News: SelectCovid19News(state),
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Covid19Container));
