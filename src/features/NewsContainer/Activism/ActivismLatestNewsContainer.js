import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Latest from '../../../components/News/Activism/Latest';
import {
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
} from '../NewsSlice';
import product from '../../../constants/ProductConstants';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const ActivismLatestNewsContainer = ({
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleResetSidebarNews,
  isDisableNewsActivismLatest,
  ...props
}) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [getAllProductLatestNewsReq, handleResetSidebarNews]);
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsAccess() {
      await newsAccessReq(product.ACTIVISM);
      const data = {
        productid: product.ACTIVISM,
        cmpid: null,
        invid: null
      };
      await getAllProductLatestNewsReq(data);
    }
    getNewsAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [getAllProductLatestNewsReq, newsAccessReq]);
  return (
    <ErrorBoundary>
      <Latest {...props} isDisableNewsActivismLatest={isDisableNewsActivismLatest} />
    </ErrorBoundary>
  );
};

ActivismLatestNewsContainer.propTypes = {
  getAllProductLatestNewsReq: PropTypes.func.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectAllLatestActivismNews = (state) => state.news.allLatestActivismNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;
// tab
const SelectIsAccessNewsActivismLatest = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsActivismLatest : undefined;

const mapStateToProps = (state) => ({
  allLatestActivismNews: SelectAllLatestActivismNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state),
  isDisableNewsActivismLatest: SelectIsAccessNewsActivismLatest(state),
});

const mapDispatchToProps = {
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivismLatestNewsContainer)
);
