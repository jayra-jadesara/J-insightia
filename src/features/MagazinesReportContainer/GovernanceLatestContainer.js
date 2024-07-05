import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import prodConst from '../../constants/ProductConstants';
import GovernanceLatest from '../../components/MagazinesReport/GovernanceReport/GovernanceLatest';
import {
  getMagazinesReportListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
} from './MagazinesReportSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const GovernanceLatestReports = ({
  getMagazinesReportListReq,
  magazinesReport_governance_latestData,
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
      product_id: prodConst.GOVERNANCE,
      location: location.pathname
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [getMagazinesReportListReq, handleMagazineIsLoading]);

  return (
    <ErrorBoundary>
      <GovernanceLatest
        rowDataList={magazinesReport_governance_latestData}
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

GovernanceLatestReports.propTypes = {
  btnIdForExpandData: PropTypes.any.isRequired,
  getMagazinesReportListReq: PropTypes.func.isRequired,
  handleSetBtnIdForExpandData: PropTypes.func.isRequired,
  handleMagazineIsLoading: PropTypes.func.isRequired,
  handleUpdateData: PropTypes.func.isRequired,
  handleViewPDFFileName: PropTypes.func.isRequired,
  isLoadingMagazinesReport: PropTypes.bool.isRequired,
  magazinesReport_governance_latestData: PropTypes.any.isRequired,
  viewPDFFileName: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

const selectGovernanceLatestReportsData = (state) =>
  state.magazinesReport.magazinesReport_governance_latestData;
const selectBtnIdForExpandData = (state) =>
  state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) =>
  state.magazinesReport.isLoadingMagazinesReport;

const mapStateToProps = (state) => ({
  viewPDFFileName: selectViewPDFFileName(state),
  magazinesReport_governance_latestData:
    selectGovernanceLatestReportsData(state),
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
  connect(mapStateToProps, mapDispatchToProps)(GovernanceLatestReports)
);
