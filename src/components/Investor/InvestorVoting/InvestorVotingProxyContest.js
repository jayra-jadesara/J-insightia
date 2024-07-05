import PropTypes from 'prop-types';
import React, { lazy, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import { AgChartsReact } from 'ag-charts-react';
import * as agCharts from 'ag-charts-community';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import { NORECORDS } from '../../../constants/MessageConstans';
import { history } from '../../../utils/navigation-util';
import '../../../styles/components/_popupTrialUser.scss';
import InvestorComparatorFilter from '../../Tools/VotingTools/InvestorComparatorFilter';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import Table from '../../GeneralForm/Table';
import ProgressBar from '../../GeneralForm/ProgressBar';
import {
  filters,
  bottomStatusBar,
  columnSidebar,
} from '../../../utils/AgGridFunctions';
import numConst from '../../../constants/NumberConstants';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Card = lazy(() => import('../../GeneralForm/Card'));

const InvestorVotingProxyContest = (props) => {
  const {
    votingSummaryAtProxyContests,
    lstSupportByDissident,
    lstVotingAtProxyContestsData,
    lstProxyContestChartData,
    getDissidentVotingByInvestorReq,
    getSupportByDissidentReq,
    getProxyContestsChartDataReq,
    isLoadingInvestorVotingProxyContestData,
    isTrialStatusForProxyContestVotingData,
    userMessage,
    isStartSearch,
  } = props;

  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  // handled for displaying all year data
  const updateChartSelection = lstProxyContestChartData.map((item) => ({
    ...item,
    year: `${item.Proxy_year}`,
  }));

  const votedDissidentCardByProxySeasonChart = {
    immutableData: true,
    options: {
      autoSize: true,
      data: updateChartSelection,
      series: [
        {
          xKey: ['year'],
          yKey: ['Dissident'],
          yName: ['Dissident'],
        },
        {
          xKey: ['year'],
          yKey: ['Management'],
          yName: ['Management'],
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Proxy Season',
            enabled: true,
          },
          tick: {
            count: 1,
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: '% of Meetings',
            enabled: true,
          },
          label: {
            formatter: function (params) {
              return `${params.value} %`;
            },
          },
          tick: {
            count: 5,
          },
        },
      ],
      legend: {
        position: 'bottom',
      },
    },
  };

  if (updateChartSelection.length === numConst.EMPTY_TABLE_LENGTH) {
    agCharts.AgChart.create(votedDissidentCardByProxySeasonChart);
  }

  const onSearch = useCallback(async () => {
    await props.handleResetLoader();
    await props.handleClearFilterResult();
    await props.getProcedureRunningEstimateTimeReq(ProcedureConstant.SP_GETPROXYCONTESTSCHART_INSIGHTIA);
    const data = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorId: props.invId,
      startDate: props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      settlements:
        props.lstSettlementSelection !== undefined
          ? props.lstSettlementSelection.value
          : null,
      proponent:
        props.isProponentGroup !== null
          ? props.individualProponentSelection !== undefined &&
            props.isProponentGroup
            ? props.individualProponentSelection.map((c) => c.value).toString()
            : ''
          : props.groupProponentSelection !== undefined &&
            props.isProponentGroup === false
          ? props.groupProponentSelection.map((c) => c.value).toString()
          : '',
      desiredOutcome: props.desiredOutcomeSelection,
      issCard:
        props.lstIISCardRecommendationSelection !== undefined ? props.lstIISCardRecommendationSelection.value : null,
      glCard:
        props.lstGLCardRecommendationSelection !== undefined
          ? props.lstGLCardRecommendationSelection.value
          : null,
    };
    const printdata = {
      companySearchId: null,
      // props.invCompCompanyPeerGroupSelection !== undefined
      //   ? props.invCompCompanyPeerGroupSelection.value
      //   : null,
      investorId: props.invId,
      startDate: null,
      //  props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: null,
      //  props.isInvCompDateChecked ? props.endInvCompDate : null,
      settlements: props.lstSettlementSelection !== undefined ? props.lstSettlementSelection.value : null,
      proponent: props.isProponentGroup
        ? props.individualProponentSelection !== undefined && props.isProponentGroup
          ? props.individualProponentSelection.map((c) => c.value).toString()
          : ''
        : props.groupProponentSelection !== undefined && props.isProponentGroup === false
        ? props.groupProponentSelection.map((c) => c.value).toString()
        : '',
      desiredOutcome: props.desiredOutcomeSelection,
      issCard:
        props.lstIISCardRecommendationSelection !== undefined ? props.lstIISCardRecommendationSelection.value : null,
      glCard:
        props.lstGLCardRecommendationSelection !== undefined
          ? props.lstGLCardRecommendationSelection.value
          : null,
    };
    if (query.print) {
      await getSupportByDissidentReq(printdata);
      await getProxyContestsChartDataReq(printdata);
      await getDissidentVotingByInvestorReq(printdata);
    } else {
      await getSupportByDissidentReq(data);
      await getProxyContestsChartDataReq(data);
      await getDissidentVotingByInvestorReq(data);
    }
  }, [
    query.investor,
    query.print,
    getDissidentVotingByInvestorReq,
    getSupportByDissidentReq,
    getProxyContestsChartDataReq,
    props,
  ]);

  useEffect(() => {
    if (query.print) {
      onSearch();
    }
  }, [false]);

  useEffect(() => {
    if (isStartSearch) {
      onSearch();
      localStorage.removeItem('dissidentVotingTools');
    }
  }, []);

  useEffect(() => {
    if (lstVotingAtProxyContestsData.length > 0) {
      localStorage.removeItem('dissidentVotingTools');
    }
  }, [lstVotingAtProxyContestsData, lstVotingAtProxyContestsData.length]);
  const blkProxyContentVotingSummary = (Key, value) => (
    <div className='row'>
      <div className='col-8 mb-2'>{Key}</div>
      <div className='col-4 mb-2'>{value}</div>
    </div>
  );

  const gridOptionProxyContestVotingAllData = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 150 : 150,
        maxWidth: query.print ? 150 : 500,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" href="${pathConst.VOTING_OVERVIEW}?meetingid=${params.data.meeting_id}">
            ${params.data.company_name}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Meeting Date',
        field: 'meeting_date',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center',
        type: ['dateColumn'],
        minWidth: query.print ? 80 : 80,
        maxWidth: query.print ? 80 : 150,
      },
      {
        headerName: 'Dissident',
        field: 'dissident_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 150 : 130,
        maxWidth: query.print ? 150 : 800,
        enablePivot: !query.print,
      },
      {
        headerName: 'Board Control?',
        field: 'Board_Control',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: query.print ? 80 : 80,
        maxWidth: query.print ? 80 : 150,
      },
      {
        headerName: 'Slate Voted',
        field: 'card',
        type: ['enableRowGroup', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-small',
        minWidth: query.print ? 95 : 80,
        maxWidth: query.print ? 95 : 150,
      },
      {
        headerName: 'Winner',
        field: 'proxy_winner',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-small',
        minWidth: query.print ? 95 : 80,
        maxWidth: query.print ? 95 : 150,
      },
      {
        headerName: 'ISS',
        field: 'ISS_recommendation',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-small',
        minWidth: query.print ? 95 : 80,
        maxWidth: query.print ? 95 : 150,
      },
      {
        headerName: 'Glass Lewis',
        field: 'GL_recommendation',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-small',
        minWidth: query.print ? 95 : 80,
        maxWidth: query.print ? 95 : 150,
      },
      {
        headerName: 'Diss (#)',
        field: 'num_dissidents',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 95 : 70,
        maxWidth: query.print ? 95 : 150,
      },
      {
        headerName: 'Diss FOR (#)',
        field: 'num_dissidents_voted',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 100,
        maxWidth: 100,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'company_name',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: lstVotingAtProxyContestsData.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus, //isTrialStatusForProxyContestVotingData,
      allowDownload: false,
    })),
    isfloatingFilter: false,
    suppressAggFuncInHeader: true,
    rowSelection: 'multiple',
    sideBar: query.print ? null : columnSidebar,
    statusBar: query.print ? null : bottomStatusBar,
    domLayout: query.print ? null : 'normal',
    gridHeight: query.print ? null : '80vh',
    tableSmallLabel: query.print ? null : userMessage,
    headerHeight: 60,
  };

  const gridOptionSupportbyDissident = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Dissident',
        field: 'dissident_name',
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 180 : 150,
        maxWidth: query.print ? 180 : 500,
      },
      {
        headerName: 'Proxy Contests',
        field: 'dissCount',
        autoHeight: true,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 110,
        maxWidth: 110,
      },
      {
        headerName: 'Dissidents (#)',
        field: 'cardCount',
        autoHeight: true,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 100 : 100,
        maxWidth: query.print ? 100 : 150,
      },
      {
        headerName: 'Dissidents (%)',
        field: 'AveragePcent',
        autoHeight: true,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 100 : 100,
        maxWidth: query.print ? 100 : 150,
        valueGetter(params) {
          if (params.data.AveragePcent === null || params.data.AveragePcent === undefined) {
            return;
          }
          return `${parseFloat(params.data.AveragePcent).toFixed(1)}`;
        },
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: lstSupportByDissident.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: false,
    })),
    headerHeight: 60,
    quickSearchFilter: false,
    domLayout: query.print ? null : 'normal',
    gridHeight: query.print ? null : '240px',
    animateRows: true,
  };

  useEffect(() => {
    if (!isLoadingInvestorVotingProxyContestData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoadingInvestorVotingProxyContestData]);

  return (
    <Page key={1} className={query.print ? 'cr-InvestorVotingProxyContest pt-3' : 'pt-3'}>
      <div className='text-primary pb-2'>
        {!query.print && (
          <InvestorComparatorFilter
            onSearch={onSearch}
            isShowDissidentFilters
            filterHeading='Proxy Contest Filter'
            searchTitle='Proxy Contest Specific Searches:'
            isExpandFilter
            isShowInvestorSelection={false}
            isMeetingTypeFilter={false}
            isSponsorFilter={false}
            status={props.TrialProductStatus}
            isProxyContestVoting={isStartSearch}
            {...props}
          />
        )}

        <div className='row'>
          <div className='col'>
            {isLoadingInvestorVotingProxyContestData ? (
              props.procedureRunningEstimateTime !== undefined && (
                <div className='vh-100'>
                  <div className='h-50'>
                    <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
                  </div>
                </div>
              )
            ) : (
              <>
                {lstVotingAtProxyContestsData.length > 0 ? (
                  <div>
                    <div className='row pt-3 pb-2 pdfpagebreak' id='loadItem'>
                      <>
                        {Object.keys(votingSummaryAtProxyContests).length > 0 && (
                          <div className={query.print ? 'col-12 col-md-12' : 'col-sm-4'}>
                            <Card title='Voting Summary at Proxy Contests'>
                              <div className={props.TrialStatus ? 'blurrytext' : ''}>
                                {blkProxyContentVotingSummary(
                                  'Number of Proxy Contests Voted',
                                  votingSummaryAtProxyContests.Num_of_Proxy_Contests_Voted !== undefined &&
                                    votingSummaryAtProxyContests.Num_of_Proxy_Contests_Voted !== null
                                    ? votingSummaryAtProxyContests.Num_of_Proxy_Contests_Voted
                                    : 0
                                )}
                                {blkProxyContentVotingSummary(
                                  '% Times Voted Dissident Slate',
                                  votingSummaryAtProxyContests.perc_Times_Voted_Dissident_Card !== undefined &&
                                    votingSummaryAtProxyContests.perc_Times_Voted_Dissident_Card !== null
                                    ? parseFloat(votingSummaryAtProxyContests.perc_Times_Voted_Dissident_Card).toFixed(
                                        1
                                      )
                                    : 'N/A'
                                )}
                                {blkProxyContentVotingSummary(
                                  '% Voted all Dissidents',
                                  votingSummaryAtProxyContests.perc_Voted_all_Dissidents !== undefined &&
                                    votingSummaryAtProxyContests.perc_Voted_all_Dissidents !== null
                                    ? parseFloat(votingSummaryAtProxyContests.perc_Voted_all_Dissidents).toFixed(1)
                                    : 'N/A'
                                )}
                                {blkProxyContentVotingSummary(
                                  '% Match ISS',
                                  votingSummaryAtProxyContests.perc_Match_ISS !== undefined &&
                                    votingSummaryAtProxyContests.perc_Match_ISS !== null
                                    ? parseFloat(votingSummaryAtProxyContests.perc_Match_ISS).toFixed(1)
                                    : 'N/A'
                                )}
                                {blkProxyContentVotingSummary(
                                  '% Match GL',
                                  votingSummaryAtProxyContests.perc_Match_GL !== undefined &&
                                    votingSummaryAtProxyContests.perc_Match_GL !== null
                                    ? parseFloat(votingSummaryAtProxyContests.perc_Match_GL).toFixed(1)
                                    : 'N/A'
                                )}
                              </div>
                            </Card>
                          </div>
                        )}

                        <div className={query.print ? 'col-12 col-md-6' : 'col-sm-4'}>
                          <Card title='% Voted Dissident Slate by Proxy Season'>
                            <div className={props.TrialStatus ? 'blurrytext' : ''}>
                              <ErrorBoundary>
                                <AgChartsReact
                                  options={
                                    votedDissidentCardByProxySeasonChart.options
                                  }
                                />
                              </ErrorBoundary>
                            </div>
                          </Card>
                        </div>
                      </>
                      {lstSupportByDissident.length > 0 && (
                        <div
                          className={
                            query.print ? 'col-12 col-md-6' : 'col-sm-4'
                          }
                        >
                          <ErrorBoundary
                            hasCard
                            cardtitle='Support by Dissident'
                          >
                            <Table
                              IsShowCard
                              pageTitle='Support by Dissident'
                              title='Support by Dissident'
                              smalltitle=''
                              gridOptions={gridOptionSupportbyDissident}
                              enableCharts
                              hideExcelDownloadIcon={
                                props.TrialUserDisableDownload
                              }
                            />
                          </ErrorBoundary>
                        </div>
                      )}
                    </div>

                    {lstVotingAtProxyContestsData.length > 0 && (
                      <div className='row pdfpagebreak'>
                        <div className='col-12'>
                          <ErrorBoundary>
                            <Table
                              title=''
                              smalltitle=''
                              gridOptions={gridOptionProxyContestVotingAllData}
                              enableCharts
                              hideExcelDownloadIcon={
                                props.TrialUserDisableDownload
                              }
                            />
                          </ErrorBoundary>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div id='loadItem'>
                    {!isLoadingInvestorVotingProxyContestData && NORECORDS}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

InvestorVotingProxyContest.propTypes = {
  location: PropTypes.object,
  votingSummaryAtProxyContests: PropTypes.object,
  lstSupportByDissident: PropTypes.array,
  lstVotingAtProxyContestsData: PropTypes.array,
  isTrialStatusForProxyContestVotingData: PropTypes.any,
  lstProxyContestChartData: PropTypes.array,
  getDissidentVotingByInvestorReq: PropTypes.func,
  getSupportByDissidentReq: PropTypes.func,
  getProxyContestsChartDataReq: PropTypes.func,
  userMessage: PropTypes.string,
  isLoadingInvestorVotingProxyContestData: PropTypes.bool,
};

InvestorVotingProxyContest.defaultProps = {
  location: {},
  votingSummaryAtProxyContests: {},
  lstSupportByDissident: [],
  lstVotingAtProxyContestsData: [],
  isTrialStatusForProxyContestVotingData: undefined,
  lstProxyContestChartData: [],
  getDissidentVotingByInvestorReq: () => null,
  getSupportByDissidentReq: () => null,
  getProxyContestsChartDataReq: () => null,
  userMessage: '',
  isLoadingInvestorVotingProxyContestData: true,
};
export default withRouter(InvestorVotingProxyContest);
