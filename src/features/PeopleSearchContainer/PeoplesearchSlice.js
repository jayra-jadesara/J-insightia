import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  UpdateVisitorLog,
  TokenDecode,
  HandleTrialLogPeople
} from '../../utils/general-util';
import {
  People_search,
  GetPropleProfile,
  getDirectorPersonInfo,
  getDirectorAppointmentInfo,
  getDirectorAppointmentInfo2,
  GetDirectorsDetails,
  GetDirectorContactData,
  GetDirectorOnBoardData,
  getGanttChartSampleData,
  getIndividualGrantedPeopleCompensation,
  getPeopleOverview
} from '../../utils/peopleSearch-util';

import {
  NUMBER_ZERO,
  NUMBER_ONE,
} from '../../constants/NumberConstants';
import {
  gridWidthValuesVLrg, numberWithCommasHandleNulls,
} from '../../utils/table-tools-util';

export const peopleSearchFormReq = createAsyncThunk(
  'peopleSearchFormReq',
  async (arg) => {
    const response = await People_search(arg.name_search, arg.quicksearch);
    return response;
  }
);

export const getTokenDecode = createAsyncThunk('getTokenDecode', async () => {
  const response = await TokenDecode();
  return response;
});

export const getPeopleProfileReq = createAsyncThunk(
  'getPeopleProfileReq',
  async (director_id) => {
    const response = await GetPropleProfile(director_id);
    return response;
  }
);

export const getDirectorPersonInfoReq = createAsyncThunk(
  'getDirectorPersonInfoReq',
  async (director_id) => {
    const response = await getDirectorPersonInfo(director_id);
    return response;
  }
);

export const getDirectorAppointmentInfoReq = createAsyncThunk(
  'getDirectorAppointmentInfo',
  async (arg) => {
    const response = await getDirectorAppointmentInfo(
      arg.director_id,
      arg.current
    );
    return response;
  }
);

export const getDirectorAppointmentInfo2Req = createAsyncThunk(
  'getDirectorAppointmentInfo2',
  async (arg) => {
    const response = await getDirectorAppointmentInfo2(
      arg.director_id,
      arg.current
    );
    return response;
  }
);

export const handleTrialLogReq = createAsyncThunk(
  'handleTrialLogReq',
  async (product_id) => {
    let response = false;
    if (product_id !== undefined) {
      response = await HandleTrialLogPeople(product_id);
    }
    return response;
  }
);

export const getDirectorsDetailsReq = createAsyncThunk(
  'getDirectorsDetailsRea',
  async (director_id) => {
    const response = await GetDirectorsDetails(director_id);
    return response;
  }
);
export const getDirectorContactDataReq = createAsyncThunk(
  'getDirectorContactDataReq',
  async (director_id) => {
    const response = await GetDirectorContactData(director_id);
    return response;
  }
);
export const getDirectorOnBoardDataReq = createAsyncThunk(
  'getDirectorOnBoardDataReq',
  async (director_id) => {
    const response = await GetDirectorOnBoardData(director_id);
    return response;
  }
);
export const getGanttChartSampleDataReq = createAsyncThunk(
  'getGanttChartSampleDataReq',
  async (director_id) => {
    const response = await getGanttChartSampleData(director_id);
    return response;
  }
);
export const getIndividualGrantedPeopleCompensationReq = createAsyncThunk(
  'getIndividualGrantedPeopleCompensation',
  async (director_id) => {
    const response = await getIndividualGrantedPeopleCompensation(director_id);
    return response;
  }
);
export const getPeopleOverviewReq = createAsyncThunk(
  'getPeopleOverview',
  async (director_id) => {
    const response = await getPeopleOverview(director_id);
    return response;
  }
);

