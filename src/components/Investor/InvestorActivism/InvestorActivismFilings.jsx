import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  INVESTOR_SEARCH,
  INVESTOR_OVERVIEW,
  DOCS_INSIGHTIA_COM_REPORTS,
  ACTIVISM_OVERVIEW
} from '../../../constants/PathsConstant';
import { LOADING, NORECORDS } from '../../../constants/MessageConstans';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';

import bn from '../../../utils/bemnames';
import LightBoxPDFViewer from '../../GeneralForm/LightBoxPDFViewer';
import { dateToNull } from '../../../utils/general-util';

import Modal from '../../GeneralForm/Modal';
import FailedLink from '../../../pages/FailedLink';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('InvestorFiling');

const InvestorActivismFilings = ({
  location,
  activistFilings,
  loadingData,
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

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  const gridOptionsInvestorFiling = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'event_date',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Company',
        field: 'name',
        minWidth: 200,
        maxWidth: query.print ? 200 : 500,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" target="_blank" rel="noopener noreferrer" href="${ACTIVISM_OVERVIEW}?pid=${params.data.PID !== undefined ? params.data.PID : null}">
            ${params.data.name}</a>`;
          return eDiv;
        }
      },
      {
        headerName: 'Filing Type',
        field: 'document_description',
        minWidth: query.print ? 630 : 720,
        maxWidth: query.print ? 630 : null,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Link',
        field: 'file_name',
        minWidth: 130,
        maxWidth: query.print ? 130 : 160,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => {
          if (
            params.data.file_name === null ||
            params.data.file_name === undefined
          ) {
            return null;
          }
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
              className='link-primary text-secondary'
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
        },
        {
          colId: 'name',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 100 },
    isfloatingFilter: false,
    rowData: activistFilings.map((x) => ({
      ...x,
      event_date:
        x.event_date !== undefined
          ? dateToNull(x.event_date, 'dd-mmm-yy', true)
          : '',
      TrialStatus
    })),
    rowSelection: query.print ? null : 'multiple',
    domLayout: query.print ? null : 'normal',
    gridHeight: query.print ? null : '80vh'
  };

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
        activistFilings
      }}
      key={1}
      className={bem.b('pt-4 pb-2')}
    >
      {!query.print && isModalPopupVisible && (
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
      {!query.print && (
        <ErrorBoundary hasCard>
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
      )}

      {loadingData ? (
        LOADING
      ) : (
        <div className='row fadeInAnimation pt-2' id='loadItem'>
          <div className='col-lg-12'>
            {activistFilings.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Investor Filings'>
                <Table
                  gridOptions={gridOptionsInvestorFiling}
                  hideExcelDownloadIcon={TrialUserDisableDownload}
                  title='Investor Filings'
                  pageTitle='Investor Filings'
                />
              </ErrorBoundary>
            ) : (
              <Card title='Investor Filings'>{NORECORDS}</Card>
            )}
          </div>
        </div>
      )}
    </Page>
  );
};

InvestorActivismFilings.propTypes = {
  TrialStatus: PropTypes.bool,
  activistFilings: PropTypes.array,
  location: PropTypes.any.isRequired,
  loadingData: PropTypes.bool.isRequired
};

InvestorActivismFilings.defaultProps = {
  TrialStatus: false,
  activistFilings: []
};

export default withRouter(React.memo(InvestorActivismFilings));
