import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  firstName: '',
  lastName: '',
  avatar: '',
  user_id: null,
  email: ''
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateEmail(state, action) {
      state.email = action.payload;
    },
    updateState(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn || false;
      state.accessToken = action.payload.accessToken || '';
      state.refreshToken = action.payload.refreshToken || '';
      state.firstName = action.payload.firstName || '';
      state.lastName = action.payload.lastName || '';
      state.avatar = action.payload.avatar || '';
      state.user_id = action.payload.user_id || null;
      state.email = action.payload.email || '';
    },
    updateTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }
  }
});

export default slice.reducer;

export const setEmail = (email) => {
  return () => {
    dispatch(slice.actions.updateEmail(email));
  };
};

export const newState = (data) => {
  return () => {
    dispatch(slice.actions.updateState(data));
  };
};

export const newTokens = (data) => {
  return () => {
    dispatch(slice.actions.updateTokens(data));
  };
};
