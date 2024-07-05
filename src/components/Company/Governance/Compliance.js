import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  COMPANY_SEARCH,
  DOCS_INSIGHTIA_COM_REPORTS,
} from '../../../constants/PathsConstant';
import { NORECORDS } from '../../../constants/MessageConstans';
import bn from '../../../utils/bemnames';
import Table from '../../GeneralForm/Table';
import { checkValuesToFixed } from '../../../utils/table-tools-util';
import DropdownList from '../../GeneralForm/DropdownList';
import LightBoxPDFViewer from '../../GeneralForm/LightBoxPDFViewer';
import Modal from '../../GeneralForm/Modal';
import FailedLink from '../../../pages/FailedLink';
import { ifUrlExist } from '../../../utils/checkURL-util';
import { filters } from '../../../utils/AgGridFunctions';
import Card from '../../GeneralForm/Card';
import numConst from '../../../constants/NumberConstants';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Compliance = ({
  location,
  TrialLog,
  allowDownload,
  complianceFillingType,
  complianceStatement,
  complianceComparisonIndexes,
  complianceDissent,
  received,
  TrialUser,
  TrialUserDisableDownload,
  ddlComparision,
  selection_ddlComparision,
  handleSetDDLComparision
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bem = bn.create('compliance');

  const handleArrIndecii = useCallback(
    () =>
    complianceComparisonIndexes && complianceComparisonIndexes !== undefined && complianceComparisonIndexes
        .map((ele) => ({ label: ele.text, value: ele.commit }))
        .sort((a, b) => a.label - b.label),
    [complianceComparisonIndexes]
  );

  const handleArrStatement = useCallback(
    () =>
    complianceStatement && complianceStatement !== undefined && complianceStatement.map((ele) => ({ label: ele.source, value: [ele] })),
    [complianceStatement]
  );

  const [arrStatement, setArrStatement] = useState(handleArrStatement());
  const [arrIndecii, setArrIndecii] = useState(handleArrIndecii());

  const [statement, setStatement] = useState(arrStatement[0]);
  const [comparison, setComparison] = useState(arrIndecii[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatement, setIsLoadingStatement] = useState(false);
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

  const handleChangeComparison = (e) => {
    if (typeof e === 'object') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setComparison(e);
    }
  };

  const handleChangeStatement = (e) => {
    if (typeof e === 'object') {
      setIsLoadingStatement(true);
      setTimeout(() => {
        setIsLoadingStatement(false);
      }, 500);
      setStatement(e);
    }
  };
  useEffect(() => {
    setArrStatement(handleArrStatement());
    setArrIndecii(handleArrIndecii());
  }, [handleArrIndecii, handleArrStatement]);

  useEffect(() => {
    setComparison(arrIndecii[0]);
    setStatement(arrStatement[0]);
  }, [arrIndecii, arrStatement]);

  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

  const gridOptionsStatementComp = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Compliance Statement',
        field: 'ComplianceStatement',
        type: ['autoHeight'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 '
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 923,
        maxWidth: query.print ? 923 : null,
      },
      {
        headerName: 'Document',
        field: 'source',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        minWidth: 110,
        maxWidth: 110,
        cellRendererFramework: (params) => {
          if (params.data.source_url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.source_url}
              >
                View
              </a>
            );
          }
          return (
            <a
              className='link-primary text-secondary'
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => {
                if (!TrialUser) {
                  e.preventDefault();
                  checkLink(params.data.source_url).then((exists) => {
                    if (exists) {
                      window.open(params.data.source_url, '_blank');
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
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData:
      statement && statement !== undefined &&
      statement.value.map((x) => ({
        ...x,
        ComplianceStatement: x.ComplianceStatement !== undefined && x.ComplianceStatement !== null
      ? x.ComplianceStatement : '',
      source: x.source && x.source !== null !== undefined
      ? x.source : '',
        TrialUser,
        allowDownload })),
  };

  const gridOptionsCurrentNonComp = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Provision Number',
        field: 'ProNum',
        type: ['autoHeightTrue'],
        minWidth: 100,
        maxWidth: 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Governance Code',
        field: 'GovCode',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150,
        maxWidth: query.print ? 150 : 200,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a target="_blank" class='text-secondary' rel="noopener noreferrer" 
          href='${params.data.gov_code_url}'>${params.data.GovCode}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Provision Detail',
        field: 'ProDetails',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 583,
        maxWidth: query.print ? 583 : null,
      },
      {
        headerName: 'Source',
        field: 'LinkedFiling',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        minWidth: 100,
        maxWidth: 100,
        cellRendererFramework: (params) => {
          if (params.data.linkedfilling_url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.linkedfilling_url}
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
                if (!TrialUser) {
                  e.preventDefault();
                  checkLink(params.data.linkedfilling_url).then((exists) => {
                    if (exists) {
                      window.open(params.data.linkedfilling_url, '_blank');
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
        headerName: `${comparison.label} Comparison`,
        field: 'Comparison',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100,
        cellRendererFramework: (params) =>
          `${checkValuesToFixed(params.data.Comparison, 1)}`,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    headerHeight: 50,
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: comparison.value[0].map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
    })),
  };
  const gridOptionsPrevNonComp = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Provision Number',
        field: 'ProNum',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'Governance Code',
        field: 'GovCode',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150,
        maxWidth: query.print ? 150 : 200,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a target="_blank" class='text-secondary' rel="noopener noreferrer" href='${params.data.gov_code_url}'>${params.data.GovCode}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Provision Detail',
        field: 'ProDetails',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 583,
        maxWidth: query.print ? 583 : null,
      },
      {
        headerName: 'Source',
        field: 'LinkedFiling',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        minWidth: 100,
        maxWidth: 100,
        cellRendererFramework: (params) => {
          if (params.data.linkedfilling_url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.linkedfilling_url}
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
                if (!TrialUser) {
                  e.preventDefault();
                  checkLink(params.data.linkedfilling_url).then((exists) => {
                    if (exists) {
                      window.open(params.data.linkedfilling_url, '_blank');
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
        headerName: `${comparison.label} Comparison`,
        field: 'Comparison',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100,
        cellRendererFramework: (params) =>
          `${checkValuesToFixed(params.data.Comparison)}%`,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    headerHeight: 50,
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: comparison.value[1].map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
    })),
  };

  const gridOptionsDissent = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Meeting Date',
        field: 'meeting_date',
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center dateFormat'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'Proposal Detail',
        field: 'proposal_detail',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 433 : 300,
        maxWidth: query.print ? 433 : null,
      },
      {
        headerName: 'Votes Against (%)',
        field: 'votes_against',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 100,
        maxWidth: 100,
        cellRendererFramework: (params) =>
          `${checkValuesToFixed(params.data.votes_against, 1)}`,
      },
      {
        headerName: 'AGM Results',
        field: 'agm_result_url',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        minWidth: 100,
        maxWidth: 100,
        cellRendererFramework: (params) => {
          if (params.data.agm_result_url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.agm_result_url}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              className='link-primary text-secondary'
              rel='noopener noreferrer'
              onClick={(e) => {
                if (!TrialUser) {
                  e.preventDefault();
                  checkLink(params.data.agm_result_url).then((exists) => {
                    if (exists) {
                      window.open(params.data.agm_result_url, '_blank');
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
        headerName: 'Filing Date',
        field: 'agm_result_filling_date',
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center dateFormat'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'Voting Update Link',
        field: 'voting_url',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100,
        cellRendererFramework: (params) => {
          if (params.data.voting_url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.voting_url}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              className='link-primary text-secondary'
              rel='noopener noreferrer'
              onClick={(e) => {
                if (!TrialUser) {
                  e.preventDefault();
                  checkLink(params.data.voting_url).then((exists) => {
                    if (exists) {
                      window.open(params.data.voting_url, '_blank');
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
        headerName: 'Filing Date',
        field: 'voting_date',
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center dateFormat'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        minWidth: 100,
        maxWidth: 100,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    headerHeight: 50,
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: complianceDissent !== undefined && complianceDissent.map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
    })),
  };

    if (statement !== undefined && statement !== null && statement.value.length > numConst.EMPTY_TABLE_LENGTH) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, [3000]);
    }

  if (
    arrIndecii !== undefined && arrIndecii.length === numConst.EMPTY_TABLE_LENGTH &&
    arrStatement.length === numConst.EMPTY_TABLE_LENGTH
  ) {
    return (
      <Page key={1} className={bem.b('pt-3')}>
        {NORECORDS}
      </Page>
    );
  }

  if (!received) return null;
  return (
    <Page
      {...{
        location,
        TrialLog,
        allowDownload,
        complianceFillingType,
        complianceStatement,
        complianceComparisonIndexes,
        complianceDissent,
      }}
      key={1}
      className={bem.b('pt-3')}
    >
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

      <div className='fadeInAnimation'>
        {statement !== undefined && statement !== null && statement.value.length > 0 ? (
          <div
            className={
              isLoadingStatement ? 'fadeOutAnimation' : 'fadeInAnimation'
            }
          >
            {/* UPDATE INPUT */}
            <div id='loadItem' />
            <div className='row ps-3 my-3 pt-2 align-items-center'>
              {statement.value !== null && statement.value !== undefined && statement.value.length > 0
              && (
                <>
                  <div className='col-md-12 m-0' />
                  <div className='col-md-10 col-6 font-weight-bold text-primary text-end m-0'>
                    Compliance Statement - UK Corporate Governance Code:
                  </div>
                  <div className='col-md-2 col-6 m-0'>
                    <DropdownList
                      handleChange={(e) => {
                        if (e !== null) {
                          handleChangeStatement(e);
                          handleChangeStatement(e);
                        }
                      }}
                      isMulti={false}
                      options={arrStatement}
                      Dvalue={statement}
                      placeholder='Compliance Year'
                      disabled={TrialUser}
                    />
                  </div>
                </>
              )}
            </div>

            {statement.label !== null && statement.label !== undefined && statement.label.length > 0
              && (
            <>
            <div className='row pt-2'>
              <div className='col-12'>
                <ErrorBoundary hasCard cardtitle='Statement Compliance'>
                  <Table
                    gridOptions={gridOptionsStatementComp}
                    title={statement.label}
                    pageTitle={statement.label}
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              </div>
            </div>
            </>
            )}
          </div>
        ) : (
        <div className='row pt-2'>
        <div className='col-12'>
          <Card
            title='Compliance Statement'
            pageTitle='Compliance Statement'
          >
            None
          </Card>
        </div>
        </div>
      )}

        <>
          <div className='row pt-2'>
            <div className='col-12 ps-3'>
              <h5>Non-compliant Provisions - UK Corporate Governance Code</h5>
            </div>
          </div>
          {(comparison.value[0].length > 0 ||
            comparison.value[1].length > 0) && (
            <div className='row ps-3 my-3 mt-0 align-items-center'>
              <div className='col-md-12 m-0' />
              <div className='col-md-10 col-6 font-weight-bold text-primary text-end'>
                Current Comparison:
              </div>
              <div className='col-md-2 col-6'>
                <DropdownList
                  handleChange={(e) => {
                    if (e !== null) {
                      handleChangeComparison(e);
                    }
                  }}
                  isMulti={false}
                  options={arrIndecii}
                  Dvalue={comparison}
                  placeholder='Index'
                  disabled={TrialUser}
                />
              </div>
            </div>
          )}
        </>

        <div className={isLoading ? 'fadeOutAnimation' : 'fadeInAnimation'}>
          {comparison.value[0].length > 0 ? (
            <div className='row pt-2'>
              <div className='col-12'>
                <ErrorBoundary hasCard cardtitle='Current Non-compliance'>
                  <Table
                    gridOptions={gridOptionsCurrentNonComp}
                    title='Current Non-compliance'
                    pageTitle='Current Non-compliance'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              </div>
            </div>
          ) : (
            <div className='row pt-2'>
              <div className='col-12'>
                <Card
                  title='Current Non-compliance'
                  pageTitle='Current Non-compliance'
                >
                  Full Compliance
                </Card>
              </div>
            </div>
          )}

          {comparison.value[1].length > 0 ? (
            <div className='row pt-2'>
              <div className='col-12'>
                <ErrorBoundary hasCard cardtitle='Previous Non-compliance'>
                  <Table
                    gridOptions={gridOptionsPrevNonComp}
                    title='Previous Non-compliance'
                    pageTitle='Previous Non-compliance'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              </div>
            </div>
          ) : (
            <div className='row pt-2'>
              <div className='col-12'>
                <Card
                  title='Previous Non-compliance'
                  pageTitle='Previous Non-compliance'
                >
                  None
                </Card>
              </div>
            </div>
          )}

          {complianceDissent.length > 0 && (
            <div className='row pt-2'>
              <div className='col-12'>
                <ErrorBoundary hasCard cardtitle='Voting Dissent (>20% Votes Against)'>
                  <Table
                    gridOptions={gridOptionsDissent}
                    title='Voting Dissent (>20% Votes Against)'
                    pageTitle='Voting Dissent (>20% Votes Against)'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

Compliance.propTypes = {
  TrialLog: PropTypes.bool,
  allowDownload: PropTypes.bool,
  complianceComparisonIndexes: PropTypes.array,
  complianceDissent: PropTypes.array,
  complianceFillingType: PropTypes.any,
  complianceStatement: PropTypes.array,
  location: PropTypes.object,
};

Compliance.defaultProps = {
  complianceComparisonIndexes: [],
  complianceDissent: [],
  complianceStatement: [],
  location: {},
  complianceFillingType: '',
  TrialLog: false,
  allowDownload: false,
};

export default withRouter(React.memo(Compliance));
