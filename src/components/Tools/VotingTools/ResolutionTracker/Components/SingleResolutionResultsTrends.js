import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import ProgressBar from '../../../../GeneralForm/ProgressBar';
import ResolutionTrackerHistoricalChart from './ResolutionTrackerHistoricalChart';
import Table from '../../../../GeneralForm/Table';
import resolutionTrackerToolConst from '../../../../../constants/ResolutionTrackerToolConstant';
import DropdownList from '../../../../GeneralForm/DropdownList';
import msgConst from '../../../../../constants/MessageConstans';
import PageSpinner from '../../../../PageSpinner';
import PDFNavMenu from '../../../../GeneralForm/PDFNavMenu';
import { downloadAllExcelByJsonFn } from '../../../../../utils/exportExcel-util';

const SingleResolutionResultsTrends = (props) => {
  const {
    handleCloseResultsDetail,
    isLoadingHistoricalTrendsData,
    pRunningEstTimeForSingleResDetails,
    lstHistoricalChartData,
    lstHistoricalTrendsTotalVotesAnalysisSummary,
    lstHistoricalTrendsTotalVotesAnalysisDetails,
    handleOnClickIsSelectedFullYearData,
    ddlCalculationMethod,
    ddlCalculationMethodSelection,
    handleOnChangedCalculationMethod,
    isSelectedFullYearData,
    isSelectedYearToDateData,
    isSelectedProxySeasonData,
    lstHistoricalAnalysisChartData,
    lstHistoricalAnalysisChartDataYTD,
    lstHistoricalAnalysisChartProxySeasonData,
  } = props;
  //PDF section start
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const pdfListItem = useRef([]);
  const [downloadAllXLSJson, setDownloadAllXLSJson] = useState([]);
  const [gridOptionSummaryColdef, setgridOptionSummaryColdef] = useState([]);
  const [gridOptionDetailsColdef, setgridOptionDetailsColdef] = useState([]);

  const title = 'Resolution Tool';
  const pdfDataUpdate = useCallback(
    (chartData, tblData) => {
      if (
        props.lstResolutionType !== undefined &&
        props.filterData !== undefined
      ) {
        const lavel = props.lstResolutionType.lavel;
        const proposalType = props.lstResolutionType.proposalType
          ? props.lstResolutionType.proposalType.replaceAll(' ', '_')
          : '';
        const yearLevel = chartData !== null ? chartData : 0;
        const tblData1 =
          tblData !== null
            ? tblData.value.replaceAll(' ', '_')
            : ddlCalculationMethodSelection.value.replaceAll(' ', '_');
        const tblLavel =
          props.resolutionMultiTableData !== null
            ? props.resolutionMultiTableData.lavel
            : null;
        const tblKeyVal =
          props.resolutionMultiTableData !== null
            ? props.resolutionMultiTableData.keyVal.replaceAll(' ', '_')
            : null;
        const tblinvId =
          props.resolutionMultiTableData !== null
            ? props.resolutionMultiTableData.invId
            : null;
        const tblclickFor =
          props.resolutionMultiTableData !== null
            ? props.resolutionMultiTableData.clickFor
            : null;
        const companySearchId = props.filterData.companySearchId;
        const start_date =
          props.filterData.startDate !== null
            ? `"${props.filterData.startDate}"`
            : null;
        const end_date =
          props.filterData.endDate !== null
            ? `"${props.filterData.endDate}"`
            : null;
        const startDate =
          props.filterData.startDate !== null
            ? start_date.replaceAll(' ', '_')
            : null;
        const endDate =
          props.filterData.endDate !== null
            ? end_date.replaceAll(' ', '_')
            : null;
        const meetingType =
          props.filterData.meetingType === ''
            ? null
            : props.filterData.meetingType;
        const proponent =
          props.filterData.proponent === '' ? null : props.filterData.proponent;
        const proposalSponsor = props.filterData.proposalSponsor;
        const url = `${window.origin}/tools/voting/resolutiontracker?level=${lavel}&proposalType=${proposalType}&yearLevel=${yearLevel}&tblData=${tblData1}&tblLavel=${tblLavel}&tblKeyVal="${tblKeyVal}"&tblinvId=${tblinvId}&tblclickFor=${tblclickFor}&companySearchId=${companySearchId}&startDate=${startDate}&endDate=${endDate}&meetingType=${meetingType}&proponent=${proponent}&proposalSponsor=${proposalSponsor}&print=1`;
        // const url = `${window.origin}/tools/voting/resolutiontracker?print=1`;
        pdfListItem.current = [
          //#region companyoverview
          {
            id: 'Resolution_historical_trends',
            module: 'Resolution_tools',
            to: url,
            name: 'Resolution Historical Trends',
            checked: true,
            disabled: false,
            pdfPageName: 'Resolution Historical Trends',
          },
          //#endregion
        ];
      }
    },
    [
      props.lstResolutionType,
      props.resolutionChartLevel,
      props.resolutionDdlData,
    ]
  );

  useEffect(() => {
    if (!isLoadingHistoricalTrendsData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, [1000]);
    }
  }, [isLoadingHistoricalTrendsData]);

  useEffect(() => {
    // getPDfList();
    pdfDataUpdate(props.resolutionChartLevel, props.resolutionDdlData);
    // pdfDataUpdate(props.chartYearDataPDF, props.lineChartShowData);
  }, [pdfDataUpdate]);

  const callbackHandlePDFListItems = useCallback(
    (pdfListItem) => {
      props.handlePDFListItems(pdfListItem);
    },
    [props.handlePDFListItems, pdfDataUpdate]
  );

  useEffect(() => {
    const abortController = new AbortController();
    callbackHandlePDFListItems(pdfListItem.current);
    return function cleanup() {
      abortController.abort();
    };
  }, [callbackHandlePDFListItems, pdfDataUpdate]);

  useEffect(() => {
    const arr = [];
    if (lstHistoricalAnalysisChartData.length > 0 && isSelectedFullYearData) {
      const uniquedisplay_year = [
        ...new Set(
          props.lstHistoricalAnalysisChartData.map((x) => x.meeting_year)
        ),
      ];
      arr.push({
        meeting_year_5: uniquedisplay_year[uniquedisplay_year.length - 5],
        meeting_year_4: uniquedisplay_year[uniquedisplay_year.length - 4],
        meeting_year_3: uniquedisplay_year[uniquedisplay_year.length - 3],
        meeting_year_2: uniquedisplay_year[uniquedisplay_year.length - 2],
        meeting_year_1: uniquedisplay_year[uniquedisplay_year.length - 1],
      });
    }
    if (
      lstHistoricalAnalysisChartDataYTD.length > 0 &&
      isSelectedYearToDateData
    ) {
      const uniquedisplay_year = [
        ...new Set(
          props.lstHistoricalAnalysisChartDataYTD.map((x) => x.meeting_year)
        ),
      ];
      arr.push({
        meeting_year_5: uniquedisplay_year[uniquedisplay_year.length - 5],
        meeting_year_4: uniquedisplay_year[uniquedisplay_year.length - 4],
        meeting_year_3: uniquedisplay_year[uniquedisplay_year.length - 3],
        meeting_year_2: uniquedisplay_year[uniquedisplay_year.length - 2],
        meeting_year_1: uniquedisplay_year[uniquedisplay_year.length - 1],
      });
    }
    if (
      lstHistoricalAnalysisChartProxySeasonData.length > 0 &&
      isSelectedProxySeasonData
    ) {
      const uniquedisplay_year = [
        ...new Set(
          props.lstHistoricalAnalysisChartProxySeasonData.map(
            (x) => x.meeting_year
          )
        ),
      ];
      arr.push({
        meeting_year_5: uniquedisplay_year[uniquedisplay_year.length - 5],
        meeting_year_4: uniquedisplay_year[uniquedisplay_year.length - 4],
        meeting_year_3: uniquedisplay_year[uniquedisplay_year.length - 3],
        meeting_year_2: uniquedisplay_year[uniquedisplay_year.length - 2],
        meeting_year_1: uniquedisplay_year[uniquedisplay_year.length - 1],
      });
    }
    const yearHeader = arr.length > 0 ? arr[0] : null;
    if (yearHeader !== null) {
      const coldefSummary = [
        {
          headerName: '',
          children: [
            {
              headerName: 'Summary',
              field: 'detail',
              minWidth: 250,
              maxWidth: query.print ? 260 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_5 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y4 Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y4 Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_4 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y3 Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y3 Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_3 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y2 Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y2 Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_2 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y1 Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y1 Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_1 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y0 Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y0 Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
      ];
      setgridOptionSummaryColdef(coldefSummary);

      const coldefDetail = [
        {
          headerName: '',
          children: [
            {
              headerName: 'Details',
              field: 'detail',
              minWidth: 250,
              maxWidth: query.print ? 250 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_5 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y4Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y4Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_4 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y3Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y3Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_3 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y2Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y2Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_2 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y1Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y1Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_1 : '',
          children: [
            {
              headerName: 'Number',
              field: 'Y0Number',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
            {
              headerName: 'Percent',
              field: 'Y0Perc',
              minWidth: 20,
              maxWidth: query.print ? 100 : null,
            },
          ],
        },
      ];
      setgridOptionDetailsColdef(coldefDetail);
    }
  }, [
    lstHistoricalAnalysisChartData,
    lstHistoricalAnalysisChartDataYTD,
    lstHistoricalAnalysisChartProxySeasonData,
    isSelectedFullYearData,
    isSelectedProxySeasonData,
    isSelectedYearToDateData,
  ]);

  //PDF section end
  const gridOptionSummary = {
    colDefsMedalsIncluded: gridOptionSummaryColdef,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
      groupHeaderHeight: query.print ? 70 : null,
    },
    rowData: lstHistoricalTrendsTotalVotesAnalysisSummary.map((x) => ({
      ...x,
      ['Y4 Perc']:
        x['Y4 Perc'] !== null && x['Y4 Perc'] !== undefined
          ? `${parseFloat(x['Y4 Perc']).toFixed(1)}%`
          : '',
      ['Y3 Perc']:
        x['Y3 Perc'] !== null && x['Y3 Perc'] !== undefined
          ? `${parseFloat(x['Y3 Perc']).toFixed(1)}%`
          : '',
      ['Y2 Perc']:
        x['Y2 Perc'] !== null && x['Y2 Perc'] !== undefined
          ? `${parseFloat(x['Y2 Perc']).toFixed(1)}%`
          : '',
      ['Y1 Perc']:
        x['Y1 Perc'] !== null && x['Y1 Perc'] !== undefined
          ? `${parseFloat(x['Y1 Perc']).toFixed(1)}%`
          : '',
      ['Y0 Perc']:
        x['Y0 Perc'] !== null && x['Y0 Perc'] !== undefined
          ? `${parseFloat(x['Y0 Perc']).toFixed(1)}%`
          : '',
      TrialStatus: false,
      allowDownload: true,
    })),
    headerHeight: query.print ? 40 : null,
    domLayout: 'autoHeight',
    // animateRows: true,
  };

  const gridOptionDetails = {
    enableCharts: true,
    colDefsMedalsIncluded: gridOptionDetailsColdef,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
      groupHeaderHeight: query.print ? 70 : null,
    },
    rowData: lstHistoricalTrendsTotalVotesAnalysisDetails.map((x) => ({
      ...x,
      Y4Perc:
        x.Y4Perc !== null && x.Y4Perc !== undefined
          ? `${parseFloat(x.Y4Perc).toFixed(1)}%`
          : '',
      Y3Perc:
        x.Y3Perc !== null && x.Y3Perc !== undefined
          ? `${parseFloat(x.Y3Perc).toFixed(1)}%`
          : '',
      Y2Perc:
        x.Y2Perc !== null && x.Y2Perc !== undefined
          ? `${parseFloat(x.Y2Perc).toFixed(1)}%`
          : '',
      Y1Perc:
        x.Y1Perc !== null && x.Y1Perc !== undefined
          ? `${parseFloat(x.Y1Perc).toFixed(1)}%`
          : '',
      Y0Perc:
        x.Y0Perc !== null && x.Y0Perc !== undefined
          ? `${parseFloat(x.Y0Perc).toFixed(1)}%`
          : '',
      TrialStatus: false,
      allowDownload: true,
    })),
    headerHeight: query.print ? 40 : null,
    domLayout: 'autoHeight',
    // animateRows: true,
  };

  useEffect(() => {
    const allxls = [
      {
        type: 'header',
        title: title,
      },
      {
        type: 'table',
        data:
          props.multiresolutionTableData !== null &&
          props.multiresolutionTableData.data, //props.issuerMeetingStatsList,
        colDef:
          props.multiresolutionTableData !== null &&
          props.multiresolutionTableData.colDefsMedalsIncluded,
        excludeCol: ['proposal_type_id', 'HistoricalTrends'],
      },
      {
        type: 'header',
        title: 'Historical Trends',
      },
      {
        type: 'table',
        data: gridOptionSummary.rowData, //props.getProposalList,
        colDef: gridOptionSummaryColdef,
      },
      {
        type: 'table',
        data: gridOptionDetails.rowData, //props.getProposalList,
        colDef: gridOptionDetailsColdef,
      },
    ];

    setDownloadAllXLSJson(allxls);
  }, [
    props.multiresolutionTableData,
    lstHistoricalTrendsTotalVotesAnalysisSummary,
    lstHistoricalTrendsTotalVotesAnalysisDetails,
    gridOptionSummaryColdef,
    gridOptionDetailsColdef,
  ]);

  return (
    <div className={!query.print ? 'row card mx-1 mt-4' : ''}>
      <div>
        {lstHistoricalTrendsTotalVotesAnalysisDetails !== undefined &&
          lstHistoricalTrendsTotalVotesAnalysisDetails.length > 0 && (
            <div className='row float-end'>
              <button
                type='button'
                className='btn btn-link cursor-pointer'
                disabled={props.loadingData}
                title='Download all to xls'
                onClick={() =>
                  downloadAllExcelByJsonFn(
                    downloadAllXLSJson,
                    'VotingOverview',
                    `${title}_VotingOverview`
                  )
                }
              >
                <u>Download all to xls</u>
              </button>
            </div>
          )}
      </div>
      <div className='row mt-3'>
        <div className='col-6 mb-0'>
          <h4>Historical Trends</h4>
        </div>
        <div className='col-3 mb-0' />
        <div className='col-3 mb-0'>
          {!query.print && (
            <>
              {lstHistoricalTrendsTotalVotesAnalysisDetails !== undefined &&
                lstHistoricalTrendsTotalVotesAnalysisDetails.length > 0 && (
                  <PDFNavMenu
                    isInvestorComparator
                    handlePDFListItems={props.handlePDFListItems}
                    pdfListItems={props.pdfListItems}
                    handlePDFDownloadCancelClick={
                      props.handlePDFDownloadCancelClick
                    }
                    handlePDFMenuShow={props.handlePDFMenuShow}
                    pdfMenuShow={props.pdfMenuShow}
                    pdfDownloadNotification={props.pdfDownloadNotification}
                    handlePDFDownloadNotification={
                      props.handlePDFDownloadNotification
                    }
                    handleGeneratePDF={props.handleGeneratePDF}
                    trialUserDisableDownload={props.trialUserDisableDownload}
                    pdfDownloadLoader={props.pdfDownloadLoader}
                    handlePDFDownloadLoader={props.handlePDFDownloadLoader}
                    location={props.location}
                    pdfDropdownHeightClassname='invHistoricTrendsPDFMenuListHeight'
                    pdfBtnClassnames='pdfBtnResolutionTool'
                  />
                )}
              <button
                type='button'
                className='btn btn-primary btn-sm float-end'
                onClick={handleCloseResultsDetail}
              >
                Close Trends
              </button>
            </>
          )}
        </div>
      </div>
      <>
        {isLoadingHistoricalTrendsData ? (
          pRunningEstTimeForSingleResDetails !== undefined ? (
            <div className='vh-100'>
              <div className='h-50'>
                <ProgressBar
                  avgElapsedTime={pRunningEstTimeForSingleResDetails}
                />
              </div>
            </div>
          ) : (
            <div>{msgConst.LOADING}</div>
          )
        ) : (
          <>
            <div id='loadItem' />
            <div className='row'>
              {lstHistoricalChartData !== undefined &&
              lstHistoricalChartData.length === 0 &&
              lstHistoricalAnalysisChartData.length === 0 &&
              lstHistoricalAnalysisChartDataYTD.length === 0 &&
              lstHistoricalAnalysisChartProxySeasonData.length === 0 ? (
                <div className='col-lg-offset-3 pt-5 pb-5'>
                  <PageSpinner spinner='border' />
                </div>
              ) : (
                <>
                  <div className='col-12'>
                    <button
                      type='button'
                      disabled={isSelectedProxySeasonData}
                      className={
                        isSelectedProxySeasonData
                          ? 'btn btn-outline-primary float-end ms-1 btn-sm'
                          : 'btn btn-primary float-end ms-1 btn-sm'
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnClickIsSelectedFullYearData(
                          resolutionTrackerToolConst.USE_PROXY_SEASON_DATA
                        );
                      }}
                    >
                      Use Proxy Season Data
                    </button>
                    <button
                      type='button'
                      disabled={isSelectedYearToDateData}
                      className={
                        isSelectedYearToDateData
                          ? 'btn btn-outline-primary float-end ms-1 btn-sm'
                          : 'btn btn-primary float-end ms-1 btn-sm'
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnClickIsSelectedFullYearData(
                          resolutionTrackerToolConst.USE_YEAR_TO_DATE_DATA
                        );
                      }}
                    >
                      Use Year-to-Date Data
                    </button>
                    <button
                      type='button'
                      disabled={isSelectedFullYearData}
                      className={
                        isSelectedFullYearData
                          ? 'btn btn-outline-primary float-end ms-1 btn-sm'
                          : 'btn btn-primary float-end ms-1 btn-sm'
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnClickIsSelectedFullYearData(
                          resolutionTrackerToolConst.USE_CALENDAR_YEAR_DATA
                        );
                      }}
                    >
                      Use Calendar Year Data
                    </button>
                  </div>
                  <div className='row justify-content-center p-0'>
                    <div className='col-md-6 col-12'>
                      <ResolutionTrackerHistoricalChart
                        chartData={lstHistoricalChartData}
                        location={props.location}
                      />
                    </div>
                  </div>
                </>
              )}

              {lstHistoricalTrendsTotalVotesAnalysisSummary !== undefined &&
                lstHistoricalTrendsTotalVotesAnalysisSummary.length > 0 && (
                  <div className='col-12 pdfpagebreak'>
                    <Table
                      IsShowCard={false}
                      title='Resolution Tracker Details'
                      smalltitle=''
                      gridOptions={gridOptionSummary}
                      enableCharts
                    />
                  </div>
                )}

              {lstHistoricalTrendsTotalVotesAnalysisDetails !== undefined &&
                lstHistoricalTrendsTotalVotesAnalysisDetails.length > 0 && (
                  <>
                    <div className='d-flex align-items-center mb-2 row'>
                      <div className='col-sm-3 col-12'>
                        <span className='text-primary fw-bold'>
                          Select Calculation Method :
                        </span>
                      </div>
                      <div className='col-sm-9 col-12 text-left'>
                        <DropdownList
                          handleChange={async (e) => {
                            await handleOnChangedCalculationMethod(e);
                          }}
                          isMulti={false}
                          options={ddlCalculationMethod}
                          Dvalue={ddlCalculationMethodSelection}
                          placeholder=''
                        />
                      </div>
                    </div>

                    <div className='col-12 pdfpagebreak'>
                      <Table
                        IsShowCard={false}
                        title=''
                        hideExcelDownloadIcon
                        smalltitle=''
                        gridOptions={gridOptionDetails}
                        enableCharts
                      />
                    </div>
                  </>
                )}
            </div>

            {lstHistoricalTrendsTotalVotesAnalysisDetails !== undefined &&
              lstHistoricalTrendsTotalVotesAnalysisDetails.length === 0 &&
              lstHistoricalTrendsTotalVotesAnalysisSummary !== undefined &&
              lstHistoricalTrendsTotalVotesAnalysisSummary.length > 0 &&
              lstHistoricalChartData !== undefined &&
              lstHistoricalChartData.length === 0 && (
                <div>{msgConst.SUPPORT_TEAM_EMAIL_MSG}</div>
              )}
          </>
        )}
      </>
    </div>
  );
};

