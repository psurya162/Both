import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader, API_URL } from '../utils/apiConfig';  // Import centralized API URL

// Thunk to update video playtime
export const updatePlaytime = createAsyncThunk(
  'videoPlaytime/updatePlaytime',
  async ({ subjectId, videoId, playTime, classId, boardId, languageId }) => {
    try {
      const response = await axios.post(
        `${API_URL}/update_video_time`,  // Use centralized API_URL
        { subjectId, videoId, playTime, classId, boardId, languageId },
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      // Return the error message if the request fails
      return Promise.reject(error.response?.data || error.message);
    }
  }
);

const initialState = {
  playtime: null,  // Store playtime fetched from the API
  status: 'idle',   // Status can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,      // Error message if request fails
};

const videoPlaytimeSlice = createSlice({
  name: 'videoPlaytime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePlaytime.pending, (state) => {
        state.status = 'loading';
        state.error = null;  // Clear error when loading
      })
      .addCase(updatePlaytime.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update playtime if request is successful
        state.playtime = action.payload.playtime;
      })
      .addCase(updatePlaytime.rejected, (state, action) => {
        state.status = 'failed';
        // Set error state with the error message
        state.error = action.payload || action.error.message;
      });
  },
});

export default videoPlaytimeSlice.reducer;
