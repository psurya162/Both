// reportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, getAuthHeader } from '../utils/apiConfig';

// Async thunk for fetching report data
export const fetchReportData = createAsyncThunk(
    'report/fetchReportData',
    async (_, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader(); // Use the helper function to get the auth header
            const response = await axios.get(`${API_URL}/report`, { headers });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching report data:', error); // Log the error for debugging
            return rejectWithValue(error.response?.data || 'Failed to fetch report data');
        }
    }
);

// Slice for report data
const reportSlice = createSlice({
    name: 'report',
    initialState: {
        reportData: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReportData.fulfilled, (state, action) => {
                state.loading = false;
                state.reportData = action.payload;
            })
            .addCase(fetchReportData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch report data';
            });
    },
});

export default reportSlice.reducer;
