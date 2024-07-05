import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import qs from 'qs';
import { GetCompensationExecutivePayData, GetCompensationNonExecutivePay, GetCompensationHighestPaidExe } from '../../../../utils/company-util';
import { numberWithCommasHandleNulls } from '../../../../utils/table-tools-util';

const query = qs.parse(location.search, { ignoreQueryPrefix: true });
const date = new Date();

export const GetCompensationExecutivePayDataReq = createAsyncThunk(
  'GetCompensationExecutivePayDataReq',
  async (pid) => {
    const response = await GetCompensationExecutivePayData(pid);
    return response;
  }
);

export const GetCompensationNonExecutivePayReq = createAsyncThunk(
  'GetCompensationNonExecutivePayReq',
  async (pid) => {
    const response = await GetCompensationNonExecutivePay(pid);
    return response;
  }
);

export const GetCompensationHighestPaidExeReq = createAsyncThunk(
  'GetCompensationHighestPaidExeReq',
  async (pid) => {
    const response = await GetCompensationHighestPaidExe(pid);
    return response;
  }
);

const ExecutivePaySlice = createSlice({
  name: 'companyCompensationExecutivePay',
  initialState: {
    preferencesIsLoading: true,
    executivePayData: [],
    executivePayDataOrg: [],
    highestExecutiveTotal: [],
    NonExecutiveTotal: [],
    ddlPeriodData: [],
    selectedDdlPeriodData: [],
    loadingData: true,
    yearData: [],
    directorList: [],
    tblHighestExecutiveData: [],
    tblNonExecutiveData: [],
    yearDataOrg: [],
    nonExeDirectorList: [],
    userTrial: false,
  },
  reducers: {
    handleResetLoading: {
      reducer(state, action) {
        state.preferencesIsLoading = true;
        state.executivePayData = [];
        state.executivePayDataOrg = [];
        state.highestExecutiveTotal = [];
        state.NonExecutiveTotal = [];
        state.ddlPeriodData = [];
        state.selectedDdlPeriodData = [];
        state.loadingData = true;
        state.yearData = [];
        state.directorList = [];
        state.tblHighestExecutiveData = [];
        state.tblNonExecutiveData = [];
        state.yearDataOrg = [];
        state.nonExeDirectorList = [];
        state.userTrial = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleChangeYearDdl: {
      reducer(state, action) {
        state.loadingData = true;
        state.executivePayData = undefined;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleChangeUserTrial: {
      reducer(state, action) {
        state.userTrial = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handledOnChangeYear: {
      reducer(state, action) {
        const ExecutiveData = current(state).executivePayDataOrg;
        state.selectedDdlPeriodData = action.payload.e;
        const data = current(state).yearDataOrg;
        let updateData = data;
        if (action.payload.e !== null) {
          updateData = data.slice(0, action.payload.e.value);
        } else {
          const ddlData = current(state).ddlPeriodData;
          const lastIndex = ddlData.length - 1;
          state.selectedDdlPeriodData = ddlData[lastIndex];
          updateData = data;
        }
        // updateData = data.slice(0, action.payload.e.value);
        const data1 = [];

        updateData.filter((item) => {
          const obj = {
            headerName: `${item === date.getFullYear() ? `${item} E` : item}`,
            field: `${item}`,
            aggFunc: 'getNext-ColumnVal',
            cellClass: current(state).userTrial
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
            : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 130,
            maxWidth: query.print ? 110 : null,
            cellRendererFramework: (params) => (params.value ? numberWithCommasHandleNulls(params.value) : '-'),
          };
          data1.push(obj);
        });
          state.yearData = data1;
          state.executivePayData = ExecutiveData;
          state.loadingData = false;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    }
  },
  extraReducers: {
    [GetCompensationExecutivePayDataReq.fulfilled]: (state, action) => {
      console.log('action.payload', action.payload);
      state.executivePayData = action.payload.data;
      state.executivePayDataOrg = action.payload.data;
      state.highestExecutiveTotal = action.payload.HighestData;
      state.NonExecutiveTotal = action.payload.nonExecutiveData;
      state.nonExeDirectorList = action.payload.nonExeDirectorList;
      state.ddlPeriodData = action.payload.yearData;
      const lastIndex = action.payload.yearData.length - 1;
      state.selectedDdlPeriodData = action.payload.yearData[lastIndex];
      const data1 = [];
      state.yearDataOrg = action.payload.yearList;
      action.payload.yearList.filter((item) => {
        const obj = {
          headerName: `${item === date.getFullYear() ? `${item} E` : item}`,
          field: `${item}`,
          aggFunc: 'getNext-ColumnVal',
          cellClass: current(state).userTrial
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
          minWidth: 130,
          maxWidth: query.print ? 110 : null,
          cellRendererFramework: (params) => (params.value ? numberWithCommasHandleNulls(params.value) : '-'),
        };
        data1.push(obj);
      });
      state.yearData = data1;
      state.directorList = action.payload.directorList;
      state.loadingData = action.payload === undefined;
    },
    [GetCompensationNonExecutivePayReq.fulfilled]: (state, action) => {
      state.tblNonExecutiveData = action.payload;
    },
    [GetCompensationHighestPaidExeReq.fulfilled]: (state, action) => {
      state.tblHighestExecutiveData = action.payload;
    }
  },
});

export const { handleResetLoading, handleChangeYearDdl, handledOnChangeYear, handleChangeUserTrial } = ExecutivePaySlice.actions;

export default ExecutivePaySlice.reducer;
