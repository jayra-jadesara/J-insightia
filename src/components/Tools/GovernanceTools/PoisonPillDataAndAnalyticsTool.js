import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import D3PieChart from '../../GeneralForm/D3PieChart';
import Table from '../../GeneralForm/Table';
import { gridWidthValues, gridWidthValuesLrg, gridWidthValuesXLrg } from '../../../utils/table-tools-util';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow
} from '../../../utils/AgGridFunctions';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { dateToNull } from '../../../utils/general-util';
import { COMPANY_OVERVIEW, GOVERNANCE_OVERVIEW, QUERY_PID } from '../../../constants/PathsConstant';
import msgConst from '../../../constants/MessageConstans';

const D3barchart = lazy(() => import('../../GeneralForm/D3barchart'));
const Card = lazy(() => import('../../GeneralForm/Card'));
const PoisonPillDataAndAnalytics = (props) => {
  const gridOption_RightsAgentData = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Right Agent',
        field: 'rights_agent',
        minWidth: 290,
      },
      {
        headerName: 'Russell 3000',
        field: 'Russell 3000',
        ...gridWidthValuesXLrg
      },
      {
        headerName: 'S&P 500',
        field: 'S&P 500',
        ...gridWidthValuesXLrg
      },
      {
        headerName: 'Russell 3000(exc.S&P 500)',
        field: 'Russell_exc_SnP',
        ...gridWidthValuesXLrg
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: props.lstRightsAgentData.map((x) => ({
      ...x,
      Russell_exc_SnP: x['Russell 3000 (exc.S&P 500)'],
      //   TrialStatus: trialStatus,
      allowDownload: true
    })),
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh'
    // tableSmallLabel: userMessage,
  };

  const gridOption_PoisonPillRecentInsightia = {
    colDefsMedalsIncluded: [
      {
        headerName: 'PID',
        field: 'PID',
        type: ['numberColumn', 'enableRowGroup', 'enableValue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
        ...gridWidthValues
      },
      {
        headerName: 'Company Name',
        field: 'Company Name',
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        filter: 'agSetColumnFilter',
        wrapText: true,
        autoHeight: true,
        cellRendererFramework: (params) => (
          <div>
            {params.data.PID !== '' ? (
              <a
                title={params.data['Company Name']}
                className="text-secondary"
                target="_blank"
                rel="noopener noreferrer"
                href={`${params.data.active ? GOVERNANCE_OVERVIEW : COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}
              >
                {params.data['Company Name']}
              </a>
            ) : (
              <span title={params.data['Company Name']}>{params.data['Company Name']}</span>
            )}
          </div>
        ),
      },
      {
        headerName: 'Sector',
        field: 'Sector',
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText
      },
      {
        headerName: 'Industry',
        field: 'Industry',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesXLrg,
        getQuickFilterText
      },
      {
        headerName: 'Market Cap',
        field: 'Market Cap',
        type: ['numberColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        getQuickFilterText
      },
      {
        headerName: 'Market Cap Category',
        field: 'Market Cap Category',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        getQuickFilterText
      },
      {
        headerName: 'Index',
        field: 'index_names',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        wrapText: true,
        autoHeight: true,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Adopted Date',
        field: 'Adopted_Date',
        type: ['dateColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        getQuickFilterText
      },
      {
        headerName: 'Final Expiration Date',
        field: 'Final_Expiration_Date',
        type: ['dateColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        getQuickFilterText
      },
      {
        headerName: 'Ownership Threshold',
        field: 'Ownership Threshold',
        type: ['numberColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        getQuickFilterText
      },
      {
        headerName: 'Passive Threshold',
        field: 'Passive Threshold',
        type: ['numberColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        getQuickFilterText
      },
      {
        headerName: 'Terminated Early',
        field: 'Terminated Early',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        getQuickFilterText
      },
      {
        headerName: 'Rights Agent',
        field: 'Rights Agent',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        filter: 'agTextColumnFilter',
        wrapText: true,
        autoHeight: true
      },
      {
        headerName: 'NOL',
        field: 'NOL',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValues,
        getQuickFilterText
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    quickSearchFilter: true,
    pivotMode: false,
    rowData: props.lstPoisonPillRecentInsightia.map((x) => ({
      ...x,
      Adopted_Date: dateToNull(x['Adopted Date'], 'dd-mmm-yy', true),
      Final_Expiration_Date: dateToNull(x['Final Expiration Date'], 'dd-mmm-yy', true),
      //   TrialStatus: trialStatus,
      allowDownload: true
    })),
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    aggFuncs: {
      'count(Dist)': distinctCounts
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh'
    // tableSmallLabel: userMessage,
  };

  return (
    <Page {...props} key={1}>
      <div className="form-check form-check-inline ">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="individualChecked"
          value="option1"
          onClick={() => props.handleSwitchDataAndStats(true)}
          defaultChecked={!!props.isPoisonData}
        />
        <label className="form-check-label" htmlFor="individualChecked">
          Data
        </label>
      </div>
      <div className="form-check form-check-inline ">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="GroupChecked"
          value="option2"
          onClick={() => props.handleSwitchDataAndStats(false)}
          defaultChecked={!props.isPoisonData}
        />
        <label className="form-check-label" htmlFor="GroupChecked">
          Analysis
        </label>
      </div>
      <div className="row mt-3">
        {props.isPoisonData ? (
          <div className="mb-3">
            <div className="col-12">
              {props.isLoadingPoisonData ? (
                <div className="vh-100">
                  <div className="h-50">
                    {props.procedureRunningEstimateTime !== undefined && (
                      <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
                    )}
                  </div>
                </div>
              ) : props.lstPoisonPillRecentInsightia.length > 0 ? (
                <div className="row ">
                  <Table IsShowCard title="" smalltitle="" gridOptions={gridOption_PoisonPillRecentInsightia} hideExcelDownloadIcon={props.trialUserDisableDownload} />
                </div>
              ) : (
                msgConst.SUPPORT_TEAM_EMAIL_MSG
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>
              All figures and charts are based on the Russell 3000.
            </p>
            <div className="row">
              <div className="col-lg-2 col-md-6 col-sm-12 my-2">
                <Card title="Active Poison Pill(Russel 3000) ">
                  <div className="row text-center mt-5">
                    <span className="ovr-text col-12">{props.poisonPillCardData.total_adopted_pills}</span>
                    <span className="text-muted col-12">Total</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 my-2">
                <Card title="Average no. of years poison pills active">
                  <div className="row text-center mt-5">
                    <span className="ovr-text col-12">{props.poisonPillCardData.avg_active_years}</span>
                    <span className="text-muted col-12">Total</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 my-2">
                <Card title="Number of poison pills terminated early*">
                  <div className="row text-center mt-5">
                    <span className="ovr-text col-12">{props.poisonPillCardData.total_early_termination}</span>
                    <span className="text-muted col-12">Total</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 my-2">
                <D3PieChart
                  data={props.poisonPillPieChart}
                  cardtitle="Active poison pills by sector"
                  isComp={false}
                  isInvest={false}
                  innerRadius={60}
                  outerRadius={120}
                  height={400}
                  isDynamicViewbox
                  isDynamicLegendFontSize
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <D3barchart
                  title="Number of poison pills adopted per year"
                  data={props.poisonPillGraph1}
                  keys={['number']}
                  xkeysLabel={['years']}
                  innerRadius={60}
                  outerRadius={120}
                  tickTextVertically
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <D3barchart
                  title="Number of poison that expired per year- this includes poison pills terminated early."
                  data={props.poisonPillGraph2}
                  keys={['expiration']}
                  xkeysLabel={['years']}
                  innerRadius={60}
                  outerRadius={120}
                  tickTextVertically
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <D3barchart
                  title="Number of poison pill terminated early per year*"
                  data={props.poisonPillGraph3}
                  keys={['early_expiration']}
                  xkeysLabel={['years']}
                  innerRadius={60}
                  outerRadius={120}
                  tickTextVertically
                />
              </div>
            </div>
            <div className="mb-2">
              {props.lstRightsAgentData !== undefined ? (
                <Table
                  IsShowCard
                  title="Right Agent Representation"
                  smalltitle=""
                  gridOptions={gridOption_RightsAgentData}
                  hideExcelDownloadIcon={props.trialUserDisableDownload}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

PoisonPillDataAndAnalytics.propTypes = {
  location: PropTypes.object
};

PoisonPillDataAndAnalytics.defaultProps = {
  location: {}
};

export default withRouter(PoisonPillDataAndAnalytics);
