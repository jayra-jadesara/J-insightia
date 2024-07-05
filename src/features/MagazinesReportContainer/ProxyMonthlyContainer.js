import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProxyMonthly from '../../components/MagazinesReport/ProxyMonthly/ProxyMonthly';
import {
  GetMagazine_ProxyOrSpecialReports_insightiaListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
} from './MagazinesReportSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const ProxyMonthlyContainer = ({
  GetMagazine_ProxyOrSpecialReports_insightiaListReq,
  magazinesReport_proxyMonthlyData,
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
    GetMagazine_ProxyOrSpecialReports_insightiaListReq(2);
    return function cleanup() {
      abortController.abort();
    };
  }, [
    GetMagazine_ProxyOrSpecialReports_insightiaListReq,
    handleMagazineIsLoading
  ]);

  return (
    <ErrorBoundary>
      <ProxyMonthly
        rowDataList={magazinesReport_proxyMonthlyData}
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

ProxyMonthlyContainer.propTypes = {
  GetMagazine_ProxyOrSpecialReports_insightiaListReq: PropTypes.func.isRequired,
  btnIdForExpandData: PropTypes.any.isRequired,
  handleSetBtnIdForExpandData: PropTypes.func.isRequired,
  handleUpdateData: PropTypes.func.isRequired,
  handleMagazineIsLoading: PropTypes.func.isRequired,
  handleViewPDFFileName: PropTypes.func.isRequired,
  isLoadingMagazinesReport: PropTypes.bool.isRequired,
  magazinesReport_proxyMonthlyData: PropTypes.any.isRequired,
  viewPDFFileName: PropTypes.string.isRequired
};

const selectProxyMonthlyData = (state) =>
  state.magazinesReport.magazinesReport_proxyMonthlyData;
const selectBtnIdForExpandData = (state) =>
  state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) =>
  state.magazinesReport.isLoadingMagazinesReport;

const mapStateToProps = (state) => ({
  viewPDFFileName: selectViewPDFFileName(state),
  magazinesReport_proxyMonthlyData: selectProxyMonthlyData(state),
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
  connect(mapStateToProps, mapDispatchToProps)(ProxyMonthlyContainer)
);
