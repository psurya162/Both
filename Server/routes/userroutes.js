const express = require("express");
const userRoute = express.Router();
const {
  otpSend,
  verifyOtp,
  updateUser,
  getAllUser,
  selectclass,
  selectstream,
  resendOTP,
  updategrade,
  getsubject,
  getvideos,
  updatestream,
  selectboard,
  selectlanguage,
  loginController,
  getUserProfile,
  userProfile,
  
  forgotpassword,
  reset,
 
  getBooks,
  Email,
  bookmarkvideos,
  Mcq,
  updateVideoTime,
  report

} = require("../controller/usercontroller");
const combinedMiddleware = require("../middleware/auth");

userRoute.post("/sendotp", otpSend);
userRoute.post("/verifyotp", verifyOtp);
userRoute.put("/user/:email", updateUser);
userRoute.put("/board", combinedMiddleware, selectboard);
userRoute.get("/user", getAllUser);
userRoute.put("/users", combinedMiddleware, selectclass);
userRoute.put("/userstream", combinedMiddleware, selectstream);
userRoute.put("/resendotp", resendOTP);
userRoute.post("/login", loginController);
userRoute.post("/forgot", forgotpassword);
userRoute.post("/reset", reset);
userRoute.get('/report', combinedMiddleware,report)
userRoute.post("/email", Email);
userRoute.get("/userss", combinedMiddleware, getUserProfile);
userRoute.put("/userprofile",  combinedMiddleware,combinedMiddleware, userProfile);

userRoute.post('/update_video_time', combinedMiddleware, updateVideoTime);
userRoute.put("/language", combinedMiddleware, selectlanguage);
userRoute.put("/updategrade", combinedMiddleware, updategrade);
userRoute.put("/updatestream", combinedMiddleware, updatestream);
userRoute.get("/getsubject", combinedMiddleware, getsubject);
userRoute.get("/getvideos/:id/:langid", combinedMiddleware, getvideos);
userRoute.get("/getbooks/:id", combinedMiddleware, getBooks);
userRoute.post("/forgot", forgotpassword);
userRoute.post('/bookmark', combinedMiddleware, bookmarkvideos)
userRoute.post("/reset/:token", reset);

userRoute.get("/mcq/:id", Mcq);

module.exports = userRoute;
