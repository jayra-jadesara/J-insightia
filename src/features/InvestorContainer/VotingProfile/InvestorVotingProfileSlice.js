import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getVotingProfileTopSection,
  getInvestorDDLList,
  getVotingProfileBottomSection,
} from '../../../utils/investorVotingProfile-util';
import { AllowDownload } from '../../../utils/general-util';
import products from '../../../constants/ProductConstants';

export const getInvestorDDLListReq = createAsyncThunk(
  'getInvestorDDLList',
  async (res) => {
    const response = await getInvestorDDLList(res);
    return response;
  }
);

export const getVotingProfileTopSectionReq = createAsyncThunk(
  'getVotingProfileTopSection',
  async (res) => {
    const TrialStatus = false;
    let response = [];
    const productsId = products.VOTING;
    // Trial User Check

    const allowDownload = await AllowDownload(productsId); // Allow Download Option
    response = await getVotingProfileTopSection(res);

    response = {
      ...response,
    };
    return response;
  }
);

export const getVotingProfileBottomSectionReq = createAsyncThunk(
  'getVotingProfileBottomSection',
  async (res) => {
    let response = [];
    response = await getVotingProfileBottomSection(res);
    response = {
      ...response,
    };
    return response;
  }
);

const votingProfileSlice = createSlice({
  name: 'investorVotingProfile',
  initialState: {
    ddlAllInvestor: [],
    ddlSetInvestor: {},
    getVotingProfileTopSectionReq: {},
    getVotingProfileBottomSectionReq: {},

    votingProfile: {},
    tableKeyDocument: [],
    tableProxyVotingSummary: [],
    tableVotingPolicyChanges: [],
    tableContacts: [],
    tableBoards: {},
    tableCommittes: {},
    tableRemuneration: {},
    tableStructure: {},
    tableGeneral: {},
    tableESG: {},
    tableVotingPolicy: {},
    tableNews: [],

    isLoadingVotingProfile: true,
    trialStatus: false,
    allowDownload: true,
    setSection: { status: false, id: 'PolicyChanges' },
  },
  reducers: {
    handleSetInvestor: {
      reducer(state, action) {
        state.ddlSetInvestor = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetSection: {
      reducer(state, action) {
        state.setSection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetVotingProfile: {
      reducer(state) {
        state.getVotingProfileTopSectionReq = {};
        state.getVotingProfileBottomSectionReq = {};
        state.votingProfile = {};
        state.tableKeyDocument = [];
        state.tableProxyVotingSummary = [];
        state.tableVotingPolicyChanges = [];
        state.tableContacts = [];
        state.tableBoards = {};
        state.tableCommittes = {};
        state.tableRemuneration = {};
        state.tableStructure = {};
        state.tableGeneral = {};
        state.tableESG = {};
        state.tableVotingPolicy = {};
        state.tableNews = [];
        state.isLoadingVotingProfile = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
  },
  extraReducers: {
    [getInvestorDDLListReq.fulfilled]: (state, action) => {
      state.ddlAllInvestor =
        action.payload !== undefined ? action.payload.ddlAllInvestor : [];
    },
    [getVotingProfileTopSectionReq.fulfilled]: (state, action) => {
      state.votingProfile =
        action.payload !== undefined ? action.payload.votingProfile : [];
      state.tableKeyDocument =
        action.payload !== undefined ? action.payload.tableKeyDocument : [];
      state.tableProxyVotingSummary =
        action.payload !== undefined
          ? action.payload.tableProxyVotingSummary
          : [];
      state.tableVotingPolicyChanges =
        action.payload !== undefined
          ? action.payload.tableVotingPolicyChanges
          : [];
      // state.tableContacts = action.payload !== undefined ? action.payload.tableContacts : [];
      // state.tableBoards = action.payload !== undefined ? action.payload.tableBoards : {};
      // state.tableCommittes = action.payload !== undefined ? action.payload.tableCommittes : {};
      // state.tableRemuneration = action.payload !== undefined ? action.payload.tableRemuneration : {};
      // state.tableStructure = action.payload !== undefined ? action.payload.tableStructure : {};
      // state.tableGeneral = action.payload !== undefined ? action.payload.tableGeneral : {};
      // state.tableESG = action.payload !== undefined ? action.payload.tableESG : {};
      // state.tableVotingPolicy = action.payload !== undefined ? action.payload.tableVotingPolicy : {};
      // state.tableNews = action.payload !== undefined ? action.payload.tableNews : [];

      state.TrialStatus =
        action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;

      state.isLoadingVotingProfile = action.payload === undefined;
    },
    [getVotingProfileBottomSectionReq.fulfilled]: (state, action) => {
      // state.votingProfile = action.payload !== undefined ? action.payload.votingProfile : [];
      // state.tableKeyDocument = action.payload !== undefined ? action.payload.tableKeyDocument : [];
      // state.tableProxyVotingSummary = action.payload !== undefined ? action.payload.tableProxyVotingSummary : [];
      // state.tableVotingPolicyChanges = action.payload !== undefined ? action.payload.tableVotingPolicyChanges : [];
      state.tableContacts =
        action.payload !== undefined ? action.payload.tableContacts : [];
      state.tableBoards =
        action.payload !== undefined ? action.payload.tableBoards : {};
      state.tableCommittes =
        action.payload !== undefined ? action.payload.tableCommittes : {};
      state.tableRemuneration =
        action.payload !== undefined ? action.payload.tableRemuneration : {};
      state.tableStructure =
        action.payload !== undefined ? action.payload.tableStructure : {};
      state.tableGeneral =
        action.payload !== undefined ? action.payload.tableGeneral : {};
      state.tableESG =
        action.payload !== undefined ? action.payload.tableESG : {};
      state.tableVotingPolicy =
        action.payload !== undefined ? action.payload.tableVotingPolicy : {};
      state.tableNews =
        action.payload !== undefined ? action.payload.tableNews : [];

      state.TrialStatus =
        action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;

      state.isLoadingVotingProfile = action.payload === undefined;
    },
  },
});

export const { handleSetInvestor, handleSetSection, handleResetVotingProfile } =
  votingProfileSlice.actions;

export default votingProfileSlice.reducer;
