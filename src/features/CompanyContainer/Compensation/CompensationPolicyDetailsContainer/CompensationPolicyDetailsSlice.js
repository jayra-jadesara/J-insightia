import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  GetCompensatioCompanyolicyDetailsHighestPaidExecutive,
  GetCompensationPolicyDetails,
  GetCompensationPolicyHighestPaidExecutiveData
} from '../../../../utils/company-util';

export const GetCompensatioCompanyolicyDetailsHighestPaidExecutiveReq = createAsyncThunk(
  'GetCompensatioCompanyolicyDetailsHighestPaidExecutiveReq',
  async (pid) => {
    const response = await GetCompensatioCompanyolicyDetailsHighestPaidExecutive(pid);
    return response;
  }
);

export const GetCompensationPolicyDetailsReq = createAsyncThunk('GetCompensationPolicyDetailsReq', async (pid) => {
  const response = await GetCompensationPolicyDetails(pid);
  return response;
});
export const GetCompensationPolicyHighestPaidExecutiveDataReq = createAsyncThunk('GetCompensationPolicyHighestPaidExecutiveDataReq', async (pid) => {
  const response = await GetCompensationPolicyHighestPaidExecutiveData(pid);
  return response;
});

const CompensationPolicyDetailsSlice = createSlice({
  name: 'companyCompensationPolicy',
  initialState: {
    isLoadingCompanyPolicy: true,
    tblShortTermIncentiveHighPaidExe: [],
    tblLongTermIncentiveHighPaidExe: [],
    tblCompensationPolicyDetailsOrg: [],
    tblCompensationPolicyDetails: [],
    ddlCompensationPolicyDetail: [],
    selectionCompensationPolicyDetasil: [],
    tblCompensationPolicyDetail: [],
    tblDynamicHeaders: [],
    isLoaded: false,
  },
  reducers: {
    handleResetLoading: {
      reducer(state, action) {
        state.isLoadingCompanyPolicy = true;
        state.tblShortTermIncentiveHighPaidExe = [];
        state.tblLongTermIncentiveHighPaidExe = [];
        state.tblCompensationPolicyDetailsOrg = [];
        state.tblCompensationPolicyDetails = [];
        state.ddlCompensationPolicyDetail = [];
        state.selectionCompensationPolicyDetasil = [];
        state.tblCompensationPolicyDetail = [];
        state.isLoaded = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleSetIsLoaded: {
      reducer(state, action) {
        state.isLoaded = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleOnChangeDdlOption: {
      reducer(state, action) {
        const data = action.payload.e;
        state.selectionCompensationPolicyDetasil = data;
        const tblOriginalData = current(state).tblCompensationPolicyDetailsOrg;
        const updateValue = [];
        tblOriginalData.filter((item) => {
          if (item.report_year === data.value) {
            updateValue.push(item);
          }
        });
        state.tblCompensationPolicyDetails = updateValue;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
  },
  extraReducers: {
    [GetCompensatioCompanyolicyDetailsHighestPaidExecutiveReq.fulfilled]: (state, action) => {
      state.tblShortTermIncentiveHighPaidExe =
        action.payload !== undefined ? action.payload.shortIncentiveExecutiveData : [];
      state.tblLongTermIncentiveHighPaidExe =
        action.payload !== undefined ? action.payload.longIncentiveExecutiveData : [];
    },
    [GetCompensationPolicyDetailsReq.fulfilled]: (state, action) => {
      state.tblCompensationPolicyDetailsOrg = action.payload !== undefined ? action.payload.data : [];
      state.tblCompensationPolicyDetails = action.payload !== undefined ? action.payload.data : [];
      state.ddlCompensationPolicyDetail = action.payload !== undefined ? action.payload.yearData : [];
      state.selectionCompensationPolicyDetasil = action.payload !== undefined ? action.payload.yearData[0] : [];
      const data = action.payload.data;
      const updateValue = [];
      data.filter((item) => {
        if (item.report_year === action.payload.yearData[0].value) {
          updateValue.push(item);
        }
      });
      state.tblCompensationPolicyDetails = updateValue;
    },
    [GetCompensationPolicyHighestPaidExecutiveDataReq.fulfilled]: (state, action) => {
      const compensationPolicyData = action.payload !== undefined ? action.payload.data : [];
      const dynamicHeader = action.payload !== undefined ? action.payload.header : [];
      const data1 = [];
      if (dynamicHeader.length > 0) {
        dynamicHeader.filter((item) => {
          const obj = {
            headerName: `${item}`,
            field: `${item}`,
            minWidth: 220,
            flex: 2,
            type: ['autoHeightTrue'],
            cellClass: current(state).TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            cellRenderer: (params) => {
                const data = params.value ? params.value : '';
                const splitedData = data.split(',');
                const eDiv = document.createElement('div');
                splitedData.filter((item) => {
                  eDiv.innerHTML += `<span >
                ${item}
                </span><br />`;
                });
                return eDiv;
            }
          };
          data1.push(obj);
        });
      }
      state.tblDynamicHeaders = data1;
      let e = [];
      const modifiedprops = [];
      const modifiedprops1 = [];
      function compare(a, b) {
        if (Number(a.Rank) < Number(b.Rank)) {
          return -1;
        }
        if (Number(a.Rank) > Number(b.Rank)) {
          return 1;
        }
        return 0;
      }
      compensationPolicyData.forEach((e) => {
        if (e.data) {
          modifiedprops.push({
            Rank: e.Rank + 0.2,
            director_type: 'Compensation Structure',
            status: true,
            data: e.data,
            count: e.count
          });
          modifiedprops1.push({
            Rank: e.Rank + 0.1,
            director_type: e.director_name,
            status: false,
            data: e.data,
            count: e.count
          });
        } else {
          modifiedprops.push({
            Rank: e.Rank,
            status: false,
          });
        }
      });

      e = compensationPolicyData.concat(modifiedprops).concat(modifiedprops1).sort(compare);

      for (let i = 0; i < e.length; i += 1) {
        if (i % 2 !== 0) {
          e[i].Rank = '';
        }
      }
      state.tblCompensationPolicyDetail = e;
    },
  },
});

export const { handleResetLoading, handleOnChangeDdlOption, handleSetIsLoaded } = CompensationPolicyDetailsSlice.actions;

export default CompensationPolicyDetailsSlice.reducer;
