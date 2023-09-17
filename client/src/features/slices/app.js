import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

const initialState = {
  loading: false
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export default slice.reducer;

export const updateLoading = (bool) => {
  return () => {
    dispatch(slice.actions.updateLoading(bool));
  };
};
