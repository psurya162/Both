// src/redux/paymentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL_1 } from '../utils/apiConfig';

// Initial state for payment
const initialState = {
  clientSecret: null,
  paymentStatus: null,
  error: null,
  subscriptionStartDate: null,
  subscriptionExpiryDate: null,
};

// Async thunk for creating a payment
export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async ({ userId, planType }, { rejectWithValue }) => {
    
    try {
      const response = await axios.post(
        `${API_URL_1}/create-payment`,
        { userId, planType }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Async thunk for handling subscription
export const handleSubscription = createAsyncThunk(
  'payment/handleSubscription',
  async ({ userId, planType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL_1}/handle-subscription`,
        { userId, planType }
      );
      return response.data;
     
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPayment: (state) => {
      state.clientSecret = null;
      state.paymentStatus = null;
      state.error = null;
      state.subscriptionStartDate = null;
      state.subscriptionExpiryDate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
        state.paymentStatus = 'success';
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.error = action.payload;
        state.paymentStatus = 'failed';
      })
      .addCase(handleSubscription.pending, (state) => {
        state.error = null;
      })
      .addCase(handleSubscription.fulfilled, (state, action) => {
        state.paymentStatus = 'success';
        state.subscriptionStartDate = action.payload.subscriptionStartDate;
        state.subscriptionExpiryDate = action.payload.subscriptionExpiryDate;
      })
      .addCase(handleSubscription.rejected, (state, action) => {
        state.error = action.payload;
        state.paymentStatus = 'failed';
      });
  },
});

export const { clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
