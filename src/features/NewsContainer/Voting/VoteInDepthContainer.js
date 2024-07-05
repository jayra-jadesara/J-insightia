import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VoteInDepth from '../../../components/News/Voting/VoteInDepth';
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

const VoteInDepthContainer = ({
  location,
  listnewswithTagReq,
  newsAccessReq,
  handleResetSidebarNews,
  isDisableNewsVoting,
  ...props
}) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [handleResetSidebarNews]);
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsAccess() {
      await newsAccessReq(product.VOTING);
      await listnewswithTagReq(NewsTag.VOTING_NEWS_TAG_IN_DEPTH);
    }
    getNewsAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [listnewswithTagReq, newsAccessReq]);
  return (
    <ErrorBoundary>
      <VoteInDepth {...props} location={location} isDisableNewsVoting={isDisableNewsVoting} />
    </ErrorBoundary>
  );
};

VoteInDepthContainer.propTypes = {
  listnewswithTagReq: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectInDepthArticals = (state) => state.news.votingInDepthArticals;
const SelectLatestNews = (state) => state.news.latestNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;
const SelectIsDisableNewsVoting = (state) => (state.headerTitle ? state.headerTitle.isDisableNewsVoting : undefined);

const mapStateToProps = (state) => ({
  inDepthArticals: SelectInDepthArticals(state),
  latestNews: SelectLatestNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state),
  isDisableNewsVoting: SelectIsDisableNewsVoting(state),
});

const mapDispatchToProps = {
  listnewswithTagReq,
  handleNewsVisitorLog,
  newsAccessReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VoteInDepthContainer)
);
