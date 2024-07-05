import React, { useEffect, useRef, useCallback, useState } from 'react';
import qs from 'qs';
import PDFNavMenu from '../../../GeneralForm/PDFNavMenu';
import DropdownList from '../../../GeneralForm/DropdownList';
import D3GroupbarChart from '../../../GeneralForm/D3GroupbarChart';
import InvestorComparatorConstant from '../../../../constants/InvestorComparatorConstant';
import msgConst from '../../../../constants/MessageConstans';
import resolutionTrackerToolConst from '../../../../constants/ResolutionTrackerToolConstant';
import D3HistoricalTrendsLineChart from '../../../GeneralForm/D3HistoricalTrendsLineChart';
import {
  filters,
  setNextGroupColumnText,
} from '../../../../utils/AgGridFunctions';
import pathConst from '../../../../constants/PathsConstant';
import Table from '../../../GeneralForm/Table';
import Page from '../../../Page';
import PageSpinner from '../../../../components/PageSpinner';

function HistoricalTrendsPDF(props) {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  // const [chartYearDataPDF, setChartYearDataPDF] = useState(null);
  const [gridOptionTrendsColdef, setgridOptionTrendsColdef] = useState([]);
  const [lineChart, setLineChart] = useState(null);
  const [yearRange, setYearRange] = useState([]);

  const {
    INVESTOR_COMPARATOR_HISTORICAL_TRENDS_FOR,
    INVESTOR_COMPARATOR_HISTORICAL_TRENDS_AGAINST,
    INVESTOR_COMPARATOR_HISTORICAL_TRENDS_ABSTAIN,
  } = InvestorComparatorConstant;

  if (!props.isLoadHistoricalTrends) {
    setTimeout(() => {
      const doc = document.getElementById('loadItem');
      const loadedItem = document.createElement('div');
      doc && doc.appendChild(loadedItem);
      loadedItem.setAttribute('id', 'loadedItem');
    }, [1000]);
  }

  const pdfListItem = useRef([]);
  const pdfDataUpdate = useCallback(
    (barChartData, lineChartParam, ddlSelectedList) => {
      // setFilterData={setFilterData}
      if (
        props.isProposalType !== undefined &&
        props.filterData !== undefined &&
        props.filterData !== null
      ) {
        let ddlValues = '';
        if (ddlSelectedList !== null && ddlSelectedList.length > 0) {
          ddlSelectedList.forEach((e, i) => {
            if (ddlSelectedList.length - 1 === i) {
              ddlValues += `,${e.value},`;
            } else {
              ddlValues += `,${e.value}`;
            }
          });
        }
        const endDate =
          props.filterData.endDate !== null
            ? props.filterData.endDate.toString().replaceAll(' ', '_')
            : null;
        const startDate =
          props.filterData.startDate !== null
            ? props.filterData.startDate.toString().replaceAll(' ', '_')
            : null;
        const companySearchId =
          props.filterData.companySearchId !== null
            ? props.filterData.companySearchId
            : null;
        const investorSearchId =
          props.filterData.investorSearchId !== null
            ? props.filterData.investorSearchId
            : null;
        const meetingType =
          props.filterData.meetingType !== ''
            ? props.filterData.meetingType
            : null;
        const proponent =
          props.filterData.proponent !== '' ? props.filterData.proponent : null;
        const sponsor =
          props.filterData.sponsor !== null ? props.filterData.sponsor : null;

        const lavel = props.isProposalType.lavel;
        const proposalType = props.isProposalType.proposalType
          .replaceAll('&', '@')
          .replaceAll(' ', '_');
        const yearLevel = barChartData !== null ? barChartData : 0;
        const lineChartParams =
          lineChartParam !== null ? lineChartParam : 'FOR';
        const url = `${window.origin}/tools/voting/investorcomparator/historicaltrends?level=${lavel}&proposalType=${proposalType}&yearLevel=${yearLevel}&lineChartParams=${lineChartParams}&endDate=${endDate}&startDate=${startDate}&companySearchId=${companySearchId}&investorSearchId=${investorSearchId}&meetingType=${meetingType}&proponent=${proponent}&sponsor=${sponsor}&ddlValues=${ddlValues}&print=1`;
        pdfListItem.current = [
          //#region companyoverview
          {
            id: 'Historical_trends',
            module: 'overview',
            to: url,
            name: 'Historical Trends',
            checked: true,
            disabled: false,
            pdfPageName: 'Historical Trends',
          },
          //#endregion
        ];
      }
    },
    [
      props.chartYearDataPDF,
      props.lineChartShowData,
      props.DdlhistoricalInvestorSelection,
      props.DdlhistoricalInvestorSelection.length,
    ]
  );
  useEffect(() => {
    pdfDataUpdate(
      props.chartYearDataPDF,
      props.lineChartShowData,
      props.DdlhistoricalInvestorSelection
    );
  }, [
    props.isProposalType,
    props.DdlhistoricalInvestorSelection,
    props.DdlhistoricalInvestorSelection.length,
  ]);

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
    const uniquedisplay_year = [
      ...new Set(props.lstStackBarChartData.map((x) => x.display_year)),
    ];
    if (props.isSelectedYearToDateData || props.isSelectedCalendarYearData) {
      setYearRange(uniquedisplay_year);
      arr.push({
        meeting_year_7: uniquedisplay_year[uniquedisplay_year.length - 7],
        meeting_year_6: uniquedisplay_year[uniquedisplay_year.length - 6],
        meeting_year_5: uniquedisplay_year[uniquedisplay_year.length - 5],
        meeting_year_4: uniquedisplay_year[uniquedisplay_year.length - 4],
        meeting_year_3: uniquedisplay_year[uniquedisplay_year.length - 3],
        meeting_year_2: uniquedisplay_year[uniquedisplay_year.length - 2],
        meeting_year_1: uniquedisplay_year[uniquedisplay_year.length - 1],
      });
    }
    if (props.isSelectedProxySeasonData) {
      let data = '';
      if (uniquedisplay_year.length < 7) {
        data = '2015-16';
        setYearRange([data, ...uniquedisplay_year]);
      }
      arr.push({
        meeting_year_7: data,
        meeting_year_6: uniquedisplay_year[uniquedisplay_year.length - 6],
        meeting_year_5: uniquedisplay_year[uniquedisplay_year.length - 5],
        meeting_year_4: uniquedisplay_year[uniquedisplay_year.length - 4],
        meeting_year_3: uniquedisplay_year[uniquedisplay_year.length - 3],
        meeting_year_2: uniquedisplay_year[uniquedisplay_year.length - 2],
        meeting_year_1: uniquedisplay_year[uniquedisplay_year.length - 1],
      });
    }

    const yearHeader = arr.length > 0 ? arr[0] : null;
    if (yearHeader !== null) {
      const coldefTrends = [
        {
          headerName: 'Investor',
          field: 'Investor',
          minWidth: 280,
          chartDataType: 'category',
          tyep: ['autoHeightTrue'],
          cellClass: 'ws-normal-lh24 ps-1 pe-1',
          cellRenderer: (params) => {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<a rel="noopener noreferrer" class="text-secondary" 
                  href="${pathConst.INVESTOR_VOTING_OVERVIEW}${pathConst.QUERY_INVESTOR}${params.data.investor_id}">
                  ${params.data.Investor}</a>`;
            return eDiv;
          },
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_7 : '',
          valueGetter(params) {
            if (params.data !== undefined) {
              if (params.data.year6 === null) {
                return '-';
              }
              return params.data.year6;
            }
            return '';
          },
          tyep: ['autoHeightTrue'],
          cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          minWidth: 20,
          maxWidth: query.print ? 100 : null,
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_6 : '',
          valueGetter(params) {
            if (params.data !== undefined) {
              if (params.data.year5 === null) {
                return '-';
              }
              return params.data.year5;
            }
            return '';
          },
          tyep: ['autoHeightTrue'],
          cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          minWidth: 20,
          maxWidth: query.print ? 100 : null,
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_5 : '',
          valueGetter(params) {
            if (params.data !== undefined) {
              if (params.data.year4 === null) {
                return '-';
              }
              return params.data.year4;
            }
            return '';
          },
          tyep: ['autoHeightTrue'],
          cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          minWidth: 20,
          maxWidth: query.print ? 100 : null,
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_4 : '',
          valueGetter(params) {
            if (params.data !== undefined) {
              if (params.data.year3 === null) {
                return '-';
              }
              return params.data.year3;
            }
            return '';
          },
          tyep: ['autoHeightTrue'],
          cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          minWidth: 20,
          maxWidth: query.print ? 100 : null,
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_3 : '',
          valueGetter(params) {
            if (params.data !== undefined) {
              if (params.data.year2 === null) {
                return '-';
              }
              return params.data.year2;
            }
            return '';
          },
          tyep: ['autoHeightTrue'],
          cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          minWidth: 20,
          maxWidth: query.print ? 100 : null,
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_2 : '',
          valueGetter(params) {
            if (params.data !== undefined) {
              if (params.data.year1 === null) {
                return '-';
              }
              return params.data.year1;
            }
            return '';
          },
          tyep: ['autoHeightTrue'],
          cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          minWidth: 20,
          maxWidth: query.print ? 100 : null,
        },
        {
          headerName: yearHeader !== null ? yearHeader.meeting_year_1 : '',
          valueGetter(params) {
            if (params.data !== undefined) {
              if (params.data.current === null) {
                return '-';
              }
              return params.data.current;
            }
            return '';
          },
          tyep: ['autoHeightTrue'],
          cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          minWidth: 20,
          maxWidth: query.print ? 100 : null,
        },
      ];
      setgridOptionTrendsColdef(coldefTrends);
    }
  }, [
    props.isSelectedProxySeasonData,
    props.isSelectedYearToDateData,
    props.isSelectedCalendarYearData,
    props.lstStackBarChartData,
  ]);

  useEffect(() => {
    if (props.lstLineChartData.length > 0 && yearRange.length > 0) {
      setLineChart(
        <div className='col-12'>
          <D3HistoricalTrendsLineChart
            lineChartData={props.lstLineChartData}
            yearRange={yearRange}
          />
        </div>
      );
    }
  }, [props.lstLineChartData, yearRange]);

  const gridOptionHistoricalTrends = {
    enableCharts: true,
    colDefsMedalsIncluded: gridOptionTrendsColdef,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'Investor',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: props.lstHistoricalInvestors.map((x) => ({
      ...x,
      TrialStatus: false,
      allowDownload: false,
    })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    quickSearchFilter: false,
    domLayout: 'normal',
    gridHeight: '80vh',
    animateRows: true,
    suppressAggFuncInHeader: true,
  };

  return (
    <Page>
      {props.lstStackBarChartData.length > 0 ? (
        <>
          <div className={!query.print ? 'row mt-3' : 'row'}>
            <div className='col-6 mb-0'>
              <h4>Historical Trends</h4>
            </div>
            <div className='col-3 mb-0' />
            <div className='col-3 mb-0'>
              {!query.print && (
                <>
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
                    pdfBtnClassnames='pdfCustomStyleTool'
                  />
                  <button
                    type='button'
                    className='btn btn-primary btn-sm float-end'
                    style={{
                      position: 'absolute',
                      right: '125px',
                      top: '14.5px',
                    }}
                    onClick={props.handleCloseInvestorDetails}
                  >
                    Close Historical Trends
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={!query.print ? 'row mb-1' : 'row'}>
            <div className='col-12'>
              <button
                type='button'
                disabled={props.isSelectedProxySeasonData}
                className={
                  props.isSelectedProxySeasonData
                    ? 'btn btn-outline-primary float-end ms-1 btn-sm'
                    : 'btn btn-primary float-end ms-1 btn-sm'
                }
                onClick={(e) => {
                  e.preventDefault();
                  props.handleOnClickIsSelectedFullYearData(
                    resolutionTrackerToolConst.USE_PROXY_SEASON_DATA
                  );
                  pdfDataUpdate(
                    resolutionTrackerToolConst.USE_PROXY_SEASON_DATA,
                    props.lineChartShowData,
                    null
                  );
                }}
              >
                Use Proxy Season Data
              </button>
              <button
                type='button'
                disabled={props.isSelectedYearToDateData}
                className={
                  props.isSelectedYearToDateData
                    ? 'btn btn-outline-primary float-end ms-1 btn-sm'
                    : 'btn btn-primary float-end ms-1 btn-sm'
                }
                onClick={(e) => {
                  e.preventDefault();
                  props.handleOnClickIsSelectedFullYearData(
                    resolutionTrackerToolConst.USE_YEAR_TO_DATE_DATA
                  );
                  pdfDataUpdate(
                    resolutionTrackerToolConst.USE_YEAR_TO_DATE_DATA,
                    props.lineChartShowData,
                    null
                  );
                }}
              >
                Use Year-to-Date Data
              </button>
              <button
                type='button'
                disabled={props.isSelectedCalendarYearData}
                className={
                  props.isSelectedCalendarYearData
                    ? 'btn btn-outline-primary float-end ms-1 btn-sm'
                    : 'btn btn-primary float-end ms-1 btn-sm'
                }
                onClick={(e) => {
                  e.preventDefault();
                  props.handleOnClickIsSelectedFullYearData(
                    resolutionTrackerToolConst.USE_CALENDAR_YEAR_DATA
                  );
                  pdfDataUpdate(
                    resolutionTrackerToolConst.USE_CALENDAR_YEAR_DATA,
                    props.lineChartShowData,
                    null
                  );
                }}
              >
                Use Calendar Year Data
              </button>
            </div>

            {props.lstDdlHistoricalsInvestors !== undefined &&
              props.lstDdlHistoricalsInvestors.length > 0 &&
              props.lstStackBarChartData !== undefined &&
              props.lstStackBarChartData.length > 0 && (
                <div className='col'>
                  <DropdownList
                    handleChange={async (e) => {
                      await props.handleOnChangeHistoricalInvestor(e);
                    }}
                    isMulti
                    options={props.lstDdlHistoricalsInvestors}
                    Dvalue={props.DdlhistoricalInvestorSelection}
                    placeholder='(Optional) Choose one or more investor…'
                    classNames={query.print ? 'dropdownPdf' : ''}
                  />
                </div>
              )}
          </div>
          <div id='loadItem' />
          {props.lstStackBarChartData !== undefined &&
          props.lstStackBarChartData.length === 0 ? (
            <div className='pt-5 pb-5'>
              <PageSpinner spinner='border' />
            </div>
          ) : (
            <>
              {props.lstStackBarChartData.length > 0 && (
                <div className='row'>
                  <div className='col-12'>
                    <p
                      className='text-primary'
                      style={{
                        fontSize: query.print ? '0.7rem' : '0.9rem',
                        margin: 0,
                      }}
                    >
                      Add or remove investors from the above drop down list to
                      compare investors over time in the following graphs. Click
                      in the box and type to search. If your investor is not
                      available to select, then it is unlikely to have had any
                      voting for these search criteria, over the time period.
                    </p>
                  </div>
                  <div className='col-12'>
                    <D3GroupbarChart
                      chartdata={props.lstStackBarChartData}
                      isPrint={query.print}
                    />
                  </div>
                </div>
              )}
              <div className='col-12'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='rdoHistoricalSelection'
                    id='chkShowFor'
                    value='1'
                    onClick={() => {
                      props.handleHistoricalTrendsSelection(
                        INVESTOR_COMPARATOR_HISTORICAL_TRENDS_FOR
                      );
                      pdfDataUpdate(
                        props.chartYearDataPDF,
                        INVESTOR_COMPARATOR_HISTORICAL_TRENDS_FOR,
                        props.DdlhistoricalInvestorSelection
                      );
                    }}
                    checked={props.isShowHistoricalTrendsFor}
                    onChange={(e) => {}}
                  />
                  <label className='form-check-label' htmlFor='chkShowFor'>
                    Show For %
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='rdoHistoricalSelection'
                    id='chkAgainst'
                    value='2'
                    onClick={() => {
                      props.handleHistoricalTrendsSelection(
                        INVESTOR_COMPARATOR_HISTORICAL_TRENDS_AGAINST
                      );
                      pdfDataUpdate(
                        props.chartYearDataPDF,
                        INVESTOR_COMPARATOR_HISTORICAL_TRENDS_AGAINST,
                        props.DdlhistoricalInvestorSelection
                      );
                    }}
                    checked={props.isShowHistoricalTrendsAgainst}
                    onChange={(e) => {}}
                  />
                  <label className='form-check-label' htmlFor='chkAgainst'>
                    Show Against %
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='rdoHistoricalSelection'
                    id='chkAbstain'
                    value='4'
                    onClick={() => {
                      props.handleHistoricalTrendsSelection(
                        INVESTOR_COMPARATOR_HISTORICAL_TRENDS_ABSTAIN
                      );
                      pdfDataUpdate(
                        props.chartYearDataPDF,
                        INVESTOR_COMPARATOR_HISTORICAL_TRENDS_ABSTAIN,
                        props.DdlhistoricalInvestorSelection
                      );
                    }}
                    checked={props.isShowHistoricalTrendsAbstain}
                    onChange={(e) => {}}
                  />
                  <label className='form-check-label' htmlFor='chkAbstain'>
                    Show Abstain %
                  </label>
                </div>
              </div>

              {lineChart}

              {props.lstHistoricalInvestors.length > 0 && (
                <div className='col-12'>
                  <div className='row pdfpagebreak pt-2 pb-2'>
                    <Table
                      IsShowCard={false}
                      title=''
                      smalltitle=''
                      gridOptions={gridOptionHistoricalTrends}
                      enableCharts
                      hideExcelDownloadIcon={props.trialUserDisableDownload}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        msgConst.LOADING
      )}
    </Page>
  );
}

export default HistoricalTrendsPDF;