SingleResolutionResultsTrends.propTypes = {
  handleCloseResultsDetail: PropTypes.func,
  handleOnClickIsSelectedFullYearData: PropTypes.func,
  handleOnChangedCalculationMethod: PropTypes.func,
  isLoadingHistoricalTrendsData: PropTypes.bool,
  isSelectedFullYearData: PropTypes.bool,
  pRunningEstTimeForSingleResDetails: PropTypes.number,
  lstHistoricalChartData: PropTypes.array,
  lstHistoricalTrendsTotalVotesAnalysisSummary: PropTypes.array,
  lstHistoricalTrendsTotalVotesAnalysisDetails: PropTypes.array,
  ddlCalculationMethod: PropTypes.array,
  ddlCalculationMethodSelection: PropTypes.object,
};

SingleResolutionResultsTrends.defaultProps = {
  handleCloseResultsDetail: () => null,
  handleOnClickIsSelectedFullYearData: () => null,
  handleOnChangedCalculationMethod: () => null,
  isLoadingHistoricalTrendsData: true,
  isSelectedFullYearData: true,
  pRunningEstTimeForSingleResDetails: undefined,
  lstHistoricalChartData: [],
  lstHistoricalTrendsTotalVotesAnalysisSummary: [],
  lstHistoricalTrendsTotalVotesAnalysisDetails: [],
  ddlCalculationMethod: [],
  ddlCalculationMethodSelection: {},
};

export default SingleResolutionResultsTrends;
