import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetActivistShortsFillingsData } from '../../../utils/toolsAiSFeelingsSeach-utis';

export const getActivistShortsFillingsDataReq = createAsyncThunk('getActivistShortsFillingsDataReq', async (cancelToken) => {
  const response = await GetActivistShortsFillingsData(cancelToken);
  return response;
});

const AiSFillingsSearchSlice = createSlice({
  name: 'aisfillingssearch',
  initialState: {
    lstFillingSearchData: [],
    isLoadingFillingData: true
  },
  reducers: {},
  extraReducers: {
    [getActivistShortsFillingsDataReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.isLoadingFillingData = !action.payload;
        state.lstFillingSearchData = action.payload ? action.payload : [];
      }
    }
  }
});

export default AiSFillingsSearchSlice.reducer;
