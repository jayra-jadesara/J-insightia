import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { company_search } from '../../utils/company-util';
import { investor_search } from '../../utils/investor-util';
import { GetAdvisorSearchData } from '../../utils/advisor-utils';
import { People_search } from '../../utils/peopleSearch-util';
import { SendFeedbackMail } from '../../utils/general-util';

export const univarsalCompanysearchFormReq = createAsyncThunk('univarsalCompanysearchFormReq', async (arg) => {
  const response = await company_search(arg);
  return response.data;
});

export const univarsalInvestorsearchFormReq = createAsyncThunk('univarsalInvestorsearchFormReq', async (arg) => {
  const response = await investor_search(arg);
  return response.data;
});

export const univarsalAdvisorsearchFormReq = createAsyncThunk('univarsalAdvisorsearchFormReq', async (arg) => {
  const response = await GetAdvisorSearchData(arg);
  return response;
});

export const univarsalPeopleSearchFormReq_V2 = createAsyncThunk('univarsalPeopleSearchFormReq_V2', async (arg) => {
  const response = await People_search(arg);
  return response;
});
export const sendFeedbackMailReq = createAsyncThunk('sendFeedbackMailReq', async (arg) => {
  const response = await SendFeedbackMail(arg);
  return response;
});

const HeaderSlice = createSlice({
  name: 'header',
  initialState: {
    searchCompanyRecordset: [],
    searchInvestorDataRecordset: [],
    searchAdvisorDataRecordset: [],
    searchPeopleDataRecordset: [],
    searchedName: '',
    isLoading: false,
    txtFeedback: '',
    feedbackTextLength: 0,
    isFeedbackSubmitted: false
  },
  reducers: {
    handleEvent: {
      reducer(state, action) {
        state.isLoading = true;
        state.searchedName = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handledFeedbackText: {
      reducer(state, action) {
        if (action.payload.length <= 250) {
          state.feedbackTextLength = action.payload.length;
          state.txtFeedback = action.payload;
        } else {
          state.txtFeedback = action.payload.slice(0, 250);
          const feedbackTexts = current(state).txtFeedback;
          state.feedbackTextLength = feedbackTexts.length;
        }
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleClosefeedback: {
      reducer(state, action) {
        state.feedbackTextLength = 0;
        state.txtFeedback = '';
        state.isFeedbackSubmitted = false;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
  },
  extraReducers: {
    [univarsalCompanysearchFormReq.fulfilled]: (state, action) => {
      state.searchCompanyRecordset = action.payload !== undefined ? action.payload : [];
    },
    [univarsalInvestorsearchFormReq.fulfilled]: (state, action) => {
      state.searchInvestorDataRecordset = action.payload !== undefined ? action.payload : [];
    },
    [univarsalAdvisorsearchFormReq.fulfilled]: (state, action) => {
      state.searchAdvisorDataRecordset = action.payload;
    },
    [univarsalPeopleSearchFormReq_V2.fulfilled]: (state, action) => {
      state.searchPeopleDataRecordset = action.payload !== undefined ? action.payload.data : [];
      state.isLoading = action.payload === undefined;
    },
    [sendFeedbackMailReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.isFeedbackSubmitted = true;
      }
    }
  }
});

export const { handleEvent, handledFeedbackText, handleClosefeedback } = HeaderSlice.actions;

export default HeaderSlice.reducer;
