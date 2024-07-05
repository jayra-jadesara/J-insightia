import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetToolsActivismFillingsData } from '../../utils/tools-util';

export const getToolsActivismFillingsDataReq = createAsyncThunk('getToolsActivismFillingsDataReq', async (req) => {
  const response = await GetToolsActivismFillingsData(req);
  return response;
});

const FillingSearchToolsSlice = createSlice({
  name: 'fillingSearchTool',
  initialState: {
    lstToolsActivismFillingsData: [],
    isLoadingFillingData: true,
    allowDownload: true,
    trialStatus: false,
    userMessage: ''
  },
  reducers: {},
  extraReducers: {
    [getToolsActivismFillingsDataReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoadingFillingData = false;
      state.lstToolsActivismFillingsData = action.payload.length > 0 ? action.payload : [];
      } else {
        state.isLoadingFillingData = true;
        state.lstToolsActivismFillingsData = [];
      }
    }
  }
});

export const { handleResetFillingDataSearch } = FillingSearchToolsSlice.actions;

export default FillingSearchToolsSlice.reducer;
