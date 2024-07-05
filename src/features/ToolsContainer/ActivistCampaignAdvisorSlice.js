import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { GetLawFirmsDataActivismAdvisor } from '../../utils/tools-util';

export const getLawFirmsDataActivismAdvisorReq = createAsyncThunk('getLawFirmsDataActivismAdvisorReq', async (req) => {
  const response = await GetLawFirmsDataActivismAdvisor(req);
  return response;
});

const initialState = {
  toggleSummary: false,
  lstLawFirmsDataActivismAdvisor: [],
  lstLawFirmsDataActivismAdvisor_Summary: [],
  isLoadingData: true
};

const ActivistCampaignAdvisersSlice = createSlice({
  name: 'ActivistCampaignAdvisor',
  initialState,
  reducers: {
    handleToggleSwitch: {
      reducer(state) {
        state.toggleSummary = !state.toggleSummary;
      },
      prepare() {
        return {
          payload: true
        };
      }
    }
  },
  extraReducers: {
    [getLawFirmsDataActivismAdvisorReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoadingData = false;
        state.lstLawFirmsDataActivismAdvisor = action.payload[0];
        state.lstLawFirmsDataActivismAdvisor_Summary = action.payload[1];
      } else {
        state.isLoadingData = true;
      }
    }
  }
});

export const { handleToggleSwitch } = ActivistCampaignAdvisersSlice.actions;

export default ActivistCampaignAdvisersSlice.reducer;
