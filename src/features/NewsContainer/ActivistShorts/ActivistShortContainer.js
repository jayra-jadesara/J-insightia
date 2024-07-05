import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ActivistShorts from '../../../components/News/ActivistShorts/ActivistShorts';
import {
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
} from '../NewsSlice';
import product from '../../../constants/ProductConstants';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const ActivistShortContainer = ({
  getAllProductLatestNewsReq,
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
      const data = {
        productid: product.ACTIVIST_SHORTS,
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
      <ActivistShorts {...props} isDisableNewsActivistShort={isDisableNewsActivistShort} />
    </ErrorBoundary>
  );
};

ActivistShortContainer.propTypes = {
  getAllProductLatestNewsReq: PropTypes.func.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectActivistShortNews = (state) => state.news.activistShortNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;
const SelectIsDisableNewsActivistShort = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsActivistShort : undefined;

const mapStateToProps = (state) => ({
  activistShortNews: SelectActivistShortNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state),
  isDisableNewsActivistShort: SelectIsDisableNewsActivistShort(state),
});

const mapDispatchToProps = {
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivistShortContainer)
);
