import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewsGovernance from '../../../components/News/Governance/Governance';
import {
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
} from '../NewsSlice';
import product from '../../../constants/ProductConstants';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const GovernanceContainer = ({ getAllProductLatestNewsReq, newsAccessReq, handleResetSidebarNews, ...props }) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [getAllProductLatestNewsReq, handleResetSidebarNews]);
  useEffect(() => {
    async function getNewsAccess() {
      await newsAccessReq(product.GOVERNANCE);
      const data = {
        productid: product.GOVERNANCE,
        cmpid: null,
        invid: null
      };
      await getAllProductLatestNewsReq(data);
    }
    getNewsAccess();
  }, [getAllProductLatestNewsReq, newsAccessReq]);
  return (
    <ErrorBoundary>
      <NewsGovernance {...props} />
    </ErrorBoundary>

  );
};

GovernanceContainer.propTypes = {
  getAllProductLatestNewsReq: PropTypes.func.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectGovernanceNews = (state) => state.news.governanceNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;

const mapStateToProps = (state) => ({
  governanceNews: SelectGovernanceNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state)
});

const mapDispatchToProps = {
  getAllProductLatestNewsReq,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernanceContainer));
