import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../GeneralForm/Table';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
  loadingRenderer,
} from '../../../utils/AgGridFunctions';
import GlobalGovToolsPDFLightbox from '../../GeneralForm/GlobalGovTools_PDFLightbox';
import {
  DOCS_INSIGHTIA_COM_REPORTS,
  ACTIVISTSHORTS_OVERVIEW,
  INVESTOR_ACTIVIST_SHORT_OVERVIEW,
  QUERY_PID,
  QUERY_INVESTOR,
} from '../../../constants/PathsConstant';
import Modal from '../../GeneralForm/Modal';
import FailedLink from '../../../pages/FailedLink';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { dateToNull } from '../../../utils/general-util';
import msgConst from '../../../constants/MessageConstans';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const NotifiedShortPositionDataTool = (props) => {
  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const [linkFileName, setLinkFileName] = useState('');
  // modal
  const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);

  const handlePDFModal = () => {
    setIsPDFModal(!isPDFModal);
  };

  // handles failed link - when user clicks OK takes to failed URL, else closes modal
  const handleOKModelPopup = () => {
    window.open(linkFileName, '_blank').focus();
  };

  const handleCloseModelPopup = () => {
    setIsModalPopupVisible(false);
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

    setIsModalPopupVisible(true);
    setLinkFileName(file_name);
    return false;
  }

  const gridOption_lstToolsActivismFillingsData = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'act_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        filter: 'agSetColumnFilter',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        minWidth: 200,
        maxWidth: null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (
            params.data.investor_id !== '' &&
            params.data.investor_id !== null
          ) {
            eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer"
            href="${INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}">
            ${params.data.act_name}
          </a>`;
          } else {
            eDiv.innerHTML += '<span>-</span>';
          }
          return eDiv;
        },
      },
      {
        headerName: 'Company',
        field: 'comp_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        filter: 'agSetColumnFilter',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        minWidth: 200,
        maxWidth: null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.data.pid !== '' && params.data.pid !== null) {
            eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer"
            href="${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.pid}">
            ${params.data.comp_name}
          </a>`;
          } else {
            eDiv.innerHTML += '<span>-</span>';
          }
          return eDiv;
        },
      },
      {
        headerName: 'Description',
        field: 'document_description',
        minWidth: 200,
        maxWidth: 300,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        cellRenderer1: (params) => {
          const eDiv = document.createElement('div');
          if (
            params.data.document_description !== '' &&
            params.data.document_description.includes('13F Filing')
          ) {
            eDiv.innerHTML += '<span>Form</span>';
          } else {
            eDiv.innerHTML += '<span>-</span>';
          }
          return eDiv;
        },
      },
      {
        headerName: 'Document Type',
        field: 'document_type',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        chartDataType: 'category',
        getQuickFilterText,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        filter: 'agSetColumnFilter',
        minWidth: 250,
        maxWidth: 300,
      },
      {
        headerName: 'Date',
        field: 'filing_date',
        type: ['dateColumn', 'enableRowGroup', 'autoHeightTrue'],
        getQuickFilterText,
        cellClass: ['ws-normal-lh24 ps-1 pe-1 text-center', 'dateFormat'],
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'Document',
        field: 'file_name',
        minWidth: 110,
        maxWidth: 110,
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center ',
        cellRendererFramework: (params) => {
          if (params.data.file_name === null) return null;
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
        },
      },
      {
        headerName: 'Company HQ',
        field: 'company_HQ',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 140,
        maxWidth: 160,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Exchange',
        field: 'Exchange',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 160,
        maxWidth: 200,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Sector',
        field: 'sector',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 160,
        maxWidth: 200,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'industry',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 200,
        maxWidth: 260,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap ($mn)',
        field: 'market_cap_USD',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 140,
        maxWidth: 180,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap Category',
        field: 'Market_cap_Category',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 180,
        maxWidth: 220,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    pivotMode: false,
    rowData: props.lstFillingSearchData.map((x) => ({
      ...x,
      allowDownload: true,
      filing_date: dateToNull(x.filing_date, 'dd-mmm-yy', true),
    })),
    components: loadingRenderer,
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    quickSearchFilter: true,
    aggFuncs: {
      'count(Dist)': distinctCounts,
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
    suppressFieldDotNotation: true,
  };

  return (
    <Page {...props} key={1}>
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
      <div className='row card pt-3'>
        <div className='col-12'>
          {props.isLoadingFillingData ? (
            <div className='vh-100'>
              <div className='h-50'>
                <ProgressBar
                  avgElapsedTime={props.procedureRunningEstimateTime}
                />
              </div>
            </div>
          ) : props.lstFillingSearchData.length > 0 ? (
            <div className='row'>
              <Table
                IsShowCard={false}
                title='Filings Search Tool'
                smalltitle=''
                gridOptions={gridOption_lstToolsActivismFillingsData}
              />
            </div>
          ) : (
            msgConst.SUPPORT_TEAM_EMAIL_MSG
          )}
          <GlobalGovToolsPDFLightbox
            handleCloseModelPopup={handlePDFModal}
            viewModalPopup={isPDFModal}
            handleSetBtnIdForExpandData={handlePDFModal}
            viewPDFFileName={pdfFileName}
            pdfTitle={pdfTitleName}
            IsShowCard
            isShowFooter
          />
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(NotifiedShortPositionDataTool));
