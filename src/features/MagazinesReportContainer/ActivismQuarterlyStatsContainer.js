import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import prodConst from '../../constants/ProductConstants';
import ActivismQuarterlyReports from '../../components/MagazinesReport/ActivismReport/ActivismQuarterlyStats';
import {
  getMagazinesReportListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
} from './MagazinesReportSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const ActivismQuarterlyReportsContainer = ({
  getMagazinesReportListReq,
  btnIdForExpandData,
  handleSetBtnIdForExpandData,
  viewPDFFileName,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading,
  isLoadingMagazinesReport,
  magazinesReport_activism_quarterlyStatsData,
  location
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    handleMagazineIsLoading();
    getMagazinesReportListReq({
      product_id: prodConst.ACTIVISM,
      article_type_list: prodConst.QUARTERLY_STATS_ARTICLE_TYPE,
      location: location.pathname
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [getMagazinesReportListReq, handleMagazineIsLoading]);

  return (
    <ErrorBoundary>
      <ActivismQuarterlyReports
        rowDataList={magazinesReport_activism_quarterlyStatsData}
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

ActivismQuarterlyReportsContainer.propTypes = {
  btnIdForExpandData: PropTypes.any.isRequired,
  getMagazinesReportListReq: PropTypes.func.isRequired,
  handleSetBtnIdForExpandData: PropTypes.func.isRequired,
  handleUpdateData: PropTypes.func.isRequired,
  handleMagazineIsLoading: PropTypes.func.isRequired,
  handleViewPDFFileName: PropTypes.func.isRequired,
  isLoadingMagazinesReport: PropTypes.bool.isRequired,
  magazinesReport_activism_quarterlyStatsData: PropTypes.any.isRequired,
  viewPDFFileName: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

const selectActivismMonthlyData = (state) =>
  state.magazinesReport.magazinesReport_activism_quarterlyStatsData;
const selectBtnIdForExpandData = (state) =>
  state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) =>
  state.magazinesReport.isLoadingMagazinesReport;

const mapStateToProps = (state) => ({
  viewPDFFileName: selectViewPDFFileName(state),
  magazinesReport_activism_quarterlyStatsData: selectActivismMonthlyData(state),
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActivismQuarterlyReportsContainer)
);
