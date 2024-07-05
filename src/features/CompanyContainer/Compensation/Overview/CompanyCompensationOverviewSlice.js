import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { GetCompensationOverviewSummaryDetails, GetCompensationOverviewExecutiveAndDirectorDetails } from '../../../../utils/company-util';

export const getCompensationOverviewSummaryDetailsReq = createAsyncThunk(
  'getCompensationOverviewSummaryDetailsReq',
  async (pid) => {
    const response = await GetCompensationOverviewSummaryDetails(pid);
    return response;
  }
);
// GetCompensationOverviewExecutiveAndDirectorDetails
export const getCompensationOverviewExecutiveAndDirectorDetailsReq = createAsyncThunk(
  'getCompensationOverviewExecutiveAndDirectorDetailsReq',
  async (pid) => {
    const response = await GetCompensationOverviewExecutiveAndDirectorDetails(pid);
    return response;
  }
);

const CompanyCompensationOverviewSlice = createSlice({
  name: 'companyCompensationOverview',
  initialState: {
    preferencesIsLoading: true,
    compensationOverviewSummaryData: [],
    compensationOverviewExecutiveData: [],
    compensationOverviewExecutiveDataYearHeader: [],
    compensationOverviewDirectorData: [],
    isCompensationLoading: true,
    sparklineChartData: [],
    sparklineYearData: [],
    committeeHeaders: [],
  },
  reducers: {
    handleResetLoading: {
      reducer(state, action) {
        state.preferencesIsLoading = true;
        state.compensationOverviewSummaryData = [];
        state.compensationOverviewExecutiveData = [];
        state.compensationOverviewDirectorData = [];
        state.isCompensationLoading = true;
        state.sparklineChartData = [];
        state.sparklineYearData = [];
        state.committeeHeaders = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
  },
  extraReducers: {
    [getCompensationOverviewSummaryDetailsReq.fulfilled]: (state, action) => {
      state.compensationOverviewSummaryData = action.payload.summaryData !== undefined ? action.payload.summaryData : [];
      state.sparklineChartData = action.payload !== undefined ? action.payload.chartData : [];
      state.sparklineYearData = action.payload !== undefined ? action.payload.yearData : [];
      state.isCompensationLoading = action.payload === undefined;
    },
    [getCompensationOverviewExecutiveAndDirectorDetailsReq.fulfilled]: (state, action) => {
      state.committeeHeaders =
        action.payload !== undefined ? action.payload.committeeHeaders : [];
      state.compensationOverviewExecutiveData = action.payload !== undefined ? action.payload.executieData : [];
      state.compensationOverviewExecutiveDataYearHeader = action.payload !== undefined ? action.payload.yearHeader : [];
      state.compensationOverviewDirectorData = action.payload !== undefined ? action.payload.directorData : [];
    },
  },
});

export const { handleResetLoading } = CompanyCompensationOverviewSlice.actions;

export default CompanyCompensationOverviewSlice.reducer;
