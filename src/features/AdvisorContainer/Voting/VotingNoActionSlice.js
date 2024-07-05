import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetAdvisorVotingDetailInfo,
  GetAdvisorVotingWindandInstrByYear,
  GetLawFirmProposalTypes
} from '../../../utils/advisor-utils';

export const getAdvisorVotingDetailInfoReq = createAsyncThunk(
  'getAdvisorVotingDetailInfoReq',
  async (req) => {
    const response = await GetAdvisorVotingDetailInfo(
      req.intermediaryId,
      req.companyid
    );
    return response;
  }
);

export const getAdvisorVotingWindandInstrByYearReq = createAsyncThunk(
  'getAdvisorVotingWindandInstrByYearReq',
  async (companyId) => {
    const response = await GetAdvisorVotingWindandInstrByYear(companyId);
    return response;
  }
);

export const getLawFirmProposalTypesReq = createAsyncThunk(
  'getLawFirmProposalTypesReq',
  async (companyId) => {
    const response = await GetLawFirmProposalTypes(companyId);
    return response;
  }
);

const VotingNoActionSlice = createSlice({
  name: 'advisorVotingNoAction',
  initialState: {
    isLoadingVotingNoAction: true,
    instructions: 0,
    exclusionsApproved: 0,
    proponentWithdrew: 0,

    lstAdvisorVotingWindandInstrByYear: [],
    lstLawfrmYearData: [],
    lstLawYearsContacts: [],
    lstAdvisorVotingDetailInfoProponentTable: [],
    lstlawFirmProposalTypes: []
  },
  reducers: {
    clearDataNoaction: {
      reducer(state, action) {
        state.lstlawFirmProposalTypes = [];
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleResetAll: {
      reducer(state) {
        state.instructions = 0;
        state.exclusionsApproved = 0;
        state.proponentWithdrew = 0;

        state.lstAdvisorVotingWindandInstrByYear = [];
        state.lstLawfrmYearData = [];
        state.lstLawYearsContacts = [];
        state.lstAdvisorVotingDetailInfoProponentTable = [];
        state.lstlawFirmProposalTypes = [];
        state.isLoadingVotingNoAction = true;
      },
      prepare() {
        return {};
      }
    }
  },
  extraReducers: {
    [getAdvisorVotingDetailInfoReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.isLoadingVotingNoAction = false;
        if (action.payload.length > 0 && action.payload[0].length > 0) {
          const scoreRow = action.payload[0][0];
          state.instructions = scoreRow.instructions;
          state.exclusionsApproved = scoreRow.exclusions_approved.toFixed(1);
          state.proponentWithdrew = scoreRow.proponent_withdrew.toFixed(1);
        }

        if (action.payload.length > 1) {
          state.lstLawfrmYearData = action.payload[1];
        }

        if (action.payload.length > 2) {
          state.lstLawYearsContacts = action.payload[2];
        }

        if (action.payload.length > 3) {
          state.lstAdvisorVotingDetailInfoProponentTable = action.payload[3];
        }
      }
    },
    [getAdvisorVotingWindandInstrByYearReq.fulfilled]: (state, action) => {
      state.lstAdvisorVotingWindandInstrByYear = action.payload;
    },
    [getLawFirmProposalTypesReq.fulfilled]: (state, action) => {
      state.lstlawFirmProposalTypes = action.payload;
    }
  }
});

export const {
  handleVisitorLog,
  resetAdvisorProfile,
  clearDataNoaction,
  handleResetAll
} = VotingNoActionSlice.actions;

export default VotingNoActionSlice.reducer;
