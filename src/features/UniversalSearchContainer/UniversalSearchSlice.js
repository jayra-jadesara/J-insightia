import { createSlice } from '@reduxjs/toolkit';

import { UpdateVisitorLog } from '../../utils/general-util';

const UnivarsalSearchSlice = createSlice({
  name: 'universalsearch',
  initialState: {},
  reducers: {
    handleVisitorLog: {
      reducer() {
        // state = action.payload;
      },
      prepare(page_name, query_string) {
        UpdateVisitorLog(page_name, query_string);
        return {
          payload: { DecodeToken: [] }
        };
      }
    }
  },
  extraReducers: {}
});

export const { handleVisitorLog } = UnivarsalSearchSlice.actions;

export default UnivarsalSearchSlice.reducer;
