import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
// import products from '../../../../constants/ProductConstants';
import { getHistoricalGovernance } from '../../utils/company-util';
// import numConst from '../../../../constants/NumberConstants';

export const getHistoricalGovernanceReq = createAsyncThunk('getHistoricalGovernanceReq', async (res) => {
  const response = await getHistoricalGovernance(res);
  return { response };
});

const HistoricalGovernanceSlice = createSlice({
  name: 'historicalGovernance',
  initialState: {
    isLoading: true,
    lstHistoricalGov: [],
  },
  reducers: {
    handleResetHistGovData: {
      reducer(state) {
        state.isLoading = true;
        state.lstHistoricalGov = [];
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
  },
  extraReducers: {
    [getHistoricalGovernanceReq.fulfilled]: (state, action) => {
      state.lstHistoricalGov = action.payload.response;
      state.isLoading = false;
    },
  },
});

export const { handleResetHistGovData } = HistoricalGovernanceSlice.actions;

export default HistoricalGovernanceSlice.reducer;
