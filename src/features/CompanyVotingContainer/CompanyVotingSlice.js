import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  MeetingQuickViewDynamicPivotv4,
  GetVoteResults_v3,
  ListMeetingDates,
  GetVotingData_allvotes_v2,
  ListIssuerVotesAgainst,
  GetVotingData_rationale_meeting_against,
  GetSelectedProposalsCountry,
  BindgvVotingGrid,
  GetIssuer_Meeting_stats,
  getIssuerLatestMeetingId,
  getProposalList,
  getIssuerProfile,
  ListVotingOwnershipForProposal_v2,
  GetVotingData_rationale,
  Get_OtherBoards,
  ListVotingAndOwnerhipForProposal_insightia,
  getMeetingURLs,
  GetNoActionTrackInfo,
  GetNoActionLetterProposalDetail,
  getShareClasses,
  getSplitVotingDetails,
  GetVotingData_rationale_meeting,
} from '../../utils/company-util';
import productsConst from '../../constants/ProductConstants';
import { AllowDownload } from '../../utils/general-util';
import { ChangeName, NameToImageIcon } from '../../utils/AgGridFunctions';

// General
export const getIssuerProfileReq = createAsyncThunk(
  'getIssuerProfile',
  async (obj) => {
    const response = await getIssuerProfile(obj.meetingid);
    return response;
  }
);

// Overview
export const getIssuer_Meeting_statsReq = createAsyncThunk(
  'IssuerMeetingStatsList',
  async (req) => {
    const response = await GetIssuer_Meeting_stats(req);
    response.meetingId = req.meetingId;
    return response;
  }
);

