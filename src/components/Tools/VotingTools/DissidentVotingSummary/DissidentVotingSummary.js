import React from 'react';
import { withRouter } from 'react-router';
import bn from '../../../../utils/bemnames';
import Page from '../../../Page';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import Table from '../../../GeneralForm/Table';
import ProcedureConstant from '../../../../constants/ProcedureConstant';
import InvestorComparatorFilter from '../InvestorComparatorFilter';
import { filters } from '../../../../utils/AgGridFunctions';
import '../../../../styles/components/_popupTrialUser.scss';
import { history } from '../../../../utils/navigation-util';
import { INVESTOR_PROXY_CONTEST_VOTING, QUERY_INVESTOR } from '../../../../constants/PathsConstant';
import msgConst from '../../../../constants/MessageConstans';

const bem = bn.create('investor-comparator');

const DissidentVotingSummary = (props) => {
  const onSearch = async () => {
    await props.handleResetLoader();
    await props.handleClearResult();
    await props.handledResetLoadingData();
    await props.handleResetInvestorComparatorTool();
    await props.getProcedureRunningEstimateTimeReq(ProcedureConstant.DISSIDENTVOTT_FILTER_INSIGHTIA);
    const data = {
      companySearchId:
        props.invCompCompanyPeerGroupSelection !== undefined ? props.invCompCompanyPeerGroupSelection.value : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined ? props.invCompInvestorPeerGroupSelection.value : null,
      meetingType:
        props.meetingTypeSelection !== null &&
        props.meetingTypeSelection !== undefined
          ? props.meetingTypeSelection.map((c) => c.value).toString()
          : '',
      sponsor:
        props.sponsorSelection !== undefined
          ? props.sponsorSelection.value
          : '',
      startDate: props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      proponent: props.isProponentGroup
        ? props.individualProponentSelection !== undefined && props.isProponentGroup
          ? props.individualProponentSelection.map((c) => c.value).toString()
          : ''
        : props.groupProponentSelection !== undefined && props.isProponentGroup === false
        ? props.groupProponentSelection.map((c) => c.value).toString()
        : '',
      // settlements:
      //   props.lstSettlementSelection !== undefined
      //     ? props.lstSettlementSelection.value
      //     : null,
      settlements:
        props.lstSettlementDissidentSummarySelection !== undefined
          ? props.lstSettlementDissidentSummarySelection.value
          : null,
      issCard:
        props.lstIISCardRecommendationSelection !== undefined ? props.lstIISCardRecommendationSelection.value : null,
      glCard:
        props.lstGLCardRecommendationSelection !== undefined ? props.lstGLCardRecommendationSelection.value : null,
      desiredOutcome: props.desiredOutcomeSelection,
      shareholderBase: null,
    };
    const dataForProxyTool = {
      companySearchId:
        props.invCompCompanyPeerGroupSelection !== undefined ? props.invCompCompanyPeerGroupSelection : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined ? props.invCompInvestorPeerGroupSelection : null,
      meetingType:
        props.meetingTypeSelection !== undefined ? props.meetingTypeSelection : '',
      sponsor: props.sponsorSelection !== undefined ? props.sponsorSelection : '',
      startDate: props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      proponent: props.isProponentGroup
        ? props.individualProponentSelection !== undefined && props.isProponentGroup
          ? props.individualProponentSelection
          : ''
        : props.groupProponentSelection !== undefined && props.isProponentGroup === false
        ? props.groupProponentSelection
        : '',
        settlements:
        props.lstSettlementDissidentSummarySelection !== undefined
          ? props.lstSettlementDissidentSummarySelection.value
          : null,
      issCard:
        props.lstIISCardRecommendationSelection !== undefined ? props.lstIISCardRecommendationSelection : null,
      glCard:
        props.lstGLCardRecommendationSelection !== undefined ? props.lstGLCardRecommendationSelection : null,
      desiredOutcome: props.desiredOutcomeSelection,
      shareholderBase: null,
      isProponentGroup: props.isProponentGroup,
      individualProponentSelection: props.individualProponentSelection,
      groupProponentSelection: props.groupProponentSelection,
      isInvCompDateChecked: props.isInvCompDateChecked
    };
    localStorage.removeItem('dissidentVotingTools');
    localStorage.setItem('dissidentVotingTools', JSON.stringify(dataForProxyTool));
    props.dissidentVotingSummarySearchReq(data);
  };

  const gridOptionResultDetails = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'investor_name',
        minWidth: 350,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            <div
              className='text-secondary cursor-pointer'
              onClick={() => {
                history.push(`${INVESTOR_PROXY_CONTEST_VOTING}${QUERY_INVESTOR}${params.data.investor_id}`);
                props.handleStartSearch();
              }}
            >
              {params.data.investor_name}
            </div>
          </div>
        ),
      },
      {
        headerName: 'Proxy Contests',
        field: 'number_of_proxy_contests',
        type: ['autoHeightTrue', 'sortDesc'],
        cellClass: 'ws-normal-lh24 ps-1 pe-2 ag-right-aligned-cell',
        minWidth: 150,
      },
      {
        headerName: 'Dissidents (#)',
        field: 'num_diss_voted',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-2 ag-right-aligned-cell',
        minWidth: 150,
      },
      {
        headerName: 'Dissidents (%)',
        field: 'pcent_some_dissidents1',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-2 ag-right-aligned-cell',
        minWidth: 150,
      },
      {
        headerName: 'Voted all dissidents (#)',
        field: 'number_all_dissidents',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-2 ag-right-aligned-cell',
        minWidth: 150,
      },
      {
        headerName: 'Voted all dissidents (%)',
        field: 'pcent_all_dissidents',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-2 ag-right-aligned-cell',
        minWidth: 150,
      },
      {
        headerName: 'Partial Dissident Vote Avg (%)',
        field: 'pcent_voted_diss',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-2 ag-right-aligned-cell',
        minWidth: 150,
      },
      {
        headerName: 'ISS Slate Match (%)',
        field: 'pcent_match_iss',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-2 ag-right-aligned-cell',
        minWidth: 150,
      },
      {
        headerName: 'GL Slate Match (%)',
        field: 'pcent_match_gl',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-2 ag-right-aligned-cell',
        minWidth: 150,
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: props.lstDissidentVotingSummaryData.map((x) => ({
      ...x,
      TrialStatus: props.trialStatus,
      allowDownload: false,
      pcent_some_dissidents1:
        x.pcent_some_dissidents1 !== null && x.pcent_some_dissidents1 !== ''
          ? `${parseFloat(x.pcent_some_dissidents1).toFixed(1)}`
          : '',
      pcent_match_iss:
        x.pcent_match_iss !== null && x.pcent_match_iss !== '' ? `${parseFloat(x.pcent_match_iss).toFixed(1)}` : '',
      pcent_match_gl:
        x.pcent_match_gl !== null && x.pcent_match_gl !== '' ? `${parseFloat(x.pcent_match_gl).toFixed(1)}` : '',
      pcent_voted_diss:
        x.pcent_voted_diss !== null && x.pcent_voted_diss !== '' ? `${parseFloat(x.pcent_voted_diss).toFixed(1)}` : '',
      pcent_all_dissidents:
        x.pcent_all_dissidents !== null && x.pcent_all_dissidents !== ''
          ? `${parseFloat(x.pcent_all_dissidents).toFixed(1)}`
          : '',
    })),
    quickSearchFilter: false,
    domLayout: props.trialStatus || props.isShowLimitedData ? 'autoHeight' : 'normal',
    gridHeight: props.trialStatus || props.isShowLimitedData ? undefined : '80vh',
    animateRows: true,
    suppressAggFuncInHeader: true,
    tableSmallLabel: props.userMessage,
  };

  return (
    <Page key={1} className={bem.b()}>
      <div className='text-primary pt-2 pb-2'>
        <InvestorComparatorFilter
          {...props}
          onSearch={onSearch}
          filterHeading='Dissident Filter'
          searchTitle='Dissident Specific Searches:'
          isShowDissidentFilters
          isSelectExcludeWithdrawnSettled={true}
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

        {props.trialStatus && <hr />}

        <div className='row mt-3'>
          {props.isLoadingDissidentVotingSummaryData ? (
            props.procedureRunningEstimateTime !== undefined && (
              <div className='vh-100'>
                <div className='h-50'>
                  <ProgressBar
                    avgElapsedTime={props.procedureRunningEstimateTime}
                  />
                </div>
              </div>
            )
          ) : props.lstDissidentVotingSummaryData.length > 0 ? (
            <div className=''>
              <Table
                IsShowCard={false}
                title='Dissident Voting Summary'
                pageTitle='Dissident Voting Summary'
                smalltitle=''
                enableCharts
                gridOptions={gridOptionResultDetails}
              />
            </div>
          ) : (
            <div>
              <div>{msgConst.SUPPORT_TEAM_EMAIL_MSG}</div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(DissidentVotingSummary);
