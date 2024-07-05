import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  INVESTOR_SEARCH,
  DOCS_INSIGHTIA_COM_REPORTS,
  QUERY_PID,
  COMPANY_OVERVIEW
} from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import bn from '../../../utils/bemnames';
import LightBoxPDFViewer from '../../GeneralForm/LightBoxPDFViewer';
import Modal from '../../GeneralForm/Modal';
import FailedLink from '../../../pages/FailedLink';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('InvestorFiling');

const InvestorActivistShortsFilings = ({
  location,
  activistFilingsAiS,
  TrialStatus,
  TrialUserDisableDownload,
  loadingData
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
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
    window.open(linkFileName, '_blank').focus();
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
  }, [activistFilingsAiS]);

  function useKeypress(key, action) {
    useEffect(() => {
      async function onKeyup(e) {
        if (e.key === key) await action(false);
      }
      window.addEventListener('keyup', onKeyup);
      return () => window.removeEventListener('keyup', onKeyup);
    }, [action, key]);
  }
  useKeypress('Enter', setIsPDFModal);

  const gridOptionsInvestorShortsFiling = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'event_date',
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Company',
        field: 'name',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 400 : 250,
        maxWidth: query.print ? 400 : 300,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" rel="noopener noreferrer" 
                            href="${COMPANY_OVERVIEW}${QUERY_PID}${
            params.data.PID !== null ? params.data.PID : '#'
          }">
                              ${params.data.name}
                            </a>`;
          return eDiv;
        }
      },
      {
        headerName: 'Filing Type',
        field: 'document_description',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 400,
        maxWidth: query.print ? 400 : null
      },
      {
        headerName: 'Link',
        field: 'file_name',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center',
        minWidth: query.print ? 135 : 80,
        maxWidth: query.print ? 135 : 80,
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
              href={params.data.file_name}
              target='_blank'
              rel='noopener noreferrer'
              className='text-secondary'
              onClick={(e) => {
                e.preventDefault();
                checkLink(params.data.file_name).then((exists) => {
                  if (exists) {
                    window.open(params.data.file_name, '_blank').focus();
                  }
                });
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
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    rowData: activistFilingsAiS.map((x) => ({
      ...x,
      TrialStatus: TrialStatus,
      allowDownload: false,
      event_date:
        x.event_date !== undefined
          ? dateToNull(x.event_date, 'dd-mmm-yy', true)
          : ''
    })),
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh'
  };

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  React.useEffect(() => {
    if (!loadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        loadedItem.textContent = 'Loaded';
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [loadingData]);

  return (
    <Page
      {...{
        location,
        TrialStatus,
        activistFilingsAiS
      }}
      key={1}
      className={bem.b('fadeInAnimation pt-4 pb-2')}
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
      <LightBoxPDFViewer
        handleCloseModelPopup={handlePDFModal}
        viewModalPopup={isPDFModal}
        handleSetBtnIdForExpandData={handlePDFModal}
        viewPDFFileName={`${DOCS_INSIGHTIA_COM_REPORTS}${pdfFileName}`}
        pdfTitle={pdfTitleName}
        IsShowCard
        isShowFooter
      />

      {loadingData ? (
        LOADING
      ) : (
        <>
          <div className='row pt-2' id='loadItem'>
            <div className='col-md-12 col-12'>
              {activistFilingsAiS.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Investor Activist Shorts Filings'>
                  <Table
                    gridOptions={gridOptionsInvestorShortsFiling}
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                    title='Investor Activist Shorts Filings'
                    pageTitle='Investor Activist Shorts Filings'
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Investor Activist Shorts Filings'>
                  {NORECORDS}
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

InvestorActivistShortsFilings.propTypes = {
  TrialStatus: PropTypes.bool,
  activistFilingsAiS: PropTypes.array,
  location: PropTypes.any.isRequired,
  loadingData: PropTypes.any.isRequired
};

InvestorActivistShortsFilings.defaultProps = {
  TrialStatus: false,
  activistFilingsAiS: []
};

export default withRouter(React.memo(InvestorActivistShortsFilings));
