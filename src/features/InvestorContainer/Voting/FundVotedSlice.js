import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetVotedByManagerList } from '../../../utils/investor-util';

export const getVotedByManagerListReq = createAsyncThunk(
  'getVotedByManagerListReq',
  async (investor_id) => {
    const response = await GetVotedByManagerList(investor_id);
    return response;
  }
);

const FundVotedSlice = createSlice({
  name: 'invFundVoted',
  initialState: {
    isLoadingVotedManagerList: true,
    lstGetVotedByManagerList: []
  },
  reducers: {
    handleResetFundVoted: {
      reducer(state) {
        state.isLoadingVotedManagerList = true;
        state.lstGetVotedByManagerList = [];
      },
      prepare() {
        return {};
      }
    }
  },
  extraReducers: {
    [getVotedByManagerListReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstGetVotedByManagerList = action.payload;
        state.isLoadingVotedManagerList = action.payload === undefined;
      }
    }
  }
});
export const { handleResetFundVoted } = FundVotedSlice.actions;

export default FundVotedSlice.reducer;
