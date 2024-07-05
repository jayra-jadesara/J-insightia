import { createSlice } from '@reduxjs/toolkit';

const NotesSlice = createSlice({
  name: 'notes',
  initialState: {
    preferencesIsLoading: true
  },
  reducers: {
    handleResetLoading: {
      reducer(state, action) {
        state.preferencesIsLoading = true;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    }
  },
  extraReducers: {}
});

export const { handleResetLoading } = NotesSlice.actions;

export default NotesSlice.reducer;
