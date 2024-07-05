import { current, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import {
  GetAdvanceVotingDataFundnameReq,
  AdvancedVotingDataSearch,
  GetVoteCast,
  GetManagementRecc,
  GetSupport,
  GetOutputField,
  GetListProposalsAndCategories,
} from '../../../utils/advancedVotingDataSearch-util';
import {
  threeLayerTreeView,
  GetDefaultStartAndEndDate,
  IsInternalUser,
  dateToNull,
  validateRangeValues,
  getTreeViewDDLSelection,
  dateToISOString,
} from '../../../utils/general-util';
import {
  VOTING_DETAILS_VALUE,
  VOTING_RESULT_VALUE,
  INTERNAL_VALUE,
  INVESTOR_VOTING_VALUE,
  COMPANY_RESULTS_VALUE,
} from '../../../constants/AdvancedVotingDataSearchConstant';
import {
  NUMBER_ZERO,
  NUMBER_TWO,
  NUMBER_ONE,
  NUMBER_THREE,
} from '../../../constants/NumberConstants';

const { startDate, endDate } = GetDefaultStartAndEndDate();

export const advancedVotingdataSearchReq = createAsyncThunk(
  'advancedVotingdataSearchReq',
  async (req) => {
    const response = await AdvancedVotingDataSearch(
      req.internal,
      req.companySearchId,
      req.investorSearchId,
      req.investorid,
      req.meetingType,
      req.sponsor,
      req.meetingStartDate,
      req.meetingEndDate,
      req.fundId,
      req.voteCast,
      req.support,
      req.managementRecc,
      req.supportMin,
      req.supportMax,
      req.proposalType,
      req.ShowVotingDetail,
      req.showInvestorVotingDetail,
      req.ShowVoteResults,
      req.ShowRationale
    );
    return response;
  }
);

export const getAdvanceVotingDataFundnameReq = createAsyncThunk(
  'getAdvanceVotingDataFundnameReq',
  async () => {
    const response = await GetAdvanceVotingDataFundnameReq();
    return response;
  }
);

export const getVoteCastReq = createAsyncThunk('getVoteCastReq', async () => {
  const response = await GetVoteCast();
  return response;
});

export const getManagementReccReq = createAsyncThunk(
  'getManagementReccReq',
  async () => {
    const response = await GetManagementRecc();
    return response;
  }
);

export const getOutputFieldReq = createAsyncThunk(
  'getOutputFieldReq',
  async () => {
    const response = await GetOutputField();
    return response;
  }
);

export const getSupportReq = createAsyncThunk('getSupportReq', async () => {
  const response = await GetSupport();
  return response;
});

export const isCurrentInternalUserReq = createAsyncThunk(
  'isCurrentInternalUserReq',
  async () => {
    const response = await IsInternalUser();
    return response;
  }
);

export const getListProposalsAndCategoriesReq = createAsyncThunk(
  'getListProposalsAndCategoriesReq',
  async () => {
    const response = await GetListProposalsAndCategories();
    return response;
  }
);

const AdvancedVotingDataSearchSlice = createSlice({
  name: 'advancedVotingDataSearch',
  initialState: {
    isLoadingAdvanceVotingDataSearch: true,
    ddlAdvanceVotingDataFunds: [],
    ddlAdvanceVotingDataFundSelection: [{ label: 'All', value: null }],
    lstVoteCast: [],
    lstManagementRecc: [],
    lstFundName: [],
    lstSupport: [],
    supportSelection: { label: 'For', value: '1' },
    voteCastSelection: [{ label: 'All', value: null, mlabel: null }],
    managementReccSelection: [{ label: 'All', value: null, mlabel: null }],
    isSupportChecked: false,
    supportFrom: 0,
    supportTo: 80,
    outputFieldSelection: [],
    lstOutputField: [],
    lstResolutionType: [],
    lstAdvancedVotingDataSearch: null,
    userMessage: '',
    startInvCompDate: startDate,
    endInvCompDate: endDate,
    investorid: '',
    isInternalUser: false,
    showVotingDetails: true,
    showInvestorVotingDetail: false,
    showVoteResults: true,
    showRationale: false,
    showInternal: true,
    setInvestorVotingDetail: false,
    resolutionTypeSelection: [],
    ddlListOfProposalType: [],
    ddlSpecificActivistActionNewsSelection: [],
    SetDDLProposalCategory: [],
  },
  reducers: {
    handleResetAdvancedVotingDataSearchSliceFilter: {
      reducer(state) {
        state.isLoadingAdvanceVotingDataSearch = true;
        state.ddlAdvanceVotingDataFunds = [];
        state.ddlAdvanceVotingDataFundSelection = [
          { label: 'All', value: null },
        ];
        state.lstVoteCast = [];
        state.lstManagementRecc = [];
        state.lstFundName = [];
        state.lstSupport = [];
        state.supportSelection = { label: 'For', value: '1' };
        state.voteCastSelection = [{ label: 'All', value: null, mlabel: null }];
        state.managementReccSelection = [
          { label: 'All', value: null, mlabel: null },
        ];
        state.isSupportChecked = false;
        state.supportFrom = 0;
        state.supportTo = 80;
        state.outputFieldSelection = [];
        state.lstOutputField = [];
        state.lstResolutionType = [];
        state.lstAdvancedVotingDataSearch = null;
        state.userMessage = '';
        state.startInvCompDate = startDate;
        state.endInvCompDate = endDate;
        state.investorid = '';
        state.isInternalUser = false;
        state.showVotingDetails = true;
        state.showInvestorVotingDetail = false;
        state.showVoteResults = true;
        state.showRationale = false;
        state.showInternal = true;
        state.setInvestorVotingDetail = false;
        state.resolutionTypeSelection = [];
        state.ddlListOfProposalType = [];
        state.ddlSpecificActivistActionNewsSelection = [];
        state.SetDDLProposalCategory = [];
      },
      prepare() {
        return {};
      },
    },
    handleStartInvCompDateSelection: {
      reducer(state, action) {
        const date = action.payload.date;
        state.startInvCompDate = date;
      },
      prepare(value, e) {
        return {
          payload: { date: value, e },
        };
      },
    },
    handleEndInvCompDateSelection: {
      reducer(state, action) {
        const date = action.payload.date;
        state.endInvCompDate = date;
      },
      prepare(value, e) {
        return {
          payload: { date: value, e },
        };
      },
    },
    handleVoteCastSelection: {
      reducer(state, action) {
        if (action.payload.e !== null && action.payload.e.length !== 0) {
          if (
            action.payload.e[0].value === null &&
            action.payload.e.length > 1
          ) {
            action.payload.e.shift();
          }

          state.voteCastSelection = action.payload.e;
        } else {
          state.voteCastSelection = [{ label: 'All', value: null }];
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleManagementRecc: {
      reducer(state, action) {
        if (action.payload.e !== null && action.payload.e.length !== 0) {
          if (
            action.payload.e[0].value === null &&
            action.payload.e.length > 1
          ) {
            action.payload.e.shift();
          }

          state.managementReccSelection = action.payload.e;
        } else {
          state.managementReccSelection = [{ label: 'All', value: null }];
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleFundNameSelection: {
      reducer(state, action) {
        if (action.payload.e !== null && action.payload.e.length !== 0) {
          if (
            action.payload.e[0].value === null &&
            action.payload.e.length > 1
          ) {
            action.payload.e.shift();
          }

          state.ddlAdvanceVotingDataFundSelection = action.payload.e;
        } else {
          state.ddlAdvanceVotingDataFundSelection = [
            { label: 'All', value: null },
          ];
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleIsSupportChecked: {
      reducer(state, action) {
        state.isSupportChecked = action.payload.isChecked;
      },
      prepare(e) {
        return {
          payload: { isChecked: e.target.checked },
        };
      },
    },
    handleSupportFromChange: {
      reducer(state, action) {
        state.supportFrom = validateRangeValues(action.payload);
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },
    handleSupportToChange: {
      reducer(state, action) {
        state.supportTo = validateRangeValues(action.payload);
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },
    handleOutputFieldSelection: {
      reducer(state, action) {
        if (action.payload !== null) {
          state.setInvestorVotingDetail = false;
          state.outputFieldSelection = action.payload;
          // Fund Voting , 1
          state.showVotingDetails =
            action.payload.filter((c) => c.value === VOTING_DETAILS_VALUE)
              .length !== 0;

          // Investor Voting, 3
          state.showInvestorVotingDetail =
            action.payload.filter((c) => c.value === INVESTOR_VOTING_VALUE)
              .length !== 0;

          if (state.showInvestorVotingDetail && state.showVotingDetails) {
            state.setInvestorVotingDetail = true;
          }

          // Fund Voting(with Rationale), 2
          const isFund_Voting_with_Rationale =
            action.payload.filter((c) => c.value === VOTING_RESULT_VALUE)
              .length !== 0;

          //item_CompanyResultSelected
          state.showVoteResults =
            action.payload.filter((c) => c.value === COMPANY_RESULTS_VALUE)
              .length !== 0;

          // Internal, 4
          state.showInternal =
            action.payload.filter((c) => c.value === INTERNAL_VALUE).length !==
            0;

          state.showRationale = isFund_Voting_with_Rationale === true;
          state.showVotingDetails =
            action.payload.filter((c) => c.value === VOTING_DETAILS_VALUE)
              .length !== 0;
          if (
            !state.showInvestorVotingDetail &&
            !state.showVotingDetails &&
            !state.showRationale &&
            !state.showVoteResults
          ) {
            state.setInvestorVotingDetail = true;
          }
        } else {
          state.outputFieldSelection = [];
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleResolutionTypeSelection: {
      reducer(state, action) {
        state.SetDDLProposalCategory = action.payload.selectedNodes;
        const selectedArea = action.payload.selectedNodes;

        const depth1_Array = selectedArea
          .filter((item) => item._depth === NUMBER_ONE)
          .map((item) => item.value);
        const depth2_Array = selectedArea
          .filter((item) => item._depth === NUMBER_TWO)
          .map((item) => item.value);
        const depth3_Array = selectedArea
          .filter((item) => item._depth === NUMBER_THREE)
          .map((item) => item.value);

        const selection_Main = depth1_Array.toString();
        const selection_Category = depth2_Array.toString();
        const selection_SubCategory = depth3_Array.toString();

        state.resolutionTypeSelection = `${selection_Main},${selection_Category},${selection_SubCategory}`;

        const oldJson = current(state).ddlListOfProposalType;
        if (
          action.payload.currentNode._depth === NUMBER_ZERO &&
          action.payload.currentNode.checked
        ) {
          state.ddlListOfProposalType = oldJson; // CHECKED_ALL;
        }
        state.ddlListOfProposalType = threeLayerTreeView(oldJson, action);
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    handleResetOnSearchClick: {
      reducer(state) {
        state.lstAdvancedVotingDataSearch = [];
        state.isLoadingAdvanceVotingDataSearch = true;
        state.userMessage = '';
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetOnSearchClickAdvVoting: {
      reducer(state) {
        //filter
        state.ddlAdvanceVotingDataFunds = [];
        state.ddlAdvanceVotingDataFundSelection = [
          { label: 'All', value: null },
        ];
        state.lstVoteCast = [];
        state.lstManagementRecc = [];
        state.lstFundName = [];
        state.lstSupport = [];
        state.supportSelection = { label: 'For', value: '1' };
        state.voteCastSelection = [{ label: 'All', value: null, mlabel: null }];
        state.managementReccSelection = [
          { label: 'All', value: null, mlabel: null },
        ];
        state.isSupportChecked = false;
        state.supportFrom = 0;
        state.supportTo = 80;
        state.outputFieldSelection = [];
        state.lstOutputField = [];
        state.lstResolutionType = [];
        state.lstAdvancedVotingDataSearch = null;
        state.userMessage = '';
        state.startInvCompDate = startDate;
        state.endInvCompDate = endDate;
        state.investorid = '';
        state.isInternalUser = false;
        state.showVotingDetails = true;
        state.showInvestorVotingDetail = false;
        state.showVoteResults = true;
        state.showRationale = false;
        state.showInternal = true;
        state.setInvestorVotingDetail = false;
        state.resolutionTypeSelection = [];
        state.ddlListOfProposalType = [];
        state.ddlSpecificActivistActionNewsSelection = [];
        state.SetDDLProposalCategory = [];

        //search
        state.lstAdvancedVotingDataSearch = [];
        state.isLoadingAdvanceVotingDataSearch = true;
        state.userMessage = '';
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleIsLoadingAvds: {
      reducer(state) {
        state.isLoadingAdvanceVotingDataSearch = true;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleUpdateDataFromQueryString: {
      reducer(state, action) {
        if (action.payload.meetingStartDate !== null) {
          state.startInvCompDate = new Date(
            moment(action.payload.meetingStartDate).format('YYYY,MM,DD')
          );
        }
        if (action.payload.meetingEndDate !== null) {
          state.endInvCompDate = new Date(
            moment(action.payload.meetingEndDate).format('YYYY,MM,DD')
          );
        }
        if (action.payload.investor_id) {
          state.investorid = action.payload.investor_id;
        }
      },
      prepare(meetingStartDate, meetingEndDate, investor_id) {
        return {
          payload: { meetingStartDate, meetingEndDate, investor_id },
        };
      },
    },
    handleResetDataAdvanceVotingData: {
      reducer(state) {
        state.lstAdvancedVotingDataSearch = null;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleUpdateDataFilters: {
      reducer(state, action) {
        const data = action.payload.data;

        state.ddlAdvanceVotingDataFundSelection =
          data.ddlAdvanceVotingDataFundSelection;
        state.startInvCompDate = new Date(data.startInvCompDate);
        state.endInvCompDate = new Date(data.endInvCompDate);
        state.voteCastSelection = data.voteCastSelection;
        state.isSupportChecked = data.isSupportChecked;
        state.supportSelection = data.supportSelection;
        state.supportFrom = data.supportFrom;
        state.supportTo = data.supportTo;
        state.managementReccSelection = data.managementReccSelection;
        state.outputFieldSelection = data.outputFieldSelection;
        state.showVotingDetails = data.showVotingDetails;
        state.showRationale = data.showRationale;
        state.showInvestorVotingDetail = data.showInvestorVotingDetail;
        state.showInternal = data.showInternal;
        state.showVoteResults = data.showVoteResults;

        const ddlListOfProposalTypeArr = current(state).ddlListOfProposalType;

        const { depth0_Arr, depthValue } = getTreeViewDDLSelection(
          data.ddlListOfProposalType,
          ddlListOfProposalTypeArr
        );
        if (data.ddlListOfProposalType.length > 0) {
          state.SetDDLProposalCategory = data.ddlListOfProposalType;
          state.ddlListOfProposalType = depth0_Arr;
          state.resolutionTypeSelection = depthValue;
        }
      },
      prepare(value) {
        return {
          payload: { data: value },
        };
      },
    },
    handleSupportSelection: {
      reducer(state, action) {
        if (action.payload.e !== null) {
          state.supportSelection = action.payload.e;
        } else {
          state.supportSelection = {
            label: 'For',
            value: null,
          };
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
  },
  extraReducers: {
    [getAdvanceVotingDataFundnameReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.ddlAdvanceVotingDataFunds = action.payload;
      }
    },
    [getVoteCastReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstVoteCast = action.payload;
      }
    },
    [getManagementReccReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstManagementRecc = action.payload;
      }
    },
    [getSupportReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstSupport = action.payload;
      }
    },
    [getOutputFieldReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        // 0: 'Fund Voting'
        // 1: 'Fund Voting(with Rationale)'
        // 2: 'Investor Voting'
        // 3: 'Internal'
        // 4: 'Company Results'
        state.outputFieldSelection = [action.payload[4]];
        if (state.isInternalUser) {
          state.lstOutputField = action.payload;

          state.showInternal = true;
          state.showInvestorVotingDetail = false;
          state.showVotingDetails = false;
          state.showVoteResults = true;
          state.showRationale = false;
        } else {
          state.lstOutputField = [
            action.payload[0],
            action.payload[1],
            action.payload[2],
            action.payload[4],
          ];
          state.showInternal = false;
          state.showInvestorVotingDetail = false;
          state.showVotingDetails = false;
          state.showVoteResults = true;
          state.showRationale = false;
        }
      }
    },
    [advancedVotingdataSearchReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.isLoadingAdvanceVotingDataSearch = false;
        const lstAdvancedVotingDataSearch_mod = action.payload.data;

        lstAdvancedVotingDataSearch_mod.forEach((e) => {
          e.Meeting_Date = dateToISOString(
            new Date(e.Meeting_Date)
          );
        });

        state.lstAdvancedVotingDataSearch = lstAdvancedVotingDataSearch_mod;

        if (action.payload.maxColumns === action.payload.data.length) {
          state.userMessage = `*Please note, this dataset is limited to the top ${action.payload.maxColumns.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          )}`;
        }
      }
    },
    [isCurrentInternalUserReq.fulfilled]: (state, action) => {
      state.isInternalUser = action.payload;
    },
    [getListProposalsAndCategoriesReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.ddlListOfProposalType =
          action.payload.DDLProposalsAndCategoriesCategory;
        state.SetDDLProposalCategory =
          action.payload.DDLProposalsAndCategoriesCategory;
      }
    },
  },
});

export const {
  handleVoteCastSelection,
  handleManagementRecc,
  handleFundNameSelection,
  handleIsSupportChecked,
  handleSupportFromChange,
  handleSupportToChange,
  handleOutputFieldSelection,
  handleResolutionTypeSelection,
  handleResetOnSearchClick,
  handleResetOnSearchClickAdvVoting,
  handleUpdateDataFromQueryString,
  handleStartInvCompDateSelection,
  handleEndInvCompDateSelection,
  handleResetDataAdvanceVotingData,
  handleIsLoadingAvds,
  handleResetAdvancedVotingDataSearchSliceFilter,
  handleUpdateDataFilters,
  handleSupportSelection,
} = AdvancedVotingDataSearchSlice.actions;

export default AdvancedVotingDataSearchSlice.reducer;
