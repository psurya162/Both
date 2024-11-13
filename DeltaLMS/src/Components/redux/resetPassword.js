// redux/resetPasswordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../utils/apiConfig'; // Assuming you have a utility for API URL

// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  'resetPassword/resetPassword',
  async ({ token, newPassword, confirmPassword }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/reset/${token}`, { newPassword, confirmPassword });
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error resetting password:', error); // Log error for debugging
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to reset password');
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: '', // You could add a message field to hold a success/error message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = ''; // Reset message on new request
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || 'Password reset successfully!';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload?.message || 'Failed to reset password';
      });
  },
});

export default resetPasswordSlice.reducer;
