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
import {
  gridWidthValuesLrg,
  gridWidthValuesXLrg,
} from '../../../utils/table-tools-util';
import GlobalGovToolsPDFLightbox from '../../GeneralForm/GlobalGovTools_PDFLightbox';
import { DOCS_INSIGHTIA_COM_REPORTS } from '../../../constants/PathsConstant';
import Modal from '../../GeneralForm/Modal';
import FailedLink from '../../../pages/FailedLink';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { dateToNull } from '../../../utils/general-util';
import msgConst from '../../../constants/MessageConstans';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

/// ////
const FillingsSearchTool = (props) => {
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

    // otherwise open warning modal
    setIsModalPopupVisible(true);
    // set state for url to continue in modal
    setLinkFileName(file_name);
    return false;
  }

  const gridOption_lstToolsActivismFillingsData = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'act_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        filter: 'agSetColumnFilter',
        getQuickFilterText,
        ...gridWidthValuesXLrg,
        cellRendererFramework: (params) => (
          <div>
            <a
              className='text-secondary'
              href={`/investor/activism/overview?investor=${params.data.investor_id}`}
            >
              {params.data.act_name}
            </a>
          </div>
        ),
      },
      {
        headerName: 'Company',
        field: 'comp_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        filter: 'agSetColumnFilter',
        getQuickFilterText,
        ...gridWidthValuesXLrg,
        cellRendererFramework: (params) => (
          <div>
            <a
              className='text-secondary'
              href={`/company/activism/ActivismOverview?pid=${params.data.pid}`}
            >
              {params.data.comp_name}
            </a>
          </div>
        ),
      },
      {
        headerName: 'Description',
        field: 'document_description',
        getQuickFilterText,
        filter: 'agTextColumnFilter',
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: 'Document Type',
        field: 'document_type',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        chartDataType: 'category',
        getQuickFilterText,
        filter: 'agSetColumnFilter',
        minWidth: 300,
      },
      {
        headerName: 'Date',
        field: 'filing_date',
        getQuickFilterText,
        type: ['dateColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        enablePivot: true,
        minWidth: 160,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: 'dateFormat',
      },
      {
        headerName: 'Document',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        field: 'file_name',
        ...gridWidthValuesLrg,
        cellRendererFramework: (params) => {
          console.log('params.data.file_name', params.data.file_name);
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
    rowData:
      props.lstToolsActivismFillingsData.length > 0 &&
      props.lstToolsActivismFillingsData.map((x) => ({
        ...x,
        allowDownload: true,
        filing_date:
          x.filing_date !== null
            ? dateToNull(x.filing_date, 'dd-mmm-yy', true)
            : null,
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
          ) : props.lstToolsActivismFillingsData.length > 0 ? (
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

export default withRouter(React.memo(FillingsSearchTool));
