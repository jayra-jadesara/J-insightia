import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import prodConst from '../../constants/ProductConstants';
import VotingSpecial from '../../components/MagazinesReport/VotingReport/VotingSpecial';
import {
  getMagazinesReportListReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
} from './MagazinesReportSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const VotingSpecialContainer = ({
  getMagazinesReportListReq,
  magazinesReport_voting_specialData,
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
      article_type_list: prodConst.SPECIAL_ARTICLE_TYPE,
      location: location.pathname
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [getMagazinesReportListReq, handleMagazineIsLoading]);

  return (
    <ErrorBoundary>
      <VotingSpecial
        rowDataList={magazinesReport_voting_specialData}
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

VotingSpecialContainer.propTypes = {
  btnIdForExpandData: PropTypes.any.isRequired,
  getMagazinesReportListReq: PropTypes.func.isRequired,
  handleSetBtnIdForExpandData: PropTypes.func.isRequired,
  handleUpdateData: PropTypes.func.isRequired,
  handleMagazineIsLoading: PropTypes.func.isRequired,
  handleViewPDFFileName: PropTypes.func.isRequired,
  isLoadingMagazinesReport: PropTypes.bool.isRequired,
  magazinesReport_voting_specialData: PropTypes.any.isRequired,
  viewPDFFileName: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

const selectVotingSpecialReportsData = (state) =>
  state.magazinesReport.magazinesReport_voting_specialData;
const selectBtnIdForExpandData = (state) =>
  state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) =>
  state.magazinesReport.isLoadingMagazinesReport;

const mapStateToProps = (state) => ({
  viewPDFFileName: selectViewPDFFileName(state),
  magazinesReport_voting_specialData: selectVotingSpecialReportsData(state),
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
  connect(mapStateToProps, mapDispatchToProps)(VotingSpecialContainer)
);
