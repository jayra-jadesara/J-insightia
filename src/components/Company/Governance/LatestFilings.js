import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  COMPANY_SEARCH,
  DOCS_INSIGHTIA_COM_REPORTS,
} from '../../../constants/PathsConstant';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import bn from '../../../utils/bemnames';
import LightBoxPDFViewer from '../../GeneralForm/LightBoxPDFViewer';
import Modal from '../../GeneralForm/Modal';
import FailedLink from '../../../pages/FailedLink';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import { NORECORDS } from '../../../constants/MessageConstans';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const LatestFilings = ({
  location,
  TrialLog,
  allowDownload,
  companyDirector503,
  companyDirector502,
  companyDirector507,
  proxyStatements,
  director10k,
  TrialUser,
  TrialUserDisableDownload,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bem = bn.create('latestFilings');

  // pdf viewer
  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const [linkFileName, setLinkFileName] = useState('');
  // modal
  const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);

  const handleCloseModelPopup = () => {
    setIsModalPopupVisible(false);
  };

  // handles failed link - when user clicks OK takes to failed URL, else closes modal
  const handleOKModelPopup = () => {
    window.open(linkFileName, '_blank');
  };

  const handlePDFModal = () => {
    setIsPDFModal(!isPDFModal);
  };

  async function checkLink(file_name) {
    let url = file_name;
    if (file_name.search('.pdf') > 0) {
      url = `${DOCS_INSIGHTIA_COM_REPORTS}${file_name}`;
    }
    const exists = await ifUrlExist(url);
    if (exists) {
      return true;
    }

    const existsHTTPS = await ifUrlExist(url.replace('http://', 'https://'));
    if (existsHTTPS) {
      return true;
    }
    // otherwise open warning modal
    setIsModalPopupVisible(true);
    // set state for url to continue in modal
    setLinkFileName(file_name);

    return false;
  }

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, [proxyStatements]);

  const gridOptionsDirector503 = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Year',
        field: 'YR',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 70,
        maxWidth: 70,
      },
      {
        headerName: 'Date',
        field: 'date_time',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: query.print ? 100 : 80,
        maxWidth: query.print ? 100 : 80,
      },
      {
        headerName: 'Document',
        field: 'url',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        minWidth: query.print ? 110 : 100,
        maxWidth: query.print ? 110 : 110,
        cellRendererFramework: (params) => {
          if (params.data.url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.url}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='link-primary text-secondary'
              onClick={async (e) => {
                if (!TrialUserDisableDownload && params.data.url !== null) {
                  e.preventDefault();
                  await checkLink(params.data.url).then((exists) => {
                    if (exists) {
                      window.open(params.data.url, '_blank');
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
      {
        headerName: 'Detail',
        field: 'amends',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 755 : 600,
        maxWidth: query.print ? 755 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => params.data.amends
      },
      {
        headerName: 'Details',
        field: 'amendsexcel',
        type: ['autoHeightTrue', 'hiddenField'],
        minWidth: query.print ? 755 : 600,
        maxWidth: query.print ? 755 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => params.data.amendsexcel
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: !query.print, pageSize: 6 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: companyDirector503.length > 0 && companyDirector503.map((x) => ({
      ...x,
      date_time: x.date_time !== null || x.date_time !== '' ? dateToNull(x.date_time, 'dd-mmm-yy', true) : '',
      amendsexcel: x.amends !== undefined && x.amends !== '' ? x.amends.replaceAll('</br>', '\n') : '',
      TrialUser,
      allowDownload
    })),
    selectedColumns: [
      'YR',
      'date_time',
      'url',
      'amendsexcel'
    ],
  };
  const gridOptionsDirector502 = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Year',
        field: 'YR',
        type: ['autoHeightTrue'],
        minWidth: 52,
        maxWidth: 52,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Date',
        field: 'date_time',
        type: ['autoHeightTrue'],
        minWidth: 75,
        maxWidth: 75,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Document',
        field: 'url',
        minWidth: 93,
        maxWidth: query.print ? 93 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center font-size-small',
        cellRendererFramework: (params) => {
          if (params.data.url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.url}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='link-primary text-secondary'
              onClick={(e) => {
                if (!TrialUserDisableDownload && params.data.url !== null) {
                  e.preventDefault();
                  checkLink(params.data.url).then((exists) => {
                    if (exists) {
                      window.open(params.data.url, '_blank');
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
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'activist_name',
          pinned: 'left',
        },
        {
          colId: 'company_id',
          pinned: 'right',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 6 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: companyDirector502.length > 0 && companyDirector502.map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      date_time:
        x.date_time !== undefined
          ? dateToNull(x.date_time, 'dd-mmm-yy', true)
          : '',
    })),
  };

  const gridOptionsProxyStatement = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Year',
        field: 'YR',
        type: ['autoHeightTrue'],
        minWidth: 52,
        maxWidth: 52,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Date',
        field: 'date_time',
        type: ['autoHeightTrue'],
        minWidth: 75,
        maxWidth: 75,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Document',
        field: 'url',
        minWidth: 93,
        maxWidth: query.print ? 93 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center font-size-small',
        cellRendererFramework: (params) => {
          if (params.data.url === null && params.data.url !== null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.url}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='link-primary text-secondary'
              onClick={(e) => {
                if (!TrialUserDisableDownload) {
                  e.preventDefault();
                  checkLink(params.data.url).then((exists) => {
                    if (exists) {
                      window.open(params.data.url, '_blank');
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
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'activist_name',
          pinned: 'left',
        },
        {
          colId: 'company_id',
          pinned: 'right',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 6 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: proxyStatements.length > 0 && proxyStatements.map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      date_time: x.date_time !== undefined
          ? dateToNull(x.date_time, 'dd-mmm-yy', true)
          : '',
    })),
  };

  const gridOptionsDirector507 = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Year',
        field: 'YR',
        type: ['autoHeightTrue'],
        minWidth: 52,
        maxWidth: 52,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Date',
        field: 'date_time',
        type: ['autoHeightTrue'],
        minWidth: 75,
        maxWidth: 75,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Document',
        field: 'url',
        minWidth: 93,
        maxWidth: query.print ? 93 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center font-size-small',
        cellRendererFramework: (params) => {
          if (params.data.url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.url}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='link-primary text-secondary'
              onClick={(e) => {
                if (!TrialUserDisableDownload && params.data.url !== null) {
                  e.preventDefault();
                  checkLink(params.data.url).then((exists) => {
                    if (exists) {
                      window.open(params.data.url, '_blank');
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
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'activist_name',
          pinned: 'left',
        },
        {
          colId: 'company_id',
          pinned: 'right',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 6 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: companyDirector507.length > 0 && companyDirector507.map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      date_time:
        x.date_time !== undefined
          ? dateToNull(x.date_time, 'dd-mmm-yy', true)
          : '',
    })),
  };

  const gridOptionsDirector10k = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Year',
        field: 'YR',
        type: ['autoHeightTrue'],
        minWidth: 52,
        maxWidth: 52,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Date',
        field: 'date_time',
        type: ['autoHeightTrue'],
        minWidth: 75,
        maxWidth: 75,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Document',
        field: 'url',
        minWidth: 93,
        maxWidth: query.print ? 93 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center font-size-small',
        cellRendererFramework: (params) => {
          if (params.data.url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.url}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='link-primary text-secondary'
              onClick={(e) => {
                if (!TrialUserDisableDownload && params.data.url !== null) {
                  e.preventDefault();
                  checkLink(params.data.url).then((exists) => {
                    if (exists) {
                      window.open(params.data.url, '_blank');
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
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'activist_name',
          pinned: 'left',
        },
        {
          colId: 'company_id',
          pinned: 'right',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 6 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: director10k.length > 0 && director10k.map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      date_time:
        x.date_time !== undefined
          ? dateToNull(x.date_time, 'dd-mmm-yy', true)
          : '',
    })),
  };

  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

    setTimeout(() => {
      const doc = document.getElementById('loadItem');
      const loadedItem = document.createElement('div');
      doc && doc.appendChild(loadedItem);
      loadedItem.setAttribute('id', 'loadedItem');
    }, 1000);

  return (
    <Page
      {...{
        location,
        TrialLog,
        allowDownload,
      }}
      key={1}
      className={bem.b('pt-3')}
    >
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
      <ErrorBoundary hasCard cardtitle={pdfTitleName}>
        <LightBoxPDFViewer
          handleCloseModelPopup={handlePDFModal}
          viewModalPopup={isPDFModal}
          handleSetBtnIdForExpandData={handlePDFModal}
          viewPDFFileName={`${DOCS_INSIGHTIA_COM_REPORTS}${pdfFileName}`}
          pdfTitle={pdfTitleName}
          IsShowCard
          isShowFooter
        />
      </ErrorBoundary>

      <div className='row pt-2' id='loadItem'>
        <div className='col-12'>
          {companyDirector503.length > 0 ? (
            <ErrorBoundary hasCard cardtitle='Item 5.03: Amendments to Articles of Incorporation or Bylaws; Change in Fiscal Year'>
              <Table
                gridOptions={gridOptionsDirector503}
                title='Item 5.03: Amendments to Articles of Incorporation or Bylaws; Change in Fiscal Year'
                pageTitle='Item 5.03: Amendments to Articles of Incorporation or Bylaws; Change in Fiscal Year'
                hideExcelDownloadIcon={TrialUserDisableDownload}
              />
            </ErrorBoundary>
          ) : (
            <Card title='Item 5.03: Amendments to Articles of Incorporation or Bylaws; Change in Fiscal Year'>
              {NORECORDS}
            </Card>
          )}
        </div>
      </div>

      <div className='row pdfpagebreak pt-2'>
        <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 CardFullTitle cardHeightSamePDF'>
          {companyDirector502.length > 0 ? (
            <ErrorBoundary hasCard cardtitle='Item 5.02: Departure of Directors or Certain Officers; Election of Directors; Appointment of certain Officers: Compensatory Arrangements of Certain Officers'>
              <Table
                gridOptions={gridOptionsDirector502}
                title='Item 5.02: Departure of Directors or Certain Officers; Election of Directors; Appointment of certain Officers: Compensatory Arrangements of Certain Officers'
                pageTitle='Item 5.02: Departure of Directors or Certain Officers; Election of Directors; Appointment of certain Officers: Compensatory Arrangements of Certain Officers'
                hideExcelDownloadIcon={TrialUserDisableDownload}
              />
            </ErrorBoundary>
          ) : (
            <Card title='Item 5.02: Departure of Directors or Certain Officers; Election of Directors; Appointment of certain Officers: Compensatory Arrangements of Certain Officers'>
              {NORECORDS}
            </Card>
          )}
        </div>

        <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 CardFullTitle cardHeightSamePDF'>
          {proxyStatements.length > 0 ? (
            <ErrorBoundary hasCard cardtitle='Proxy Statements'>
              <Table
                gridOptions={gridOptionsProxyStatement}
                title='Proxy Statements'
                pageTitle='Proxy Statements'
                hideExcelDownloadIcon={TrialUserDisableDownload}
              />
            </ErrorBoundary>
          ) : (
            <Card title='Proxy Statements'>{NORECORDS}</Card>
          )}
        </div>

        <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 CardFullTitle cardHeightSamePDF'>
          {companyDirector507.length > 0 ? (
            <ErrorBoundary hasCard cardtitle='Item 5.07: Submission of Matters to a Vote of Security Holders'>
              <Table
                gridOptions={gridOptionsDirector507}
                title='Item 5.07: Submission of Matters to a Vote of Security Holders'
                pageTitle='Item 5.07: Submission of Matters to a Vote of Security Holders'
                hideExcelDownloadIcon={TrialUserDisableDownload}
              />
            </ErrorBoundary>
          ) : (
            <Card title='Item 5.07: Submission of Matters to a Vote of Security Holders'>
              {NORECORDS}
            </Card>
          )}
        </div>

        <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 CardFullTitle cardHeightSamePDF'>
          {director10k.length > 0 ? (
            <ErrorBoundary hasCard cardtitle='Item 10K: Annual Reports'>
              <Table
                gridOptions={gridOptionsDirector10k}
                title='Item 10K: Annual Reports'
                pageTitle='Item 10K: Annual Reports'
                hideExcelDownloadIcon={TrialUserDisableDownload}
              />
            </ErrorBoundary>
          ) : (
            <Card title='Item 10K: Annual Reports'>{NORECORDS}</Card>
          )}
        </div>
      </div>
    </Page>
  );
};

LatestFilings.propTypes = {
  TrialLog: PropTypes.bool,
  allowDownload: PropTypes.bool,
  companyDirector502: PropTypes.array,
  companyDirector503: PropTypes.array,
  companyDirector507: PropTypes.array,
  director10k: PropTypes.array,
  location: PropTypes.object,
  proxyStatements: PropTypes.array,
};

LatestFilings.defaultProps = {
  TrialLog: false,
  allowDownload: false,
  companyDirector502: [],
  companyDirector503: [],
  companyDirector507: [],
  director10k: [],
  location: {},
  proxyStatements: [],
};

export default withRouter(React.memo(LatestFilings));
