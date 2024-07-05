import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import ProgressBar from '../../GeneralForm/ProgressBar';
import InvestorSearchComponent from '../../GeneralForm/InvestorSearchComponent';
import DropdownList from '../../GeneralForm/DropdownList';
import messageConst from '../../../constants/MessageConstans';
import pathConst from '../../../constants/PathsConstant';
import { COMPANY_VOTING_POLICYCHECKERCUSTOM_INSIGHTIA } from '../../../constants/ProcedureConstant';
import { filterFunctions } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const VotingPolicyChecker = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const meetingId = query.meetingid;
  const proposal_type = props.firstSelectProposalsCountry !== undefined ? props.firstSelectProposalsCountry.label : '-';

  useEffect(() => {
    filterFunctions(props);
  }, [props.isShowInvestorSelection]);

  const gridOptionsPolicyCheckerList = {
    colDefsMedalsIncluded: [
      {
        headerName: props.policyCheckerHeadingList.investor_profile_name,
        field: 'investor_profile_name',
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 180,
        maxWidth: query.print ? 180 : null,
        colSpan(params) {
          if (params.data.status !== undefined && params.data.status) {
            return 11;
          }
          return 1;
        },
        cellRenderer: (params) => {
          if (params.data.investor_Id !== null && params.data.investor_Id !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<a class="text-secondary" href="${pathConst.INVESTOR_VOTING_OVERVIEW}${pathConst.QUERY_INVESTOR}${params.data.investor_Id}">
            ${params.data.investor_profile_name}</a>`;
            return eDiv;
          }
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span>${params.data.investor_profile_name}</span>`;
          return eDiv;
        },
      },
      {
        headerName: props.policyCheckerHeadingList.Policy,
        field: 'Policy',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: props.policyCheckerHeadingList.shares,
        field: 'shares',
        minWidth: 120,
        maxWidth: query.print ? 120 : 150,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: props.policyCheckerHeadingList.shares_perc,
        field: 'shares_perc',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: props.policyCheckerHeadingList.shares_voted,
        field: 'shares_voted',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: props.policyCheckerHeadingList.AveragePCent,
        field: 'AveragePCent',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: props.policyCheckerHeadingList.synth_iss_pcent,
        field: 'synth_iss_pcent',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: props.policyCheckerHeadingList.synth_gl_pcent,
        field: 'synth_gl_pcent',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: props.policyCheckerHeadingList.synth_iss_pcent_against,
        field: 'synth_iss_pcent_against',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
      {
        headerName: props.policyCheckerHeadingList.synth_gl_pcent_against,
        field: 'synth_gl_pcent_against',
        minWidth: query.print ? 105 : 90,
        maxWidth: query.print ? 105 : 90,
        type: ['autoHeightTrue', 'sortableFalse'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    headerHeight: 50,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    rowData: props.policyCheckerList.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser,
      allowDownload: props.allowDownload,
    })),
    getRowHeight(params) {
      if (
        params.node.data.status !== undefined && // some filter
        params.node.data.status === false
      ) {
        return 0;
      }
    },
  };

  React.useEffect(() => {
    if (props.policyCheckerList !== undefined && props.policyCheckerList) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.policyCheckerList]);

  return (
    <Page {...props} key={1} className='cr-votingPolicyCheker pt-3'>
      <ErrorBoundary>
        <InvestorSearchComponent
          HandleInvestorFilterModel={props.HandleInvestorFilterModel}
          investorSearchOptions={props.investorSearchOptions}
          investorSearchOptionsSelection={props.investorSearchOptionsSelection}
          showInvestorFilterModel={props.showInvestorFilterModel}
          HandleTreeViewInvestorLocation={props.HandleTreeViewInvestorLocation}
          investorLocationSelection={props.investorLocationSelection}
          listInvestorTypeAndSubtype={props.listInvestorTypeAndSubtype}
          listInvestorTypeAndSubtypeSelection={props.listInvestorTypeAndSubtypeSelection}
          handleInvestorSelection={props.handleInvestorSelection}
          investorSelection={props.investorSelection}
          handleInvestorIsBulkUpload={props.handleInvestorIsBulkUpload}
          isInvestorBulkUpload={props.isInvestorBulkUpload}
          freeSearchRecordset={props.freeSearchRecordset}
          handleSearchInvestor={props.handleSearchInvestor}
          handleBulkInvestorSelection={props.handleBulkInvestorSelection}
          listRegeionAndCountries={props.listRegeionAndCountries}
          invListRegeionAndCountries={props.invListRegeionAndCountries}
          listByIndivProponent={props.listByIndivProponent}
          selectionByIndivProponent={props.selectionByIndivProponent}
          handleByShareholderOfCompany={props.handleByShareholderOfCompany}
          getAllInvestorsFromShareholderOfCompany={props.getAllInvestorsFromShareholderOfCompany}
          HandleTreeViewListInvestorTypeAndSubtype={props.HandleTreeViewListInvestorTypeAndSubtype}
          listMarketCap={props.listMarketCap}
          handleMarketCapSelection={props.handleMarketCapSelection}
          marketCapSelection={props.marketCapSelection}
          handleMarketCapMinRange={props.handleMarketCapMinRange}
          txtMarketCapMinRange={props.txtMarketCapMinRange}
          txtMarketCapMaxRange={props.txtMarketCapMaxRange}
          handleMarketCapMaxRange={props.handleMarketCapMaxRange}
          handleSaveInvestorCurrentList={props.handleSaveInvestorCurrentList}
          txtSaveCurrentList={props.txtSaveCurrentList}
          handleInvestorSearchDeleteReq={props.handleInvestorSearchDeleteReq}
          getInvestorSearchOptions={props.getInvestorSearchOptions}
          isSaveCurrentListButtonDeleteDisable={props.isSaveCurrentListButtonDeleteDisable}
          saveCurrentListButtonText={props.saveCurrentListButtonText}
          handleInvestorSearchUpdateReq={props.handleInvestorSearchUpdateReq}
          handleInvestorSearchOptionSelection={props.handleInvestorSearchOptionSelection}
          GetInvestorSearchSelection={props.GetInvestorSearchSelection}
          ResetInvestorSearchOptionSelection={props.ResetInvestorSearchOptionSelection}
          handleInvestorSearchSelectionInvComp={props.handleInvestorSearchSelectionInvComp}
          // AUM ($bn).
          listAumCategory={props.listAumCategory}
          aumCategorySelection={props.aumCategorySelection}
          handleAumCategorySelection={props.handleAumCategorySelection}
          invTxtMarketCapMinRange={props.invTxtMarketCapMinRange}
          invTxtMarketCapMaxRange={props.invTxtMarketCapMaxRange}
          handleInvMarketCapMinRange={props.handleInvMarketCapMinRange}
          handleInvMarketCapMaxRange={props.handleInvMarketCapMaxRange}
          //       
          handdleRun={async (e) => {
            await props.handleResetLoader();
            await props.handleResetPolicyCheckerDataLoading();
            await props.getProcedureRunningEstimateTimeReq(COMPANY_VOTING_POLICYCHECKERCUSTOM_INSIGHTIA);
            props.handleInvestorSearchSelectionInvComp(e);
          }}
          isPolicychecker={true}
          listDefaultInvestorTypeAndSubtype={props.listDefaultInvestorTypeAndSubtype}
          lstInvestorRegeionAndCountries={props.lstInvestorRegeionAndCountries}
        />
      </ErrorBoundary>

      <div className='row pt-2'>
        <div className='col-md-7 col-sm-12 pt-1'>
          <DropdownList
            handleChange={async (e) => {
              await props.handleResetLoader();
              await props.handleResetPolicyCheckerDataLoading();
              await props.getProcedureRunningEstimateTimeReq(COMPANY_VOTING_POLICYCHECKERCUSTOM_INSIGHTIA);
              if (e !== null) {
                props.handleProposalsCountryChange(e);
                await props.listBindgvVotingGridReq({
                  meetingId,
                  proposal_type_id: e.value,
                  investor_search_id:
                    props.invCompInvestorPeerGroupSelection !== undefined
                      ? props.invCompInvestorPeerGroupSelection.value
                      : null,
                });
              } else if (props.proposalsCountryList.length > 0) {
                props.handleProposalsCountryChange(props.proposalsCountryList[0]);
                await props.listBindgvVotingGridReq({
                  meetingId,
                  proposal_type_id: props.proposalsCountryList[0].value,
                  investor_search_id:
                    props.invCompInvestorPeerGroupSelection !== undefined
                      ? props.invCompInvestorPeerGroupSelection.value
                      : null,
                });
              }
            }}
            isMulti={false}
            options={props.proposalsCountryList}
            Dvalue={props.firstSelectProposalsCountry}
            disabled={props.isLoadingPolicyCheckerList ? true : props.TrialUserDisableDownload}
          />
        </div>
        <div className='col-md-5 col-sm-12 m-0'>
          {props.isShowInvestorSelection !== undefined ? (
            props.isShowInvestorSelection
          ) : (
            <div className='row'>
              <label htmlFor='inputPassword' className='col-sm-6 col-form-label text-end'>
                <button
                  type='button'
                  className='btn btn-primary  btn-sm'
                  disabled={props.isLoadingPolicyCheckerList ? true : props.TrialUserDisableDownload}
                  onClick={() => {
                    props.HandleInvestorFilterModel(true);
                  }}
                >
                  By Investor Selection
                </button>
              </label>
              <div className='col-sm-6 text-secondary labelNewsCompanyFilter'>
                {props.invCompInvestorPeerGroupSelection !== undefined && props.invCompInvestorPeerGroupSelection !== null ? (
                  <div className='btnPeerGrpRemove'>
                    {props.invCompInvestorPeerGroupSelection.label}
                    <i
                      className='bi bi-backspace-fill'
                      title='Clear selection'
                      onClick={async () => {
                        props.handleClearPeerGroupInvestorSelection();
                        props.handleResetInvestorSelections();
                        await props.handleResetLoader();
                        await props.handleResetPolicyCheckerDataLoading();
                        await props.getProcedureRunningEstimateTimeReq(COMPANY_VOTING_POLICYCHECKERCUSTOM_INSIGHTIA);
                        props.handleClearPeerGroupInvestorSelection();
                        props.listBindgvVotingGridReq({
                          meetingId,
                          proposal_type_id: props.firstSelectProposalsCountry !== undefined ? props.firstSelectProposalsCountry.value : null,
                          investor_search_id: null,
                        });
                      }}
                    />
                  </div>
                ) : (
                  'No specific investor selected'
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='row fadeInAnimation pt-2'>
        <div className='col-md-12 col-sm-12'>
          {props.isLoadingPolicyCheckerList ? (
            props.procedureRunningEstimateTime !== undefined && (
              <div className='vh-100'>
                <div className='h-50'>
                  <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
                </div>
              </div>
            )
          ) : (
            <>
              {props.policyCheckerList.length > 0 ? (
              <div id='loadItem'>
                <ErrorBoundary hasCard cardtitle='Policy Checker'>
                  <Table
                    pageTitle={`Policy Checker: ${proposal_type}`}
                    title='Policy Checker'
                    smalltitle=''
                    gridOptions={gridOptionsPolicyCheckerList}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              </div>
              ) : (
                <Card title='Policy Checker'>{messageConst.NORECORDS}</Card>
              )}
            </>
          )}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(VotingPolicyChecker));
