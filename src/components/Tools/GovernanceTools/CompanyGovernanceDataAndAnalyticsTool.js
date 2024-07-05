import React from 'react';
import GovernanceFilter from './GovernanceFilter';
import Page from '../../Page';
import bn from '../../../utils/bemnames';
import Table from '../../GeneralForm/Table';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { GOVERNANCE_ADV_SEARCH_INSIGHTIA } from '../../../constants/ProcedureConstant';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  columnAndfilterSidebarNoPivotNoColNoRow,
  bottomStatusBar,
} from '../../../utils/AgGridFunctions';
import {
  gridWidthValues,
  gridWidthValuesLrg,
} from '../../../utils/table-tools-util';
import { dateToNull } from '../../../utils/general-util';
import {
  GOVERNANCE_OVERVIEW,
  QUERY_PID,
} from '../../../constants/PathsConstant';
import msgConst from '../../../constants/MessageConstans';

const bem = bn.create('companyGovernanceDataAndAnalyticsTool');

const CompanyGovernanceDataAndAnalyticsTool = (props) => {
  const onSearch = async () => {
    await props.handleResetLoader();
    await props.handleClearResult();
    await props.handleResetOnSearchClick();
    await props.getProcedureRunningEstimateTimeReq(
      GOVERNANCE_ADV_SEARCH_INSIGHTIA
    );

    let poisonPillExpiryDateMin;
    let poisonPillExpiryDateMax;

    if (
      props.poisonPillExpiryDateMin !== '' &&
      props.poisonPillExpiryDateMin !== null &&
      props.poisonPillExpiryDateMin !== undefined
    ) {
      poisonPillExpiryDateMin = dateToNull(
        props.poisonPillExpiryDateMin,
        'dd-mmm-yy',
        true
      );
    } else {
      poisonPillExpiryDateMin = null;
    }

    if (
      props.poisonPillExpiryDateMax !== '' &&
      props.poisonPillExpiryDateMax !== null &&
      props.poisonPillExpiryDateMax !== undefined
    ) {
      poisonPillExpiryDateMax = dateToNull(
        props.poisonPillExpiryDateMax,
        'dd-mmm-yy',
        true
      );
    } else {
      poisonPillExpiryDateMax = null;
    }

    const data = {
      company_search_id:
        props.invCompCompanyPeerGroupSelection !== undefined
          ? props.invCompCompanyPeerGroupSelection.value
          : null,
      StateOfIncorporation:
        props.stateOfIncorporationSelection !== null &&
        props.stateOfIncorporationSelection.length !== 0
          ? props.stateOfIncorporationSelection.map((c) => c.value).toString()
          : null,
      BoardSizeMin: props.boardSizeMin !== '' ? props.boardSizeMin : null,
      BoardSizeMax: props.boardSizeMax !== '' ? props.boardSizeMax : null,
      PoisonPillOwnershipPcentMin:
        props.poisonPillOwnershipMin !== ''
          ? props.poisonPillOwnershipMin
          : null,
      PoisonPillOwnershipPcentMax:
        props.poisonPillOwnershipMax !== ''
          ? props.poisonPillOwnershipMax
          : null,

      PoisonPillExpiryDateMin:
        poisonPillExpiryDateMin !== undefined &&
        props.poisonPillExpiryDateChecked
          ? poisonPillExpiryDateMin
          : null,

      PoisonPillExpiryDateMax:
        poisonPillExpiryDateMax !== undefined &&
        props.poisonPillExpiryDateChecked
          ? poisonPillExpiryDateMax
          : null,

      AvgDirectorTimeMin:
        props.avgDirectorTenureMin !== '' ? props.avgDirectorTenureMin : null,

      AvgDirectorTimeMax:
        props.avgDirectorTenureMax !== '' ? props.avgDirectorTenureMax : null,

      AvgDirectorAgeMin: props.avgAgeMin !== '' ? props.avgAgeMin : null,
      AvgDirectorAgeMax: props.avgAgeMax !== '' ? props.avgAgeMax : null,
      AnyDirectorTimeMin: props.directorTerm !== '' ? props.directorTerm : null,
      FemaleDirPcentMin:
        props.currentFemaleDirectorMin !== ''
          ? props.currentFemaleDirectorMin
          : null,
      FemaleDirPcentMax:
        props.currentFemaleDirectorMax !== ''
          ? props.currentFemaleDirectorMax
          : null,
      NomineeActivists:
        props.activistNomineeOnBoardSelection.length !== 0
          ? props.activistNomineeOnBoardSelection.map((c) => c.value).toString()
          : null,
      yesParameters:
        props.provisionSelectionHas.length !== 0
          ? props.provisionSelectionHas.map((c) => c.value).toString()
          : null,
      notParameters:
        props.provisionSelectionHasNot.length !== 0
          ? props.provisionSelectionHasNot.map((c) => c.value).toString()
          : null,
    };
    props.getGovernanceAdvSearchReq(data);
  };

  const gridOptionResultDetails = {
    colDefsMedalsIncluded: [
      {
        cellRendererFramework: (params) => (
          <div>
            {params.data.pid !== '' ? (
              <a
                title={params.data.company_name}
                className='text-secondary'
                rel='noopener noreferrer'
                target='_blank'
                href={`${GOVERNANCE_OVERVIEW}${QUERY_PID}${params.data.pid}`}
              >
                {params.data.company_name}
              </a>
            ) : (
              <span title={params.data.company_name}>
                {params.data.company_name}
              </span>
            )}
          </div>
        ),
        headerName: 'Company',
        field: 'company_name',
        type: ['setColumn'],
        getQuickFilterText,
      },
      {
        headerName: 'Directors',
        field: 'DirectorCnt',
        ...gridWidthValues,
        type: ['numberColumn'],
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap(USD Mn)',
        field: 'market_cap_usd',
        ...gridWidthValuesLrg,
        type: ['numberColumn'],
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'Industry',
        type: ['setColumn'],
        getQuickFilterText,
      },
      {
        headerName: 'State of Incorporation',
        field: 'State_country_name',
        ...gridWidthValuesLrg,
        type: ['setColumn'],
        getQuickFilterText,
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: props.governanceAdvSearch.map((x) => ({
      ...x,
      market_cap_usd:
        x.market_cap_usd !== undefined && x.market_cap_usd !== null
          ? x.market_cap_usd.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '',
      TrialStatus: props.trialStatus,
      allowDownload: true,
    })),
    quickSearchFilter: true,
    isfloatingFilter: true,
    aggFuncs: {
      'count(Dist)': distinctCounts,
    },
    statusBar: bottomStatusBar,
    domLayout:
      props.trialStatus || props.isShowLimitedData ? 'autoHeight' : 'normal',
    gridHeight:
      props.trialStatus || props.isShowLimitedData ? undefined : '80vh',
    animateRows: true,
    suppressAggFuncInHeader: true,
    tableSmallLabel: props.userMessage,
  };

  return (
    <Page key={1} className={bem.b()}>
      <GovernanceFilter
        {...props}
        onSearch={onSearch}
        filterHeading='Governance Filter'
        searchTitle='Governance Specific Filters'
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
      <div className='row mt-3 mb-3'>
        {props.isLoadingGovernanceAdvSearch ? (
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
          <div className=''>
            <div className='row position-relative pt-3 card'>
              {props.governanceAdvSearch.length > 0 ? (
                <Table
                  IsShowCard={false}
                  title=''
                  smalltitle=''
                  enableCharts
                  gridOptions={gridOptionResultDetails}
                  hideExcelDownloadIcon={props.trialUserDisableDownload}
                />
              ) : (
                msgConst.SUPPORT_TEAM_EMAIL_MSG
              )}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default CompanyGovernanceDataAndAnalyticsTool;
