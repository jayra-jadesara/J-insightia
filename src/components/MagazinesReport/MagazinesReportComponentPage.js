import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Table from '../GeneralForm/Table';
import PdfViewer from '../GeneralForm/PdfViewer';
import { MagazinesReportComponentGridOption } from './MagazinesReportComponentGridOption';
import msgConst from '../../constants/MessageConstans';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';

const MagazinesReportComponentPage = (props) => {
  let gridOptions;
  if (props.rowDataList.length > 0 && !props.isLoading) {
    gridOptions = MagazinesReportComponentGridOption(props);
  }
  return (
    <ErrorBoundary>
    <div key={1} className='row'>
      {props.isLoading && <div className='ps-3'>{msgConst.LOADING}</div>}
      {!props.isLoading && (
        <div>
          {props.rowDataList.length > 0 ? (
            <div className='col-md-12 col-sm-12'>
              <ErrorBoundary>
              <Table
                hideExcelDownloadIcon
                IsShowCard={false}
                title=''
                smalltitle=''
                gridOptions={gridOptions}
              />
              </ErrorBoundary>
            </div>
          ) : (
            <span className='text-primary ps-4'>{msgConst.NORECORDS}</span>
          )}

          {props.btnIdForExpandData && props.rowDataList.length > 0 && !props.hidePDFBox && (
            <div className='row'>
              <ErrorBoundary hasCard cardtitle='View PDF'>
              <PdfViewer
                IsShowCard
                title='View PDF'
                smalltitle=''
                fileUrl={props.viewPDFFileName}
                isOpen={props.btnIdForExpandData}
                clickEvent={props.handleSetBtnIdForExpandData}
              />
              </ErrorBoundary>
            </div>
          )}
        </div>
      )}
    </div>
    </ErrorBoundary>
  );
};

MagazinesReportComponentPage.propTypes = {
  btnIdForExpandData: PropTypes.bool,
  handleSetBtnIdForExpandData: PropTypes.func,
  isLoading: PropTypes.bool,
  rowDataList: PropTypes.array,
  viewPDFFileName: PropTypes.string
};

MagazinesReportComponentPage.defaultProps = {
  btnIdForExpandData: false,
  handleSetBtnIdForExpandData: () => {},
  isLoading: false,
  rowDataList: [],
  viewPDFFileName: ''
};

export default withRouter(MagazinesReportComponentPage);
