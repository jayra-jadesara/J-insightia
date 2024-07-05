import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAIGUpcomingMeetings, GetUpcomingAppointmentsAndDepartures } from '../../../utils/tools-util';

export const getAIGUpcomingMeetingsReq = createAsyncThunk('getAIGUpcomingMeetingsReq', async () => {
  const response = await GetAIGUpcomingMeetings();
  return response;
});

export const getUpcomingAppointmentsAndDeparturesReq = createAsyncThunk(
  'getUpcomingAppointmentsAndDeparturesReq',
  async () => {
    const response = await GetUpcomingAppointmentsAndDepartures();
    return response;
  }
);

const UpcomingEventsToolSlice = createSlice({
  name: 'upcomingMeetings',
  initialState: {
    isMeetingData: true,
    isLoadingMeetingData: true,
    meetingCardData: [],
    appointmentsAndDeparturesCardData: [],
  },
  reducers: {
    handleSwitchDataAndStats: {
      reducer(state, action) {
        state.isMeetingData = action.payload;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
  },
  extraReducers: {
    [getAIGUpcomingMeetingsReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.meetingCardData = action.payload !== undefined ? action.payload : [];
        state.isLoadingMeetingData = action.payload === undefined;
      }
    },

    [getUpcomingAppointmentsAndDeparturesReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.appointmentsAndDeparturesCardData = action.payload !== undefined ? action.payload : [];
      }
    },
  },
});

export const { handleSwitchDataAndStats } = UpcomingEventsToolSlice.actions;

export default UpcomingEventsToolSlice.reducer;
