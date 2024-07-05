import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RecentDownloads from '../../components/RecentDownloads/RecentDownloads';
import { getRecentDownloadListReq } from './RecentDownloadsSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const RecentDownloadsContainer = ({
  recentDownloadsDataList,
  getRecentDownloadListReq,
  loadingData,
  ...props
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    getRecentDownloadListReq();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <ErrorBoundary>
      <RecentDownloads
        {...props}
        children={props.children}
        recentDownloadsDataList={recentDownloadsDataList}
        loadingData={loadingData}
      />
    </ErrorBoundary>
  );
};

RecentDownloadsContainer.propTypes = {
  recentDownloadsDataList: PropTypes.array,
  getRecentDownloadListReq: PropTypes.func.isRequired,
};
RecentDownloadsContainer.defaultProps = {
  recentDownloadsDataList: [],
};

const SelectrecentDownloadsDataList = (state) =>
  state.RecentDownloads.recentDownloadsDataList;

const SelectrecentDownloadsDataloadingData = (state) =>
  state.RecentDownloads.loadingData;

const mapStateToProps = (state) => ({
  recentDownloadsDataList: SelectrecentDownloadsDataList(state),
  loadingData: SelectrecentDownloadsDataloadingData(state),
});

const mapDispatchToProps = {
  getRecentDownloadListReq,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecentDownloadsContainer)
);
