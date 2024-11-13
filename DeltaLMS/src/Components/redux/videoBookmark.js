import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader, API_URL } from '../utils/apiConfig';  // Import API_URL

export const bookmarkVideo = createAsyncThunk(
  'videoBookmark/bookmarkVideo',
  async ({ subjectId, videoId, classId, boardId, languageId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookmark`,  // Use the centralized API_URL here
        { 
          subjectId, 
          videoId, 
          classId: classId || 0,  
          boardId: boardId || 0, 
          languageId: languageId || 0  
        },
        { headers: getAuthHeader() }
      );
      return { status: response.data.status, videoId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  status: 'idle',
  error: null,
  bookmarkedVideos: [],
};

const videoBookmarkSlice = createSlice({
  name: 'videoBookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookmarkVideo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bookmarkVideo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { status, videoId } = action.payload;

        if (status === 'bookmarked') {
          if (!state.bookmarkedVideos.includes(videoId)) {
            state.bookmarkedVideos.push(videoId);
          }
        } else if (status === 'removed') {
          state.bookmarkedVideos = state.bookmarkedVideos.filter(id => id !== videoId);
        }
      })
      .addCase(bookmarkVideo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export default videoBookmarkSlice.reducer;
