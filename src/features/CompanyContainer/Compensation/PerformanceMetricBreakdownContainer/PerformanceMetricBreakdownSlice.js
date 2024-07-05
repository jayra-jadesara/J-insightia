import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { GetCompensationPerformanceMetricBreakDown, GetCompensationReportYears } from '../../../../utils/company-util';

export const GetCompensationPerformanceMetricBreakDownReq = createAsyncThunk(
  'GetCompensationPerformanceMetricBreakDownReq',
  async (pid) => {
    const response = await GetCompensationPerformanceMetricBreakDown(pid);
    return response;
  }
);

export const GetCompensationReportYearsReq = createAsyncThunk(
  'GetCompensationReportYearsReq',
  async (pid) => {
    const response = await GetCompensationReportYears(pid);
    return response;
  }
);
function updatePerformanceData(arrData, year) {
    return arrData.filter((item) => item.report_year === year);
}
const PerformanceMetricBreakdownSlice = createSlice({
  name: 'companyPerformanceMetricBreakdown',
  initialState: {
    preferencesIsLoading: true,
    tblPerformanceMetricData: [],
    orgTblPerformanceMetricData: [],
    ddlPerformanceBreackDownYear: [],
    selectionPerformanceBreackDownYear: undefined,
    loadingPerformancedata: true,
    isScrollLoading: 10,
  },
  reducers: {
    handleResetLoading: {
      reducer(state, action) {
        state.preferencesIsLoading = true;
        state.tblPerformanceMetricData = [];
        state.orgTblPerformanceMetricData = [];
        state.selectionPerformanceBreackDownYear = undefined;
        state.loadingPerformancedata = true;
        state.isScrollLoading = 10;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetYear: {
      reducer(state, action) {
        state.preferencesIsLoading = true;
        state.selectionPerformanceBreackDownYear = undefined;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleChangeYearDdl: {
        reducer(state, action) {
            state.selectionPerformanceBreackDownYear = action.payload.e;
            state.tblPerformanceMetricData = undefined;
            // const data = current(state).orgTblPerformanceMetricData;
            // state.tblPerformanceMetricData = updatePerformanceData(data, action.payload.e.value);
        },
        prepare(e) {
            return {
                payload: { e },
            };
        }
    },
    handleScrollDownData: {
      reducer(state, action) {
        const range = action.payload;
        const data = current(state).orgTblPerformanceMetricData;
        const olddata = current(state).tblPerformanceMetricData;
        const sliceData = data.slice(range, range + 10);
        if (data !== undefined && olddata !== undefined && data.length >= olddata.length + 10) {
          const updatedData = [...olddata, ...sliceData];
          state.tblPerformanceMetricData = updatedData;
        }
        state.isScrollLoading = olddata.length;
      },
      parepare(e) {
        return {
          payload: { e },
        };
      }
    },
  },
  extraReducers: {
    [GetCompensationPerformanceMetricBreakDownReq.fulfilled]: (state, action) => {
        state.orgTblPerformanceMetricData = action.payload.data.length > 0 ? action.payload.data : [];
        state.tblPerformanceMetricData = action.payload.data.length > 0 ? action.payload.data.slice(0, 10) : [];
        const olddata = current(state).isScrollLoading;
        state.isScrollLoading = 10;
        state.loadingPerformancedata = action.payload === undefined;
    },
    [GetCompensationReportYearsReq.fulfilled]: (state, action) => {
      state.ddlPerformanceBreackDownYear = action.payload.yearData;
      state.selectionPerformanceBreackDownYear = action.payload.yearData[0];
    },
  },
});

export const { handleResetLoading, handleResetYear, handleChangeYearDdl, handleScrollDownData, handleResetState } = PerformanceMetricBreakdownSlice.actions;

export default PerformanceMetricBreakdownSlice.reducer;
