import PropTypes from 'prop-types';
import React, { useState } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router';
import Page from '../../Page';
import {
  DOCS_INSIGHTIA_COM_REPORTS,
  INVESTOR_OVERVIEW,
  INVESTOR_ACTIVISM_OVERVIEW,
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

const bem = bn.create('activismFiling');

const ActivismFilings = ({
  location,
  activistFilings,
  isLoadingData,
  // Trial
  TrialStatus,
  TrialUserDisableDownload
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const data = {};

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

  const gridOptionsActivismFiling = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'event_date',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        minWidth: 110,
        maxWidth: query.print ? 110 : 150,
        type: ['dateColumn']
      },
      {
        headerName: 'Investor',
        field: 'name',
        minWidth: 300,
        maxWidth: query.print ? 300 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a rel="noopener noreferrer" class="text-secondary" 
                href="${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}">
                ${params.data.name}</a>`;
          return eDiv;
        }
      },
      {
        headerName: 'Filing Type',
        field: 'document_description',
        minWidth: 500,
        maxWidth: query.print ? 500 : null,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        autoHeight: true
      },
      {
        headerName: 'Link',
        field: 'file_name',
        minWidth: 125,
        maxWidth: 125,
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pt-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pt-1 pe-1 text-center',
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
              className='text-secondary'
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
      columns: [{}]
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    rowData: activistFilings.length > 0 && activistFilings.map((x) => ({
      ...x,
      TrialStatus: TrialStatus,
      event_date:
        x.event_date !== null && x.event_date !== undefined
          ? dateToNull(x.event_date, 'dd-mmm-yy', true)
          : ''
    })),
    rowSelection: 'multiple',
    domLayout: query.print ? null : 'normal',
    gridHeight: query.print ? null : '80vh'
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
    <Page key={1} className={bem.b('pt-3')}>
      <LightBoxPDFViewer
        handleCloseModelPopup={handlePDFModal}
        viewModalPopup={isPDFModal}
        handleSetBtnIdForExpandData={handlePDFModal}
        viewPDFFileName={`${DOCS_INSIGHTIA_COM_REPORTS}${pdfFileName}`}
        pdfTitle={pdfTitleName}
        IsShowCard
        isShowFooter
      />

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

      {isLoadingData ? (
        LOADING
      ) : (
        <div className='row fadeInAnimation' id='loadItem'>
          <div className='col-lg-12 pt-3'>
            {activistFilings.length > 0 ? (
              <Table
                gridOptions={gridOptionsActivismFiling}
                title='Activism Filings'
                pageTitle='Activism Filings'
                hideExcelDownloadIcon={TrialUserDisableDownload}
              />
            ) : (
              <Card title='Activism Filings'>{NORECORDS}</Card>
            )}
          </div>
        </div>
      )}
    </Page>
  );
};

ActivismFilings.propTypes = {
  TrialLog: PropTypes.bool,
  activistFilings: PropTypes.any,
  location: PropTypes.any.isRequired
};

ActivismFilings.defaultProps = {
  TrialLog: false,
  activistFilings: []
};

export default withRouter(React.memo(ActivismFilings));
