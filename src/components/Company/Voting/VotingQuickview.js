import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../GeneralForm/Table';
import DropdownList from '../../GeneralForm/DropdownList';
import messageConst from '../../../constants/MessageConstans';
import pathConst, {
  ICON_IMAGE_PATH,
  QUERY_MEETING,
  INVESTOR_VOTING_OVERVIEW,
  QUERY_INVESTOR,
} from '../../../constants/PathsConstant';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import Card from '../../GeneralForm/Card';
import {
  NUMBER_TWO,
  NUMBER_ONE,
  NUMBER_THREE,
  NUMBER_FOUR,
  NUMBER_FIVE,
  NUMBER_SIX,
  NUMBER_SEVEN,
  NUMBER_EIGHT,
  NUMBER_NINE,
  NUMBER_TEN,
  NUMBER_ELEVEN,
  NUMBER_TWELVE,
  NUMBER_THIRTEEN,
  NUMBER_FOURTEEN,
  NUMBER_FIFTEEN,
  NUMBER_SIXTEEN,
  NUMBER_SEVENTEEN,
  NUMBER_EIGHTEEN,
  NUMBER_TWO_HUNDRED,
  NUMBER_FIFTY,
  NUMBER_ZERO,
} from '../../../constants/NumberConstants';
import { loadingRenderer, NameToImageIcon, filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const VotingQuickview = ({
  location,
  issuerCompanyProfile,
  selectedMeetingDates,
  meetingQuickViewDynamicHeadingList,
  meetingQuickViewDynamicList,
  TrialUser,
  allowDownload,
  handleResetLoading,
  listMeetingDates,
  TrialUserDisableDownload,
  loadingData,
  history,
  handleSplitVotingDetails,
  getSplitVotingDetailsReq,
  splitVotingDetail,
  splitVotingLable,
}) => {
  const [grid, setGrid] = React.useState(0);
  const [getDataJson, setgetDataJson] = React.useState([]);
  const [getRowDataJson, setgetRowDataJson] = React.useState([]);
  const [isSplitValue, setIsSplitValue] = React.useState(false);
  const [isLoadingData, setLoadingData] = React.useState(false);
  const [tblHeader, setTblHeader] = React.useState(null);
  const title = issuerCompanyProfile !== undefined ? issuerCompanyProfile.Company_name : '';
  let c = NUMBER_ZERO;
  let timeOutVar = NUMBER_TWO;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const timeoutNum = String(meetingQuickViewDynamicList !== undefined && meetingQuickViewDynamicList.length)[
    NUMBER_ZERO
  ];
  if (meetingQuickViewDynamicList !== undefined && meetingQuickViewDynamicList.length > NUMBER_FIFTY) {
    if (meetingQuickViewDynamicList !== undefined && meetingQuickViewDynamicList.length < NUMBER_TWO_HUNDRED) {
      timeOutVar = NUMBER_FIVE;
    } else {
      timeOutVar = timeoutNum * NUMBER_THREE;
    }
  }

  useEffect(() => {
    if (meetingQuickViewDynamicList !== undefined && meetingQuickViewDynamicList.length === 0) {
      c = NUMBER_ONE;
      loadItemForPDF();
    }
  }, [meetingQuickViewDynamicList]);

  useEffect(() => {
    const abortController = new AbortController();
    setGrid(selectedMeetingDates !== undefined ? selectedMeetingDates.value : Number(query.meetingid));
    if (selectedMeetingDates !== undefined) {
      const date = selectedMeetingDates.label.split(' (')[0];
      setTblHeader(date.substr(6, 10));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [selectedMeetingDates]);

  function prepareJson() {
    const onjArr = [];
    if (meetingQuickViewDynamicHeadingList.length > 0) {
      if (selectedMeetingDates !== undefined && selectedMeetingDates.value === grid) {
        const array_data = [];
        meetingQuickViewDynamicList !== undefined &&
          meetingQuickViewDynamicList.length > 0 &&
          meetingQuickViewDynamicList.forEach((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
              if (key.toString().includes('.')) {
                obj[key.toString().replaceAll('.', '__')] = item[key];
              } else {
                obj[key] = item[key];
              }
            });
            array_data.push(obj);
          });

        array_data.length > 0 && setgetRowDataJson(array_data);
      }
      meetingQuickViewDynamicHeadingList.length > 0 &&
        meetingQuickViewDynamicHeadingList.forEach((element, index) => {
          if (index > 60) {
            return;
          }
          if (element.field !== 'investor_id') {
            if (element.field.includes('.')) {
              const data = element.field;
              const replatedData = data.replaceAll('.', '__');
              const obj2 = { ...element, field: replatedData };
              onjArr.push(columnHeaderField(obj2, index));
            } else {
              onjArr.push(columnHeaderField(element, index));
            }
          }
        });
      setgetDataJson(onjArr);
    }
  }

  function investorWidth(DynamicListLength) {
    if (DynamicListLength === NUMBER_ONE) {
      return {
        minWidth: query.print ? 930 : 50,
        maxWidth: query.print ? 930 : null,
      };
    }
    if (DynamicListLength === NUMBER_TWO) {
      return {
        minWidth: query.print ? 850 : 50,
        maxWidth: query.print ? 850 : null,
      };
    }

    if (DynamicListLength === NUMBER_THREE) {
      return {
        minWidth: query.print ? 830 : 50,
        maxWidth: query.print ? 830 : null,
      };
    }
    if (DynamicListLength === NUMBER_FOUR) {
      return {
        minWidth: query.print ? 780 : 50,
        maxWidth: query.print ? 780 : null,
      };
    }
    if (DynamicListLength === NUMBER_FIVE) {
      return {
        minWidth: query.print ? 720 : 50,
        maxWidth: query.print ? 720 : null,
      };
    }
    if (DynamicListLength === NUMBER_SIX) {
      return {
        minWidth: query.print ? 650 : 50,
        maxWidth: query.print ? 650 : null,
      };
    }
    if (DynamicListLength === NUMBER_SEVEN) {
      return {
        minWidth: query.print ? 620 : 50,
        maxWidth: query.print ? 620 : null,
      };
    }
    if (DynamicListLength === NUMBER_EIGHT) {
      return {
        minWidth: query.print ? 580 : 50,
        maxWidth: query.print ? 580 : null,
      };
    }
    if (DynamicListLength === NUMBER_NINE) {
      return {
        minWidth: query.print ? 520 : 50,
        maxWidth: query.print ? 520 : null,
      };
    }
    if (DynamicListLength === NUMBER_TEN) {
      return {
        minWidth: query.print ? 470 : 50,
        maxWidth: query.print ? 470 : null,
      };
    }
    if (DynamicListLength === NUMBER_ELEVEN) {
      return {
        minWidth: query.print ? 420 : 50,
        maxWidth: query.print ? 420 : null,
      };
    }
    if (DynamicListLength === NUMBER_TWELVE) {
      return {
        minWidth: query.print ? 380 : 50,
        maxWidth: query.print ? 380 : null,
      };
    }
    if (DynamicListLength === NUMBER_THIRTEEN) {
      return {
        minWidth: query.print ? 320 : 50,
        maxWidth: query.print ? 320 : null,
      };
    }
    if (DynamicListLength === NUMBER_FOURTEEN) {
      return {
        minWidth: query.print ? 270 : 50,
        maxWidth: query.print ? 270 : null,
      };
    }
    if (DynamicListLength === NUMBER_FIFTEEN) {
      return {
        minWidth: query.print ? 220 : 50,
        maxWidth: query.print ? 220 : null,
      };
    }
    if (DynamicListLength === NUMBER_SIXTEEN) {
      return {
        minWidth: query.print ? 180 : 50,
        maxWidth: query.print ? 180 : null,
      };
    }
    if (DynamicListLength === NUMBER_SEVENTEEN) {
      return {
        minWidth: query.print ? 130 : 50,
        maxWidth: query.print ? 130 : null,
      };
    }
    if (DynamicListLength === NUMBER_EIGHTEEN) {
      return {
        minWidth: query.print ? 80 : 50,
        maxWidth: query.print ? 80 : null,
      };
    }
    if (DynamicListLength > NUMBER_EIGHTEEN) {
      return {
        minWidth: query.print ? 80 : 150,
        maxWidth: query.print ? 80 : null,
      };
    }
  }
  function otherColumnsWidth(DynamicListLength) {
    if (DynamicListLength === NUMBER_ONE) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_TWO) {
      return {
        minWidth: query.print ? 150 : 50,
        maxWidth: query.print ? 150 : 50,
      };
    }
    if (DynamicListLength === NUMBER_THREE) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_FOUR) {
      return {
        minWidth: query.print ? 110 : 50,
        maxWidth: query.print ? 110 : 50,
      };
    }
    if (DynamicListLength === NUMBER_FIVE) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_SIX) {
      return {
        minWidth: query.print ? 150 : 50,
        maxWidth: query.print ? 150 : 50,
      };
    }
    if (DynamicListLength === NUMBER_SEVEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_EIGHT) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_NINE) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_TEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_ELEVEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_TWELVE) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_THIRTEEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_FOURTEEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_FIFTEEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_SIXTEEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_SEVENTEEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength === NUMBER_EIGHTEEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
    if (DynamicListLength > NUMBER_EIGHTEEN) {
      return {
        minWidth: query.print ? 120 : 50,
        maxWidth: query.print ? 120 : 50,
      };
    }
  }
  async function splitDetails(params, element) {
    handleSplitVotingDetails({
      investor_id: params.data.investor_id,
      meeting_id: query.meetingid,
      proposal_id: params.data[`${element.field}_propent_id`],
      field: element.field,
      action: 'add',
    });
    setIsSplitValue(true);
    setLoadingData(true);
    await getSplitVotingDetailsReq({
      meeting_id: query.meetingid,
      proposal_id: params.data[`${element.field}_propent_id`],
      prev_meeting_id: null,
      prev_proposal_id: null,
      investor_id: params.data.investor_id,
    });
    setLoadingData(false);
  }
  function dataRenderInvestor(element) {
    const obj = {
      headerName: element.shortLabel,
      field: element.field,
      type: ['autoHeightTrue', 'flex1'],
      ...investorWidth(meetingQuickViewDynamicHeadingList.length - 2),
      cellClass: TrialUser
        ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
        : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      cellRendererFramework: (params) => (
        <div>
          <a
            className='text-secondary'
            rel='noreferrer'
            target='_blank'
            href={`${INVESTOR_VOTING_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}
          >
            {params.data.Investor}
          </a>
        </div>
      ),
    };
    const objPrint = {
      headerName: element.shortLabel,
      field: element.field,
      type: ['autoHeightTrue', 'flex1'],
      ...investorWidth(meetingQuickViewDynamicHeadingList.length - 2),
      cellClass: TrialUser
        ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
        : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
    };

    if (query.print) {
      return objPrint;
    }
    return obj;
  }

  function columnHeaderField(element, index) {
    if (element.fullLabel === 'Investor') {
      const column = {
        headerName: '',
        children: [dataRenderInvestor(element)],
      };
      return column;
    }

    function getImage(params, element, forPDF) {
      if (query.print && forPDF && meetingQuickViewDynamicList !== undefined) {
        if (params.rowIndex === meetingQuickViewDynamicList.length - 1) {
          loadItemForPDF();
        }
      }
      if (
        params.data !== undefined &&
        meetingQuickViewDynamicList !== undefined &&
        meetingQuickViewDynamicList.length > 0
      ) {
        const value = NameToImageIcon(params.data[element.field]).toString();
        const imageOrNot = value !== undefined && value !== null && value.toString().endsWith('.png');
        const src = `${ICON_IMAGE_PATH}${NameToImageIcon(params.data[element.field])}`;
        if (imageOrNot) {
          return (
            <div className='text-center'>
              <img
                src={src}
                title={params.data[`${element.field}_tooltip`]}
                style={{ height: '22px', marginRight: '5px' }}
                alt='flag'
              />
            </div>
          );
        }
        if (value !== undefined && value !== null && (value.toString().toLowerCase() === 'split' || value.toString().toLowerCase() === 'against,for')) {
          return (
            <div
              className='btn-simple btn-link cursor-pointer text-secondary'
              onClick={() => splitDetails(params, element)}
            > split
            </div>
          );
        }
      }
      return '';
    }
    const column = {
      headerName: element.fullLabel.substring(element.fullLabel.indexOf('-') + 1),
      children: [
        meetingQuickViewDynamicHeadingList.length - 1 === index
          ? {
              headerName: element.shortLabel,
              field: `${element.field}_tooltip`,
              ...otherColumnsWidth(meetingQuickViewDynamicHeadingList.length - 2),
              cellClass: TrialUser
                ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
              cellRendererFramework: (params) => {
                const forPDF = true;
                const data = getImage(params, element, forPDF);
                return getImage(params, element, forPDF);
              },
            }
          : {
              headerName: element.shortLabel,
              field: `${element.field}_tooltip`,
              minWidth: 50,
              maxWidth: 50,
              cellClass: TrialUser
                ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
              cellRendererFramework: (params) => {
                const data = getImage(params, element);
                return getImage(params, element);
              },
            },
      ],
    };
    return column;
  }
  function handleResetSplitVotingDetails() {
    setIsSplitValue(false);
    handleSplitVotingDetails({
      action: 'remove',
    });
  }
  React.useEffect(() => {
    const abortController = new AbortController();
    if (meetingQuickViewDynamicList !== undefined && meetingQuickViewDynamicList.length > 0) {
      prepareJson();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [selectedMeetingDates, meetingQuickViewDynamicList]);

  const gridOptionsmeetingQuickViewDynamicList = {
    colDefsMedalsIncluded: getDataJson,
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: true,
      columns: [
        getDataJson.length > 0 && {
          colId: getDataJson[0].field,
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    rowData: getRowDataJson.map((x) => ({
      ...x,
      TrialStatus: TrialUser,
      allowDownload: allowDownload,
    })),
    HeaderGrouping: {
      isgroupHeaderVertical: true,
      isHeaderChildren: true,
      groupHeaderHeight: 400,
    },
    components: loadingRenderer,
    rowBuffer: 0,
    rowSelection: 'multiple',
    rowModelType: query.print ? null : null,
    paginationPageSize: 100,
    cacheOverflowSize: 100,
    maxConcurrentDatasourceRequests: 2,
    infiniteInitialRowCount: 100,
    maxBlocksInCache: 10,
    domLayout: 'normal',
    gridHeight: isSplitValue ? 500 : 900,
    columnWidth: 180,
    headerRowHeight: 100,
    quickSearchFilter: true,
  };
  const data = [];
  const gridOptionSplitVotingDetails = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Fund',
        field: 'fund_name',
        type: ['autoHeightTrue'],
        minWidth: 180,
        maxWidth: null,
        cellClass: TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: 'loadingRenderer',
      },
      {
        headerName: `Vote ${tblHeader !== null ? tblHeader : '-'}`,
        field: 'vote',
        minWidth: 100,
        maxWidth: 130,
        type: ['autoHeightTrue'],
        cellClass: TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: `Vote ${tblHeader !== null ? Number(tblHeader) - 1 : '-'}`,
        field: 'prev_vote',
        minWidth: 100,
        maxWidth: 130,
        type: ['autoHeightTrue'],
        cellClass: TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    rowData:
      splitVotingDetail.length > 0 &&
      splitVotingDetail.map((x) => ({
        ...x,
        TrialStatus: TrialUser,
        allowDownload: allowDownload,
      })),
    /////////
    components: loadingRenderer,
    rowBuffer: 0,
    rowSelection: 'multiple',
    rowModelType: 'infinite',
    paginationPageSize: 100,
    cacheOverflowSize: 100,
    maxConcurrentDatasourceRequests: 2,
    infiniteInitialRowCount: 100,
    maxBlocksInCache: 10,
    domLayout: 'normal',
    gridHeight: '50vh',
  };

  function loadItemForPDF() {
    c++;
    if (c === NUMBER_TWO && query.print) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, timeOutVar * 1000);
    }
  }

  return (
    <Page history={history} key={1} className='cr-VotingQuickview noStickyHeader pt-3'>
      <div className='row pt-2'>
        <div className='col-md-4 col-sm-12'>
          <DropdownList
            handleChange={(e) => {
              if (e !== null) {
                handleResetLoading();
                setgetDataJson([]);
                handleResetSplitVotingDetails();
                setGrid(e.value);
                history.push({
                  pathname: pathConst.VOTING_QUICKVIEW,
                  search: `${QUERY_MEETING}${e.value}`,
                });
              }
            }}
            isMulti={false}
            options={listMeetingDates}
            Dvalue={selectedMeetingDates}
            disabled={loadingData ? true : TrialUserDisableDownload}
          />
        </div>
      </div>
      <div className='row VotingQuickContainer pt-2'>
        <div className='col-md-12 col-sm-12 tblCompanyVotingquickview'>
          {loadingData ? (
            messageConst.LOADING
          ) : (
            <div id='loadItem'>
              <div>
                {meetingQuickViewDynamicList !== undefined &&
                meetingQuickViewDynamicList.length > 0 &&
                getDataJson.length > 0 &&
                getRowDataJson.length > 0 ? (
                  <ErrorBoundary hasCard cardtitle='Quick View'>
                    <Table
                      pageTitle={title}
                      title='Quick view'
                      smalltitle=''
                      gridOptions={gridOptionsmeetingQuickViewDynamicList}
                      hideExcelDownloadIcon={TrialUserDisableDownload}
                    />
                    {isSplitValue && (
                      <div className='row'>
                        <div>
                          <button
                            type='button'
                            className='btn btn-sm float-end me-1 mt-3 mb-3'
                            onClick={() => {
                              handleResetSplitVotingDetails();
                            }}
                          >
                            Close Split Voting
                          </button>
                        </div>
                        <div>
                          <Card title='Split Voting'>
                            {isLoadingData && splitVotingDetail.length === 0 ? (
                              <div>Loading</div>
                            ) : (
                              <>
                                <div>Voting on: {splitVotingLable}</div>
                                <Table
                                  IsShowCard={false}
                                  pageTitle='Split Voting'
                                  title='Split Voting'
                                  smalltitle=''
                                  gridOptions={gridOptionSplitVotingDetails}
                                  hideExcelDownloadIcon={TrialUserDisableDownload}
                                />
                              </>
                            )}
                          </Card>
                        </div>
                      </div>
                    )}
                  </ErrorBoundary>
                ) : (
                  messageConst.NORECORDS
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(VotingQuickview));
