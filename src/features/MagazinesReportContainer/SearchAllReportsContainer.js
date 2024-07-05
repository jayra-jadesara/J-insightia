import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchAllReports from '../../components/MagazinesReport/SearchAllReports/SearchAllReports';
import {
  searchAiMMagazineTextReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
} from './MagazinesReportSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const SearchAllReportsContainer = ({
  location,
  children,
  searchAiMMagazineTextReq,
  magazinesReport_searchResults,
  btnIdForExpandData,
  handleSetBtnIdForExpandData,
  viewPDFFileName,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading,
  isLoadingMagazinesReport
}) => (
  <ErrorBoundary>
    <SearchAllReports
      children={children}
      rowDataList={magazinesReport_searchResults}
      handleSearchResults={searchAiMMagazineTextReq}
      btnIdForExpandData={btnIdForExpandData}
      handleSetBtnIdForExpandData={handleSetBtnIdForExpandData}
      handleViewPDFFileName={handleViewPDFFileName}
      viewPDFFileName={viewPDFFileName}
      handleUpdateData={handleUpdateData}
      isLoading={isLoadingMagazinesReport}
      handleMagazineIsLoading={handleMagazineIsLoading}
      location={location}
    />
  </ErrorBoundary>
);

const selectSearchResults = (state) =>
  state.magazinesReport.magazinesReport_searchResults;
const selectBtnIdForExpandData = (state) =>
  state.magazinesReport.btnIdForExpandData;
const selectViewPDFFileName = (state) => state.magazinesReport.viewPDFFileName;
const selectIsLoading = (state) =>
  state.magazinesReport.isLoadingMagazinesReport;

const mapStateToProps = (state) => ({
  magazinesReport_searchResults: selectSearchResults(state),
  viewPDFFileName: selectViewPDFFileName(state),
  btnIdForExpandData: selectBtnIdForExpandData(state),
  isLoadingMagazinesReport: selectIsLoading(state)
});
const mapDispatchToProps = {
  searchAiMMagazineTextReq,
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleUpdateData,
  handleMagazineIsLoading
};

SearchAllReportsContainer.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  searchAiMMagazineTextReq: PropTypes.func.isRequired,
  magazinesReport_searchResults: PropTypes.array.isRequired
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchAllReportsContainer)
);
