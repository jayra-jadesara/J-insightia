import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetGovernanceScores } from '../../../utils/toolsGovernanceScore-utils';

export const getGovernanceScoresReq = createAsyncThunk(
  'getGovernanceScoresReq',
  async () => {
    const response = await GetGovernanceScores();
    return response;
  }
);

const GovernanceScoreToolsSlice = createSlice({
  name: 'governancescoretool',
  initialState: {
    lstGovernanceScores: [],
    headerTooltips: [],
    isLoadingGovernanceScores: true,
  },
  reducers: {},
  extraReducers: {
    [getGovernanceScoresReq.fulfilled]: (state, action) => {
      state.lstGovernanceScores =
        action.payload !== undefined ? action.payload.data : [];
      state.headerTooltips =
        action.payload !== undefined ? action.payload.tooltipData : [];
      state.isLoadingGovernanceScores = false;
    },
  },
});
export default GovernanceScoreToolsSlice.reducer;
