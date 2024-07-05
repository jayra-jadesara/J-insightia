import { createSlice } from '@reduxjs/toolkit';

const CompensationSlice = createSlice({
  name: 'peopleCompensation',
  initialState: {
    preferencesIsLoading: true,
  },
  reducers: {
    handleResetLoading: {
      reducer(state, action) {
        state.preferencesIsLoading = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
  },
  extraReducers: {},
});

export const { handleResetLoading } = CompensationSlice.actions;

export default CompensationSlice.reducer;
