import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetDataAmendmentDataandAnalytics } from '../../../utils/toolsAmendmentDataandAnalytics-utils';

export const getDataAmendmentDataandAnalyticsReq = createAsyncThunk(
  'getDataAmendmentDataandAnalyticsReq',
  async () => {
    const response = await GetDataAmendmentDataandAnalytics();
    return response;
  }
);

const AmendmentDataandAnalyticsToolSlice = createSlice({
  name: 'amendmentDataandAnalyticsTool',
  initialState: {
    table_AmendmentDataandAnalytics: [],
    isLoadingAmendmentDataandAnalyticsTool: true
  },
  reducers: {},
  extraReducers: {
    [getDataAmendmentDataandAnalyticsReq.fulfilled]: (state, action) => {
      if (action.payload !== null && action.payload !== undefined) {
        state.table_AmendmentDataandAnalytics = action.payload.data;
        state.isLoadingAmendmentDataandAnalyticsTool = false;
      }
    }
  }
});
export default AmendmentDataandAnalyticsToolSlice.reducer;
