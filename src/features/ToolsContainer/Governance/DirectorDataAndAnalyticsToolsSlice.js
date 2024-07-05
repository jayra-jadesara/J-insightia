import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  GetDirectoDataAndAnalyticsData,
  GetDirectorAnalysisData,
  GetDDLEthnicityData,
} from '../../../utils/toolDirectorDataAndAnalytics-utils';
import { NUMBER_TWO, NUMBER_ONE } from '../../../constants/NumberConstants';

export const getDirectoDataAndAnalyticsDataReq = createAsyncThunk(
  'getDirectoDataAndAnalyticsDataReq',
  async (req) => {
    const response = await GetDirectoDataAndAnalyticsData(req);
    return response;
  }
);

export const getDirectorAnalysisDataReq = createAsyncThunk(
  'getDirectorAnalysisDataReq',
  async (req) => {
    const response = await GetDirectorAnalysisData(req);
    return response;
  }
);

export const getDDLEthnicityDataReq = createAsyncThunk(
  'getDDLEthnicityDataReq',
  async (req) => {
    const response = await GetDDLEthnicityData(req);
    return response;
  }
);

const lstGenderSelection = [{ label: 'All', value: 0 }];
const ddlGenderOption = [
  { label: 'All', value: 0 },
  { label: 'Male', value: 1 },
  { label: 'Female', value: 2 },
];

