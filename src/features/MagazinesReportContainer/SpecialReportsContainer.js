import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SpecialReports from '../../components/MagazinesReport/SpecialReports/SpecialReports';
import {
  GetMagazine_ProxyOrSpecialReports_insightiaListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
} from './MagazinesReportSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const SpecialReportsContainer = ({
  GetMagazine_ProxyOrSpecialReports_insightiaListReq,
  magazinesReport_specialReportData,
  btnIdForExpandData,
  handleSetBtnIdForExpandData,
  viewPDFFileName,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading,
  isLoadingMagazinesReport
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    handleMagazineIsLoading();
    GetMagazine_ProxyOrSpecialReports_insightiaListReq(1);
    return function cleanup() {
      abortController.abort();
    };
  }, [
    GetMagazine_ProxyOrSpecialReports_insightiaListReq,
    handleMagazineIsLoading
  ]);

  return (
    <ErrorBoundary>
      <SpecialReports
        rowDataList={magazinesReport_specialReportData}
        btnIdForExpandData={btnIdForExpandData}
        handleSetBtnIdForExpandData={handleSetBtnIdForExpandData}
        handleViewPDFFileName={handleViewPDFFileName}
        viewPDFFileName={viewPDFFileName}
        handleUpdateData={handleUpdateData}
        handleMagazineIsLoading={handleMagazineIsLoading}
        GetMagazine_ProxyOrSpecialReports_insightiaListReq={
          GetMagazine_ProxyOrSpecialReports_insightiaListReq
        }
        isLoading={isLoadingMagazinesReport}
      />
    </ErrorBoundary>
  );
};

SpecialReportsContainer.propTypes = {
  GetMagazine_ProxyOrSpecialReports_insightiaListReq: PropTypes.func.isRequired,
  btnIdForExpandData: PropTypes.any.isRequired,
  handleSetBtnIdForExpandData: PropTypes.func.isRequired,
  handleUpdateData: PropTypes.func.isRequired,
  handleMagazineIsLoading: PropTypes.func.isRequired,
  handleViewPDFFileName: PropTypes.func.isRequired,
  isLoadingMagazinesReport: PropTypes.bool.isRequired,
  magazinesReport_specialReportData: PropTypes.any.isRequired,
  viewPDFFileName: PropTypes.string.isRequired
};

const selectSpecialReportData = (state) =>
  state.magazinesReport.magazinesReport_specialReportData;
const selectBtnIdForExpandData = (state) =>
  state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) =>
  state.magazinesReport.isLoadingMagazinesReport;

const mapStateToProps = (state) => ({
  viewPDFFileName: selectViewPDFFileName(state),
  magazinesReport_specialReportData: selectSpecialReportData(state),
  btnIdForExpandData: selectBtnIdForExpandData(state),
  isLoadingMagazinesReport: selectIsLoading(state)
});

const mapDispatchToProps = {
  GetMagazine_ProxyOrSpecialReports_insightiaListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecialReportsContainer)
);
