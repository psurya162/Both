import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import { API_URL, getAuthHeader } from '../utils/apiConfig';






export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/sendotp`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otp, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verifyotp`, { otp, email });
      return response.data;
    } catch (error) {
      // If error.response exists, return error message, otherwise return generic error
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Return server error
      } else {
        return rejectWithValue({ error: "Internal server error" }); // Fallback error
      }
    }
  }
);


export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, ...values }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/user/${email}`, values);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error); // Log the entire error object
      return rejectWithValue(error.response?.data || { message: "An unexpected error occurred." });

    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/userss`, {
        headers: getAuthHeader(),
      });
      return response.data.UserData;

    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchUserSubjects = createAsyncThunk(
  "auth/fetchUserSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getsubject`, {
        headers: getAuthHeader(),
      });
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedUserData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/userprofile`,
        updatedUserData,
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateGrade = createAsyncThunk(
  "auth/updateGrade",
  async (grade, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/updategrade`,
        { grade },
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStream = createAsyncThunk(
  "auth/updateStream",
  async (stream, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/updatestream`,
        { stream },
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBoard = createAsyncThunk(
  "auth/updateBoard",
  async ({ board_id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/board`,
        { board_id },  // Send board_id in the request payload
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateStudentData = createAsyncThunk(
  "auth/updateStudentData",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/users`, studentData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const selectStream = createAsyncThunk(
  "auth/selectStream",
  async (stream, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/userstream`,
        { stream },
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLanguage = createAsyncThunk(
  "auth/updateLanguage",
  async (language_id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/language`,
        { language_id }, // Ensure the request payload matches your backend expectations
        {
          headers: getAuthHeader(),
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    otpSent: false,
    otpVerified: false,
    verificationStatus: 'not_verified',
    loading: false,
    error: null,
    otpExpiry: null,
    user: null,
    token: null,
    userData: null,
    userSubjects: [],
    selectedStream: null,
    selectedBoard: null,
    selectedLanguage: null,
    name: "",
    phone: "",
    grade: "",
    emailAlreadyVerified: false,
  },
  reducers: {
    resetOtp(state) {
      state.otpSent = false;
      state.otpVerified = false;
      state.otpExpiry = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.userData = null;
      state.userSubjects = [];
      state.language = null;
      localStorage.removeItem("token");
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    resetStream(state) {
      state.selectedStream = null;
    },
    setSelectedBoard(state, action) {
      state.selectedBoard = action.payload;
    },
    setSelectedLanguage: (state, action) => {

      state.selectedLanguage = action.payload;
    },

    StudentData: (state, action) => {
      const { name, phone, grade } = action.payload;
      state.name = name;
      state.phone = phone;
      state.grade = grade;
    },
    clearStudentData: (state) => {
      state.name = "";
      state.phone = "";
      state.grade = "";
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        state.otpExpiry = Date.now() + 60000;

      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
        state.verificationStatus = 'verified';
        state.emailAlreadyVerified = true;

      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Something went wrong, please try again.";

      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || 'An unexpected error occurred.';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {

        state.loading = false;
        state.userData = action.payload;

      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.userSubjects = action.payload;
      })
      .addCase(fetchUserSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.userData.grade = action.meta.arg;
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStream.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStream.fulfilled, (state, action) => {
        state.loading = false;
        state.userData.stream = action.meta.arg;
      })
      .addCase(updateStream.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.selectedBoard = action.payload.board_id;
        state.loading = false;
        toast.success('Board updated successfully');
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Error updating board');
      })

      .addCase(updateStudentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        toast.success("Data submitted successfully");
      })
      .addCase(updateStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to update data");
      })
      .addCase(selectStream.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectStream.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStream = action.payload.stream;
      })
      .addCase(selectStream.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLanguage.fulfilled, (state, action) => {
        state.userData.language_id = action.payload.language_id;
        state.loading = false;
        toast.success('Language updated successfully');
      })
      .addCase(updateLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update language');
      });
  },
});

export const { resetOtp, logout, setUserData, resetStream, setSelectedBoard, setSelectedLanguage, StudentData, clearStudentData } = authSlice.actions;
export default authSlice.reducer;
