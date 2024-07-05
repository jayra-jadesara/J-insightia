import React, { useEffect, useState } from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Page from '../../Page';
import {
  INVESTOR_OVERVIEW,
  DOCS_INSIGHTIA_COM_REPORTS,
  QUERY_INVESTOR
} from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import Table from '../../GeneralForm/Table';
import bn from '../../../utils/bemnames';
import LightBoxPDFViewer from '../../GeneralForm/LightBoxPDFViewer';
import Card from '../../GeneralForm/Card';
import { dateToNull } from '../../../utils/general-util';
import Modal from '../../GeneralForm/Modal';
import FailedLink from '../../../pages/FailedLink';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('activismFiling');
const ActivistShortsFilings = ({
  location,
  activistFilings,
  TrialLog,
  isLoading,
  TrialStatus,
  TrialUserDisableDownload
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  // pdf viewer
  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const [linkFileName, setLinkFileName] = useState('');
  // modal
  const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);

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
      url = `${DOCS_INSIGHTIA_COM_REPORTS}${file_name}`;
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

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, [activistFilings]);

  const gridOptionsActivistShortsFiling = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'event_date',
        minWidth: 100,
        maxWidth: 100,
        type: ['dateColumn'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center'
      },
      {
        headerName: 'Investor',
        field: 'name',
        minWidth: query.print ? 250 : 200,
        maxWidth: query.print ? 250 : null,
        autoHeight: true,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class='text-secondary' 
                            href='${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}'>
                              ${params.data.name}
                            </a>`;
          return eDiv;
        }
      },
      {
        headerName: 'Filing Type',
        field: 'document_description',
        minWidth: query.print ? 583 : 700,
        maxWidth: query.print ? 583 : null,
        autoHeight: true,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Link',
        field: 'file_name',
        minWidth: 105,
        maxWidth: query.print ? 105 : 150,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        cellRendererFramework: (params) => {
          if (params.data.file_name === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.file_name}
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
                  checkLink(params.data.file_name).then((exists) => {
                    if (exists) {
                      window.open(params.data.file_name, '_blank');
                    }
                  });
                }
              }}
            >
              View
            </a>
          );
        }
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'date',
          pinned: 'left'
        },
        {
          colId: 'name',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    rowData: activistFilings.map((x) => ({
      ...x,
      event_date:
        x.event_date !== null
          ? dateToNull(x.event_date, 'dd-mmm-yy', true)
          : '',
      TrialStatus: TrialStatus
    }))
  };

  React.useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        loadedItem.textContent = '';
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoading]);

  return (
    <Page
      {...{
        location,
        TrialLog,
        activistFilings
      }}
      key={1}
      className={bem.b('pt-3 fadeInAnimation')}
    >
      {isLoading ? (
        LOADING
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

          <LightBoxPDFViewer
            handleCloseModelPopup={handlePDFModal}
            viewModalPopup={isPDFModal}
            handleSetBtnIdForExpandData={handlePDFModal}
            viewPDFFileName={`${DOCS_INSIGHTIA_COM_REPORTS}${pdfFileName}`}
            pdfTitle={pdfTitleName}
            IsShowCard
            isShowFooter
          />

          <div className='row pt-2' id='loadItem'>
            <div className='col-lg-12'>
              {activistFilings.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Filings'>
                  <Table
                    gridOptions={gridOptionsActivistShortsFiling}
                    title='Filings'
                    pageTitle='Activism Filing'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Filings'>{NORECORDS}</Card>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

ActivistShortsFilings.propTypes = {
  TrialLog: PropTypes.bool,
  activistFilings: PropTypes.array,
  location: PropTypes.any.isRequired,
  isLoading: PropTypes.any.isRequired
};

ActivistShortsFilings.defaultProps = {
  TrialLog: false,
  activistFilings: []
};

export default withRouter(React.memo(ActivistShortsFilings));
