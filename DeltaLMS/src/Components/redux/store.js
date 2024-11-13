// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import videoReducer from "./videoSlice";
import forgotPasswordReducer from "./forgotPasswordSlice";
import resetPasswordReducer from "./resetPassword";
import videoPlaytimeReducer from "./videoPlaytimeSlice"; 
import paymentReducer from "./paymentSlice";
import videoBookmarkReducer from "./videoBookmark";
import reportReducer from './reportSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    videoPlaytime: videoPlaytimeReducer, 
    payment: paymentReducer,
    videoBookmark:videoBookmarkReducer,
    report: reportReducer,
    


    
   
  },
});

export default store;