export const listMeetingDatesOverviewReq = createAsyncThunk(
  'listMeetingDatesOverview',
  async (res) => {
    let bool = false;
    const { meetingId, cancelToken } = res;
    let { set_adjustment } = res;

    if (set_adjustment === undefined) {
      set_adjustment = 0;
    }
    let prevMeetingId = 0;
    const productsId = productsConst.VOTING;
    const resAllowDownload = await AllowDownload(productsId);

    const responseDatesList = await ListMeetingDates(meetingId);
    for (let index = 0; index < responseDatesList.length; index += 1) {
      if (bool) {
        prevMeetingId = responseDatesList[index].value;
        bool = false;
      }
      if (responseDatesList[index].value.toString() === meetingId) {
        bool = true;
      }
    }

    const responseList = await getProposalList(
      meetingId,
      prevMeetingId,
      set_adjustment,
      cancelToken
    );

    const responseObj = {
      MeetingDates: responseDatesList,
      responseList: responseList.data,
      meetingId,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);
export const getMeetingId = createAsyncThunk('getMeetingId', async (pid) => {
  const response = await getIssuerLatestMeetingId(pid);
  return response;
});

// QuickView Page
export const listMeetingDatesQuickviewReq = createAsyncThunk(
  'ListMeetingDatesQuickview',
  async (res) => {
    const productsId = productsConst.VOTING;
    const resAllowDownload = await AllowDownload(productsId);

    const responseDatesList = await ListMeetingDates(res.meetingId);
    const responseList = await MeetingQuickViewDynamicPivotv4(
      res.meetingId,
      res.proposalId,
      res.GetLine
    );
    const responseObj = {
      MeetingDates: responseDatesList,
      responseList,
      responseDataList: responseList.data,
      responseHeadingList: responseList.heading,
      meetingId: res.meetingId,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

// Voting Results Page
export const listMeetingDatesVotingResultsReq = createAsyncThunk(
  'ListMeetingDatesVotingResults',
  async (meetingId) => {
    const TrialStatus = false;
    const productsId = productsConst.VOTING;
    const resAllowDownload = await AllowDownload(productsId);
    const responseDatesList = await ListMeetingDates(meetingId);
    const responseList = await GetVoteResults_v3(meetingId);
    const responseObj = {
      MeetingDates: responseDatesList,
      responseList,
      meetingId,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

// No Action Letters

export const getNoActionTrackInfoReq = createAsyncThunk(
  'GetNoActionTrackInfo',
  async (res) => {
    const productsId = productsConst.VOTING;
    const { meeting_id } = res;
    const resAllowDownload = await AllowDownload(productsId);
    const responseList = await GetNoActionTrackInfo(res);
    const responseObj = {
      responseList,
      meetingId: meeting_id,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);
export const getNoActionLetterProposalDetailReq = createAsyncThunk(
  'GetNoActionLetterProposalDetail',
  async (proposal_id) => {
    const response = await GetNoActionLetterProposalDetail(proposal_id);
    return response;
  }
);

// Vote Detail Page
export const listGetVotingDataAllVotesReq = createAsyncThunk(
  'GetVotingData_allvotes_v2',
  async (res) => {
    const productsId = productsConst.VOTING;
    const resAllowDownload = await AllowDownload(productsId);

    const responseList = await GetVotingData_allvotes_v2(
      res.meetingId,
      res.proposals,
      res.voteCast
    );
    const responseObj = {
      responseList,
      meetingId: res.meetingId,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

export const listGetVotingData_rationale_meetingReq = createAsyncThunk(
  'GetVotingData_rationale_meeting',
  async (meetingId) => {
    const productsId = productsConst.VOTING;
    const resAllowDownload = await AllowDownload(productsId); // Allow Download Option
    const responseListRationale = await GetVotingData_rationale_meeting(
      meetingId
    );
    const responseListVotesAgainst = await ListIssuerVotesAgainst(meetingId);

    const responseObj = {
      responseListRationale,
      responseListVotesAgainst,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

// Votes Against Mgmt Page
export const listGetVotingData_rationale_meeting_againstReq = createAsyncThunk(
  'GetVotingData_rationale_meeting_against',
  async (meetingId) => {
    const productsId = productsConst.VOTING;
    const resAllowDownload = await AllowDownload(productsId);
    const responseListRationale = await GetVotingData_rationale_meeting_against(
      meetingId
    );
    const responseListVotesAgainst = await ListIssuerVotesAgainst(meetingId);

    const responseObj = {
      responseListRationale,
      responseListVotesAgainst,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);
// Policy Checker
export const listSelectedProposalsCountryReq = createAsyncThunk(
  'GetSelectedProposalsCountry',
  async (meetingId) => {
    const responseProposalsCountry = await GetSelectedProposalsCountry(
      meetingId
    );
    return responseProposalsCountry.data;
  }
);

export const listBindgvVotingGridReq = createAsyncThunk(
  'listBindgvVotingGridReq',
  async (res) => {
    const productsId = productsConst.VOTING;
    const resAllowDownload = await AllowDownload(productsId);
    const responseList = await BindgvVotingGrid(res);
    const responseObj = {
      responseList,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

// Voting Overview ListVotingOwnershipForProposal_v2
export const listVotingOwnershipForProposalReq = createAsyncThunk(
  'listVotingOwnershipForProposalReq',
  async (obj) => {
    const response = await ListVotingOwnershipForProposal_v2({
      meeting_id: obj.meeting_id !== undefined ? obj.meeting_id : null,
      proposal_id: obj.proposal_id !== undefined ? obj.proposal_id : null,
      cancelToken: obj.cancelToken,
    });
    return response;
  }
);

// Get_OtherBoards
export const get_OtherBoardsReq = createAsyncThunk(
  'get_OtherBoardsReq',
  async (obj) => {
    const response = await Get_OtherBoards(obj.proposal_id);
    return response;
  }
);

// GetVotingData_rationale
export const getVotingData_rationaleReq = createAsyncThunk(
  'getVotingData_rationaleReq',
  async (obj) => {
    const response = await GetVotingData_rationale(
      obj.meeting_id,
      obj.proposal_id
    );
    return response;
  }
);

// ListVotingAndOwnerhipForProposal_insightia
export const listVotingAndOwnerhipForProposal_insightiaReq = createAsyncThunk(
  'listVotingAndOwnerhipForProposal_insightiaReq',
  async (obj) => {
    const response = await ListVotingAndOwnerhipForProposal_insightia(
      obj.meeting_id,
      obj.proposal_id,
      obj.prev_meeting_id,
      obj.prev_proposal_id,
      obj.vote_type
    );
    return response;
  }
);

// getMeetingURLs
export const getMeetingURLsReq = createAsyncThunk(
  'getMeetingURLsReq',
  async ({ meeting_id, meeting_date }) => {
    const response = await getMeetingURLs(meeting_id, meeting_date);
    return response;
  }
);

export const getShareClassesReq = createAsyncThunk(
  'getShareClasses',
  async (pid) => {
    const response = await getShareClasses(pid);
    return response;
  }
);
export const getSplitVotingDetailsReq = createAsyncThunk(
  'getSplitVotingDetailsReq',
  async (req) => {
    const response = await getSplitVotingDetails(req);
    return response;
  }
);

export const listMeetingDatesReq = createAsyncThunk(
  'listMeetingDatesReq',
  async (res) => {
    const response = await ListMeetingDates(res);
    const meetingID = res;
    return { meetingData: response, meetingID: meetingID };
  }
);
const CompanyVotingSlice = createSlice({
  name: 'companyVoting',
  initialState: {
    // General
    loadingData: true,
    meetingData: [],
    issuerCompanyProfile: {},
    allowDownload: false,
    // Overview
    listMeetingDatesOverview: undefined,
    issuerMeetingStatsList: [],
    getProposalList: [],
    getProposalListHeading: {},
    getProposalListChart: [],
    tableMeetingTypeId_5: [],
    issuerMeetingStatsListHeading: '',
    selectedMeetingDateOnlyOverview: '',
    TrialStatus_VotingOverview: false,
    // getMeeting_proposals_management_v2: [],
    // Quickview page
    meetingQuickViewDynamicList: undefined,
    meetingQuickViewDynamicHeadingList: [],
    listMeetingDates: [],
    selectedMeetingDates: {},
    selectedMeetingDateOnly: [],
    TrialStatus_VotingQuickview: false,
    // Voting Results page
    listMeetingDatesVotingResults: [],
    selectedMeetingDatesVotingResults: {},
    selectedMeetingDateOnlyVotingResults: [],
    voteResultsList: [],
    voteResultsHeadingList: [],
    TrialStatus_VotingResults: false,
    // No action letters
    noActionLettersList: [],
    TrialStatus_VotingNoActionLetters: false,
    isShareClasses: [],
    // Vote Detail page
    votingDataAllVotesList: [],
    votingDataAllVotesHeadingList: [],
    voteCastList: [
      { label: 'All', value: null },
      { label: 'For', value: 'For' },
      { label: 'Against', value: 'Against' },
      { label: 'Abstain', value: 'Abstain' },
      { label: 'Withhold', value: 'Withhold' },
      { label: 'DNV', value: 'DNV' },
    ],
    voteCastSelection: { label: 'All', value: null },
    TrialStatus_VotingDetail: false,
    // Votes Against Mgmt
    votingDataRationaleMeetingAgainstList: [],
    votingDataRationaleMeetingAgainstHeadingList: [],
    votingIssuerVotesAgainstMgmtList: [],
    votingIssuerVotesAgainstMgmtHeadingList: [],
    TrialStatus_VotingAgainstMgmt: false,
    // Policy Checker
    proposalsCountryList: [],
    policyCheckerList: [],
    isLoadingPolicyCheckerList: true,
    policyCheckerHeadingList: [],
    firstSelectProposalsCountry: undefined,
    TrialStatus_VotingPolicyChecker: false,

    listVotingOwnershipForProposal_v2: [],
    get_OtherBoards: [],
    getVotingData_rationale: [],
    listVotingAndOwnerhipForProposal_insightia: [],
    getMeetingURLsReq: [],
    meetingResultURL: null,
    meetingSECURL: null,
    isAllVotingLoading: true,

    noActionLetterProposalDetailList: {},
    splitVotingDetail: [],
    meetingQuickViewDynamicListOrg: [],
    splitVotingLable: '',
  },
  reducers: {
    handleVoteCastChange: {
      reducer(state, action) {
        state.voteCastSelection = action.payload.votingSelection;
      },
      prepare(votingSelection) {
        return {
          payload: { votingSelection },
        };
      },
    },
    handleProposalsCountryChange: {
      reducer(state, action) {
        state.firstSelectProposalsCountry =
          action.payload.SelectProposalsCountry;
      },
      prepare(SelectProposalsCountry) {
        return {
          payload: { SelectProposalsCountry },
        };
      },
    },
    handleResetLoading: {
      reducer(state) {
        state.loadingData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleSetDdlMeetingDate: {
      reducer(state, action) {
        state.selectedMeetingDatesOverview = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetDdlMeetingDate: {
      reducer(state) {
        state.loadingData = true;
        state.listMeetingDatesOverview = undefined;
        state.selectedMeetingDateOnlyOverview = '';
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetPolicyCheckerDataLoading: {
      reducer(state) {
        state.PolicyCheckerList = [];
        state.isLoadingPolicyCheckerList = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetAll: {
      reducer(state) {
        // General
        state.loadingData = true;
        state.meetingData = [];
        state.issuerCompanyProfile = {};
        state.allowDownload = false;
        // Overview
        state.listMeetingDatesOverview = undefined;
        state.issuerMeetingStatsList = [];
        state.getProposalList = [];
        state.getProposalListHeading = {};
        state.getProposalListChart = [];
        state.tableMeetingTypeId_5 = [];
        state.issuerMeetingStatsListHeading = '';
        state.selectedMeetingDateOnlyOverview = '';
        state.TrialStatus_VotingOverview = false;
        // Quickview page
        state.meetingQuickViewDynamicList = [];
        state.meetingQuickViewDynamicHeadingList = [];
        state.listMeetingDates = [];
        state.selectedMeetingDates = {};
        state.selectedMeetingDateOnly = [];
        state.TrialStatus_VotingQuickview = false;
        // Voting Results page
        state.listMeetingDatesVotingResults = [];
        state.selectedMeetingDatesVotingResults = {};
        state.selectedMeetingDateOnlyVotingResults = [];
        state.voteResultsList = [];
        state.voteResultsHeadingList = [];
        state.TrialStatus_VotingResults = false;
        // No action letters
        state.noActionLettersList = [];
        state.TrialStatus_VotingNoActionLetters = false;
        state.isShareClasses = [];
        // Vote Detail page
        state.votingDataAllVotesList = [];
        state.votingDataAllVotesHeadingList = [];
        state.voteCastList = [
          { label: 'All', value: null },
          { label: 'For', value: 'For' },
          { label: 'Against', value: 'Against' },
          { label: 'Abstain', value: 'Abstain' },
          { label: 'Withhold', value: 'Withhold' },
          { label: 'DNV', value: 'DNV' },
        ];
        state.voteCastSelection = { label: 'All', value: null };
        state.TrialStatus_VotingDetail = false;
        // Votes Against Mgmt
        state.votingDataRationaleMeetingAgainstList = [];
        state.votingDataRationaleMeetingAgainstHeadingList = [];
        state.votingIssuerVotesAgainstMgmtList = [];
        state.votingIssuerVotesAgainstMgmtHeadingList = [];
        state.TrialStatus_VotingAgainstMgmt = false;
        // Policy Checker
        state.proposalsCountryList = [];
        state.PolicyCheckerList = [];
        state.isLoadingPolicyCheckerList = true;
        state.policyCheckerHeadingList = [];
        state.firstSelectProposalsCountry = undefined;
        state.TrialStatus_VotingPolicyChecker = false;

        state.listVotingOwnershipForProposal_v2 = [];
        state.get_OtherBoards = [];
        state.getVotingData_rationale = [];
        state.listVotingAndOwnerhipForProposal_insightia = [];
        state.getMeetingURLsReq = [];
        state.meetingResultURL = null;
        state.meetingSECURL = null;
        state.isAllVotingLoading = true;

        state.noActionLetterProposalDetailList = {};
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleSplitVotingDetails: {
      reducer(state, action) {
        if (action.payload.action === 'add') {
          state.splitVotingDetail = [];
          const headingData = current(state).meetingQuickViewDynamicHeadingList;
          const quickViewData = current(state).meetingQuickViewDynamicList;
          state.meetingQuickViewDynamicList = quickViewData.filter((item) => {
            if (item.investor_id === action.payload.investor_id) {
              return item;
            }
          });
          headingData.filter((item) => {
            if (item.field === action.payload.field) {
              state.splitVotingLable = item.fullLabel.split('-')[1];
            }
          });
        }
        if (action.payload.action === 'remove') {
          const originalViewData =
            current(state).meetingQuickViewDynamicListOrg;
          state.meetingQuickViewDynamicList = originalViewData;
          state.splitVotingDetail = [];
          state.splitVotingLable = '';
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
  },
  extraReducers: {
    // General
    [getIssuerProfileReq.fulfilled]: (state, action) => {
      state.issuerCompanyProfile =
        action.payload !== undefined ? action.payload.data : '';
    },
    [getMeetingId.fulfilled]: (state, action) => {
      state.meetingData = action.payload !== undefined ? action.payload : [];
    },
    // Overview Page
    [listMeetingDatesOverviewReq.fulfilled]: (state, action) => {
      state.listMeetingDatesOverview =
        action.payload !== undefined ? action.payload : [];
      state.listMeetingDatesOverview = action.payload.MeetingDates;
      if (action.payload.MeetingDates !== undefined) {
        state.selectedMeetingDatesOverview =
          action.payload.MeetingDates !== undefined
            ? action.payload.MeetingDates.find(
                (e) =>
                  e.value.toString() === action.payload.meetingId.toString()
              )
            : '';
        state.selectedMeetingDateOnlyOverview =
          action.payload.MeetingDates !== undefined
            ? action.payload.MeetingDates.find(
                (e) =>
                  e.value.toString() === action.payload.meetingId.toString()
              ) !== undefined
              ? action.payload.MeetingDates.find(
                  (e) =>
                    e.value.toString() === action.payload.meetingId.toString()
                ).label.split(' (')[0]
              : ''
            : '';

        state.getProposalList =
          action.payload.responseList !== undefined &&
          action.payload.responseList.data !== undefined
            ? action.payload.responseList.data.map((x) => {
                const GlCurrYear =
                  x !== undefined &&
                  x.GlCurrYear !== undefined &&
                  x.GlCurrYear !== null
                    ? ChangeName(x.GlCurrYear)
                    : '';
                return {
                  ...x,
                  GlCurrYear: GlCurrYear,
                  GlPrevYear: ChangeName(x.GlPrevYear),
                  IssPrevYear: ChangeName(x.IssPrevYear),
                  IssCurrYear: ChangeName(x.IssCurrYear),
                  Chg: ChangeName(x.Chg),
                  MRecImage: ChangeName(x.MRecImage),
                  'Pass_AB/WH': ChangeName(x['Pass_AB/WH']),
                  ProposalDetailCombo: x.ProposalDetail,
                  TrialStatus:
                    action.payload !== undefined
                      ? action.payload.TrialStatus_VotingOverview
                      : false,
                  allowDownload:
                    action.payload !== undefined
                      ? action.payload.allowDownload
                      : false,
                };
              })
            : [];
        state.getProposalListHeading =
          action.payload.responseList.heading !== undefined
            ? action.payload.responseList.heading[0]
            : [];
        state.getProposalListChart =
          action.payload.responseList.chart !== undefined
            ? action.payload.responseList.chart
            : [];
        state.tableMeetingTypeId_5 =
          action.payload.responseList.tableMeetingTypeId_5 !== undefined
            ? action.payload.responseList.tableMeetingTypeId_5
            : [];
        state.TrialStatus_VotingOverview =
          action.payload !== undefined
            ? action.payload.TrialStatus_VotingOverview
            : false;
        state.allowDownload =
          action.payload !== undefined ? action.payload.allowDownload : false;
        state.loadingData = action.payload === undefined;
      }
    },
    [getIssuer_Meeting_statsReq.fulfilled]: (state, action) => {
      state.issuerMeetingStatsList =
        action.payload.data !== undefined ? action.payload.data : [];
      state.issuerMeetingStatsListHeading =
        action.payload.heading !== undefined
          ? action.payload.heading.PrevDate_Heading
          : '';
    },
    [listVotingOwnershipForProposalReq.fulfilled]: (state, action) => {
      if (action.payload !== false && action.payload !== undefined) {
        state.listVotingOwnershipForProposal_v2 = action.payload;
      }
    },
    [get_OtherBoardsReq.fulfilled]: (state, action) => {
      if (action.payload !== false && action.payload !== undefined) {
        state.get_OtherBoards = action.payload;
      }
    },
    [getVotingData_rationaleReq.fulfilled]: (state, action) => {
      if (action.payload !== false && action.payload !== undefined) {
        state.getVotingData_rationale = action.payload;
      }
    },
    [listVotingAndOwnerhipForProposal_insightiaReq.fulfilled]: (
      state,
      action
    ) => {
      if (action.payload !== false && action.payload !== undefined) {
        state.listVotingAndOwnerhipForProposal_insightia = action.payload.data;
        state.isAllVotingLoading = action.payload.data === undefined;
        state.vote_type = action.payload.vote_type;
      }
    },
    [getMeetingURLsReq.fulfilled]: (state, action) => {
      if (action.payload !== false && action.payload !== undefined) {
        state.getMeetingURLs = action.payload.data;
        if (action.payload.data.length > 0) {
          state.meetingResultURL = action.payload.data[0].Results_URL;
          state.meetingSECURL = action.payload.data[0].SEC_url;
        }
      }
    },
    // Quickview page
    [listMeetingDatesQuickviewReq.fulfilled]: (state, action) => {
      state.listMeetingDatesQuickview =
        action.payload !== undefined ? action.payload : [];
      if (action.payload !== undefined) {
        state.listMeetingDatesQuickview = action.payload.MeetingDates;
        state.selectedMeetingDatesQuickview =
          state.listMeetingDatesQuickview.find(
            (e) => e.value.toString() === action.payload.meetingId.toString()
          );
        state.selectedMeetingDateOnlyQuickview =
          state.listMeetingDatesQuickview.find(
            (e) => e.value.toString() === action.payload.meetingId.toString()
          ) !== undefined
            ? state.listMeetingDatesQuickview
                .find(
                  (e) =>
                    e.value.toString() === action.payload.meetingId.toString()
                )
                .label.split(' (')[0]
            : '';
        state.meetingQuickViewDynamicList =
          action.payload.responseList !== undefined
            ? action.payload.responseDataList
            : [];
        state.meetingQuickViewDynamicListOrg =
          action.payload.responseList !== undefined
            ? action.payload.responseDataList
            : [];
        state.meetingQuickViewDynamicHeadingList =
          action.payload.responseList !== undefined
            ? action.payload.responseHeadingList
            : [];
        state.TrialStatus_VotingQuickview =
          action.payload !== undefined
            ? action.payload.TrialStatus_VotingQuickview
            : false;
        state.allowDownload =
          action.payload !== undefined ? action.payload.allowDownload : false;
        state.loadingData = action.payload.responseList === undefined;
      }
    },
    // Voting Results Page
    [listMeetingDatesVotingResultsReq.fulfilled]: (state, action) => {
      state.listMeetingDatesVotingResults =
        action.payload !== undefined ? action.payload : [];
      if (action.payload !== undefined) {
        state.listMeetingDatesVotingResults = action.payload.MeetingDates;
        state.selectedMeetingDatesVotingResults =
          state.listMeetingDatesVotingResults.find(
            (e) => e.value.toString() === action.payload.meetingId.toString()
          );
        state.selectedMeetingDateOnlyVotingResults =
          state.listMeetingDatesVotingResults.find(
            (e) => e.value.toString() === action.payload.meetingId.toString()
          ) !== undefined
            ? state.listMeetingDatesVotingResults
                .find(
                  (e) =>
                    e.value.toString() === action.payload.meetingId.toString()
                )
                .label.split(' (')[0]
            : '';

        state.voteResultsList =
          action.payload.responseList.data !== undefined
            ? action.payload.responseList.data
            : [];
        state.voteResultsHeadingList =
          action.payload.responseList.heading !== undefined
            ? action.payload.responseList.heading
            : [];
        state.TrialStatus_VotingResults =
          action.payload !== undefined
            ? action.payload.TrialStatus_VotingResults
            : false;
        state.allowDownload =
          action.payload !== undefined ? action.payload.allowDownload : false;
        state.loadingData = action.payload.responseList === undefined;
      }
    },
    // No action letters
    [getNoActionTrackInfoReq.fulfilled]: (state, action) => {
      state.noActionLettersList =
        action.payload.responseList.data !== undefined
          ? action.payload.responseList.data
          : [];
      state.TrialStatus_VotingNoActionLetters =
        action.payload !== undefined
          ? action.payload.TrialStatus_VotingNoActionLetters
          : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.loadingData = action.payload.responseList === undefined;
    },
    [getNoActionLetterProposalDetailReq.fulfilled]: (state, action) => {
      state.noActionLetterProposalDetailList =
        action.payload !== undefined ? action.payload.data : {};
      state.loadingData = action.payload === undefined;
    },
    // Vote Detail Page
    [listGetVotingDataAllVotesReq.fulfilled]: (state, action) => {
      state.votingDataAllVotesList =
        action.payload.responseList.data !== undefined
          ? action.payload.responseList.data
          : [];
      state.votingDataAllVotesHeadingList =
        action.payload.responseList.heading !== undefined
          ? action.payload.responseList.heading
          : [];
      state.TrialStatus_VotingDetail =
        action.payload !== undefined
          ? action.payload.TrialStatus_VotingDetail
          : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.loadingData = action.payload.responseList === undefined;
    },
    // Votes Against Mgmt Page
    [listGetVotingData_rationale_meeting_againstReq.fulfilled]: (
      state,
      action
    ) => {
      state.votingDataRationaleMeetingAgainstList =
        action.payload.responseListRationale !== undefined
          ? action.payload.responseListRationale.data
          : [];
      state.votingDataRationaleMeetingAgainstHeadingList =
        action.payload.responseListRationale !== undefined
          ? action.payload.responseListRationale.heading
          : [];
      state.votingIssuerVotesAgainstMgmtList =
        action.payload.responseListVotesAgainst !== undefined
          ? action.payload.responseListVotesAgainst.data
          : [];
      state.votingIssuerVotesAgainstMgmtHeadingList =
        action.payload.responseListVotesAgainst !== undefined
          ? action.payload.responseListVotesAgainst.heading
          : [];
      state.TrialStatus_VotingAgainstMgmt =
        action.payload !== undefined
          ? action.payload.TrialStatus_VotingAgainstMgmt
          : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.loadingData = action.payload === undefined;
    },
    [listGetVotingData_rationale_meetingReq.fulfilled]: (state, action) => {
      state.votingDataRationaleMeetingAgainstList =
        action.payload.responseListRationale !== undefined
          ? action.payload.responseListRationale.data
          : [];
      state.votingDataRationaleMeetingAgainstHeadingList =
        action.payload.responseListRationale !== undefined
          ? action.payload.responseListRationale.heading
          : [];
      //
      state.TrialStatus_VotingAgainstMgmt =
        action.payload !== undefined
          ? action.payload.TrialStatus_VotingAgainstMgmt
          : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.loadingData = action.payload === undefined;
    },
    // Policy Checker
    [listSelectedProposalsCountryReq.fulfilled]: (state, action) => {
      state.proposalsCountryList =
        action.payload !== undefined ? action.payload : [];
      if (action.payload !== undefined) {
        state.proposalsCountryList = action.payload;
        if (
          state.firstSelectProposalsCountry === undefined ||
          state.firstSelectProposalsCountry === null
        ) {
          state.firstSelectProposalsCountry = action.payload[0];
        }
      }
    },
    [getShareClassesReq.fulfilled]: (state, action) => {
      state.isShareClasses = action.payload ? action.payload : [];
    },
    [listBindgvVotingGridReq.fulfilled]: (state, action) => {
      const policyCheckerList =
        action.payload !== undefined ? action.payload.responseList.data : [];

      let e = [];
      const modifiedprops = [];

      function compare(a, b) {
        if (Number(a.Rank) < Number(b.Rank)) {
          return -1;
        }
        if (Number(a.Rank) > Number(b.Rank)) {
          return 1;
        }
        return 0;
      }

      policyCheckerList.forEach((e) => {
        if (e.resolution_text) {
          modifiedprops.push({
            Rank: e.Rank,
            investor_profile_name: e.resolution_text,
            status: true,
          });
        } else {
          modifiedprops.push({
            Rank: e.Rank,
            status: false,
          });
        }
      });

      e = policyCheckerList.concat(modifiedprops).sort(compare);

      for (let i = 0; i < e.length; i += 1) {
        if (i % 2 !== 0) {
          e[i].Rank = '';
        }
      }

      state.policyCheckerList = e;
      state.policyCheckerHeadingList =
        action.payload !== undefined ? action.payload.responseList.heading : [];
      state.TrialStatus_VotingPolicyChecker =
        action.payload !== undefined
          ? action.payload.TrialStatus_VotingPolicyChecker
          : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingPolicyCheckerList = false;
    },
    [getSplitVotingDetailsReq.fulfilled]: (state, action) => {
      state.splitVotingDetail = action.payload;
    },
    [listMeetingDatesReq.fulfilled]: (state, action) => {
      if (action.payload) {
        // meetingData: response, meetingID: meetingID
        state.listMeetingDatesOverview =
          action.payload.meetingData !== undefined
            ? action.payload.meetingData
            : [];
        state.selectedMeetingDatesOverview =
          action.payload.meetingData !== undefined
            ? action.payload.meetingData.find(
                (e) =>
                  e.value.toString() === action.payload.meetingID.toString()
              )
            : '';
      }
    },
  },
});

export const {
  handleVoteCastChange,
  handleResetLoading,
  handleProposalsCountryChange,
  handleResetDdlMeetingDate,
  handleSetDdlMeetingDate,
  handleResetPolicyCheckerDataLoading,
  handleResetAll,
  handleSplitVotingDetails,
} = CompanyVotingSlice.actions;

export default CompanyVotingSlice.reducer;
