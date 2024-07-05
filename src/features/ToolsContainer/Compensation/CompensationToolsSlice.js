import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import TrendsConst from '../../../constants/ActivismTrendsConstant';
import { GetCompensationComparatorData, GetDirectorTypesData } from '../../../utils/toolsCompesation-utils';
import { dateToNull, GetDefaultStartAndEndDate } from '../../../utils/general-util';

const { startDate, endDate } = GetDefaultStartAndEndDate();

export const getCompensationComparatorDataReq = createAsyncThunk('getCompensationComparatorDataReq', async (req) => {
  const response = await GetCompensationComparatorData(req);
  return response;
});
export const GetDirectorTypesDataReq = createAsyncThunk('GetDirectorTypesDataReq', async (req) => {
  const response = await GetDirectorTypesData(req);
  return response;
});

const obj = [];
for (let i = 0; i <= 20; i++) {
  obj.push({
    label: i,
    value: i
  });
}
const CompensationToolsSlice = createSlice({
  name: 'CompensationTools',
  initialState: {
    isComparatorToolLoading: true,
    tblCompensationComparatorToolData: undefined,
    selectionCompensationType: { label: 'Granted', value: 'Granted' },
    ddlCompensationType: [
      { label: 'Granted', value: 'Granted' },
      { label: 'Realised', value: 'Realised' },
      { label: 'Outstanding', value: 'Outstanding' },
    ],
    ddlCompensationTenure: obj,
    selectionDdlCompensationTenure: [],
    compensatinStartDate: startDate,
    compensationEndDate: endDate,
    isCompensationDateChecked: false,
    ddlDirectortypes: [],
    selectionDirectortypes: [],
    selectionCompensationIndivisual: [],
  },
  reducers: {
    handleRegionChange: {
      reducer(state, action) {
        if (action.payload == null) {
          state.selectedRegion = state.defaultRegion;
        } else {
          state.selectedRegion = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleOnChangeDdlValue: {
      reducer(state, action) {
        state.selectionCompensationType = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetComparatorToolData: {
      reducer(state, action) {
        state.isComparatorToolLoading = true;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleCompensationTenure: {
      reducer(state, action) {
        state.selectionDdlCompensationTenure = action.payload.e ? action.payload.e : undefined;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleCompensationDirectorType: {
      reducer(state, action) {
        state.selectionDirectortypes = action.payload.e ? action.payload.e : undefined;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleCompensationIndividualSelection: {
      reducer(state, action) {
        state.selectionCompensationIndivisual = action.payload.e ? action.payload.e : undefined;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleStartInvCompensationDateSelection: {
      reducer(state, action) {
        state.compensatinStartDate = action.payload.date;
        if (state.compensationEndDate <= action.payload.date) {
          state.compensationEndDate = action.payload.date;
        }
      },
      prepare(value, e) {
        return {
          payload: { date: new Date(value), e },
        };
      },
    },
    handleEndInvCompensationDateSelection: {
      reducer(state, action) {
        state.compensationEndDate = action.payload.date;
      },
      prepare(value, e) {
        return {
          payload: { date: new Date(value), e },
        };
      },
    },
    handleIsInvCompendationDateChecked: {
      reducer(state, action) {
        state.isCompensationDateChecked = action.payload.isChecked;
      },
      prepare(e) {
        return {
          payload: { isChecked: e.target.checked },
        };
      },
    },
    handleResetCompensationTools: {
      reducer(state, action) {
        state.selectionDdlCompensationTenure = [];
        state.selectionDirectortypes = [];
        state.selectionCompensationIndivisual = [];
        state.isComparatorToolLoading = true;
        state.tblCompensationComparatorToolData = undefined;
        state.compensatinStartDate = startDate;
        state.compensationEndDate = endDate;
      },
      prapare(e) {
        return {
          payload: { e },
        };
      },
    }
  },
  extraReducers: {
    [getCompensationComparatorDataReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.tblCompensationComparatorToolData = action.payload ? action.payload : [];
        state.isComparatorToolLoading = action.payload === undefined;
      }
    },
    [GetDirectorTypesDataReq.fulfilled]: (state, action) => {
      state.ddlDirectortypes = action.payload !== undefined ? action.payload : [];
    },
  },
});

export const {
  handleRegionChange,
  handleOnChangeDdlValue,
  handleResetComparatorToolData,
  handleCompensationTenure,
  handleCompensationDirectorType,
  handleCompensationIndividualSelection,
  handleStartInvCompensationDateSelection,
  handleEndInvCompensationDateSelection,
  handleIsInvCompendationDateChecked,
  handleResetCompensationTools
} = CompensationToolsSlice.actions;

export default CompensationToolsSlice.reducer;
