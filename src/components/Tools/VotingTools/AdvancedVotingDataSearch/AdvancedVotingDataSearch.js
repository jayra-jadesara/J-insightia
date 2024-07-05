import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import bn from '../../../../utils/bemnames';
import Page from '../../../Page';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import Table from '../../../GeneralForm/Table';
import InvestorComparatorFilter from '../InvestorComparatorFilter';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
  NumberFormatFn,
} from '../../../../utils/AgGridFunctions';
import {
  gridWidthDates,
  gridWidthValuesXLrg,
  gridWidthValuesLrg,
} from '../../../../utils/table-tools-util';
import msgConst from '../../../../constants/MessageConstans';
import { dateToNull } from '../../../../utils/general-util';

const bem = bn.create('investor-comparator');

const AdvancedVotingDataSearch = (props) => {
  const Fund_Voting_Val = '1';
  const Fund_Voting_with_Rationale_Val = '2';

  const [isFundSelection, setIsFundSelection] = useState(true);
  const [isGridOption, setGridOption] = useState(null);

  /*
    Output Fields :-                  states
    
    Fund Voting                   =>  showVotingDetails
    Fund Voting(with Rationale)   =>  showRationale
    Investor Voting               =>  showInvestorVotingDetail
    Internal                      =>  showInternal
    Company Results               =>  showVoteResults
  */
  const gridAdvancedVottingDataSearch = {
    colDefsMedalsIncluded: [
      {
        headerName: 'PID',
        field: 'pid',
        ...gridWidthDates,
        getQuickFilterText,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['numberColumn', 'autoHeightTrue'],
        chartDataType: 'series',
      },
      {
        headerName: 'Company',
        field: 'company_name',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['setColumn', 'autoHeightTrue', 'sortAsc'],
        sortIndex: 1,
        chartDataType: 'category',
      },
      {
        headerName: 'Meeting Date',
        field: 'Meeting_Date',
        ...gridWidthDates,
        getQuickFilterText,
        type: ['dateColumn', 'autoHeightTrue', 'sortDesc'],
        sortIndex: 0,
        cellClass: props.TrialUser
          ? ['ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1', 'dateFormat']
          : ['ws-normal-lh24 ps-1 pe-1', 'dateFormat'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: 'Company HQ',
        field: 'Country_name',
        ...gridWidthDates,
        getQuickFilterText,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Sector',
        field: 'sector',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'category',
      },
      {
        headerName: 'Industry',
        field: 'Industry',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'category',
      },
      {
        headerName: 'Index',
        field: 'index_names',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'category',
      },
      {
        headerName: 'Meeting Type',
        field: 'Meeting_Type',
        ...gridWidthDates,
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'category',
      },
      {
        headerName: 'Resolution Number',
        field: 'proposal_number_orig',
        ...gridWidthDates,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Proposal Text',
        field: 'proposal_detail',
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Proposal Type',
        field: 'proposal_type',
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Proposal Sub Category',
        field: 'Category_Sub_level',
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Proposal Category',
        field: 'proposal_top_level',
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Sponsor',
        field: 'proponent_text',
        ...gridWidthValuesLrg,
        getQuickFilterText,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Proponent',
        field: 'proponent_name',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        // hide: !props.showRationale && !props.showVotingDetails, //!props.showRationale && !props.showVotingDetails,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Investor',
        field: 'investor_name',
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        hide: !(
          (props.showInvestorVotingDetail && !props.showVotingDetails) ||
          props.showRationale ||
          props.setInvestorVotingDetail
        ), //! ShowRationale && !ShowVotingDetail ? true : false,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'AUM ($mn)',
        field: 'assets_under_mgmt',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthValuesLrg,
        getQuickFilterText,
        hide: !(
          (props.showInvestorVotingDetail && !props.showVotingDetails) ||
          props.showRationale ||
          props.setInvestorVotingDetail
        ),
        valueFormatter: (params) =>
          NumberFormatFn(params.data.assets_under_mgmt),
        type: ['numberColumn', 'autoHeightTrue'],
        chartDataType: 'series',
      },
      {
        headerName: 'Fund',
        field: 'fund_name',
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        hide: !(props.showRationale || props.showVotingDetails),
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Vote Cast',
        field: 'vote_cast',
        ...gridWidthDates,
        getQuickFilterText,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        hide: !!(
          !props.showVotingDetails &&
          !props.showInvestorVotingDetail &&
          !props.showRationale
        ),
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Synthetic ISS Rec.',
        field: 'iss_synth_rec',
        ...gridWidthDates,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Synthetic GL Rec.',
        field: 'gl_synth_rec',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        type: ['numberColumn', 'autoHeightTrue'],
        chartDataType: 'series',
      },
      {
        headerName: 'For (%)',
        field: 'for_pcent_for_agt',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthDates,
        getQuickFilterText,
        hide: !props.showVoteResults,
        type: ['numberColumn', 'autoHeightTrue'],
        chartDataType: 'series',
      },
      {
        headerName: 'Against (%)',
        field: 'against_pcent_for_agt',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthDates,
        getQuickFilterText,
        hide: !props.showVoteResults,
        type: ['numberColumn', 'autoHeightTrue'],
        chartDataType: 'series',
      },
      {
        headerName: 'Abstain/Withhold (%)',
        field: 'abstain_pcent',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthDates,
        getQuickFilterText,
        hide: !props.showVoteResults,
        type: ['numberColumn', 'autoHeightTrue'],
        chartDataType: 'series',
      },
      {
        headerName: 'Broker Non-Votes (%)',
        field: 'broker_pcent',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthDates,
        getQuickFilterText,
        hide: !props.showVoteResults,
        type: ['numberColumn', 'autoHeightTrue'],
        chartDataType: 'series',
      },
      {
        headerName: 'Vote Reason',
        field: 'vote_reason',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 650,
        getQuickFilterText,
        hide: !props.showRationale,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Proposal Id',
        field: 'proposal_id',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthDates,
        getQuickFilterText,
        hide: !props.showInternal,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Gl Actual',
        field: 'gl_actual',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthDates,
        getQuickFilterText,
        hide: !props.showInternal,
        type: ['setColumn', 'autoHeightTrue'],
        chartDataType: 'category',
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
    pivotMode: false,
    rowData:
      props.lstAdvancedVotingDataSearch &&
      props.lstAdvancedVotingDataSearch !== null &&
      Array.isArray(props.lstAdvancedVotingDataSearch) &&
      props.lstAdvancedVotingDataSearch.map((x) => ({
        ...x,
        TrialStatus: false,
        allowDownload: true,
        broker_pcent:
          x.broker_pcent !== undefined && x.broker_pcent !== null
            ? x.broker_pcent.toFixed(1)
            : null,
        abstain_pcent:
          x.abstain_pcent !== undefined && x.abstain_pcent !== null
            ? x.abstain_pcent.toFixed(1)
            : null,
        against_pcent_for_agt:
          x.against_pcent_for_agt !== undefined &&
          x.against_pcent_for_agt !== null
            ? x.against_pcent_for_agt.toFixed(1)
            : null,
        for_pcent_for_agt:
          x.for_pcent_for_agt !== undefined && x.for_pcent_for_agt !== null
            ? x.for_pcent_for_agt.toFixed(1)
            : null,
        Meeting_Date: x.Meeting_Date
          ? dateToNull(x.Meeting_Date, 'dd-mmm-yy')
          : '',
      })),
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
    tableSmallLabel: props.userMessage,
  };

  async function isFundSelectionFn() {
    const arrayLength = props.outputFieldSelection.filter(
      (x) =>
        x.value === Fund_Voting_Val ||
        x.value === Fund_Voting_with_Rationale_Val
    ).length;

    if (arrayLength === 2 || arrayLength === 1) {
      setIsFundSelection(false);
    } else {
      setIsFundSelection(true);
      if (
        props.ddlAdvanceVotingDataFundSelection.filter((x) => x.value !== null)
          .length > 0
      ) {
        await props.handleFundNameSelection(null);
      }
    }
  }

  useEffect(() => {
    isFundSelectionFn();
  }, [props.outputFieldSelection]);

  useEffect(() => {
    if (
      !props.isLoadingAdvanceVotingDataSearch &&
      props.lstAdvancedVotingDataSearch &&
      props.lstAdvancedVotingDataSearch !== null &&
      props.lstAdvancedVotingDataSearch.length > 0
    ) {
      /* 
        Removed hide data from 'colDefsMedalsIncluded' and show non-hidden data from sidebar columns and sidebar filters.
       */
      const newArrColDef =
        gridAdvancedVottingDataSearch.colDefsMedalsIncluded.filter(
          (x) => !x.hide
        );
      gridAdvancedVottingDataSearch.colDefsMedalsIncluded = newArrColDef;
      setGridOption(gridAdvancedVottingDataSearch);
    }
    if (props.isLoadingAdvanceVotingDataSearch) {
      setGridOption(null);
    }
  }, [
    props.lstAdvancedVotingDataSearch,
    props.isLoadingAdvanceVotingDataSearch,
  ]);

  return (
    <Page key={1} className={bem.b()}>
      <div className='text-primary pt-2 pb-2'>
        <InvestorComparatorFilter
          {...props}
          filterHeading='Investor Filter'
          searchTitle='Voting Search Filter'
          onSearch={props.onSearch}
          isShowAdvancedVotingSearchFilter
          status={props.status}
          isFundSelection={isFundSelection}
          isExpandFilter={props.isLoadingAdvanceVotingDataSearch}
          //// save search
          isShowFilterSavesearchModal
          onSavedSearches_btnApply={props.onSavedSearches_btnApply}
          onSavedSearches_btnDelete={props.onSavedSearches_btnDelete}
          onSavedSearches_Create={props.onSavedSearches_Create}
          onSavedSearches_Update={props.onSavedSearches_Update}
          isShow_SaveThisSearch_Modal={props.isShow_SaveThisSearch_Modal}
          handleShow_SaveThisSearch_Modal={
            props.handleShow_SaveThisSearch_Modal
          }
          saveSearchTextboxVal={props.saveSearchTextboxVal}
          handleSaveSearchTextboxValue={props.handleSaveSearchTextboxValue}
          saveSearch_list={props.saveSearch_list}
          saveSearchDDLList={props.saveSearchDDLList}
          saveSearchedDDLSelection={props.saveSearchedDDLSelection}
        />
      </div>

      {props.isLoadingAdvanceVotingDataSearch ? (
        props.procedureRunningEstimateTime !== undefined && (
          <div className='vh-100'>
            <div className='h-50'>
              <ProgressBar
                avgElapsedTime={props.procedureRunningEstimateTime}
              />
            </div>
          </div>
        )
      ) : (
        <>
          {isGridOption !== null &&
            props.lstAdvancedVotingDataSearch &&
            props.lstAdvancedVotingDataSearch !== null &&
            props.lstAdvancedVotingDataSearch.length > 0 && (
              <div className='row m-1 mb-3 card'>
                <div className='col-12 position-relative mt-3'>
                  <Table
                    IsShowCard={false}
                    title='Advanced Voting Data Search'
                    smalltitle=''
                    enableCharts
                    gridOptions={isGridOption}
                    hideExcelDownloadIcon={props.trialUserDisableDownload}
                  />
                </div>
              </div>
            )}

          {isGridOption === null &&
            props.lstAdvancedVotingDataSearch &&
            props.lstAdvancedVotingDataSearch !== null &&
            props.lstAdvancedVotingDataSearch.length === 0 && (
              <div className='row m-1 mb-3 card'>
                {msgConst.SUPPORT_TEAM_EMAIL_MSG}
              </div>
            )}
        </>
      )}
    </Page>
  );
};

export default withRouter(AdvancedVotingDataSearch);
