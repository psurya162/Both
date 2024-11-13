// redux/forgotPasswordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../utils/apiConfig';

export const sendPasswordResetLink = createAsyncThunk(
  'forgotPassword/sendPasswordResetLink',
  async (email, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/forgot`, { email });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPasswordResetLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendPasswordResetLink.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sendPasswordResetLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default forgotPasswordSlice.reducer;
