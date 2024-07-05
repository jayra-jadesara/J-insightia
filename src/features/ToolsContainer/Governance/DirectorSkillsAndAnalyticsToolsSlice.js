import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetDirectoDataAndAnalyticsData,
  GetDirectorAnalysisData,
} from '../../../utils/toolDirectorDataAndAnalytics-utils';
import { NUMBER_TWO, NUMBER_ONE } from '../../../constants/NumberConstants';

export const getDirectoDataAndAnalyticsDataReq = createAsyncThunk(
  'getDirectoDataAndAnalyticsDataReqSkills',
  async (req) => {
    const response = await GetDirectoDataAndAnalyticsData(req);
    return response;
  }
);

export const getDirectorAnalysisDataReq = createAsyncThunk(
  'getDirectorAnalysisDataReqSkills',
  async (req) => {
    const response = await GetDirectorAnalysisData(req);
    return response;
  }
);

const DirectorSkillsAndAnalyticsToolsSlice = createSlice({
  name: 'directoSkillsAndAnalytics',
  initialState: {
    ddlGenderOption: [
      { label: 'All', value: 0 },
      { label: 'Male', value: 1 },
      { label: 'Female', value: 2 },
    ],
    lstGenderSelection: [{ label: 'All', value: 0 }],
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

    directorLevelData: true,
    companyLevelData: false,
    individualSkills: true,
    groupedSkills: false,

    currentDirectorYes: true,
    currentDirectorNo: false,
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
        state.lstGenderSelection = action.payload;
      },
      prepare(e) {
        return {
          payload: e,
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

          state.directorLevelData = false;
          state.companyLevelData = false;
          state.individualSkills = false;
          state.groupedSkills = false;
        } else {
          state.directorData = true;
          state.directorAnalysis = false;

          state.directorLevelData = true;
          state.companyLevelData = false;
          state.individualSkills = true;
          state.groupedSkills = false;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleOnChangeOutputFieldLevelDataChecked: {
      reducer(state, action) {
        if (action.payload === NUMBER_ONE) {
          state.directorLevelData = false;
          state.companyLevelData = true;
        } else {
          state.directorLevelData = true;
          state.companyLevelData = false;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleOnChangeOutputFieldSkillsChecked: {
      reducer(state, action) {
        if (action.payload === NUMBER_ONE) {
          state.individualSkills = false;
          state.groupedSkills = true;
        } else {
          state.individualSkills = true;
          state.groupedSkills = false;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleOnChangeCurrentDirectorChecked: {
      reducer(state, action) {
        if (action.payload === NUMBER_ONE) {
          state.currentDirectorYes = false;
          state.currentDirectorNo = true;
        } else {
          state.currentDirectorYes = true;
          state.currentDirectorNo = false;
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
    handleResetFilterAndData: {
      reducer(state) {
        state.ddlGenderOption = [
          { label: 'All', value: 0 },
          { label: 'Male', value: 1 },
          { label: 'Female', value: 2 },
        ];
        state.lstGenderSelection = [{ label: 'All', value: 0 }];
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
        state.directorLevelData = true;
        state.companyLevelData = false;
        state.individualSkills = true;
        state.groupedSkills = false;
        state.currentDirectorYes = true;
        state.currentDirectorNo = false;
        state.lstDirectorAppointmentAnalysisData0 = [];
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
      prepare(e) {
        return {
          payload: {},
        };
      },
    },
  },
  extraReducers: {
    [getDirectoDataAndAnalyticsDataReq.fulfilled]: (state, action) => {
      state.lstDirectoAppointmentData =
        state.lstDirectoAppointmentData.length > 0 ? [] : action.payload;
      state.lstDirectoAppointmentData = action.payload;
      state.isLoading = action.payload === undefined;
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
  handleOnChangeTenureFrom,
  handleOnChangeTenureTo,
  handleOnChangeAgeFrom,
  handleOnChangeAgeTo,
  handleOnChangeBoardFrom,
  handleOnChangeBoardTo,
  handleOnChangeOutputFieldChecked,
  handleOnChangeOutputFieldLevelDataChecked,
  handleOnChangeOutputFieldSkillsChecked,
  handleOnChangeCurrentDirectorChecked,
  handleOnChangeBasedDataChecked,
  handleResetSearch,
  handleResetFilterAndData
} = DirectorSkillsAndAnalyticsToolsSlice.actions;
export default DirectorSkillsAndAnalyticsToolsSlice.reducer;
