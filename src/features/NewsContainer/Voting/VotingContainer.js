import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewsVoting from '../../../components/News/Voting/Voting';
import productConstant from '../../../constants/ProductConstants';
import {
  newsAccessReq,
  getAllProductLatestNewsReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
} from '../NewsSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const VotingContainer = ({
  newsAccessReq,
  getAllProductLatestNewsReq,
  handleResetSidebarNews,
  isDisableNewsVoting,
  ...props
}) => {
  useEffect(() => {
    handleResetSidebarNews();
  }, [handleResetSidebarNews]);
  useEffect(() => {
    async function getNewsAccess() {
      await newsAccessReq(productConstant.VOTING);
      const data = {
        productid: productConstant.VOTING,
        cmpid: null,
        invid: null
      };
      await getAllProductLatestNewsReq(data);
    }
    getNewsAccess();
  }, [newsAccessReq, getAllProductLatestNewsReq]);

  return (
    <ErrorBoundary>
      <NewsVoting {...props} isDisableNewsVoting={isDisableNewsVoting} />
    </ErrorBoundary>
  );
};

VotingContainer.propTypes = {
  getAllProductLatestNewsReq: PropTypes.func.isRequired,
  newsAccessReq: PropTypes.func.isRequired
};

const SelectIsEnableVotingForCurrentUser = (state) =>
  state.news.isEnableVotingForCurrentUser;
const SelectVotingNews = (state) => state.news.votingNews;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;
const SelectIsDisableNewsVoting = (state) => (state.headerTitle ? state.headerTitle.isDisableNewsVoting : undefined);

const mapStateToProps = (state) => ({
  isEnableVotingForCurrentUser: SelectIsEnableVotingForCurrentUser(state),
  votingNews: SelectVotingNews(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state),
  isDisableNewsVoting: SelectIsDisableNewsVoting(state),
});

const mapDispatchToProps = {
  newsAccessReq,
  getAllProductLatestNewsReq,
  handleSelectSidebarNews,
  handleResetSidebarNews
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VotingContainer)
);
