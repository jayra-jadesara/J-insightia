import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  DissidentVotingSummaryLimitedData,
  DissidentVotingSummary,
  DissidentVotingAccessReq,
} from '../../../utils/dissidentVotingSummary-util';
import DissidentVotingSummaryConstant from '../../../constants/DissidentVotingSummaryConstant';
import products from '../../../constants/ProductConstants';

export const dissidentVotingSummarySearchReq = createAsyncThunk('dissidentVotingSummarySearchReq', async (req) => {
  const productsId = products.VOTING;
  const resUserAccessReq = await DissidentVotingAccessReq(productsId);
  const { displayLimitedData, trialStatus } = resUserAccessReq;
  let response;
  if (displayLimitedData) {
    response = await DissidentVotingSummaryLimitedData(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.sponsor,
      req.shareholderBase,
      req.settlements,
      req.desiredOutcome,
      req.issCard,
      req.glCard,
      req.companySearchId,
      req.investorSearchId
    );
  } else {
    response = await DissidentVotingSummary(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.sponsor,
      req.shareholderBase,
      req.settlements,
      req.desiredOutcome,
      req.issCard,
      req.glCard,
      req.companySearchId,
      req.investorSearchId
    );
  }
  return { response, displayLimitedData, trialStatus };
});

const ToolsDissidentVotingSummarySlice = createSlice({
  name: 'toolsDissidentVotingSummary',
  initialState: {
    // Filter
    lstSettlements: [
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_SETTLED,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_SETTLED_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED_VALUE,
      },
    ],
    lstSettlementSelection: {
      label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED,
      value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED_VALUE,
    },
    lstSettlementDissidentSummary: [
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL_VALUE
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_SETTLED,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_SETTLED_VALUE
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_VALUE
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED_VALUE
      }
    ],
    lstSettlementDissidentSummarySelection: {
      label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED,
      value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED_VALUE
    },
    lstIISCardRecommendation: [
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_DISSIDENT,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_DISSIDENT_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_SOME_DISSIDENTS,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_SOME_DISSIDENTS_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_MANAGEMENT,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_MANAGEMENT_VALUE,
      },
    ],
    lstIISCardRecommendationSelection: {
      label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
      value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
    },
    lstGLCardRecommendation: [
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_DISSIDENT,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_DISSIDENT_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_SOME_DISSIDENTS,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_SOME_DISSIDENTS_VALUE,
      },
      {
        label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_MANAGEMENT,
        value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_MANAGEMENT_VALUE,
      },
    ],
    lstGLCardRecommendationSelection: {
      label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
      value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
    },
    isCheckedDesiredOutcomeAll: true,
    isCheckedDesiredOutcomeShortSlate: false,
    isCheckedDesiredOutcomeBoardControl: false,
    desiredOutcomeSelection: DissidentVotingSummaryConstant.VOTING_TOOLS_DESIRED_OUTCOME_ALL,

    // Page - Dissident Voting Summary
    lstDissidentVotingSummaryData: [],
    isLoadingDissidentVotingSummaryData: true,
    trialStatus: false,
    isShowLimitedData: false,
    userMessage: '',
  },
  reducers: {
    handleOnChangeDDLSettlements: {
      reducer(state, action) {
        if (action.payload.SettlementsSelection === null) {
          state.lstSettlementSelection = {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL_VALUE,
          };
        } else {
          state.lstSettlementSelection = action.payload.SettlementsSelection;
        }
      },
      prepare(SettlementsSelection) {
        return {
          payload: { SettlementsSelection },
        };
      },
    },
    handleOnChangeDDLSettlementsDissidentSummary: {
      reducer(state, action) {
        if (action.payload.SettlementsSelection === null) {
          state.lstSettlementDissidentSummarySelection = {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED_VALUE
          };
        } else {
          state.lstSettlementDissidentSummarySelection = action.payload.SettlementsSelection;
        }
      },
      prepare(SettlementsSelection) {
        return {
          payload: { SettlementsSelection }
        };
      }
    },
    handleOnChangeDDLIISCardRecommendation: {
      reducer(state, action) {
        if (action.payload.e === null) {
          state.lstIISCardRecommendationSelection = {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
          };
        } else {
          state.lstIISCardRecommendationSelection = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleOnChangeDDLGLCardRecommendation: {
      reducer(state, action) {
        if (action.payload.e === null) {
          state.lstGLCardRecommendationSelection = {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
          };
        } else {
          state.lstGLCardRecommendationSelection = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleDesiredOutcomeChecked: {
      reducer(state, action) {
        state.isCheckedDesiredOutcomeAll = false;
        state.isCheckedDesiredOutcomeShortSlate = false;
        state.isCheckedDesiredOutcomeBoardControl = false;

        switch (action.payload.e) {
          case DissidentVotingSummaryConstant.VOTING_TOOLS_DESIRED_OUTCOME_ALL:
            state.isCheckedDesiredOutcomeAll = true;
            state.desiredOutcomeSelection = DissidentVotingSummaryConstant.VOTING_TOOLS_DESIRED_OUTCOME_ALL;
            break;
          case DissidentVotingSummaryConstant.VOTING_TOOLS_DESIRED_OUTCOME_SHORT_SLATE:
            state.isCheckedDesiredOutcomeShortSlate = true;
            state.desiredOutcomeSelection = DissidentVotingSummaryConstant.VOTING_TOOLS_DESIRED_OUTCOME_SHORT_SLATE;
            break;
          case DissidentVotingSummaryConstant.VOTING_TOOLS_DESIRED_OUTCOME_BOARD_CONTROL:
            state.isCheckedDesiredOutcomeBoardControl = true;
            state.desiredOutcomeSelection = DissidentVotingSummaryConstant.VOTING_TOOLS_DESIRED_OUTCOME_BOARD_CONTROL;
            break;
          default:
            break;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetOnSearchClick: {
      reducer(state) {
        state.lstSettlements = [
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_SETTLED,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_SETTLED_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED_VALUE,
          },
        ];
        state.lstSettlementSelection = {
          label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL,
          value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL_VALUE,
        };

        state.lstSettlementDissidentSummary = [
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_ALL_VALUE
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_SETTLED,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_SETTLED_VALUE
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_VALUE
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED_VALUE
          }
        ];
        state.lstSettlementDissidentSummarySelection = {
          label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED,
          value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_SETTLEMENTS_EXCLUDE_WITHDRAWN_SETTLED_VALUE
        };

        state.lstIISCardRecommendation = [
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_DISSIDENT,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_DISSIDENT_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_SOME_DISSIDENTS,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_SOME_DISSIDENTS_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_MANAGEMENT,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_MANAGEMENT_VALUE,
          },
        ];
        state.lstIISCardRecommendationSelection = {
          label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
          value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
        };
        state.lstGLCardRecommendation = [
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_DISSIDENT,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_DISSIDENT_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_SOME_DISSIDENTS,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_SOME_DISSIDENTS_VALUE,
          },
          {
            label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_MANAGEMENT,
            value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_MANAGEMENT_VALUE,
          },
        ];
        state.lstGLCardRecommendationSelection = {
          label: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL,
          value: DissidentVotingSummaryConstant.VOTING_TOOLS_DDL_OPTION_CARD_RECOMMENDATION_ALL_VALUE,
        };
        state.isCheckedDesiredOutcomeAll = true;
        state.isCheckedDesiredOutcomeShortSlate = false;
        state.isCheckedDesiredOutcomeBoardControl = false;
        state.desiredOutcomeSelection = DissidentVotingSummaryConstant.VOTING_TOOLS_DESIRED_OUTCOME_ALL;

        state.lstDissidentVotingSummaryData = [];
        state.isLoadingDissidentVotingSummaryData = true;
        state.trialStatus = false;
        state.isShowLimitedData = false;
        state.userMessage = '';
      },
      prepare(e) {
        return {
          payload: { e },
        };
      }
    },
    handleClearResult: {
      reducer(state) {
        state.lstDissidentVotingSummaryData = [];
        state.isLoadingDissidentVotingSummaryData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handledResetLoadingData: {
      reducer(state) {
        state.isLoadingDissidentVotingSummaryData = true;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
  },
  extraReducers: {
    [dissidentVotingSummarySearchReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstDissidentVotingSummaryData = action.payload.response;
        state.trialStatus = action.payload.trialStatus;
        state.isShowLimitedData = action.payload.displayLimitedData;
        state.isLoadingDissidentVotingSummaryData = action.payload.response === undefined;
      }
    },
  },
});

export const {
  handleOnChangeDDLSettlements,
  handleOnChangeDDLSettlementsDissidentSummary,
  handleOnChangeDDLIISCardRecommendation,
  handleOnChangeDDLGLCardRecommendation,
  handleDesiredOutcomeChecked,
  handleResetOnSearchClick,
  handleClearResult,
  handledResetLoadingData,
} = ToolsDissidentVotingSummarySlice.actions;

export default ToolsDissidentVotingSummarySlice.reducer;
