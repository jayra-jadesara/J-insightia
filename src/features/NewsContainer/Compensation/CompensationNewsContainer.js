import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Compensation from '../../../components/News/Compensation/Compensation';
import {
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews,
} from '../NewsSlice';
import product from '../../../constants/ProductConstants';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const CompensationNewsContainer = ({
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleResetSidebarNews,
  isDisableNewsCompensation,
  ...props
}) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [getAllProductLatestNewsReq, handleResetSidebarNews]);
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsAccess() {
      await newsAccessReq(product.COMPENSATION);
      const data = {
        productid: product.COMPENSATION,
        cmpid: null,
        invid: null,
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
      <Compensation {...props} isDisableNewsCompensation={isDisableNewsCompensation} />
    </ErrorBoundary>
  );
};

CompensationNewsContainer.propTypes = {
  getAllProductLatestNewsReq: PropTypes.func.isRequired,
  newsAccessReq: PropTypes.func.isRequired,
};

const SelectAllLatestActivismNews = (state) => state.news.compensationNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;
const SelectIsDisableNewsCompensation = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsCompensation : undefined;

const mapStateToProps = (state) => ({
  allLatestActivismNews: SelectAllLatestActivismNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state),
  isDisableNewsCompensation: SelectIsDisableNewsCompensation(state),
});

const mapDispatchToProps = {
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompensationNewsContainer));
