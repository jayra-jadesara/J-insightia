import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Overview from '../../../components/News/Latest/Overview';
import {
  GetLatestNewsFilteredReq,
  handlequickSearchReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
} from '../NewsSlice';
import {
  handleResetBreadcrumbs,
  handleResetCompanyPath
} from '../../General/TitleSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const NewsContainer = ({
  GetLatestNewsFilteredReq,
  handleResetSidebarNews,
  ...props
}) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [handleResetSidebarNews]);
  useEffect(() => {
    let isMounted = true; // note this mounted flag
    fetchData();
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

    // simulate some Web API fetching
    function fetchData() {
      setTimeout(() => {
        // drop "if (isMounted)" to trigger error again
        if (isMounted) GetLatestNewsFilteredReq();
      }, 4000);
    }
  }, [GetLatestNewsFilteredReq]);
  return (
    <ErrorBoundary>
      <Overview {...props} />
    </ErrorBoundary>
  );
};

NewsContainer.propTypes = {
  GetLatestNewsFilteredReq: PropTypes.func.isRequired
};

const SelectLatestNews = (state) => state.news.latestNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;

const mapStateToProps = (state) => ({
  latestNews: SelectLatestNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state)
});
const mapDispatchToProps = {
  GetLatestNewsFilteredReq,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handlequickSearchReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewsContainer)
);
