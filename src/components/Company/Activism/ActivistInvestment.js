import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import FailedLink from '../../../pages/FailedLink';
import pathConst from '../../../constants/PathsConstant';
import numConst from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import Modal from '../../GeneralForm/Modal';
import {
  numberToCommaString,
  setCellStyleFinancial,
} from '../../../utils/table-tools-util';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { dateToNull } from '../../../utils/general-util';
import { filters, getQuickFilterText } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const ActivistInvestment = ({
  location,
  lstActivistInvestors,
  lstActivistNotifiedHoldings,
  isLoadingData,
  // Trial
  TrialStatus,
  TrialUserDisableDownload,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  // pdf viewer
  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const [linkFileName, setLinkFileName] = useState('');
  // modal
  const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);

  const initialisePDFModal = (fileName, desc) => {
    setIsPDFModal(true);
    setPDFFileName(fileName);
    setPDFTitleName(desc);
  };
  const handlePDFModal = () => {
    setIsPDFModal(!isPDFModal);
  };
  const handleCloseModelPopup = () => {
    setIsModalPopupVisible(false);
  };

  // handles failed link - when user clicks OK takes to failed URL, else closes modal
  const handleOKModelPopup = () => {
    window.open(linkFileName, '_blank').focus();
  };

  async function checkLink(file_name) {
    let url = file_name;
    if (file_name.search('.pdf') > 0) {
      url = `${pathConst.DOCS_INSIGHTIA_COM_REPORTS}${file_name}`;
    }
    const exists = await ifUrlExist(url);
    if (exists) {
      return true;
    }

    // otherwise open warning modal
    setIsModalPopupVisible(true);
    // set state for url to continue in modal
    setLinkFileName(file_name);
    return false;
  }

  const gridOptionsActivistInvestor = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'name',
        minWidth: query.print ? 230 : 220,
        maxWidth: query.print ? 230 : null,
        type: ['setColumn', 'autoHeightTrue', 'enableRowGroup'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a rel="noopener noreferrer" class="text-secondary" 
              href="${pathConst.INVESTOR_OVERVIEW}${pathConst.QUERY_INVESTOR}${params.data.investor_id}">
              ${params.data.name}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Date Invested',
        field: 'date_first_invested',
        minWidth: 90,
        maxWidth: query.print ? 90 : 120,
        type: ['dateColumn', 'enableRowGroup'],
        getQuickFilterText,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Shares Held',
        field: 'shares_held',
        minWidth: 100,
        maxWidth: query.print ? 100 : null,
        filter: 'agTextColumnFilter',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: 'Value (mn)',
        field: 'holding_value',
        minWidth: 70,
        maxWidth: query.print ? 70 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: '% Holding',
        field: 'pcent_held',
        minWidth: 80,
        maxWidth: query.print ? 80 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Price on Announce',
        field: 'price_invested',
        minWidth: 70,
        maxWidth: query.print ? 70 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Latest Price',
        field: 'current_price',
        minWidth: 70,
        maxWidth: query.print ? 70 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Total Follower Return (%)',
        field: 'price_change',
        minWidth: 70,
        maxWidth: query.print ? 70 : 150,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        filter: 'agTextColumnFilter',
        cellRendererFramework: (params) => params.data.price_change,
        cellClassRules: {
          redFont: (params) => params.data.price_change < 0,
          greenFont: (params) => params.data.price_change > 0,
        },
        cellStyle: (params) => setCellStyleFinancial(params.data.price_change),
      },
      {
        headerName: 'S&P 500 Total Follower Return (%)',
        field: 'index_change',
        minWidth: 70,
        maxWidth: query.print ? 70 : 200,
        filter: 'agTextColumnFilter',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRendererFramework: (params) => params.data.index_change,
        cellClassRules: {
          redFont: (params) => params.data.index_change < 0,
          greenFont: (params) => params.data.index_change > 0,
        },
        cellStyle: (params) => setCellStyleFinancial(params.data.index_change),
      },
      {
        headerName: 'Price Change Since Exit (%)',
        field: 'price_change_since_exit',
        filter: 'agTextColumnFilter',
        minWidth: 80,
        maxWidth: query.print ? 80 : null,
        getQuickFilterText,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRendererFramework: (params) => params.data.price_change_since_exit,
        cellClassRules: {
          redFont: (params) => params.data.price_change_since_exit < 0,
          greenFont: (params) => params.data.price_change_since_exit > 0,
        },
        cellStyle: (params) =>
          setCellStyleFinancial(params.data.price_change_since_exit),
      },
      {
        headerName: 'Exited/Current',
        field: 'current',
        minWidth: query.print ? 105 : 80,
        maxWidth: query.print ? 105 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['setColumn', 'enableRowGroup'],
        getQuickFilterText,
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: !query.print,
    headerHeight: 70,
    pinColumns: {
      isPinOption: false,
    },
    rowData: lstActivistInvestors.map((x) => ({
      ...x,
      price_change_since_exit: x.price_change_since_exit
        ? x.price_change_since_exit.toFixed(1)
        : '',
      index_change: x.index_change ? x.index_change.toFixed(1) : '',
      price_change: x.price_change ? x.price_change.toFixed(1) : '',
      exit_price: x.exit_price ? x.exit_price.toFixed(1) : '',
      price_invested: x.price_invested ? x.price_invested.toFixed(2) : '',
      pcent_held: x.pcent_held ? `${x.pcent_held.toFixed(2)}%` : '',
      current_price: x.current_price ? x.current_price.toFixed(2) : '',
      holding_value: x.holding_value ? x.holding_value.toFixed(1) : '',
      shares_held: x.shares_held ? numberToCommaString(x.shares_held) : '',
      current: x.current ? 'Current' : 'Exited',
      TrialStatus: TrialStatus,
      date_first_invested:
        x.date_first_invested !== null && x.date_first_invested !== undefined
          ? dateToNull(x.date_first_invested, 'dd-mmm-yy', true)
          : '',
    })),
  };

  const gridOptionsNotifiedHolding = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'name',
        getQuickFilterText,
        minWidth: 380,
        maxWidth: query.print ? 380 : null,
        type: ['setColumn', 'autoHeightTrue', 'enableRowGroup'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Date',
        field: 'date_notified',
        getQuickFilterText,
        minWidth: 100,
        maxWidth: query.print ? 100 : null,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Source',
        field: 'source',
        type: ['setColumn', 'enableRowGroup', 'autoHeightTrue'],
        getQuickFilterText,
        minWidth: 100,
        maxWidth: 100,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: 'Shares Held',
        field: 'shares_held',
        filter: 'agTextColumnFilter',
        minWidth: 200,
        maxWidth: 200,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: '% Holding',
        field: 'pcent_held',
        filter: 'agTextColumnFilter',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: 'Report',
        field: 'Report',
        minWidth: 135,
        maxWidth: query.print ? 135 : 150,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pt-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pt-1 pe-1 text-center',
        cellRendererFramework: (params) => {
          if (params.data.Report === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.Report}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='text-secondary'
              onClick={(e) => {
                if (!TrialUserDisableDownload) {
                  e.preventDefault();
                  checkLink(params.data.Report).then((exists) => {
                    if (exists) {
                      window.open(params.data.Report, '_blank').focus();
                    }
                  });
                }
              }}
            >
              View
            </a>
          );
        },
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [{}],
    },
    paggination: { isPagging: false, pageSize: 20 },
    columnTypes: filters,
    isfloatingFilter: !query.print,
    rowData: lstActivistNotifiedHoldings.map((x) => ({
      ...x,
      pcent_held: x.pcent_held ? `${x.pcent_held.toFixed(2)}%` : '',
      shares_held: x.shares_held ? numberToCommaString(x.shares_held) : '',
      date_notified:
        x.date_notified !== null && x.date_notified !== undefined
          ? dateToNull(x.date_notified, 'dd-mmm-yy', true)
          : '',
      TrialStatus: TrialStatus,
    })),
  };

  React.useEffect(() => {
    if (!isLoadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoadingData]);

  return (
    <Page key={1} className='cr-ActivistInvestment pt-3'>
      {isLoadingData ? (
        msgConst.LOADING
      ) : (
        <>
          {isModalPopupVisible && (
            <Modal
              show
              isCancelButtonFooter
              handleClose={handleCloseModelPopup}
              handleOK={handleOKModelPopup}
              title='Warning'
              isInfo
            >
              <FailedLink />
            </Modal>
          )}

          <div className='row' id='loadItem'>
            <div className='col-lg-12'>
              {lstActivistInvestors.length > numConst.ARRAY_HAS_NO_LENGTH ? (
                <ErrorBoundary hasCard cardtitle='Activist Investor'>
                  <Table
                    gridOptions={gridOptionsActivistInvestor}
                    title='Activist Investors'
                    pageTitle='Activist Investors'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Activist Investors'>{msgConst.NORECORDS}</Card>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              {lstActivistNotifiedHoldings.length >
              numConst.ARRAY_HAS_NO_LENGTH ? (
                <ErrorBoundary hasCard cardtitle='Notified Holdings'>
                  <Table
                    gridOptions={gridOptionsNotifiedHolding}
                    title='Notified Holdings'
                    pageTitle='Notified Holdings'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Notified Holdings'>{msgConst.NORECORDS}</Card>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

ActivistInvestment.propTypes = {
  location: PropTypes.any.isRequired,
};

ActivistInvestment.defaultProps = {};

export default withRouter(React.memo(ActivistInvestment));
