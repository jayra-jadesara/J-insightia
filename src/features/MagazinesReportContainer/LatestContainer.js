import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import prodConst from '../../constants/ProductConstants';
import LatestMagazine from '../../components/MagazinesReport/LatestMagazine/LatestMagazine';
import {
  getMagazinesReportListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
} from './MagazinesReportSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const LatestContainer = ({
  getMagazinesReportListReq,
  magazinesReport_latestData,
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
      product_id: null,
      location: null
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [getMagazinesReportListReq, handleMagazineIsLoading]);

  return (
    <ErrorBoundary>
      <LatestMagazine
        rowDataList={magazinesReport_latestData}
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

LatestContainer.propTypes = {
  btnIdForExpandData: PropTypes.any.isRequired,
  getMagazinesReportListReq: PropTypes.func.isRequired,
  handleSetBtnIdForExpandData: PropTypes.func.isRequired,
  handleUpdateData: PropTypes.func.isRequired,
  handleMagazineIsLoading: PropTypes.func.isRequired,
  handleViewPDFFileName: PropTypes.func.isRequired,
  isLoadingMagazinesReport: PropTypes.bool.isRequired,
  magazinesReport_latestData: PropTypes.any.isRequired,
  viewPDFFileName: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

const selectActivismMonthlyData = (state) =>
  state.magazinesReport.magazinesReport_latestData;
const selectBtnIdForExpandData = (state) =>
  state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) =>
  state.magazinesReport.isLoadingMagazinesReport;

const mapStateToProps = (state) => ({
  viewPDFFileName: selectViewPDFFileName(state),
  magazinesReport_latestData: selectActivismMonthlyData(state),
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
  connect(mapStateToProps, mapDispatchToProps)(LatestContainer)
);
