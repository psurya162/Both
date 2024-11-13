import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleSubscription } from './paymentSlice';
import { API_URL, getAuthHeader } from '../utils/apiConfig'; // Import centralized API URL and auth helper

// Initial state
const initialState = {
  subjectVideos: [],
  books: [],
  mcqs: [],
  loadingVideos: false,
  loadingBooks: false,
  loadingMCQs: false,
  error: null,
  isSubscribed: false,
};

// Fetch videos with authorization token
export const fetchSubjectVideos = createAsyncThunk(
  'videos/fetchSubjectVideos',
  async ({ subjectId, langid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue('Token not found');

      const response = await axios.get(
        `${API_URL}/getvideos/${subjectId}/${langid}`,
        {
          headers: getAuthHeader(token),
        }
      );

      return response.data; // Return the response data directly
    } catch (error) {
      if (error.response?.status === 404) return rejectWithValue('No videos found for this subject.');
      return rejectWithValue(error.message);
    }
  }
);

// Fetch books with authorization token
export const fetchSubjectBooks = createAsyncThunk(
  'books/fetchSubjectBooks',
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue('Token not found');

      const response = await axios.get(
        `${API_URL}/getbooks/${subjectId}`,
        {
          headers: getAuthHeader(token),
        }
      );

      // Handle response and check for empty books
      return response.data.books || []; // Ensure you're returning an empty array if no books are found
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Fetch MCQs with authorization token
export const fetchSubjectMCQs = createAsyncThunk(
  'mcqs/fetchSubjectMCQs',
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue('Token not found');

      const response = await axios.get(
        `${API_URL}/mcq/${subjectId}`,
        {
          headers: getAuthHeader(token),
        }
      );

      return response.data.result || []; // Return the MCQ data or empty array if none found
    } catch (error) {
      if (error.response?.status === 404) return rejectWithValue('No MCQs found for this subject.');
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      const { videos, isSubscribed } = action.payload;
      state.subjectVideos = videos;
      state.isSubscribed = isSubscribed;
    },
    setIsSubscribed: (state, action) => {
      state.isSubscribed = action.payload;
    },
    clearVideos: (state) => {
      state.subjectVideos = []; // Clear the videos array
    },
    clearBooks: (state) => {
      state.books = []; // Clear books array
    },
    clearMCQs: (state) => {
      state.mcqs = []; // Clear MCQs array
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch videos
      .addCase(fetchSubjectVideos.pending, (state) => {
        state.loadingVideos = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchSubjectVideos.fulfilled, (state, action) => {
        state.loadingVideos = false;
        state.subjectVideos = action.payload.videos || []; // Set videos if available
        state.isSubscribed = action.payload.isSubscribed || false;
      })
      .addCase(fetchSubjectVideos.rejected, (state, action) => {
        state.loadingVideos = false;
        state.error = action.payload || 'Failed to fetch videos';
      })
      // Fetch books
      .addCase(fetchSubjectBooks.pending, (state) => {
        state.loadingBooks = true;
        state.error = null;
      })
      .addCase(fetchSubjectBooks.fulfilled, (state, action) => {
        state.loadingBooks = false;
        state.books = action.payload; // Set books data
      })
      .addCase(fetchSubjectBooks.rejected, (state, action) => {
        state.loadingBooks = false;
        state.error = action.payload || 'Failed to fetch books';
      })
      // Fetch MCQs
      .addCase(fetchSubjectMCQs.pending, (state) => {
        state.loadingMCQs = true;
        state.error = null;
      })
      .addCase(fetchSubjectMCQs.fulfilled, (state, action) => {
        state.loadingMCQs = false;
        state.mcqs = action.payload; // Set MCQs data
      })
      .addCase(fetchSubjectMCQs.rejected, (state, action) => {
        state.loadingMCQs = false;
        state.error = action.payload || 'Failed to fetch MCQs';
      })
      // Handle subscription change
      .addCase(handleSubscription.fulfilled, (state) => {
        state.isSubscribed = true; // Update isSubscribed to true on successful subscription
      });
  },
});

export const { setIsSubscribed, clearBooks, clearMCQs, clearVideos } = videoSlice.actions;
export default videoSlice.reducer;
