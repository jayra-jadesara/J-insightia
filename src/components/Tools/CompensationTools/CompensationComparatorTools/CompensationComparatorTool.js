import React, { useCallback, useEffect, useState } from 'react';
import Page from '../../../Page';
import UnderConstruction from '../../../../pages/UnderConstruction';
import {
  gridWidthValues,
  gridWidthValuesLrg,
  gridWidthValuesSml,
  gridWidthValuesXLrg,
  gridWidthValuesVLrg,
  numberWithCommasHandleNulls,
} from '../../../../utils/table-tools-util';
import Table from '../../../GeneralForm/Table';
import { filters } from '../../../../utils/AgGridFunctions';
import CompensationComparatorFilter from './CompensationComparatorFilter';
import { dateToNull } from '../../../../utils/general-util';
import ProcedureConstant from '../../../../constants/ProcedureConstant';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import { NORECORDS, LOADING, SUPPORT_TEAM_EMAIL_MSG } from '../../../../constants/MessageConstans';
import Card from '../../../GeneralForm/Card';

const data = [];

const CompensationComparatorTool = (props) => {
  const [isGridOption, setIsGridOption] = useState(null);
  const onSearch = async () => {
    await props.handleResetComparatorToolData();
    await props.getProcedureRunningEstimateTimeReq(ProcedureConstant.COMPENSATION_COMPARATOR_TOOL);
    const body = {
      companySearchId:
          props.companySearchOptionSelection !== undefined ? props.companySearchOptionSelection.value : null,
      director_id:
        props.selectionCompensationIndivisual !== undefined && props.selectionCompensationIndivisual.length > 0
          ? props.selectionCompensationIndivisual.map((c) => c.value).toString()
          : '',
      role:
        props.selectionDirectortypes !== undefined && props.selectionDirectortypes.length > 0
          ? props.selectionDirectortypes.map((c) => c.value).toString()
          : '',
      tenure:
        props.selectionDdlCompensationTenure !== undefined && props.selectionDdlCompensationTenure.length > 0
          ? props.selectionDdlCompensationTenure.map((c) => c.value).toString()
          : '',
      committee: '',
      DateFrom: props.isCompensationDateChecked ? props.compensatinStartDate : null,
      DateTo: props.isCompensationDateChecked ? props.compensationEndDate : null,
      compensationType: props.selectionCompensationType.value,
    };
    await props.getCompensationComparatorDataReq(body);
  };
  const gridOptionPersonnel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'Company_name',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
      },
      {
        headerName: 'Name',
        field: 'Director_Name',
        ...gridWidthValuesVLrg,
        type: ['setColumn'],
      },
      {
        headerName: 'Role',
        field: 'Role',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
      },
      {
        headerName: 'Committees',
        field: 'Committees',
        type: ['setColumn'],
        minWidth: 300,
      },
      {
        headerName: 'Committee Chair?',
        field: 'Committee_Chair',
        ...gridWidthValuesLrg,
        type: ['setColumn'],
      },
      {
        headerName: 'Report Date',
        field: 'Report_Date',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Base Salary',
        field: 'Base_Salary',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Base_Salary)
      },
      {
        headerName: 'Cash Bonus',
        field: 'cash_bonusCash_Bonus',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.cash_bonusCash_Bonus)
      },
      {
        headerName: 'Non-EIP',
        field: 'NEIP',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.NEIP)

      },
      {
        headerName: 'Shares',
        field: 'Shares',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Shares)
      },
      {
        headerName: 'Options',
        field: 'Options',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Options)

      },
      {
        headerName: 'Benefits',
        field: 'benefitsBenefits_Expense',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.benefitsBenefits_Expense)
      },
      {
        headerName: 'Sign on Bonus',
        field: 'Sign_on_Bonus',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Sign_on_Bonus)
      },
      {
        headerName: 'Total Direct Compensation',
        field: 'total_direct',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.total_direct)
      },
      {
        headerName: 'Pension/Other',
        field: 'pension_other',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.pension_other)
      },
      {
        headerName: 'Severence',
        field: 'severence',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.severence)
      },
      {
        headerName: 'Total Indirect Compensation',
        field: 'total_indirect',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        hide: props.selectionCompensationType.value === 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.total_indirect)
      },
      {
        headerName: 'Deferred Cash',
        field: 'STI_deferred_cash',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        hide: props.selectionCompensationType.value !== 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.STI_deferred_cash)
      },
      {
        headerName: 'Deferred Shares',
        field: 'STI_deferred_shares',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        hide: props.selectionCompensationType.value !== 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.STI_deferred_shares)
      },
      {
        headerName: 'Unvested Restricted Shares',
        field: 'Unvested_Restricted_Shares',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        hide: props.selectionCompensationType.value !== 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Unvested_Restricted_Shares)
      },
      {
        headerName: 'Unvested Performance Shares',
        field: 'Unvested_Performance_Shares',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        hide: props.selectionCompensationType.value !== 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Unvested_Performance_Shares)
      },
      {
        headerName: 'Unexercisable Options',
        field: 'Unexercisable_Options',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        hide: props.selectionCompensationType.value !== 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Unexercisable_Options)
      },
      {
        headerName: 'Exerciseable Options',
        field: 'Exercisable_Options',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        hide: props.selectionCompensationType.value !== 'Outstanding',
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Exercisable_Options)
      },
      {
        headerName: 'Committee Fee Audit',
        field: 'Committee_fee_audit',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Committee_fee_audit)
      },
      {
        headerName: 'Committee Fee Remuneration',
        field: 'Committee_fee_remuneration',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Committee_fee_remuneration)
      },
      {
        headerName: 'Committee Fee Nomination',
        field: 'Committee_fee_nomination',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Committee_fee_nomination)
      },
      {
        headerName: 'Committee Fee Risk',
        field: 'Committee_fee_risk',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Committee_fee_risk)
      },
      {
        headerName: 'Committee Fee Other',
        field: 'Committee_fee_other',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Committee_fee_other)
      },
      {
        headerName: 'Allowance fee  ',
        field: 'Allowance_fee',
        type: ['setColumn'],
        ...gridWidthValuesLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Allowance_fee)
      },
      {
        headerName: 'Fee for attending',
        field: 'Fee_for_attending',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Fee_for_attending)
      },
      {
        headerName: 'Cost reimb. for domestic travel',
        field: 'Cost_reimb_for_domestic_travel',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Cost_reimb_for_domestic_travel)
      },
      {
        headerName: 'Cost reimb. For international travel',
        field: 'Cost_reimb_for_international_travel',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Cost_reimb_for_international_travel)
      },
      {
        headerName: 'Fee for attending non domestic meeting',
        field: 'Fee_for_attending_non_domestic_meeting',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Fee_for_attending_non_domestic_meeting)
      },
      {
        headerName: 'Off cycle meeting fee',
        field: 'Off_cycle_meeting_fee',
        type: ['setColumn'],
        ...gridWidthValuesVLrg,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Off_cycle_meeting_fee)
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData:
      props.tblCompensationComparatorToolData !== undefined &&
      props.tblCompensationComparatorToolData.map((x) => ({
        ...x,
        TrialStatus: false,
        allowDownload: false,
        Report_Date: x.Report_Date !== null ? dateToNull(x.Report_Date, 'dd-mmm-yy', true) : null,
      })),
    quickSearchFilter: false,
    domLayout: 'normal',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false, pageSize: 0 },
    gridHeight: '70vh',
  };
  useEffect(() => {
    if (!props.isComparatorToolLoading && props.tblCompensationComparatorToolData !== undefined) {
      const newArrColDef = gridOptionPersonnel.colDefsMedalsIncluded.filter((x) => !x.hide);
      gridOptionPersonnel.colDefsMedalsIncluded = newArrColDef;
      setIsGridOption(gridOptionPersonnel);
    }
    if (props.isComparatorToolLoading) {
      setIsGridOption(null);
    }
  }, [props.isComparatorToolLoading, props.tblCompensationComparatorToolData]);
  return (
    <Page>
      <CompensationComparatorFilter {...props} isShowInvestorSelection={false} onSearch={onSearch} />
      <div className='my-3'>
        {props.isComparatorToolLoading ? (
          <div className='vh-100'>
            <div className='h-50'>
              {props.procedureRunningEstimateTime !== undefined && (
                <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
              )}
            </div>
          </div>
        ) : (
          <>
            {props.tblCompensationComparatorToolData !== undefined &&
            props.tblCompensationComparatorToolData.length > 0 ? (
              <>
                {isGridOption !== null && (
                  <Card>
                  <Table
                    IsShowCard={false}
                    title='Compensation Comparator Tool'
                    pageTitle='Compensation Comparator Tool'
                    smalltitle=''
                    hideExcelDownloadIcon={false}
                    gridOptions={isGridOption}
                  />
                  </Card>
                )}
              </>
            ) : (
              <Card>{SUPPORT_TEAM_EMAIL_MSG}</Card>
            )}
          </>
        )}
      </div>
    </Page>
  );
};

export default CompensationComparatorTool;