const DirectorDataAndAnalyticsToolsSlice = createSlice({
  name: 'directoDataAndAnalytics',
  initialState: {
    ddlGenderOption: ddlGenderOption,
    lstGenderSelection: lstGenderSelection,
    lstEthnicitySelection: [],
    defaultLstEthnicitySelection: [],
    ddlEthnicityOption: [],
    tenureFrom: null,
    tenureTo: null,
    ageFrom: null,
    ageTo: null,
    boardFrom: null,
    boardTo: null,
    lstDirectoAppointmentData: [],
    isLoading: undefined,
    directorData: true,
    directorAnalysis: false,
    lstDirectorAppointmentAnalysisData0: [],
    lstGenderDiversityOfDirectorAppointment: [],
    lstAvgDirectorAge: [],
    lstAvgDirectorTenure: [],
    lstCompaniesWithFemaleDirector: [],
    lstSectorWithAvgFemaleDirector: [],
    lstMktCapCategoryWithAvgFemaleDirector: [],
    lstMktCapCategoryGenderDiversity: [],
    lstNoOfBoardWithMaleAndFemale: [],
    lstNoOfBoardWithMaleAndFemale_Org: [],
    lstCompaniesWithFemaleDirector_Org: [],
    lstAllData: [],
    lstChartKeys: [],
    yearToData: true,
    currentData: false,
  },
  reducers: {
    handleOnChangeGenderDdl: {
      reducer(state, action) {
        if (action.payload !== null) {
          state.lstGenderSelection = action.payload;
        } else {
          state.lstGenderSelection = lstGenderSelection;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleOnChangeEthnicityDdl: {
      reducer(state, action) {
        const selection = action.payload.lstEthnicitySelection;
        if (selection === null) {
          state.lstEthnicitySelection =
            current(state).defaultLstEthnicitySelection;
        } else if (selection !== null && selection.length > 1) {
          const arrWithoutAllSelection = selection.filter(
            (x) => x.value !== -1
          );
          state.lstEthnicitySelection = arrWithoutAllSelection;

          const ddl = current(state).ddlEthnicityOption;
          state.ddlEthnicityOption = ddl.filter((x) => x.value !== -1);
        } else {
          state.lstEthnicitySelection = selection;
        }
      },
      prepare(lstEthnicitySelection) {
        return {
          payload: { lstEthnicitySelection },
        };
      },
    },
    handleOnChangeTenureFrom: {
      reducer(state, action) {
        state.tenureFrom = action.payload !== '' ? action.payload : null;
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleOnChangeTenureTo: {
      reducer(state, action) {
        state.tenureTo = action.payload !== '' ? action.payload : null;
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleOnChangeAgeFrom: {
      reducer(state, action) {
        state.ageFrom = action.payload !== '' ? action.payload : null;
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleOnChangeAgeTo: {
      reducer(state, action) {
        state.ageTo = action.payload !== '' ? action.payload : null;
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleOnChangeBoardFrom: {
      reducer(state, action) {
        state.boardFrom = action.payload !== '' ? action.payload : null;
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleOnChangeBoardTo: {
      reducer(state, action) {
        state.boardTo = action.payload !== '' ? action.payload : null;
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleResetSearch: {
      reducer(state) {
        state.isLoading = true;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleOnChangeOutputFieldChecked: {
      reducer(state, action) {
        if (action.payload === NUMBER_ONE) {
          state.directorData = false;
          state.directorAnalysis = true;
        } else {
          state.directorData = true;
          state.directorAnalysis = false;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleOnChangeBasedDataChecked: {
      reducer(state, action) {
        if (action.payload === NUMBER_TWO) {
          state.yearToData = false;
          state.currentData = true;
        } else {
          state.yearToData = true;
          state.currentData = false;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleResetDirectorDataAndAnalyticsTool: {
      reducer(state) {
        state.ddlGenderOption = ddlGenderOption;
        state.lstGenderSelection = lstGenderSelection;
        state.lstEthnicitySelection = [];
        state.defaultLstEthnicitySelection = [];
        state.ddlEthnicityOption = [];
        state.tenureFrom = null;
        state.tenureTo = null;
        state.ageFrom = null;
        state.ageTo = null;
        state.boardFrom = null;
        state.boardTo = null;
        state.lstDirectoAppointmentData = [];
        state.isLoading = undefined;
        state.directorData = true;
        state.directorAnalysis = false;
        state.lstDirectorAppointmentAnalysisData = [];
        state.lstGenderDiversityOfDirectorAppointment = [];
        state.lstAvgDirectorAge = [];
        state.lstAvgDirectorTenure = [];
        state.lstCompaniesWithFemaleDirector = [];
        state.lstSectorWithAvgFemaleDirector = [];
        state.lstMktCapCategoryWithAvgFemaleDirector = [];
        state.lstMktCapCategoryGenderDiversity = [];
        state.lstNoOfBoardWithMaleAndFemale = [];
        state.lstNoOfBoardWithMaleAndFemale_Org = [];
        state.lstCompaniesWithFemaleDirector_Org = [];
        state.lstAllData = [];
        state.lstChartKeys = [];
        state.yearToData = true;
        state.currentData = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetResult: {
      reducer(state, action) {
        state.lstDirectoAppointmentData = [];
      },
      prepare(e) {
        return {
          payload: {},
        };
      },
    },
    handleUpdateDataDirectorDataAndAnalyticsToolFilters: {
      reducer(state, action) {
        const data = action.payload.data;

        state.lstGenderSelection = data.lstGenderSelection;
        state.lstEthnicitySelection = data.lstEthnicitySelection;
        state.tenureFrom = data.tenureFrom;
        state.tenureTo = data.tenureTo;
        state.boardFrom = data.boardFrom;
        state.boardTo = data.boardTo;
        state.ageFrom = data.ageFrom;
        state.ageTo = data.ageTo;
        state.directorAnalysis = data.directorAnalysis;
        state.directorData = data.directorData;
      },
      prepare(value) {
        return {
          payload: { data: value },
        };
      },
    },
  },
  extraReducers: {
    [getDirectoDataAndAnalyticsDataReq.fulfilled]: (state, action) => {
      state.lstDirectoAppointmentData = action.payload ? action.payload : [];
      state.isLoading = action.payload === undefined;
    },
    [getDDLEthnicityDataReq.fulfilled]: (state, action) => {
      state.ddlEthnicityOption =
        action.payload !== undefined ? action.payload.ddlData : [];
      state.lstEthnicitySelection =
        action.payload !== undefined ? action.payload.ddlAutoSelection : [];
      state.defaultLstEthnicitySelection =
        action.payload !== undefined ? action.payload.ddlAutoSelection : [];
    },
    [getDirectorAnalysisDataReq.fulfilled]: (state, action) => {
      state.isLoading = action.payload === undefined;
      state.lstGenderDiversityOfDirectorAppointment = [];
      state.lstDirectorAppointmentAnalysisData0 =
        action.payload.lstDirectorAppointmentAnalysisData0;
      state.lstGenderDiversityOfDirectorAppointment =
        action.payload.lstGenderDiversityOfDirectorAppointment;
      state.lstAvgDirectorAge = action.payload.lstAvgDirectorAge;
      state.lstAvgDirectorTenure = action.payload.lstAvgDirectorTenure;
      state.lstCompaniesWithFemaleDirector =
        action.payload.lstCompaniesWithFemaleDirector;
      state.lstSectorWithAvgFemaleDirector =
        action.payload.lstSectorWithAvgFemaleDirector;
      state.lstMktCapCategoryWithAvgFemaleDirector =
        action.payload.lstMktCapCategoryWithAvgFemaleDirector;
      state.lstMktCapCategoryGenderDiversity =
        action.payload.lstMktCapCategoryGenderDiversity;
      state.lstNoOfBoardWithMaleAndFemale =
        action.payload.lstNoOfBoardWithMaleAndFemale;
      state.lstNoOfBoardWithMaleAndFemale_Org =
        action.payload.lstNoOfBoardWithMaleAndFemale_Org;
      state.lstCompaniesWithFemaleDirector_Org =
        action.payload.lstCompaniesWithFemaleDirector_Org;
      state.lstAllData = action.payload.data;
      state.lstChartKeys = action.payload.keyData;
    },
  },
});

export const {
  handleOnChangeGenderDdl,
  handleOnChangeEthnicityDdl,
  handleOnChangeTenureFrom,
  handleOnChangeTenureTo,
  handleOnChangeAgeFrom,
  handleOnChangeAgeTo,
  handleOnChangeBoardFrom,
  handleOnChangeBoardTo,
  handleOnChangeOutputFieldChecked,
  handleOnChangeBasedDataChecked,
  handleResetSearch,
  handleResetDirectorDataAndAnalyticsTool,
  handleResetResult,
  handleUpdateDataDirectorDataAndAnalyticsToolFilters,
} = DirectorDataAndAnalyticsToolsSlice.actions;
export default DirectorDataAndAnalyticsToolsSlice.reducer;
