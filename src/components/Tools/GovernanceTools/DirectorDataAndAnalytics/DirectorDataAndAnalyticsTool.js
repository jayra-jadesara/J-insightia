import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import DirectorDataAndAnalyticsFilter from './DirectorDataAndAnalyticsFilter';
import Table from '../../../GeneralForm/Table';
import Card from '../../../GeneralForm/Card';
import {
  filters,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
} from '../../../../utils/AgGridFunctions';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import pathsConst from '../../../../constants/PathsConstant';
import msgConst from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';
import ProcedureConstant from '../../../../constants/ProcedureConstant';
import {
  gridWidthValuesLrg,
  gridWidthValuesXLrg,
  gridWidthValuesDigits,
  gridWidthReport,
} from '../../../../utils/table-tools-util';
import DirectorAnalysisTool from './DirectorAnalysisTool';
import bn from '../../../../utils/bemnames';
import { dateToNull } from '../../../../utils/general-util';

const bem = bn.create('directorDataAndAnalysis');

const DirectorDataAndAnalyticsTool = (props) => {
  const msgNote = `n.b. Funds are not included in search results
  *This excludes demands made by Engagement focus activists as profiled on Insightia's Activism module. Please note some activist nominees may be appointed outside of an activists campaign if the director was appointed as 
  part of a settlement or are a replacement nominee`;
  const onSearch = async () => {
    await props.handleResetSearch();
    await props.handleResetLoader();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.DIRECTORE_DATA_AND_ANALYTICS
    );
    let EthnicityIds = null;
    if (
      props.lstEthnicitySelection !== undefined &&
      props.lstEthnicitySelection.length > 0
    ) {
      const selection = props.lstEthnicitySelection
        .map((x) => x.value)
        .toString();
      EthnicityIds = selection === '-1' ? null : selection;
    }

    const data = {
      gender:
        props.lstGenderSelection.label !== undefined
          ? props.lstGenderSelection.label
          : null,
      ethnicity_ids: EthnicityIds,
      tenureFrom: props.tenureFrom !== undefined ? props.tenureFrom : null,
      tenureTo: props.tenureTo !== undefined ? props.tenureTo : null,
      boardFrom: props.boardFrom !== undefined ? props.boardFrom : null,
      boardTo: props.boardTo !== undefined ? props.boardTo : null,
      ageFrom: props.ageFrom !== undefined ? props.ageFrom : null,
      ageTo: props.ageTo !== undefined ? props.ageTo : null,
      company_search_id:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
    };
    const data1 = {
      gender:
        props.lstGenderSelection.label !== undefined
          ? props.lstGenderSelection.label
          : null,
      tenureFrom: props.tenureFrom !== undefined ? props.tenureFrom : null,
      tenureTo: props.tenureTo !== undefined ? props.tenureTo : null,
      boardFrom: props.boardFrom !== undefined ? props.boardFrom : null,
      boardTo: props.boardTo !== undefined ? props.boardTo : null,
      ageFrom: props.ageFrom !== undefined ? props.ageFrom : null,
      ageTo: props.ageTo !== undefined ? props.ageTo : null,
      company_search_id:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      based_on_data: props.yearToData ? 'ALL' : 'Cur',
    };
    await props.getDirectoDataAndAnalyticsDataReq(data);
    await props.getDirectorAnalysisDataReq(data1);
  };

  const gridOptionsDirectorDataAndAnalytics = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Name',
        field: 'director_name',
        filter: 'agTextColumnFilter',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.lstDirectoAppointmentData &&
                props.lstDirectoAppointmentData.length > 0 &&
                props.lstDirectoAppointmentData.filter(
                  (c) => c.director_name === params.value
                );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${pathsConst.DIRECTORSHIP_AND_EXECUTIVE}${pathsConst.QUERY_DIRECTOR}${lstData[0].Director_id}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.lstDirectoAppointmentData &&
                props.lstDirectoAppointmentData.length > 0 &&
                props.lstDirectoAppointmentData.filter(
                  (c) => c.director_name === params.value
                );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${pathsConst.DIRECTORSHIP_AND_EXECUTIVE}${pathsConst.QUERY_DIRECTOR}${lstData[0].Director_id}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
      },
      {
        headerName: 'Director ID',
        field: 'Director_id',
        type: ['numberColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Current Age',
        field: 'Current_Age',
        type: ['numberColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesDigits,
      },
      {
        headerName: 'Age On Appointment',
        field: 'Age_On_Appointment',
        type: ['numberColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Director Appointment ID',
        field: 'Director_appoinment_id',
        type: ['numberColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Company Name',
        field: 'Company_name',
        filter: 'agTextColumnFilter',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.lstDirectoAppointmentData &&
                props.lstDirectoAppointmentData.length > 0 &&
                props.lstDirectoAppointmentData.filter(
                  (c) => c.Company_name === params.value
                );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${pathsConst.GOVERNANCE_OVERVIEW}${pathsConst.QUERY_PID}${lstData[0].PID}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.lstDirectoAppointmentData &&
                props.lstDirectoAppointmentData.length > 0 &&
                props.lstDirectoAppointmentData.filter(
                  (c) => c.Company_name === params.value
                );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${pathsConst.GOVERNANCE_OVERVIEW}${pathsConst.QUERY_PID}${lstData[0].PID}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
      },
      {
        headerName: 'PID',
        type: ['numberColumn', 'enableValue', 'enableRowGroup'],
        field: 'PID',
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Company HQ',
        field: 'Company_HQ',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Exchange',
        field: 'Exchange',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Index',
        field: 'index_names',
        filter: 'agTextColumnFilter',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Sector',
        field: 'Sector',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Industry',
        field: 'Industry',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Current Market Cap',
        field: 'Mkt_Cap',
        type: ['numberColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Current Market Cap Category',
        field: 'Mkt_Cap_Category',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Director Type',
        field: 'director_type',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Start Date',
        field: 'Since_Date',
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        type: ['dateColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'End Date',
        field: 'End_Date',
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        type: ['dateColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Current',
        field: 'Current',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Gender',
        field: 'Gender',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Ethnicity',
        field: 'ethnicity_name',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthReport,
      },
      {
        headerName: 'Tenure',
        field: 'Tenure',
        type: ['numberColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Current Board',
        field: 'Current_Boards',
        type: ['numberColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Independent',
        field: 'Independent',
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
        ...gridWidthValuesXLrg,
      },
      {
        headerName: 'Tenure Overlaps with Activist Demand*',
        field:
          'Tenure Overlaps with Activist Demand (excluding engagement focus activists)',
        ...gridWidthValuesXLrg,
        type: ['setColumn', 'enableValue', 'enableRowGroup'],
        getQuickFilterText,
      },
      {
        headerName: 'Activist Nominee',
        field: 'Activist Nominee',
        filter: 'agTextColumnFilter',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
    suppressAggFuncInHeader: true,
    quickSearchFilter: true,
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    rowData:
      props.lstDirectoAppointmentData &&
      props.lstDirectoAppointmentData.length > 0 &&
      props.lstDirectoAppointmentData.map((x) => ({
        ...x,
        Since_Date: dateToNull(x.Since_Date, 'dd-mmm-yy', true),
        End_Date: dateToNull(x.End_Date, 'dd-mmm-yy', true),
        Mkt_Cap: x.Mkt_Cap !== null ? x.Mkt_Cap.toFixed(2) : '',
        // TrialStatus: props.TrialStatus_NoActionLetter,
        // allowDownload: props.allowDownload_NoActionLetter,
      })),
  };

  return (
    <Page {...props} key={1} className={bem.b('')}>
      <DirectorDataAndAnalyticsFilter
        {...props}
        onSearch={onSearch}
        //// save search
        isShowFilterSavesearchModal
        onSavedSearches_btnApply={props.onSavedSearches_btnApply}
        onSavedSearches_btnDelete={props.onSavedSearches_btnDelete}
        onSavedSearches_Create={props.onSavedSearches_Create}
        onSavedSearches_Update={props.onSavedSearches_Update}
        isShow_SaveThisSearch_Modal={props.isShow_SaveThisSearch_Modal}
        handleShow_SaveThisSearch_Modal={props.handleShow_SaveThisSearch_Modal}
        saveSearchTextboxVal={props.saveSearchTextboxVal}
        handleSaveSearchTextboxValue={props.handleSaveSearchTextboxValue}
        saveSearch_list={props.saveSearch_list}
        saveSearchDDLList={props.saveSearchDDLList}
        saveSearchedDDLSelection={props.saveSearchedDDLSelection}
      />
      {props.isLoading !== undefined &&
        (props.directorData ? (
          <div className='row'>
            <div className='col-md-12 col-sm-12 pt-3'>
              {props.isLoading ? (
                <div className='vh-100'>
                  <div className='h-50'>
                    {props.procedureRunningEstimateTime !== undefined && (
                      <ProgressBar
                        avgElapsedTime={props.procedureRunningEstimateTime}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <Card>
                    {/* <p className='text-primary position-absolute' style={{ top: '8.5rem' }}>
                      n.b. Funds are not included in search results
                    </p> */}
                    <Table
                      linebreakInfoLable={false}
                      showInfoLable={msgNote}
                      IsShowCard={false}
                      title=''
                      smalltitle=''
                      gridOptions={gridOptionsDirectorDataAndAnalytics}
                      enableCharts
                      hideExcelDownloadIcon={props.trialUserDisableDownload}
                    />
                  </Card>
                  {props.lstDirectoAppointmentData &&
                    props.lstDirectoAppointmentData.length ===
                      numConst.EMPTY_TABLE_LENGTH && (
                      <div>
                        <span>{msgConst.NORECORDS}</span>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        ) : (
          <DirectorAnalysisTool {...props} />
        ))}
    </Page>
  );
};

export default withRouter(React.memo(DirectorDataAndAnalyticsTool));
