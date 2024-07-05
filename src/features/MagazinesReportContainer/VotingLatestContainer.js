import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import prodConst from '../../constants/ProductConstants';
import VotingLatestReports from '../../components/MagazinesReport/VotingReport/VotingMagazine';
import {
  getMagazinesReportListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
} from './MagazinesReportSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const VotingLatestContainer = ({
  getMagazinesReportListReq,
  magazinesReport_voting_latestData,
  btnIdForExpandData,
  handleSetBtnIdForExpandData,
  viewPDFFileName,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading,
  isLoadingMagazinesReport,
  location
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    handleMagazineIsLoading();
    getMagazinesReportListReq({
      product_id: prodConst.VOTING,
      location: location.pathname
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [getMagazinesReportListReq]);

  return (
    <ErrorBoundary>
      <VotingLatestReports
        rowDataList={magazinesReport_voting_latestData}
        btnIdForExpandData={btnIdForExpandData}
        handleSetBtnIdForExpandData={handleSetBtnIdForExpandData}
        handleViewPDFFileName={handleViewPDFFileName}
        viewPDFFileName={viewPDFFileName}
        handleUpdateData={handleUpdateData}
        getMagazinesReportListReq={getMagazinesReportListReq}
        isLoading={isLoadingMagazinesReport}
      />
    </ErrorBoundary>
  );
};

VotingLatestContainer.propTypes = {
  btnIdForExpandData: PropTypes.any.isRequired,
  getMagazinesReportListReq: PropTypes.func.isRequired,
  handleSetBtnIdForExpandData: PropTypes.func.isRequired,
  handleUpdateData: PropTypes.func.isRequired,
  handleMagazineIsLoading: PropTypes.func.isRequired,
  handleViewPDFFileName: PropTypes.func.isRequired,
  isLoadingMagazinesReport: PropTypes.bool.isRequired,
  magazinesReport_voting_latestData: PropTypes.any.isRequired,
  viewPDFFileName: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

const selectVotingLatestData = (state) =>
  state.magazinesReport.magazinesReport_voting_latestData;
const selectBtnIdForExpandData = (state) =>
  state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) =>
  state.magazinesReport.isLoadingMagazinesReport;

const mapStateToProps = (state) => ({
  viewPDFFileName: selectViewPDFFileName(state),
  magazinesReport_voting_latestData: selectVotingLatestData(state),
  btnIdForExpandData: selectBtnIdForExpandData(state),
  isLoadingMagazinesReport: selectIsLoading(state)
});

const mapDispatchToProps = {
  getMagazinesReportListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VotingLatestContainer)
);
