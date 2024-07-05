import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../GeneralForm/Table';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { filters } from '../../../utils/AgGridFunctions';

import {
  gridWidthDates,
  gridWidthValuesSml,
  gridWidthValuesLrg,
  gridWidthReport,
  gridWidthValues,
  gridWidthValuesXLrg
} from '../../../utils/table-tools-util';
import MyAlert from './NewAlerts';
import { GREEN_YES_IMG, RED_CROSS_IMG, MY_ALERT_INBOX } from '../../../constants/PathsConstant';
import { MY_ALERT_GETEXISTINGALERTS } from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const ExistingAlerts = (props) => {
  const {
    lstExistingAlertData,
    isLoadingExistingAlertData,
    procedureRunningEstimateTime,
    handleOnEditMyAlert,
    isExistingAlertPagging,
    editAlertid,
    handleCancelEditingAlert,
    getAlertDetailsReq,
    getExistingAlertsReq,
    handleResetLoader,
    getProcedureRunningEstimateTimeReq,
    deleteAlertReq
  } = props;

  const [show, setShow] = useState(false);
  const [alertName, setAlertName] = useState('');
  const [alertID, setAlertID] = useState(null);
  const [companySearchId, setCompanySearchId] = useState(null);
  const [investorSearchId, setInvestorSearchId] = useState(null);
  const [isExistingAlert, setIsExistingAlert] = useState(true);
  const handleCloaseModelPopup = async () => {
    alertID !== null && deleteAlertReq(alertID);
    await handleResetLoader();
    await getProcedureRunningEstimateTimeReq(MY_ALERT_GETEXISTINGALERTS);
    await getExistingAlertsReq();
    setShow(false);
  };
  const handleSubmit = () => {
    setShow(false);
  };
  const gridOptionExistingAlert = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Alert',
        field: 'alert_name',
        minWidth: 200,
        maxWidth: 200
      },
      {
        headerName: 'Alert Type (Module)',
        field: 'alertType',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh30 ps-1 pe-1 ', //font-size-small
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<div style="white-space:break-spaces">${params.data.alertType.replaceAll(
            ',',
            ',\n'
          )}</div>`;
          return eDiv;
        }
      },
      {
        headerName: 'Email?',
        field: 'receive_email',
        minWidth: 80,
        maxWidth: 80,
        cellRendererFramework: (params) => (
          <div>
            <img
              src={params.data.receive_email === 'true' ? `${GREEN_YES_IMG}` : `${RED_CROSS_IMG}`}
              title={params.data.receive_email}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
          </div>
        )
      },
      {
        headerName: 'Created',
        field: 'Created',
        minWidth: 150,
        maxWidth: 150
      },
      {
        headerName: 'Last Alert Sent',
        field: 'last_alert_sent',
        minWidth: 150,
        maxWidth: 150
      },
      {
        headerName: 'Alerts Received (Unread)',
        field: 'Alerts_Received',
        minWidth: 150,
        maxWidth: 150
      },
      {
        headerName: 'Alter Alert',
        field: 'alert_id',
        minWidth: 85,
        maxWidth: 85,
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              onClick={() => {
                handleOnEditMyAlert(params.value);
                // binding default company and investor search ids
                getAlertDetailsReq(params.value).then((res) => {
                  if (res.payload.alert.company_search_id !== null) {
                    setCompanySearchId(res.payload.alert.company_search_id);
                    const cmpSearch = props.listOfcompanySearchOptions.filter(
                      (c) => c.value === res.payload.alert.company_search_id
                    );
                    if (cmpSearch.length > 0) {
                      props.handleComapnySearchSelectionInvComp(cmpSearch[0]);
                    }
                  }

                  if (res.payload.alert.investor_search_id !== null) {
                    setInvestorSearchId(res.payload.alert.investor_search_id);
                    const invSearch = props.investorSearchOptions.filter(
                      (c) => c.value === res.payload.alert.investor_search_id
                    );
                    if (invSearch.length > 0) {
                      props.handleInvestorSearchSelectionInvComp(invSearch[0]);
                    }
                  }
                });
              }}
              className='btn btn-primary btn-sm'
            >
              Edit
            </button>
          </div>
        )
      },
      {
        headerName: 'Delete Alert',
        field: 'alert_id',
        minWidth: 85,
        maxWidth: 85,
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-danger btn-sm'
              style={{ backgroundColor: 'rgb(244 74 61)', color: '#FFFFFF' }}
              onClick={() => {
                setShow(true);
                setAlertName(params.data.alert_name);
                setAlertID(params.data.alert_id);
              }}
            >
              Delete
            </button>
          </div>
        )
      },
      {
        headerName: 'Alert Inbox',
        field: 'alert_id',
        minWidth: 85,
        maxWidth: 85,
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${MY_ALERT_INBOX}`}
              onClick={async () => {
                await props.handleAlertByName({
                  label: params.data.alert_name,
                  value: params.data.alert_id
                });
              }}
            >
              Show
            </Link>
          </div>
        )
      }
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    paggination: { isPagging: isExistingAlertPagging, pageSize: 10 },
    pivotMode: false,
    rowData: lstExistingAlertData.map((x) => ({
      ...x,
      TrialStatus: false,
      allowDownload: false
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true
  };

  const gridOptionEditExistingAlert = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Alert',
        field: 'alert_name',
        minWidth: 300,
        maxWidth: 300
      },
      {
        headerName: 'Alert Type (Module)',
        field: 'alertType',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh30 ps-1 pe-1 ', //font-size-small
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<div style="white-space:break-spaces">${params.data.alertType.replaceAll(
            ',',
            ',\n'
          )}</div>`;
          return eDiv;
        }
      },
      {
        headerName: 'Email?',
        field: 'receive_email',
        minWidth: 80,
        maxWidth: 80,
        cellRendererFramework: (params) => (
          <div>
            <img
              src={params.data.receive_email === 'true' ? `${GREEN_YES_IMG}` : `${RED_CROSS_IMG}`}
              title={params.data.receive_email}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
          </div>
        )
      },
      {
        headerName: 'Created',
        field: 'Created',
        minWidth: 125,
        maxWidth: 125
      },
      {
        headerName: 'Last Alert Sent',
        field: 'last_alert_sent',
        minWidth: 140,
        maxWidth: 140,
      },
      {
        headerName: 'Alerts Received (Unread)',
        field: 'Alerts_Received',
        minWidth: 150,
        maxWidth: 150
      },
      {
        headerName: 'Alert Inbox',
        field: 'alert_id',
        minWidth: 110,
        maxWidth: 110,
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${MY_ALERT_INBOX}`}
              onClick={async () => {
                await props.handleAlertByName({
                  label: params.data.alert_name,
                  value: params.data.alert_id
                });
              }}
            >
              Show
            </Link>
          </div>
        )
      }
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: lstExistingAlertData.map((x) => ({
      ...x,
      TrialStatus: false,
      allowDownload: false
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true
  };

  return (
    <>
      <Page key={1}>
        <div className='text-primary pt-2 pb-2'>
          {editAlertid !== undefined && editAlertid !== null ? (
            <ErrorBoundary>
              <Table
                isHide={false}
                IsShowCard={false}
                title=''
                hideExcelDownloadIcon
                smalltitle=''
                gridOptions={gridOptionEditExistingAlert}
              />
            </ErrorBoundary>
          ) : (
            <div className='row mt-3'>
              {isLoadingExistingAlertData ? (
                procedureRunningEstimateTime !== undefined && (
                  <div className='vh-100'>
                    <div className='h-50'>
                      <ProgressBar avgElapsedTime={procedureRunningEstimateTime} />
                    </div>
                  </div>
                )
              ) : lstExistingAlertData.length > 0 ? (
                <ErrorBoundary>
                  <Table
                    isHide={false}
                    IsShowCard={false}
                    title=''
                    hideExcelDownloadIcon
                    smalltitle=''
                    gridOptions={gridOptionExistingAlert}
                  />
                </ErrorBoundary>
              ) : (
                'Record not found'
              )}
            </div>
          )}

          {editAlertid && (
            <div className='row'>
              <div className='col-12 text-end'>
                <button
                  type='button'
                  className='btn btn-primary mt-3'
                  onClick={() => {
                    handleCancelEditingAlert();
                  }}
                >
                 Cancel editing alert
                </button>
              </div>
              <div className='col-12 p-0'>
                <MyAlert
                  alertCompanySearchId={companySearchId}
                  alertInvestorSearchId={investorSearchId}
                  isExistingAlert={isExistingAlert}
                  alert_cmp_search_id={props.alert_cmp_search_id}
                  alert_inv_search_id={props.alert_inv_search_id}
                  {...props}
                />
              </div>
            </div>
          )}
        </div>
      </Page>
      {show ? (
        <Modal
          show={show}
          id='displayModal'
          aria-labelledby='modelLightBox'
          onHide={handleCloaseModelPopup}
          backdrop='static'
          keyboard
          centered
          scrollable
        >
          <Modal.Body>
            <h5>Are you sure you want to delete this alert ({alertName})?</h5>
          </Modal.Body>

          <Modal.Footer>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={handleCloaseModelPopup}
              data-bs-dismiss='modal'
            >
              Yes
            </button>
            <button type='button' className='btn btn-primary btn-sm' onClick={handleSubmit} data-bs-dismiss='modal'>
              No
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

export default withRouter(React.memo(ExistingAlerts));
