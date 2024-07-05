import React from 'react';
import { withRouter } from 'react-router';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../../GeneralForm/Table';
import { filters } from '../../../../utils/AgGridFunctions';
import { NORECORDS } from '../../../../constants/MessageConstans';
import Card from '../../../GeneralForm/Card';
import { checkValuesToFixed } from '../../../../utils/table-tools-util';
import StackBarChart from '../../../GeneralForm/StackBarChart';
import ResolutionTrackerHistoricalChart from '../ResolutionTracker/Components/ResolutionTrackerHistoricalChart';
import { NUMBER_ZERO } from '../../../../constants/NumberConstants';
import ProgressBar from '../../../GeneralForm/ProgressBar';

const NoActionLetterAnalysis = (props) => {
  const colDefAverage = [];
  const colDefISS = [];
  const colDefGL = [];

  props.tableAverageHeading &&
    props.tableAverageHeading.forEach((item, index) => {
      if (index === NUMBER_ZERO) {
        colDefAverage.push({
          headerName: item.headingName.toString(),
          field: item.field.toString(),
          minWidth: 180,
          cellClass: props.TrialStatus_NoActionLetter
            ? 'ws-normal-lh30 ag-cell-blurrytext'
            : 'ws-normal-lh30',
          type: ['autoHeightTrue'],
        });
      } else {
        colDefAverage.push({
          headerName: item.headingName.toString(),
          field: item.field.toString(),
          minWidth: 90,
          cellClass: props.TrialStatus_NoActionLetter
            ? 'ws-normal-lh30 ag-cell-blurrytext'
            : 'ws-normal-lh30',
          type: ['autoHeightTrue'],
        });
      }
    });

  props.tableISSHeading &&
    props.tableISSHeading.forEach((item, index) => {
      if (index === NUMBER_ZERO) {
        colDefISS.push({
          headerName: item.headingName.toString(),
          field: item.field.toString(),
          minWidth: 180,
          cellClass: props.TrialStatus_NoActionLetter
            ? 'ws-normal-lh30 ag-cell-blurrytext'
            : 'ws-normal-lh30',
          type: ['autoHeightTrue'],
        });
      } else {
        colDefISS.push({
          headerName: item.headingName.toString(),
          field: item.field.toString(),
          minWidth: 90,
          cellClass: props.TrialStatus_NoActionLetter
            ? 'ws-normal-lh30 ag-cell-blurrytext'
            : 'ws-normal-lh30',
          type: ['autoHeightTrue'],
        });
      }
    });

  props.tableGLHeading &&
    props.tableGLHeading.forEach((item, index) => {
      if (index === NUMBER_ZERO) {
        colDefGL.push({
          headerName: item.headingName.toString(),
          field: item.field.toString(),
          minWidth: 180,
          cellClass: props.TrialStatus_NoActionLetter
            ? 'ws-normal-lh30 ag-cell-blurrytext'
            : 'ws-normal-lh30',
          type: ['autoHeightTrue'],
        });
      } else {
        colDefGL.push({
          headerName: item.headingName.toString(),
          field: item.field.toString(),
          minWidth: 90,
          cellClass: props.TrialStatus_NoActionLetter
            ? 'ws-normal-lh30 ag-cell-blurrytext'
            : 'ws-normal-lh30',
          type: ['autoHeightTrue'],
        });
      }
    });

  const gridOptions_Average = {
    colDefsMedalsIncluded: colDefAverage,
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData:
      props.tableAverage !== undefined &&
      props.tableAverage &&
      props.tableAverage.length > 0 &&
      props.tableAverage.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus_NoActionLetter,
        allowDownload: props.allowDownload_NoActionLetter,
      })),
  };

  const gridOptions_ISS = {
    colDefsMedalsIncluded: colDefISS,
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.tableISS.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus_NoActionLetter,
      allowDownload: props.allowDownload_NoActionLetter,
    })),
  };

  const gridOptions_GL = {
    colDefsMedalsIncluded: colDefGL,
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.tableGL.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus_NoActionLetter,
      allowDownload: props.allowDownload_NoActionLetter,
    })),
  };

  const gridOptions_Top20Investors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investors',
        field: 'investor_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus_NoActionLetter
          ? 'ws-normal-lh30 ag-cell-blurrytext'
          : 'ws-normal-lh30',
        minWidth: 300,
      },
      {
        headerName: 'Voted',
        field: 'investor_total',
        minWidth: 80,
      },
      {
        headerName: 'Supported',
        field: 'investor_support',
        minWidth: 80,
        valueFormatter(params) {
          if (
            params.data.investor_support !== null &&
            params.data.investor_support !== ''
          ) {
            return `${checkValuesToFixed(params.data.investor_support, 1)}%`;
          }
          return '';
        },
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'proposal_number_orig',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData:
      props.tableSupportfromTop20Investors !== undefined &&
      props.tableSupportfromTop20Investors &&
      props.tableSupportfromTop20Investors.length > 0 &&
      props.tableSupportfromTop20Investors.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus_NoActionLetter,
        allowDownload: props.allowDownload_NoActionLetter,
      })),
  };

  return (
    <>
      {!props.loadingDataNoactionLetters ? (
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
        <div className='pt-3'>
          <div className='row'>
            {props.chartProposalsBy.length > 0 && (
              <div className='col-md-6 col-12'>
                <StackBarChart
                  isShowCard
                  cardtitle='Proposals By'
                  cardsmalltitle=''
                  addedClass={
                    props.TrialStatus_NoActionLetter ? 'blurrytext' : ''
                  }
                  chartData={props.chartProposalsBy}
                  xAxis_KeyName='date_act_Year'
                  partition={[
                    {
                      labelName: 'Rejected',
                      field: 'rejected',
                      labelColor: '#ff0000',
                    },
                    {
                      labelName: 'Accepted',
                      field: 'accepted',
                      labelColor: '#008000',
                    },
                    {
                      labelName: 'Withdrawn',
                      field: 'withdrawn',
                      labelColor: '#808080',
                    },
                  ]}
                />
              </div>
            )}
            {props.chartProposalsThatWentToAVote.length > 0 && (
              <div className='col-md-6 col-12'>
                <ResolutionTrackerHistoricalChart
                  isShowCard
                  cardtitle='Proposals That Went to a Vote'
                  cardsmalltitle=''
                  addedClass={
                    props.TrialStatus_NoActionLetter ? 'blurrytext' : ''
                  }
                  chartData={props.chartProposalsThatWentToAVote}
                  isComp={false}
                  isInvest={false}
                  handleComapnyCog={() => {}}
                  handleInvestorCog={() => {}}
                  location={props.location}
                />
              </div>
            )}
          </div>
          <div className='row'>
            <div className='col-md-6 col-12 pb-3'>
              {props.tableSupportfromTop20Investors !== undefined &&
                (props.tableSupportfromTop20Investors.length > 0 ? (
                  <Table
                    pageTitle='Support from Top 20 Investors'
                    title='Support from Top 20 Investors'
                    smalltitle=''
                    gridOptions={gridOptions_Top20Investors}
                  />
                ) : (
                  <Card
                    IsShowCard
                    title='Support from Top 20 Investors'
                    smalltitle=''
                    addedClass=''
                  >
                    {NORECORDS}
                  </Card>
                ))}
            </div>
            <div className='col-md-6 col-12 pb-3'>
              {props.tableAverage !== undefined && (
                <Card
                  IsShowCard
                  title='Average Level of Support'
                  smalltitle=''
                  addedClass=''
                >
                  {props.tableAverage.length > 0 &&
                  props.tableISS.length > 0 &&
                  props.tableGL.length > 0 ? (
                    <>
                      <div className='pt-2 pb-2'>
                        <Table
                          pageTitle='Average'
                          title=''
                          smalltitle=''
                          gridOptions={gridOptions_Average}
                        />
                      </div>
                      <div className='pt-2 pb-2'>
                        <Table
                          pageTitle='ISS'
                          title=''
                          smalltitle=''
                          gridOptions={gridOptions_ISS}
                        />
                      </div>
                      <div className='pt-2 pb-2'>
                        <Table
                          pageTitle='GL'
                          title=''
                          smalltitle=''
                          gridOptions={gridOptions_GL}
                        />
                      </div>
                    </>
                  ) : (
                    NORECORDS
                  )}
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(React.memo(NoActionLetterAnalysis));
