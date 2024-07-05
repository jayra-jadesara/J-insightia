import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../GeneralForm/Table';
import CustomToolTipHeader from '../../GeneralForm/CustomToolTipHeader';
import {
  gridWidthValuesLrg,
  greyBackgroudForNull,
  gridWidthValuesVLrg,
  gridWidthValuesXLrg,
  numberWithCommas
} from '../../../utils/table-tools-util';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { MAX_MOBILE_WIDTH } from '../../../constants/ScreenSizeConstant';
import {
  filters,
  distinctCounts,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
  loadingRenderer,
  getQuickFilterText
} from '../../../utils/AgGridFunctions';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import { NUMBER_ONE } from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';

const GovernanceScoreDataTools = (props) => {
  const { width } = useWindowDimensions();
  const enableSorting = true;

  function headerTooltipMatch(header) {
    let flag = 0;
    let text_tooltip;
    props.headerTooltips && props.headerTooltips.lemgth > 0 && props.headerTooltips.map((e) => {
      if (header === e.Tooltip_Name) {
        flag = 1;
        text_tooltip = e.Description;
      }
    });
    if (flag === NUMBER_ONE) {
      return { headerComponentParams: { text_tooltip, enableSorting } };
    }
    text_tooltip = false;
    return { headerComponentParams: { text_tooltip, enableSorting } };
  }

  const gridOptionGovernanceScores = {
    frameworkComponents: { agColumnHeader: CustomToolTipHeader },
    colDefsMedalsIncluded: [
      {
        getQuickFilterText,
        headerName: 'Company',
        field: 'Company_name',
        minWidth: width <= MAX_MOBILE_WIDTH ? 220 : 290,
        maxWidth: width <= MAX_MOBILE_WIDTH ? 300 : 400,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRendererFramework: (params) => (
          <div>
            <Link className='text-secondary' to={`/company/overview?pid=${params.data.pid}`}>
              {params.data.Company_name}
            </Link>
          </div>
        )
      },
      {
        getQuickFilterText,
        headerName: 'PID',
        field: 'pid',
        ...gridWidthValuesLrg,
      },
      {
        getQuickFilterText,
        headerName: 'Company HQ',
        field: 'Country_name',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn']
      },
      {
        getQuickFilterText,
        headerName: 'Exchange',
        field: 'exchange_name',
        ...gridWidthValuesVLrg,
        type:
          width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup']
      },
      {
        getQuickFilterText,
        headerName: 'Indexes',
        field: 'index_name_list',
        ...gridWidthValuesXLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup']
      },
      {
        getQuickFilterText,
        headerName: 'Sector',
        field: 'Sector',
        ...gridWidthValuesVLrg,
        type:
          width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup']
      },
      {
        getQuickFilterText,
        headerName: 'Industry',
        field: 'Industry',
        ...gridWidthValuesXLrg,
        type:
          width <= MAX_MOBILE_WIDTH ? ['setColumn', 'enableRowGroup', 'hiddenField'] : ['setColumn', 'enableRowGroup']
      },
      {
        getQuickFilterText,
        headerName: 'Market Cap ($ mn)',
        field: 'market_cap',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['numberColumn', 'hiddenField'] : ['numberColumn'],
        filter: 'agNumberColumnFilter'
      },
      {
        getQuickFilterText,
        headerName: 'Market Cap Category',
        field: 'market_cap_category',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup']
      },
      {
        getQuickFilterText,
        headerName: 'Total Score',
        field: 'total_score',
        ...gridWidthValuesLrg,
        type: ['numberColumn']
      },
      {
        getQuickFilterText,
        headerName: 'Ranking',
        field: 'ranking',
        ...gridWidthValuesLrg,
        type: ['setColumn', 'enableRowGroup']
      },
      {
        getQuickFilterText,
        headerName: 'Independent Chairman',
        field: 'indepedent_chairman',
        cellStyle: (params) => greyBackgroudForNull(params.data.indepedent_chairman),
        cellClassRules: {
          greyBackground: (params) => params.data.indepedent_chairman === null
        },
        ...headerTooltipMatch('Independent Chairman'),
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup']
      },
      {
        getQuickFilterText,
        headerName: 'Chairman Tenure',
        field: 'chairman_tenure',
        ...gridWidthValuesLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.chairman_tenure),
        cellClassRules: {
          greyBackground: (params) => params.data.chairman_tenure === null
        },
        ...headerTooltipMatch('Chairman Tenure')
      },
      {
        getQuickFilterText,
        headerName: 'Separate CEO & Chairman',
        field: 'SeparateCEOChairman',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.SeparateCEOChairman),
        cellClassRules: {
          greyBackground: (params) => params.data.SeparateCEOChairman === null
        },
        ...headerTooltipMatch('Separate CEO & Chairman')
      },
      {
        getQuickFilterText,
        headerName: 'Director Independence (%)',
        field: 'director_independence',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.director_independence),
        cellClassRules: {
          greyBackground: (params) => params.data.director_independence === null
        },
        ...headerTooltipMatch('Director Independence (%)')
      },
      {
        getQuickFilterText,
        headerName: 'Gender Diversity (%)',
        field: 'gender_diversity',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.gender_diversity),
        cellClassRules: {
          greyBackground: (params) => params.data.gender_diversity === null
        },
        ...headerTooltipMatch('Gender Diversity (%)')
      },
      {
        getQuickFilterText,
        headerName: 'Average Age',
        field: 'average_age',
        ...gridWidthValuesLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.average_age),
        cellClassRules: {
          greyBackground: (params) => params.data.average_age === null
        },
        ...headerTooltipMatch('Average Age')
      },
      {
        getQuickFilterText,
        headerName: 'Shared Board',
        field: 'shared_boards',
        ...gridWidthValuesLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.shared_boards),
        cellClassRules: {
          greyBackground: (params) => params.data.shared_boards === null
        },
        ...headerTooltipMatch('Shared Board')
      },
      {
        getQuickFilterText,
        headerName: 'Overboarding',
        field: 'overboarding',
        ...gridWidthValuesLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.overboarding),
        cellClassRules: {
          greyBackground: (params) => params.data.overboarding === null
        },
        ...headerTooltipMatch('Overboarding')
      },
      {
        getQuickFilterText,
        headerName: 'Audit Committee Independence',
        field: 'audit_committee_independence',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.audit_committee_independence),
        cellClassRules: {
          greyBackground: (params) => params.data.audit_committee_independence === null
        },
        ...headerTooltipMatch('Audit Committee Independence')
      },
      {
        getQuickFilterText,
        headerName: 'Compensation/ Remuneration Committee Independence',
        field: 'compensation_remuneration_committee',
        ...gridWidthValuesXLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.compensation_remuneration_committee),
        cellClassRules: {
          greyBackground: (params) => params.data.compensation_remuneration_committee === null
        },
        ...headerTooltipMatch('Compensation/ Remuneration Committee Independence')
      },
      {
        getQuickFilterText,
        headerName: 'Staggered Board',
        field: 'staggered_board',
        ...gridWidthValuesLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.staggered_board),
        cellClassRules: {
          greyBackground: (params) => params.data.staggered_board === null
        },
        ...headerTooltipMatch('Staggered Board')
      },
      {
        getQuickFilterText,
        headerName: 'Proxy Access',
        field: 'proxy_access',
        ...gridWidthValuesLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.proxy_access),
        cellClassRules: {
          greyBackground: (params) => params.data.proxy_access === null
        },
        ...headerTooltipMatch('Proxy Access')
      },
      {
        getQuickFilterText,
        headerName: 'Right for Shareholders to Call Special Meeting',
        field: 'right_for_shareholders_to_call_special_meeting',
        ...gridWidthValuesXLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.right_for_shareholders_to_call_special_meeting),
        cellClassRules: {
          greyBackground: (params) => params.data.right_for_shareholders_to_call_special_meeting === null
        },
        ...headerTooltipMatch('Right for Shareholders to Call Special Meeting')
      },
      {
        getQuickFilterText,
        headerName: 'Action by Written Consent',
        field: 'action_by_written_consent',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.action_by_written_consent),
        cellClassRules: {
          greyBackground: (params) => params.data.action_by_written_consent === null
        },
        ...headerTooltipMatch('Action by Written Consent')
      },
      {
        getQuickFilterText,
        headerName: 'Majority Vote for Uncontested Elections',
        field: 'majority_vote_for_uncontested_election',
        ...gridWidthValuesXLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.majority_vote_for_uncontested_election),
        cellClassRules: {
          greyBackground: (params) => params.data.majority_vote_for_uncontested_election === null
        },
        ...headerTooltipMatch('Majority Vote for Uncontested Elections')
      },
      {
        getQuickFilterText,
        headerName: 'Active Poison Pills',
        field: 'poison_pill',
        ...gridWidthValuesLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.poison_pill),
        cellClassRules: {
          greyBackground: (params) => params.data.poison_pill === null
        },
        ...headerTooltipMatch('Active Poison Pills')
      },
      {
        getQuickFilterText,
        headerName: 'Dual Share Class',
        field: 'dual_share',
        ...gridWidthValuesLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.dual_share),
        cellClassRules: {
          greyBackground: (params) => params.data.dual_share === null
        },
        ...headerTooltipMatch('Dual Share Class')
      },

      {
        getQuickFilterText,
        headerName: 'Controlled Company',
        field: 'controlled_company',
        ...gridWidthValuesVLrg,
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        cellStyle: (params) => greyBackgroudForNull(params.data.controlled_company),
        cellClassRules: {
          greyBackground: (params) => params.data.controlled_company === null
        },
        ...headerTooltipMatch('Controlled Company')
      },
      {
        getQuickFilterText,
        headerName: 'Supermajority Vote Required to Amend Certain Provisions',
        field: 'supermajority',
        ...gridWidthValuesXLrg,
        cellStyle: (params) => greyBackgroudForNull(params.data.supermajority),
        cellClassRules: {
          greyBackground: (params) => params.data.supermajority === null
        },
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        ...headerTooltipMatch('Supermajority Vote Required to Amend Certain Provisions')
      },
      {
        getQuickFilterText,
        headerName: 'Auditor Tenure',
        field: 'auditor_tenure',
        ...gridWidthValuesLrg,
        cellStyle: (params) => greyBackgroudForNull(params.data.auditor_tenure),
        cellClassRules: {
          greyBackground: (params) => params.data.auditor_tenure === null
        },
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        ...headerTooltipMatch('Auditor Tenure')
      },
      {
        getQuickFilterText,
        headerName: 'Compliance',
        field: 'compilance',
        ...gridWidthValuesLrg,
        cellStyle: (params) => greyBackgroudForNull(params.data.compilance),
        cellClassRules: {
          greyBackground: (params) => params.data.compilance === null
        },
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        ...headerTooltipMatch('Compliance')
      },
      {
        getQuickFilterText,
        headerName: 'Voter Dissent',
        field: 'voter_dissent',
        ...gridWidthValuesLrg,
        cellStyle: (params) => greyBackgroudForNull(params.data.voter_dissent),
        cellClassRules: {
          greyBackground: (params) => params.data.voter_dissent === null
        },
        type: width <= MAX_MOBILE_WIDTH ? ['hiddenField'] : ['setColumn', 'enableRowGroup'],
        ...headerTooltipMatch('Voter Dissent')
      }
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'Company_name',
          pinned: 'left'
        }
      ]
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    pivotMode: false,
    components: loadingRenderer,
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    quickSearchFilter: true,
    aggFuncs: {
      'count(Dist)': distinctCounts
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
    suppressFieldDotNotation: true,
    rowData: props.lstGovernanceScores && props.lstGovernanceScores.map((x) => ({
      ...x,
      // market_cap: x.market_cap !== null ? numberWithCommas(Number(x.market_cap).toFixed(0)) : null,
      TrialStatus: props.trialStatus,
      allowDownload: true
    }))
  };

  return (
    <Page {...props} key={1}>
      <div className='row'>
        <div className='col-lg-12 my-2 '>
          {props.isLoadingGovernanceScores ? (
            <div className='vh-100'>
              <div className='h-50'>
                {props.procedureRunningEstimateTime !== undefined && (
                  <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
                )}
              </div>
            </div>
          ) : props.lstGovernanceScores.length > 0 ? (
            <div className='ag-custom-header'>
              <Table
                IsShowCard
                title='Governance Score Data'
                smalltitle=''
                enableCharts
                gridOptions={gridOptionGovernanceScores}
                hideExcelDownloadIcon={props.trialUserDisableDownload}
              />
            </div>
          ) : (
            msgConst.SUPPORT_TEAM_EMAIL_MSG
          )}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(GovernanceScoreDataTools));