const Peoplesearchslice = createSlice({
  name: 'Peoplesearch',
  initialState: {
    getTokenDecode: [],
    lstPeopldata: undefined,
    people_name: '',
    people_data: '',
    person_info: [],
    director_appointment_info: [],
    director_appointment_info2: [],
    trail_log: false,
    tblCurrentDirector: undefined,
    tblPastDirector: undefined,
    lstActivistEmployee: [],
    tblOnBoardActivist: [],
    ganttChartData: [],
    lstNonExecutiveAppointment: undefined,
    lstHistoricalAppointment: undefined,
    dataGovRole: [],
    dataCompensation: [],
    isLoadingOverviewPeople: true,
    compensationPeriods: [],
    compensationYearSelected: { label: '1 year', value: 0 },
    inVisibleColumnsArr: [],
    availYears1: [],
    availYears2: [],
    MergeYear: [],
    yearGrid: [],
    isLoadingPeopleCompensation: true,
    isHandled: false,
    compensationNoData: false,
    TrialStatusCell: false,
  },
  reducers: {
    handleResetPeople: {
      reducer(state) {
        state.person_info = [];
        state.director_appointment_info = [];
        state.director_appointment_info2 = [];
        state.ganttChartData = [];
        state.tblCurrentDirector = undefined;
        state.tblPastDirector = undefined;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleVisitorLog: {
      reducer() {},
      prepare(page_name, query_string) {
        UpdateVisitorLog(page_name, query_string);
        return {
          payload: { DecodeToken: [] },
        };
      },
    },
    resetPeopleProfile: {
      reducer(state, action) {
        state.people_data = action.payload;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },

    handleResetSearch: {
      reducer(state) {
        state.lstPeopldata = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetAll: {
      reducer(state) {
        state.lstPeopldata = undefined;
        // state.people_name = '';
        // state.people_data = '';
        state.person_info = [];
        state.director_appointment_info = [];
        state.director_appointment_info2 = [];
        state.ganttChartData = [];
        state.tblCurrentDirector = undefined;
        state.tblPastDirector = undefined;
      },
      prepare() {
        return {};
      },
    },
    handleResetPeopleOverview: {
      reducer(state) {
        state.dataGovRole = [];
        state.dataCompensation = [];
        state.isLoadingOverviewPeople = true;
      },
      prepare() {
        return {};
      },
    },
    handleYearOnChange: {
      reducer(state, action) {
        if (action.payload) {
          state.compensationYearSelected = action.payload;
        } else {
          state.compensationYearSelected = state.compensationPeriods[state.compensationPeriods.length - 1];
        }
        state.isLoadingPeopleCompensation = true;
        state.isHandled = true;
      },
      prepare(e) {
        return { payload: e };
      },
    },
    handleResetCompensation: {
      reducer(state) {
        state.compensationNoData = false;
        state.lstNonExecutiveAppointment = undefined;
        state.lstHistoricalAppointment = undefined;
        state.availYears1 = [];
        state.availYears2 = [];
        state.compensationPeriods = [];
        state.compensationYearSelected = { label: '1 year', value: 0 };
        state.inVisibleColumnsArr = [];
        state.availYears1 = [];
        state.availYears2 = [];
        state.MergeYear = [];
        state.yearGrid = [];
        state.people_data = '';
      },
      prepare() {
        return {};
      },
    },
    handleTrialStatusCell: {
      reducer(state, action) {
        state.isLoadingPeopleCompensation = true;
        state.TrialStatusCell = action.payload;
      },
      prepare(e) {
        return { payload: e };
      },
    },
  },
  extraReducers: {
    [getTokenDecode.fulfilled]: (state, action) => {
      state.getTokenDecode = action.payload !== undefined ? action.payload : [];
    },
    [peopleSearchFormReq.fulfilled]: (state, action) => {
      state.lstPeopldata = action.payload !== undefined ? action.payload.data : [];
    },
    [getPeopleProfileReq.fulfilled]: (state, action) => {
      state.people_data = action.payload !== undefined ? action.payload.data : '';
      state.people_name = action.payload !== undefined ? action.payload.people_name : '';
    },
    [getDirectorPersonInfoReq.fulfilled]: (state, action) => {
      state.person_info = action.payload !== undefined ? action.payload : [];
    },
    [getDirectorAppointmentInfoReq.fulfilled]: (state, action) => {
      state.director_appointment_info = action.payload !== undefined ? action.payload : {};
    },
    [getDirectorAppointmentInfo2Req.fulfilled]: (state, action) => {
      state.director_appointment_info2 = action.payload !== undefined ? action.payload : {};
    },
    [handleTrialLogReq.fulfilled]: (state, action) => {
      state.handleTrialLogReq = action.payload !== undefined ? action.payload : false;
    },
    [getDirectorsDetailsReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.tblCurrentDirector = action.payload !== undefined ? action.payload.current_director : [];
        state.tblPastDirector = action.payload !== undefined ? action.payload.past_director : [];
      }
    },
    [getDirectorContactDataReq.fulfilled]: (state, action) => {
      if (action.payload !== null && action.payload) {
        const data = action.payload.data;
        data.filter((x) => {
          if (action.payload.active) {
            state.lstActivistEmployee.push(x.name);
          } else if (!action.payload.active) {
            state.lstActivistEmployee.push(`${x.name}(Former)`);
          } else {
            state.lstActivistEmployee.push(`${x.name}(No)`);
          }
        });
      }
    },
    [getDirectorOnBoardDataReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.tblOnBoardActivist = action.payload !== undefined ? action.payload : [];
      }
    },
    [getGanttChartSampleDataReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.ganttChartData = action.payload.data;
      }
    },
    [getIndividualGrantedPeopleCompensationReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstNonExecutiveAppointment = action.payload.result1 ? action.payload.result1 : [];
        state.lstHistoricalAppointment = action.payload.result2 ? action.payload.result2 : [];
        state.availYears1 = action.payload.AvailYears1 ? action.payload.AvailYears1 : [];
        state.availYears2 = action.payload.AvailYears2 ? action.payload.AvailYears2 : [];
        const MergeYear = [...state.availYears1, ...state.availYears2].sort((a, b) => b - a);
        state.MergeYear = MergeYear && [...new Set(MergeYear.map((item) => item))];
        state.compensationPeriods = state.MergeYear && state.MergeYear.map((y, i) => ({ label: `Year ${i + NUMBER_ONE}`, value: i + NUMBER_ONE }));
        if (!state.isHandled) {
          state.compensationYearSelected = state.compensationPeriods[state.compensationPeriods.length - NUMBER_ONE];
        }
        state.MergeYear = state.MergeYear.length > 0 && state.MergeYear.slice(NUMBER_ZERO, state.compensationYearSelected.value);
        const grid = [];
        state.MergeYear.length > 0 && state.MergeYear.map((y) => {
          grid.push({
            headerName: y,
            field: y,
            ...gridWidthValuesVLrg,
            aggFunc: 'getNext-ColumnVal',
            cellClass: state.TrialStatusCell
              ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (params.value ? numberWithCommasHandleNulls(params.value) : '-'),
          });
        });
        state.yearGrid = grid;
        state.isLoadingPeopleCompensation = false;
        if (
          state.lstNonExecutiveAppointment &&
          state.lstNonExecutiveAppointment.length === 0 &&
          state.lstHistoricalAppointment &&
          state.lstHistoricalAppointment.length === 0
        ) {
          state.compensationNoData = true;
        }
      }
    },
    [getPeopleOverviewReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.dataGovRole = action.payload[NUMBER_ZERO] && action.payload[NUMBER_ZERO];
        state.dataCompensation = action.payload[NUMBER_ONE] && action.payload[NUMBER_ONE];
        state.isLoadingOverviewPeople = undefined;
      }
    },
  },
});

export const {
  resetPeopleProfile,
  handleVisitorLog,
  handleResetPeople,
  handleResetSearch,
  handleResetAll,
  handleResetPeopleOverview,
  handleYearOnChange,
  handleResetCompensation,
  handleTrialStatusCell,
} = Peoplesearchslice.actions;

export default Peoplesearchslice.reducer;
