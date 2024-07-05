import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { GetLawFirmsDataShortActivismAdvisor } from '../../../utils/tools-util';

export const getLawFirmsDataShortActivismAdvisorReq = createAsyncThunk(
  'getLawFirmsDataShortActivismAdvisorReq',
  async (res) => {
    const response = await GetLawFirmsDataShortActivismAdvisor(res);
    return response;
  }
);

const initialState = {
  toggleShortsSummary: false,
  lstShortLawFirmsDataActivismAdvisor: [],
  lstShortLawFirmsDataActivismAdvisor_Summary: [],
  isLoadingShortData: true
};

const ActivistCampaignAdvisersSlice = createSlice({
  name: 'shortsActivistCampaignAdvisor',
  initialState,
  reducers: {
    handleToggleShortsSwitch: {
      reducer(state) {
        state.toggleShortsSummary = !state.toggleShortsSummary;
      },
      prepare() {
        return {
          payload: true
        };
      }
    }
  },
  extraReducers: {
    [getLawFirmsDataShortActivismAdvisorReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoadingShortData = false;
        state.lstShortLawFirmsDataActivismAdvisor = action.payload[0];
        state.lstShortLawFirmsDataActivismAdvisor_Summary = action.payload[1];
      } else {
        state.isLoadingShortData = true;
        state.lstShortLawFirmsDataActivismAdvisor = [];
        state.lstShortLawFirmsDataActivismAdvisor_Summary = [];
      }
    }
  }
});

export const { handleToggleShortsSwitch } = ActivistCampaignAdvisersSlice.actions;

export default ActivistCampaignAdvisersSlice.reducer;
